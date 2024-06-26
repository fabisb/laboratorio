/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
var sedesVar = [];
async function renderer() {
  try {
    const { data: sedes } = await axios.get(urlsv + "/api/users/sedes");
    sedesVar = sedes;
    const select = document.getElementById("selectSede");
    sedes.forEach((element) => {
      select.innerHTML += `
      <option value="${element.id}">${element.nombre}</option> 
      `;
    });
    document.getElementById('versionApp').innerText = await versionApp()
  } catch (error) {
    console.log("🚀 ~ renderer ~ error:", error)
    if (error.response?.data?.mensaje) {
      const res = await alerta.alert(
        "Error al iniciar sesion",
        error.response.data.mensaje
      );
      return res;
    } else {
      return await alerta.error();
    }
  }
}
const inputClave = () => {
  if (document.getElementById("selectSede").value == "") {
    document.getElementById("claveSede").hidden = true;
  } else {
    document.getElementById("claveSede").hidden = false;
    document.getElementById("claveSede").focus()
  }
  document.getElementById("claveSede").value = "";
};
async function loguear(e) {
  e.preventDefault();
  const user = document.getElementById("userLog").value;
  const pass = document.getElementById("passwordLog").value;
  const sedeSlct = document.getElementById("selectSede").value;
  //VALIDAR CLAVE DE SEDE
  const claveSede = document.getElementById("claveSede").value;

  if (user == "" || pass == "") {
    return await alerta.alert(
      "Error al iniciar sesion",
      "Los datos ingresados no son validos"
    );
  }
  if (sedeSlct == "") {
    return await alerta.alert("Error al iniciar sesion", "SELECCIONE UNA SEDE");
  }
  if (claveSede == "") {
    return await alerta.alert(
      "Error al iniciar sesion",
      "INGRESE UNA CLAVE DE SEDE VALIDA"
    );
  }
  const sedeFind = sedesVar.find(
    (e) => e.id == sedeSlct && e.clave == claveSede
  );
  if (!sedeFind) {
    return await alerta.alert(
      "Error de sede",
      "La clave no coincide con la sede"
    );
  }
  try {
    const { data } = await axios.post(urlsv + "/api/users/login", {
      user,
      pass,
    });
    await login.storeToken(data);
    await sedeVar.store(sedeSlct);
  } catch (error) {
    console.log(error);
    if (error.response?.data?.mensaje) {
      const res = await alerta.alert(
        "Error al iniciar sesion",
        error.response.data.mensaje
      );
      return res;
    } else {
      return await alerta.error();
    }
  }

  await abrirExamenesWindow();
  /*   document.getElementById("isLog").hidden = false;
  document.getElementById("login").hidden = true; */
}

async function facturarWindow() {
  await ventanas.facturarWindow();
}
