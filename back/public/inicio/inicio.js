let examenesDia = [];
let laboratoriosArray = [];
let sedesArray = [];
let empresasArray = [];

function modificarSede(id, nombre) {
  formularioSede();
  const sede = document.getElementById("sede");

  sede.value = nombre;
  document
    .getElementById("guardarCrudLab")
    .setAttribute("onclick", `guardarModSede(${id})`);
}
function modificarEmpresa(id, nombre) {
  formularioEmpresa();
  const empresa = document.getElementById("empresa");

  empresa.value = nombre;
  document
    .getElementById("guardarCrudLab")
    .setAttribute("onclick", `guardarModEmpresa(${id})`);
}

function modificarLaboratorio(id, razon1, rif1, direccion1, telefono1) {
  formularioLaboratorio();
  const rif = document.getElementById("rif");
  const direccion = document.getElementById("direccion");
  const razon = document.getElementById("razonSocial");
  const telefono = document.getElementById("telefono");

  rif.value = rif1;
  direccion.value = direccion1;
  razon.value = razon1;
  telefono.value = telefono1;
  document
    .getElementById("guardarCrudLab")
    .setAttribute("onclick", `guardarModLaboratorio(${id})`);
}

async function guardarModLaboratorio(id) {
  const rif = document.getElementById("rif");
  const direccion = document.getElementById("direccion");
  const razon = document.getElementById("razonSocial");
  const telefono = document.getElementById("telefono");
  const alerta = document.getElementById("alertaInicio");

  if (rif.value == "" || rif.value < 0) {
    alerta.className = "alert alert-danger row";

    alerta.innerHTML = `<span class="text-center">/RIF no ingresado <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg></span>`;
  } else if (razon.value == "") {
    alerta.className = "alert alert-danger row";
    return (alerta.innerHTML = `<span class="text-center">Razon social Invalida <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg></span>`);
  } else {
    try {
      const { data } = await axios.put(
        "http://localhost:3000/api/espejo/update-laboratorio",
        {
          id_laboratorio: id,
          razon: razon.value,
          telefono: telefono.value,
          direccion: direccion.value,
          rif: rif.value,
        }
      );
      console.log(data);

      render();

      rif.value = "";
      razon.value = "";
      telefono.value = "";
      direccion.value = "";

      alerta.className = "alert alert-success row";
      alerta.innerHTML = `<span class="text-center">Laboratorio insertado correctamente <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
  <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
  <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>`;
    } catch (error) {
      console.log(error);
      if (error.response.data.mensaje) {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">${error.response.data.mensaje} <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg></span>`;
      } else {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">ERROR <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg></span>`;
      }
    }
  }
  alerta.removeAttribute("hidden");

  setTimeout(() => {
    alerta.setAttribute("hidden", "true");
  }, 3000);
}

async function guardarModSede(id) {
  const sede = document.getElementById("sede").value;
  const alerta = document.getElementById("alertaInicio");

  if (sede == "") {
    alerta.className = "alert alert-danger row";
    alerta.innerHTML = `<span class="text-center">El nombre de la sede no puede ser vacia <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
  } else {
    try {
      const { data: res } = await axios.put(
        "http://localhost:3000/api/espejo/update-sede",
        {
          id_sede: id,
          nombre: sede,
        }
      );
      alerta.className = "alert alert-success row";
      alerta.innerHTML = `<span class="text-center">Sede modificada correctamente <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
  </svg></span>`;
      render();
    } catch (error) {
      console.log(error);
      if (error.response.data.mensaje) {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">${error.response.data.mensaje} <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
      } else {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">ERROR <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
      }
    }
  }
  alerta.removeAttribute("hidden");
  setTimeout(() => {
    alerta.setAttribute("hidden", "true");
  }, 3000);
}
async function guardarModEmpresa(id) {
  const empresa = document.getElementById("empresa").value;
  const alerta = document.getElementById("alertaInicio");

  if (empresa == "") {
    alerta.className = "alert alert-danger row";
    alerta.innerHTML = `<span class="text-center">El nombre de la empresa no puede ser vacia <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
  } else {
    try {
      const { data: res } = await axios.put(
        "http://localhost:3000/api/espejo/update-empresa",
        {
          id,
          nombre: empresa,
        }
      );
      alerta.className = "alert alert-success row";
      alerta.innerHTML = `<span class="text-center">Empresa modificada correctamente <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
  </svg></span>`;
      render();
    } catch (error) {
      console.log(error);
      if (error.response.data.mensaje) {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">${error.response.data.mensaje} <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
      } else {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">ERROR <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
      }
    }
  }
  alerta.removeAttribute("hidden");
  setTimeout(() => {
    alerta.setAttribute("hidden", "true");
  }, 3000);
}

