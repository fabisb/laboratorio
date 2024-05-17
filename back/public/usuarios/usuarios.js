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
    if (!e.tagName.toLowerCase() == "select") {
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" class="bi bi-pencil-square" onclick="modificarFormulario(${
                          user.id
                        },'${
      user.nombre
    }')"  style="cursor:pointer" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </td>
                      <td style="cursor:pointer">${
                        user.status == "activo"
                          ? `<svg xmlns="http://www.w3.org/2000/svg"  onclick="cambiarStatus('inactivo','${
                              user.nivel == 1
                                ? "administrador"
                                : user.nivel == 2
                                ? "auxiliar"
                                : "bioanalista"
                            }','${
                              user.id
                            }')" width="20" height="20" fill="green" class="bi bi-check-square mx-1" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                      </svg>`
                          : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-octagon"  onclick="cambiarStatus('activo','${
                              user.nivel == 1
                                ? "administrador"
                                : user.nivel == 2
                                ? "auxiliar"
                                : "bioanalista"
                            }','${user.id}')" viewBox="0 0 16 16">
                        <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                      </svg>`
                      }</td>                
                    </tr>
    `;
  });
};

const cambiarStatus = async (status, tipo, id) => {
  if (id < 0 || id == "" || !id)
    return usuariosAlerta("Envie un id valido", "danger");

  if (status != "activo" && status != "inactivo")
    return usuariosAlerta("Envie un estatus valido", "danger");

  if (tipo != "administrador" && tipo != "bioanalista" && tipo != "auxiliar")
    return usuariosAlerta("Envie un tipo de usuario valido", "danger");

  try {
    const { data } = await axios.put("/api/espejo/editar-status", {
      id,
      status,
      tipo,
    });
    buscarUsuarios();
    return usuariosAlerta("Status modificado con exito", "success");
  } catch (error) {
    console.log("🚀 ~ cambiarStatus ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return;
    }
  }
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
    return usuariosAlerta("Ingrese un nombre valido", "warning");
  }
  if (pre_cedula != "V" && pre_cedula != "E") {
    return usuariosAlerta("Ingrese una pre cedula valida", "warning");
  }
  if (cedula < 0) {
    return usuariosAlerta("Ingrese una cedula valida", "warning");
  }
  if (telefono < 0 || telefono == "") {
    return usuariosAlerta("Ingrese un telefono valido", "warning");
  }
  if (correo.split("@")[0] == "" || correo.split("@")[1] == "") {
    return usuariosAlerta("Ingrese un correo valido", "warning");
  }
  if (!correo.split("@")[1].split(".")[1].includes("com")) {
    return usuariosAlerta("Ingrese un correo valido", "warning");
  }
  if (clave == "") {
    return usuariosAlerta("Ingrese una clave valida", "warning");
  }
  if (direccion == "") {
    return usuariosAlerta("Ingrese una direccion valida ", "warning");
  }
  if (tipo != "1" && tipo != "2" && tipo != "3") {
    return usuariosAlerta("Nivel de usuario no valido", "warning");
  }

  try {
    if (tipo == "1") {
      const ministerio = document.getElementById("ministerio").value;
      const colegio = document.getElementById("colegio").value;
      const firma = await subirImagen();
      console.log("🚀 ~ guardarUsuario ~ firma:", firma);
      const res = await axios.post("/api/espejo/guardar-bioanalista", {
        pre_cedula,
        cedula,
        nombre,
        telefono,
        direccion,
        ministerio,
        colegio,
        foto_firma: firma ? firma : null,
      });
      const res2 = await axios.post("/api/espejo/guardar-usuario", {
        pre_cedula,
        cedula,
        nombre,
        password: clave,
        telefono,
        direccion,
        correo,
        nivel: tipo,
      });
    } else {
      const res2 = await axios.post("/api/espejo/guardar-usuario", {
        pre_cedula,
        cedula,
        nombre,
        password: clave,
        telefono,
        direccion,
        correo,
        nivel: tipo,
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

const creacionUsuarioAlerta = document.getElementById("creacionUsuarioAlerta");
const usuariosAlerta = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div id="creacionUsuarioAlertaDiv" class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message.toUpperCase()}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");
  if (creacionUsuarioAlerta.children.length == 0) {
    creacionUsuarioAlerta.append(wrapper);
    setTimeout(() => {
      new bootstrap.Alert("#creacionUsuarioAlertaDiv").close();
      creacionUsuarioAlerta.removeChild(creacionUsuarioAlerta.firstChild);
      return;
    }, 6000);
  }
};
