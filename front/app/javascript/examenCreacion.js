const render = async () => {
  try {
    const { token } = await login.getToken();
    const secciones = await axios.get(
      urlsv + "/api/modulo-examenes/secciones",
      { headers: { token } }
    );

    const selectSeccion = document.getElementById("seccionExamenSelect");
    selectSeccion.innerHTML = "";
    secciones.data.forEach((seccion) => {
      const option = document.createElement("option");
      option.value = seccion.id;
      option.innerText = seccion.nombre;
      selectSeccion.appendChild(option);
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

function validarNombreCaracteristica() {
  const nombre = document.getElementById("inputCaracteristica").value;

  añadirAcordionItem(nombre);
}
function validarSelectSub(nombre, event) {
  
  if (event.target.value == "formula") {
    const trsSubCaracteristicas = document.querySelectorAll(`.trSubCaracteristica${nombre}`)
    const arrSub = [...trsSubCaracteristicas]
    let validacionInputsTxt = false;
    arrSub.forEach((tr) => {
      if(tr.firstChild.children[0].value=='numero'){
        validacionInputsTxt = true;
      }
    })

    if(!validacionInputsTxt){
      event.target.value = "numero";
      return alerta.alert("Error:", "Debe Haber al menos un campo de numero para poder seleccionar Formula");
    }

    event.target.parentNode.parentNode.children[2].firstElementChild.children[0].removeAttribute(
      "readonly"
    );
    event.target.parentNode.parentNode.children[2].firstElementChild.children[1].removeAttribute(
      "disabled"
    );
    event.target.parentNode.parentNode.children[2].firstElementChild.children[2].removeAttribute(
      "disabled"
    );
    event.target.parentNode.parentNode.children[2].firstElementChild.children[3].removeAttribute(
      "disabled"
    );
  } else {
    event.target.parentNode.parentNode.children[2].firstElementChild.children[0].setAttribute(
      "readonly",
      "true"
    );
    event.target.parentNode.parentNode.children[2].firstElementChild.children[0].value =
      "";
    event.target.parentNode.parentNode.children[2].firstElementChild.children[1].setAttribute(
      "disabled",
      "true"
    );
    event.target.parentNode.parentNode.children[2].firstElementChild.children[2].setAttribute(
      "disabled",
      "true"
    );
    event.target.parentNode.parentNode.children[2].firstElementChild.children[3].setAttribute(
      "disabled",
      "true"
    );
  }
}



function añadirChars(char, event) {
  console.log(event);
  event.target.parentNode.children[0].value += char;
}

function borrarSubCaracteristica(event, nombre) {
  const tBody = document.getElementById(`tBodySubCaracteristica${nombre}`);
  console.log(event.target);
  if (event.target.localName == "button") {
    tBody.removeChild(event.target.parentNode.parentNode);
  }

  if (event.target.localName == "svg") {
    tBody.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  if (event.target.localName == "path") {
    tBody.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
}
function borrarResultado(event, nombre) {
  const tBody = document.getElementById(`tBodyResultados${nombre}`);

  console.log(event.target);
  if (event.target.localName == "button") {
    tBody.removeChild(event.target.parentNode.parentNode);
  }

  if (event.target.localName == "svg") {
    tBody.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  if (event.target.localName == "path") {
    tBody.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
}
function borrarRango(event, nombre) {
  const tBody = document.getElementById(`tBodyRangos${nombre}`);

  console.log(event.target);
  if (event.target.localName == "button") {
    tBody.removeChild(event.target.parentNode.parentNode);
  }

  if (event.target.localName == "svg") {
    tBody.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  if (event.target.localName == "path") {
    tBody.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
}

function añadirSubCaracteristica(nombre) {
  const trsSubCaracteristica = document.getElementsByClassName(
    "trSubCaracteristica" + nombre
  );
  if (trsSubCaracteristica.length >= 5) {
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
  <button disabled class="btn btn-light p-0 " onclick='añadirChars("{}",event)' type="button">{  }</button>
  <button disabled class="btn btn-light p-0 " onclick='añadirChars("[]",event)' type="button">[  ]</button>
  <button disabled class="btn btn-light p-0 " onclick='añadirChars("()",event)' type="button">(  )</button>

</div>
</td>

<th scope="row"></th>
<td >
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
      class="form-control-sm mx-2 input${nombre} w-25 formRango"
      id="exampleFormControlInput2"
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
    class="form-control-sm mx-2 w-25 input${nombre} formRango"
    id="exampleFormControlInput2"
  />
</div>
</td>
<td>
  <div
    class="mb-3 d-flex align-items-center justify-content-center"
  >

    <input
      
      name="desde"
      type="text"
      class="form-control-sm mx-2 w-25 input${nombre} formRango"
      id="exampleFormControlInput2"
    />
  </div>
</td>
<td>
  <div
  class="mb-3 d-flex align-items-center justify-content-center"
>
 
  <input
    
    name="hasta"
    type="text"
    class="form-control-sm mx-2 w-25 input${nombre} formRango"
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
  console.log(nombre, seccion);
  console.log(caracteristicas);
  if (nombre == "" || !nombre) {
  }

  const { token } = await login.getToken();
  const result = await axios.post(
    urlsv + "/api/modulo-examenes/crear-examen",
    { nombre, seccion, caracteristicas },
    { headers: { token } }
  );
  console.log("🚀 ~ crearExamen ~ result:", result);

  try {
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
  const nombre = document.getElementById("inputSeccion").value;
  console.log(nombre);
  try {
    const { token } = await login.getToken();
    const seccion = await axios.post(
      urlsv + "/api/modulo-examenes/crear-seccion",
      {
        nombre,
      },
      { headers: { token } }
    );

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

function crearCaracteristica(nombre) {
  const formCaracteristicas = document.getElementsByClassName(
    "formCaracteristica" + nombre
  );

  const caracteristica = [...formCaracteristicas].map((c) => {
    if (c.name == "imp") {
      return {
        nombre: "impsiempre",
        valor: c.checked,
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

  const subCaracteristicas = [...subCaracteristica].map((s) => {
    return {
      tipo: s.childNodes[0].childNodes[1].value,
      nombre: s.childNodes[2].childNodes[1].childNodes[1].value,
      valor: s.childNodes[4].childNodes[1].childNodes[1].value,
    };
  });

  const rango = document.querySelectorAll(`.trRango${nombre}`);

  const rangos = [...rango].map((r) => {
    return {
      inferior: r.childNodes[1].childNodes[1].childNodes[1].value,
      superior: r.childNodes[3].childNodes[1].childNodes[1].value,
      desde: r.childNodes[5].childNodes[1].childNodes[1].value,
      hasta: r.childNodes[7].childNodes[1].childNodes[1].value,
      genero: r.children[4].children[0].value,
    };
  });

  const resultado = document.querySelectorAll(`.trResultados${nombre}`);

  const resultados = [...resultado].map((rs) => {
    return rs.children[0].children[0].children[0].value;
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
  const btnModificar= document.getElementById(`botonModificarCaracteristica${nombre}`)
  btnModificar.removeAttribute("hidden")
  enableButton("buttonCaracteristica");
}

var caracteristicas = [];
var caracteristicasCreadas = new Set();

function añadirAcordionItem(nombre1) {
  nombre1 = nombre1.trim();
  const nombre = nombre1.replaceAll(" ", "-");

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
  console.log(accordion.children);
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

function modificarCrtCreacionFront(nombre) {
  activarInputs(nombre);
  activarSelects(nombre);
  enableButtonByClass("button" + nombre);
  caracteristicas= caracteristicas.filter(c => c.caracteristica[0].valor!== nombre)


}


function validarInputFormula(nombre,event) {
  const value= event.target.value
  let variables = []
  let error= false
  for (let i = 0; i < value.length; i++) {
    if(value[i]=="{"){
      let validarCierre = false
      let variable=""
      for (let j = i + 1; j < value.length; j++) {
        if(value[j]=="}"){
          variable = value.slice(i+1,j)
          validarCierre = true
          break;
        }
      }
      
      if(!validarCierre || variable==""){
        error= true
        event.target.style.borderColor = "red"
        break;
      }else{
        variables.push(variable)
      }
    }
    if(value[i]=="+"||value[i]=="-"||value[i]=="*"||value[i]=="/"){
      
      
      
      if((value[i-1]=="}"|| value[i-1]==")" ) &&( value[i+1]=="{" || value[i+1]=="(" )){
        continue
      }else{
        error= true
        event.target.style.borderColor = "red"
        break;
      }
    }
    if(value[i]=="("){
      let validarCierre = false
      
      for (let j = i + 1; j < value.length; j++) {
        if(value[j]==")"){
          variable = value.slice(i+1,j)
          validarCierre = true
          break;
        }
      }
      
      if(!validarCierre || variable==""){
        error= true
        event.target.style.borderColor = "red"
        break;
      }
    }
    
  }
  if(!error){
    event.target.style.borderColor = "green"
  }
  
  

}