function validarSelect(value) {
  const inp = document.getElementById(`inputFiltro`);
  inp.setAttribute("oninput", value);
}

async function crearLaboratorio() {
  const alerta = document.getElementById("alertaInicio");
  const rif = document.getElementById("rif");
  const direccion = document.getElementById("direccion");
  const razon = document.getElementById("razonSocial");
  const telefono = document.getElementById("telefono");
  console.log(rif.value, razon.value, telefono.value, direccion.value);
  if (rif.value == "" || rif.value < 0) {
    alerta.className = "alert alert-danger row";
    return (alerta.innerHTML = `<span class="text-center">/RIF no ingresado <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg></span>`);
  } else if (razon.value == "") {
    alerta.className = "alert alert-danger row";
    return (alerta.innerHTML = `<span class="text-center">Razon social Invalida <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg></span>`);
  } else {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/espejo/crear-laboratorio",
        {
          rif: rif.value,
          razon: razon.value,
          telefono: telefono.value,
          direccion: direccion.value,
        }
      );
      console.log(res);
      render();
      rif.value = "";
      razon.value = "";
      telefono.value = "";
      direccion.value = "";

      alerta.className = "alert alert-success row";
      alerta.innerHTML = `<span class="text-center">Laboratorio insertado correctamente <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>`;
    } catch (error) {
      console.log(error);
      if (error.response.data.mensaje) {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">${error.response.data.mensaje} <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
      } else {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">ERROR <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
      }
    }
  }
  alerta.removeAttribute("hidden");

  setTimeout(() => {
    alerta.setAttribute("hidden", "true");
  }, 3000);
}
async function modificarStatusLaboratorio(id) {
  try {
    const { data } = await axios.put(
      "/api/espejo/status-laboratorio",
      {
        id
      }
    );
    await render()
  } catch (error) {
    console.log("🚀 ~ modificarStatusLaboratorio ~ error:", error)
    alert('ERROR EN SERVIDOR')
  }
}
async function modificarStatusSede(id) {
  try {
    const { data } = await axios.put(
      "/api/espejo/status-sede",
      {
        id
      }
    );
    await render()
  } catch (error) {
    console.log("🚀 ~ modificarStatusLaboratorio ~ error:", error)
    alert('ERROR EN SERVIDOR')
  }
}
async function modificarStatusEmpresa(id) {
  try {
    const { data } = await axios.put(
      "/api/espejo/status-empresa",
      {
        id
      }
    );
    await render()
  } catch (error) {
    console.log("🚀 ~ modificarStatusLaboratorio ~ error:", error)
    alert('ERROR EN SERVIDOR')
  }
}
async function render() {
  const tBody = document.getElementById(`tBodyTabLab`);
  tBody.innerHTML = "";
  try {
    const { data: sedes } = await axios.get(
      "http://localhost:3000/api/espejo/sedes"
    );
    sedesArray = sedes;
  } catch (error) {
    console.log("🚀 ~ render ~ error:", error);
  }
  try {
    const { data: empresas } = await axios.get(
      "http://localhost:3000/api/espejo/empresas"
    );
    empresasArray = empresas;
  } catch (error) {
    console.log("🚀 ~ render ~ error:", error);
  }
  try {
    const { data: laboratorios } = await axios.get(
      "http://localhost:3000/api/espejo/laboratorios"
    );
    laboratoriosArray = laboratorios;
    laboratorios.forEach((e) => {
      tBody.innerHTML += `
    <tr>
                              <td>${e.id}</td>
                              <td>${e.razon_social}</td>
                              <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" style="cursor:pointer" onclick="modificarLaboratorio(${e.id},'${e.razon_social}','${e.rif}','${e.direccion}','${e.telefono}')" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                              </svg></td>
                              <td>
                              ${e.status == 'activo' ? `  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" style="cursor:pointer" onclick="modificarStatusLaboratorio('${e.id}')" class="bi bi-patch-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
</svg>` : ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle" style="cursor:pointer" onclick="modificarStatusLaboratorio('${e.id}')" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                              </svg>`}
                             
                            
                              </td>
                            </tr>
    `;
    });
  } catch (error) {
    console.log("🚀 ~ render ~ error:", error);
  }
}

function validarSelectLab(value) {
  document
    .getElementById("inputBusqueda")
    .setAttribute("oninput", `buscar${value}(value)`);
  document.getElementById("inputBusqueda").value = "";

  if (value == "Laboratorio") {
    buscarLaboratorio();
  } else if (value == "Sede") {
    buscarSede();
  } else {
    buscarEmpresa();
  }
}
async function crearSede() {
  const sede = document.getElementById("sede").value;
  const clave = document.getElementById("clave").value;
  const alerta = document.getElementById("alertaInicio");

  if (sede == "" || clave == "") {
    alerta.className = "alert alert-danger row";
    return (alerta.innerHTML = `<span class="text-center">La SEDE o la CLAVE no puede estar vacia <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`);
  } else {
    try {
      const { data: res } = await axios.post(
        `http://localhost:3000/api/espejo/crear-sede`,
        {
          nombre: sede,
          clave,
        }
      );
      console.log(res);
      alerta.className = "alert alert-success row";
      alerta.innerHTML = `<span class="text-center">Sede insertada correctamente <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
  </svg></span>`;
      render();
    } catch (error) {
      console.log(error);
      if (error.response.data.mensaje) {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">${error.response.data.mensaje} <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
      } else {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">ERROR <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
      }
    }
  }
  alerta.removeAttribute("hidden");

  setTimeout(() => {
    alerta.setAttribute("hidden", "true");
  }, 3000);
}
function formularioSede() {
  const container = document.getElementById("formularioRow");
  document.getElementById("h1Tipo").innerText = "SEDE";
  container.innerHTML = `
  <div class="row mb-3 mt-3">
                    <div class="col-4 my-auto">
                      <label for="sede" class="m-0 form-label">Sede: </label>
                    </div>
                    <div class="col-8">
                      <input type="text" class="form-control" id="sede" placeholder="Sede">
                    </div>
                    <div class="col-4 my-auto">
                      <label for="sede" class="m-0 form-label">Clave: </label>
                    </div>
                    <div class="col-8">
                      <input type="number" class="form-control" id="clave" placeholder="123">
                    </div>
  
                  </div>
  `;
  document
    .getElementById("guardarCrudLab")
    .setAttribute("onclick", "crearSede()");
}
function formularioEmpresa() {
  const container = document.getElementById("formularioRow");
  document.getElementById("h1Tipo").innerText = "EMPRESA";
  container.innerHTML = `
  <div class="row mb-3 mt-3">
                    <div class="col-4 my-auto">
                      <label for="sede" class="m-0 form-label">Nombre de empresa: </label>
                    </div>
                    <div class="col-8">
                      <input type="text" class="form-control" id="empresa" placeholder="Empresa">
                    </div>
                  </div>
  `;
  document
    .getElementById("guardarCrudLab")
    .setAttribute("onclick", "crearEmpresa()");
}
async function crearEmpresa() {
  const empresa = document.getElementById("empresa").value;
  const alerta = document.getElementById("alertaInicio");

  if (empresa == "" || empresa == "") {
    alerta.className = "alert alert-danger row";
    return (alerta.innerHTML = `<span class="text-center">La EMPRESA no puede estar vacia <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`);
  } else {
    try {
      const { data: res } = await axios.post(
        `http://localhost:3000/api/espejo/crear-empresa`,
        {
          nombre: empresa,
        }
      );
      console.log(res);
      alerta.className = "alert alert-success row";
      alerta.innerHTML = `<span class="text-center">Empresa insertada correctamente <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0"/>
    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708"/>
  </svg></span>`;
      render();
    } catch (error) {
      console.log(error);
      if (error.response.data.mensaje) {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">${error.response.data.mensaje} <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
      } else {
        alerta.className = "alert alert-danger row";
        alerta.innerHTML = `<span class="text-center">ERROR <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg></span>`;
      }
    }
  }
  alerta.removeAttribute("hidden");

  setTimeout(() => {
    alerta.setAttribute("hidden", "true");
  }, 3000);
}
function formularioLaboratorio() {
  const container = document.getElementById("formularioRow");
  document.getElementById("h1Tipo").innerText = "LABORATORIO";
  container.innerHTML = `
  <div class="row mb-3 mt-3">
  <div class="col-4">
    <label for="rif" class="form-label">RIF: </label>
  </div>
  <div class="col-8">
    <input type="number" min="0" class="form-control" id="rif" placeholder="RIF del laboratorio">
  </div>

  </div>
  <div class="row mb-3">
    <div class="col-4">
      <label for="razonSocial" class="form-label">Razon Social: </label>
    </div>
    <div class="col-8">
      <input type="text" class="form-control" id="razonSocial" placeholder="Razon Social del laboratorio">
    </div>

  </div>
  <div class="row mb-3">
    <div class="col-4">
      <label for="direccion" class="form-label">Direccion: </label>
    </div>
    <div class="col-8">
      <input type="text" class="form-control" id="direccion" placeholder="Direccion del laboratorio">
    </div>

  </div>
  <div class="row mb-3">
    <div class="col-4">
      <label for="telefono" class="form-label">Telefono: </label>
    </div>
    <div class="col-8">
      <input type="number" min="0" class="form-control" id="telefono" placeholder="Telefono del laboratorio">
    </div>

  </div>
  `;
  document
    .getElementById("guardarCrudLab")
    .setAttribute("onclick", "crearLaboratorio()");
}

