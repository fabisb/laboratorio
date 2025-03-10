var examenes = [],
  examenesArray = [];
var idPaciente = "";
var pacienteObj = {};
let examenesDelPaciente = [];
let examenesPendientes = [];
var examenDataPc;
let reimpresionArray = [];
var nivelUser, cedulaUser;
var examenPendiente;
let pacientesArray;

async function tok() {
  let token = await login.getToken();
  nivelUser = token.nivel;
  cedulaUser = token.cedula;

  const elementsNivel = document.getElementsByClassName("user" + nivelUser);
  for (const e of elementsNivel) {
    e.removeAttribute("hidden", "true");
  }
}

function retornarSumaString(o) {
  while (o.includes("*")) {
    for (let index = 0; index < o.length; index++) {
      const element = o[index];
      if (element == "*") {
        const a = parseFloat(o[index - 1]);
        const b = parseFloat(o[index + 1]);
        let total = a * b;
        o = o
          .slice(0, index - 1)
          .concat(total)
          .concat(o.slice(index + 2));

        break;
      }
    }
  }
  while (o.includes("/")) {
    for (let index = 0; index < o.length; index++) {
      const element = o[index];
      if (element == "/") {
        const a = parseFloat(o[index - 1]);
        const b = parseFloat(o[index + 1]);
        let total = a / b;
        o = o
          .slice(0, index - 1)
          .concat(total)
          .concat(o.slice(index + 2));

        break;
      }
    }
  }
  while (o.includes("+")) {
    for (let index = 0; index < o.length; index++) {
      const element = o[index];
      if (element == "+") {
        const a = parseFloat(o[index - 1]);
        const b = parseFloat(o[index + 1]);
        let total = a + b;
        o = o
          .slice(0, index - 1)
          .concat(total)
          .concat(o.slice(index + 2));
        break;
      }
    }
  }
  while (o.includes("-")) {
    for (let index = 0; index < o.length; index++) {
      const element = o[index];
      if (element == "-") {
        const a = parseFloat(o[index - 1]);
        const b = parseFloat(o[index + 1]);
        let total = a - b;
        o = o
          .slice(0, index - 1)
          .concat(total)
          .concat(o.slice(index + 2));
        break;
      }
    }
  }

  return o[0];
}

