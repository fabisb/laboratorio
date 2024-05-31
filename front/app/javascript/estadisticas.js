let bioArray, sedeArray, seccionesArray, categoriasArray, laboratoriosArray, examenesArray,seccionesData,examenes,pacientesArray;

async function tok() {
  let token = await login.getToken();
  nivelUser = token.nivel;
  cedulaUser = token.cedula;

  const elementsNivel = document.getElementsByClassName("user" + nivelUser);
  console.log(elementsNivel);
  for (const e of elementsNivel) {
    e.removeAttribute("hidden", "true");
  }
}
function validarSelectSeccion(value,tipo,id){
    if(value=='todos'){
      examenes=examenesArray
    }else{
      examenes=examenesArray.filter(ex=>{
        return ex.id_seccion==value
      })
  
    }
    buscarExamen(tipo,id)
  }

async function render() {
  var { token } = await login.getToken();
  try {
    let { data: pacientes } = await axios.get(
        urlsv + "/api/estadisticas/get-pacientes",
        { headers: { token } }
      );
    pacientesArray=pacientes.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        // a must be equal to b
        return 0;
    });
    
  } catch (error) {
    console.log(error)
  }

  try {
    let { data: bioanalistas } = await axios.get(
      urlsv + "/api/examenes/get-bioanalistas",
      { headers: { token } }
    );

    bioArray = bioanalistas;
    const selects = document.getElementsByClassName("bioanalistaSelect");
    for (let index = 0; index < selects.length; index++) {
      const element = selects[index];
      element.innerHTML = `
            <option value='' selected>Bioanalista</option>
            `;
      bioArray.forEach((e) => {
        element.innerHTML += `
            <option value='${e.id}'>${e.nombre}</option>
            
            `;
      });
    }

    var secciones = await axios.get(
      urlsv + "/api/modulo-examenes/secciones",
      { headers: { token } }
    );
    const selectSeccion = document.getElementById("seccionExamenSelect");
    selectSeccion.innerHTML = `
    <option value="todos">Filtrar por seccion</option>
    
    `;
    seccionesData = secciones.data;

    secciones.data.forEach((seccion) => {
      const option = document.createElement("option");
      option.value = seccion.id;
      option.innerText = seccion.nombre;
      selectSeccion.appendChild(option);
    });

    const { data: examenesGet } = await axios.get(
      urlsv + "/api/examenes/get-examenes",
      { headers: { token } }
    );
    examenesArray = examenesGet;
    examenes= examenesGet

   
  } catch (error) {
    console.log(error);
  }
  try {
    let { data: usuarios } = await axios.get(
      urlsv + "/api/estadisticas/get-users",
      { headers: { token } }
    );

    usuarioArray = usuarios;
    const selects = document.getElementsByClassName("selectUsuario");
    for (let index = 0; index < selects.length; index++) {
      const element = selects[index];
      element.innerHTML = `
            <option value='' selected>Usuario</option>
            `;
      usuarioArray.forEach((e) => {
        element.innerHTML += `
            <option value='${e.id}'>${e.nombre}</option>
            
            `;
      });
    }
    console.log(usuarios);
  } catch (error) {
    console.log(error);
  }
  try {
    const { data: laboratorios } = await axios.get(
      urlsv + "/api/modulo-examenes/laboratorios",
      { headers: { token } }
    );
    console.log(laboratorios);
    laboratoriosArray = laboratorios;
    const selects = document.getElementsByClassName("laboratorioSelect");
    for (let index = 0; index < selects.length; index++) {
      const element = selects[index];
      element.innerHTML = `
            <option value='' selected>Laboratorio</option>
            `;
      laboratoriosArray.forEach((e) => {
        element.innerHTML += `
            <option value='${e.id}'>${e.razon_social}</option>`;
      });
    }
  } catch (error) {
    console.log(error);
  }
  try {
    seccionesArray = secciones.data;
    const selects = document.getElementsByClassName("seccionSelect");
    for (let index = 0; index < selects.length; index++) {
      const element = selects[index];
      element.innerHTML = `
            <option value='' selected>Seccion</option>
            `;
      seccionesArray.forEach((e) => {
        element.innerHTML += `
            <option value='${e.id}'>${e.nombre}</option>
            
            `;
      });
    }
  } catch (error) {
    console.log(error);
  }
  try {
    const categorias = await axios.get(
      urlsv + "/api/modulo-examenes/categorias",
      { headers: { token } }
    );
    console.log(categorias);
    categoriasArray = categorias.data;
    const selects = document.getElementsByClassName("categoriaSelect");
    for (let index = 0; index < selects.length; index++) {
      const element = selects[index];
      element.innerHTML = `
            <option value='' selected>Categoria</option>
            `;
      categoriasArray.forEach((e) => {
        element.innerHTML += `
            <option value='${e.id}'>${e.nombre}</option>
            
            `;
      });
    }
  } catch (error) {
    console.log(error);
  }
  try {
    const { data: sedes } = await axios.get(urlsv + "/api/users/sedes");
    console.log(sedes);
    sedeArray = sedes;
    const selectsSede = document.getElementsByClassName("sedeSelect");
    console.log(selectsSede);
    for (let index = 0; index < selectsSede.length; index++) {
      const element = selectsSede[index];
      element.innerHTML = `
            <option value='' selected>Sede</option>
            `;
      sedeArray.forEach((e) => {
        element.innerHTML += `
            <option value='${e.id}'>${e.nombre}</option>
            
            `;
      });
    }
  } catch (error) {
    console.log(error);
  }
}


