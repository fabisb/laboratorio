let usuariosArray = [];
let examenesArray = [];

const calcularEdadNormal = (fecha) => {
  const mes = moment(fecha).format("MM");
  const ano = moment(fecha).format("YYYY");
  const dia = moment(fecha).format("DD");

  const mesAc = moment().format("MM");
  const anoAc = moment().format("YYYY");
  const diaAc = moment().format("DD");

  let mesR = mesAc - mes;
  let diaR = diaAc - dia;
  let anoR = anoAc - ano;

  if (mesR < 0) {
    mesR = mesR + 12;
    anoR--;
  }
  if (diaR < 0) {
    mesR--;
  }

  return `${anoR} años;  ${mesR} meses`;
};

function activarFormulario() {
  const formulario = document.getElementsByClassName("formulario");
  const formArr = [...formulario];
  formArr.forEach((e) => {
    e.removeAttribute("disabled");
    if(!e.tagName.toLowerCase() =="select"){
      e.value = "";

    }
  });
}
function desactivarFormulario() {
  const formulario = document.getElementsByClassName("formulario");
  const formArr = [...formulario];
  formArr.forEach((e) => {
    e.setAttribute("disabled", "true");
    e.value = "";
  });
}

function validarSelectTipo(value) {
  const biodiv = document.getElementsByClassName("bioanalistaDiv");

  if (value == 1) {
    for (let index = 0; index < biodiv.length; index++) {
      const element = biodiv[index];
      element.value = "";
      element.removeAttribute("hidden");
    }
  } else {
    for (let index = 0; index < biodiv.length; index++) {
      const element = biodiv[index];
      element.value = "";
      element.setAttribute("hidden", "true");
    }
  }
}

async function modificarFormulario(id, nombre) {
  await activarFormulario();
  const usuario = document.getElementById("spanUser");
  usuario.innerText = `${nombre}`;
  const biodiv = document.getElementsByClassName("bioanalistaDiv");
  document
    .getElementById(`guardarButton`)
    .setAttribute("onclick", "modificarUsuario()");

  for (let index = 0; index < biodiv.length; index++) {
    const element = biodiv[index];
    element.setAttribute("hidden", "true");
  }
  const usuarioInfo = usuariosArray.usuarios.find((e) => e.id == id);
  console.log(usuarioInfo);
  const nombreInp = document.getElementById("nombre");
  const cedulaInp = document.getElementById("cedula");
  const direccionInp = document.getElementById("direccion");
  const correoInp = document.getElementById("correo");
  const tipoInp = document.getElementById("tipo");
  const precedula = document.getElementById("precedula");
  const telefono = document.getElementById("telefono");

  if (usuarioInfo.nivel == 1) {
    let bioanalista = usuariosArray.bioanalistas.filter((e) => e.id == 44);
    const colegioInp = document.getElementById("colegio");
    const ministerioInp = document.getElementById("ministerio");
    const firmaInp = document.getElementById("firma");

    for (let index = 0; index < biodiv.length; index++) {
      const element = biodiv[index];
      element.removeAttribute("hidden");
    }
    colegioInp.value = bioanalista[0].colegio;
    ministerioInp.value = bioanalista[0].ministerio;
  }
  precedula.value = usuario.precedula;
  nombreInp.value = usuarioInfo.nombre;
  cedulaInp.value = usuarioInfo.cedula;
  direccionInp.value = usuarioInfo.direccion;
  correoInp.value = usuarioInfo.correo;
  tipoInp.value = usuarioInfo.nivel;
  telefono.value = usuarioInfo.telefono;
}

function crearUsuario() {
  const biodiv = document.getElementsByClassName("bioanalistaDiv");

  for (let index = 0; index < biodiv.length; index++) {
    const element = biodiv[index];
    element.setAttribute("hidden", "true");
  }
  const usuario = document.getElementById("spanUser");
  usuario.innerText = `CREANDO....`;
  onclick = "guardarUsuario()";
  document
    .getElementById(`guardarButton`)
    .setAttribute("onclick", "guardarUsuario()");
  activarFormulario();
}

