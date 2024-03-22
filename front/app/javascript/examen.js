var examenes = [];
var idPaciente = "";
var pacienteObj = {};


const render = async () => {
  try {
    const { token } = await login.getToken();

    const { data: examenesGet } = await axios.get(
      urlsv + "/api/examenes/get-examenes",
      { headers: { token } }
    );
    examenes = examenesGet;
    console.log("🚀 ~ render ~ examenes:", examenes);
    const { data: bioanalistas } = await axios.get(
      urlsv + "/api/examenes/get-bioanalistas",
      { headers: { token } }
    );
    const menuDiagnosticoUl = document.getElementById("menuDiagnosticoUl")
    examenes.forEach(ex=>{
      menuDiagnosticoUl.innerHTML+=`
      <li  class="list-group-item list-group-item-light list-group-item-action" onclick="abrirResultadosModal('${ex.nombre}','${ex.id}')">
              <div class="row">
                <div class="col-10">
                  <span class="">${ex.nombre}</span>
  
                </div>
                <div class="col-2 d-flex justify-content-end align-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" aria-expanded="false" aria-controls="collapseMenu${ex.id}" data-bs-toggle="collapse" data-bs-target="#collapseMenu${ex.id}" onclick="detalleExamen(${ex.id})" width="24" height="24" fill="green" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
                 
                </div>
  
              </div>
            </li> 
            <div class="collapse" id="collapseMenu${ex.id}">
            <div class="card card-body">
            </div>
            </div> 
  
  
      `
  
    })
    
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
};
function buscarExamen() {
  input = document.getElementById("examenDiagnosticoInput");
  filtro = examenes.filter((ex) =>
    ex.nombre.toLowerCase().includes(input.value.toLowerCase())
  );
  const menuDiagnosticoUl = document.getElementById("menuDiagnosticoUl")

  menuDiagnosticoUl.innerHTML = "";
  filtro.map((ex) => {
    menuDiagnosticoUl.innerHTML+=`
    <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
              <div class="col-10">
                <span class="">${ex.nombre}</span>

              </div>
              <div class="col-2 d-flex justify-content-end align-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" fill="green" aria-expanded="false" aria-controls="collapseMenu${ex.id}" data-bs-toggle="collapse" data-bs-target="#collapseMenu${ex.id}" onclick="detalleExamen(${ex.id})"class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
              
                
              
             
              </div>

            </div>
          </li> 
          <div class="collapse" id="collapseMenu${ex.id}">
          <div class="card card-body">
          </div>
          </div> 


    `

  });
}


async function detalleExamen(id){
  const { token } = await login.getToken();
  const {data: caracteristicas} = await axios.get(
    urlsv + "/api/modulo-examenes/caracteristicas-id_ex",
    { headers: { token }, params: { id } }
  ); 
  const collapse = document.getElementById(`collapseMenu${id}`)
  collapse.innerHTML=`
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
  `
  const tBody= document.getElementById(`tBody${id}`)
  


  caracteristicas.forEach(c=>{
    tBody.innerHTML+=`
    <tr>
      <td scope="col">${c.nombre}</td>
      <td scope="col">${c.unidad}</td>
      <td scope="col">${c.posicion}</td>
      <td scope="col">${c.imprimir}</td>
    </tr>
    `
  })
}

const cedulaPaciente = async () => {
  console.log("cedulaPaciente");
  const preCedula = document.getElementsByName("pre_cedula")[0].value;
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
    console.log("🚀 ~ cedulaPaciente ~ cedula:", cedula);
    const fecha = document.getElementsByName("fechaRegistro")[0].value;
    var inputs = [...document.getElementsByTagName("input")];
    const botonModificar = document.getElementById("botonModificar");
    const botonExamen = document.getElementById("botonExamen")
    inputs.map((inp) => {
      if (
        inp.name != "pre_cedula" &&
        inp.name != "cedula" &&
        inp.name != "fecha"
      ) {
        inp.value = "";
      }
    });

    console.log("🚀 ~ cedulaPaciente ~ fecha:", fecha);
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
            },
            headers: { token },
          }
        );
        idPaciente = paciente.id;

        console.log("🚀 ~ cedulaPaciente ~ paciente:", paciente);
        pacienteObj=paciente
        if (paciente.paciente == 404) {
          cedulaAlerta(
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>  <div>
      No se ha encontrado el usuario, agreguelo para continuar
        </div>`,
            "primary"
          );
          activarInputs("crearPaciente()");
          
          /*inputs.map((inp) => {
          inp.removeAttribute("readonly");
          inp.removeAttribute("disabled");
        });
        document.getElementsByName("edad")[0].setAttribute("readonly", "true");
        const botonGuardar = document.getElementById("botonGuardar");
        if (!botonGuardar) {
          document.getElementById("divRadios").innerHTML += `
          <button type="button" onclick="crearPaciente()" class="btn btn-outline-primary" id="botonGuardar">
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
        }*/
        } else {
          console.log(botonModificar);
          desactivarInputs();
          botonModificar.addEventListener(
            "click",
            () => activarInputs("modificarPaciente()"),
            true
          );
          botonExamen.addEventListener(
            "click",()=> abrirModalExamenes(),true
          )

          paciente.fecha_nacimiento = moment(paciente.fecha_nacimiento).format(
            "YYYY-MM-DD"
          );
          document.getElementsByName("edad")[0].value = calcularEdadNormal(
            paciente.fecha_nacimiento
          );
          for (let clave in paciente) {
            if (clave == "fecha_nacimiento") {
              console.log(moment(paciente[clave]).format("YYYY-MM-DD"));
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
      }
    } catch (error) {
      console.log(error);
      if (error.response.status != 404) {
        return await alerta.error();
      }
    }
  }
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
      !inp.className.includes("inputExamen")
    ) {
      inp.setAttribute("readonly", "true");
    }

    if (inp.name == "genero") {
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
      console.log("PACIENTE INGRESADO");
      const modal = new bootstrap.Modal("#confirmacion-modal-pacienteM");
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
    console.log("🚀 ~ pacienteArray.forEach ~ el:", el);
    if (el.tagName == "SELECT" || el.tagName == "INPUT") {
      if (el.value == "") {
        if (el.name !== "genero") {
          console.log(`Campo ${el.name} vacio`);
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
          console.log(`Campo ${el.name} invalido`);
          cadena.push(`El campo "Teléfono" debe contener solo números`);
        }
      }

      if (el.name == "cedula") {
        if (el.value < 0) {
          console.log("Ingrese una cedula valida");

          cadena.push(`Debe ingresar una cedula valida`);
        }
      }
      if (el.name == "nombre") {
        if (!isNaN(el.value)) {
          console.log("Ingrese un nombre valido");
          cadena.push(`Ingresó un número en lugar de un nombre`);
        }
      }
      if (el.name == "correo") {
        if (el.value != "") {
          if (el.value.split("@")[0] == "" || el.value.split("@")[1] == "") {
            console.log("Ingrese un correo valido");
            cadena.push("Ingrese un correo valido");
          }

          if (!el.value.split("@")[1].split(".")[1].includes("com")) {
            console.log("Ingrese un correo valido");
            cadena.push("Ingrese un correo valido");
          }
        } else {
          cadena.push("El campo correo no puede estar vacio");
        }
      }
      if (el.name == "fecha_nacimiento") {
        if (moment(el.value).isAfter(moment().format("YYYY-MM-DD"))) {
          console.log("Ingrese una fecha valida");
          cadena.push(`La fecha de nacimiento no puede ser mayor a la actual`);
        }
      }
      if (el.name == "genero") {
        console.log("etiqueta", el);
        console.log("valor", el.value);
      }
      const elemento = { value: el.value, name: el.name };
      paciente.push(elemento);
    }
  });
  console.log(cadena.join(", "));
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
    console.log(e);
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
      console.log("PACIENTE INGRESADO");
      const modal = new bootstrap.Modal("#confirmacion-modal");
      modal.show();
      desactivarInputs();
    } catch (error) {
      console.log(error);
      if (error.response.data.mensaje) {
        return await alerta.alert("Error:", error.response.data.mensaje);
      } else {
        return await alerta.error();
      }
    }
  }
  /*pacienteArray.some((el) => {
    if (el.tagName == "SELECT" || el.tagName == "INPUT") {
      if (el.name == "genero") {
        let generoChk = document.getElementsByClassName("generoCheck");
        console.log(generoChk);
        let suma = 0;
        [...generoChk].forEach((chk) => {
          if (chk.checked) {
            suma++;
          }
        });
        if (suma > 0) {
          if (el.checked == true) {
            const elemento = { value: el.value, name: el.name };
            paciente.push(elemento);
          }
        } else {
          console.log("no genero");
          validacionText += " Debe seleccionar un género para continuar. \n";
          return true;
        }
      } else {
        if (el.value == "") {
          console.log(`Campo ${el.name} vacio`);
          validacionText += ` El campo "${el.name}" no puede estar vacío.\n`;
          return true;
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
            console.log(`Campo ${el.name} invalido`);
            validacionText += ` El campo "Teléfono" debe contener solo números.\n`;
            return true;
          }
        }

        if (el.name == "cedula") {
          if (el.value < 0) {
            console.log("Ingrese una cedula valida");

            validacionText += ` Debe ingresar una cedula valida \n`;
            return true;
          }
        }
        if (el.name == "nombre") {
          if (!isNaN(el.value)) {
            console.log("Ingrese un nombre valido");
            validacionText += ` Ingresó un número en lugar de un nombre. \n`;
            return true;
          }
        }
        if (el.name == "correo") {
          if (el.value.split("@")[0] == "" || el.value.split("@")[1] == "") {
            console.log("Ingrese un correo valido");
            validacionText += " Ingrese un correo valido. \n";

            return true;
          }
          if (!el.value.split("@")[1].split(".")[1].includes("com")) {
            console.log("Ingrese un correo valido");
            validacionText += " Ingrese un correo valido. \n";

            return true;
          }
        }
        if (el.name == "fecha_nacimiento") {
          if (moment(el.value).isAfter(moment().format("YYYY-MM-DD"))) {
            console.log("Ingrese una fecha valida");
            validacionText += ` La fecha de nacimiento no puede ser mayor a la actual.\n`;
            return true;
          }
        }

        const elemento = { value: el.value, name: el.name };
        paciente.push(elemento);
      }
    }
    
  })*/
};

