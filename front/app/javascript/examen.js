var examenes = [];
var idPaciente = "";
var pacienteObj = {};
let examenesDelPaciente = [];
var examenDataPc;

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
        console.log(o);
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
        console.log(o);
        break;
      }
    }
  }

  return o[0];
}

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
    const selectBio = document.getElementById("selectBioAnalista");
    bioanalistas.forEach((b) => {
      selectBio.innerHTML += `
      <option value='${b.id}'>${b.nombre}</option>
      `;
    });

    const menuDiagnosticoUl = document.getElementById("menuDiagnosticoUl");
    examenes.forEach((ex) => {
      menuDiagnosticoUl.innerHTML += `
      <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
              <div class="col-10">
                <span class="">${ex.nombre}</span>

              </div>
              <div class="col-2 d-flex justify-content-end align-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" onclick="abrirResultadosModal('${ex.nombre}','${ex.id}','true')" width="24" height="24" fill="green" class="bi bi-check-circle mx-4" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
              </svg>
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
              <div class="col-10">
                <span class="">${ex.nombre}</span>

              </div>
              <div class="col-2 d-flex justify-content-end align-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" onclick="abrirResultadosModal('${ex.nombre}','${ex.id}','true')" width="24" height="24" fill="green" class="bi bi-check-circle mx-4" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
              </svg>
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


    `;
  });
}

async function detalleExamen(id) {
  const { token } = await login.getToken();
  const { data: caracteristicas } = await axios.get(
    urlsv + "/api/modulo-examenes/caracteristicas-id_ex",
    { headers: { token }, params: { id } }
  );
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
    tBody.innerHTML += `
    <tr>
      <td scope="col">${c.nombre}</td>
      <td scope="col">${c.unidad}</td>
      <td scope="col">${c.posicion}</td>
      <td scope="col">${c.imprimir}</td>
    </tr>
    `;
  });
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
        pacienteObj = paciente;
        pacienteObj.edad = calcularEdadNormal(paciente.fecha_nacimiento);
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

       
        } else {
          console.log(botonModificar);
          desactivarInputs();
          botonModificar.addEventListener(
            "click",
            () => activarInputs("modificarPaciente()"),
            true
          );
          botonExamen.addEventListener(
            "click",
            () => abrirModalExamenes(),
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
      inp.name != "fechaRegistro" &&
      !inp.className.includes("inputExamen") &&
      inp.id != 'inputOrden'
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

function validarSelectOrden() {
  const selectOrden =document.getElementById('selectOrden')
  const inputOrden = document.getElementById('inputOrden')
  if(selectOrden.value == 'no'){
    inputOrden.setAttribute('disabled','true')

  }else{
    try {
      inputOrden.removeAttribute('disabled')
    } catch (error) {
      
    }
  }
}
const abrirModalTotalizar = () => {
  console.log(examenesDelPaciente);
  const tBodyOrden = document.getElementById(`tBodyLgExOrd`);
  const tr = document.getElementsByClassName("liBodyTablaExPacOrd");
  const pacienteInput = document.getElementById("inputPacienteOrden");
  pacienteInput.value = pacienteObj.nombre;

  console.log(tr);
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
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="green" class="bi bi-eye svgButton" viewBox="0 0 16 16"  data-bs-toggle="collapse" href="#collapseOrdenEx${
            ex.examenId
          }" role="button" aria-expanded="false" aria-controls="collapseOrdenEx${
      ex.examenId
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
    ex.detallesExamenPc.forEach((dt) => {
      tBodyOrdenCollapse.innerHTML += `
    <tr>
      <td scope="col">${dt.nombreCar}</td>
      <td scope="col">${dt.resultado}</td>
      <td scope="col">${dt.nota}</td>
      
    </tr>

`;
    });
  });

  new bootstrap.Modal("#ordenModal").toggle();
};

const abrirModalExamenes = () => new bootstrap.Modal("#examenes-list").toggle();
const abrirModalExamenesCrud = () =>
  new bootstrap.Modal("#examenes-crud").toggle();