const buscarUsuarioTable = (value) => {
  let parse = parseInt(value);
  const tBody = document.getElementById("tBodyUsuarios");
  tBody.innerHTML = ``;
  let resultado = [];
  if (isNaN(parse)) {
    resultado = usuariosArray.usuarios.filter((pc) =>
      pc.nombre.toLowerCase().includes(value.toLowerCase())
    );
  } else {
    resultado = usuariosArray.usuarios.filter((pc) =>
      pc.cedula.toString().includes(value)
    );
  }
  resultado.forEach((user) => {
    tBody.innerHTML += `
        <tr>
                      <td scope="col">${user.cedula}</td>
                      <td scope="col">${user.nombre}</td>
                      <td scope="col">${user.direccion}</td>
                      <td scope="col">${user.correo}</td>
                      <td scope="col">${user.telefono}</td>
                      <td scope="col">${user.nivel}</td>
                      <td scope="col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" onclick="modificarFormulario(${user.id},'${user.nombre}')" style="cursor:pointer" class="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </td>
                    </tr>
        `;
  });
};

const buscarUsuarios = async () => {
  const { data } = await axios.get("/api/espejo/get-usuarios");
  console.log("🚀 ~ buscarUsuarios ~ data:", data);
  usuariosArray = data;
  const tBody = document.getElementById(`tBodyUsuarios`);
  tBody.innerHTML = "";
  data.usuarios.forEach((user) => {
    try {
      let bioanalista = data.bioanalistas.find((e) => e.id == user.bioanalista);
    } catch (error) {}

    tBody.innerHTML += `
    <tr>
                      <td scope="col">${user.cedula}</td>
                      <td scope="col">${user.nombre}</td>
                      <td scope="col">${user.direccion}</td>
                      <td scope="col">${user.correo}</td>
                      <td scope="col">${user.telefono}</td>
                      <td scope="col">${user.nivel}</td>
                      <td scope="col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" class="bi bi-pencil-square" onclick="modificarFormulario(${user.id},'${user.nombre}')"  style="cursor:pointer" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </td>
                    </tr>
    `;
  });
};

const guardarUsuario = async () => {
  
  const pre_cedula = document.getElementById("precedula").value;
  const cedula = document.getElementById("cedula").value;
  const nombre = document.getElementById("nombre").value;
  const clave = document.getElementById("clave").value;
  const direccion = document.getElementById("direccion").value;
  const correo = document.getElementById("correo").value;
  const tipo = document.getElementById("tipo").value;
  const telefono = document.getElementById("telefono").value;

  if (!isNaN(nombre) || nombre == "") {
    return alert("Ingrese un nombre valido");
  }
  if (pre_cedula!='V' && pre_cedula != "E" ) {
    return alert("Ingrese una pre cedula valido");
  }
  if (cedula < 0) {
    return alert("Ingrese una cedula valida");
  }
  if (telefono < 0 || telefono == "") {
    return alert("Ingrese un telefono valido");
  }
  if (correo.split("@")[0] == "" || correo.split("@")[1] == "") {
    alert("Ingrese un correo valido");
    return;
  }
  if (!correo.split("@")[1].split(".")[1].includes("com")) {
    alert("Ingrese un correo valido");
    return;
  }
  if (clave == "") {
    alert("Ingrese una clave valida");
    return;
  }
  if (direccion == "") {
    alert("Ingrese una direccion valida");
    return;
  }
  if (tipo != "1" && tipo != "2" && tipo != "3") {
    alert("Nivel de usuario no valido");
    return;
  }

  try {
    if (tipo == "1") {
      const ministerio = document.getElementById("ministerio").value;
      const colegio = document.getElementById("colegio").value;
      const firma = await subirImagen();
      console.log("🚀 ~ guardarUsuario ~ firma:", firma)
      const res = await axios.post("/api/espejo/guardar-bioanalista", {
        pre_cedula,
        cedula,
        nombre,
        telefono,
        direccion,
        ministerio,
        colegio,
        foto_firma:firma ?firma  : null,
      });
      const res2 = await axios.post("/api/espejo/guardar-usuario", {
        pre_cedula,
        cedula,
        nombre,
        password:clave,
        telefono,
        direccion,
        correo,
        nivel:tipo,
      });
    } else {
      const res2 = await axios.post("/api/espejo/guardar-usuario", {
        pre_cedula,
        cedula,
        nombre,
        password:clave,
        telefono,
        direccion,
        correo,
        nivel:tipo,
      });
    }
  } catch (error) {
    //CREAR MEJORES ALERTAS
    console.log("🚀 ~ guardarUsuario ~ error:", error);
    if (error.response.data.mensaje) {
      return alert("Error:", error.response.data.mensaje);
    } else {
      return alert("ERROR DE SERVIDOR");
    }
  }
};

const subirImagen = async () => {
  try {
    const imagen = document.getElementById("firma");

    if (imagen.value !== "") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imagen.files[0]);

        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          resolve("");
        };
      });
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
  }
};
