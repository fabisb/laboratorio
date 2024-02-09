var examenes = [];
const render = async () => {
  try {
    const { token } = await login.getToken();

    const { data: examenesGet } = await axios.get(
      urlsv + "/api/examenes/get-examenes",
      { headers: { token } }
    );
    examenes = examenesGet;
    console.log("🚀 ~ render ~ examenes:", examenes)
    const { data: bioanalistas } = await axios.get(
      urlsv + "/api/examenes/get-bioanalistas",
      { headers: { token } }
    );
    console.log("🚀 ~ render ~ bioanalistas:", bioanalistas);
    const bioSlct = document.getElementsByName("bioanalistasSlct")[0];
    bioanalistas.map((bio) => {
      bioSlct.innerHTML += `<option value="${bio.id}">${bio.nombre}</option>`;
    });
    const examBody = document.getElementById("tBodyMenuExamen");
    examenesGet.map((ex) => {
      examBody.innerHTML += `<tr><td>${ex.id}</td><td>${ex.nombre}</td></tr>`;
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

function buscarExamen(){
  input= document.getElementById('inputMenuExamen')
  filtro= examenes.filter(ex=> ex.nombre.toLowerCase().includes(input.value.toLowerCase()))
  const examBody = document.getElementById("tBodyMenuExamen");
  examBody.innerHTML='';
    filtro.map((ex) => {
      examBody.innerHTML += `<tr class=" text-break"><td>${ex.id}</td><td>${ex.nombre}</td></tr>`;
    });
}
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
        if (clave == "fecha_nacimiento") {
          document.getElementsByName(clave)[0]
            ? (document.getElementsByName(clave)[0].value =
                moment(paciente[clave]).format("DD/MM/YYYY") ?? "")
            : "";
        } else {
          document.getElementsByName(clave)[0]
            ? (document.getElementsByName(clave)[0].value =
                paciente[clave] ?? "")
            : "";
        }
      }
    }
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      const res = await alerta.alert(
        "Paciente:",
        "No se ha encontrado paciente ¿Desea crear uno nuevo?"
      );
      console.log("🚀 ~ cedulaPaciente ~ res:", res);
      if (res.response == 1) return;
      else abrirCreacionPaciWindow();
    } else {
      return await alerta.error();
    }
  }
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
