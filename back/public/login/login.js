const loguear = async () => {
  event.preventDefault();
  const cedula = document.getElementById("userLog").value;
  const password = document.getElementById("passwordLog").value;

  if (cedula == "" || !cedula || cedula < 0 || password == "" || !password) {
    //CREAR MEJORES ALERTAS
    return alert("Error en dato de formulario");
  }

  try {
    const { data } = await axios.post("/api/users/espejo-login", {
      user: cedula,
      pass: password,
    });
    if (data.token) {
      location.href = "/inicio";
    }
  } catch (error) {
    console.log("🚀 ~ loguear ~ error:", error);
    if (error.response.data.mensaje) {
      return alert(`Error: ${error.response.data.mensaje}`);
    } else {
      return alert("ERROR DE SERVIDOR");
    }
  }
};
