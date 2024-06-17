/* 
const { token } = await login.getToken();
const {data: examenes} = await axios.get(
  urlsv + "/api/modulo-examenes/examenes",
  { headers: { token } }
); 
const {data: examenes} = await axios.get(
  urlsv + "/api/modulo-examenes/examenes",
  { headers: { token } }
); 
const {data: examen} = await axios.get(
  urlsv + "/api/modulo-examenes/examen-id",
  { headers: { token }, params: { idExamen } }
); 
const {data: examen} = await axios.get(
  urlsv + "/api/modulo-examenes/examen-nombre",
  { headers: { token }, params: { nombre } }
); 
const {data: examen} = await axios.get(
  urlsv + "/api/modulo-examenes/examen-seccion",
  { headers: { token }, params: { idSeccion } }
); 
*/
let contador=0
var examenesArray = [];
var titulosArray =[];
function formularioSeccion() {
  const labDiv = document.getElementById(`formLaboratorio`);
  const sedeDiv = document.getElementById(`formSede`);
  const input = document.getElementById("inputSeccion");
  document.getElementById(
    "añadirSeccionModalLabel"
  ).innerText = `Seccion/Categoria`;
  input.removeAttribute("hidden");
  labDiv.setAttribute("hidden", "true");
  sedeDiv.setAttribute("hidden", "true");
  document
    .getElementById("botonGuardarSeccion")
    .setAttribute("onclick", "crearSeccion()");
}

function formularioSede() {
  const labDiv = document.getElementById(`formLaboratorio`);
  const sedeDiv = document.getElementById(`formSede`);
  const input = document.getElementById("inputSeccion");
  document.getElementById("añadirSeccionModalLabel").innerText = `Sede`;
  input.setAttribute("hidden", "true");
  sedeDiv.removeAttribute("hidden");
  labDiv.setAttribute("hidden", "true");
  document
    .getElementById("botonGuardarSeccion")
    .setAttribute("onclick", "crearSede()");
}

function formularioLaboratorio() {
  const labDiv = document.getElementById(`formLaboratorio`);
  const sedeDiv = document.getElementById(`formSede`);
  const input = document.getElementById("inputSeccion");
  document.getElementById(
    "añadirSeccionModalLabel"
  ).innerText = `Laboratorio Externo`;
  labDiv.removeAttribute("hidden");
  input.setAttribute("hidden", "true");
  sedeDiv.setAttribute("hidden", "true");
  document
    .getElementById("botonGuardarSeccion")
    .setAttribute("onclick", "crearLaboratorio()");
}

async function crearLaboratorio() {
  const rif = document.getElementById("rifLab");
  const razon = document.getElementById("razonLab");
  const telefono = document.getElementById("telefonoLab");
  const direccion = document.getElementById("direccionLab");
  console.log(rif.value, razon.value, telefono.value, direccion.value);
  if (rif.value == "" || rif.value < 0) {
    return alerta.alert("Error:", "Rif Invalido");
  }
  if (razon.value == "") {
    return alerta.alert("Error:", "Razon social Invalida");
  }
  try {
    const { token } = await login.getToken();

    const res = await axios.post(
      urlsv + "/api/modulo-examenes/crear-laboratorio",
      {
        rif: rif.value,
        razon: razon.value,
        telefono: telefono.value,
        direccion: direccion.value,
      },
      { headers: { token } }
    );
    console.log(res);
    rif.value=''
    razon.value=''
    direccion.value=''
    telefono.value=''
    render();
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

var examenes = [];
var seccionesData = [];
var sedesData = [];
var empresasData=[];
var laboratoriosData = [];

function validarSelectSeccionMenu(value) {
  if (value == "todos") {
    examenes = examenesArray;
  } else {
    examenes = examenesArray.filter((ex) => {
      return ex.id_seccion == value;
    });
    console.log(examenes);
  }
  buscarExamen();
}
const render = async () => {
  const { token } = await login.getToken();
  try {
    const empresas = await axios.get(
      urlsv + "/api/modulo-examenes/empresas",
      { headers: { token } }
    );
    empresasData=empresas.data
  } catch (error) {
    console.log(error)
  }

  try {
    const secciones = await axios.get(
      urlsv + "/api/modulo-examenes/secciones",
      { headers: { token } }
    );
    const selectSeccion = document.getElementById("seccionExamenSelect");
    const selectSeccionMenu = document.getElementById(
      "seccionExamenSelectMenu"
    );

    selectSeccion.innerHTML = `
    <option value="">Seccion</option>
    
    `;
    selectSeccionMenu.innerHTML = `
    <option value="todos">Filtrar por Seccion</option>
    
    `;
    seccionesData = secciones.data;

    secciones.data.forEach((seccion) => {
      const option = document.createElement("option");
      option.value = seccion.id;
      option.innerText = seccion.nombre;
      const option2 = document.createElement("option");
      option2.value = seccion.id;
      option2.innerText = seccion.nombre;
      selectSeccion.appendChild(option);
      selectSeccionMenu.appendChild(option2);
    });
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }

  try {
    const categorias = await axios.get(
      urlsv + "/api/modulo-examenes/categorias",
      { headers: { token } }
    );
    categoriasData = categorias.data;

    const selectCategoria = document.getElementById("categoriaExamenSelect");
    selectCategoria.innerHTML = `
    <option value="">Categoria</option>
    
    `;
    categorias.data.forEach((seccion) => {
      const option = document.createElement("option");
      option.value = seccion.id;
      option.innerText = seccion.nombre;
      selectCategoria.appendChild(option);
    });
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
  try {
    const sedes = await axios.get(urlsv + "/api/modulo-examenes/sedes", {
      headers: { token },
    });
    sedesData = sedes.data;
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
  try {
    const laboratorios = await axios.get(
      urlsv + "/api/modulo-examenes/laboratorios",
      { headers: { token } }
    );
    laboratoriosData = laboratorios.data;
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }

  try {
    const { data: examenesGet } = await axios.get(
      urlsv + "/api/examenes/get-examenes",
      { headers: { token } }
    );
    examenesArray = examenesGet;
    examenes = examenesGet;

    const menuCreacionUl = document.getElementById("menuCreacionUl");
    examenesGet.forEach((ex) => {
      menuCreacionUl.innerHTML += `
      <li  class="list-group-item list-group-item-light list-group-item-action">
              <div class="row">
                <div class="col-10">
                  <span class="">${ex.nombre}</span>
  
                </div>
                <div class="col-2 d-flex justify-content-end align-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" aria-expanded="false" aria-controls="collapseMenu${ex.id}" data-bs-toggle="collapse" data-bs-target="#collapseMenu${ex.id}" onclick="detalleExamen(${ex.id})" width="24" height="24" fill="green" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
                  <svg
                xmlns="http://www.w3.org/2000/svg"
                style="cursor: pointer"
                width="30"
                height="30"
                fill="#FACD0B"
                class="bi bi-pencil-square mx-3"
                viewBox="0 0 20 20"
                id="botonModificar"
                onclick="modificarExamen('${ex.id}')" 
              >
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                /></svg>
                </svg>

              
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" style='cursor:pointer' data-bs-dismiss="modal" onclick="borrarExamenBdd('${ex.id}')" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
                </div>
  
              </div>
            </li> 
            <div class="collapse" id="collapseMenu${ex.id}">
            <div class="card card-body">
            </div>
            </div> 
  
  
      `;
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
function añadirAcordionItemEx(nombre1, idEx) {
  if (nombre1 == "") {
    nombre1=`${contador}-EMPTY0023`
    contador+=1
  }
  nombre1 = nombre1.trim();
  
  const nombre = nombre1
    .replaceAll(" ", "-")
    .replaceAll("(", "-")
    .replaceAll(")", "-")
    .replaceAll(".", "-")
    .replaceAll("+", "-")
    .replaceAll("/", "-");

  const accordionCaracteristicas = document.getElementById(
    "accordionCaracteristicas"
  );
  if (caracteristicasCreadas.has(nombre)) {
    return alerta.alert("Error", "Ya existe una caracteristica con ese nombre");
  } else {
    caracteristicasCreadas.add(nombre);
  }

  disabledButton("buttonCaracteristica");

  const divItem = document.createElement("div");
  divItem.className = `accordion-item acordionItemCaracteristica`;
  divItem.id = `accordionItemCaracteristica${nombre}`;

  divItem.innerHTML = `
  
  
  <h2 class="accordion-header headerCaracteristica"  >
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCaracteristica${nombre}" aria-expanded="false" aria-controls="collapseCaracteristica${nombre}">
     ${nombre1}
    </button>
    
  </h2>
  <div id="collapseCaracteristica${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionItemCaracteristica">
    <div class="accordion-body m-0 p-0 text-center" id="accordionBodyCaracteristica${nombre}">
      <div class="row">
        <div class="col-9 m-0 p-0"> 
          <div class="accordion mx-4" id="accordionDetalleCaracteristicas${nombre}">
        
            <div class="accordion-item acordionSubItemCaracteristica" id="itemSubCaracteristica${nombre}">
              <h2 class="accordion-header headerSubCaracteristica">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSubCaracteristica${nombre}" aria-expanded="false" aria-controls="collapseSubCaracteristica${nombre}">
                  Subcaracteristicas
                </button>
              </h2>
              <div id="collapseSubCaracteristica${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionDetalleCaracteristicas${nombre}">
                <div class="accordion-body" id="accordionBodySubCaracteristicas${nombre}">
                  <table class="table" style="font-size: small;">
                    <thead>
                      <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Valor</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody style="font-size: small;" id="tBodySubCaracteristica${nombre}">
                      
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="4">

                        </td>
                        <td>
                          <button type="button" class="btn btn-outline-success button${nombre}" onclick="añadirSubCaracteristica('${nombre}')" id=''>

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                            </svg>
                          </button>
                        </td>
                        
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion-item acordionSubItemCaracteristica" id="itemRangos${nombre}">
              <h2 class="accordion-header headerSubCaracteristica">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRangos${nombre}" aria-expanded="false" aria-controls="collapseRangos${nombre}">
                  Rangos
                </button>
              </h2>
              <div id="collapseRangos${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionDetalleCaracteristicas${nombre}">
                <div class="accordion-body" id="accordionBodyRangos${nombre}">
                  <table class="table" style="font-size: small;">
                    <thead>
                      <tr>
                        <th scope="col">Inferior</th>
                        <th scope="col">Superior</th>
                        <th scope="col" colspan="2">Rango de edad</th>
                        <th scope="col">Genero</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody style="font-size: small;" id="tBodyRangos${nombre}">
                      
                      
                      

                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="6">

                        </td>
                        <td>
                          <button type="button" class="btn btn-outline-success button${nombre}" onclick="añadirRango('${nombre}')">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                            </svg>
                          </button>
                        </td>
                        
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion-item acordionSubItemCaracteristica" id="itemResultados${nombre}">
              <h2 class="accordion-header headerSubCaracteristica">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseResultados${nombre}" aria-expanded="false" aria-controls="collapseResultados${nombre}">
                  Resultados
                </button>
              </h2>
              <div id="collapseResultados${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionDetalleCaracteristicas${nombre}">
                <div class="accordion-body" id="accordionBodyResultados${nombre}">
                  <table class="table" style="font-size: small;">
                    <thead>
                      <tr><th colspan="3">Resultados</th></tr>
                    </thead>
                    <tbody id="tBodyResultados${nombre}">
                     
                      
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2">

                        </td>
                        <td>
                          <button type="button" class="btn btn-outline-success button${nombre}" onclick="añadirResultado('${nombre}')">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                            </svg>
                          </button>
                        </td>
                        
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
        <div class="col-3"> 
          <div>
            <table class="table table-success">
            
              <tbody style="font-size: medium;">
                <tr>
                  <th scope="row">Nombre</th>
                  <td colspan='2'><div class="mb-3">
                  <input type="text" readonly class="form-control input${nombre} formCaracteristica${nombre}" name="nombre" value='${nombre1}' placeholder="Nombre">
                </div></td>
                  
                </tr>
                <tr>
                  <th scope="row">Unidad</th>
                  <td colspan='2'><input type="text" class="form-control input${nombre} formCaracteristica${nombre}" name="unidad" placeholder='Unidad'></td>
                  
                </tr>
                <tr>
                  <th scope="row">Posicion</th>
                  <td colspan='2'><input type="number" min='0' class="form-control input${nombre} formCaracteristica${nombre}" name="posicion" placeholder='Orden'></td>
                  
                </tr>
                <tr>
                  <th scope="row">Imprimir</th>
                  <td colspan='2'><input type="checkbox" class="form-check-input select${nombre} formCaracteristica${nombre}" checked name="imp" ></td>

                  
                </tr>
                <tr>
                  <th scope="row">
                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      style="cursor: pointer"
                                      width="25"
                                      height="25"
                                      fill="#FACD0B"
                                      class="bi bi-pencil-square botonModificar${nombre}"
                                      viewBox="0 0 20 20"
                                      id="botonModificarCaracteristica${nombre}"
                                      hidden
                                      onclick="modificarCrtCreacionFront('${nombre}')"
                                    >
                                      <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                      />
                                    </svg>
                  </th>
                  <td >
                    
                    <button class='button${nombre} btnIcon' onclick='borrarCaracteristica(event,"${nombre}")'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </button>
                  </td>
                  <td style="cursor:pointer">
                  <button class='button${nombre} btnIcon' onclick="crearCaracteristicaBdd('${nombre}',${idEx})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
                      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
                    </svg>
                  </button>
                  </td>
                  
                </tr>
                
              </tbody>
            </table>
          </div>
          
        </div>

        </div>
      </div>

  </div>


  `;
  accordionCaracteristicas.appendChild(divItem);
}

async function crearCaracteristicaBdd(nombre, idEx) {
  const formCaracteristicas = document.getElementsByClassName(
    "formCaracteristica" + nombre
  );

  const caracteristica = [...formCaracteristicas].map((c) => {
    if (c.name == "imp") {
      return {
        nombre: "impsiempre",
        valor: c.checked ? 1 : 0,
      };
    } else {
      return {
        nombre: c.name,
        valor: c.value,
      };
    }
  });

  const subCaracteristica = document.querySelectorAll(
    `.trSubCaracteristica${nombre}`
  );

  let subCaracteristicas = [...subCaracteristica].map((s, i) => {
    let validarNombre = true;
    for (let k = i + 1; k < subCaracteristica.length; k++) {
      if (
        s.childNodes[2].childNodes[1].childNodes[1].value ==
        subCaracteristica[k].childNodes[2].childNodes[1].childNodes[1].value
      ) {
        validarNombre = false;
      }
    }
    if (!validarNombre) {
      alerta.alert(
        "error",
        "hay mas de una subCaracteristica con el mismo nombre"
      );
      return undefined;
    }
    let variables = [];
    if (
      (s.childNodes[0].childNodes[1].value != "texto" &&
        s.childNodes[0].childNodes[1].value != "numero" &&
        s.childNodes[0].childNodes[1].value != "formula") ||
      s.childNodes[2].childNodes[1].childNodes[1].value == ""
    ) {
      return undefined;
    }
    if (s.childNodes[0].childNodes[1].value == "formula") {
      if (s.childNodes[4].childNodes[1].childNodes[1].value == "") {
        return undefined;
      }
      let error = false;
      let value = s.childNodes[4].childNodes[1].childNodes[1].value;
      for (let i = 0; i < value.length; i++) {
        if (value[i] == "{") {
          let validarCierre = false;
          let variable = "";
          for (let j = i + 1; j < value.length; j++) {
            if (value[j] == "{") {
              break;
            }
            if (value[j] == "}") {
              variable = value.slice(i + 1, j);
              validarCierre = true;
              break;
            }
          }

          if (!validarCierre || variable == "") {
            error = true;
            break;
          } else {
            variables.push(variable);
          }
        }
        if (
          value[i] == "+" ||
          value[i] == "-" ||
          value[i] == "*" ||
          value[i] == "/"
        ) {
          if (
            (value[i - 1] == "}" || value[i - 1] == ")") &&
            (value[i + 1] == "{" || value[i + 1] == "(")
          ) {
            continue;
          } else {
            error = true;
            break;
          }
        }
        if (value[i] == "(") {
          let validarCierre = false;

          for (let j = i + 1; j < value.length; j++) {
            if (value[j] == "(") {
              break;
            }
            if (value[j] == ")") {
              variable = value.slice(i + 1, j);
              validarCierre = true;
              break;
            }
          }

          if (!validarCierre || variable == "") {
            error = true;
            break;
          }
        }
      }
      variables.forEach((v) => {
        let validar = false;
        for (let il = 0; il < subCaracteristica.length; il++) {
          if (
            subCaracteristica[il].childNodes[0].childNodes[1].value !=
              "texto" &&
            s.childNodes[2].childNodes[1].childNodes[1].value != v &&
            v == subCaracteristica[il].children[1].children[0].children[0].value
          ) {
            validar = true;
            break;
          }
        }
        if (!validar) {
          error = true;
        }
      });

      if (error) {
        return undefined;
      }
    }

    return {
      tipo: s.childNodes[0].childNodes[1].value,
      nombre: s.childNodes[2].childNodes[1].childNodes[1].value,
      valor: s.childNodes[4].childNodes[1].childNodes[1].value,
    };
  });

  subCaracteristicas = subCaracteristicas.filter((s) => s != undefined);

  const rango = document.querySelectorAll(`.trRango${nombre}`);

  let rangos = [...rango].map((r) => {
    if (r.childNodes[5].childNodes[1].childNodes[1].value == "") {
      if (r.childNodes[7].childNodes[1].childNodes[1].value != "") {
        return undefined;
      }
    }
    if (
      r.childNodes[1].childNodes[1].childNodes[1].value == "" ||
      r.childNodes[3].childNodes[1].childNodes[1].value == ""
    ) {
      return undefined;
    }

    if (
      r.childNodes[1].childNodes[1].childNodes[1].value >
        r.childNodes[3].childNodes[1].childNodes[1].value ||
      r.childNodes[5].childNodes[1].childNodes[1].value >
        r.childNodes[7].childNodes[1].childNodes[1].value
    ) {
      return undefined;
    }

    return {
      inferior: r.childNodes[1].childNodes[1].childNodes[1].value,
      superior: r.childNodes[3].childNodes[1].childNodes[1].value,
      desde: r.childNodes[5].childNodes[1].childNodes[1].value,
      hasta: r.childNodes[7].childNodes[1].childNodes[1].value,
      genero: r.children[4].children[0].value,
    };
  });

  rangos = rangos.filter((r) => r != undefined);
  const resultado = document.querySelectorAll(`.trResultados${nombre}`);

  const resultados = [...resultado].map((rs) => {
    return rs.children[0].children[0].children[0].value.slice(0, 20);
  });

  console.log({
    caracteristica,
    subCaracteristicas,
    rangos,
    resultados,
    idEx,
  });
  if(caracteristica[0].valor.includes('-EMPTY0023')){
    caracteristica[0].valor=''
  }
  const caracteristicas = [
    {
      caracteristica,
      subCaracteristicas,
      rangos,
      resultados,
    },
  ];
  try {
    const { token } = await login.getToken();

    const { data } = await axios.post(
      urlsv + "/api/modulo-examenes/insert-caracteristica",
      {
        caracteristicas,
        idEx,
      },
      {
        headers: { token },
      }
    );

    disabledButtonByClass("button" + nombre);
    desactivarInputs(nombre);
    desactivarSelects(nombre);
    const btnModificar = document.getElementById(
      `botonModificarCaracteristica${nombre}`
    );
    btnModificar.removeAttribute("hidden");
    enableButton("buttonCaracteristica");

    examenesAlerta("Caracteristica agregada con exito!", "success");
    return modificarExamen(data.examenId);
  } catch (error) {
    console.log("🚀 ~ subCaracteristicas ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}
function modificarCategoriaModal(id, nombre) {
  document.getElementById(
    "modificarCategoriaModalLabel"
  ).innerHTML = `Modificar Categoria ${nombre}`;
  const modalModSec = new bootstrap.Modal("#modificarCategoriaModal");
  modalModSec.toggle();
  const buttonModify = document.getElementById("buttonModificarCategoria");
  buttonModify.removeAttribute("onclick");
  buttonModify.setAttribute("onclick", `modificarCategoria(${id})`);
}

async function modificarCategoria(id) {
  const input = document.getElementById("inputCategoriaModificar");
  let value = input.value;
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-categoria",
      {
        id_categoria: id,
        nombre: value,
      },
      {
        headers: { token },
      }
    );

    examenesAlerta("La categoria ha sido modificada correctamente", "success");
  } catch (error) {
    return await alerta.alert("Error:", error.response.data.mensaje);
  }
}

function modificarEmpresaModal(id, nombre) {
  document.getElementById(
    "modificarEmpresaModalLabel"
  ).innerHTML = `Modificar Empresa ${nombre}`;
  const modalModSec = new bootstrap.Modal("#modificarEmpresaModal");
  modalModSec.toggle();
  const buttonModify = document.getElementById("buttonModificarEmpresa");
  buttonModify.setAttribute("onclick", `modificarEmpresa(${id})`);
}

async function modificarEmpresa(id) {
  const input = document.getElementById("inputEmpresaModificar");
  let value = input.value;
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-empresa",
      {
        id_empresa: id,
        nombre: value,
      },
      {
        headers: { token },
      }
    );

    examenesAlerta("La empresa ha sido modificada correctamente", "success");
  } catch (error) {
    return await alerta.alert("Error:", error.response.data.mensaje);
  }
}

function modificarSeccionModal(id, nombre) {
  document.getElementById(
    "modificarSeccionModalLabel"
  ).innerHTML = `Modificar Seccion ${nombre}`;
  const modalModSec = new bootstrap.Modal("#modificarSeccionModal");
  modalModSec.toggle();
  const buttonModify = document.getElementById("buttonModificarSeccion");
  buttonModify.removeAttribute("onclick");
  buttonModify.setAttribute("onclick", `modificarSeccion(${id})`);
}
function modificarSedeModal(id, nombre) {
  document.getElementById(
    "modificarSedeModalLabel"
  ).innerHTML = `Modificar Seccion ${nombre}`;
  const modalModSec = new bootstrap.Modal("#modificarSedeModal");
  modalModSec.toggle();
  const buttonModify = document.getElementById("buttonModificarSede");
  buttonModify.removeAttribute("onclick");
  buttonModify.setAttribute("onclick", `modificarSede(${id})`);
}

function modificarLaboratorioModal(id, nombre, telefono, rif, direccion) {
  document.getElementById("inputRazonLabModificar").value = nombre;
  document.getElementById("inputTelefonoLabModificar").value = telefono;
  document.getElementById("inputRifLabModificar").value = rif;
  document.getElementById("inputDireccionLabModificar").value = direccion;

  const modalModSec = new bootstrap.Modal("#modificarLaboratorioModal");
  modalModSec.toggle();

  const buttonModify = document.getElementById("buttonModificarLaboratorio");
  buttonModify.removeAttribute("onclick");
  buttonModify.setAttribute("onclick", `modificarLaboratorio(${id})`);
}

async function modificarLaboratorio(id) {
  const razon = document.getElementById("inputRazonLabModificar").value;
  const telefono = document.getElementById("inputTelefonoLabModificar").value;
  const rif = document.getElementById("inputRifLabModificar").value;
  const direccion = document.getElementById("inputDireccionLabModificar").value;

  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-laboratorio",
      {
        id_laboratorio: id,
        razon,
        telefono,
        direccion,
        rif,
      },
      {
        headers: { token },
      }
    );

    examenesAlerta(
      "El Laboratorio ha sido modificado correctamente",
      "success"
    );
    render();
  } catch (error) {
    return await alerta.alert("Error:", error.response.data.mensaje);
  }
}
async function modificarSede(id) {
  const input = document.getElementById("inputSedeModificar");
  let value = input.value;
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-sede",
      {
        id_sede: id,
        nombre: value,
      },
      {
        headers: { token },
      }
    );

    examenesAlerta("La sede ha sido modificada correctamente", "success");
    render();
  } catch (error) {
    return await alerta.alert("Error:", error.response.data.mensaje);
  }
}

async function modificarSeccion(id) {
  const input = document.getElementById("inputSeccionModificar");
  let value = input.value;
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-seccion",
      {
        id_seccion: id,
        nombre: value,
      },
      {
        headers: { token },
      }
    );

    examenesAlerta("La seccion ha sido modificada correctamente", "success");
    render();
  } catch (error) {
    return await alerta.alert("Error:", error.response.data.mensaje);
  }
}

async function modificarExamenTabla(id) {
  const inputExamenNombre = document.getElementById("inputNombreExamen");
  const seccionSelect = document.getElementById("seccionExamenSelect");
  const categoriaSelect = document.getElementById("categoriaExamenSelect");
  console.log(
    inputExamenNombre.value,
    seccionSelect.value,
    categoriaSelect.value
  );
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-examen-tabla",
      {
        id_seccion: seccionSelect.value,
        nombre: inputExamenNombre.value,
        id_examen: id,
        id_categoria: categoriaSelect.value,
      },
      {
        headers: { token },
      }
    );

    examenesAlerta("El examen ha sido modificado correctamente", "success");
  } catch (error) {
    return await alerta.alert("Error:", error.response.data.mensaje);
  }
}

