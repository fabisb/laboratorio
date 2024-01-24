const agregarPaciente = async (event) => {
  const { token } = await login.getToken();
  /*  headers: { token: token.token }, */

  const paciente = [];
  [...event.target].forEach((el) => {
    if (el.tagName == "SELECT" || el.tagName == "INPUT") {
      if (el.name == "genero") {
        if (el.checked == true) {
          const elemento = { valor: el.value, nombre: el.name };
          paciente.push(elemento);
        }
      } else {
        const elemento = { valor: el.value, nombre: el.name };
        paciente.push(elemento);
      }
    }
  });
  console.log("🚀 ~ agregarPaciente ~ paciente:", paciente);
  await axios.post(
    urlsv + "/api/creacion/agregar-paciente",
    { paciente },
    { headers: { token } }
  );
};
