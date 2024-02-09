const render = async () => {
  try {
    const { token } = await login.getToken();
    const { data: bioanalistas } = await axios.get(
      urlsv + "/api/examenes/get-bioanalistas",
      { headers: { token } }
    );
    console.log("🚀 ~ render ~ bioanalistas:", bioanalistas);
    const bioSlct = document.getElementsByName("bioanalistasSlct")[0];
    bioanalistas.map((bio) => {
      bioSlct.innerHTML += `<option value="${bio._id}">${bio.nombre}</option>`;
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

const cedulaPaciente = async () => {
  console.log("cedulaPaciente");
  const cedula = document.getElementsByName("cedulaPaciente")[0].value;
  console.log("🚀 ~ cedulaPaciente ~ cedula:", cedula);
  try {
    if (cedula.length == 8) {
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
      console.log("🚀 ~ cedulaPaciente ~ paciente:", paciente);
      let edad = moment
        .duration(moment().diff(paciente.fecha_nacimiento))
        .years();
      document.getElementsByName("edad")[0].value = edad;
      for (let clave in paciente) {
        if (clave == 'fecha_nacimiento') {
            
            document.getElementsByName(clave)[0]
              ? (document.getElementsByName(clave)[0].value = moment(paciente[clave]).format('DD/MM/YYYY')  ?? "")
              : "";
        }else{

            document.getElementsByName(clave)[0]
              ? (document.getElementsByName(clave)[0].value = paciente[clave] ?? "")
              : "";
        }
      }
    }
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
};
