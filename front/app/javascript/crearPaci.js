const agregarPaciente = async (event) => {
  const { token } = await login.getToken();

  const paciente = [];
  const validacion = [...event.target].some((el) => {
    if (el.tagName == "SELECT" || el.tagName == "INPUT") {
      if (el.name == "genero") {
        let generoChk = document.getElementsByClassName("generoCheck");
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
          return true;
        }
      } else {
        if (el.value == "") {
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
            return true;
          }
        }

        if (el.name == "cedula") {
          if (el.value < 0) {
            return true;
          }
        }
        if (el.name == "nombre") {
          if (!isNaN(el.value)) {
            return true;
          }
        }
        if (el.name == "correo") {
          if (el.value.split("@")[0] == "" || el.value.split("@")[1] == "") {
            return true;
          }
          if (!el.value.split("@")[1].split(".")[1].includes("com")) {
            return true;
          }
        }
        if (el.name == "fecha_nacimiento") {
          if (moment(el.value).isAfter(moment().format("YYYY-MM-DD"))) {
            return true;
          }
        }

        const elemento = { value: el.value, name: el.name };
        paciente.push(elemento);
      }
    }
  });
  if (validacion) {
    console.log("SE HA ENCONTRADO ALGUN ERROR");
    return await alerta.alert("Error:", "SE HA ENCONTRADO ALGUN ERROR DE DATO");
  }
  try {
    await axios.post(
      urlsv + "/api/creacion/agregar-paciente",
      { paciente },
      { headers: { token } }
    );
    const modal = new bootstrap.Modal("#confirmacion-modalPaci");
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
  document
    .getElementsByName("fecha_nacimiento")[0]
    .setAttribute("max", fechaActual);
};