function buscarLaboratorio(value) {
  document
    .getElementById("guardarCrudLab")
    .setAttribute("onclick", "crearLaboratorio()");

  console.log(value);
  const tBody = document.getElementById(`tBodyTabLab`);
  tBody.innerHTML = "";
  let labora;
  if (value == null) {
    labora = laboratoriosArray;
  } else {
    labora = laboratoriosArray.filter((e) =>
      e.razon_social.toLowerCase().includes(value.toLowerCase())
    );
  }
  labora.forEach((e) => {
    tBody.innerHTML += `
    <tr>
                              <td>${e.id}</td>
                              <td>${e.razon_social}</td>
                              <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                              </svg></td>
                              <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                              </svg></td>
                            </tr>
    `;
  });
}

function buscarSede(value) {
  document
    .getElementById("guardarCrudLab")
    .setAttribute("onclick", "crearSede()");

  console.log(value);
  const tBody = document.getElementById(`tBodyTabLab`);
  tBody.innerHTML = "";
  let labora;
  if (value == null) {
    labora = sedesArray;
  } else {
    labora = sedesArray.filter((e) =>
      e.nombre.toLowerCase().includes(value.toLowerCase())
    );
  }
  labora.forEach((e) => {
    tBody.innerHTML += `
    <tr>
                              <td>${e.id}</td>
                              <td>${e.nombre}</td>
                              <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" onclick='modificarSede("${e.id}","${e.nombre}")' class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                              </svg></td>
                              <td>  ${e.status == 'activo' ? `  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" style="cursor:pointer" onclick="modificarStatusSede('${e.id}')" class="bi bi-patch-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
</svg>` : ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle" style="cursor:pointer" onclick="modificarStatusSede('${e.id}')" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                              </svg>`}</td>
                            </tr>
    `;
  });
}
function buscarEmpresa(value) {
  document
    .getElementById("guardarCrudLab")
    .setAttribute("onclick", "crearEmpresa()");

  console.log(value);
  const tBody = document.getElementById(`tBodyTabLab`);
  tBody.innerHTML = "";
  let labora;
  if (value == null) {
    empresas = empresasArray;
  } else {
    empresas = empresasArray.filter((e) =>
      e.nombre.toLowerCase().includes(value.toLowerCase())
    );
  }
  empresas.forEach((e) => {
    tBody.innerHTML += `
    <tr>
                              <td>${e.id}</td>
                              <td>${e.nombre}</td>
                              <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" onclick='modificarEmpresa("${e.id}","${e.nombre}")' class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                              </svg></td>
                              <td>  ${e.status == 'activo' ? `  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" style="cursor:pointer" onclick="modificarStatusEmpresa('${e.id}')" class="bi bi-patch-check" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
</svg>` : ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle" style="cursor:pointer" onclick="modificarStatusEmpresa('${e.id}')" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                              </svg>`}</td>
                            </tr>
    `;
  });
}

function buscarCedula(value) {
  const tBodyExamenesDia = document.getElementById("tBodyExamenesDia");
  tBodyExamenesDia.innerHTML = "";
  let examenes = examenesDia.filter((e) => e.cedula.toString().includes(value));
  examenes.forEach((ex) => {
    tBodyExamenesDia.innerHTML += `
    <tr>
                <td scope="col">${ex.id}</td>
                <td scope="col">${ex.cedula}</td>
                <td scope="col">${ex.paciente}</td>
                <td scope="col">${ex.examen}</td>
                <td scope="col">${ex.bioanalista}</td>
                <td scope="col">${ex.hora}</td>
                <td scope="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="green"
                    class="bi bi-eye"
                    viewBox="0 0 16 16"
                    style="cursor:pointer"
                    onclick="detalleExamen('${ex.id}','${ex.examen}')"
                  >
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                    />
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                    />
                  </svg>
                </td>

                <td scope="col">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill=${ex.status_imp == 1 ? "red" : "gray"}
                            class="bi bi-filetype-pdf"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
                            />
                          </svg>
                        </td>
                        <td scope="col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="${ex.status_ws == 1 ? "green" : "gray"
      }" class="bi bi-whatsapp" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                      </svg>
                        </td>
                        <td scope="col">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="${ex.status_correo == 1 ? "orange" : "gray"}"
                            class="bi bi-envelope-at"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"
                            />
                            <path
                              d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"
                            />
                          </svg>
                        </td>

              </tr>
    `;
  });
}
function buscarPaciente(value) {
  const tBodyExamenesDia = document.getElementById("tBodyExamenesDia");
  tBodyExamenesDia.innerHTML = "";
  let examenes = examenesDia.filter((e) =>
    e.paciente.toString().toLowerCase().includes(value.toLowerCase())
  );
  examenes.forEach((ex) => {
    tBodyExamenesDia.innerHTML += `
    <tr>
                <td scope="col">${ex.id}</td>
                <td scope="col">${ex.cedula}</td>
                <td scope="col">${ex.paciente}</td>
                <td scope="col">${ex.examen}</td>
                <td scope="col">${ex.bioanalista}</td>
                <td scope="col">${ex.hora}</td>
                <td scope="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="green"
                    class="bi bi-eye"
                    viewBox="0 0 16 16"
                    style="cursor:pointer"
                    onclick="detalleExamen('${ex.id}','${ex.examen}')"
                  >
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                    />
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                    />
                  </svg>
                </td>
                <td scope="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="red"
                    class="bi bi-filetype-pdf"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
                    />
                  </svg>
                </td>

                <td scope="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="orange"
                    class="bi bi-envelope-at"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"
                    />
                    <path
                      d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"
                    />
                  </svg>
                </td>
              </tr>
    `;
  });
}
function buscarExamen(value) {
  const tBodyExamenesDia = document.getElementById("tBodyExamenesDia");
  tBodyExamenesDia.innerHTML = "";
  let examenes = examenesDia.filter((e) =>
    e.examen.toString().toLowerCase().includes(value.toLowerCase())
  );
  examenes.forEach((ex) => {
    tBodyExamenesDia.innerHTML += `
    <tr>
                <td scope="col">${ex.id}</td>
                <td scope="col">${ex.cedula}</td>
                <td scope="col">${ex.paciente}</td>
                <td scope="col">${ex.examen}</td>
                <td scope="col">${ex.bioanalista}</td>
                <td scope="col">${ex.hora}</td>
                <td scope="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="green"
                    class="bi bi-eye"
                    viewBox="0 0 16 16"
                    style="cursor:pointer"
                    onclick="detalleExamen('${ex.id}','${ex.examen}')"
                  >
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                    />
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                    />
                  </svg>
                </td>
                <td scope="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="red"
                    class="bi bi-filetype-pdf"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
                    />
                  </svg>
                </td>

                <td scope="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="orange"
                    class="bi bi-envelope-at"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"
                    />
                    <path
                      d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"
                    />
                  </svg>
                </td>
              </tr>
    `;
  });
}
function buscarBioanalista(value) {
  const tBodyExamenesDia = document.getElementById("tBodyExamenesDia");
  tBodyExamenesDia.innerHTML = "";
  let examenes = examenesDia.filter((e) =>
    e.bioanalista.toString().toLowerCase().includes(value.toLowerCase())
  );
  examenes.forEach((ex) => {
    tBodyExamenesDia.innerHTML += `
    <tr>
                <td scope="col">${ex.id}</td>
                <td scope="col">${ex.cedula}</td>
                <td scope="col">${ex.paciente}</td>
                <td scope="col">${ex.examen}</td>
                <td scope="col">${ex.bioanalista}</td>
                <td scope="col">${ex.hora}</td>
                <td scope="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="green"
                    class="bi bi-eye"
                    viewBox="0 0 16 16"
                    style="cursor:pointer"
                    onclick="detalleExamen('${ex.id}','${ex.examen}')"
                  >
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                    />
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                    />
                  </svg>
                </td>
                <td scope="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="red"
                    class="bi bi-filetype-pdf"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
                    />
                  </svg>
                </td>

                <td scope="col">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="orange"
                    class="bi bi-envelope-at"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"
                    />
                    <path
                      d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"
                    />
                  </svg>
                </td>
              </tr>
    `;
  });
}

async function traerExamenesByFecha(value) {
  let validar = validarFecha(value);
  if (validar == "true") {
    try {


      const res = await axios.get(
        `http://localhost:3000/api/espejo/get-examen-byFecha`,
        {
          params: {
            fecha: value,
          },
        }
      );
      console.log(res)
      examenesDia = res.data.examenes;
      const tBodyExamenesDia = document.getElementById("tBodyExamenesDia");
      tBodyExamenesDia.innerHTML = "";
      res.data.examenes.forEach((ex) => {
        tBodyExamenesDia.innerHTML += `
            <tr>
                        <td scope="col">${ex.id}</td>
                        <td scope="col">${ex.cedula}</td>
                        <td scope="col">${ex.paciente}</td>
                        <td scope="col">${ex.examen}</td>
                        <td scope="col">${ex.bioanalista}</td>
                        <td scope="col">${ex.hora}</td>
                        <td scope="col">
                        ${ex.status != 'externo' ? `
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="green"
                            class="bi bi-eye"
                            viewBox="0 0 16 16"
                            style="cursor:pointer"
                            onclick="detalleExamen('${ex.id}','${ex.examen}')"
                          >
                            <path
                              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                            />
                            <path
                              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                            />
                          </svg>`: 'EXT'
          }
                        </td>

                          <td scope="col">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill=${ex.status_imp == 1 ? "red" : "gray"}
                            class="bi bi-filetype-pdf"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
                            />
                          </svg>
                        </td>
                        <td scope="col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="${ex.status_ws == 1 ? "green" : "gray"
          }" class="bi bi-whatsapp" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                      </svg>
                        </td>
                        <td scope="col">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="${ex.status_correo == 1 ? "orange" : "gray"}"
                            class="bi bi-envelope-at"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"
                            />
                            <path
                              d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"
                            />
                          </svg>
                        </td>

                      </tr>
            `;
      });
    } catch (error) {
      console.log("🚀 ~ traerExamenesByFecha ~ error:", error)

    }
  } else {
    return;
  }
}

