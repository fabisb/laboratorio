const render = async () => {
  try {
    const { token } = await login.getToken();

    const { data: examenes } = await axios.get(
      urlsv + "/api/examenes/get-examenes",
      { headers: { token } }
    );
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
};
