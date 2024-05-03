const subirImagen = async () => {
  try {
    const imagen = document.getElementById("file");

    if (imagen.value !== "") {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imagen.files[0]);

        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          resolve("");
        };
      });
    } else {
      return "";
    }
  } catch (error) {
    console.log(error);
  }
};

const agregarBioanalista = async (event) => {
  const { token } = await login.getToken();

  const paciente = [];
  const firma = await subirImagen();
  /*   let firmaBi;
  new Promise(()=>{

    if (firma.value !== "") {
      const reader = new FileReader();
      reader.readAsDataURL(firma.files[0]);
      reader.onload = async () => {
         firmaBi = await reader.result;
         console.log("🚀 ~ reader.onload= ~ firmaBi:", firmaBi)
      };
    }
  }) */
  const validacion = [...event.target].some((el) => {
    if (el.tagName == "SELECT" || el.tagName == "INPUT") {
      if (el.name == "firma") {
      } else {
        if (el.value == "") {
          if (el.name == "firma") {
            console.log(`Campo ${el.name} vacio`);
          } else {
            console.log(`Campo ${el.name} vacio`);
            return true;
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

        if (el.name == "ingreso") {
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

  try {
    await axios.post(
      urlsv + "/api/creacion/agregar-bioanalista",
      { paciente, firma },
      { headers: { token } }
    );
    const modal = new bootstrap.Modal("#confirmacion-modalBio");
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

const agregarUsuario = async (event) => {
  const { token } = await login.getToken();

  const usuario = [];
  const validacion = [...event.target].some((el) => {
    if (el.tagName == "SELECT" || el.tagName == "INPUT") {
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

      if (el.name != "password") {
        const elemento = { value: el.value, name: el.name };
        usuario.push(elemento);
      }
    }
  });
  if (validacion) {
    console.log("SE HA ENCONTRADO ALGUN ERROR");
    return await alerta.alert(
      "Error:",
      "Se ha encontrado algun error al ingresar alguno de los datos"
    );
  }
  console.log("🚀 ~ agregarPaciente ~ usuario:", usuario);
  const clave = document.getElementsByName("password")[0].value;
  const nivel = document.getElementsByName("nivel")[0].value;
  try {
    await axios.post(
      urlsv + "/api/creacion/agregar-usuario",
      { usuario, clave, nivel },
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
  console.log(fechaActual);
  document.getElementsByName("ingreso")[0].setAttribute("max", fechaActual);
};

const cambiarCrearBio = () => {
  const form = document.getElementById("formBody");
  form.innerHTML = `
          <div class="form-content">
            <div class="form-items">
              <div class="d-flex justify-content-center">
                <img src="../imgs/la-milagrosa-logo.png" width="120" alt="" />
              </div>
              <hr>
              <h3>Registro de Bioanalista</h3>
              <p>Ingrese los siguientes datos.</p>
              <form onsubmit="agregarBioanalista(event), event.preventDefault()" class="requires-validation" novalidate>
                <div class="col-md-12">
                  <div class="d-flex">
                  <select
                  class="w-25 form-select mt-3 rounded-end-0"
                  name="pre_cedula"
                  required
                >
                  <option selected value="V">V</option>
                  <option value="E">E</option>
                </select>
                <input
                  class="form-control rounded-0"
                  type="number"
                  min="0"
                  name="cedula"
                  placeholder="Cedula"
                  required
                />
                <button
                  type="button"
                  class="btn btn-warning rounded-start-0 mt-3"
                  onclick="buscarBio()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                    />
                  </svg>
                </button>
                  </div>
                </div>
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="nombre"
                    placeholder="Nombre Completo"
                    required
                  />
                  <div class="valid-feedback">Nombre valido</div>
                  <div class="invalid-feedback">
                    El nombre no puede ser vacio!
                  </div>
                </div>

                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="colegio"
                    placeholder="Colegio"
                    required
                  />
                  <div class="valid-feedback">Colegio valido</div>
                  <div class="invalid-feedback">
                    El Colegio no puede estar vacio!
                  </div>
                </div>
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="ministerio"
                    placeholder="Ministerio"
                    required
                  />
                  <div class="valid-feedback">Ministerio valido</div>
                  <div class="invalid-feedback">
                    El Ministerio no puede estar vacio!
                  </div>
                </div>

                <div class="col-md-12">
                  <input
                    class="form-control mt-3"
                    type="text"
                    name="telefono"
                    placeholder="Numero de Telefono"
                    required
                  />
                  <div class="valid-feedback">Numero de telefono valido</div>
                  <div class="invalid-feedback">
                    El numero de telefono no puede estar vacio!
                  </div>
                </div>

                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    name="direccion"
                    placeholder="Direccion"
                    required
                  />
                  <div class="valid-feedback">Direccion Valida</div>
                  <div class="invalid-feedback">
                    La direccion no puede estar vacio!
                  </div>
                </div>
                <div class="col-md-12">
                  <input
                    class="form-control mt-3"
                    type="date"
                    name="ingreso"
                    placeholder="Fecha de Ingreso"
                    required
                    min="1920-01-01"
                  />
                  <div class="valid-feedback">Fecha de Ingreso Valida</div>
                  <div class="invalid-feedback">
                    La fecha de Ingreso no puede estar vacia!
                  </div>
                </div>

                <div class="col-md-12 mt-3">
                
                    <div>

                      <input  type="file" name="firma" class="form-control" id="file">
                    </div>
                </div>

                <div class="form-button mt-3 row ">
                  <div  id="btnHolder" class="col d-flex justify-content-center">
                    <button id="submit" type="submit" class="btn-lg btn btn-success">
                      Registrar
                    </button>
                  </div>                          
                </div>
              </form>
            </div>
          </div>
`;
};
const cambiarCrearUsuario = (nivel) => {
  const form = document.getElementById("formBody");
  form.innerHTML = `
      <div class="form-content">
        <div class="form-items">
        <div class="d-flex justify-content-center">
                <img src="../imgs/la-milagrosa-logo.png" width="120" alt="" />
              </div>
              <hr>
          <h3 id='h3Registro'>Registro de ${
            nivel == 3
              ? "Administrador"
              : nivel == 1
              ? "Usuario Bioanalista"
              : "Auxiliar"
          }</h3>
          <p>Ingrese los siguientes datos.</p>
          <form onsubmit="agregarUsuario(event), event.preventDefault()" class="requires-validation" novalidate>
            <div class="col-md-12">
              <div class="d-flex">
              <select
              class="w-25 form-select mt-3 rounded-end-0"
              name="pre_cedula"
              required
            >
              <option selected value="V">V</option>
              <option value="E">E</option>
            </select>
            <input
              class="form-control rounded-0"
              type="number"
              min="0"
              name="cedula"
              placeholder="Cedula"
              required
            />
            <button
              type="button"
              class="btn btn-warning rounded-start-0 mt-3"
              onclick="buscarUsuario()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                />
              </svg>
            </button>
              </div>
            </div>
            <div class="col-md-12">
              <input
                class="form-control"
                type="text"
                name="nombre"
                placeholder="Nombre Completo"
                required
              />
              <div class="valid-feedback">Nombre valido</div>
              <div class="invalid-feedback">
                El nombre no puede ser vacio!
              </div>
            </div>
            <div class="col-md-12">
              <input
                class="form-control"
                type="password"
                name="password"
                placeholder="Contraseña"
                required
              />
              <div class="valid-feedback">Clave valida</div>
              <div class="invalid-feedback">
                La clave no puede estar vacia!
              </div>
            </div>

            <div class="col-md-12">
              <input
                class="form-control"
                type="email"
                name="correo"
                placeholder="Correo Electronico"
                required
              />
              <div class="valid-feedback">Correo electronico valido</div>
              <div class="invalid-feedback">
                El correo electronico no puede estar vacio!
              </div>
            </div>

            <div class="col-md-12">
              <input
                class="form-control mt-3"
                type="text"
                name="telefono"
                placeholder="Numero de Telefono"
                required
              />
              <div class="valid-feedback">Numero de telefono valido</div>
              <div class="invalid-feedback">
                El numero de telefono no puede estar vacio!
              </div>
            </div>

            <div class="col-md-12">
              <input
                class="form-control"
                type="text"
                name="direccion"
                placeholder="Direccion"
                required
              />
              <div class="valid-feedback">Direccion Valida</div>
              <div class="invalid-feedback">
                La direccion no puede estar vacio!
              </div>
            </div>
            <div class="col-md-12">
            <select
            class="form-select selectNivelUsuario mt-3 rounded-end-0"
            name="nivel"
            disabled
            hidden
          >
            <option selected value="${nivel}">Nivel</option>
          </select>
            </div>
            <div class="form-button mt-3 row ">
                  <div  id="btnHolder" class="col d-flex justify-content-center">
                    <button id="submit" type="submit" class="btn-lg btn btn-success">
                      Registrar
                    </button>
                  </div>                          
          </form>
        </div>
      </div>
    `;
};

const buscarBio = async () => {
  const pre_cedula = document.getElementsByName("pre_cedula")[0].value;
  const cedula = document.getElementsByName("cedula")[0].value;
  if (pre_cedula == "" || cedula == "") {
    //CREAR ALERTA PARA VALIDACION
    return;
  }
  try {
    const { token } = await login.getToken();

    const { data: bio } = await axios.get(
      urlsv + "/api/creacion/buscar-bioanalista",
      {
        params: {
          cedula,
          pre_cedula,
        },
        headers: { token },
      }
    );
    document
      .getElementsByName("pre_cedula")[0]
      .setAttribute("disabled", "true");
    document.getElementsByName("cedula")[0].setAttribute("disabled", "true");

    document.getElementsByName("nombre")[0].value = bio.nombre;
    document.getElementsByName("telefono")[0].value = bio.telefono;
    document.getElementsByName("colegio")[0].value = bio.colegio;
    document.getElementsByName("ministerio")[0].value = bio.ministerio;
    document.getElementsByName("direccion")[0].value = bio.direccion;
    document.getElementsByName("ingreso")[0].value = moment(bio.ingreso).format(
      "YYYY-MM-DD"
    );
    document.getElementById("btnHolder").innerHTML = `
  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
  <button type="button" onclick="cambiarStatus('activo','bioanalista','${bio.id}')" class="btn btn-success">Activar</button>
  <button
      type="button"
      class="btn-lg btn btn-warning"
      onclick="modificarBio('${bio.id}')"
    >
      Modificar
    </button>
  <button type="button" onclick="cambiarStatus('inactivo','bioanalista','${bio.id}')" class="btn btn-danger">Desactivar</button>
</div>  
    `;
  } catch (error) {
    console.log("🚀 ~ buscarBio ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
    //CREAR ALERTA EN CASO DE ERROR
  }
};
const modificarBio = async (id) => {
  if (id < 0 || id == "" || !id) {
    //ALERTAS PARA VALIDACION
    console.log("ERROR EN ID");
    return;
  }

  const nombre = document.getElementsByName("nombre")[0].value;
  const telefono = document.getElementsByName("telefono")[0].value;
  const colegio = document.getElementsByName("colegio")[0].value;
  const ministerio = document.getElementsByName("ministerio")[0].value;
  const direccion = document.getElementsByName("direccion")[0].value;
  const ingreso = document.getElementsByName("ingreso")[0].value;
  if (
    nombre == "" ||
    telefono == "" ||
    colegio == "" ||
    ministerio == "" ||
    direccion == "" ||
    ingreso == ""
  ) {
    //ALERTAS PARA VALIDACION
    console.log("ERROR EN DATO");
    return;
  }

  try {
    const firma = await subirImagen();
    const { token } = await login.getToken();
    await axios.put(
      urlsv + "/api/creacion/editar-bioanalista",
      { id, nombre, telefono, colegio, ministerio, direccion, ingreso, firma },
      { headers: { token } }
    );
    const modal = new bootstrap.Modal("#confirmacion-modificar-modalBio");
    modal.show();
    cambiarCrearBio();
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
};
const buscarUsuario = async () => {
  const pre_cedula = document.getElementsByName("pre_cedula")[0].value;
  console.log("🚀 ~ buscarUsuario ~ pre_cedula:", pre_cedula);
  const cedula = document.getElementsByName("cedula")[0].value;
  console.log("🚀 ~ buscarUsuario ~ cedula:", cedula);
  if (pre_cedula == "" || cedula == "") {
    //CREAR ALERTA PARA VALIDACION
    return;
  }
  try {
    const { token } = await login.getToken();

    const { data: user } = await axios.get(
      urlsv + "/api/creacion/buscar-usuario",
      {
        params: {
          cedula,
          pre_cedula,
        },
        headers: { token },
      }
    );
    console.log("🚀 ~ buscarUsuario ~ user:", user);
    document
      .getElementsByName("pre_cedula")[0]
      .setAttribute("disabled", "true");
    document.getElementsByName("cedula")[0].setAttribute("disabled", "true");

    document.getElementsByName("nombre")[0].value = user.nombre;
    document.getElementsByName("telefono")[0].value = user.telefono;
    document.getElementsByName("correo")[0].value = user.correo;
    document.getElementsByName("direccion")[0].value = user.direccion;
    document.getElementById("btnHolder").innerHTML = `
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
  <button type="button" onclick="cambiarStatus('activo','usuario','${user.id}')" class="btn btn-success">Activar</button>
  <button
      type="button"
      class="btn-lg btn btn-warning"
      onclick="modificarUsuario('${user.id}')"
    >
      Modificar
    </button>
  <button type="button" onclick="cambiarStatus('inactivo','usuario','${user.id}')" class="btn btn-danger">Desactivar</button>
</div>   
      `;
  } catch (error) {
    console.log("🚀 ~ buscarUsuario ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
};

const cambiarStatus = async (status, tipo, id) => {
  if (id < 0 || id == "" || !id) return; //ALERTA PARA VALIDACION

  if (status != "activo" && status != "inactivo") return; //ALERTA PARA VALIDACION

  if (tipo != "usuario" && tipo != "bioanalista") return; //ALERTA PARA VALIDACION
  try {
    const { token } = await login.getToken();

    const { data } = await axios.put(
      urlsv + "/api/creacion/editar-status",
      { id, status, tipo },
      { headers: { token } }
    );
    if (tipo == "usuario") {
      const modal = new bootstrap.Modal("#confirmacion-modificar-modalPaci");
      modal.show();
      cambiarCrearUsuario();
    } else {
      const modal = new bootstrap.Modal("#confirmacion-modificar-modalBio");
      modal.show();
      cambiarCrearBio();
    }
  } catch (error) {
    console.log("🚀 ~ cambiarStatus ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
};

const modificarUsuario = async (id) => {
  const direccion = document.getElementsByName("direccion")[0].value;
  const nombre = document.getElementsByName("nombre")[0].value;
  const telefono = document.getElementsByName("telefono")[0].value;
  const correo = document.getElementsByName("correo")[0].value;
  const password = document.getElementsByName("password")[0].value;
  const nivel = document.getElementsByName("nivel")[0].value;

  if (id < 0 || id == "" || !id) {
    //ALERTAS PARA VALIDACION
    console.log("ERROR EN ID");
    return;
  }
  if (
    nombre == "" ||
    correo == "" ||
    telefono == "" ||
    direccion == "" ||
    nivel == "" ||
    password == ""
  ) {
    //ALERTAS PARA VALIDACION
    console.log("ERROR EN DATO");
    return;
  }
  try {
    const { token } = await login.getToken();
    await axios.put(
      urlsv + "/api/creacion/editar-usuario",
      { id, direccion, nombre, telefono, correo, password, nivel },
      { headers: { token } }
    );
    const modal = new bootstrap.Modal("#confirmacion-modificar-modalPaci");
    modal.show();
    cambiarCrearUsuario();
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
};