function validarFecha(value) {
  let fecha = value;
  let fechaActual = moment().format("YYYY-MM-DD");
  console.log(fechaActual);

  let fecha2 = (document.getElementById("fecha_filtro").value =
    moment(fecha).format("YYYY-MM-DD"));

  const mes = moment(fecha).format("MM");
  const ano = moment(fecha).format("YYYY");
  const dia = moment(fecha).format("DD");
  if (
    (mes == 2 && dia > 29) ||
    moment(fecha2).isAfter(fechaActual) ||
    ano < 1890
  ) {
    document.getElementById("fecha_filtro").value = "";
    return "false";
  }
  return "true";
}
async function traerExamenesDia() {
  try {
    const res = await axios.get("/api/espejo/get-examen-dia");
    console.log(res);
    examenesDia = res.data.examenes;
    const tBodyExamenesDia = document.getElementById("tBodyExamenesDia");
    tBodyExamenesDia.innerHTML = "";
    res.data.examenes.forEach((ex) => {
      tBodyExamenesDia.innerHTML += `
            <tr>
                        <td scope="col">${ex.id}</td>
                        <td scope="col">${ex.cedula}</td>
                        <td scope="col">${ex.paciente}</td>
                        <td scope="col">${ex.examen}</td>
                        <td scope="col">${ex.bioanalista}</td>
                        <td scope="col">${ex.hora}</td>
                        <td scope="col">${ex.status != 'externo' ? `
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="green"
                            class="bi bi-eye"
                            viewBox="0 0 16 16"
                            style="cursor:pointer"
                            onclick="detalleExamen('${ex.id}','${ex.examen}')"
                          >
                            <path
                              d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                            />
                            <path
                              d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                            />
                          </svg>`: 'EXT'
        }
                        </td>

                        <td scope="col">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill=${ex.status_imp == 1 ? "red" : "gray"}
                            class="bi bi-filetype-pdf"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
                            />
                          </svg>
                        </td>
                        <td scope="col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="${ex.status_ws == 1 ? "green" : "gray"
        }" class="bi bi-whatsapp" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                      </svg>
                        </td>
                        <td scope="col">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="${ex.status_correo == 1 ? "orange" : "gray"}"
                            class="bi bi-envelope-at"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"
                            />
                            <path
                              d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"
                            />
                          </svg>
                        </td>

                      </tr>
            `;
    });
  } catch (error) {
    console.log(error);
  }
}

