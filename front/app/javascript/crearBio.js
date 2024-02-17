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
  console.log("🚀 ~ agregarBioanalista ~ firma:", firma);
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
  console.log("🚀 ~ agregarPaciente ~ paciente:", paciente);
  console.log(firma);
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

        if (el.name != 'password') {
          
          const elemento = { value: el.value, name: el.name };
          usuario.push(elemento);
        }
      
    }
  });
  if (validacion) {
    console.log("SE HA ENCONTRADO ALGUN ERROR");
    return await alerta.alert("Error:", 'Se ha encontrado algun error al ingresar alguno de los datos');

  }
  console.log("🚀 ~ agregarPaciente ~ usuario:", usuario);
  const clave = document.getElementsByName('password')[0].value;
  const nivel = document.getElementsByName('nivel')[0].value;
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
  document
    .getElementsByName("ingreso")[0]
    .setAttribute("max", fechaActual);
};

const cambiarCrearBio = ()=>{
  const form = document.getElementById("formBody");
form.innerHTML =
`
<div class="row">
        <div class="form-holder">
          <div class="form-content">
            <div class="form-items">
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
                      class="form-control rounded-start-0"
                      type="number"
                      min="0"
                      name="cedula"
                      placeholder="Cedula"
                      required
                    />
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

                <div class="form-button mt-3 row">
                  
                <button id="submit" type="submit" class="col btn btn-primary">
                Registrar
              </button>
              <nav class="col">
              <ul class="pagination pagination-lg">
                <li class="page-item active" aria-current="page">
                  <span class="page-link">Bioanalista</span>
                </li>
                <li class="page-item"><a class="page-link" onclick="cambiarCrearUsuario()" style="cursor: pointer;">Usuario</a></li>
              </ul>
            </nav>
                </div>
              </form>
            </div>
          </div>
        </div>
        
      </div>
`;
}
const cambiarCrearUsuario = () => {
  const form = document.getElementById("formBody");
      form.innerHTML = `
    <div class="row">
    <div class="form-holder">
      <div class="form-content">
        <div class="form-items">
          <h3>Registro de Usuario</h3>
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
                  class="form-control rounded-start-0"
                  type="number"
                  min="0"
                  name="cedula"
                  placeholder="Cedula"
                  required
                />
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
            class="form-select mt-3 rounded-end-0"
            name="nivel"
            required
          >
            <option selected value="3">Administrador</option>
            <option value="2">Coordinador</option>
            <option value="1">Usuario</option>
          </select>
            </div>
            
            <div class="form-button mt-3 row">
            <button id="submit" type="submit" class="col btn btn-primary">
            Registrar
          </button>
          <nav class="col">
          <ul class="pagination pagination-lg">
            <li class="page-item" aria-current="page">
              
              <a class="page-link" onclick="cambiarCrearBio()" style="cursor: pointer;">Bioanalista</a>
            </li>
            <li class="page-item active"><span class="page-link">Usuario</span></li>
          </ul>
        </nav>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
    `;

  }