function abrirResultadosExternosModal(examen, id) {
  const inputBioanalista = document.getElementById("inputBioanalistaExterno");
  const inputNota = document.getElementById("inputNotaExterno");
  const inputOrden = document.getElementById("inputOrdenExterno");
  const inputPdf = document.getElementById("inputPdfExterno");
  const selectLab = document.getElementById("selectLaboratorio");
  const button = document.getElementById("guardarResultadoExPcExterno");
  button.setAttribute("onclick", "guardarResultadosExamenExterno()");

  selectLab.value = "";
  inputBioanalista.value = "";
  inputNota.value = "";
  inputOrden.value = "";
  inputPdf.value = "";

  new bootstrap.Modal("#resultadosExternosModal").toggle();

  const h1Ex = document.getElementById("h1NombreExPc");

  tBodyDiagnosticos.innerHTML = "";
  h1Ex.innerText = `${examen} - ${pacienteObj.nombre} - ${pacienteObj.edad}`;
  examenPendiente = id;
}
function abrirResultadosExternosModalMod(examen, id, bio, nota, idLab, orden) {
  const inputBioanalista = document.getElementById("inputBioanalistaExterno");
  const inputNota = document.getElementById("inputNotaExterno");
  const inputOrden = document.getElementById("inputOrdenExterno");
  const selectLab = document.getElementById("selectLaboratorio");
  const button = document.getElementById("guardarResultadoExPcExterno");
  button.setAttribute("onclick", "guardarModificacionExamenExterno()");
  inputBioanalista.value = bio;
  inputNota.value = nota;
  selectLab.value = idLab;
  inputOrden.value = orden;
  examenPendiente = id;

  new bootstrap.Modal("#resultadosExternosModal").toggle();

  const h1Ex = document.getElementById("h1NombreExPc");

  tBodyDiagnosticos.innerHTML = "";
  h1Ex.innerText = `${examen} - ${pacienteObj.nombre} - ${pacienteObj.edad}`;
}
const subirImagenPdfExterno = async () => {
  try {
    const imagen = document.getElementById("inputPdfExterno");

    if (imagen.value !== "") {
      const file = imagen.files[0];
      // Validar que el archivo sea un PDF
      if (file.type !== "application/pdf") {
        alert("Solo se permiten archivos PDF.");
        return "";
      }

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
async function guardarResultadosExamenExterno() {
  const inputBioanalista = document.getElementById("inputBioanalistaExterno");
  const inputNota = document.getElementById("inputNotaExterno");
  const inputOrden = document.getElementById("inputOrdenExterno");
  const PDF = await subirImagenPdfExterno();
  const selectLab = document.getElementById("selectLaboratorio");
  const alertaDiv = document.getElementById("alertaExamen");

  if (inputBioanalista.value == "") {
    alertaDiv.removeAttribute("hidden");

    alertaDiv.innerText = `El bioanalista no puede estar vacio`;
    setTimeout(() => {
      alertaDiv.setAttribute("hidden", "true");
    }, 3000);
    return;
  }
  if (inputOrden.value == "") {
    alertaDiv.removeAttribute("hidden");

    alertaDiv.innerText = `La ORDEN no puede estar vacia`;
    setTimeout(() => {
      alertaDiv.setAttribute("hidden", "true");
    }, 3000);
    return;
  }

  try {
    const { token } = await login.getToken();

    const res = await axios.post(
      urlsv + "/api/examenes/crear-examenExterno",
      {
        bioanalista: inputBioanalista.value,
        nota: inputNota.value,
        idLab: selectLab.value,
        idPac: pacienteObj.id,
        idEx: examenPendiente,
        PDF,
        orden: inputOrden.value,
      },
      { headers: { token } }
    );
    const alertaDiv = document.getElementById("alertaExamen");

    alertaDiv.className = `alert alert-success`;
    alertaDiv.removeAttribute("hidden");

    alertaDiv.innerText = res.data.mensaje;
  } catch (error) {
    console.log(error);
    const alertaDiv = document.getElementById("alertaExamen");

    alertaDiv.removeAttribute("hidden");

    alertaDiv.innerText = error.response.data.mensaje;
  }
  setTimeout(() => {
    alertaDiv.setAttribute("hidden", "true");
  }, 3000);
}

async function guardarModificacionExamenExterno() {
  const inputBioanalista = document.getElementById("inputBioanalistaExterno");
  const inputNota = document.getElementById("inputNotaExterno");
  const inputOrden = document.getElementById("inputOrdenExterno");
  const PDF = await subirImagenPdfExterno();
  const selectLab = document.getElementById("selectLaboratorio");
  const alertaDiv = document.getElementById("alertaExamen");

  if (inputBioanalista.value == "") {
    alertaDiv.removeAttribute("hidden");

    alertaDiv.innerText = `El bioanalista no puede estar vacio`;
    setTimeout(() => {
      alertaDiv.setAttribute("hidden", "true");
    }, 3000);
    return;
  }
  if (inputOrden.value == "") {
    alertaDiv.removeAttribute("hidden");

    alertaDiv.innerText = `La ORDEN no puede estar vacia`;
    setTimeout(() => {
      alertaDiv.setAttribute("hidden", "true");
    }, 3000);
    return;
  }

  try {
    const { token } = await login.getToken();

    const res = await axios.put(
      urlsv + "/api/examenes/modificar-examenExterno",
      {
        bioanalista: inputBioanalista.value,
        nota: inputNota.value,
        idLab: selectLab.value,
        idExt: examenPendiente,
        PDF,
        orden: inputOrden.value,
      },
      { headers: { token } }
    );
    const alertaDiv = document.getElementById("alertaExamen");

    alertaDiv.className = `alert alert-success`;
    alertaDiv.removeAttribute("hidden");

    alertaDiv.innerText = res.data.mensaje;
  } catch (error) {
    console.log(error);
    const alertaDiv = document.getElementById("alertaExamen");

    alertaDiv.removeAttribute("hidden");

    alertaDiv.innerText = error?.response?.data?.mensaje;
  }
  setTimeout(() => {
    alertaDiv.setAttribute("hidden", "true");
  }, 3000);
}
function validarSelectSeccion(value) {
  if (value == "todos") {
    examenes = examenesArray;
  } else {
    examenes = examenesArray.filter((ex) => {
      return ex.id_seccion == value;
    });
  }
  buscarExamen();
}
const render = async () => {
  try {
    const { token } = await login.getToken();
    const secciones = await axios.get(
      urlsv + "/api/modulo-examenes/secciones",
      { headers: { token } }
    );
    const selectSeccion = document.getElementById("seccionExamenSelect");
    selectSeccion.innerHTML = `
    <option value="todos">Filtrar por seccion</option>
    
    `;
    seccionesData = secciones.data;

    secciones.data.forEach((seccion) => {
      const option = document.createElement("option");
      option.value = seccion.id;
      option.innerText = seccion.nombre;
      selectSeccion.appendChild(option);
    });

    try {
      const { data: empresas } = await axios.get(
        urlsv + "/api/examenes/get-empresas",
        { headers: { token } }
      );

      const selectEmpresa = document.getElementById("selectEmpresa");

      empresas.forEach((e) => {
        selectEmpresa.innerHTML += `
        <option value="${e.id}">${e.nombre}</option>
        
        `;
      });
    } catch (error) {
      console.log(error);
    }

    let { data: examenesGet } = await axios.get(
      urlsv + "/api/examenes/get-examenes",
      { headers: { token } }
    );
    examenesGet = examenesGet.sort(function (a, b) {


      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })
    const { data: laboratorios } = await axios.get(
      urlsv + "/api/modulo-examenes/laboratorios",
      { headers: { token } }
    );
    examenesArray = examenesGet;
    let { data: bioanalistas } = await axios.get(
      urlsv + "/api/examenes/get-bioanalistas",
      { headers: { token } }
    );

    try {
      let { data: pacientes } = await axios.get(
        urlsv + "/api/estadisticas/get-pacientes",
        { headers: { token } }
      );

      pacientes = pacientes.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      pacientesArray = pacientes
      const menu = document.getElementById("menuPacientesUl");
      menu.innerHTML = "";
      pacientesArray.forEach((e) => {
        menu.innerHTML += `
        <li class="list-group-item list-group-item-light list-group-item-action" >
          <div class="row">
            <div class="col-3">
              <span class="">${e.cedula}</span>

            </div>
            <div class="col-6">
              <span class="">${e.nombre.trim()}</span>

            </div>
            <div class="col-3 d-flex justify-content-end align-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" data-bs-dismiss="modal" fill="green" onclick="setInputCedula(${e.cedula
          },'${e.pre_cedula}')" class="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg>
            </div>

          </div>
        </li> 
        `;
      });
    } catch (error) {
      console.log(error);
    }

    examenes = examenesGet;
    const selectBio = document.getElementById("selectBioAnalista");

    if (nivelUser == 3) {
      bioanalistas = bioanalistas.filter((e) => e.cedula == cedulaUser);
      selectBio.setAttribute("disabled", "true");
    }
    bioanalistas.forEach((b) => {
      selectBio.innerHTML += `
      <option value='${b.id}'>${b.nombre}</option>
      `;
    });

    const selectLab = document.getElementById("selectLaboratorio");
    selectLab.innerHTML = "";

    laboratorios.forEach((l) => {
      selectLab.innerHTML += `
      <option value='${l.id}'>${l.razon_social}</option>

      `;
    });
    const menuDiagnosticoUl = document.getElementById("menuDiagnosticoUl");
    examenesArray.forEach((ex) => {
      menuDiagnosticoUl.innerHTML += `
      <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
              <div class="col-9">
                <span class="">${ex.nombre}</span>

              </div>
              <div class="col-3 d-flex justify-content-end align-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" onclick="abrirResultadosModal('${ex.nombre
        }','${ex.id
        }','true')" width="24" height="24" fill="green" class="bi bi-check-circle " viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" fill="green" aria-expanded="false" aria-controls="collapseMenu${ex.id
        }" data-bs-toggle="collapse" data-bs-target="#collapseMenu${ex.id
        }" onclick="detalleExamen(${ex.id
        })"class="bi bi-eye mx-4" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>

            ${nivelUser == 1
          ? `<svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" fill="green" class="bi bi-folder-symlink" viewBox="0 0 16 16" onclick="abrirResultadosExternosModal('${ex.nombre}','${ex.id}')">
              <path d="m11.798 8.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742"/>
              <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m.694 2.09A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09l-.636 7a1 1 0 0 1-.996.91H2.826a1 1 0 0 1-.995-.91zM6.172 2a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
            </svg>`
          : ""
        }
              
                
              
             
              </div>

            </div>
          </li> 
          <div class="collapse" id="collapseMenu${ex.id}">
          <div class="card card-body">
          </div>
  
      `;
    });
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
};
function setInputCedula(ci, pre) {
  document.getElementsByName('pre_cedula')[0].value = pre
  document.getElementById("ciInput").value = ci;
  document.getElementById('buscarPacienteButton').click();
}

function buscarPacienteInput(value) {
  let pac = [];

  if (isNaN(value)) {
    pac = pacientesArray.filter((e) =>
      e.nombre.toLowerCase().includes(value.toLowerCase())
    );
  } else {
    if (value == "") {
      pac = pacientesArray;
    } else {
      pac = pacientesArray.filter((e) => e.cedula.toString().includes(value));
    }
  }

  const menu = document.getElementById("menuPacientesUl");
  menu.innerHTML = "";
  pac.forEach((e) => {
    menu.innerHTML += `
      <li class="list-group-item list-group-item-light list-group-item-action" >
        <div class="row">
          <div class="col-3">
            <span class="">${e.cedula}</span>

          </div>
          <div class="col-6">
            <span class="">${e.nombre.trim()}</span>

          </div>
          <div class="col-3 d-flex justify-content-end align-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" data-bs-dismiss="modal" style="cursor:pointer" width="24" height="24" fill="green" onclick="setInputCedula(${e.cedula
      },'${e.pre_cedula}')" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
          </svg>
          </div>

        </div>
      </li`;
  });
}

async function eliminarPendiente(id) {
  try {
    const { token } = await login.getToken();

    const { data: pendientes } = await axios.get(
      urlsv + "/api/examenes/delete-pendientes-paciente",
      {
        params: {
          id,
        },
        headers: { token },
      }
    );
    document.getElementById("alertaExamen").className = "alert alert-success";
    document.getElementById(
      "alertaExamen"
    ).innerHTML = `<strong>Examen pendiente eliminado con exito</strong>`;
    document.getElementById("alertaExamen").removeAttribute("hidden");
    const menuDiagnosticoUl = document.getElementById("menuDiagnosticoUl");
    try {
      const { data: pendientes } = await axios.get(
        urlsv + "/api/examenes/get-pendientes-paciente",
        {
          params: {
            idPac: pacienteObj.id,
          },
          headers: { token },
        }
      );
      examenesPendientes = pendientes;
    } catch (error) {
      console.log(error);
    }

    menuDiagnosticoUl.innerHTML = "";
    setTimeout(() => {
      document.getElementById("alertaExamen").setAttribute("hidden", "true");
      document.getElementById("alertaExamen").className = "alert alert-danger";
      document.getElementById("alertaExamen").innerHTML = ``;
    }, 3000);
  } catch (error) {
    console.log(error);
  }
}

async function guardarPendienteOrden(id) {
  try {
    const { token } = await login.getToken();

    const { data: examen } = await axios.get(
      urlsv + "/api/examenes/get-pendiente-examen",
      {
        params: {
          id,
        },
        headers: { token },
      }
    );
    const reimpresionButton = document.getElementById("reimpresionButton");

    reimpresionButton.setAttribute("hidden", "true");

    if (examenesDelPaciente.length == 0) {
      document.getElementById("tBodyLgEx").innerHTML = `
      <a href="#" class="list-group-item list-group-item-action fw-semibold liTableExPac">
                <div class="container" id="tHeadLgEx">
                  <div class="row text-center">
                    <div class="col-1">
                      #
                    </div>
                    <div class="col-8">
                      Tipo Examen
                    </div>
                    <div class="col-3">Fecha</div>
                  </div>
                </div>
              </a>
      `;
    }

    examenesDelPaciente.push(examen.examenPac);
    document.getElementById("tHeadLgEx").innerHTML = `
    <div class="row text-center">
                      <div class="col-1">
                        #
                      </div>
                      <div class="col-8">
                        Tipo Examen
                      </div>
                      <div class="col-3">Status</div>
                    </div>

    `;

    añadirRowTablaExPac(examen.examenPac);
    document.getElementById(`totalizarButton`).removeAttribute("hidden");
    eliminarPendiente(id);
  } catch (error) { }
}

function buscarExamenPendiente() {
  input = document.getElementById("examenDiagnosticoInput");
  if (examenesPendientes.length > 0) {
    filtro = examenesPendientes.filter((ex) =>
      ex.nombre.toLowerCase().includes(input.value.toLowerCase())
    );
  } else {
    return;
  }

  const menuDiagnosticoUl = document.getElementById("menuDiagnosticoUl");

  menuDiagnosticoUl.innerHTML = "";
  filtro.map((ex) => {
    menuDiagnosticoUl.innerHTML += `
    <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
            <div class="col-1">
                <span class="">${ex.id}</span>

              </div>
              <div class="col-5">
                <span class="">${ex.nombre}</span>

              </div>
              
              <div class="col-3 d-flex justify-content-end align-content-center">
              ${nivelUser == 2
        ? ""
        : `<svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" onclick="guardarPendienteOrden(${ex.id})"  width="24" height="24" fill="green" class="bi bi-check-circle mx-4" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
              </svg
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="cursor:pointer" onclick="eliminarPendiente('${ex.id}')" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>`
      }
              </div>
                
              <div class="col-3">
                <span class="">${ex.fecha.split("T")[0]}</span>

              </div>
             
              

            </div>
          </li> 
          


    `;
  });
}
function buscarExamen() {
  input = document.getElementById("examenDiagnosticoInput");

  filtro = examenes.filter((ex) =>
    ex.nombre.toLowerCase().includes(input.value.toLowerCase())
  );
  const menuDiagnosticoUl = document.getElementById("menuDiagnosticoUl");

  menuDiagnosticoUl.innerHTML = "";
  filtro.map((ex) => {
    menuDiagnosticoUl.innerHTML += `
    <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
              <div class="col-9">
                <span class="">${ex.nombre}</span>

              </div>
              <div class="col-3 d-flex justify-content-end align-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" onclick="abrirResultadosModal('${ex.nombre
      }','${ex.id
      }','true')" width="24" height="24" fill="green" class="bi bi-check-circle " viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" fill="green" aria-expanded="false" aria-controls="collapseMenu${ex.id
      }" data-bs-toggle="collapse" data-bs-target="#collapseMenu${ex.id
      }" onclick="detalleExamen(${ex.id
      })"class="bi bi-eye mx-4" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
            ${nivelUser == 1
        ? `<svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" fill="green" class="bi bi-folder-symlink" viewBox="0 0 16 16" onclick="abrirResultadosExternosModal('${ex.nombre}','${ex.id}')">
              <path d="m11.798 8.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742"/>
              <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m.694 2.09A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09l-.636 7a1 1 0 0 1-.996.91H2.826a1 1 0 0 1-.995-.91zM6.172 2a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
            </svg>`
        : ""
      }
              
                
              
             
              </div>

            </div>
          </li> 
          <div class="collapse" id="collapseMenu${ex.id}">
          <div class="card card-body">
          </div>
          </div> 


    `;
  });
}

async function detalleExamen(id) {
  const { token } = await login.getToken();
  let { data: caracteristicas } = await axios.get(
    urlsv + "/api/modulo-examenes/caracteristicas-id_ex",
    { headers: { token }, params: { id } }
  );
  caracteristicas = caracteristicas.sort(function (a, b) {
    if (a.posicion > b.posicion) {
      return 1;
    }
    if (a.posicion < b.posicion) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  const collapse = document.getElementById(`collapseMenu${id}`);
  collapse.innerHTML = `
  <table class="table table-sm text-center" style="border: 2px solid green; font-size:15px">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Unidad</th>
      <th scope="col">Posicion</th>
      <th scope="col">Imprimir</th>
    </tr>
  </thead>
  <tbody id="tBody${id}">
    
  </tbody>
</table>
  `;
  const tBody = document.getElementById(`tBody${id}`);

  caracteristicas.forEach((c) => {
    if (c.nombre) {
      if (c.status == "titulo") {
        tBody.innerHTML += `
      <tr>
        <th colspan="4" scope="col">${c.titulo}</th>
        
      </tr>
      `;
      } else {
        tBody.innerHTML += `
      <tr>
        <td scope="col">${c.nombre}</td>
        <td scope="col">${c.unidad ? c.unidad : ''}</td>
        <td scope="col">${c.posicion}</td>
        <td scope="col">${c.impsiempre == 1 ? "SI" : "NO"}</td>
      </tr>
      `;
      }
    }
  });
}
function vaciarExamenes() {
  examenesDelPaciente = [];
}

const cedulaPaciente = async () => {

  document
    .getElementById("buscarPacienteButton")
    .setAttribute("disabled", "disabled");

  const preCedula = document.getElementsByName("pre_cedula")[0].value;
  //const nombreHijo = (document.getElementsByName("childName")[0].value).split("-")[0] || '';
  if (preCedula != "E" && preCedula != "V" && preCedula != "N") {
    return cedulaAlerta(
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
  </svg>  <div>
      Ingrese una pre cedula valida
    </div>`,
      "warning"
    );
  }

  if (preCedula === "N") {
    validarN();
  } else {
    const cedula = document.getElementsByName("cedula")[0].value;
    const fecha = document.getElementsByName("fechaRegistro")[0].value;
    var inputs = [...document.getElementsByTagName("input")];
    const botonModificar = document.getElementById("botonModificar");
    const botonExamen = document.getElementById("botonExamen");
    inputs.map((inp) => {
      if (
        inp.name != "pre_cedula" &&
        inp.name != "cedula" &&
        inp.name != "fechaRegistro"
      ) {
        inp.value = "";
      }
    });

    if (
      preCedula == "" ||
      cedula == "" ||
      !cedula ||
      cedula.length < 6 ||
      cedula.length > 12
    ) {
      return cedulaAlerta(
        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
  </svg>  <div>
  Ingrese una cedula valida
    </div>`,
        "warning"
      );
    }

    try {
      if (cedula.length >= 6 && cedula.length <= 12) {
        const { token } = await login.getToken();

        const { data: paciente } = await axios.get(
          urlsv + "/api/examenes/get-paciente",
          {
            params: {
              cedula,
              preCedula,
              nombreHijo
            },
            headers: { token },
          }
        );

        examenesPendientes = [];

        pacienteObj = paciente;
        pacienteObj.edad = calcularEdadNormal(paciente.fecha_nacimiento);
        if (paciente.paciente == 404) {
          cedulaAlerta(
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>  <div>
      No se ha encontrado el usuario, agréguelo para continuar
        </div>`,
            "primary"
          );
          activarInputs("crearPaciente()");
        } else {
          desactivarInputs();

          const { data: pendientes } = await axios.get(
            urlsv + "/api/examenes/get-pendientes-paciente",
            {
              params: {
                idPac: paciente.id,
              },
              headers: { token },
            }
          );
          examenesPendientes = pendientes;

          idPaciente = paciente.id;

          botonModificar.setAttribute(
            "onclick",
            'activarInputs("modificarPaciente()")'
          );
          botonExamen.setAttribute("onclick", "abrirModalExamenes()");

          paciente.fecha_nacimiento = moment(paciente.fecha_nacimiento).format(
            "YYYY-MM-DD"
          );
          document.getElementsByName("edad")[0].value = calcularEdadNormal(
            paciente.fecha_nacimiento
          );
          for (let clave in paciente) {
            if (clave == "fecha_nacimiento") {
              document.getElementsByName(clave)[0]
                ? (document.getElementsByName(clave)[0].value =
                  moment(paciente[clave]).format("YYYY-MM-DD") ?? "")
                : "";
            } else {
              document.getElementsByName(clave)[0]
                ? (document.getElementsByName(clave)[0].value =
                  paciente[clave] ?? "")
                : "";
            }
          }
          buscarExamenesPaciente(),
            document
              .getElementById(paciente.genero)
              .removeAttribute("disabled");
          document.getElementById(paciente.genero).click();
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status != 404) {
        return await alerta.error();
      }
    }
  }

  setTimeout(() => {
    document.getElementById("buscarPacienteButton").removeAttribute("disabled");
  }, 1500);
};

const desactivarInputs = () => {
  var inputs = [...document.getElementsByTagName("input")];
  const botonGuardar = document.getElementById("botonGuardar");
  if (botonGuardar) {
    botonGuardar.remove();
  }
  const bsCollapse = new bootstrap.Collapse("#collapseDatos", {
    toggle: false,
  });
  bsCollapse.hide();

  inputs.map((inp) => {
    if (
      inp.name != "pre_cedula" &&
      inp.name != "cedula" &&
      inp.name != "childName" &&
      inp.name != "fechaRegistro" &&
      inp.name != "fecha_nacimiento" &&
      inp.name != "fechaRegistro" &&
      !inp.className.includes("inputExamen") &&
      inp.id != "inputOrden" &&
      inp.id != "inputPacienteExpediente" &&
      inp.id != "inputBioanalistaExterno" &&
      inp.id != "inputNotaExterno" &&
      inp.id != "inputPdfExterno" &&
      inp.id != "inputOrdenExterno" &&
      inp.id != "pacienteDiagnosticoInput"
    ) {
      inp.setAttribute("readonly", "true");
    }

    if (inp.name == "genero" || inp.name == 'fecha_nacimiento') {
      inp.setAttribute("disabled", "true");
    }
  });
};

const activarInputs = async (click) => {
  var inputs = [...document.getElementsByTagName("input")];
  const bsCollapse = new bootstrap.Collapse("#collapseDatos", {
    toggle: false,
  });
  bsCollapse.show();
  if (pacienteObj.genero) {
    document.getElementById(pacienteObj.genero).setAttribute('checked', 'true')

  }

  inputs.map((inp) => {
    inp.removeAttribute("readonly");
    inp.removeAttribute("disabled");
  });
  document.getElementsByName("edad")[0].setAttribute("readonly", "true");
  const botonGuardar = document.getElementById("botonGuardar");
  if (!botonGuardar) {
    document.getElementById("divRadios").innerHTML += `
    <button type="button" onclick="${click}" class="btn btn-outline-primary" id="botonGuardar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-floppy2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5m9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"
                />
              </svg>
            </button>
    `;
  }
};

function validarChars(value) {
  let value2 = value.toUpperCase()
  if ((value2.charCodeAt(value.length - 1) < 65 || value2.charCodeAt(value.length - 1) > 90) && value2.charCodeAt(value.length - 1) != 209) {
    value = value.replaceAll(value2[value.length - 1].toLowerCase(), '').replaceAll(value2[value.length - 1], '')
  }
  document.getElementById('nombreInputPaci').value = value
}

async function modificarPaciente() {
  const generoRadio = document.getElementsByName("genero");
  var genero;
  const nombre = document.getElementsByName("nombre")[0];
  const cedula = document.getElementsByName("cedula")[0];
  const preCedula = document.getElementsByName("pre_cedula")[0];
  const nacimiento = document.getElementsByName("fecha_nacimiento")[0];
  const direccion = document.getElementsByName("direccion")[0];
  const telefono = document.getElementsByName("telefono")[0];
  const correo = document.getElementsByName("correo")[0];

  [...generoRadio].forEach((e) => {
    if (e.checked) {
      genero = { name: "genero", value: e.id, tagName: "INPUT" };
    }
  });
  const pacienteArray = [
    genero,
    nombre,
    cedula,
    preCedula,
    nacimiento,
    direccion,
    telefono,
    correo,
  ];
  const validacion = validarDatosPaciente(pacienteArray);

  if (validacion) {
    try {
      const { token } = await login.getToken();

      await axios.post(
        urlsv + "/api/creacion/agregar-paciente",
        { paciente: validacion, new: false, idPaciente },
        { headers: { token } }
      );
      const modal = new bootstrap.Modal("#confirmacion-modal-paciente");
      modal.show();
      desactivarInputs();
      cedulaPaciente();
    } catch (error) {
      console.log(error);
      if (error.response.data.mensaje) {
        return await alerta.alert("Error:", error.response.data.mensaje);
      } else {
        return await alerta.error();
      }
    }
  }
}

const validarDatosPaciente = (pacienteArray) => {
  const paciente = [];
  let cadena = [];
  pacienteArray.forEach((el) => {
    if (el.tagName == "SELECT" || el.tagName == "INPUT") {
      if (el.value == "") {
        if (el.name !== "genero") {
          cadena.push(
            `El campo <b class='text-danger'>${el.name}</b> no puede estar vacío`
          );
        }
      }
      if (el.name == "telefono") {
        let validarletra = false;

        for (let i = 0; i < el.value.length; i++) {
          const c = el.value[i];
          if (c == "+") {
            if (i != 0) {
              validarletra = true;
            }
          } else {
            if (isNaN(parseInt(c))) {
              validarletra == true;
            }
          }
        }

        if (validarletra) {
          cadena.push(`El campo "Teléfono" debe contener solo números`);
        }
      }

      if (el.name == "cedula") {
        if (el.value < 0) {

          cadena.push(`Debe ingresar una cedula valida`);
        }
      }
      if (el.name == "nombre") {
        if (!isNaN(el.value)) {
          cadena.push(`Ingresó un número en lugar de un nombre`);
        }
      }
      if (el.name == "correo") {
        if (el.value != "") {
          if (el.value.split("@")[0] == "" || el.value.split("@")[1] == "") {
            cadena.push("Ingrese un correo valido");
          }

          if (!el.value.split("@")[1].split(".")[1].includes("com")) {
            cadena.push("Ingrese un correo valido");
          }
        } else {
          cadena.push("El campo correo no puede estar vacio");
        }
      }
      if (el.name == "fecha_nacimiento") {
        if (moment(el.value).isAfter(moment().format("YYYY-MM-DD"))) {
          cadena.push(`La fecha de nacimiento no puede ser mayor a la actual`);
        }
      }
      if (el.name == "genero") {
      }
      const elemento = { value: el.value, name: el.name };
      paciente.push(elemento);
    }
  });
  if (cadena.length > 0) {
    cedulaAlerta(
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
  </svg>  <div>
  <p>
  ${cadena.join(", ")}
  </p>
    </div>`,
      "warning"
    );
    return false;
  } else {
    return paciente;
  }
};

const crearPaciente = async () => {
  const generoRadio = document.getElementsByName("genero");
  var genero;
  const nombre = document.getElementsByName("nombre")[0];
  const cedula = document.getElementsByName("cedula")[0];
  const preCedula = document.getElementsByName("pre_cedula")[0];
  const nacimiento = document.getElementsByName("fecha_nacimiento")[0];
  const direccion = document.getElementsByName("direccion")[0];
  const telefono = document.getElementsByName("telefono")[0];
  const correo = document.getElementsByName("correo")[0];

  [...generoRadio].forEach((e) => {
    if (e.checked) {
      genero = { name: "genero", value: e.id, tagName: "INPUT" };
    }
  });

  const pacienteArray = [
    genero,
    nombre,
    cedula,
    preCedula,
    nacimiento,
    direccion,
    telefono,
    correo,
  ];
  const validacion = validarDatosPaciente(pacienteArray);

  if (validacion) {
    try {
      const { token } = await login.getToken();

      await axios.post(
        urlsv + "/api/creacion/agregar-paciente",
        { paciente: validacion, new: true, idPaciente },
        { headers: { token } }
      );
      const modal = new bootstrap.Modal("#confirmacion-modal");
      modal.show();
      desactivarInputs();
    } catch (error) {
      console.log(error);
      if (error.response?.data?.mensaje) {
        return await alerta.alert("Error:", error.response.data.mensaje);
      } else {
        return await alerta.error();
      }
    }
  }

};

const reloadPage = async () => {
  const res = await alerta.alert(
    "Reiniciar:",
    "¿Esta seguro que desea reiniciar la ventana? Todos los campos quedaran vacios"
  );
  if (res.response == 1) return;
  else location.reload();
};

function validarSelectOrden(value) {
  const inputOrden = document.getElementById("inputOrden");
  if (value == "no") {
    inputOrden.setAttribute("disabled", "true");
    document.getElementById("selectEmpresa").setAttribute("disabled", "true");
  } else {
    try {
      inputOrden.removeAttribute("disabled");
    } catch (error) { }
  }

  if (value == "clave") {
    document.getElementById("selectEmpresa").removeAttribute("disabled");
  }
  if (value == "orden") {
    document.getElementById("selectEmpresa").setAttribute("disabled", "true");
  }

  document
    .getElementById("guardarOrdenButton")
    .setAttribute("onclick", `guardarOrden('${value}')`);
}

async function reimprimirExamenes() {
  let reimp = reimpresionArray.map((e) => e.id);
  try {
    const { token } = await login.getToken();

    const res = await axios.post(
      urlsv + "/api/examenes/reimpresion-examen",
      { reimp },
      { headers: { token } }
    );

    const examen = {
      orden: "Reimpresion",
      paciente: pacienteObj,
      examenes: res.data.examenes,
    };
    await examenVar.store(examen);
    abrirPDFWindow();
  } catch (error) { }
}

function abrirModalReimpresion() {
  reimpresionArray = [];
  const checksH = document.getElementsByName("checksExamenesBdd");
  const checks = [...checksH];
  const checked = checks.filter((e) => e.checked == true);
  const tBodyOrden = document.getElementById(`tBodyLgExRe`);
  const pacienteInput = document.getElementById("inputPacienteReimpresion");
  pacienteInput.value = pacienteObj.nombre;

  tBodyOrden.innerHTML = "";
  if (checked.length > 0) {
    checked.forEach((e) => {
      reimpresionArray.push({
        id: e.value,
        nombre: e.attributes.nombre.value,
      });
      tBodyOrden.innerHTML += `
        
      <a href="#" class="list-group-item list-group-item-action fs-6 fw-semibold">
      <div class="container">
        <div class="row text-center">
          <div class="col-1">
            ${e.value}
          </div>
          <div class="col-7">
            ${e.attributes.nombre.value}
          </div>
          
          <div class="col-4 d-flex justify-content-end">
          ${e.attributes.fecha.value}
  
            
          </div>
          
            
          </div>
        </div>
      </div>
    </a>
     
    `;
    });

    new bootstrap.Modal("#reimpresionModal").toggle();
  } else {
    return cedulaAlerta(
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>  <div>
      Por favor seleccione un examen a reimprimir
  </div>`,
      "warning"
    );
  }
}
const abrirModalTotalizar = () => {
  const tBodyOrden = document.getElementById(`tBodyLgExOrd`);
  const tr = document.getElementsByClassName("liBodyTablaExPacOrd");
  const pacienteInput = document.getElementById("inputPacienteOrden");
  pacienteInput.value = pacienteObj.nombre;

  tBodyOrden.innerHTML = "";

  examenesDelPaciente.forEach((ex) => {
    tBodyOrden.innerHTML += `
    <a href="#" class="list-group-item list-group-item-action fs-6 fw-semibold liBodyTablaExPacOrd">
    <div class="container">
      <div class="row text-center">
        <div class="col-1">
          ${tr.length + 1}
        </div>
        <div class="col-8">
          ${ex.examenNombre}
        </div>
        <div class="col-3 d-flex justify-content-end">
          <div class="form-check mx-2">
            <input class="form-check-input" type="checkbox" name="checksOrden" value="${ex.examenId
      }" >
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="green" class="bi bi-eye svgButton" viewBox="0 0 16 16"  data-bs-toggle="collapse" href="#collapseOrdenEx${ex.examenId
      }" role="button" aria-expanded="false" aria-controls="collapseOrdenEx${ex.examenId
      }">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
        </div>
        <div class="collapse" id="collapseOrdenEx${ex.examenId}">
        <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Caracteristica</th>
            <th scope="col">Resultado</th>
            <th scope="col">Nota</th>
          </tr>
        </thead>
        <tbody id='tBodyOrdenCollapseEx${ex.examenId}'>

        </tbody>
      </table>
        </div>
      </div>
    </div>
  </a>
    `;
    const tBodyOrdenCollapse = document.getElementById(
      `tBodyOrdenCollapseEx${ex.examenId}`
    );
    ex.detallesExamenPc = ex.detallesExamenPc.sort(function (a, b) {
      if (a.posicion > b.posicion) {
        return 1;
      }
      if (a.posicion < b.posicion) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    ex.detallesExamenPc.forEach((dt) => {
      if (dt.status == "titulo") {
        tBodyOrdenCollapse.innerHTML += `
    <tr>
      <td scope="col" colspan="3" style="font-size:10px">${dt.titulo}</td>
    
      
    </tr>

`;
      } else {
        tBodyOrdenCollapse.innerHTML += `
    <tr style="font-size:10px">
      <td scope="col">${dt.nombreCar}</td>
      <td scope="col">${dt.resultado}</td>
      <td scope="col">${dt.nota}</td>
    </tr>

`;
      }
    });
  });

  new bootstrap.Modal("#ordenModal").toggle();
};

async function guardarModSubBdd(id) {
  const inputs = document.getElementsByClassName("inputSc" + id);
  const nota = document.getElementById(`inputNt${id}`);
  const alerta = document.getElementById("alertaModificacionExamenBdd");

  let subCa = [];

  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i];
    if (element.attributes.sb) {
      subCa.push({
        id: element.attributes.sb.value,
        campo: element.attributes.columna.value,
        valor: element.value,
      });
    }
  }
  try {
    const { token } = await login.getToken();

    await axios.put(
      urlsv + "/api/examenes/update-subCaracteristicasCar",
      { idCar: id, nota: nota.value, subCaracteristicas: subCa },
      { headers: { token } }
    );

    alerta.removeAttribute("hidden");
    alerta.innerText = `El resultado ha sido modificado exitosamente`;
    alerta.className = `alert alert-success`;
    desactivarInputsResSb(id);

    setTimeout(() => {
      alerta.setAttribute("hidden", "true");
      alerta.innerText = "";
    }, 3000);
  } catch (error) { }

}

function activarSelectLab() {
  const selectLaboratorio = document.getElementById("selectLaboratorio");
  selectLaboratorio.removeAttribute("disabled");
  const guardarSelect = document.getElementById("guardarSelect");
  guardarSelect.removeAttribute("hidden");
  const modSelect = document.getElementById("modificarSelect");
  modSelect.setAttribute("hidden", "true");
}

async function guardarCambioLab(id) {
  const selectLaboratorio = document.getElementById("selectLaboratorio");
  let idLab = selectLaboratorio.value;
  const alerta = document.getElementById("alertaModificacionExamenBdd");

  try {
    const { token } = await login.getToken();

    const { data } = await axios.put(
      urlsv + "/api/examenes/modificar-laboratorio",
      {
        id,
        idLab,
      },
      {
        headers: { token },
      }
    );
    selectLaboratorio.setAttribute("disabled", "true");
    const guardarSelect = document.getElementById("guardarSelect");
    guardarSelect.setAttribute("hidden", "true");
    const modSelect = document.getElementById("modificarSelect");
    modSelect.removeAttribute("hidden");
    alerta.removeAttribute("hidden");
    alerta.innerText = `El resultado ha sido modificado exitosamente`;
    alerta.className = `alert alert-success`;

    setTimeout(() => {
      alerta.setAttribute("hidden", "true");
      alerta.innerText = "";
    }, 3000);
  } catch (error) { }
}
const modificarExamenPacienteBDD = async (examen, idEx, idExPc) => {
  new bootstrap.Modal("#resultadosModal").toggle();
  const h1Ex = document.getElementById("h1NombreEx");
  const tBodyDiagnosticos = document.getElementById("tBodyDiagnosticos");
  tBodyDiagnosticos.innerHTML = "";
  h1Ex.innerText = `${examen} - ${pacienteObj.nombre} - ${pacienteObj.edad}`;
  const guardarButton = document.getElementById(`guardarResultadoExPc`);
  guardarButton.setAttribute("hidden", "true");

  try {
    const { token } = await login.getToken();

    let { data: resultados } = await axios.get(
      urlsv + "/api/examenes/resultados-examen",
      {
        params: {
          id: idExPc,
        },
        headers: { token },
      }
    );
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

    resultados.forEach((ct) => {
      if (ct.nombre == null) {
        ct.nombre = ''
      }
      if (ct.status == "titulo") {
        tBodyDiagnosticos.innerHTML += `
            <tr>
                        <th scope="row" colspan="7">${ct.titulo}</th>
                        
          
                      </tr>
            `;
      } else {
        if (ct.sub.length > 0) {
          tBodyDiagnosticos.innerHTML += `
        <tr >
                <th scope="row" colspan="2">${ct.nombre}</th>
                <th> <input disabled class="form-control form-control-sm inputExDetallePacCar" rango='no' name='rs-${ct.id}' type="text" id='inputRs${ct.id}' value="SubCaracteristica" placeholder="Ingrese Resultado" aria-label=".form-control-sm example"> </th>
                <th>Resultado</th>
                <td></td>
                <td>  <input disabled class="inputSc${ct.id} form-control form-control-sm" type="text" id='inputNt${ct.id}' value="${ct.nota}" placeholder="Nota" aria-label=".form-control-sm example">              </td>
                <td>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" id="modificarResSvg${ct.id}" onclick="activarInputsResSb(${ct.id})" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" hidden id="guardarResSvg${ct.id}" onclick="guardarModSubBdd(${ct.id})" class="bi bi-save" viewBox="0 0 16 16">
  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
</svg>
              </td>
              </tr>
        `;
          ct.sub.forEach((sb) => {
            if (sb.tipo == "formula") {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                  <td colspan="2"></td>
                  <th scope="row" colspan="">${sb.nombre}</th>
                  <td>  <input disabled id="Rs-${sb.id}"cvalue="${sb.resultado}" class="form-control form-control-sm inputFormula${ct.id} inputSc${ct.id} inputSubCaCa${ct.id}" columna="resultado" sb='${sb.id}' name="rs-${sb.nombre}" type="number" value="${sb.resultado}" valor="${sb.valor}" readonly placeholder="Resultado" aria-label=".form-control-sm example">              </td>
                  <td></td>
                  <td> <input disabled id="Nt-${sb.id}" class="form-control form-control-sm inputSc${ct.id} inputSubCaCaNota${ct.id}" columna="nota" sb="${sb.id}" name="nt-${sb.nombre}" type="text" value="${sb.nota}" placeholder="Nota" aria-label=".form-control-sm example"></td>
                  <td>
                  </td>
                </tr>
            `;
            } else {
              if (sb.tipo == "numero") {
                tBodyDiagnosticos.innerHTML += `
              <tr>
                    <td colspan="2"></td>
                    <th scope="row" colspan="">${sb.nombre}</th>
                    <td> <input disabled id="Rs-${sb.id}" value="${sb.resultado}" onchange="actualizarResultadosFormula('${ct.id}')" class="inputSc${ct.id} form-control form-control-sm inputSubCaCa${ct.id}" columna="resultado" sb="${sb.id}" name="rs-${sb.nombre}" type="number" placeholder="Resultado" aria-label=".form-control-sm example">              </td>
                    <td></td>
                    <td>  <input disabled id="Nt-${sb.id}"  class="form-control inputSc${ct.id} form-control-sm inputSubCaCaNota${ct.id}" value="${sb.nota}" name="nt-${sb.nombre}" columna="nota" sb="${sb.id}" type="text" placeholder="Nota" aria-label=".form-control-sm example">              </td>
                    <td>
                    </td>
                  </tr>
              `;
              } else {
                tBodyDiagnosticos.innerHTML += `
              <tr>
                    <td colspan="2"></td>
                    <th scope="row" colspan="">${sb.nombre}</th>
                    <td>  <input disabled id="Rs-${sb.id}" value="${sb.resultado}" class="form-control form-control-sm inputSc${ct.id} inputSubCaCa${ct.id}" name="rs-${sb.nombre}" columna="resultado" sb="${sb.id}" type="text" placeholder="Resultado" aria-label=".form-control-sm example">              </td>
                    <td></td>
                    <td>  <input disabled id="Nt-${sb.id}" class="form-control form-control-sm inputSc${ct.id} inputSubCaCaNota${ct.id}" value="${sb.nota}" columna="nota" sb="${sb.id}" name="nt-${sb.nombre}" type="text" placeholder="Nota" aria-label=".form-control-sm example">              </td>
                    <td>
                    </td>
                  </tr>
              `;
              }
            }
          });
        } else {
          if (ct.rango) {
            if (ct.resultados.length > 0) {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                        <th scope="row" colspan="2">${ct.nombre}</th>
                        <td> <select class="form-select form-select-sm selectRs${ct.nombre} inputExDetallePacCar" rango='${rango.id}' id='inputRs${ct.id}' aria-label="Small select example">
                        
                      </select></td>
                        <td>${ct.unidad}</td>
                        <td>${ct.rango.inferior}  -  ${ct.rango.superior}</td>
                        <td>  <input disabled class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' value="${ct.nota}" placeholder="Nota" aria-label=".form-control-sm example">              </td>
                        <td>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" id="modificarResSvg${ct.id}" onclick="activarInputsRes(${ct.id})" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" id="guardarResSvg${ct.id}" onclick="modificarResultadoBdd(${ct.id})" hidden class="bi bi-save" viewBox="0 0 16 16">
  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
</svg>
                        </td>
          
                      </tr>
            `;
              ct.resultados.forEach((rs) => {
                if (ct.resultado == rs.resultado) {
                  document.getElementsByClassName(
                    `selectRs${ct.nombre}`
                  )[0].innerHTML += `
                <option selected value="${rs.resultado}">
                ${rs.resultado}
                </option>
                `;
                } else {
                  document.getElementsByClassName(
                    `selectRs${ct.nombre}`
                  )[0].innerHTML += `
                <option value="${rs.resultado}">
                ${rs.resultado}
                </option>
                `;
                }
              });

              document.getElementsByClassName(`selectRs${ct.nombre}`)[0].value =
                ct.resultado;
            } else {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                        <th scope="row" colspan="2">${ct.nombre}</th>
                        <td>  <input disabled class="form-control form-control-sm inputExDetallePacCar" rango='${ct.rango.id}' name='rs-${ct.id}' type="text" id='inputRs${ct.id}' value="${ct.resultado}" placeholder="Ingrese Resultado" aria-label=".form-control-sm example">              </td>
                        <td>${ct.unidad}</td>
                        <td>${ct.rango.inferior}  -  ${ct.rango.superior}</td>
                        <td><input disabled class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' value="${ct.nota}" placeholder="Nota" aria-label=".form-control-sm example"></td>
                        <td>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" id="modificarResSvg${ct.id}" onclick="activarInputsRes(${ct.id})" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" id="guardarResSvg${ct.id}" onclick="modificarResultadoBdd(${ct.id})" hidden class="bi bi-save" viewBox="0 0 16 16">
  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
</svg>
                        </td>
          
                      </tr>
            `;
            }
          } else {
            if (ct.resultados.length > 0) {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                        <th scope="row" colspan="2">${ct.nombre}</th>
                        <td> <select disabled class="form-select form-select-sm selectRs${ct.nombre} inputExDetallePacCar" rango='no' id='inputRs${ct.id}' aria-label="Small select example">
                        
                      </select></td>
                        <td>${ct.unidad}</td>
                        <td> - </td>
                        <td>  <input disabled class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' value="${ct.nota}" placeholder="Nota" aria-label=".form-control-sm example"></td>
                        <td>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" id="modificarResSvg${ct.id}" onclick="activarInputsRes(${ct.id})" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" id="guardarResSvg${ct.id}" onclick="modificarResultadoBdd(${ct.id})" hidden class="bi bi-save" viewBox="0 0 16 16">
  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
</svg>
                        </td>
          
                      </tr>
            `;
              ct.resultados.forEach((rs) => {
                if (ct.resultado == rs.resultado) {
                  document.getElementsByClassName(
                    `selectRs${ct.nombre}`
                  )[0].innerHTML += `
                <option selected value="${rs.resultado}">
                ${rs.resultado}
                </option>
                `;
                } else {
                  document.getElementsByClassName(
                    `selectRs${ct.nombre}`
                  )[0].innerHTML += `
                <option value="${rs.resultado}">
                ${rs.resultado}
                </option>
                `;
                }
              });
            } else {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                        <th scope="row" colspan="2">${ct.nombre}</th>
                        <td>  <input disabled class="form-control form-control-sm inputExDetallePacCar" name='rs-${ct.id}' rango='no' type="text" id='inputRs${ct.id}' value='${ct.resultado}' placeholder="Ingrese Resultado" aria-label=".form-control-sm example">              </td>
                        <td>${ct.unidad}</td>
                        <td> - </td>
                        <td>  <input disabled class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' value='${ct.nota}' placeholder="Nota" aria-label=".form-control-sm example">              </td>
                        <td>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" id="modificarResSvg${ct.id}" onclick="activarInputsRes(${ct.id})" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" id="guardarResSvg${ct.id}" onclick="modificarResultadoBdd(${ct.id})" hidden class="bi bi-save" viewBox="0 0 16 16">
  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
</svg>
                        </td>
          
                      </tr>
            `;
            }

          }
        }
      }
      if (ct.nombre == '') {

        try {
          document.getElementById(`inputRs${ct.id}`).setAttribute('hidden', true)
          document.getElementById(`modificarResSvg${ct.id}`).setAttribute('hidden', true)
          document.getElementById(`inputNt${ct.id}`).setAttribute('hidden', true)


        } catch (error) {

        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

function activarInputsResSb(id) {
  const inputs = document.getElementsByClassName("inputSc" + id);

  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i];
    element.removeAttribute("disabled");
  }
  const svgMod = document.getElementById(`modificarResSvg${id}`);
  const svgGuardar = document.getElementById(`guardarResSvg${id}`);

  svgMod.setAttribute("hidden", "true");

  svgGuardar.removeAttribute("hidden");
}
function desactivarInputsResSb(id) {
  const inputs = document.getElementsByClassName("inputSc" + id);

  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i];
    element.setAttribute("disabled", "true");
  }
  const svgMod = document.getElementById(`modificarResSvg${id}`);
  const svgGuardar = document.getElementById(`guardarResSvg${id}`);

  svgMod.removeAttribute("hidden");

  svgGuardar.setAttribute("hidden", "true");
}

async function modificarResultadoBdd(id) {
  const resInp = document.getElementById(`inputRs${id}`);
  const notInp = document.getElementById(`inputNt${id}`);
  const alerta = document.getElementById("alertaModificacionExamenBdd");

  try {
    const { token } = await login.getToken();

    const { data } = await axios.put(
      urlsv + "/api/examenes/modificar-resultado-examen",
      { idRes: id, resultado: resInp.value, nota: notInp.value },
      { headers: { token } }
    );
    alerta.removeAttribute("hidden");
    alerta.innerText = `El resultado ha sido modificado exitosamente`;
    alerta.className = `alert alert-success`;
    desactivarInputsRes(id);

    setTimeout(() => {
      alerta.setAttribute("hidden", "true");
      alerta.innerText = "";
    }, 3000);
  } catch (error) {
    console.log(error);
    alerta.innerText = error;
    alerta.className = `alert alert-danger`;
    setTimeout(() => {
      alerta.setAttribute("hidden", "true");
      alerta.innerText = "";
    }, 3000);
  }
}

function activarInputsRes(id) {
  const svgMod = document.getElementById(`modificarResSvg${id}`);
  const svgGuardar = document.getElementById(`guardarResSvg${id}`);

  svgMod.setAttribute("hidden", "true");

  svgGuardar.removeAttribute("hidden");
  document.getElementById(`inputNt${id}`).removeAttribute("disabled");
  document.getElementById(`inputRs${id}`).removeAttribute("disabled");
}

function desactivarInputsRes(id) {
  const svgMod = document.getElementById(`modificarResSvg${id}`);
  const svgGuardar = document.getElementById(`guardarResSvg${id}`);

  svgMod.removeAttribute("hidden");

  svgGuardar.setAttribute("hidden", "true");
  document.getElementById(`inputNt${id}`).setAttribute("disabled", "true");
  document.getElementById(`inputRs${id}`).setAttribute("disabled", "true");
}
let contador = 0

const abrirModalExamenes = () => new bootstrap.Modal("#examenes-list").toggle();
const abrirModalExamenesCrud = () =>
  new bootstrap.Modal("#examenes-crud").toggle();

const abrirResultadosModal = async (examen, idEx, n) => {
  const h1Ex = document.getElementById("h1NombreEx");
  const tBodyDiagnosticos = document.getElementById("tBodyDiagnosticos");
  tBodyDiagnosticos.innerHTML = "";
  h1Ex.innerText = `${examen} - ${pacienteObj.nombre} - ${pacienteObj.edad}`;
  const alertaExamen = document.getElementById("alertaExamen");
  const examenF = examenesDelPaciente.filter((ex) => ex.examenId == idEx);

  const guardarButton = document.getElementById(`guardarResultadoExPc`);
  if (nivelUser != 2) {
    guardarButton.removeAttribute("hidden");
  }
  if (n == "true") {
    if (examenF.length > 0) {

      alertaExamen.innerHTML += `
        El examen ${examen} ya ha sido evaluado para el paciente ${pacienteObj.nombre}
        `;
      alertaExamen.removeAttribute("hidden");
      setTimeout(() => {
        alertaExamen.setAttribute("hidden", "true");
        alertaExamen.innerHTML = "";
      }, "5000");
      return;
    }
  }

  new bootstrap.Modal("#resultadosModal").toggle();

  const { token } = await login.getToken();
  const { data: examenData } = await axios.get(
    urlsv + "/api/modulo-examenes/examen-id",
    { headers: { token }, params: { idExamen: idEx } }
  );


  let caracteristicas = [...examenData.detalles, ...examenData.titulos];
  examenDataPc = examenData;
  caracteristicas = caracteristicas.sort(function (a, b) {
    if (a.posicion > b.posicion) {
      return 1;
    }
    if (a.posicion < b.posicion) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  let edad = parseInt(pacienteObj.edad.split(";")[0].split(" ")[0]);
  let generoPc = pacienteObj.genero == "Hombre" ? "masculino" : "femenino";
  caracteristicas.forEach((ct) => {
    let name = ct.nombre
    if (ct.nombre == null) {
      ct.nombre = `${contador}-EMPTY-0023`
      contador += 1
    }

    if (ct.status == "titulo") {
      tBodyDiagnosticos.innerHTML += `
      <tr>
                  <th scope="row" colspan="6">${ct.titulo}</th>
    
                </tr>
      `;
    } else {
      let resultadosDt = examenData.resultados.filter(
        (r) => r.id_det_ex == ct.id
      );

      let rangosDt = examenData.rangos.filter((r) => {
        return r.id_det_ex == ct.id;
      });
      let subDt = examenData.subCa.filter((s) => {
        return s.id_det_ex == ct.id;
      });

      subDt.sort(function (a, b) {
        if (a.tipo < b.tipo) {
          return 1;
        }
        if (a.tipo > b.tipo) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      let rango;

      let filtro1 = rangosDt.filter(
        (el) =>
          el.desde < edad &&
          edad < el.hasta &&
          el.genero == generoPc &&
          el.desde != 0 &&
          el.hasta != 1000
      );
      let filtro2 = rangosDt.filter(
        (el) => el.desde < edad && edad < el.hasta && el.genero == generoPc
      );
      let filtro3 = rangosDt.filter(
        (el) => el.desde < edad && edad < el.hasta && el.genero == "todos"
      );

      if (filtro3.length > 0) {
        let menor = 100000000;
        let index;
        filtro3.forEach((f, il) => {
          if (edad - f.desde < menor) {
            menor = edad - f.desde;
            index = il;
          }
        });
        rango = filtro3[index];
      }
      if (filtro2.length > 0) {
        let menor = 100000000;
        let index;
        filtro2.forEach((f, il) => {
          if (edad - f.desde < menor) {
            menor = edad - f.desde;
            index = il;
          }
        });
        rango = filtro2[index];
      }
      if (filtro1.length > 0) {
        let menor = 100000000;
        let index;
        filtro1.forEach((f, il) => {
          if (edad - f.desde < menor) {
            menor = edad - f.desde;
            index = il;
          }
        });
        rango = filtro1[index];
      }
      if (subDt.length > 0) {
        tBodyDiagnosticos.innerHTML += `
      <tr >
              <th scope="row" colspan="2">${name == null ? `` : name}</th>
              <th> SubCaracteristica </th>
              <th>Resultado</th>
              <td></td>
              <td>  <input class="form-control form-control-sm" type="text" id='inputNt${ct.id}' placeholder="Nota" aria-label=".form-control-sm example">              </td>

            </tr>
      `;
        subDt.forEach((sb) => {
          if (sb.tipo == "formula") {
            tBodyDiagnosticos.innerHTML += `
          <tr>
                <td colspan="2"></td>
                <th scope="row" colspan="">${sb.nombre}</th>
                <td>  <input id="Rs-${sb.id}" class="form-control form-control-sm inputFormula${ct.id} inputSubCaCa${ct.id}" name="rs-${sb.nombre}" type="number" valor="${sb.valor}" readonly placeholder="Resultado" aria-label=".form-control-sm example">              </td>
                <td></td>
                <td> <input id="Nt-${sb.id}" class="form-control form-control-sm inputSubCaCaNota${ct.id}" name="nt-${sb.nombre}" type="text" placeholder="Nota" aria-label=".form-control-sm example">              </td>
  
              </tr>
          `;
          } else {
            if (sb.tipo == "numero") {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                  <td colspan="2"></td>
                  <th scope="row" colspan="">${sb.nombre}</th>
                  <td> <input id="Rs-${sb.id}" onchange="actualizarResultadosFormula('${ct.id}')" class="form-control form-control-sm inputSubCaCa${ct.id}" name="rs-${sb.nombre}" type="number" placeholder="Resultado" aria-label=".form-control-sm example">              </td>
                  <td></td>
                  <td>  <input id="Nt-${sb.id}"  class="form-control form-control-sm inputSubCaCaNota${ct.id}" name="nt-${sb.nombre}" type="text" placeholder="Nota" aria-label=".form-control-sm example">              </td>
    
                </tr>
            `;
            } else {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                  <td colspan="2"></td>
                  <th scope="row" colspan="">${sb.nombre}</th>
                  <td>  <input id="Rs-${sb.id}" class="form-control form-control-sm inputSubCaCa${ct.id}" name="rs-${sb.nombre}" type="text" placeholder="Resultado" aria-label=".form-control-sm example">              </td>
                  <td></td>
                  <td>  <input id="Nt-${sb.id}" class="form-control form-control-sm inputSubCaCaNota${ct.id}" name="nt-${sb.nombre}" type="text" placeholder="Nota" aria-label=".form-control-sm example">              </td>
    
                </tr>
            `;
            }
          }
        });
      } else {
        if (rango) {
          if (resultadosDt.length > 0) {
            tBodyDiagnosticos.innerHTML += `
          <tr>
                      <th scope="row" colspan="2">${name == null ? '' : name}</th>
                      <td> <select class="form-select form-select-sm selectRs${ct.nombre
              } inputExDetallePacCar" rango='${rango.id}' inferior='${rango.inferior
              }' superior='${rango.superior}' id='inputRs${ct.id
              }' aria-label="Small select example">
          <option value="" selected>
          
          </option>
                    </select></td>
                      <td>${ct.unidad ? ct.unidad : ''}</td>
                      <td>${rango.inferior % 1 == 0
                ? rango.inferior.split(".")[0]
                : rango.inferior
              }  -  ${rango.superior % 1 == 0
                ? rango.superior.split(".")[0]
                : rango.superior
              }</td>
                      <td>  <input class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id
              }' type="text" id='inputNt${ct.id
              }' placeholder="Nota" aria-label=".form-control-sm example">              </td>
        
                    </tr>
          `;
            resultadosDt.forEach((rs) => {
              document.getElementsByClassName(
                `selectRs${ct.nombre}`
              )[0].innerHTML += `
            <option value="${rs.resultado}">
            ${rs.resultado}
            </option>
            `;
            });
          } else {
            tBodyDiagnosticos.innerHTML += `
          <tr>
                      <th scope="row" colspan="2">${name == null ? '' : name}</th>
                      <td>  <input class="form-control form-control-sm inputExDetallePacCar" rango='${rango.id
              }' inferior='${rango.inferior}' superior='${rango.superior
              }' name='rs-${ct.id}' type="text" id='inputRs${ct.id
              }' placeholder="Ingrese Resultado" aria-label=".form-control-sm example">              </td>
                      <td>${ct.unidad ? ct.unidad : ''}</td>
                      <td>${rango.inferior % 1 == 0
                ? rango.inferior.split(".")[0]
                : rango.inferior
              }  -  ${rango.superior % 1 == 0
                ? rango.superior.split(".")[0]
                : rango.superior
              }</td>
                      <td>  <input class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id
              }' type="text" id='inputNt${ct.id
              }' placeholder="Nota" aria-label=".form-control-sm example">              </td>
        
                    </tr>
          `;
          }
        } else {
          if (resultadosDt.length > 0) {
            tBodyDiagnosticos.innerHTML += `
          <tr>
                      <th scope="row" colspan="2">${name == null ? '' : name}</th>
                      <td> <select class="form-select form-select-sm selectRs${ct.nombre} inputExDetallePacCar" rango='no' inferior='no' superior='no' id='inputRs${ct.id}' aria-label="Small select example">
                      <option value="" selected>
          
          </option>
                    </select></td>
                      <td>${ct.unidad ? ct.unidad : ''}</td>
                      <td> - </td>
                      <td>  <input class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' placeholder="Nota" aria-label=".form-control-sm example">              </td>
        
                    </tr>
          `;
            resultadosDt.forEach((rs) => {
              document.getElementsByClassName(
                `selectRs${ct.nombre}`
              )[0].innerHTML += `
            <option value="${rs.resultado}">
            ${rs.resultado}
            </option>
            `;
            });
          } else {
            tBodyDiagnosticos.innerHTML += `
          <tr>
                      <th scope="row" colspan="2">${name == null ? '' : name}</th>
                      <td>  <input class="form-control form-control-sm inputExDetallePacCar" name='rs-${ct.id}' rango='no' inferior='no' superior='no' type="text" id='inputRs${ct.id}' placeholder="Ingrese Resultado" aria-label=".form-control-sm example">              </td>
                      <td>${ct.unidad ? ct.unidad : ''}</td>
                      <td> - </td>
                      <td>  <input class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' placeholder="Nota" aria-label=".form-control-sm example">              </td>
        
                    </tr>
          `;
          }
        }
      }
    }
    if (name == null) {

      try {
        document.getElementById(`inputRs${ct.id}`).setAttribute('hidden', true)
        document.getElementById(`inputNt${ct.id}`).setAttribute('hidden', true)


      } catch (error) {

      }
    }
  });
  if (n == "false") {
    setInputs(idEx);
  }
};

async function previewPdf(tipo, ordenId) {
  const checksH = document.getElementsByName(`checksOrden`);
  const checks = [...checksH];
  let checked = checks.filter((e) => e.checked == true);

  const inputOrden = document.getElementById("inputOrden");
  const selectBioAnalista = document.getElementById("selectBioAnalista");

  let examenesChecked = [];

  checked.forEach((e) => {
    examenesDelPaciente.forEach((el) => {
      if (el.examenId == e.value) {
        examenesChecked.push(el);
      }
    });
  });
  if (checked.length == 0) {
    examenesChecked = examenesDelPaciente;
  }
  let examenesPreview = [];

  examenesChecked.forEach((e) => {
    const caracteristicas = [];

    e.detallesExamenPc.forEach((el, i) => {
      if (el.status == 'titulo') {
        caracteristicas.push({
          nombre: el.nombre,
          posicion: el.posicion,
          status: 'titulo'


        });
      } else {
        let subCa = e.subCaracteristicasExPc.filter((sb) => sb.idCar == el.idCar);
        if (el.imprimir == 1) {
          caracteristicas.push({
            nombre: el.nombreCar,
            resultado: el.resultado,
            inferior: el.inferior,
            superior: el.superior,
            unidad: el.unidad,
            nota: el.nota,
            imprimir: el.imprimir,
            subCaracteristicas: subCa,
            //AQUI HAY QUE PONER EL STATUS DEL TITULO
            //status: i == 1 ? 'titulo':''
            //AQUI HAY QUE PONER EL STATUS DEL TITULO
          });
        } else {
          if (el.resultado != "") {
            caracteristicas.push({
              nombre: el.nombreCar,
              resultado: el.resultado,
              inferior: el.inferior,
              superior: el.superior,
              unidad: el.unidad,
              nota: el.nota,
              imprimir: el.imprimir,
              subCaracteristicas: subCa,
              //AQUI HAY QUE PONER EL STATUS DEL TITULO
              //status: i == 1 ? 'titulo':''
              //AQUI HAY QUE PONER EL STATUS DEL TITULO
            });
          }
        }

      }
    });
    examenesPreview.push({
      examen: e.examenNombre,
      nombreSeccion: e.seccionNombre,
      caracteristicas,
    });
  });
  const examen = {
    orden: tipo == "no" ? `Cortesia` : `${tipo}-${inputOrden.value}`,
    ordenId,
    bioanalista: selectBioAnalista.value,
    paciente: pacienteObj,
    examenes: examenesPreview,
  };
  await examenVar.store(examen);
  abrirPDFWindow();
}

async function guardarOrden(tipo) {
  const sedeVar2 = await sedeVar.get();

  const inputOrden = document.getElementById("inputOrden");
  const selectBioAnalista = document.getElementById("selectBioAnalista");
  const selectEmpresa = document.getElementById("selectEmpresa");
  const inputExpediente = document.getElementById("inputPacienteExpediente");
  if (inputExpediente.value == "") {
    const alertaModal = new bootstrap.Modal("#error-orden-modal", {}).toggle();

    document.getElementById(
      `messageAlertaExamenErrorP`
    ).innerText = `EL NUMERO DE EXPEDIENTE NO PUEDE SER VACIO`;
    return;
  }

  let examenes = [];

  examenesDelPaciente.forEach((ex) => {
    let detallesExamen = [];

    ex.detallesExamenPc.forEach((dt) => {
      let subCaracteristicasDt = [];
      ex.subCaracteristicasExPc
        .filter((sb) => sb.idCar == dt.idCar)
        .forEach((sb) => {
          subCaracteristicasDt.push({
            id_dt: dt.idCar,
            id_detalle_sub: sb.idSub,
            resultado: sb.resultado,
            nota: sb.nota,
          });
        });
      detallesExamen.push({
        id_dt: dt.idCar,
        id_ex: ex.examenId,
        id_rango: dt.rango,
        inferior: dt.inferior,
        superior: dt.superior,
        resultado: dt.resultado,
        nota: dt.nota,
        subCaracteristicasDt,
        status: dt.status,
      });
    });
    examenes.push({
      id_ex: ex.examenId,
      idPac: pacienteObj.id,
      id_bio: selectBioAnalista.value,
      detallesExamen,
      idLab: ex.idLab,
    });
  });
  let orden = {
    idPac: pacienteObj.id,
    orden: inputOrden.value,
    clave: tipo,
    id_bio: selectBioAnalista.value,
    expediente: inputExpediente.value,
    empresa: selectEmpresa.value,
    examenes,
  };
  try {
    const { token } = await login.getToken();
    const { id } = await login.getToken();

    const res = await axios.post(
      urlsv + "/api/examenes/crear-orden",
      { orden, sedeVar: sedeVar2, user: id },
      { headers: { token } }
    );

    if (res.status == 200) {
      const ordenModal = new bootstrap.Modal(
        document.getElementById("ordenModal")
      );
      ordenModal.hide();
      const backdrop = document.getElementsByClassName("modal-backdrop");
      const arrBackdrop = [...backdrop];
      arrBackdrop.forEach((e) => {
        e.className = "modal-backdrop fade";
        e.setAttribute("hidden", "true");
      });

      const alertaModal = new bootstrap.Modal(
        "#confirmacion-orden-modal",
        {}
      ).toggle();

      document.getElementById(
        `messageAlertaExamenP`
      ).innerText = `Orden creada exitosamente!`;
      document.getElementById("totalizarButton").setAttribute("hidden", "true");
      document.getElementById("tBodyLgEx").innerHTML = `
      <a href="#" class="list-group-item list-group-item-action fw-semibold liTableExPac">
                  <div class="container" id="tHeadLgEx">
                    <div class="row text-center">
                      <div class="col-1">
                        #
                      </div>
                      <div class="col-8">
                        Tipo Examen
                      </div>
                      <div class="col-3">Fecha</div>
                    </div>
                  </div>
                </a>
      `;

      previewPdf(tipo, res.data.ordenId);
      examenesDelPaciente = [];
    }
  } catch (error) {
    const ordenModal = new bootstrap.Modal(
      document.getElementById("ordenModal")
    );
    ordenModal.hide();
    const backdrop = document.getElementsByClassName("modal-backdrop");
    const arrBackdrop = [...backdrop];
    arrBackdrop.forEach((e) => {
      e.className = "modal-backdrop fade";
      e.setAttribute("hidden", "true");
    });

    const alertaModal = new bootstrap.Modal("#error-orden-modal", {}).toggle();

    document.getElementById(
      `messageAlertaExamenErrorP`
    ).innerText = `${error.response.data.mensaje}`;
  }
}

async function pedirCaracteristicas(id) {
  const tBody = document.getElementById(`tBodyCollapseLi${id}`);
  tBody.innerHTML = "";
  try {
    const { token } = await login.getToken();

    const { data: caracteristicas } = await axios.get(
      urlsv + "/api/examenes/get-caracteristicasExamenPaciente",
      {
        params: {
          id,
        },
        headers: { token },
      }
    );
    caracteristicas.caracteristicasData.forEach((ct) => {

      tBody.innerHTML += `
      <tr>
                  <td scope="col">${ct.nombre ? ct.nombre : ''}</td>
                  <td scope="col">${ct.resultado}</td>
                  <td scope="col">${ct.unidad}</td>
                  <td scope="col">${ct.rango
          ? ct.rango.inferior + " - " + ct.rango.superior
          : ""
        }</td>
                  <td scope="col">${ct.nota}</td>
                </tr>
      `;
    });
  } catch (error) {
    console.log(error);
  }
}

async function descargarPdfExterno(id) {
  try {
    const { token } = await login.getToken();

    const { data } = await axios.get(
      urlsv + "/api/examenes/resultados-examen-externo",
      {
        params: {
          id,
        },
        headers: { token },
      }
    );
    document.getElementById("pdfExternoModalEmbed").src = data;
    const myModal = new bootstrap.Modal("#pdfExternoModal");
    myModal.show();

    return;
  } catch (error) {
    console.log("🚀 ~ descargarPdfExterno ~ error:", error);
  }
}

async function buscarExamenesPaciente() {
  const fechaExamen = document.getElementById("fechaExamenInput");
  const preCedula = document.getElementsByName("pre_cedula")[0].value;

  const cedula = document.getElementsByName("cedula")[0].value;

  try {
    const { token } = await login.getToken();
    const { data: examenes } = await axios.get(
      urlsv + "/api/examenes/get-examenesPaciente",
      {
        params: {
          cedula,
          preCedula,
          fecha: fechaExamen.value != "" ? fechaExamen.value : "no",
        },
        headers: { token },
      }
    );
    const { data: pacienteExternos } = await axios.get(
      urlsv + "/api/examenes/get-paciente-externo",
      {
        params: {
          cedula,
          preCedula,
          fecha: fechaExamen.value != "" ? fechaExamen.value : "no",
        },
        headers: { token },
      }
    );

    const tBody = document.getElementById(`tBodyLgEx`);
    tBody.innerHTML = `<a href="#" class="list-group-item list-group-item-action fw-semibold liTableExPac">
    <div class="container" id="tHeadLgEx">
      <div class="row text-center">
        <div class="col-1">
          #
        </div>
        <div class="col-8">
          Tipo Examen
        </div>
        <div class="col-3">Fecha</div>
      </div>
    </div>
  </a>`;
    examenes.examenesData.forEach((ex) => {
      tBody.innerHTML += `
      <a href="#" class="list-group-item list-group-item-action liTableExPac liBodyTablaExPac" id="aTablaExPac${ex.id
        }" >
      <div class="container">
        <div class="row text-center">
          <div class="col-1">
            ${ex.id}
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-8">
              ${ex.nombreEx}
    
              </div>
             
              <div class="col-3 d-flex justify-content-end">
                <div class="form-check me-3">
                  <input class="form-check-input" type="checkbox" nombre="${ex.nombreEx
        }" fecha="${ex.fecha.split("T")[0]
        }" name="checksExamenesBdd" value="${ex.id}" id="check${ex.id}">
                
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="green" onclick="pedirCaracteristicas(${ex.id
        })"  data-bs-toggle="collapse" data-bs-target="#collapseLiTab${ex.id
        }" class="bi bi-eye svgButton" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>
                ${nivelUser == 1
          ? `
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#FACD0B"
                class="bi bi-pencil-square mx-4 my-1 svgButton"
                onclick="modificarExamenPacienteBDD('${ex.nombreEx}','${ex.id_ex}','${ex.id}')"
                viewBox="0 0 20 20"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
                `: ''
        }
                
              ${nivelUser == 1
          ? `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="red"
                class="bi bi-x-lg my-1 svgButton"
                viewBox="0 0 20 20"
                onclick="borrarExamenPaciente('${ex.id}')"
              >
                <path
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                />
              </svg>`
          : ``
        }
              
                
               
              </div>
            </div>
            
            
          </div>
          <div class="col-2">${ex.fecha.split("T")[0]}</div>
        </div>
      </div>
      <div class="collapse" id="collapseLiTab${ex.id}">
        <div class="card card-body">
          <table class="table table-sm fs-6">
            <thead>
              <tr>
                <th scope="col">Caracteristica</th>
                <th scope="col">Resultado</th>
                <th scope="col">Unidad</th>
                <th scope="col">Rango</th>
                <th scope="col">Nota</th>
              </tr>
            </thead>
            <tbody id="tBodyCollapseLi${ex.id}">
             
              
            </tbody>
          </table>
                          </div>
      </div>
    </a>
      `;
    });

    pacienteExternos.examenesData.forEach((ex) => {
      tBody.innerHTML += `
      <a href="#" class="list-group-item list-group-item-action liTableExPac liBodyTablaExPac" id="aTablaExPac${ex.id
        }" >
      <div class="container">
        <div class="row text-center">
          <div class="col-1">
            EX-${ex.id}
          </div>
          <div class="col-9">
            <div class="row">
              <div class="col-8">
              ${ex.nombreEx} - (${ex.laboratorio})
    
              </div>
             
              <div class="col-3 d-flex justify-content-end">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-file-earmark-pdf-fill my-1 svgButton" onclick="descargarPdfExterno('${ex.id}')" viewBox="0 0 16 16">
  <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z"/>
  <path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"/>
</svg>
               
                
                ${nivelUser == 2 || nivelUser == 3
          ? ""
          : `
                    
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#FACD0B"
                class="bi bi-pencil-square mx-4 my-1 svgButton"
                onclick="abrirResultadosExternosModalMod('${ex.nombreEx}','${ex.id}','${ex.bioanalista}','${ex.nota}','${ex.idLab}','${ex.id_orden}')"
                viewBox="0 0 20 20"
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
               
              
                `
        }
                
              ${nivelUser == 1
          ? `<svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="red"
                class="bi bi-x-lg my-1 svgButton"
                viewBox="0 0 20 20"
                onclick="borrarExamenExterno('${ex.id}')"
              >
                <path
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                />
              </svg>`
          : ``
        }       
              </div>
            </div>           
          </div>
          <div class="col-2">${ex.fecha.split("T")[0]}</div>
        </div>
      </div>     
    </a>
      `;
    });

    const totalizarButton = document.getElementById("totalizarButton");

    totalizarButton.setAttribute("hidden", "true");
    const reimpresionButton = document.getElementById("reimpresionButton");

    reimpresionButton.removeAttribute("hidden");
  } catch (error) {
    console.log(error);
  }
}

async function borrarExamenExterno(id) {
  const res = await alerta.alert(
    "ELIMINAR:",
    "¿Esta seguro que desea eliminar el examen?"
  );
  if (res.response == 1) return;
  else {
    try {
      const { token } = await login.getToken();
      const { data } = await axios.put(
        urlsv + "/api/examenes/delete-examen-externo",
        {
          id
        },
        {
          headers: { token },
        }
      );
  
      cedulaPaciente()
  
    } catch (error) {
      console.log(error)
      if (error.response?.data?.mensaje) {
        return await alerta.alert("Error:", error.response.data.mensaje);
      } else {
        return await alerta.error();
      }
    }
    
  }


}


async function borrarExamenPaciente(id) {

  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/examenes/delete-examen-paciente",
      {
        id
      },
      {
        headers: { token },
      }
    );

    cedulaPaciente()

  } catch (error) {
    console.log(error)
  }


}

function guardarResultadosExamen() {
  const selectLab = document.getElementById("selectLaboratorio");
  let resStatus = false

  const detallesExamenPc = examenDataPc.detalles.map((e) => {
    const res = document.getElementById("inputRs" + e.id);
    const nota = document.getElementById("inputNt" + e.id);

    const reimpresionButton = document.getElementById("reimpresionButton");

    reimpresionButton.setAttribute("hidden", "true");
    if (examenesDelPaciente.length == 0) {
      if (e.nombre.includes('-EMPTY-0023')) {
        e.nombre = ''
      }

      document.getElementById("tBodyLgEx").innerHTML = `
      <a href="#" class="list-group-item list-group-item-action fw-semibold liTableExPac">
                <div class="container" id="tHeadLgEx">
                  <div class="row text-center">
                    <div class="col-1">
                      #
                    </div>
                    <div class="col-8">
                      Tipo Examen
                    </div>
                    <div class="col-3">Fecha</div>
                  </div>
                </div>
              </a>
      `;
    }
    if (res) {
      if (res.value != '') {
        resStatus = true
      }
      return {
        rango: res.attributes.rango.value,
        inferior: res.attributes.inferior.value,
        superior: res.attributes.superior.value,
        resultado: res.value,
        nota: nota.value,
        idCar: e.id,
        nombreCar: e.nombre,
        imprimir: e.impsiempre,
        unidad: e.unidad,
        posicion: e.posicion,
      };
    }
    return {
      rango: "no",
      inferior: "no",
      superior: "no",
      resultado: "subCaracteristica",
      nota: nota.value,
      idCar: e.id,
      nombreCar: e.nombre,
      imprimir: e.impsiempre,
      unidad: e.unidad,
      posicion: e.posicion,
    };
  });

  examenDataPc.titulos.map((e) => {
    detallesExamenPc.push({
      nombre: e.titulo,
      posicion: e.posicion,
      status: e.status,
      id: e.id
    });
  });
  const subCaracteristicas = examenDataPc.subCa.map((e) => {
    const res = document.getElementById("Rs-" + e.id);
    const nota = document.getElementById("Nt-" + e.id);
    if (res.value != '') {
      resStatus = true
    }
    return {

      idSub: e.id,
      nombreSub: e.nombre,
      resultado: res.value,
      idCar: e.id_det_ex,
      nota: nota.value,
      tipo: e.tipo,
    };
  });
  let examenPac = {
    examenId: examenDataPc.examen.id,
    examenNombre: examenDataPc.examen.nombre,
    detallesExamenPc,
    seccionNombre: examenDataPc.seccion[0].nombre,
    subCaracteristicasExPc: subCaracteristicas,
  };
  if (resStatus == true) {


    examenesDelPaciente.push(examenPac);

    document.getElementById("tHeadLgEx").innerHTML = `
  <div class="row text-center">
                    <div class="col-1">
                      #
                    </div>
                    <div class="col-8">
                      Tipo Examen
                    </div>
                    <div class="col-3">Status</div>
                  </div>

  `;

    añadirRowTablaExPac(examenPac);
    document.getElementById(`totalizarButton`).removeAttribute("hidden");
  } else {
    cedulaAlerta('El examen a evaluar debe tener un resultado como minimo', 'danger')
  }

}

async function guardarResultadosExamenPd() {
  const selectLab = document.getElementById("selectLaboratorio");

  const detallesExamenPc = examenDataPc.detalles.map((e) => {
    const res = document.getElementById("inputRs" + e.id);
    const nota = document.getElementById("inputNt" + e.id);

    if (res) {
      return {
        rango: res.attributes.rango.value,
        inferior: res.attributes.inferior.value,
        superior: res.attributes.superior.value,
        resultado: res.value,
        nota: nota.value,
        idCar: e.id,
        nombreCar: e.nombre,
        imprimir: e.impsiempre,
        unidad: e.unidad,
        posicion: e.posicion,
      };
    }
    return {
      rango: "no",
      inferior: "no",
      superior: "no",
      resultado: "subCaracteristica",
      nota: nota.value,
      idCar: e.id,
      nombreCar: e.nombre,
      imprimir: e.impsiempre,
      unidad: e.unidad,
      posicion: e.posicion,
    };
  });
  const subCaracteristicas = examenDataPc.subCa.map((e) => {
    const res = document.getElementById("Rs-" + e.id);
    const nota = document.getElementById("Nt-" + e.id);
    return {
      idSub: e.id,
      nombreSub: e.nombre,
      resultado: res.value,
      idCar: e.id_det_ex,
      nota: nota.value,
      tipo: e.tipo,
    };
  });

  let detallesExamenPd = [];

  detallesExamenPc.forEach((dt) => {
    let subCaracteristicasDt = [];
    subCaracteristicas
      .filter((sb) => sb.idCar == dt.idCar)
      .forEach((sb) => {
        subCaracteristicasDt.push({
          id_dt: dt.idCar,
          id_detalle_sub: sb.idSub,
          resultado: sb.resultado,
          nota: sb.nota,
        });
      });
    detallesExamenPd.push({
      id_dt: dt.idCar,
      id_ex: examenDataPc.examen.id,
      id_rango: dt.rango,
      inferior: dt.inferior,
      superior: dt.superior,
      resultado: dt.resultado,
      nota: dt.nota,
      subCaracteristicasDt,
    });
  });

  let examenPac = {
    examenId: examenDataPc.examen.id,
    examenNombre: examenDataPc.examen.nombre,
    detallesExamenPd,
    seccionNombre: examenDataPc.seccion[0].nombre,
  };

  try {
    const { token } = await login.getToken();

    const res = await axios.post(
      urlsv + "/api/examenes/crear-examen-pendiente",
      { examenPac, idPac: pacienteObj.id },
      { headers: { token } }
    );

    cedulaPaciente();
  } catch (error) {
    console.log(error);
  }
}

function validarSelectDiagnostico(value) {
  const inputDiagnostico = document.getElementById(`examenDiagnosticoInput`);
  inputDiagnostico.removeAttribute("oninput");
  if (value == "nuevo") {
    inputDiagnostico.setAttribute("oninput", "buscarExamen()");
    buscarExamen();
  } else {
    inputDiagnostico.setAttribute("oninput", `buscarExamenPendiente()`);
    buscarExamenPendiente();
  }
}

function setInputs(idEx) {
  const examen = examenesDelPaciente.find((e) => e.examenId == idEx);

  examen.detallesExamenPc.forEach((e) => {
    if (e.status != "titulo") {
      const res = document.getElementById(`inputRs${e.idCar}`);
      const nota = document.getElementById(`inputNt${e.idCar}`);

      nota.value = e.nota;
      try {
        res.value = e.resultado;
      } catch (error) {
        console.log(error);
      }
    }
  });
  examen.subCaracteristicasExPc.forEach((e) => {
    const res = document.getElementById(`Rs-${e.idSub}`);
    const nota = document.getElementById(`Nt-${e.idSub}`);
    res.value = e.resultado;
    nota.value = e.nota;
  });
  popRowTablaExPac(idEx);
}

function popRowTablaExPac(idEx) {
  const tBody = document.getElementById(`tBodyLgEx`);
  const aTabla = document.getElementById(`aTablaExPac${idEx}`);

  examenesDelPaciente = examenesDelPaciente.filter((e) => e.examenId != idEx);

  tBody.removeChild(aTabla);
  const tr = document.getElementsByClassName("liBodyTablaExPac");
  if (tr.length == 0) {
    document.getElementById("totalizarButton").setAttribute("hidden", "true");
  }
}

function añadirRowTablaExPac(examenPac) {
  const tBody = document.getElementById(`tBodyLgEx`);
  const tr = document.getElementsByClassName("liBodyTablaExPac");
  tBody.innerHTML += `
  <a href="#" class="list-group-item list-group-item-action liTableExPac liBodyTablaExPac" id="aTablaExPac${examenPac.examenId
    }" >
  <div class="container">
    <div class="row text-center">
      <div class="col-1">
        ${tr.length + 1}
      </div>
      <div class="col-8 ">
        <div class="row">
          <div class="col-9">
          ${examenPac.examenNombre}

          </div>
         
          
          <div class="col-3 d-flex justify-content-end">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="green" class="bi bi-eye svgButton" viewBox="0 0 16 16"  data-bs-toggle="collapse" href="#collapseLiTab${examenPac.examenId
    }" role="button" aria-expanded="false" aria-controls="collapseLiTab${examenPac.id
    }">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#FACD0B"
            class="bi bi-pencil-square mx-4 my-1 svgButton"
            onclick="abrirResultadosModal('${examenPac.examenNombre}','${examenPac.examenId
    }','false')"
            viewBox="0 0 20 20"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
            />
          </svg>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="red"
          class="bi bi-x-lg my-1 svgButton"
          viewBox="0 0 20 20"
          onclick="popRowTablaExPac(${examenPac.examenId})"
        >
          <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
          />
        </svg>
            
           
          </div>
        </div>
        
        
      </div>
      <div class="col-3">Pendiente por enviar</div>
    </div>
  </div>
  <div class="collapse" id="collapseLiTab${examenPac.examenId}">
    <div class="card card-body">
      <table class="table table-sm fs-6">
        <thead>
          <tr>
            <th scope="col">Caracteristica</th>
            <th scope="col">Resultado</th>
            <th scope="col">Unidad</th>
            <th scope="col">Rango</th>
            <th scope="col">Nota</th>
          </tr>
        </thead>
        <tbody id="tBodyCollapseLi${examenPac.examenId}">
         
          
        </tbody>
      </table>
                      </div>
  </div>
</a>
  `;
  const tBodyCollapse = document.getElementById(
    `tBodyCollapseLi${examenPac.examenId}`
  );

  examenPac.detallesExamenPc.forEach((e) => {
    tBodyCollapse.innerHTML += `
    ${e.status == "titulo"
        ? `<tr>
    <th scope="row" colspan='5'>${e.titulo}</th>
    
  </tr>`
        : `<tr>
  <th scope="row">${e.nombreCar}</th>
  <td>${e.resultado}</td>
  <td>${e.unidad ? e.unidad : "-"}</td>
  <td>${e.rango == "no" ? "-" : e.rango}</td>
  <td>${e.nota}</td>
</tr>`
      }
    `;
  });
}

function actualizarResultadosFormula(idCa) {
  const inputsFormula = document.getElementsByClassName(`inputFormula${idCa}`);
  let arrInputFormula = [...inputsFormula];
  arrInputFormula.forEach((f) => {
    valor = f.attributes.valor.value;
    let valorSp = valor.split(",");
    const operadores = valorSp.filter(
      (e) => e == "+" || e == "-" || e == "*" || e == "/"
    );
    const inputSubCaCa = document.getElementsByClassName(`inputSubCaCa${idCa}`);
    const arrInputsSbC = [...inputSubCaCa];
    let arrayNumeros = [];
    valorSp.forEach((v) => {
      if (v != "+" && v && "-" && v != "*" && v != "/") {
        const n = arrInputsSbC.find((e) => e.name == `rs-${v}`);
        arrayNumeros.push(n.value != "" ? n.value : 0);
      } else {
        arrayNumeros.push(v);
      }
    });

    let inpf = retornarSumaString(arrayNumeros);

    f.value = inpf;
  });
}
const ModalExamenesCrudExterno = document.getElementById(
  "resultadosExternosModal"
);
ModalExamenesCrudExterno.addEventListener(
  "show.bs.modal",
  (event) => {
    document.getElementById("examenes-list").style.opacity = "0";
  },
  false
);

ModalExamenesCrudExterno.addEventListener(
  "hidden.bs.modal",
  (event) => {
    document.getElementById("examenes-list").style.opacity = "1";
  },
  false
);
const ModalExamenesCrud = document.getElementById("resultadosModal");
ModalExamenesCrud.addEventListener(
  "show.bs.modal",
  (event) => {
    document.getElementById("examenes-list").style.opacity = "0";
  },
  false
);

ModalExamenesCrud.addEventListener(
  "hidden.bs.modal",
  (event) => {
    document.getElementById("examenes-list").style.opacity = "1";
  },
  false
);
function grisModal(id1) {
  document.getElementById(id1).style.opacity = "0.75";
}

const addInput = () => {
  const inputContainer = document.getElementById("inputContainerResultados");
  const inputsArray = document.getElementsByName("resultadoInput");
  if (inputsArray.length + 1 > 10) {
    return;
  }
  let inputC = document.createElement("input");
  inputC.name = "resultadoInput";
  inputC.type = "text";
  inputC.placeholder = "Ingrese un resultado unico en el examen";
  inputC.ariaLabel = "default input example";
  inputC.className = "form-control inputExamen";
  inputContainer.appendChild(inputC);
};

const calcularEdad = () => {
  const fecha = document.getElementsByName("fecha_nacimiento")[0].value;
  document.getElementsByName("edad")[0].value = calcularEdadNormal(fecha);
};

const calcularEdadNormal = (fecha) => {
  let fechaActual = moment().format("YYYY-MM-DD");

  let fecha2 = (document.getElementsByName("fecha_nacimiento")[0].value =
    moment(fecha).format("YYYY-MM-DD"));
  const mes = moment(fecha).format("MM");
  const ano = moment(fecha).format("YYYY");
  const dia = moment(fecha).format("DD");
  if (
    (mes == 2 && dia > 29) ||
    moment(fecha2).isAfter(fechaActual) ||
    ano < 1890
  ) {
    document.getElementsByName("fecha_nacimiento")[0].value = "";
    return "";
  }

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

const validarNInput = (event) => {
  if (event.target.value != "N") {
    document.getElementById("childNameDiv").setAttribute("hidden", "true");
  }
};

const validarNSlct = async (event) => {
  if (event.target.value == "") {
    activarInputs("crearPaciente()");
    document.getElementsByName("nombre")[0].value = "";
    document.getElementsByName("edad")[0].value = "";
    document.getElementsByName("fecha_nacimiento")[0].value = "";
    const { direccion, telefono, correo } = JSON.parse(
      event.target.options[event.target.selectedIndex].getAttribute("rep")
    );
    document.getElementsByName("direccion")[0].value = direccion;
    document.getElementsByName("telefono")[0].value = telefono;
    document.getElementsByName("correo")[0].value = correo;
  } else if (event.target.value == "default") {
  } else {
    try {
      const { token } = await login.getToken();

      const { data: paciente } = await axios.get(
        urlsv + "/api/examenes/get-paciente-hijo",
        {
          params: {
            cedula: event.target.value.split("-")[1],
            nombre: event.target.value.split("-")[0],
          },
          headers: { token },
        }
      );
      if (paciente.length == 0) {
        cedulaAlerta(
          `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
  </svg>  <div>
  No se ha encontrado el usuario, agréguelo para continuar
    </div>`,
          "primary"
        );
        return activarInputs("crearPaciente()");
      } else {
        idPaciente = paciente.id;

        desactivarInputs();
        document
          .getElementById("botonModificar")
          .addEventListener(
            "click",
            () => activarInputs("modificarPaciente()"),
            true
          );

        paciente.fecha_nacimiento = moment(paciente.fecha_nacimiento).format(
          "YYYY-MM-DD"
        );
        document.getElementsByName("edad")[0].value = calcularEdadNormal(
          paciente.fecha_nacimiento
        );
        for (let clave in paciente) {
          if (clave == "fecha_nacimiento") {
            document.getElementsByName(clave)[0]
              ? (document.getElementsByName(clave)[0].value =
                moment(paciente[clave]).format("YYYY-MM-DD") ?? "")
              : "";
          } else {
            document.getElementsByName(clave)[0]
              ? (document.getElementsByName(clave)[0].value =
                paciente[clave] ?? "")
              : "";
          }
        }

        document.getElementById(paciente.genero).removeAttribute("disabled");
        document.getElementById(paciente.genero).click();
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.mensaje) {
        return await alerta.alert("Error:", error.response.data.mensaje);
      } else {
        return await alerta.error();
      }
    }
  }
};

const validarN = async () => {
  if (document.getElementsByName("pre_cedula")[0].value == "N") {
    const cedula = document.getElementsByName("cedula")[0].value;
    try {
      const { token } = await login.getToken();
      if (!cedula || isNaN(cedula) || cedula == "") {
        return cedulaAlerta(
          `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>  <div>
      Se debe ingresar una cedula valida
        </div>`,
          "warning"
        );
      }

      const { data } = await axios.get(urlsv + "/api/users/get-hijos", {
        params: {
          cedula,
        },
        headers: { token },
      });

      const { hijos, rep } = data;
      if (hijos.length == 0) {
        if (rep.length > 0) {
          let { direccion, telefono, correo } = rep[0];
          document.getElementsByName("direccion")[0].value = direccion;
          document.getElementsByName("telefono")[0].value = telefono;
          document.getElementsByName("correo")[0].value = correo;
          document.getElementsByName("fecha_nacimiento")[0].value = "";
          document.getElementsByName("edad")[0].value = "";
          cedulaAlerta(
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg>  <div>
        No se ha encontrado menores, agregue uno para continuar
          </div>`,
            "primary"
          );
          activarInputs("crearPaciente()");
        }
      } else {
        document.getElementById("childNameDiv").removeAttribute("hidden");

        document.getElementById("childNameList").innerHTML = `
        <option value="default" selected>Niños</option>
        <option rep='${JSON.stringify(
          rep[0]
        )}' value="">+ Agregar Niño...</option>
        `;
        document.getElementById("childNameList").innerHTML += hijos
          .map(
            (hijo) =>
              `<option nombre="${hijo.nombre}" direccion="${hijo.direccion}" telefono="${hijo.telefono}" correo="${hijo.correo}" idHijo="${hijo.id}" genero="${hijo.genero}" fecha_nacimiento="${hijo.fecha_nacimiento}" cedula="${hijo.cedula}" value="${hijo.nombre}-${hijo.cedula}">${hijo.nombre}</option>`
          )
          .join("");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 403) {
        console.log(
          "🚀 ~ validarN ~ error.response.status:",
          error.response.status
        );
        document.getElementsByName("pre_cedula")[0].value = "V";

        document.getElementById("childNameDiv").setAttribute("hidden", "true");
        cedulaPaciente();

        return cedulaAlerta2(
          `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>  <div>
      La cedula del representante no está registrada
        </div>`,
          "danger"
        );
      } else {
        if (error.response.data.mensaje) {
          return await alerta.alert("Error:", error.response.data.mensaje);
        } else {
          return await alerta.error();
        }
      }
    }
  }
};
const validarN2 = async () => {
  if (document.getElementsByName("pre_cedula")[0].value == "N") {
    const cedula = document.getElementsByName("cedula")[0].value;
    const hijo = document.getElementById("childName").value;
    try {
      const { token } = await login.getToken();
      if (!cedula || isNaN(cedula) || cedula == "") {
        return cedulaAlerta(
          `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>  <div>
      Se debe ingresar una cedula valida
        </div>`,
          "warning"
        );
      }

      if (!hijo || hijo == "") {
        activarInputs("crearPaciente()");

        cedulaAlerta(
          `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>  <div>
      El campo hijo esta vacio, por favor agregue el nombre del niño o agregue uno nuevo
        </div>`,
          "warning"
        );
      }

      const { data } = await axios.get(urlsv + "/api/users/hijos", {
        params: {
          cedula,
          hijo,
        },
        headers: { token },
      });

      const { hijos, rep } = data;
      if (hijos.length == 0) {
        document.getElementsByName("nombre")[0].value = hijo;

        if (rep.length > 0) {
          let { direccion, telefono, correo, fecha_nacimiento } = rep[0];
          document.getElementsByName("direccion")[0].value = direccion;
          document.getElementsByName("telefono")[0].value = telefono;
          document.getElementsByName("correo")[0].value = correo;
          document.getElementsByName("fecha_nacimiento")[0].value = "";
          document.getElementsByName("edad")[0].value = "";
          cedulaAlerta(
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
        </svg>  <div>
        No se ha encontrado el usuario, agréguelo para continuar
          </div>`,
            "primary"
          );
          activarInputs("crearPaciente()");
        }
      } else {
        document.getElementById("childNameList").innerHTML = hijos
          .map(
            (hijo) =>
              `<option onclick="handleDatalistInput()" value="${hijo.nombre}" cedulaHijo="${hijo.cedula}">${hijo.nombre}</option>`
          )
          .join("");

        const hijoFind = hijos.find(
          (e) => e.nombre.toUpperCase() == hijo.toUpperCase()
        );
        if (hijoFind !== undefined) {
          document.getElementsByName("nombre")[0].value = hijoFind.nombre;
          document.getElementsByName("direccion")[0].value = hijoFind.direccion;
          document.getElementsByName("telefono")[0].value = hijoFind.telefono;
          document.getElementsByName("correo")[0].value = hijoFind.correo;
          hijoFind.fecha_nacimiento = moment(hijoFind.fecha_nacimiento).format(
            "YYYY-MM-DD"
          );
          document.getElementsByName("fecha_nacimiento")[0].value =
            hijoFind.fecha_nacimiento;

          document.getElementsByName("edad")[0].value = calcularEdadNormal(
            hijoFind.fecha_nacimiento
          );
          idPaciente = hijoFind.id;

          desactivarInputs();
          botonModificar.addEventListener(
            "click",
            () => activarInputs("modificarPaciente()"),
            true
          );
        } else {
          document.getElementsByName("nombre")[0].value = hijo;
          if (rep.length > 0) {
            let { direccion, telefono, correo, fecha_nacimiento } = rep[0];
            document.getElementsByName("direccion")[0].value = direccion;
            document.getElementsByName("telefono")[0].value = telefono;
            document.getElementsByName("correo")[0].value = correo;
            document.getElementsByName("fecha_nacimiento")[0].value = "";

            cedulaAlerta(
              `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
          </svg>  <div>
          No se ha encontrado el usuario, agréguelo para continuar
            </div>`,
              "primary"
            );

            activarInputs("crearPaciente()");
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 403) {
        console.log(
          "🚀 ~ validarN ~ error.response.status:",
          error.response.status
        );
        document.getElementsByName("pre_cedula")[0].value = "V";
        validarNInput({ target: { value: "V" } });

        return cedulaAlerta2(
          `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>  <div>
      La cedula del representante no está registrada
        </div>`,
          "danger"
        );
      }
    }
  }
};