async function detalleExamen(id, examen) {
  const tBody = document.getElementById("tBodyDetalle");
  const tHead = document.getElementById("headTableDetalle");
  tBody.innerHTML = "";
  try {
    let { data: resultados } = await axios.get(
      "http://localhost:3000/api/espejo/get-examen-resultado",
      {
        params: {
          id,
        },
      }
    );
    console.log(resultados);
    tHead.innerText = `RESULTADOS ${examen} #${id}`;

    resultados = resultados.sort(function (a, b) {
      if (a.posicion > b.posicion) {
        return 1;
      }
      if (a.posicion < b.posicion) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    resultados.forEach((e) => {
      if (e.status == 'titulo') {
        tBody.innerHTML += `
          <tr>
                      <td scope="col" colspan='4'>${e.titulo}</td>
                      
                    </tr>
          `;
      } else {
        if (e.nombre) {
          if (e.rango) {
            tBody.innerHTML += `
              <tr>
                          <td scope="col">${e.nombre}</td>
                          <td scope="col">${e.resultado}</td>
                          <td scope="col">${e.nota}</td>
                          <td scope="col">${e.rango.inferior} - ${e.rango.superior}</td>
                        </tr>
              `;
          } else {
            tBody.innerHTML += `
            <tr>
                        <td scope="col">${e.nombre}</td>
                        <td scope="col">${e.resultado}</td>
                        <td scope="col">${e.nota}</td>
                        <td scope="col"> - </td>
                      </tr>
            `;
          }
        }

      }


    });
  } catch (error) {
    console.log(error);
  }
}
