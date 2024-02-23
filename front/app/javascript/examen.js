var examenes = [];
var idPaciente ='';

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
    /*console.log("🚀 ~ render ~ bioanalistas:", bioanalistas);
    const bioSlct = document.getElementsByName("bioanalistasSlct")[0];
    bioanalistas.map((bio) => {
      bioSlct.innerHTML += `<option value="${bio.id}">${bio.nombre}</option>`;
    });*/
    const examBody = document.getElementById("tBodyMenuExamen");
    examenesGet.map((ex) => {
      examBody.innerHTML += `<tr><td>${ex.id}</td><td>${ex.nombre}</td><td style="cursor:pointer"
      onclick="abrirModalExamenesCrud(),modificarExamen('${ex.id}')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="#FACD0B"
      class="bi bi-pencil-square"
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
    </td>
    <td style="cursor:pointer" onclick="">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      fill="red"
      class="bi bi-x-lg"
      viewBox="0 0 20 20"
    >
      <path
        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
      />
    </svg>
  </td></tr>`;
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
  input = document.getElementById("inputMenuExamen");
  filtro = examenes.filter((ex) =>
    ex.nombre.toLowerCase().includes(input.value.toLowerCase())
  );
  const examBody = document.getElementById("tBodyMenuExamen");
  examBody.innerHTML = "";
  filtro.map((ex) => {
    examBody.innerHTML += `<tr class=" text-break"><td>${ex.id}</td><td>${ex.nombre}</td></tr>`;
  });
}
const cedulaPaciente = async () => {
  console.log("cedulaPaciente");
  const preCedula = document.getElementsByName("pre_cedula")[0].value;
  const cedula = document.getElementsByName("cedula")[0].value;
  console.log("🚀 ~ cedulaPaciente ~ cedula:", cedula);
  const fecha = document.getElementsByName("fechaRegistro")[0].value;
  var inputs = [...document.getElementsByTagName("input")];
  const botonModificar = document.getElementById("botonModificar");
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
  if (preCedula != "E" && preCedula != "V") {
    return cedulaAlerta(
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
  </svg>  <div>
      Ingrese una pre cedula valida
    </div>`,
      "warning"
    );
  }
  if (preCedula == "" || cedula == "" || !cedula || cedula.length <6 || cedula.length >12) {
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
    if (cedula.length >=6 && cedula.length <=12) {
      const { token } = await login.getToken();

      const { data: paciente } = await axios.get(
        urlsv + "/api/examenes/get-paciente",
        {
          params: {
            cedula,
          },
          headers: { token },
        }
      );
      idPaciente = paciente.id

      console.log("🚀 ~ cedulaPaciente ~ paciente:", paciente);
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
};

const desactivarInputs = () => {
  var inputs = [...document.getElementsByTagName("input")];
  const botonGuardar = document.getElementById("botonGuardar");
  if (botonGuardar) {
    botonGuardar.remove();
  }
  inputs.map((inp) => {
    if (
      inp.name != "pre_cedula" &&
      inp.name != "cedula" &&
      inp.name != "fecha" &&
      !(inp.className.includes('inputExamen'))
    ) {
      
      inp.setAttribute("readonly", "true");
        
      
    }
    
    
    if (inp.name == "genero" )   {
      inp.setAttribute("disabled", "true");
    }
  });
};

const activarInputs = async (click) => {
  var inputs = [...document.getElementsByTagName("input")];

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
        { paciente: validacion, new: false },
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
  const paciente = [];
  const validacion = validarDatosPaciente(pacienteArray);
  if (validacion) {
    try {
      const { token } = await login.getToken();

      await axios.post(
        urlsv + "/api/creacion/agregar-paciente",
        { paciente: validacion, new: true, idPaciente},
        { headers: { token } }
      );
      console.log("PACIENTE INGRESADO");
      const modal = new bootstrap.Modal("#confirmacion-modal");
      modal.show();
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

const addInput = () => {
  const inputContainer = document.getElementById("inputContainerResultados");
  const inputsArray = document.getElementsByName("resultadoInput");
  if (inputsArray.length + 1 > 10) {
    return;
  }

  inputContainer.innerHTML += `
  <input
    name='resultadoInput'
                      class="form-control inputExamen"
                      type="text"
                      placeholder="Ingrese un resultado unico en el examen"

                      aria-label="default input example"
                    />
  `;
};

const calcularEdad = () => {
  const fecha = document.getElementsByName("fecha_nacimiento")[0].value;
  document.getElementsByName("edad")[0].value = calcularEdadNormal(fecha);
};

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