const reloadPage = async () => {
  const res = await alerta.alert(
    "Reiniciar:",
    "¿Esta seguro que desea reiniciar la ventana? Todos los campos quedaran vacios"
  );
  console.log("🚀 ~ cedulaPaciente ~ res:", res);
  if (res.response == 1) return;
  else location.reload();
};

const abrirModalExamenes = () => new bootstrap.Modal("#examenes-list").toggle();
const abrirModalExamenesCrud = () =>
  new bootstrap.Modal("#examenes-crud").toggle();

const abrirResultadosModal = (examen,idEx) => {
 const h1Ex = document.getElementById('h1NombreEx')

 h1Ex.innerText=`${examen} - ${pacienteObj.nombre}`
 new bootstrap.Modal("#resultadosModal").toggle()
 

}
const ModalExamenesCrud = document.getElementById("resultadosModal");
ModalExamenesCrud.addEventListener(
  "show.bs.modal",
  (event) => {
    console.log(event);
    document.getElementById("examenes-list").style.boxShadow = "0.5";
  },
  false
);

ModalExamenesCrud.addEventListener(
  "hidden.bs.modal",
  (event) => {
    console.log(event);
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

  console.log("momentisAfter:", moment(fecha2).isAfter(fechaActual));

  const mes = moment(fecha).format("MM");
  const ano = moment(fecha).format("YYYY");
  console.log("🚀 ~ calcularEdadNormal ~ ano:", ano);
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
    console.log("agregar nuevo");
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
    console.log("default");
  } else {
    console.log(event.target.value);
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
  No se ha encontrado el usuario, agreguelo para continuar
    </div>`,
          "primary"
        );
        return activarInputs("crearPaciente()");
      } else {
        console.log("🚀 ~ validarNSlct ~ paciente:", paciente);
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
            console.log(moment(paciente[clave]).format("YYYY-MM-DD"));
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
    console.log("🚀 ~ validarN ~ cedula:", cedula);
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
      console.log("🚀 ~ validarN ~ data:", data);
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
    console.log("🚀 ~ validarN ~ cedula:", cedula);
    const hijo = document.getElementById("childName").value;
    console.log("🚀 ~ validarN ~ hijo:", hijo);
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
      console.log("🚀 ~ validarN ~ data:", data);
      if (hijos.length == 0) {
        document.getElementsByName("nombre")[0].value = hijo;

        console.log(rep);
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
        No se ha encontrado el usuario, agreguelo para continuar
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
          console.log("🚀 ~ validarN ~ hijoFind:", hijoFind);
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
          console.log(rep);
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
          No se ha encontrado el usuario, agreguelo para continuar
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

function handleDatalistInput() {
  const inputValue = document.querySelector("#childName").value;
  const datalistOptions = document.getElementById("#childNameList").children;
  for (const option of datalistOptions) {
    if (option.value === inputValue) {
      // Execute your action here
      const hijo = document.getElementById("childName").value;
      if (!hijo || hijo == "") {
        return alerta.alert("Error", "El campo niño debe contener el nombre");
      }

      const hijoFind = hijos.find(
        (e) => e.nombre.toUpperCase() == hijo.toUpperCase()
      );
      console.log("🚀 ~ validarN ~ hijoFind:", hijoFind);
      document.getElementsByName("nombre")[0].value = hijoFind.nombre;
      document.getElementsByName("direccion")[0].value = hijoFind.direccion;
      document.getElementsByName("telefono")[0].value = hijoFind.telefono;
      document.getElementsByName("correo")[0].value = hijoFind.correo;
      hijoFind.fecha_nacimiento = moment(hijoFind.fecha_nacimiento).format(
        "YYYY-MM-DD"
      );
      document.getElementsByName("edad")[0].value = calcularEdadNormal(
        hijoFind.fecha_nacimiento
      );
      console.log("Selected option:", option.value);
      break;
    }
  }
}