function buscarExamen(tipo,id) {
    input = document.getElementById("examenDiagnosticoInput");
    console.log(tipo,id)
    filtro = examenes.filter((ex) =>
      ex.nombre.toLowerCase().includes(input.value.toLowerCase())
    );
    const menuDiagnosticoUl = document.getElementById("menuDiagnosticoUl");
  
    menuDiagnosticoUl.innerHTML = "";
    filtro.map((ex) => {
      menuDiagnosticoUl.innerHTML += `
      <li class="list-group-item list-group-item-light list-group-item-action" >
              <div class="row">
                <div class="col-9">
                  <span class="">${ex.nombre}</span>
  
                </div>
                <div class="col-3 d-flex justify-content-end align-content-center">
                <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" onclick="setInputExamen(${ex.id},'${id}','${tipo}')" width="24" height="24" fill="green" class="bi bi-check-circle " viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
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


function validarInputsExamenPaciente(value) {
  const inputEx = document.getElementById("examenInputPaciente");
  const selectCat = document.getElementById("selectCategoriaPaciente");
  const selectSec = document.getElementById("selectSeccionPaciente");
  if (value == "examen") {
    selectCat.value = "";
    selectSec.value = "";
  } else {
    inputEx.value = "";
  }
}

function validarInputOrden(value) {
  const examenInp = document.getElementById("inputExamenOrden");
  const pacienteInp = document.getElementById("inputPacienteOrden");
  const SedeInp = document.getElementById("selectSedeOrden");
  const BioanalistaInp = document.getElementById("selectBioanalistaOrden");

  const GeneroInp = document.getElementById("selectGeneroOrden");
  const UsuarioInp = document.getElementById("usuariosSelectOrden");
  const desdeInp = document.getElementById("inputDesdeOrden");
  const hastaInp = document.getElementById("inputHastaOrden");
  const expedienteInp = document.getElementById("inputExpedienteOrden");

  switch (value) {
    case "paciente":
      expedienteInp.value = "";
      GeneroInp.value = "";
      desdeInp.value = "";
      hastaInp.value = "";
      break;
    case "genero":
      pacienteInp.value = "";
      break;
    case "edad":
      pacienteInp.value = "";
      break;
  }
}

function validarInputExamenEx(value) {
  const examenInp = document.getElementById("inputExamenEx");
  const pacienteInp = document.getElementById("inputPacienteEx");
  const ordenInp = document.getElementById("inputOrdenEx");
  const SedeInp = document.getElementById("selectSedeExamen");
  const BioanalistaInp = document.getElementById("selectBioanalistaExamen");
  const CategoriaInp = document.getElementById("selectCategoriaExamen");
  const SeccionInp = document.getElementById("selectSeccionExamen");
  const GeneroInp = document.getElementById("selectGeneroExamen");
  const UsuarioInp = document.getElementById("usuariosSelectExamen");
  const TipoInp = document.getElementById("selectTipoExamen");
  const LaboratorioInp = document.getElementById("selectLaboratorioExamen");
  const desdeInp = document.getElementById("inputDesdeExamen");
  const hastaInp = document.getElementById("inputHastaExamen");

  switch (value) {
    case "examen":
      CategoriaInp.value = "";
      SeccionInp.value = "";
      break;
    case "paciente":
      ordenInp.value = "";
      GeneroInp.value = "";
      desdeInp.value = "";
      hastaInp.value = "";
      break;
    case "orden":
      pacienteInp.value = "";
      UsuarioInp.value = "";
      GeneroInp.value = "";
      desdeInp.value = "";
      hastaInp.value = "";
      SedeInp.value = "";
      BioanalistaInp.value = "";
      TipoInp.value = "";
      LaboratorioInp.value = "";
      break;
    case "sede":
      ordenInp.value = "";
      break;
    case "bioanalista":
      ordenInp.value = "";
      LaboratorioInp.value = "";
      TipoInp.value = "";
      break;
    case "categoria":
      examenInp.value = "";
      break;
    case "seccion":
      examenInp.value = "";
      break;
    case "genero":
      pacienteInp.value = "";
      break;
    case "edad":
      pacienteInp.value = "";
      ordenInp.value = "";
      break;
    case "usuario":
      ordenInp.value = "";
      break;
    case "externo":
      ordenInp.value = "";
      BioanalistaInp.value = "";
      break;
    case "local":
      LaboratorioInp.value = "";
      break;
    case "laboratorio":
      TipoInp.value = "externo";
      break;
  }
}

function validarFechas(event, value, tipo) {
  console.log(event, value);
  let fechaActual = moment().format("YYYY-MM-DD");
  let fechaDesde = document.getElementById("fechaDesdeInput").value;
  fechaDesde = moment(fechaDesde).format("YYYY-MM-DD");
  const mes = moment(fechaActual).format("MM");
  const ano = moment(fechaActual).format("YYYY");
  const dia = moment(fechaActual).format("DD");

  let fechaValue = moment(value).format("YYYY-MM-DD");
  if (
    (mes == 2 && dia > 29) ||
    moment(fechaValue).isAfter(fechaActual) ||
    ano < 1890
  ) {
    document.getElementById("fechaDesdeInput").value = "";
    document.getElementById("fechaHastaInput").value = "";
    return;
  }

  if (tipo == "desde") {
    document.getElementById("fechaHastaInput").value = value;
  }
  if (tipo == "hasta") {
    console.log(fechaDesde, fechaValue);
    if (moment(fechaDesde).isAfter(fechaValue)) {
      document.getElementById("fechaDesdeInput").value = value;
    }
  }
}

function setInputExamen(ex,id,tipo){
    document.getElementById(id).value=ex
    if(tipo=='paciente'){
        validarInputsExamenPaciente('examen')
    }
    if(tipo=='examen'){
        validarInputExamenEx('examen')

    }
    if(tipo=='bioanalista'){
        validarInputBio('examen')
    }
}

function setInputPaciente(pac,id,tipo){
    document.getElementById(id).value=pac
   
}
function validarSeleccionBusqueda(){
  document.getElementById('alertFiltro').removeAttribute('hidden')

  setTimeout(() => {
  document.getElementById('alertFiltro').setAttribute('hidden','true')
    
  }, 3000);
}

function busquedapaciente(){
  const empresaRatios = document.getElementsByName('tipoOrden')
  const empresa = [...empresaRatios].find(e=>e.checked==true).value
  const examen = document.getElementById("examenInputPaciente").value;
  const sede = document.getElementById("selectSedePaciente").value;
  const bioanalista = document.getElementById("selectBioanalistaPaciente").value;
  const categoria = document.getElementById("selectCategoriaPaciente").value;
  const seccion = document.getElementById("selectSeccionPaciente").value;
  const genero = document.getElementById("selectGeneroPaciente").value;
  const usuario = document.getElementById("usuariosSelectPaciente").value;
  const desde = document.getElementById("inputDesdePaciente").value;
  const hasta = document.getElementById("inputHastaPaciente").value;

  let filtros=[
    {
    columna:'empresa',valor:empresa
    },
    {
      columna:'examen',valor:examen 
    },
    {
      columna:'sede',valor:sede 
    },
    {
      columna:'bioanalista',valor:bioanalista 
    },
    {
      columna:'categoria',valor:categoria 
    },
    {
      columna:'seccion',valor:seccion 
    },
    {
      columna:'desde',valor:desde 
    },
    {
      columna:'hasta',valor:hasta 
    },
    {
      columna:'usuario',valor:usuario 
    },
    ,
    {
      columna:'genero',valor:genero 
    }


  ]

  
}


const abrirModalPacientes = (event) => {
  new bootstrap.Modal("#pacientes-list").toggle();
  const menu=document.getElementById('menuPacientesUl')
    menu.innerHTML=''
    pacientesArray.forEach(e=>{
        menu.innerHTML+=`
        <li class="list-group-item list-group-item-light list-group-item-action" >
          <div class="row">
            <div class="col-3">
              <span class="">${e.cedula}</span>

            </div>
            <div class="col-6">
              <span class="">${e.nombre.trim()}</span>

            </div>
            <div class="col-3 d-flex justify-content-end align-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" fill="green" onclick="setInputPaciente(${e.id},'${event.target.type=='button' ? `${event.target.parentNode.children[1].id}` : event.target.type=='svg' ?  `${event.target.parentNode.parentNode.children[1].id}` :  `${event.target.parentNode.parentNode.parentNode.children[1].id}`}')" class="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg>
            </div>

          </div>
        </li> 
        `
    })

}

const abrirModalPacientes2 = (event) => {
  new bootstrap.Modal("#pacientes-list").toggle();
  const menu=document.getElementById('menuPacientesUl')
    menu.innerHTML=''
    pacientesArray.forEach(e=>{
        menu.innerHTML+=`
        <li class="list-group-item list-group-item-light list-group-item-action" >
          <div class="row">
            <div class="col-3">
              <span class="">${e.cedula}</span>

            </div>
            <div class="col-6">
              <span class="">${e.nombre.trim()}</span>

            </div>
            <div class="col-3 d-flex justify-content-end align-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" height="24" fill="green" onclick="setInputPaciente(${e.id},'${event.target.type=='button' ? `${event.target.parentNode.children[0].id}` : event.target.type=='svg' ?  `${event.target.parentNode.parentNode.children[0].id}` :  `${event.target.parentNode.parentNode.parentNode.children[0].id}`}')" class="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg>
            </div>

          </div>
        </li> 
        `
    })

}


const abrirModalExamenes = (event,tipo) => {
  new bootstrap.Modal("#examenes-list").toggle();
  console.log(event.target);
  seccionSelec = document.getElementById("seccionExamenSelect");
  seccionSelec.setAttribute('onchange',`validarSelectSeccion(value,'${tipo}','${event.target.type=='button' ? `${event.target.parentNode.children[0].id}` : event.target.type=='svg' ?  `${event.target.parentNode.parentNode.children[0].id}` :  `${event.target.parentNode.parentNode.parentNode.children[0].id}`}')`)

  input = document.getElementById("examenDiagnosticoInput");
  input.setAttribute('oninput',`buscarExamen('${tipo}','${event.target.type=='button' ? `${event.target.parentNode.children[0].id}` : event.target.type=='svg' ?  `${event.target.parentNode.parentNode.children[0].id}` :  `${event.target.parentNode.parentNode.parentNode.children[0].id}`}')`)
  const menuDiagnosticoUl = document.getElementById("menuDiagnosticoUl");
  examenesArray.forEach((ex) => {
    menuDiagnosticoUl.innerHTML += `
    <li class="list-group-item list-group-item-light list-group-item-action" >
          <div class="row">
            <div class="col-9">
              <span class="">${ex.nombre}</span>

            </div>
            <div class="col-3 d-flex justify-content-end align-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" onclick="setInputExamen(${ex.id},'${event.target.type=='button' ? `${event.target.parentNode.children[0].id}` : event.target.type=='svg' ?  `${event.target.parentNode.parentNode.children[0].id}` :  `${event.target.parentNode.parentNode.parentNode.children[0].id}`}','${tipo}')" width="24" height="24" fill="green" class="bi bi-check-circle " viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg>
            </div>

          </div>
        </li> 
        
       

    `;
  });
};

function cambiarFuncionBuscar(value) {
  document
    .getElementById("botonBuscar")
    .setAttribute("onclick", `busqueda${value}()`);
}

function validarInputBio(value) {
  const examenInp = document.getElementById("inputExamenBio");

  const CategoriaInp = document.getElementById("selectCategoriaBioanalista");
  const SeccionInp = document.getElementById("selectSeccionBioanalista");

  switch (value) {
    case "examen":
      CategoriaInp.value = "";
      SeccionInp.value = "";
      break;

    case "categoria":
      examenInp.value = "";
      break;
    case "seccion":
      examenInp.value = "";
      break;
  }
}