const reloadPage = async () => {
  const res = await alerta.alert(
    "Reiniciar:",
    "¿Esta seguro que desea reiniciar la ventana? Todos los campos quedaran vacios"
  );
  if (res.response == 1) return;
  else location.reload();
};

const reloadPageMod = async () => {
  location.reload();
};

async function modificarExamen(id) {
  try {
    const { token } = await login.getToken();
    const { data: examen } = await axios.get(
      urlsv + "/api/modulo-examenes/examen-id",
      { headers: { token }, params: { idExamen: id } }
    );

  
    titulosArray=[];
    console.log(examen);
    const botonRefrescarFooter = document.getElementById(
      "buttonRefrescarFooter"
    );
    const inputExamenNombre = document.getElementById("inputNombreExamen");
    const seccionSelect = document.getElementById("seccionExamenSelect");
    const categoriaSelect = document.getElementById("categoriaExamenSelect");
    const botonGuardarExamen = document.getElementById("buttonGuardarExamen");
    botonGuardarExamen.setAttribute("disabled", "true");
    const accordionDiv = document.getElementById("accordionCaracteristicas");
    const botonModalCaracteristica = document.getElementById(
      "botonModalCaracteristica"
    );
    const botonModificarExamenTab =
      document.getElementById(`modificarExamenTab`);
    const refrescar = document.getElementById(`refrescarButton`);
    refrescar.setAttribute("hidden", "true");
    botonModificarExamenTab.removeAttribute("hidden");
    botonRefrescarFooter.removeAttribute("hidden");
    botonModificarExamenTab.setAttribute(
      "onclick",
      `modificarExamenTabla(${id})`
    );

    botonModalCaracteristica.removeAttribute("onclick");
    botonModalCaracteristica.setAttribute(
      "onclick",
      `validarNombreCaracteristica(true,"${id}")`
    );

    inputExamenNombre.value = examen.examen.nombre;
    seccionSelect.value = examen.examen.id_seccion;
    categoriaSelect.value = examen.examen.id_categoria;
    accordionDiv.innerHTML = "";
    examen.detalles=examen.detalles.sort((a, b) => {
      console.log(a,b)
      
      if (a.posicion > b.posicion) {
        return 1;
      }
      if (a.posicion < b.posicion) {
        return -1;
      }
      return 0;
    });

    examen.detalles.forEach((dt) => {
      const divItem = document.createElement("div");
      if (dt.nombre == null) {
        dt.nombre=`${contador}-EMPTY0023`
        contador+=1
      }
      nombre1 = dt.nombre.trim();
      
      const nombre = nombre1
        .replaceAll(" ", "-")
        .replaceAll("(", "-")
        .replaceAll(")", "-")
        .replaceAll(".", "-")
        .replaceAll("+", "-")
        .replaceAll("/", "-");
      caracteristicasCreadas.add(nombre);
      divItem.className = `accordion-item acordionItemCaracteristica`;
      divItem.id = `accordionItemCaracteristica${nombre}`;

      divItem.innerHTML = `
  
  
  <h2 class="accordion-header headerCaracteristica"  >
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCaracteristica${nombre}" aria-expanded="false" aria-controls="collapseCaracteristica${nombre}">
     ${nombre1}
    </button>
    
  </h2>
  <div id="collapseCaracteristica${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionItemCaracteristica">
    <div class="accordion-body m-0 p-0 text-center" id="accordionBodyCaracteristica${nombre}">
      <div class="row">
        <div class="col-9 m-0 p-0"> 
          <div class="accordion mx-4" id="accordionDetalleCaracteristicas${nombre}">
        
            <div class="accordion-item acordionSubItemCaracteristica" id="itemSubCaracteristica${nombre}">
              <h2 class="accordion-header headerSubCaracteristica">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSubCaracteristica${nombre}" aria-expanded="false" aria-controls="collapseSubCaracteristica${nombre}">
                  Subcaracteristicas
                </button>
              </h2>
              <div id="collapseSubCaracteristica${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionDetalleCaracteristicas${nombre}">
                <div class="accordion-body" id="accordionBodySubCaracteristicas${nombre}">
                  <table class="table" style="font-size: small;">
                    <thead>
                      <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Valor</th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody style="font-size: small;" id="tBodySubCaracteristica${nombre}">
                      
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="5">

                        </td>
                        <td>
                          <button type="button" class="btn btn-outline-success button${nombre}" onclick="añadirSubCaracteristicaEx(${
        dt.id
      },'${nombre}')" id="añadirSubCaButton">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                            </svg>
                          </button>
                        </td>
                        
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion-item acordionSubItemCaracteristica" id="itemRangos${nombre}">
              <h2 class="accordion-header headerSubCaracteristica">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRangos${nombre}" aria-expanded="false" aria-controls="collapseRangos${nombre}">
                  Rangos
                </button>
              </h2>
              <div id="collapseRangos${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionDetalleCaracteristicas${nombre}">
                <div class="accordion-body" id="accordionBodyRangos${nombre}">
                  <table class="table" style="font-size: small;">
                    <thead>
                      <tr>
                        <th scope="col">Inferior</th>
                        <th scope="col">Superior</th>
                        <th scope="col" colspan="2">Rango de edad</th>
                        <th scope="col">Genero</th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody style="font-size: small;" id="tBodyRangos${nombre}">
                      
                      
                      

                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="7">

                        </td>
                        <td>
                          <button type="button" class="btn btn-outline-success button${nombre}" onclick="añadirRangoEx(${
        dt.id
      },'${nombre}')" id="añadirRangoButton">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                            </svg>
                          </button>
                        </td>
                        
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion-item acordionSubItemCaracteristica" id="itemResultados${nombre}">
              <h2 class="accordion-header headerSubCaracteristica">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseResultados${nombre}" aria-expanded="false" aria-controls="collapseResultados${nombre}">
                  Resultados
                </button>
              </h2>
              <div id="collapseResultados${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionDetalleCaracteristicas${nombre}">
                <div class="accordion-body" id="accordionBodyResultados${nombre}">
                  <table class="table" style="font-size: small;">
                    <thead>
                      <tr><th colspan="4">Resultados</th></tr>
                    </thead>
                    <tbody id="tBodyResultados${nombre}">
                     
                      
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3">

                        </td>
                        <td>
                          <button type="button" class="btn btn-outline-success button${nombre}" onclick="añadirResultadoEx('${
        dt.id
      }','${nombre}')" id="añadirResultadoButton">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                            </svg>
                          </button>
                        </td>
                        
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
        <div class="col-3"> 
          <div>
            <table class="table table-success">
            
              <tbody style="font-size: medium;">
                <tr>
                  <th scope="row">Nombre</th>
                  <td colspan='2'><div class="mb-3">
                  <input type="text" readonly class="form-control input${nombre} formCaracteristica${nombre}" name="nombre" value='${nombre1}' placeholder="Nombre">
                </div></td>
                  
                </tr>
                <tr>
                  <th scope="row">Unidad</th>
                  <td colspan='2'><input type="text" readonly value='${
                    dt.unidad != null ? dt.unidad : ""
                  }' class="form-control input${nombre} formCaracteristica${nombre}" name="unidad" placeholder='Unidad'></td>
                  
                </tr>
                <tr>
                  <th scope="row">Posicion</th>
                  <td colspan='2'><input type="number" readonly value='${
                    dt.posicion
                  }' min='0' class="form-control input${nombre} formCaracteristica${nombre}" name="posicion" placeholder='Orden'></td>
                  
                </tr>
                <tr>
                  <th scope="row">Imprimir</th>
                  <td colspan='2'><input type="checkbox" disabled ${
                    dt.impsiempre == 1 ? "checked" : 'checked="false"'
                  } class="form-check-input select${nombre} formCaracteristica${nombre}" checked name="imp" ></td>

                  
                </tr>
                <tr>
                  <th scope="row">
                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      style="cursor: pointer"
                                      width="25"
                                      height="25"
                                      fill="#FACD0B"
                                      class="bi bi-pencil-square botonModificar${nombre}"
                                      viewBox="0 0 20 20"
                                      id="botonModificarCaracteristicaForm${nombre}"
                                      onclick="modificarCaracteristicaForm('${nombre}')"
                                    >
                                      <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                      />
                                    </svg>
                  </th>
                  <td >
                    
                    <button onclick="borrarCaracteristicaForm('${nombre}','${
        dt.id
      }')" class='button${nombre} btnIcon' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </button>
                  </td>
                  <td style="cursor:pointer">
                  <button hidden class='button${nombre} btnIcon' id='botonGuardarCaracteristica${nombre}' onclick="guardarCambioCaracteristicaBdd('${
        dt.id
      }','${nombre}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
                      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
                    </svg>
                  </button>
                  </td>
                  
                </tr>
                
              </tbody>
            </table>
          </div>
          
        </div>

        </div>
      </div>

  </div>


  `;
      accordionDiv.appendChild(divItem);
      const tBodySubCaracteristica = document.getElementById(
        `tBodySubCaracteristica${nombre}`
      );
      const tBody = document.getElementById(`tBodySubCaracteristica${nombre}`);

      const subCa = examen.subCa.filter((sb) => dt.id == sb.id_det_ex);
      const rg = examen.rangos.filter((rg) => dt.id == rg.id_det_ex);
      const rs = examen.resultados.filter((rs) => dt.id == rs.id_det_ex);

      subCa.forEach((sb) => {
        const tr = document.createElement("tr");
        tr.className = "trSubCaracteristica" + nombre;
        tr.innerHTML = `<th scope="row">
  <select id="selectSubTipo${
    sb.id
  }" onchange="validarSelectSub('${nombre}',event)" value="${
          sb.tipo
        }" disabled class="form-select form-control-sm select${nombre} inputSb${
          sb.id
        }" name="select"  aria-label="Default select example">
    <option ${sb.tipo == "texto" ? "selected" : ""} value="texto">Texto</option>
    <option ${
      sb.tipo == "numero" ? "selected" : ""
    } value="numero">Numero</option>
    <option ${
      sb.tipo == "formula" ? "selected" : ""
    } value="formula">Formula</option>
  </select>
</th>
<td>
  <div
    class="mb-3 d-flex align-items-center justify-content-center"
  >

    <input
      readonly
      name="nombre"
      type="text"
      class="form-control-sm mx-2 inputSb${sb.id} "
      value="${sb.nombre}"
      id="inputNombreSubCa${sb.id}"
      
    />
  </div>
</td>
<td>
  
<div class="input-group">
<input type="text" name='valor' id="inputValorSubCa${sb.id}" value="${
          sb.valor
        }" onchange="validarInputFormula('${nombre}',event)" readonly class="form-control-sm mx-2 inputSb${
          sb.id
        } formSubCaracteristica${nombre}" placeholder="{v} - [+-*/] - ({a}[/]{b})" aria-label="">

</div>
</td>

<td scope="row"
<button class="button${nombre} btnIcon buttonModificarSub${nombre}" >
<svg
xmlns="http://www.w3.org/2000/svg"
style="cursor: pointer"
width="25"
height="25"
fill="#FACD0B"
class="bi bi-pencil-square"
viewBox="0 0 20 20"
id="botonModificarSubCa${sb.id}"
onclick="modificarSubCaForm('${sb.id}','${nombre}')"
>
<path
  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
/>
<path
  fill-rule="evenodd"
  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
/>
</svg>
  </button>
</td>
<td style="cursor:pointer">
                  <button hidden class='button${nombre} btnIcon' id='botonGuardarSubCa${
          sb.id
        }' onclick="guardarCambioSubCaBdd('${sb.id}','${nombre}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
                      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
                    </svg>
                  </button>
                  </td>
<td>
  <button onclick="borrarSubCaracteristica(event,'${nombre}','','${
          sb.id
        }')" class="button${nombre} btnIcon" >
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"  class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>      
  </button>
  
</td>
`;
        tBodySubCaracteristica.appendChild(tr);
      });

      rg.forEach((r) => {
        const tBodyRango = document.getElementById("tBodyRangos" + nombre);
        const tr = document.createElement("tr");
        tr.className = "trRango" + nombre;
        tr.innerHTML = `
    <td>
    <div
      class="mb-3 d-flex align-items-center justify-content-center"
    >
  
      <input
        
        name="inferior"
        type="text"
        class="form-control-sm mx-2 input${nombre} w-50 inpRg${r.id}  formRango"
        value="${r.inferior}"
        onChange="validarInferior(event,'inferior')"
        id='inferior${r.id}'
        readonly
      />
    </div>
  </td>
  <td>
    <div
    class="mb-3 d-flex align-items-center justify-content-center"
    >
    
      <input
        name="superior"
        type="text"
        class="form-control-sm mx-2 w-50 input${nombre} inpRg${r.id} formRango"
        value="${r.superior}"
        onChange="validarInferior(event,'superior')"
        id='superior${r.id}'

        readonly
      />
    </div>
  </td>
  <td>
    <div
      class="mb-3 d-flex align-items-center justify-content-center"
    >
  
      <input
        value="${r.desde}"
        readonly
        name="desde"
        type="text"
        onChange="validarInferiorEdad(event,'inferior')"
        id='desde${r.id}'

        class="form-control-sm mx-2 w-50 input${nombre} inpRg${r.id} formRango"
      />
    </div>
  </td>
  <td>
    <div
    class="mb-3 d-flex align-items-center justify-content-center"
  >
   
    <input
      value="${r.hasta}"
      readonly
      name="hasta"
      type="text"
      id='hasta${r.id}'

      onChange="validarInferiorEdad(event,'superior')"
      class="form-control-sm mx-2 w-50 input${nombre} inpRg${r.id} formRango"
    />
  </div>
  </td>
  <th scope="row">
    <select id='selectRg${r.id}' class="form-select form-control-sm inpRg${
          r.id
        } select${nombre} value="${
          r.genero
        }" disabled formRango" name="genero" aria-label="Default select example">
      <option ${
        r.genero == "todos" ? "selected" : ""
      } value="todos">Genero</option>
      <option ${
        r.genero == "masculino" ? "selected" : ""
      } value="masculino">Masculino</option>
      <option ${
        r.genero == "femenino" ? "selected" : ""
      } value="femenino">Femenino</option>
    </select>
  </th>
  <th scope="row"><button class="button${nombre} buttonModificarRango${
          r.id
        } btnIcon" >
  <svg
  xmlns="http://www.w3.org/2000/svg"
  style="cursor: pointer"
  width="25"
  height="25"
  fill="#FACD0B"
  class="bi bi-pencil-square"
  viewBox="0 0 20 20"
  id=""
  onclick="modificarRangoForm('${r.id}','${nombre}')"
  >
  <path
    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
  />
  <path
    fill-rule="evenodd"
    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
  />
  </svg>
    </button> </th>

    <td style="cursor:pointer">
    <button hidden class='button${nombre} btnIcon' id='botonGuardarRg${
          r.id
        }' onclick="guardarCambioRgBdd('${r.id}','${nombre}')">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
      </svg>
    </button>
    </td>

    
  <td>
    <button class="button${nombre} btnIcon" onclick="borrarRango(event,'${nombre}','${
          r.id
        }')">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"  class="bi bi-x-circle " viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg>     
    </button>
    
  </td>
    `;
        tBodyRango.appendChild(tr);
      });

      rs.forEach((rsl) => {
        const tBodyResultados = document.getElementById(
          "tBodyResultados" + nombre
        );
        const tr = document.createElement("tr");
        tr.className = "trResultados" + nombre;
        tr.innerHTML = `
    <td><div
                                      class="mb-3 d-flex align-items-center justify-content-center"
                                    >
                                    
                                     
                                      <input
                                        id='resultadoRs${rsl.id}'
                                        onChange="validarResultado(event)"
                                        name="resultado"
                                        type="text"
                                        class="form-control-sm input${nombre} mx-2 w-100 formResultado"
                                        readonly
                                        value="${rsl.resultado}"
                                      />
                                    </div></td>
                                    <th scope="row"><button class="button${nombre} btnIcon buttonModificarRs" >
                                    <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    style="cursor: pointer"
                                    width="25"
                                    height="25"
                                    fill="#FACD0B"
                                    class="bi bi-pencil-square"
                                    viewBox="0 0 20 20"
                                    id=""
                                    onclick="modificarResultadoForm(${rsl.id},'${nombre}')"
                                    >
                                    <path
                                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                    />
                                    <path
                                      fill-rule="evenodd"
                                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                    />
                                    </svg>
                                      </button> </th>
                                      <td style="cursor:pointer">
    <button hidden class='button${nombre} btnIcon' id='botonGuardarRs${rsl.id}' onclick="guardarCambioRsBdd('${rsl.id}','${nombre}')">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
      </svg>
    </button>
    </td>

                                    <td >
                                      <button class="button${nombre} btnIcon" onclick="borrarResultado(event,'${nombre}','${rsl.id}')">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                        </svg>    
                                      </button>
                                      
                                    </td>
    `;
        tBodyResultados.appendChild(tr);
      });
    });

    examen.titulos.forEach(t=>{
 

      const posicion=t.posicion
      const nombre1=t.titulo
  const nombre = t.titulo
    .replaceAll(" ", "-")
    .replaceAll("(", "-")
    .replaceAll(")", "-")
    .replaceAll(".", "-")
    .replaceAll("+", "-")
    .replaceAll("/", "-");

  const accordionCaracteristicas = document.getElementById(
    "accordionCaracteristicas"
  );
  
  caracteristicasCreadas.add(nombre);
  

  const divItem = document.createElement("div");
  divItem.className = `accordion-item acordionItemCaracteristica`;
  divItem.id = `accordionItemCaracteristica${nombre}`;

  divItem.innerHTML = `
  
  
  <h2 class="accordion-header headerCaracteristica"  >
    <button class="accordion-button collapsed" id="collapseTitulo${nombre}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCaracteristica${nombre}" aria-expanded="false" aria-controls="collapseCaracteristica${nombre}">
     ${nombre1}  --- TITULO
    </button>
    
  </h2>
  <div id="collapseCaracteristica${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionItemCaracteristica">
    <div class="accordion-body m-0 p-0 text-center" id="accordionBodyCaracteristica${nombre}">
    
      <div class="row my-3" style="font-size:medium">
      <div class='col-2'>
        <label
        for="inputTitulo${nombre}"
        name="titulo"
        class="form-label formCaracteristica "
        >Titulo</label
      > 
        </div>
        
        <div class="col-2">
        
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputTitulo${nombre}"
            placeholder="Titulo"
            disabled
            value="${nombre1}"
          />
        </div>
        <div class="col-2">
        <label
    for="inputPosicion${nombre}"
    name="posicion"
    class="form-label formCaracteristica"
    >Posicion</label>
  
        </div>
        <div class='col-2'>
        <input
    type="number"
    min='0'
    step='1'
    value="${posicion}"
    class="form-control form-control-sm"
    id="inputPosicion${nombre}"
    placeholder="Posicion"
    disabled
  />
        </div>
        <div class='col-4'>
          <div class='row'>
            <div class='col'>
            <button class='button${nombre} btnIcon'>
            
            <svg
            xmlns="http://www.w3.org/2000/svg"
            style="cursor: pointer"
            width="40"
            height="40"
            fill="#FACD0B"
            class="bi bi-pencil-square botonModificarTitulo${nombre}"
            viewBox="0 0 20 20"
            id="botonModificarTitulo${nombre}"
            onclick="modificarTitulo('${nombre}','${nombre1}')"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
            />
          </svg>
          </button>
          </div>
            <div class='col'><button class='button${nombre} btnIcon' id="botonBorrarTitulo${nombre}" onclick="deleteTituloBdd('${t.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
            </button></div>
            <div class='col'>
              <button class='button${nombre} btnIcon'id="botonGuardarTitulo${nombre}" onclick="guardarTituloBdd('${nombre}','${t.id}')" hidden>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
                </svg>
              </button>
            </div>


          </div>

        





        </div>
        
      </div>
      
    
  
      </div>

  </div>


  `;

  accordionCaracteristicas.appendChild(divItem);
  titulosArray.push({
    titulo:nombre1,
    posicion
  })
    })
    document.getElementById('botonModalTitulo').setAttribute('onclick',`añadirTituloBdd(${id})`)
    document.getElementById("busquedaModalCloseBtn").click();
  } catch (error) {
    console.log("🚀 ~ modificarExamen ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

async function deleteTituloBdd(id){
  try {
    const { token } = await login.getToken();
      const { data } = await axios.delete(
        urlsv + "/api/modulo-examenes/delete-titulo",
        {
          headers: { token },
          data: { id_titulo: id },
        }
      );

    examenesAlerta("Titulo eliminado con exito!", "danger");
    return modificarExamen(data.examenId);

  } catch (error) {
    console.log("🚀 ~ guardarCambioRsBdd ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

async function guardarTituloBdd(nombre,id){
  const tituloInp= document.getElementById(`inputTitulo${nombre}`)
  const posicionInp= document.getElementById(`inputPosicion${nombre}`)
  console.log(tituloInp.value,posicionInp.value)
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-titulo",
      {
        id_titulo: id,
        titulo:tituloInp.value,
        posicion:posicionInp.value
      },
      {
        headers: { token },
      }
    );

    examenesAlerta("Titulo modificado con exito!", "success");
    return modificarExamen(data.examenId);

  } catch (error) {
    console.log("🚀 ~ guardarCambioRsBdd ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }

}
function modificarResultadoForm(id, nombre) {
  const resultadoInput = document.getElementById(`resultadoRs${id}`);
  resultadoInput.removeAttribute("readonly");
  const btnModi = document.getElementsByClassName(`buttonModificarRs`);
  const arrBtn = [...btnModi];
  arrBtn.forEach((e) => {
    e.setAttribute("hidden", "true");
  });
  const botonGuardarRs = document.getElementById(`botonGuardarRs${id}`);
  botonGuardarRs.removeAttribute("hidden");
}

async function guardarCambioRsBdd(id, nombre) {
  const resultadoInput = document.getElementById(`resultadoRs${id}`);

  resultadoInput.value = resultadoInput.value.slice(0, 60);
  console.log(resultadoInput.value);
  resultadoInput.setAttribute("readonly", "true");
  const btnModi = document.getElementsByClassName(`buttonModificarRs`);
  const arrBtn = [...btnModi];
  arrBtn.forEach((e) => {
    e.removeAttribute("hidden");
  });
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-resultado",
      {
        id_resultado: id,
        resultado: resultadoInput.value,
      },
      {
        headers: { token },
      }
    );
    const botonGuardarRs = document.getElementById(`botonGuardarRs${id}`);
    botonGuardarRs.setAttribute("hidden", "true");
    examenesAlerta("Rango modificado con exito!", "success");
  } catch (error) {
    console.log("🚀 ~ guardarCambioRsBdd ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

function modificarCaracteristicaForm(nombre) {
  const formCaracteristica = document.getElementsByClassName(
    "formCaracteristica" + nombre
  );
  let arrayCar = [...formCaracteristica];

  arrayCar.forEach((element) => {
    if (element.type == "checkbox") {
      element.removeAttribute("disabled");
    } else {
      element.removeAttribute("readonly");
    }
  });
  document
    .getElementById("botonModificarCaracteristicaForm" + nombre)
    .setAttribute("hidden", "true");
  document
    .getElementById("botonGuardarCaracteristica" + nombre)
    .removeAttribute("hidden");
  caracteristicasCreadas.delete(nombre);
}

function añadirRangoEx(id, nombre) {
  disabledButton("añadirRangoButton");

  const trsRango = document.getElementsByClassName("trRango" + nombre);
  if (trsRango.length >= 5) {
    return;
  }

  const tBodyRango = document.getElementById("tBodyRangos" + nombre);
  const tr = document.createElement("tr");
  tr.className = "trRango" + nombre;
  tr.innerHTML = `
  <td>
  <div
    class="mb-3 d-flex align-items-center justify-content-center"
  >

    <input
      
      name="inferior"
      type="text"
      onChange="validarInferior(event,'inferior')"
      class="form-control-sm mx-2 input${nombre} w-50 formRango"
      id="exampleFormControlInput2"
    />
  </div>
</td>
<td>
  <div
  class="mb-3 d-flex align-items-center justify-content-center"
>
 
  <input
    onChange="validarInferior(event,'superior')"
    name="superior"
    type="text"
    class="form-control-sm mx-2 w-50 input${nombre} formRango"
    id="exampleFormControlInput2"
  />
</div>
</td>
<td>
  <div
    class="mb-3 d-flex align-items-center justify-content-center"
  >

    <input
      onChange="validarInferiorEdad(event,'inferior')"
      name="desde"
      type="text"
      class="form-control-sm mx-2 w-50 input${nombre} formRango"
      id="exampleFormControlInput2"
    />
  </div>
</td>
<td>
  <div
  class="mb-3 d-flex align-items-center justify-content-center"
>
 
  <input
    onChange="validarInferiorEdad(event,'superior')"
    name="hasta"
    type="text"
    class="form-control-sm mx-2 w-50 input${nombre} formRango"
    id="exampleFormControlInput2"
  />
</div>
</td>
<th scope="row">
  <select class="form-select form-control-sm select${nombre} formRango" name="genero" aria-label="Default select example">
    <option value="todos">Genero</option>
    <option value="masculino">Masculino</option>
    <option value="femenino">Femenino</option>
  </select>
</th>
<th scope="row"><button class="button${nombre} buttonModificarRango btnIcon" >
  <svg
  xmlns="http://www.w3.org/2000/svg"
  style="cursor: pointer"
  width="25"
  height="25"
  fill="#FACD0B"
  class="bi bi-pencil-square"
  viewBox="0 0 20 20"
  id=""
  hidden
  >
  <path
    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
  />
  <path
    fill-rule="evenodd"
    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
  />
  </svg>
    </button> </th>

    <td style="cursor:pointer">
    <button class='button${nombre} btnIcon' id='' onclick="añadirRangoExBdd('${id}','${nombre}',event)">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
      </svg>
    </button>
    </td>
<td>
  <button class="button${nombre} btnIcon" onclick="borrarRango(event,'${nombre}')">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"  class="bi bi-x-circle " viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>     
  </button>
  
</td>
  `;
  tBodyRango.appendChild(tr);
}

async function añadirRangoExBdd(id, nombre, event) {
  const rango = document.querySelectorAll(`.trRango${nombre}`);
  let error = false;
  let rangos = [...rango].map((r) => {
    if (r.childNodes[5].childNodes[1].childNodes[1].value == "") {
      if (r.childNodes[7].childNodes[1].childNodes[1].value != "") {
        error = true;
        console.log("1");
        return alerta.alert("Error", "Verifique los campos");
      }
    }
    if (
      r.childNodes[1].childNodes[1].childNodes[1].value == "" ||
      r.childNodes[3].childNodes[1].childNodes[1].value == ""
    ) {
      error = true;
      console.log("2");

      return alerta.alert("Error", "Verifique los campos");
    }

    if (
      parseFloat(r.childNodes[1].childNodes[1].childNodes[1].value) >
        parseFloat(r.childNodes[3].childNodes[1].childNodes[1].value) ||
      parseFloat(r.childNodes[5].childNodes[1].childNodes[1].value) >
        parseFloat(r.childNodes[7].childNodes[1].childNodes[1].value)
    ) {
      error = true;
      console.log("3");

      return alerta.alert("Error", "Verifique los campos");
    }
  });
  if (error) {
    return;
  }
  let desde, hasta, inferior, superior, genero;
  if (event.target.tagName == "path") {
    desde =
      event.target.parentNode.parentNode.parentNode.parentNode.children[2]
        .children[0].children[0].value;
    hasta =
      event.target.parentNode.parentNode.parentNode.parentNode.children[3]
        .children[0].children[0].value;
    inferior =
      event.target.parentNode.parentNode.parentNode.parentNode.children[0]
        .children[0].children[0].value;
    superior =
      event.target.parentNode.parentNode.parentNode.parentNode.children[1]
        .children[0].children[0].value;
    genero =
      event.target.parentNode.parentNode.parentNode.parentNode.children[4]
        .children[0].value;
  }
  if (event.target.tagName == "svg") {
    desde =
      event.target.parentNode.parentNode.parentNode.children[2].children[0]
        .children[0].value;
    hasta =
      event.target.parentNode.parentNode.parentNode.children[3].children[0]
        .children[0].value;
    inferior =
      event.target.parentNode.parentNode.parentNode.children[0].children[0]
        .children[0].value;

    superior =
      event.target.parentNode.parentNode.parentNode.children[1].children[0]
        .children[0].value;
    genero =
      event.target.parentNode.parentNode.parentNode.children[4].children[0]
        .value;
  }

  let rangoBdd = {
    desde,
    hasta,
    inferior,
    superior,
    genero,
  };
  try {
    const { token } = await login.getToken();

    const { data } = await axios.post(
      urlsv + "/api/modulo-examenes/insert-rango",
      {
        rango: rangoBdd,
        id_caracteristica: id,
      },
      {
        headers: { token },
      }
    );
    enableButton("añadirRangoButton");

    examenesAlerta("Rango agregado con exito!", "success");

    return modificarExamen(data.examenId);
  } catch (error) {
    console.log("🚀 ~ añadirRangoExBdd ~ error:", error);

    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}
function añadirResultadoEx(id, nombre) {
  const trsResultados = document.getElementsByClassName("trResultados");
  if (trsResultados.length >= 10) {
    return;
  }
  const tBodyResultados = document.getElementById("tBodyResultados" + nombre);
  disabledButton("añadirResultadoButton");

  const tr = document.createElement("tr");
  tr.className = "trResultados" + nombre;
  tr.innerHTML = `
  <td><div
                                    class="mb-3 d-flex align-items-center justify-content-center"
                                  >
                                  
                                   
                                    <input
                                      onChange="validarResultado(event)"
                                      name="resultado"
                                      type="text"
                                      class="form-control-sm input${nombre} mx-2 w-100 formResultado"
                                      
                                    />
                                  </div></td>
                                  
                                  <th scope="row"><button hidden class="button${nombre} buttonModificarR btnIcon" >
  <svg
  xmlns="http://www.w3.org/2000/svg"
  style="cursor: pointer"
  width="25"
  height="25"
  fill="#FACD0B"
  class="bi bi-pencil-square"
  viewBox="0 0 20 20"
  id=""
  
  >
  <path
    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
  />
  <path
    fill-rule="evenodd"
    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
  />
  </svg>
    </button> </th>
  
    <td style="cursor:pointer">
    <button class='button${nombre} btnIcon' id='' onclick="añadirResultadoExBdd('${id}','${nombre}',event)">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
      </svg>
    </button>
    
    </td>
    
                                  <td >
                                    <button class="button${nombre} btnIcon" onclick="borrarResultado(event,'${nombre}')">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                      </svg>    
                                    </button>
                                    
                                  </td>
  `;
  tBodyResultados.appendChild(tr);
}
async function añadirResultadoExBdd(id, nombre) {
  console.log("añadirResultadoExBdd");
  console.log(
    event.target.parentNode.parentNode.parentNode.children[0].children[0]
      .children[0].value
  );
  const resultado =
    event.target.parentNode.parentNode.parentNode.children[0].children[0]
      .children[0].value;
  if (resultado == "" || resultado == null || resultado == undefined) {
    return alerta.alert("Error", "Verifique el campo resultado");
  }
  try {
    const { token } = await login.getToken();

    const { data } = await axios.post(
      urlsv + "/api/modulo-examenes/insert-resultado",
      {
        resultado,
        id_caracteristica: id,
      },
      {
        headers: { token },
      }
    );

    enableButton("añadirResultadoButton");
    examenesAlerta("Resultado agregado con exito!", "success");

    return modificarExamen(data.examenId);
  } catch (error) {
    console.log("🚀 ~ añadirResultadoExBdd ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}
function añadirSubCaracteristicaEx(id, nombre) {
  const trsSubCaracteristica = document.getElementsByClassName(
    "trSubCaracteristica" + nombre
  );
  if (trsSubCaracteristica.length >= 8) {
    return;
  }
  disabledButton("añadirSubCaButton");

  const tBodySubCaracteristica = document.getElementById(
    "tBodySubCaracteristica" + nombre
  );
  const tr = document.createElement("tr");
  tr.className = "trSubCaracteristica" + nombre;
  tr.innerHTML = `<th scope="row">
  <select onChange='validarSelectSub("${nombre}",event)' class="form-select form-control-sm select${nombre} formSubCaracteristica${nombre}" name="select"  aria-label="Default select example">
    <option value="texto">Texto</option>
    <option value="numero">Numero</option>
    <option value="formula">Formula</option>
  </select>
</th>
<td>
  <div
    class="mb-3 d-flex align-items-center justify-content-center"
  >

    <input
      name="nombre"
      type="text"
      class="form-control-sm mx-2 input${nombre} formSubCaracteristica${nombre}"
      
      
    />
  </div>
</td>
<td>
  
<div class="input-group">
<input type="text" name='valor' onchange="validarInputFormula('${nombre}',event)" readonly class="form-control-sm mx-2 input${nombre} formSubCaracteristica${nombre}" placeholder="{v} - [+-*/] - ({a}[/]{b})" aria-label="">
 

</div>
</td>

<td scope="row"
<button class="button${nombre} btnIcon buttonModificarSub${nombre}" >
<svg
xmlns="http://www.w3.org/2000/svg"
style="cursor: pointer"
width="25"
height="25"
fill="#FACD0B"
class="bi bi-pencil-square"
viewBox="0 0 20 20"
id="botonModificarSubCa"
onclick=""
hidden
>
<path
  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
/>
<path
  fill-rule="evenodd"
  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
/>
</svg>
  </button>
</td>
<td style="cursor:pointer">
                  <button class='button${nombre} btnIcon' id='botonGuardarSubCaBddEx' onclick=" añadirSubCaBddEx('${id}','${nombre}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
                      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
                    </svg>
                  </button>
                  </td>

<td >
  <button class="button${nombre} btnIcon" onclick="borrarSubCaracteristica(event,'${nombre}','ex')">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"  class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>      
  </button>
  
</td>
`;
  tBodySubCaracteristica.appendChild(tr);
  const botonesModificar = document.getElementsByClassName(
    "buttonModificarSub" + nombre
  );
  const arrBotonesMod = [...botonesModificar];
  arrBotonesMod.forEach((b) => {
    b.setAttribute("hidden", "true");
  });
}

async function añadirSubCaBddEx(id, nombre) {
  const subCaracteristica = document.querySelectorAll(
    `.trSubCaracteristica${nombre}`
  );
  let error = false;
  let subCaracteristicas = [...subCaracteristica];
  subCaracteristicas.forEach((s, i) => {
    let validarNombre = true;
    for (let k = i + 1; k < subCaracteristica.length; k++) {
      if (
        s.childNodes[2].childNodes[1].childNodes[1].value ==
        subCaracteristica[k].childNodes[2].childNodes[1].childNodes[1].value
      ) {
        validarNombre = false;
      }
    }
    if (!validarNombre) {
      alerta.alert(
        "error",
        "hay mas de una subCaracteristica con el mismo nombre"
      );
      error = true;
    }
    let variables = [];
    if (
      (s.childNodes[0].childNodes[1].value != "texto" &&
        s.childNodes[0].childNodes[1].value != "numero" &&
        s.childNodes[0].childNodes[1].value != "formula") ||
      s.childNodes[2].childNodes[1].childNodes[1].value == ""
    ) {
      error = true;
    }
    if (s.childNodes[0].childNodes[1].value == "formula") {
      if (s.childNodes[4].childNodes[1].childNodes[1].value == "") {
        return undefined;
      }
      let value = s.childNodes[4].childNodes[1].childNodes[1].value;
      let split = value.split(",");
      let operadores = ["+", "-", "*", "/"];

      for (let il = 0; il < split.length; il++) {
        const element = split[il];
        if (!operadores.includes(element) && isNaN(element)) {
          variables.push(element);
        }
        if (operadores.includes(element)) {
          console.log(split[il - 1], split[il + 1]);
          console.log(operadores.includes(split[il + 1]));
          if (
            operadores.includes(split[il - 1]) ||
            operadores.includes(split[il + 1]) ||
            split[il + 1] == undefined
          ) {
            error = true;
            break;
          }
        } else {
          if (
            !operadores.includes(split[il + 1]) &&
            !operadores.includes(split[il - 1])
          ) {
            error = true;
            break;
          }
        }
      }
      variables.forEach((v) => {
        let validar = false;
        for (let il = 0; il < subCaracteristica.length; il++) {
          if (
            subCaracteristica[il].childNodes[0].childNodes[1].value !=
              "texto" &&
            s.childNodes[2].childNodes[1].childNodes[1].value != v &&
            v == subCaracteristica[il].children[1].children[0].children[0].value
          ) {
            validar = true;
            break;
          }
        }
        if (!validar) {
          error = true;
        }
      });

      if (error) {
        return alerta.alert("Error", "Verifique la sintaxis");
      }
    }
  });
  let sbNuevo = {
    tipo: subCaracteristicas[subCaracteristica.length - 1].childNodes[0]
      .childNodes[1].value,
    valor:
      subCaracteristicas[subCaracteristica.length - 1].childNodes[4]
        .childNodes[1].childNodes[1].value,
    nombre:
      subCaracteristicas[subCaracteristica.length - 1].childNodes[2]
        .childNodes[1].childNodes[1].value,
    idCar: id,
  };
  console.log(sbNuevo);
  try {
    const { token } = await login.getToken();

    const { data } = await axios.post(
      urlsv + "/api/modulo-examenes/insert-subcaracteristica",
      {
        newSubCaracteristica: sbNuevo,
      },
      {
        headers: { token },
      }
    );
    enableButton("añadirSubCaButton");

    examenesAlerta("Sub Caracteristica agregada con exito!", "success");

    return modificarExamen(data.examenId);
  } catch (error) {
    console.log("🚀 ~ añadirSubCaBddEx ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

async function guardarCambioSubCaBdd(id, nombre) {
  const inputNombre = document.getElementById(`inputNombreSubCa${id}`);
  const inputValor = document.getElementById(`inputValorSubCa${id}`);
  const tipo = document.getElementById(`selectSubTipo${id}`);
  const subCaracteristica = document.querySelectorAll(
    `.trSubCaracteristica${nombre}`
  );
  let tr = [...subCaracteristica];
  let error = false;
  tr.forEach((s, i) => {
    let validarNombre = true;
    for (let k = i + 1; k < subCaracteristica.length; k++) {
      if (
        s.childNodes[2].childNodes[1].childNodes[1].value ==
        subCaracteristica[k].childNodes[2].childNodes[1].childNodes[1].value
      ) {
        validarNombre = false;
      }
    }
    if (!validarNombre) {
      alerta.alert(
        "error",
        "hay mas de una subCaracteristica con el mismo nombre"
      );
      return undefined;
    }
    let variables = [];
    if (
      (s.childNodes[0].childNodes[1].value != "texto" &&
        s.childNodes[0].childNodes[1].value != "numero" &&
        s.childNodes[0].childNodes[1].value != "formula") ||
      s.childNodes[2].childNodes[1].childNodes[1].value == ""
    ) {
      return undefined;
    }
    if (s.childNodes[0].childNodes[1].value == "formula") {
      if (s.childNodes[4].childNodes[1].childNodes[1].value == "") {
        return undefined;
      }
      let value = s.childNodes[4].childNodes[1].childNodes[1].value;
      let split = value.split(",");
      let operadores = ["+", "-", "*", "/"];

      for (let il = 0; il < split.length; il++) {
        const element = split[il];
        if (!operadores.includes(element) && isNaN(element)) {
          variables.push(element);
        }
        if (operadores.includes(element)) {
          console.log(split[il - 1], split[il + 1]);
          console.log(operadores.includes(split[i + 1]));
          if (
            operadores.includes(split[il - 1]) ||
            operadores.includes(split[il + 1]) ||
            split[il + 1] == undefined
          ) {
            error = true;
            break;
          }
        } else {
          if (
            !operadores.includes(split[il + 1]) &&
            !operadores.includes(split[il - 1])
          ) {
            error = true;
            break;
          }
        }
      }
      console.log(variables);

      variables.forEach((v) => {
        let validar = false;
        for (let il = 0; il < subCaracteristica.length; il++) {
          if (
            subCaracteristica[il].childNodes[0].childNodes[1].value !=
              "texto" &&
            s.childNodes[2].childNodes[1].childNodes[1].value != v &&
            v == subCaracteristica[il].children[1].children[0].children[0].value
          ) {
            validar = true;
            break;
          }
        }
        if (!validar) {
          error = true;
        }
      });

      if (error == true) {
        return alerta.alert("Error", "Verifique la sintaxis del  valor");
      }
    }
  });
  if (error == true) {
    return;
  }
  let subCa = {
    id_subCaracteristica: id,
    subCaracteristica: {
      nombre: inputNombre.value,
      valor: inputValor.value,
      tipo: tipo.value,
    },
  };
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-subcaracteristica",
      {
        id_subCaracteristica: subCa.id_subCaracteristica,
        subCaracteristica: subCa.subCaracteristica,
      },
      {
        headers: { token },
      }
    );

    console.log("🚀 ~ guardarCambioRgBdd ~ data:", data);

    const inputsSb = document.getElementsByClassName(`inputSb${id}`);
    const arrSb = [...inputsSb];
    arrSb.forEach((e) => {
      if (e.tagName == "SELECT" || e.tagName == "button") {
        e.setAttribute("disabled", "true");
      } else {
        if (e.name == "valor") {
          if (tipo.value == "formula") {
            e.setAttribute("readonly", "true");
          }
        } else {
          e.setAttribute("readonly", "true");
        }
      }
    });
    const botonesModificar = document.getElementsByClassName(
      "buttonModificarSub" + nombre
    );
    const arrBotonesMod = [...botonesModificar];
    arrBotonesMod.forEach((b) => {
      b.removeAttribute("hidden");
    });
    document
      .getElementById("botonGuardarSubCa" + id)
      .setAttribute("hidden", "true");
    enableButton("añadirSubCaButton");

    return examenesAlerta(
      "Sub Caracteristica modificada correctamente",
      "success"
    );
  } catch (error) {
    console.log("🚀 ~ tr.forEach ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

function modificarSubCaForm(id, nombre) {
  const inputsSb = document.getElementsByClassName(`inputSb${id}`);
  const tipo = document.getElementById(`selectSubTipo${id}`);
  console.log(tipo);
  const arrSb = [...inputsSb];
  arrSb.forEach((e) => {
    if (e.tagName == "SELECT" || e.tagName == "button") {
      e.removeAttribute("disabled");
    } else {
      if (e.name == "valor") {
        if (tipo.value == "formula") {
          e.removeAttribute("readonly");
        }
      } else {
        e.removeAttribute("readonly");
      }
    }
  });

  const botonesModificar = document.getElementsByClassName(
    "buttonModificarSub" + nombre
  );
  const arrBotonesMod = [...botonesModificar];
  arrBotonesMod.forEach((b) => {
    b.setAttribute("hidden", "true");
  });
  console.log(arrBotonesMod);
  document.getElementById("botonGuardarSubCa" + id).removeAttribute("hidden");
  console.log(inputsSb);
}

async function modificarRangoForm(id, nombre) {
  const inputRg = document.getElementsByClassName(`inpRg${id}`);
  console.log(inputRg);
  const arrRg = [...inputRg];
  arrRg.forEach((e) => {
    if (e.tagName == "SELECT" || e.tagName == "button") {
      e.removeAttribute("disabled");
    } else {
      e.removeAttribute("readonly");
    }
  });
  const btnModi = document.getElementsByClassName(`buttonModificarRango${id}`);

  const arrBtn = [...btnModi];
  arrBtn.forEach((e) => {
    e.setAttribute("hidden", "true");
  });

  const btnGuardarRg = document.getElementById(`botonGuardarRg${id}`);
  btnGuardarRg.removeAttribute("hidden");
}

async function guardarCambioRgBdd(id, nombre) {
  const rango = document.querySelectorAll(`.trRango${nombre}`);
  let error = false;
  let rangos = [...rango].map((r) => {
    if (r.childNodes[5].childNodes[1].childNodes[1].value == "") {
      if (r.childNodes[7].childNodes[1].childNodes[1].value != "") {
        error = true;
        console.log(1);
        return alerta.alert("Error", "Verifique los campos");
      }
    }
    if (
      r.childNodes[1].childNodes[1].childNodes[1].value == "" ||
      r.childNodes[3].childNodes[1].childNodes[1].value == ""
    ) {
      error = true;
      console.log(2);

      return alerta.alert("Error", "Verifique los campos");
    }

    if (
      parseFloat(r.childNodes[1].childNodes[1].childNodes[1].value) >
        parseFloat(r.childNodes[3].childNodes[1].childNodes[1].value) ||
      parseFloat(r.childNodes[5].childNodes[1].childNodes[1].value) >
        parseFloat(r.childNodes[7].childNodes[1].childNodes[1].value)
    ) {
      error = true;
      console.log(
        r.childNodes[1].childNodes[1].childNodes[1].value +
          ">" +
          r.childNodes[3].childNodes[1].childNodes[1].value
      );
      console.log(
        r.childNodes[5].childNodes[1].childNodes[1].value +
          ">" +
          r.childNodes[7].childNodes[1].childNodes[1].value
      );

      console.log(3);

      return alerta.alert("Error", "Verifique los campos");
    }
  });
  if (error) {
    return;
  }

  let desde = document.getElementById(`desde${id}`).value;
  let hasta = document.getElementById(`hasta${id}`).value;
  let inferior = document.getElementById(`inferior${id}`).value;
  let superior = document.getElementById(`superior${id}`).value;
  let genero = document.getElementById(`selectRg${id}`).value;
  let rangoBdd = {
    desde,
    hasta,
    inferior,
    superior,
    genero,
  };
  console.log(rangoBdd);
  const inputRg = document.getElementsByClassName(`inpRg${id}`);
  console.log(inputRg);
  const arrRg = [...inputRg];
  arrRg.forEach((e) => {
    if (e.tagName == "SELECT" || e.tagName == "button") {
      e.setAttribute("disabled", "true");
    } else {
      e.setAttribute("readonly", "true");
    }
  });
  const btnModi = document.getElementsByClassName(`buttonModificarRango${id}`);

  const arrBtn = [...btnModi];
  arrBtn.forEach((e) => {
    e.removeAttribute("hidden");
  });

  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-rango",
      {
        id_rango: id,
        rango: rangoBdd,
      },
      {
        headers: { token },
      }
    );

    console.log("🚀 ~ guardarCambioRgBdd ~ data:", data);

    const btnGuardarRg = document.getElementById(`botonGuardarRg${id}`);
    btnGuardarRg.setAttribute("hidden", "true");
    return examenesAlerta("Rango modificado correctamente", "success");
  } catch (error) {
    console.log("🚀 ~ guardarCambioRgBdd ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

async function guardarCambioCaracteristicaBdd(id, nombre) {
  const formCaracteristica = document.getElementsByClassName(
    "formCaracteristica" + nombre
  );

  const caracteristica = [...formCaracteristica].map((c) => {
    if (c.name == "imp") {
      return {
        nombre: "impsiempre",
        valor: c.checked ? 1 : 0,
      };
    } else {
      return {
        nombre: c.name,
        valor: c.value,
      };
    }
  });
  let arrayCar = [...formCaracteristica];

  arrayCar.forEach((element) => {
    if (element.type == "checkbox") {
      element.setAttribute("disabled", "true");
    } else {
      element.setAttribute("readonly", "true");
    }
  });
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/update-caracteristica",
      {
        id_caracteristica: id,
        caracteristica,
      },
      {
        headers: { token },
      }
    );

    console.log("🚀 ~ guardarCambioRgBdd ~ data:", data);

    document
      .getElementById("botonModificarCaracteristicaForm" + nombre)
      .removeAttribute("hidden");
    document
      .getElementById("botonGuardarCaracteristica" + nombre)
      .setAttribute("hidden", "true");

    console.log(caracteristica);

    examenesAlerta("Caracteristica modificada con exito!", "success");

    return modificarExamen(data.examenId);
  } catch (error) {
    document
      .getElementById("botonModificarCaracteristicaForm" + nombre)
      .removeAttribute("hidden");
    document
      .getElementById("botonGuardarCaracteristica" + nombre)
      .setAttribute("hidden", "true");
    console.log("🚀 ~ guardarCambioRgBdd ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

function validarSelectTipoBusqueda(value) {
  const input = document.getElementById("inputDescripcionBusqueda");
  const selectSeccionMenu = document.getElementById("seccionExamenSelectMenu");

  switch (value) {
    case "examen":
      buscarExamen();
      selectSeccionMenu.removeAttribute("hidden");
      input.setAttribute("oninput", "buscarExamen()");
      break;

    case "seccion":
      buscarSeccion();
      selectSeccionMenu.setAttribute("hidden", "true");

      input.setAttribute("oninput", "buscarSeccion()");
      break;
    case "categoria":
      buscarCategoria();
      selectSeccionMenu.setAttribute("hidden", "true");
      input.setAttribute("oninput", "buscarCategoria()");
      break;
    case "laboratorio":
      buscarLaboratorio();
      selectSeccionMenu.setAttribute("hidden", "true");
      input.setAttribute("oninput", "buscarLaboratorio()");
      break;
    case "sede":
      buscarSede();
      selectSeccionMenu.setAttribute("hidden", "true");
      input.setAttribute("oninput", "buscarSede()");
      break;
    case "empresa":
      buscarEmpresa();
      selectSeccionMenu.setAttribute("hidden", "true");
      input.setAttribute("oninput", "buscarEmpresa()");
      break;
  }
}

async function detalleSeccion(id) {
  const { token } = await login.getToken();
  const { data: examenes } = await axios.get(
    urlsv + "/api/modulo-examenes/examen-seccion",
    { headers: { token }, params: { idSeccion: id } }
  );
  const collapse = document.getElementById(`collapseMenu${id}`);
  collapse.innerHTML = `
  <table class="table table-sm text-center" style="border: 2px solid green; font-size:15px">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Nombre</th>
      
    </tr>
  </thead>
  <tbody id="tBody${id}">
    
  </tbody>
</table>
  `;
  const tBody = document.getElementById(`tBody${id}`);

  examenes.forEach((c) => {
    tBody.innerHTML += `
    <tr>
      <td scope="col">${c.id}</td>
      <td scope="col">${c.nombre}</td>
      
    </tr>
    `;
  });
}

async function detalleCategoria(id) {
  const { token } = await login.getToken();
  const { data: examenes } = await axios.get(
    urlsv + "/api/modulo-examenes/examen-categoria",
    { headers: { token }, params: { idSeccion: id } }
  );
  const collapse = document.getElementById(`collapseMenu${id}`);
  collapse.innerHTML = `
  <table class="table table-sm text-center" style="border: 2px solid green; font-size:15px">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Nombre</th>
      
    </tr>
  </thead>
  <tbody id="tBody${id}">
    
  </tbody>
</table>
  `;
  const tBody = document.getElementById(`tBody${id}`);

  examenes.forEach((c) => {
    tBody.innerHTML += `
    <tr>
      <td scope="col">${c.id}</td>
      <td scope="col">${c.nombre}</td>
      
    </tr>
    `;
  });
}
async function detalleExamen(id) {
  const { token } = await login.getToken();
  const { data: caracteristicas } = await axios.get(
    urlsv + "/api/modulo-examenes/caracteristicas-id_ex",
    { headers: { token }, params: { id } }
  );
  console.log(caracteristicas)
  const collapse = document.getElementById(`collapseMenu${id}`);
  collapse.innerHTML = `
  <table class="table table-sm text-center" style="border: 2px solid green; font-size:15px">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Unidad</th>
      <th scope="col">Posicion</th>
      <th scope="col">Imprimir</th>
    </tr>
  </thead>
  <tbody id="tBody${id}">
    
  </tbody>
</table>
  `;
  const tBody = document.getElementById(`tBody${id}`);
  let caracteristicas2=caracteristicas.sort(function (a, b) {
    
    if (a.posicion > b.posicion) {
      return 1;
    }
    if (a.posicion < b.posicion) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  caracteristicas2.forEach((c) => {
    if(c.status=='titulo'){
      tBody.innerHTML += `
      <tr>
        <th colspan="4" scope="col">${c.titulo}</th>
        
      </tr>
      `;
    }else{
      tBody.innerHTML += `
      <tr>
        <td scope="col">${c.nombre}</td>
        <td scope="col">${c.unidad}</td>
        <td scope="col">${c.posicion}</td>
        <td scope="col">${c.impsiempre == 1 ? "SI" : "NO"}</td>
      </tr>
      `;
    }
    
  });
}

function buscarSeccion() {
  input = document.getElementById("inputDescripcionBusqueda");
  filtro = seccionesData.filter((sc) =>
    sc.nombre.toLowerCase().includes(input.value.toLowerCase())
  );

  const menuCreacionUl = document.getElementById("menuCreacionUl");

  menuCreacionUl.innerHTML = "";
  filtro.map((sc) => {
    menuCreacionUl.innerHTML += `
    <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
              <div class="col-10">
                <span class="">${sc.nombre}</span>

              </div>
              <div class="col-2 d-flex justify-content-end align-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" onclick="detalleSeccion(${sc.id})" aria-expanded="false" aria-controls="collapseMenu${sc.id}" data-bs-toggle="collapse" data-bs-target="#collapseMenu${sc.id}" fill="green" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
                <svg
              xmlns="http://www.w3.org/2000/svg"
              style="cursor: pointer"
              width="30"
              height="30"
              fill="#FACD0B"
              class="bi bi-pencil-square mx-3"
              viewBox="0 0 20 20"
              id="botonModificar"
              data-bs-dismiss="modal"
              onclick=modificarSeccionModal(${sc.id},'${sc.nombre}')
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              /></svg>

              
              
              <svg xmlns="http://www.w3.org/2000/svg" onclick="borrarSeccionBdd('${sc.id}')" style="cursor:pointer" data-bs-dismisss="modal" width="24" height="24" fill="red" class="bi bi-x-circle " viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              </div>

            </div>
          </li> 
          <div class="collapse" id="collapseMenu${sc.id}">
          <div class="card card-body">
\          </div>
          </div> 


    `;
  });
}

async function borrarSeccionBdd(id){
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/delete-seccion",
      {
        id
      },
      {
        headers: { token },
      }
    );

    return examenesAlerta("Seccion Anulada con exito!", "success")
    
  } catch (error) {
    console.log(error)
  }
  
}



function buscarSede() {
  input = document.getElementById("inputDescripcionBusqueda");
  filtro = sedesData.filter((sc) =>
    sc.nombre.toLowerCase().includes(input.value.toLowerCase())
  );

  const menuCreacionUl = document.getElementById("menuCreacionUl");

  menuCreacionUl.innerHTML = "";
  filtro.map((sc) => {
    menuCreacionUl.innerHTML += `
    <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
              <div class="col-10">
                <span class="">${sc.nombre}</span>

              </div>
              <div class="col-2 d-flex justify-content-end align-content-center">
              
                <svg
              xmlns="http://www.w3.org/2000/svg"
              style="cursor: pointer"
              width="30"
              height="30"
              fill="#FACD0B"
              class="bi bi-pencil-square mx-3"
              viewBox="0 0 20 20"
              id="botonModificar"
              data-bs-dismiss="modal"
              onclick=modificarSedeModal(${sc.id},'${sc.nombre}')
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              /></svg>

              
              
              <svg xmlns="http://www.w3.org/2000/svg" onclick='borrarSedeBdd("${sc.id}")' data-bs-dismiss="modal" style='cursor:pointer' width="24" height="24" fill="red" class="bi bi-x-circle " viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              </div>

            </div>
          </li> 
          


    `;
  });
}

async function borrarSedeBdd(id){
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/delete-sede",
      {
        id
      },
      {
        headers: { token },
      }
    );

    return examenesAlerta("Sede Anulada con exito!", "success")
    
  } catch (error) {
    console.log(error)
  }
  
}


function buscarCategoria() {
  input = document.getElementById("inputDescripcionBusqueda");
  filtro = categoriasData.filter((sc) =>
    sc.nombre.toLowerCase().includes(input.value.toLowerCase())
  );

  const menuCreacionUl = document.getElementById("menuCreacionUl");

  menuCreacionUl.innerHTML = "";
  filtro.map((sc) => {
    menuCreacionUl.innerHTML += `
    <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
              <div class="col-10">
                <span class="">${sc.nombre}</span>

              </div>
              <div class="col-2 d-flex justify-content-end align-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" onclick="detalleCategoria(${sc.id})" aria-expanded="false" aria-controls="collapseMenu${sc.id}" data-bs-toggle="collapse" data-bs-target="#collapseMenu${sc.id}" fill="green" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
                <svg
              xmlns="http://www.w3.org/2000/svg"
              style="cursor: pointer"
              width="30"
              height="30"
              fill="#FACD0B"
              class="bi bi-pencil-square mx-3"
              viewBox="0 0 20 20"
              id="botonModificar"
              data-bs-dismiss="modal"
              onclick=modificarCategoriaModal(${sc.id},'${sc.nombre}')
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              /></svg>

              
              
              <svg xmlns="http://www.w3.org/2000/svg" onclick="borrarCategoriaBdd('${sc.id}')" style="cursor:pointer" data-bs-dismiss="modal" width="24" height="24" fill="red" class="bi bi-x-circle " viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              </div>

            </div>
          </li> 
          <div class="collapse" id="collapseMenu${sc.id}">
          <div class="card card-body">
\          </div>
          </div> 


    `;
  });
}

async function borrarCategoriaBdd(id){
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/delete-categoria",
      {
        id
      },
      {
        headers: { token },
      }
    );

    return examenesAlerta("Categoria Anulada con exito!", "success")
    
  } catch (error) {
    console.log(error)
  }
  
}

function buscarLaboratorio() {
  input = document.getElementById("inputDescripcionBusqueda");
  filtro = laboratoriosData.filter((sc) =>
    sc.razon_social.toLowerCase().includes(input.value.toLowerCase())
  );

  const menuCreacionUl = document.getElementById("menuCreacionUl");

  menuCreacionUl.innerHTML = "";
  filtro.map((sc) => {
    menuCreacionUl.innerHTML += `
    <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
              <div class="col-10">
                <span class="">${sc.razon_social}</span>

              </div>
              <div class="col-2 d-flex justify-content-end align-content-center">
                <svg
              xmlns="http://www.w3.org/2000/svg"
              style="cursor: pointer"
              width="30"
              height="30"
              fill="#FACD0B"
              class="bi bi-pencil-square mx-3"
              viewBox="0 0 20 20"
              id="botonModificar"
              data-bs-dismiss="modal"
              onclick=modificarLaboratorioModal(${sc.id},'${sc.razon_social}','${sc.telefono}','${sc.rif}','${sc.direccion}')
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              /></svg>

              
              
              <svg xmlns="http://www.w3.org/2000/svg" data-bs-dismiss="modal" onclick="borrarLaboratorioBdd('${sc.id}')" style="cursor:pointer" width="24" height="24" fill="red" class="bi bi-x-circle " viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              </div>

            </div>
          </li> 
          
          </div>
          </div> 


    `;
  });
}

async function borrarLaboratorioBdd(id){
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/delete-laboratorio",
      {
        id
      },
      {
        headers: { token },
      }
    );

    return examenesAlerta("Laboratorio Anulado con exito!", "success")
    
  } catch (error) {
    console.log(error)
  }
  
}

function buscarExamen() {
  input = document.getElementById("inputDescripcionBusqueda");
  filtro = examenes.filter((ex) =>
    ex.nombre.toLowerCase().includes(input.value.toLowerCase())
  );
  const menuCreacionUl = document.getElementById("menuCreacionUl");

  menuCreacionUl.innerHTML = "";
  filtro.map((ex) => {
    menuCreacionUl.innerHTML += `
    <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
              <div class="col-10">
                <span class="">${ex.nombre}</span>

              </div>
              <div class="col-2 d-flex justify-content-end align-content-center">
              <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" fill="green" aria-expanded="false" aria-controls="collapseMenu${ex.id}" data-bs-toggle="collapse" data-bs-target="#collapseMenu${ex.id}" onclick="detalleExamen(${ex.id})"class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
              
                <svg
              xmlns="http://www.w3.org/2000/svg"
              style="cursor: pointer"
              width="30"
              height="30"
              fill="#FACD0B"
              class="bi bi-pencil-square mx-3"
              viewBox="0 0 20 20"
              id="botonModificar"
              onclick="modificarExamen('${ex.id}')"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              /></svg>
              
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" style='cursor:pointer' data-bs-dismiss="modal" onclick="borrarExamenBdd('${ex.id}')" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              </div>

            </div>
          </li> 
          <div class="collapse" id="collapseMenu${ex.id}">
          <div class="card card-body">
          </div>
          </div> 


    `;
  });
}

async function borrarExamenBdd(id){
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/delete-examen",
      {
        id
      },
      {
        headers: { token },
      }
    );

    return examenesAlerta("Examen Anulado con exito!", "success")
    
  } catch (error) {
    console.log(error)
  }
  
}

function buscarEmpresa() {
  input = document.getElementById("inputDescripcionBusqueda");
  filtro = empresasData.filter((ex) =>
    ex.nombre.toLowerCase().includes(input.value.toLowerCase())
  );
  const menuCreacionUl = document.getElementById("menuCreacionUl");

  menuCreacionUl.innerHTML = "";
  filtro.map((ex) => {
    menuCreacionUl.innerHTML += `
    <li class="list-group-item list-group-item-light list-group-item-action" >
            <div class="row">
              <div class="col-10">
                <span class="">${ex.nombre}</span>

              </div>
              <div class="col-2 d-flex justify-content-end align-content-center">

                <svg
              xmlns="http://www.w3.org/2000/svg"
              style="cursor: pointer"
              width="30"
              height="30"
              fill="#FACD0B"
              class="bi bi-pencil-square mx-3"
              viewBox="0 0 20 20"
              id="botonModificar"
              onclick="modificarEmpresaModal('${ex.id}','${ex.nombre}')"
            >
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              /></svg>
              
              <svg xmlns="http://www.w3.org/2000/svg" data-bs-dismiss="modal" style="cursor:pointer" onclick="borrarEmpresaBdd('${ex.id}')" width="24" height="24" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
              </div>

            </div>
          </li> 
          <div class="collapse" id="collapseMenu${ex.id}">
          <div class="card card-body">
          </div>
          </div> 


    `;
  });
}


async function borrarEmpresaBdd(id){
  try {
    const { token } = await login.getToken();
    const { data } = await axios.put(
      urlsv + "/api/modulo-examenes/delete-empresa",
      {
        id
      },
      {
        headers: { token },
      }
    );

    return examenesAlerta("Empresa Anulada con exito!", "success")
    
  } catch (error) {
    console.log(error)
  }
  
}

function disabledButton(id) {
  document.getElementById(id).setAttribute("disabled", "true");
}

function enableButtonByClass(id) {
  const botones = document.getElementsByClassName(id);
  const arrBotones = [...botones];
  arrBotones.forEach((bt) => {
    if (bt.className.includes("btnIcon")) {
      bt.removeAttribute("hidden");
    }
    bt.removeAttribute("disabled");
  });
}
function disabledButtonByClass(id) {
  const botones = document.getElementsByClassName(id);
  const arrBotones = [...botones];
  arrBotones.forEach((bt) => {
    if (bt.className.includes("btnIcon")) {
      bt.setAttribute("hidden", "true");
    }
    bt.setAttribute("disabled", "true");
  });
}
function enableButton(id) {
  document.getElementById(id).removeAttribute("disabled");
}

function desactivarInputs(nombre) {
  const inputs = document.getElementsByClassName("input" + nombre);
  const arrInputs = [...inputs];
  arrInputs.forEach((inp) => {
    inp.setAttribute("readonly", "true");
  });
}

function activarInputs(nombre) {
  const inputs = document.getElementsByClassName("input" + nombre);
  const arrInputs = [...inputs];
  arrInputs.forEach((inp) => {
    inp.removeAttribute("readonly");
  });
}

function activarSelects(nombre) {
  const selects = document.getElementsByClassName("select" + nombre);
  const arrSelects = [...selects];
  arrSelects.forEach((sl) => {
    sl.removeAttribute("disabled");
  });
}

function desactivarSelects(nombre) {
  const selects = document.getElementsByClassName("select" + nombre);
  const arrSelects = [...selects];
  arrSelects.forEach((sl) => {
    sl.setAttribute("disabled", "true");
  });
}

function borrarTitulo(event,nombre,titulo){
  const accordion = document.getElementById("accordionCaracteristicas");
  
  const accordionCar = document.getElementById(
    `accordionItemCaracteristica${nombre}`
  );
  console.log(accordionCar);
  caracteristicasCreadas.delete(nombre);
  accordion.removeChild(accordionCar);

  

  titulosArray=titulosArray.filter(e=>e.titulo!=titulo)

}

function modificarTitulo(nombre,titulo){
  const buttonMod= document.getElementById(`botonModificarTitulo${nombre}`)
  const buttonGuardar= document.getElementById(`botonGuardarTitulo${nombre}`)
  const tituloInp= document.getElementById(`inputTitulo${nombre}`)
  const posicionInp= document.getElementById(`inputPosicion${nombre}`)
  const accordionCar = document.getElementById(
    `accordionItemCaracteristica${nombre}`
  );
  accordionCar.id='auxiliar'

  tituloInp.removeAttribute('disabled')
  posicionInp.removeAttribute('disabled')
  buttonGuardar.removeAttribute('hidden')
  buttonMod.setAttribute('hidden','true')
  titulosArray=titulosArray.filter(e=>e.titulo!=titulo)
  caracteristicasCreadas.delete(nombre)


}

function guardarTitulo(nombre2){
  const tituloInp= document.getElementById(`inputTitulo${nombre2}`)
  const posicionInp= document.getElementById(`inputPosicion${nombre2}`)
  const buttonMod= document.getElementById(`botonModificarTitulo${nombre2}`)
  const buttonGuardar= document.getElementById(`botonGuardarTitulo${nombre2}`)
  const buttonBorrar= document.getElementById(`botonBorrarTitulo${nombre2}`)
  const accordionCar = document.getElementById(
    `auxiliar`
  );

  const collapseTitulo= document.getElementById(`collapseTitulo${nombre2}`)
  let nombre1 = tituloInp.value
  let posicion = posicionInp.value
  
  nombre1 = nombre1.trim();
  if (nombre1 == "") {
    return alerta.alert("Error", "El nombre no puede estar vacio");
  }

  const nombre = nombre1
  .replaceAll(" ", "-")
  .replaceAll("(", "-")
  .replaceAll(")", "-")
  .replaceAll(".", "-")
  .replaceAll("+", "-")
  .replaceAll("/", "-");
  if (caracteristicasCreadas.has(nombre)) {
    return alerta.alert("Error", "Ya existe una caracteristica con ese nombre");
  } else {
    caracteristicasCreadas.add(nombre);
  }
  tituloInp.setAttribute('disabled','true')
  posicionInp.setAttribute('disabled','true')
  buttonGuardar.setAttribute('hidden','true')
  buttonMod.removeAttribute('hidden')
  buttonMod.setAttribute('onclick',`modificarTitulo('${nombre}','${nombre1}')`)
  buttonGuardar.setAttribute('onclick',`guardarTitulo('${nombre}')`)
  buttonBorrar.setAttribute('onclick',`borrarTitulo(event,'${nombre}','${nombre1}')`)
  accordionCar.id=`accordionItemCaracteristica${nombre}`


  collapseTitulo.innerText=`${nombre1}  --- TITULO`
  titulosArray.push({
    titulo:nombre1,
    posicion
  })

}


function añadirAcordionItemTitulo(idEx) {
  let nombreInp = document.getElementById("inputTitulo")
  let posicionInp = document.getElementById("inputPosicion")
  
  let posicion=posicionInp.value;
  let nombre1= nombreInp.value;
  console.log(nombreInp,nombre1)
  nombre1 = nombre1.trim();
  if (nombre1 == "") {
    return alerta.alert("Error", "El nombre no puede estar vacio");
  }
  const nombre = nombre1
    .replaceAll(" ", "-")
    .replaceAll("(", "-")
    .replaceAll(")", "-")
    .replaceAll(".", "-")
    .replaceAll("+", "-")
    .replaceAll("/", "-");

  const accordionCaracteristicas = document.getElementById(
    "accordionCaracteristicas"
  );
  if (caracteristicasCreadas.has(nombre)) {
    if(nombre!=""){
      return alerta.alert("Error", "Ya existe una caracteristica con ese nombre");
    }
  } else {
    caracteristicasCreadas.add(nombre);
  }

  const divItem = document.createElement("div");
  divItem.className = `accordion-item acordionItemCaracteristica`;
  divItem.id = `accordionItemCaracteristica${nombre}`;

  divItem.innerHTML = `
  
  
  <h2 class="accordion-header headerCaracteristica"  >
    <button class="accordion-button collapsed" id="collapseTitulo${nombre}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCaracteristica${nombre}" aria-expanded="false" aria-controls="collapseCaracteristica${nombre}">
     ${nombre1}  --- TITULO
    </button>
    
  </h2>
  <div id="collapseCaracteristica${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionItemCaracteristica">
    <div class="accordion-body m-0 p-0 text-center" id="accordionBodyCaracteristica${nombre}">
    
      <div class="row my-3" style="font-size:medium">
      <div class='col-2'>
        <label
        for="inputTitulo${nombre}"
        name="titulo"
        class="form-label formCaracteristica "
        >Titulo</label
      > 
        </div>
        
        <div class="col-2">
        
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputTitulo${nombre}"
            placeholder="Titulo"
            disabled
            value="${nombre1}"
          />
        </div>
        <div class="col-2">
        <label
    for="inputPosicion${nombre}"
    name="posicion"
    class="form-label formCaracteristica"
    >Posicion</label>
  
        </div>
        <div class='col-2'>
        <input
    type="number"
    min='0'
    step='1'
    value="${posicion}"
    class="form-control form-control-sm"
    id="inputPosicion${nombre}"
    placeholder="Posicion"
    disabled
  />
        </div>
        <div class='col-4'>
          <div class='row'>
            <div class='col'>
            <button class='button${nombre} btnIcon'>
            
            <svg
            xmlns="http://www.w3.org/2000/svg"
            style="cursor: pointer"
            width="40"
            height="40"
            fill="#FACD0B"
            class="bi bi-pencil-square botonModificarTitulo${nombre}"
            viewBox="0 0 20 20"
            id="botonModificarTitulo${nombre}"
            onclick="modificarTitulo('${nombre}','${nombre1}')"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
            />
          </svg>
          </button>
          </div>
            <div class='col'><button class='button${nombre} btnIcon' id="botonBorrarTitulo${nombre}" onclick="borrarTitulo(event,'${nombre}','${nombre1}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
            </button></div>
            <div class='col'>
              <button class='button${nombre} btnIcon'id="botonGuardarTitulo${nombre}" onclick="guardarTitulo('${nombre}')" hidden>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
                </svg>
              </button>
            </div>


          </div>

        





        </div>
        
      </div>
      
    
  
      </div>

  </div>


  `;

  accordionCaracteristicas.appendChild(divItem);
  titulosArray.push({
    titulo:nombre1,
    posicion
  })

  nombreInp.value=''
  posicionInp.value=''
}

async function añadirTituloBdd(idEx){
  let nombre1 = document.getElementById("inputTitulo").value;
  let posicion = document.getElementById("inputPosicion").value;
  if (nombre1 == "") {
    nombre1=`${idEx}-${caracteristicasCreadas.length}-Vacio`
  }
  const nombre = nombre1
    .replaceAll(" ", "-")
    .replaceAll("(", "-")
    .replaceAll(")", "-")
    .replaceAll(".", "-")
    .replaceAll("+", "-")
    .replaceAll("/", "-");

  const accordionCaracteristicas = document.getElementById(
    "accordionCaracteristicas"
  );
  if (caracteristicasCreadas.has(nombre)) {
    return alerta.alert("Error", "Ya existe una caracteristica con ese nombre");
  } 

  try {
    const { token } = await login.getToken();
    const titulo = await axios.post(
      urlsv + `/api/modulo-examenes/crear-titulo`,
      {
        titulo:nombre1,
        posicion,
        id_ex:idEx
      },
      { headers: { token } }
    );
    examenesAlerta("Titulo creado con exito!", "success");
    return modificarExamen(idEx);

  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }

}

function validarNombreCaracteristica(mod, idEx) {
  const nombre = document.getElementById("inputCaracteristica");
  if (mod == true) {
    añadirAcordionItemEx(nombre.value, idEx);
  } else {
    añadirAcordionItem(nombre.value);
  }
  nombre.value=''
}
function validarSelectSub(nombre, event) {
  if (event.target.value == "formula") {
    const trsSubCaracteristicas = document.querySelectorAll(
      `.trSubCaracteristica${nombre}`
    );
    const arrSub = [...trsSubCaracteristicas];
    let validacionInputsTxt = false;
    arrSub.forEach((tr) => {
      if (tr.firstChild.children[0].value == "numero") {
        validacionInputsTxt = true;
      }
    });

    if (!validacionInputsTxt) {
      event.target.value = "numero";
      return alerta.alert(
        "Error:",
        "Debe Haber al menos un campo de numero para poder seleccionar Formula"
      );
    }

    event.target.parentNode.parentNode.children[2].firstElementChild.children[0].removeAttribute(
      "readonly"
    );
  } else {
    event.target.parentNode.parentNode.children[2].firstElementChild.children[0].setAttribute(
      "readonly",
      "true"
    );
    event.target.parentNode.parentNode.children[2].firstElementChild.children[0].value =
      "";
  }
}

function añadirChars(char, event) {
  console.log(event);
  event.target.parentNode.children[0].value += char;
}

async function borrarSubCaracteristica(event, nombre, ex, id) {
  try {
    enableButton("añadirSubCaButton");
  } catch (error) {}
  try {
    if (id) {
      const { token } = await login.getToken();
      const { data } = await axios.delete(
        urlsv + "/api/modulo-examenes/delete-subcaracteristica",
        {
          headers: { token },
          data: { id_subCa: id },
        }
      );
    }
    const tBody = document.getElementById(`tBodySubCaracteristica${nombre}`);
    if (event.target.localName == "button") {
      tBody.removeChild(event.target.parentNode.parentNode);
    }

    if (event.target.localName == "svg") {
      tBody.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    if (event.target.localName == "path") {
      tBody.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
      );
    }
    if (ex == "ex") {
      const botonesModificar = document.getElementsByClassName(
        "buttonModificarSub" + nombre
      );
      const arrBotonesMod = [...botonesModificar];
      arrBotonesMod.forEach((b) => {
        b.removeAttribute("hidden");
      });
    }
    examenesAlerta("Sub Caracteristica Anulada con exito", "warning");
  } catch (error) {
    console.log("🚀 ~ borrarSubCaracteristica ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}
async function borrarResultado(event, nombre, id) {
  try {
    enableButton("añadirResultadoButton");
  } catch (error) {}

  try {
    if (id) {
      const { token } = await login.getToken();
      const { data } = await axios.delete(
        urlsv + "/api/modulo-examenes/delete-resultado",
        {
          headers: { token },
          data: { id_resultado: id },
        }
      );
    }

    const tBody = document.getElementById(`tBodyResultados${nombre}`);
    if (event.target.localName == "button") {
      tBody.removeChild(event.target.parentNode.parentNode);
    }

    if (event.target.localName == "svg") {
      tBody.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    if (event.target.localName == "path") {
      tBody.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
      );
    }
    examenesAlerta("Resultado eliminado con exito", "warning");
  } catch (error) {
    console.log("🚀 ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}
async function borrarRango(event, nombre, id) {
  try {
    enableButton("añadirRangoButton");
  } catch (error) {}
  try {
    if (id) {
      const { token } = await login.getToken();
      const { data } = await axios.delete(
        urlsv + "/api/modulo-examenes/delete-rango",
        {
          headers: { token },
          data: { id_rango: id },
        }
      );
    }
    const tBody = document.getElementById(`tBodyRangos${nombre}`);

    console.log(event.target);
    if (event.target.localName == "button") {
      tBody.removeChild(event.target.parentNode.parentNode);
    }

    if (event.target.localName == "svg") {
      tBody.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    if (event.target.localName == "path") {
      tBody.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
      );
    }
    examenesAlerta("Rango eliminado con exito", "warning");
  } catch (error) {
    console.log("🚀 ~ borrarRango ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}
async function borrarCaracteristicaForm(nombre, id) {
  try {
    const { token } = await login.getToken();
    const { data } = await axios.delete(
      urlsv + "/api/modulo-examenes/delete-caracteristica",
      {
        headers: { token },
        data: { id_ca: id },
      }
    );
    examenesAlerta("Caracteristica Anulada con exito", "warning");
    caracteristicasCreadas.delete(nombre);
    return modificarExamen(data.examenId);
  } catch (error) {
    console.log("🚀 ~ borrarCaracteristicaForm ~ error:", error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

function añadirSubCaracteristica(nombre) {
  const trsSubCaracteristica = document.getElementsByClassName(
    "trSubCaracteristica" + nombre
  );
  if (trsSubCaracteristica.length >= 8) {
    return;
  }

  const tBodySubCaracteristica = document.getElementById(
    "tBodySubCaracteristica" + nombre
  );
  const tr = document.createElement("tr");
  tr.className = "trSubCaracteristica" + nombre;
  tr.innerHTML = `<th scope="row">
  <select onChange='validarSelectSub("${nombre}",event)' class="form-select form-control-sm select${nombre} formSubCaracteristica${nombre}" name="select"  aria-label="Default select example">
    <option value="texto">Texto</option>
    <option value="numero">Numero</option>
    <option value="formula">Formula</option>
  </select>
</th>
<td>
  <div
    class="mb-3 d-flex align-items-center justify-content-center"
  >

    <input
      name="nombre"
      type="text"
      class="form-control-sm mx-2 input${nombre} formSubCaracteristica${nombre}"
      
      
    />
  </div>
</td>
<td>
  
<div class="input-group">
<input type="text" name='valor' onchange="validarInputFormula('${nombre}',event)" readonly class="form-control-sm mx-2 input${nombre} formSubCaracteristica${nombre}" placeholder="{v} - [+-*/] - ({a}[/]{b})" aria-label="">
  
</div>
</td>

<th scope="row"></th>
<td>
  <button class="button${nombre} btnIcon" onclick="borrarSubCaracteristica(event,'${nombre}')">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"  class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>      
  </button>
  
</td>
`;
  tBodySubCaracteristica.appendChild(tr);
}

function añadirRango(nombre) {
  const trsRango = document.getElementsByClassName("trRango" + nombre);
  if (trsRango.length >= 5) {
    return;
  }

  const tBodyRango = document.getElementById("tBodyRangos" + nombre);
  const tr = document.createElement("tr");
  tr.className = "trRango" + nombre;
  tr.innerHTML = `
  <td>
  <div
    class="mb-3 d-flex align-items-center justify-content-center"
  >

    <input
      
      name="inferior"
      type="text"
      onChange="validarInferior(event,'inferior')"
      class="form-control-sm mx-2 input${nombre} w-50 formRango"
      id="exampleFormControlInput2"
    />
  </div>
</td>
<td>
  <div
  class="mb-3 d-flex align-items-center justify-content-center"
>
 
  <input
    onChange="validarInferior(event,'superior')"
    name="superior"
    type="text"
    class="form-control-sm mx-2 w-50 input${nombre} formRango"
    id="exampleFormControlInput2"
  />
</div>
</td>
<td>
  <div
    class="mb-3 d-flex align-items-center justify-content-center"
  >

    <input
      onChange="validarInferiorEdad(event,'inferior')"
      name="desde"
      type="text"
      class="form-control-sm mx-2 w-50 input${nombre} formRango"
      id="exampleFormControlInput2"
    />
  </div>
</td>
<td>
  <div
  class="mb-3 d-flex align-items-center justify-content-center"
>
 
  <input
    onChange="validarInferiorEdad(event,'superior')"
    name="hasta"
    type="text"
    class="form-control-sm mx-2 w-50 input${nombre} formRango"
    id="exampleFormControlInput2"
  />
</div>
</td>
<th scope="row">
  <select class="form-select form-control-sm select${nombre} formRango" name="genero" aria-label="Default select example">
    <option value="todos">Genero</option>
    <option value="masculino">Masculino</option>
    <option value="femenino">Femenino</option>
  </select>
</th>
<th scope="row"> </th>
<td>
  <button class="button${nombre} btnIcon" onclick="borrarRango(event,'${nombre}')">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"  class="bi bi-x-circle " viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>     
  </button>
  
</td>
  `;
  tBodyRango.appendChild(tr);
}

function añadirResultado(nombre) {
  const trsResultados = document.getElementsByClassName("trResultados");
  if (trsResultados.length >= 10) {
    return;
  }
  const tBodyResultados = document.getElementById("tBodyResultados" + nombre);
  const tr = document.createElement("tr");
  tr.className = "trResultados" + nombre;
  tr.innerHTML = `
  <td><div
                                    class="mb-3 d-flex align-items-center justify-content-center"
                                  >
                                  
                                   
                                    <input
                                      onChange="validarResultado(event)"
                                      name="resultado"
                                      type="text"
                                      class="form-control-sm input${nombre} mx-2 w-100 formResultado"
                                      
                                    />
                                  </div></td>
                                  <th scope="row"> </th>
                                  <td >
                                    <button class="button${nombre} btnIcon" onclick="borrarResultado(event,'${nombre}')">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                      </svg>    
                                    </button>
                                    
                                  </td>
  `;
  tBodyResultados.appendChild(tr);
}

async function crearExamen() {
  const nombre = document.getElementById("inputNombreExamen").value;
  const seccion = document.getElementById("seccionExamenSelect").value;
  const categoria = document.getElementById("categoriaExamenSelect").value;
  if (seccion == "" || categoria == "") {
    return examenesAlerta(
      "Ingrese una Categoria y una Seccion valida",
      "warning"
    );
  }
  console.log(nombre, seccion, categoria);
  console.log(caracteristicas);
  caracteristicas.forEach(e=>{
    if(e.caracteristica[0].valor.includes('-EMPTY0023')){
      e.caracteristica[0].valor=''
    }
  })
  if (nombre == "" || !nombre) {
    return examenesAlerta("Ingrese un nombre de examen valido", "warning");
  }
  try {
    const { token } = await login.getToken();
    const { data } = await axios.post(
      urlsv + "/api/modulo-examenes/crear-examen",
      { nombre, seccion, caracteristicas, categoria,titulos:titulosArray },
      { headers: { token } }
    );
    examenesAlerta(
      "El examen y sus caracteristicas han sido agregados correctamente",
      "success"
    );
    return modificarExamen(data.examenId);
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

async function crearSeccion() {
  const ratio = document.getElementsByName("inputTipoSeccion");
  let arrRatio = [...ratio];

  let value = arrRatio.find((e) => e.checked == true);

  const nombreInp = document.getElementById("inputSeccion");
  const nombre= nombreInp.value

  if (nombre == "") {
    return alerta.alert("Error:", "El nombre no puede estar vacio");
  }
  try {
    const { token } = await login.getToken();
    const seccion = await axios.post(
      urlsv + `/api/modulo-examenes/crear-${value.value}`,
      {
        nombre,
      },
      { headers: { token } }
    );
    nombreInp.value=''
    render();
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

async function crearSede() {
  const nombreInp = document.getElementById("nombreSede")
  const nombre=nombreInp.value
  const clave = document.getElementById("claveSede").value;

  if (nombre == "" || isNaN(clave) || clave == "") {
    return alerta.alert("Error:", "Ingrese un nombre o clave valida");
  }
  try {
    const { token } = await login.getToken();
    const sede = await axios.post(
      urlsv + `/api/modulo-examenes/crear-sede`,
      {
        nombre,
        clave,
      },
      { headers: { token } }
    );
    nombreInp.value=''
    await render();
  } catch (error) {
    console.log(error);
    if (error.response?.data?.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
}

function crearCaracteristica(nombre) {
  const formCaracteristicas = document.getElementsByClassName(
    "formCaracteristica" + nombre
  );

  const caracteristica = [...formCaracteristicas].map((c) => {
    if (c.name == "imp") {
      return {
        nombre: "impsiempre",
        valor: c.checked ? 1 : 0,
      };
    } else {
      return {
        nombre: c.name,
        valor: c.value,
      };
    }
  });


  const subCaracteristica = document.querySelectorAll(
    `.trSubCaracteristica${nombre}`
  );

  let subCaracteristicas = [...subCaracteristica].map((s, i) => {
    let validarNombre = true;
    for (let k = i + 1; k < subCaracteristica.length; k++) {
      if (
        s.childNodes[2].childNodes[1].childNodes[1].value ==
        subCaracteristica[k].childNodes[2].childNodes[1].childNodes[1].value
      ) {
        validarNombre = false;
      }
    }
    if (!validarNombre) {
      alerta.alert(
        "error",
        "hay mas de una subCaracteristica con el mismo nombre"
      );
      return undefined;
    }
    let variables = [];
    if (
      (s.childNodes[0].childNodes[1].value != "texto" &&
        s.childNodes[0].childNodes[1].value != "numero" &&
        s.childNodes[0].childNodes[1].value != "formula") ||
      s.childNodes[2].childNodes[1].childNodes[1].value == ""
    ) {
      return undefined;
    }
    if (s.childNodes[0].childNodes[1].value == "formula") {
      if (s.childNodes[4].childNodes[1].childNodes[1].value == "") {
        return undefined;
      }
      let variables = [];
      let error = false;
      let operadores = ["+", "-", "*", "/"];
      let value = s.childNodes[4].childNodes[1].childNodes[1].value;
      let split = value.split(",");

      for (let i = 0; i < split.length; i++) {
        const element = split[i];
        if (!operadores.includes(element) && isNaN(element)) {
          variables.push(element);
        }
        if (operadores.includes(element)) {
          console.log(split[i - 1], split[i + 1]);
          console.log(operadores.includes(split[i + 1]));
          if (
            operadores.includes(split[i - 1]) ||
            operadores.includes(split[i + 1]) ||
            split[i + 1] == undefined
          ) {
            error = true;
            break;
          }
        } else {
          if (
            !operadores.includes(split[i + 1]) &&
            !operadores.includes(split[i - 1])
          ) {
            error = true;
            break;
          }
        }
      }

      if (error) {
        return undefined;
      }
    }

    return {
      tipo: s.childNodes[0].childNodes[1].value,
      nombre: s.childNodes[2].childNodes[1].childNodes[1].value,
      valor: s.childNodes[4].childNodes[1].childNodes[1].value,
    };
  });

  subCaracteristicas = subCaracteristicas.filter((s) => s != undefined);

  const rango = document.querySelectorAll(`.trRango${nombre}`);
  console.log(rango);

  let rangos = [...rango].map((r) => {
    if (r.childNodes[5].childNodes[1].childNodes[1].value == "") {
      if (r.childNodes[7].childNodes[1].childNodes[1].value == "") {
        return undefined;
      }
    }
    if (
      r.childNodes[1].childNodes[1].childNodes[1].value == "" ||
      r.childNodes[3].childNodes[1].childNodes[1].value == ""
    ) {
      return undefined;
    }

    if (
      parseFloat(r.childNodes[1].childNodes[1].childNodes[1].value) >
        parseFloat(r.childNodes[3].childNodes[1].childNodes[1].value) ||
      parseFloat(r.childNodes[5].childNodes[1].childNodes[1].value) >
        parseFloat(r.childNodes[7].childNodes[1].childNodes[1].value)
    ) {
      return undefined;
    }

    return {
      inferior: r.childNodes[1].childNodes[1].childNodes[1].value,
      superior: r.childNodes[3].childNodes[1].childNodes[1].value,
      desde: r.childNodes[5].childNodes[1].childNodes[1].value,
      hasta: r.childNodes[7].childNodes[1].childNodes[1].value,
      genero: r.children[4].children[0].value,
    };
  });

  rangos = rangos.filter((r) => r != undefined);
  const resultado = document.querySelectorAll(`.trResultados${nombre}`);
  console.log(rangos, resultado, subCaracteristica);

  const resultados = [...resultado].map((rs) => {
    return rs.children[0].children[0].children[0].value.slice(0, 60);
  });

 

  caracteristicas.push({
    caracteristica,
    subCaracteristicas,
    rangos,
    resultados,
  });
  disabledButtonByClass("button" + nombre);
  desactivarInputs(nombre);
  desactivarSelects(nombre);
  const btnModificar = document.getElementById(
    `botonModificarCaracteristica${nombre}`
  );
  btnModificar.removeAttribute("hidden");
  enableButton("buttonCaracteristica");
}

var caracteristicas = [];
var caracteristicasCreadas = new Set();

function añadirAcordionItem(nombre1) {
  nombre1 = nombre1.trim();
  if (nombre1 == "") {
    nombre1=`${contador}-EMPTY0023`
    contador+=1
  }
  const nombre = nombre1
    .replaceAll(" ", "-")
    .replaceAll("(", "-")
    .replaceAll(")", "-")
    .replaceAll(".", "-")
    .replaceAll("+", "-")
    .replaceAll("/", "-");

  const accordionCaracteristicas = document.getElementById(
    "accordionCaracteristicas"
  );
  if (caracteristicasCreadas.has(nombre)) {
    return alerta.alert("Error", "Ya existe una caracteristica con ese nombre");
  } else {
    caracteristicasCreadas.add(nombre);
  }

  disabledButton("buttonCaracteristica");

  const divItem = document.createElement("div");
  divItem.className = `accordion-item acordionItemCaracteristica`;
  divItem.id = `accordionItemCaracteristica${nombre}`;

  divItem.innerHTML = `
  
  
  <h2 class="accordion-header headerCaracteristica"  >
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCaracteristica${nombre}" aria-expanded="false" aria-controls="collapseCaracteristica${nombre}">
     ${nombre1}
    </button>
    
  </h2>
  <div id="collapseCaracteristica${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionItemCaracteristica">
    <div class="accordion-body m-0 p-0 text-center" id="accordionBodyCaracteristica${nombre}">
      <div class="row">
        <div class="col-9 m-0 p-0"> 
          <div class="accordion mx-4" id="accordionDetalleCaracteristicas${nombre}">
        
            <div class="accordion-item acordionSubItemCaracteristica" id="itemSubCaracteristica${nombre}">
              <h2 class="accordion-header headerSubCaracteristica">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSubCaracteristica${nombre}" aria-expanded="false" aria-controls="collapseSubCaracteristica${nombre}">
                  Subcaracteristicas
                </button>
              </h2>
              <div id="collapseSubCaracteristica${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionDetalleCaracteristicas${nombre}">
                <div class="accordion-body" id="accordionBodySubCaracteristicas${nombre}">
                  <table class="table" style="font-size: small;">
                    <thead>
                      <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Valor</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody style="font-size: small;" id="tBodySubCaracteristica${nombre}">
                      
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="4">

                        </td>
                        <td>
                          <button type="button" class="btn btn-outline-success button${nombre}" onclick="añadirSubCaracteristica('${nombre}')" id=''>

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                            </svg>
                          </button>
                        </td>
                        
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion-item acordionSubItemCaracteristica" id="itemRangos${nombre}">
              <h2 class="accordion-header headerSubCaracteristica">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRangos${nombre}" aria-expanded="false" aria-controls="collapseRangos${nombre}">
                  Rangos
                </button>
              </h2>
              <div id="collapseRangos${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionDetalleCaracteristicas${nombre}">
                <div class="accordion-body" id="accordionBodyRangos${nombre}">
                  <table class="table" style="font-size: small;">
                    <thead>
                      <tr>
                        <th scope="col">Inferior</th>
                        <th scope="col">Superior</th>
                        <th scope="col" colspan="2">Rango de edad</th>
                        <th scope="col">Genero</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody style="font-size: small;" id="tBodyRangos${nombre}">
                      
                      
                      

                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="6">

                        </td>
                        <td>
                          <button type="button" class="btn btn-outline-success button${nombre}" onclick="añadirRango('${nombre}')">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                            </svg>
                          </button>
                        </td>
                        
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
            <div class="accordion-item acordionSubItemCaracteristica" id="itemResultados${nombre}">
              <h2 class="accordion-header headerSubCaracteristica">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseResultados${nombre}" aria-expanded="false" aria-controls="collapseResultados${nombre}">
                  Resultados
                </button>
              </h2>
              <div id="collapseResultados${nombre}" class="accordion-collapse collapse" data-bs-parent="#accordionDetalleCaracteristicas${nombre}">
                <div class="accordion-body" id="accordionBodyResultados${nombre}">
                  <table class="table" style="font-size: small;">
                    <thead>
                      <tr><th colspan="3">Resultados</th></tr>
                    </thead>
                    <tbody id="tBodyResultados${nombre}">
                     
                      
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="2">

                        </td>
                        <td>
                          <button type="button" class="btn btn-outline-success button${nombre}" onclick="añadirResultado('${nombre}')">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                            </svg>
                          </button>
                        </td>
                        
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          
        </div>
        <div class="col-3"> 
          <div>
            <table class="table table-success">
            
              <tbody style="font-size: medium;">
                <tr>
                  <th scope="row">Nombre</th>
                  <td colspan='2'><div class="mb-3">
                  <input type="text" readonly class="form-control input${nombre} formCaracteristica${nombre}" name="nombre" value='${nombre1}' placeholder="Nombre">
                </div></td>
                  
                </tr>
                <tr>
                  <th scope="row">Unidad</th>
                  <td colspan='2'><input type="text" class="form-control input${nombre} formCaracteristica${nombre}" name="unidad" placeholder='Unidad'></td>
                  
                </tr>
                <tr>
                  <th scope="row">Posicion</th>
                  <td colspan='2'><input type="number" min='0' class="form-control input${nombre} formCaracteristica${nombre}" name="posicion" placeholder='Orden'></td>
                  
                </tr>
                <tr>
                  <th scope="row">Imprimir</th>
                  <td colspan='2'><input type="checkbox" class="form-check-input select${nombre} formCaracteristica${nombre}" checked name="imp" ></td>

                  
                </tr>
                <tr>
                  <th scope="row">
                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      style="cursor: pointer"
                                      width="25"
                                      height="25"
                                      fill="#FACD0B"
                                      class="bi bi-pencil-square botonModificar${nombre}"
                                      viewBox="0 0 20 20"
                                      id="botonModificarCaracteristica${nombre}"
                                      hidden
                                      onclick="modificarCrtCreacionFront('${nombre}','${nombre1}')"
                                    >
                                      <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                      />
                                    </svg>
                  </th>
                  <td >
                    
                    <button class='button${nombre} btnIcon' onclick='borrarCaracteristica(event,"${nombre}")'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </button>
                  </td>
                  <td style="cursor:pointer">
                  <button class='button${nombre} btnIcon' onclick="crearCaracteristica('${nombre}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" class="bi bi-save" viewBox="0 0 16 16">
                      <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z"/>
                    </svg>
                  </button>
                  </td>
                  
                </tr>
                
              </tbody>
            </table>
          </div>
          
        </div>

        </div>
      </div>

  </div>


  `;
  accordionCaracteristicas.appendChild(divItem);
}
function borrarCaracteristica(event, nombre) {
  const accordion = document.getElementById("accordionCaracteristicas");
  
  const accordionCar = document.getElementById(
    `accordionItemCaracteristica${nombre}`
  );
  console.log(accordionCar);
  caracteristicasCreadas.delete(nombre);
  accordion.removeChild(accordionCar);

  enableButton("buttonCaracteristica");

  caracteristicas = caracteristicas.filter(
    (c) => c.caracteristica[0].valor !== nombre
  );
}

function modificarCrtCreacionFront(nombre,nombre1) {
  activarInputs(nombre);
  activarSelects(nombre);
  enableButtonByClass("button" + nombre);
  caracteristicas = caracteristicas.filter(
    (c) => c.caracteristica[0].valor !== nombre1
  );

  caracteristicasCreadas.delete(nombre);
}
function validarInputFormula(nombre, event) {
  const value = event.target.value;
  let variables = [];
  let error = false;
  let split = value.split(",");
  let operadores = ["+", "-", "*", "/"];

  for (let i = 0; i < split.length; i++) {
    const element = split[i];
    if (!operadores.includes(element) && isNaN(element)) {
      variables.push(element);
    }
    if (operadores.includes(element)) {
      console.log(split[i - 1], split[i + 1]);
      console.log(operadores.includes(split[i + 1]));
      if (
        operadores.includes(split[i - 1]) ||
        operadores.includes(split[i + 1]) ||
        split[i + 1] == undefined
      ) {
        error = true;
        break;
      }
    } else {
      if (
        !operadores.includes(split[i + 1]) &&
        !operadores.includes(split[i - 1])
      ) {
        error = true;
        break;
      }
    }
  }
  console.log(variables);

  const tBodySub = document.getElementById(`tBodySubCaracteristica${nombre}`);
  variables.forEach((v) => {
    let validar = false;
    for (let i = 0; i < tBodySub.children.length; i++) {
      if (
        tBodySub.children[i].children[0].children[0].value != "texto" &&
        event.target.parentNode.parentNode.parentNode.children[1].children[0]
          .children[0].value != v &&
        v == tBodySub.children[i].children[1].children[0].children[0].value
      ) {
        validar = true;
        break;
      }
    }
    if (!validar) {
      error = true;
      event.target.style.borderColor = "red";
    }
  });
  if (!error) {
    event.target.style.borderColor = "green";
  } else {
    event.target.style.borderColor = "red";
  }
}

function validarInferior(event, tipo) {
  if (
    event.target.parentNode.parentNode.parentNode.children[1].children[0]
      .children[0].value == "" &&
    event.target.parentNode.parentNode.parentNode.children[0].children[0]
      .children[0].value == ""
  ) {
    event.target.parentNode.parentNode.parentNode.children[1].children[0].children[0].style.borderColor =
      "gray";
    event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].style.borderColor =
      "gray";
    return;
  }
  if (
    event.target.parentNode.parentNode.parentNode.children[1].children[0]
      .children[0].value == "" ||
    event.target.parentNode.parentNode.parentNode.children[0].children[0]
      .children[0].value == ""
  ) {
    event.target.parentNode.parentNode.parentNode.children[1].children[0].children[0].style.borderColor =
      "red";
    event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].style.borderColor =
      "red";
    return;
  }
  if (tipo == "inferior") {
    if (
      parseFloat(
        event.target.parentNode.parentNode.parentNode.children[1].children[0]
          .children[0].value
      ) < parseFloat(event.target.value)
    ) {
      event.target.parentNode.parentNode.parentNode.children[1].children[0].children[0].style.borderColor =
        "red";
      event.target.style.borderColor = "red";
    } else {
      event.target.parentNode.parentNode.parentNode.children[1].children[0].children[0].style.borderColor =
        "green";
      event.target.style.borderColor = "green";
    }
  } else {
    if (
      parseFloat(
        event.target.parentNode.parentNode.parentNode.children[0].children[0]
          .children[0].value
      ) > parseFloat(event.target.value)
    ) {
      event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].style.borderColor =
        "red";
      event.target.style.borderColor = "red";
    } else {
      event.target.style.borderColor = "green";
      event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].style.borderColor =
        "green";
    }
  }
}
function validarResultado(event) {
  if (event.target.value.length > 60) {
    event.target.style.borderColor = "red";
  } else {
    event.target.style.borderColor = "green";
  }
}

function validarInferiorEdad(event, tipo) {
  if (
    event.target.parentNode.parentNode.parentNode.children[3].children[0]
      .children[0].value == "" &&
    event.target.parentNode.parentNode.parentNode.children[2].children[0]
      .children[0].value == ""
  ) {
    return;
  }
  if (
    event.target.parentNode.parentNode.parentNode.children[3].children[0]
      .children[0].value == "" ||
    event.target.parentNode.parentNode.parentNode.children[2].children[0]
      .children[0].value == ""
  ) {
    event.target.parentNode.parentNode.parentNode.children[3].children[0].children[0].style.borderColor =
      "red";
    event.target.parentNode.parentNode.parentNode.children[2].children[0].children[0].style.borderColor =
      "red";
    return;
  }
  if (tipo == "inferior") {
    if (
      parseFloat(
        event.target.parentNode.parentNode.parentNode.children[3].children[0]
          .children[0].value
      ) < parseFloat(event.target.value)
    ) {
      event.target.parentNode.parentNode.parentNode.children[3].children[0].children[0].style.borderColor =
        "red";
      event.target.style.borderColor = "red";
    } else {
      event.target.parentNode.parentNode.parentNode.children[3].children[0].children[0].style.borderColor =
        "green";
      event.target.style.borderColor = "green";
    }
  } else {
    if (
      parseFloat(
        event.target.parentNode.parentNode.parentNode.children[2].children[0]
          .children[0].value
      ) > parseFloat(event.target.value)
    ) {
      event.target.parentNode.parentNode.parentNode.children[2].children[0].children[0].style.borderColor =
        "red";
      event.target.style.borderColor = "red";
    } else {
      event.target.style.borderColor = "green";
      event.target.parentNode.parentNode.parentNode.children[2].children[0].children[0].style.borderColor =
        "green";
    }
  }
}
