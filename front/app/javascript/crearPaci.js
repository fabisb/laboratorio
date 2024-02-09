const agregarPaciente = async (event) => {
  const { token } = await login.getToken();

  const paciente = [];
  const validacion = [...event.target].some((el) => {
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
          return true;
        }
      } else {
        if (el.value == "") {
          console.log(`Campo ${el.name} vacio`);
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
            return true;
          }
        }

        if (el.name == "cedula") {
          if (el.value < 0) {
            console.log("Ingrese una cedula valida");
            return true;
          }
        }
        if (el.name == "nombre") {
          if (!isNaN(el.value)) {
            console.log("Ingrese un nombre valido");
            return true;
          }
        }
        if (el.name == "correo") {
          if (el.value.split("@")[0] == "" || el.value.split("@")[1] == "") {
            console.log("Ingrese un correo valido");
            return true;
          }
          if (!el.value.split("@")[1].split(".")[1].includes("com")) {
            console.log("Ingrese un correo valido");
            return true;
          }
        }
        if (el.name == "fecha_nacimiento") {
          if (moment(el.value).isAfter(moment().format("YYYY-MM-DD"))) {
            console.log("Ingrese una fecha valida");
            return true;
          }
        }

        const elemento = { value: el.value, name: el.name };
        paciente.push(elemento);
      }
    }
  });
  if (validacion) {
    return console.log("SE HA ENCONTRADO ALGUN ERROR");
  }
  console.log("🚀 ~ agregarPaciente ~ paciente:", paciente);
  try {
     await axios.post(
      urlsv + "/api/creacion/agregar-paciente",
      { paciente },
      { headers: { token } }
      );
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

};

const render = () => {
  const fechaActual = moment().format("YYYY-MM-DD");
  console.log(fechaActual);
  document
    .getElementsByName("fecha_nacimiento")[0]
    .setAttribute("max", fechaActual);
};