const abrirResultadosModal = async (examen, idEx, n) => {
  const h1Ex = document.getElementById("h1NombreEx");
  const tBodyDiagnosticos = document.getElementById("tBodyDiagnosticos");
  tBodyDiagnosticos.innerHTML = "";
  h1Ex.innerText = `${examen} - ${pacienteObj.nombre} - ${pacienteObj.edad}`;
  const alertaExamen = document.getElementById('alertaExamen')
  const examenF=examenesDelPaciente.filter(ex=>ex.examenId == idEx)
  if(examenF.length>0){
    console.log(alertaExamen)
  
    alertaExamen.innerHTML+=`
    El examen ${examen} ya ha sido evaluado para el paciente ${pacienteObj.nombre}
    `
    alertaExamen.removeAttribute('hidden')
    setTimeout(() => {
      alertaExamen.setAttribute('hidden','true')
      alertaExamen.innerHTML=''
    }, "5000");
    return
  }
  
  new bootstrap.Modal("#resultadosModal").toggle();

  const { token } = await login.getToken();
  const { data: examenData } = await axios.get(
    urlsv + "/api/modulo-examenes/examen-id",
    { headers: { token }, params: { idExamen: idEx } }
  );

  examenDataPc = examenData;
  examenData.detalles = examenData.detalles.sort(function (a, b) {
    if (a.posicion > b.posicion) {
      return 1;
    }
    if (a.posicion < b.posicion) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  console.log(examenData);
  let edad = parseInt(pacienteObj.edad.split(";")[0].split(" ")[0]);
  let generoPc = pacienteObj.genero == "Hombre" ? "masculino" : "femenino";
  examenData.detalles.forEach((ct) => {
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
              <th scope="row" colspan="2">${ct.nombre}</th>
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
                      <th scope="row" colspan="2">${ct.nombre}</th>
                      <td> <select class="form-select form-select-sm selectRs${ct.nombre} inputExDetallePacCar" rango='${rango.id}' id='inputRs${ct.id}' aria-label="Small select example">
                      
                    </select></td>
                      <td>${ct.unidad}</td>
                      <td>${rango.inferior}  -  ${rango.superior}</td>
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
                      <th scope="row" colspan="2">${ct.nombre}</th>
                      <td>  <input class="form-control form-control-sm inputExDetallePacCar" rango='${rango.id}' name='rs-${ct.id}' type="text" id='inputRs${ct.id}' placeholder="Ingrese Resultado" aria-label=".form-control-sm example">              </td>
                      <td>${ct.unidad}</td>
                      <td>${rango.inferior}  -  ${rango.superior}</td>
                      <td>  <input class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' placeholder="Nota" aria-label=".form-control-sm example">              </td>
        
                    </tr>
          `;
        }
      } else {
        if (resultadosDt.length > 0) {
          tBodyDiagnosticos.innerHTML += `
          <tr>
                      <th scope="row" colspan="2">${ct.nombre}</th>
                      <td> <select class="form-select form-select-sm selectRs${ct.nombre} inputExDetallePacCar" rango='no' id='inputRs${ct.id}' aria-label="Small select example">
                      
                    </select></td>
                      <td>${ct.unidad}</td>
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
                      <th scope="row" colspan="2">${ct.nombre}</th>
                      <td>  <input class="form-control form-control-sm inputExDetallePacCar" name='rs-${ct.id}' rango='no' type="text" id='inputRs${ct.id}' placeholder="Ingrese Resultado" aria-label=".form-control-sm example">              </td>
                      <td>${ct.unidad}</td>
                      <td> - </td>
                      <td>  <input class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' placeholder="Nota" aria-label=".form-control-sm example">              </td>
        
                    </tr>
          `;
        }
      }
    }
  });
  if (n == "false") {
    setInputs(idEx);
  }
};

async function guardarOrden(){
  const selectOrden=document.getElementById("selectOrden");
  const inputOrden=document.getElementById("inputOrden");
  const selectBioAnalista=document.getElementById("selectBioAnalista");

  
  let examenes = [

  ]
  
  examenesDelPaciente.forEach(ex=>{
    let detallesExamen = []
    
    
    ex.detallesExamenPc.forEach(dt=>{
      let subCaracteristicasDt = []
      ex.subCaracteristicasExPc.filter(sb=>sb.idCar == dt.idCar).forEach(sb=>{
        subCaracteristicasDt.push({
          id_dt:dt.idCar,
          id_detalle_sub:sb.idSub,
          resultado:sb.resultado,
          nota:sb.nota
        })
      })
      detallesExamen.push({
        id_dt:dt.idCar,
        id_ex:ex.examenId,
        id_rango:dt.rango,
        resultado:dt.resultado,
        nota:dt.nota,
        subCaracteristicasDt
      })
    })
    examenes.push({
      id_ex:ex.examenId,
      idPac: pacienteObj.id,
      id_bio: selectBioAnalista.value,
      detallesExamen,
    })
  
  })
  let orden={
    idPac: pacienteObj.id,
    orden: inputOrden.value,
    clave: selectOrden.value,
    id_bio: selectBioAnalista.value,
    examenes
  }
  try {
    const { token } = await login.getToken();
  
    const res = await axios.post(
      urlsv + "/api/examenes/crear-orden",
      { orden },
      { headers: { token } }
    );
    console.log(res)
  
    if(res.status == 200){
      const ordenModal =   new bootstrap.Modal(document.getElementById('ordenModal'))
      ordenModal.hide()
      const backdrop=document.getElementsByClassName('modal-backdrop')
      const arrBackdrop=[...backdrop]
      arrBackdrop.forEach(e=>{
        e.className='modal-backdrop fade'
        e.setAttribute('hidden','true')
      })
      
   
      const alertaModal=new bootstrap.Modal("#confirmacion-orden-modal",{
      }).toggle()
      
      
      document.getElementById(`messageAlertaExamenP`).innerText=`Orden creada exitosamente!`
      document.getElementById("totalizarButton").setAttribute('hidden','true')
      document.getElementById('tBodyLgEx').innerHTML=`
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
      `
      examenesDelPaciente=[]
  
    }
   
  
  } catch (error) {
    const ordenModal =   new bootstrap.Modal(document.getElementById('ordenModal'))
    ordenModal.hide()
    const backdrop=document.getElementsByClassName('modal-backdrop')
    const arrBackdrop=[...backdrop]
    arrBackdrop.forEach(e=>{
      e.className='modal-backdrop fade'
      e.setAttribute('hidden','true')
    })
    
    const alertaModal=new bootstrap.Modal("#error-orden-modal",{
    }).toggle()
    
    
    document.getElementById(`messageAlertaExamenErrorP`).innerText=`${error.response.data.mensaje}`  }
  

  
}

async function pedirCaracteristicas(id){
  console.log(id)
  const tBody=document.getElementById(`tBodyCollapseLi${id}`)
  tBody.innerHTML=''
  try {
    const { token } = await login.getToken();
    
    const { data: caracteristicas} = await axios.get(
      urlsv + "/api/examenes/get-caracteristicasExamenPaciente",
      {
        params: {
          id
        },
        headers: { token },
      }
    );
    console.log(caracteristicas)
    caracteristicas.caracteristicasData.forEach(ct=>{
      tBody.innerHTML+=`
      <tr>
                  <td scope="col">${ct.nombre}</td>
                  <td scope="col">${ct.resultado}</td>
                  <td scope="col">${ct.unidad}</td>
                  <td scope="col">${ct.rango ? ct.rango.inferior + ' - '+ ct.rango.superior : 'no'}</td>
                  <td scope="col">${ct.nota}</td>
                </tr>
      `
    })
  
  } catch (error) {
    console.log(error)
  }
}

async function buscarExamenesPaciente(){
  const fechaExamen = document.getElementById('fechaExamenInput')
  const preCedula = document.getElementsByName("pre_cedula")[0].value;

  const cedula = document.getElementsByName("cedula")[0].value;

  console.log(fechaExamen.value)
  try {
    const { token } = await login.getToken();
    console.log(pacienteObj)
    const { data: examenes} = await axios.get(
      urlsv + "/api/examenes/get-examenesPaciente",
      {
        params: {
          cedula,
          preCedula,
          fecha: fechaExamen.value != '' ? fechaExamen.value : 'no'
        },
        headers: { token },
      }
    );
    console.log(examenes)

    const tBody = document.getElementById(`tBodyLgEx`);
    examenes.examenesData.forEach(ex=>{
      tBody.innerHTML += `
      <a href="#" class="list-group-item list-group-item-action liTableExPac liBodyTablaExPac" id="aTablaExPac${ex.id}" >
      <div class="container">
        <div class="row text-center">
          <div class="col-1">
            ${ex.id}
          </div>
          <div class="col-8 ">
            <div class="row">
              <div class="col-9">
              ${ex.nombreEx}
    
              </div>
             
              
              <div class="col-3 d-flex justify-content-end">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="green" onclick="pedirCaracteristicas(${ex.id})"  data-bs-toggle="collapse" data-bs-target="#collapseLiTab${ex.id}" class="bi bi-eye svgButton" viewBox="0 0 16 16"  >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#FACD0B"
                class="bi bi-pencil-square mx-4 my-1 svgButton"
                onclick=""
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
              onclick=""
            >
              <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
              />
            </svg>
                
               
              </div>
            </div>
            
            
          </div>
          <div class="col-3">${ex.fecha.split('T')[0]}</div>
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
    
    })
 
    

  } catch (error) {
    console.log(error)
  }

}

function guardarResultadosExamen() {
  const detallesExamenPc = examenDataPc.detalles.map((e) => {
    const res = document.getElementById("inputRs" + e.id);
    const nota = document.getElementById("inputNt" + e.id);
    console.log(nota, res);
    if(examenesDelPaciente.length==0){
      document.getElementById("tBodyLgEx").innerHTML=`
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
      `
    }
    if (res) {
      return {
        rango: res.attributes.rango.value,
        resultado: res.value,
        nota: nota.value,
        idCar: e.id,
        nombreCar: e.nombre,
        imprimir: e.impsiempre,
      };
    }
    return {
      rango: "no",
      resultado: "subCaracteristica",
      nota: nota.value,
      idCar: e.id,
      nombreCar: e.nombre,
      imprimir: e.impsiempre,
      unidad: e.unidad,
    };
  });
  const subCaracteristicas = examenDataPc.subCa.map((e) => {
    const res = document.getElementById("Rs-" + e.id);
    const nota = document.getElementById("Nt-" + e.id);
    console.log(res, nota);
    return {
      idSub: e.id,
      nombreSub: e.nombre,
      resultado: res.value,
      idCar: e.id_det_ex,
      nota: nota.value,
    };
  });
  let examenPac = {
    examenId: examenDataPc.examen.id,
    examenNombre: examenDataPc.examen.nombre,
    detallesExamenPc,
    subCaracteristicasExPc: subCaracteristicas,
  };

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
}


function setInputs(idEx) {
  const examen = examenesDelPaciente.find((e) => e.examenId == idEx);

  examen.detallesExamenPc.forEach((e) => {
    console.log(`inputRs${e.idCar}`);
    const res = document.getElementById(`inputRs${e.idCar}`);
    const nota = document.getElementById(`inputNt${e.idCar}`);

    console.log(res, nota, e);
    nota.value = e.nota;
    try {
      res.value = e.resultado;
    } catch (error) {
      console.log(error);
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
  <a href="#" class="list-group-item list-group-item-action liTableExPac liBodyTablaExPac" id="aTablaExPac${
    examenPac.examenId
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
            
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="green" class="bi bi-eye svgButton" viewBox="0 0 16 16"  data-bs-toggle="collapse" href="#collapseLiTab${
              examenPac.examenId
            }" role="button" aria-expanded="false" aria-controls="collapseLiTab${
    examenPac.id
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
            onclick="abrirResultadosModal('${examenPac.examenNombre}','${
    examenPac.examenId
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
    <tr>
            <th scope="row">${e.nombreCar}</th>
            <td>${e.resultado}</td>
            <td>${e.unidad ? e.unidad : "-"}</td>
            <td>${e.rango == "no" ? "-" : e.rango}</td>
            <td>${e.nota}</td>
          </tr>
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
    console.log(inputSubCaCa);
    let arrayNumeros = [];
    valorSp.forEach((v) => {
      console.log(v);
      if (v != "+" && v && "-" && v != "*" && v != "/") {
        const n = arrInputsSbC.find((e) => e.name == `rs-${v}`);
        console.log(n.value);
        arrayNumeros.push(n.value != "" ? n.value : 0);
      } else {
        arrayNumeros.push(v);
      }
    });

    console.log(arrayNumeros);
    let inpf = retornarSumaString(arrayNumeros);

    f.value = inpf;
  });
}
const ModalExamenesCrud = document.getElementById("resultadosModal");
ModalExamenesCrud.addEventListener(
  "show.bs.modal",
  (event) => {
    console.log(event);
    document.getElementById("examenes-list").style.opacity = "0";
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
