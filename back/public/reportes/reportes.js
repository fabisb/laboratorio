let bioArray, sedeArray, seccionesArray, categoriasArray, laboratoriosArray, examenesArray, seccionesData, examenes, pacientesArray, Data;
let total = 0
let objetos = []



function validarSelectSeccion(value, tipo, id) {
  if (value == 'todos') {
    examenes = examenesArray
  } else {
    examenes = examenesArray.filter(ex => {
      return ex.id_seccion == value
    })

  }
  buscarExamen(tipo, id)
}

const urlsv = ''



function buscarPacienteInput(value) {
  let pac = []

  if (isNaN(value)) {
    pac = pacientesArray.filter(e => e.nombre.toLowerCase().includes(value.toLowerCase()))
  } else {
    if (value == '') {
      pac = pacientesArray
    } else {
      pac = pacientesArray.filter(e => e.cedula.toString().includes(value))

    }

  }




  const menu = document.getElementById('menuPacientesUl')
  menu.innerHTML = ''
  pac.forEach(e => {
    menu.innerHTML += `
      <li class="list-group-item list-group-item-light list-group-item-action" >
        <div class="row">
          <div class="col-3">
            <span class="">${e.cedula}</span>

          </div>
          <div class="col-6">
            <span class="">${e.nombre.trim()}</span>

          </div>
          <div class="col-3 d-flex justify-content-end align-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" width="24" data-bs-dismiss="modal" height="24" fill="green" onclick="setInputPaciente(${e.id},'${event.target.tagName == 'BUTTON' ? `${event.target.parentNode.children[1].id}` : event.target.tagName == 'path' ? `${event.target.parentNode.parentNode.parentNode.children[1].id}` : `${event.target.parentNode.parentNode.children[1].id}`}')" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
          </svg>
          </div>

        </div>
      </li`})
}


function validarAsegurada(status) {
  const selectAse = document.getElementById('aseguradosSelectExamen')

  if (status == 'si') {
    selectAse.removeAttribute('disabled')
  } else {
    selectAse.setAttribute('disabled', 'true')

  }
}
async function render() {

  try {
    let { data: pacientes } = await axios.get(
      urlsv + "/api/espejo/get-pacientes",
    );
    pacientesArray = pacientes.sort(function (a, b) {
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
      urlsv + "/api/espejo/get-bioanalistas",
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
      urlsv + "/api/espejo/secciones"
    );
    const selectSeccion = document.getElementById("selectSeccionExamen");
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
      urlsv + "/api/espejo/get-examenes"
    );
    examenesArray = examenesGet;
    examenes = examenesGet


  } catch (error) {
    console.log(error);
  }

  try {
    let { data: asegurados } = await axios.get(
      urlsv + "/api/espejo/get-asegurados"
    );
    const selectAse = document.getElementById('aseguradosSelectExamen')
    asegurados.forEach(e => {
      selectAse.innerHTML += `
      <option value='${e.id}'xa>${e.nombre}</option>  
      `
    })

  } catch (error) {

  }

  try {
    let { data: usuarios } = await axios.get(
      urlsv + "/api/espejo/get-users"
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
  } catch (error) {
    console.log(error);
  }
  try {
    const { data: laboratorios } = await axios.get(
      urlsv + "/api/espejo/laboratorios"
    );
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
      urlsv + "/api/espejo/categorias"
    );
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
    sedeArray = sedes;
    const selectsSede = document.getElementsByClassName("sedeSelect");
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


function buscarExamen(tipo, id) {
  input = document.getElementById("examenDiagnosticoInput");
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
                <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" data-bs-dismiss="modal" onclick="setInputExamen(${ex.id},'${id}','${tipo}')" width="24" height="24" fill="green" class="bi bi-check-circle " viewBox="0 0 16 16">
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

function validarInputExterno(value) {
  const pacienteInp = document.getElementById("inputPacienteExterno");
  const GeneroInp = document.getElementById("selectGeneroExterno");
  const desdeInp = document.getElementById("inputDesdeExterno");
  const hastaInp = document.getElementById("inputHastaExterno");


  switch (value) {
    case "paciente":
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

      break;
    case "sede":
      ordenInp.value = "";
      break;
    case "bioanalista":
      ordenInp.value = "";
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
      break;
    case "laboratorio":
      TipoInp.value = "externo";
      break;
  }
}

function validarFechas(event, value, tipo) {
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
    if (moment(fechaDesde).isAfter(fechaValue)) {
      document.getElementById("fechaDesdeInput").value = value;
    }
  }
}

function setInputExamen(ex, id, tipo) {
  document.getElementById(id).value = ex
  if (tipo == 'paciente') {
    validarInputsExamenPaciente('examen')
  }
  if (tipo == 'examen') {
    validarInputExamenEx('examen')

  }
  if (tipo == 'bioanalista') {
    validarInputBio('examen')
  }
}

function setInputPaciente(pac, id, tipo) {
  document.getElementById(id).value = pac

}
function validarSeleccionBusqueda() {

  document.getElementById('alertFiltro').removeAttribute('hidden')

  setTimeout(() => {
    document.getElementById('alertFiltro').setAttribute('hidden', 'true')

  }, 3000);
}

function setDesdeEdad(tipo, value) {
  document.getElementById(`inputHasta${tipo}`).value = value
}
function setHastaEdad(tipo, value) {
  const desde = document.getElementById(`inputDesde${tipo}`)
  if (parseFloat(desde.value) > parseFloat(value)) {
    desde.value = value
  }
}


async function busquedaorden() {
  const empresaRatios = document.getElementsByName('tipoOrden')
  const empresa = [...empresaRatios].find(e => e.checked == true).value
  const examen = document.getElementById("inputExamenOrden").value;
  const paciente = document.getElementById("inputPacienteOrden").value;
  const sede = document.getElementById("selectSedeOrden").value;
  const bioanalista = document.getElementById("selectBioanalistaOrden").value;
  const genero = document.getElementById("selectGeneroOrden").value;
  const usuario = document.getElementById("usuariosSelectOrden").value;
  const expediente = document.getElementById("inputExpedienteOrden").value;
  const desde = document.getElementById("inputDesdeOrden").value;
  const hasta = document.getElementById("inputHastaOrden").value;
  const desdeFecha = document.getElementById('fechaDesdeInput').value;
  const hastaFecha = document.getElementById('fechaHastaInput').value
  if (hastaFecha == '' || desdeFecha == '') {
    document.getElementById('alertFiltro').innerHTML = 'Por Favor seleccione la fecha a filtrar'
    document.getElementById('alertFiltro').removeAttribute('hidden')

    setTimeout(() => {
      document.getElementById('alertFiltro').setAttribute('hidden', 'true')

    }, 3000);

  }
  let filtros = [
    {
      columna: 'empresa', valor: empresa
    },
    {
      columna: 'examen', valor: examen
    },
    {
      columna: 'paciente', valor: paciente
    },
    {
      columna: 'sede', valor: sede
    },
    {
      columna: 'expediente', valor: expediente
    },
    {
      columna: 'bioanalista', valor: bioanalista
    },
    {
      columna: 'desde', valor: desde
    },
    {
      columna: 'hasta', valor: hasta
    },
    {
      columna: 'usuario', valor: usuario
    },
    {
      columna: 'genero', valor: genero
    }


  ]

  const filtrosValue = filtros.filter(e => e.valor != '')
  const headReport = document.getElementById('tHeadReport')
  const bodyReport = document.getElementById('tBodyReport')
  headReport.innerHTML = ''
  bodyReport.innerHTML = ''

  try {


    const res = await axios.post(
      urlsv + "/api/espejo/get-orden-reportes",
      { filtrosValue, desde: desdeFecha, hasta: hastaFecha }
    );

    Data = res.data.ordenes
    res.data.columnas.forEach(c => {
      headReport.innerHTML += `
        <th scope="col" onclick="contarOrdenes('${c}')" data-bs-toggle="modal" data-bs-target="#modalTotales">${c}</th>
      `
    })

    examenesArr = res.data.ordenes.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    examenesArr.forEach(e => {

      bodyReport.innerHTML += `
      <tr style="font-size:medium">
                            <td scope="col">${e.id}</td>
                            <td scope="col">${e.orden}</td>
                            <td scope="col">${e.clave == 'orden' ? `<img src="../assets/img/la-milagrosa-logo.png"   width="20" alt="" srcset="">` : ''}${e.clave == 'clave' ? `<img src="../assets/img/salud-vital-logo.png"  width="20" alt="" srcset="">` : ''}${e.clave == 'no' ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="green" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                          </svg>` : ''}</td>
                            <td scope="col">${e.sede}</td>
                            <td scope="col">${e.paciente}</td>
                            <td scope="col">${e.bioanalista}</td>
                            <td scope="col">${e.expediente}</td>
                            <td scope="col">${e.fecha.split('T')[0]}</td>
                            <td scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-eye" viewBox="0 0 16 16" onclick="examenesOrdenPaciente('orden',${e.id})">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg></td>
                            

                          </tr>
      `
    })

  } catch (error) {
    console.log(error)
  }
}


async function busquedabioanalista() {
  const empresaRatios = document.getElementsByName('tipoOrden')
  const empresa = [...empresaRatios].find(e => e.checked == true).value
  const examen = document.getElementById("inputExamenBio").value;
  const paciente = document.getElementById("inputPacienteBio").value;
  const sede = document.getElementById("selectSedeBioanalista").value;
  const categoria = document.getElementById("selectCategoriaBioanalista").value;
  const seccion = document.getElementById("selectSeccionBioanalista").value;
  const desdeFecha = document.getElementById('fechaDesdeInput').value;
  const hastaFecha = document.getElementById('fechaHastaInput').value
  if (hastaFecha == '' || desdeFecha == '') {
    document.getElementById('alertFiltro').innerHTML = 'Por Favor seleccione la fecha a filtrar'
    document.getElementById('alertFiltro').removeAttribute('hidden')

    setTimeout(() => {
      document.getElementById('alertFiltro').setAttribute('hidden', 'true')

    }, 3000);

  }
  let filtros = [
    {
      columna: 'empresa', valor: empresa
    },
    {
      columna: 'examen', valor: examen
    },
    {
      columna: 'paciente', valor: paciente
    },
    {
      columna: 'sede', valor: sede
    },
    {
      columna: 'categoria', valor: categoria
    },
    {
      columna: 'seccion', valor: seccion
    }


  ]

  const filtrosValue = filtros.filter(e => e.valor != '')
  const headReport = document.getElementById('tHeadReport')
  const bodyReport = document.getElementById('tBodyReport')
  headReport.innerHTML = ''
  bodyReport.innerHTML = ''

  try {


    const res = await axios.post(
      urlsv + "/api/espejo/get-bioanalistas-reportes",
      { filtrosValue, desde: desdeFecha, hasta: hastaFecha },

    );
    Data = res.data.bioanalistas

    res.data.columnas.forEach(c => {
      headReport.innerHTML += `
        <th scope="col">${c}</th>
      `
    })

    examenesArr = res.data.bioanalistas.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    examenesArr.forEach(e => {

      bodyReport.innerHTML += `
      <tr style="font-size:medium">
                            <td scope="col">${e.id}</td>
                            <td scope="col">${e.nombre}</td>
                            <td scope="col">${e.colegio}</td>
                            <td scope="col">${e.ministerio}</td>
                            <td scope="col">${e.telefono}</td>
                            <td scope="col">${e.direccion}</td>
                            

                          </tr>
      `
    })

  } catch (error) {
    console.log(error)
  }
}

async function busquedaexamen() {
  const empresaRatios = document.getElementsByName('tipoOrden')
  const empresa = [...empresaRatios].find(e => e.checked == true).value
  const examen = document.getElementById("inputExamenEx").value;
  const paciente = document.getElementById("inputPacienteEx").value;
  const orden = document.getElementById("inputOrdenEx").value;
  const sede = document.getElementById("selectSedeExamen").value;
  const bioanalista = document.getElementById("selectBioanalistaExamen").value;
  const categoria = document.getElementById("selectCategoriaExamen").value;
  const seccion = document.getElementById("selectSeccionExamen").value;
  const genero = document.getElementById("selectGeneroExamen").value;
  const usuario = document.getElementById("usuariosSelectExamen").value;
  const desde = document.getElementById("inputDesdeExamen").value;
  const hasta = document.getElementById("inputHastaExamen").value;
  const desdeFecha = document.getElementById('fechaDesdeInput').value;
  const hastaFecha = document.getElementById('fechaHastaInput').value
  const asegurado = document.getElementById('aseguradosSelectExamen').value;


  if (hastaFecha == '' || desdeFecha == '') {
    document.getElementById('alertFiltro').innerHTML = 'Por Favor seleccione la fecha a filtrar'
    document.getElementById('alertFiltro').removeAttribute('hidden')

    setTimeout(() => {
      document.getElementById('alertFiltro').setAttribute('hidden', 'true')

    }, 3000);

  }
  let filtros = [
    {
      columna: 'empresa', valor: empresa
    },
    {
      columna: 'examen', valor: examen
    },
    {
      columna: 'paciente', valor: paciente
    },
    {
      columna: 'asegurado', valor: asegurado
    },
    {
      columna: 'orden', valor: orden
    },
    {
      columna: 'sede', valor: sede
    },
    {
      columna: 'bioanalista', valor: bioanalista
    },
    {
      columna: 'categoria', valor: categoria
    },
    {
      columna: 'seccion', valor: seccion
    },
    {
      columna: 'desde', valor: desde
    },
    {
      columna: 'hasta', valor: hasta
    },
    {
      columna: 'usuario', valor: usuario
    },
    {
      columna: 'genero', valor: genero
    }


  ]

  const filtrosValue = filtros.filter(e => e.valor != '')
  const headReport = document.getElementById('tHeadReport')
  const bodyReport = document.getElementById('tBodyReport')
  headReport.innerHTML = ''
  bodyReport.innerHTML = ''

  try {

    const res = await axios.post(
      urlsv + "/api/espejo/get-examenes-reportes",
      { filtrosValue, desde: desdeFecha, hasta: hastaFecha }
    );
    Data = res.data.examenes


    res.data.columnas.forEach(c => {
      headReport.innerHTML += `
        <th scope="col" onclick="contarExamenes('${c}')" data-bs-toggle="modal" data-bs-target="#modalTotales" >${c}</th>
      `
    })

    examenesArr = res.data.examenes.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    examenesArr.forEach(e => {

      bodyReport.innerHTML += `
      <tr style="font-size:medium">
                            <td scope="col">${e.id}</td>
                            <td scope="col">${e.nombre}</td>
                            <td scope="col">${e.seccion}</td>
                            <td scope="col">${e.paciente}</td>
                            <td scope="col">${e.bioanalista}</td>
                            <td scope="col">${e.clave == 'orden' ? `<img src="../assets/img/la-milagrosa-logo.png"   width="20" alt="" srcset="">` : ''}${e.clave == 'clave' ? `<img src="../assets/img/salud-vital-logo.png"  width="20" alt="" srcset="">` : ''}${e.clave == 'no' ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="green" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                          </svg>` : ''}  - ${e.orden}</td>
                            <td scope="col">${e.sede}</td>
                            <td scope="col">${e.categoria}</td>
                            <td scope="col">${e.fecha.split('T')[0]}</td>
                            <td scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-eye" style="cursor:pointer" viewBox="0 0 16 16" onclick="abrirResultadosModal('${e.nombre}','${e.id_pac}','${e.id}')">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg></td>
                            

                          </tr>
      `
    })

  } catch (error) {
    console.log(error)
  }
}

async function busquedaexterno() {

  const examen = document.getElementById("inputExamenExterno").value;
  const paciente = document.getElementById("inputPacienteExterno").value;
  const genero = document.getElementById("selectGeneroExterno").value;
  const usuario = document.getElementById("usuariosSelectExterno").value;
  const laboratorio = document.getElementById("selectLaboratorioExterno").value;
  const desde = document.getElementById("inputDesdeExterno").value;
  const hasta = document.getElementById("inputHastaExterno").value;
  const desdeFecha = document.getElementById('fechaDesdeInput').value;
  const hastaFecha = document.getElementById('fechaHastaInput').value
  if (hastaFecha == '' || desdeFecha == '') {
    document.getElementById('alertFiltro').innerHTML = 'Por Favor seleccione la fecha a filtrar'
    document.getElementById('alertFiltro').removeAttribute('hidden')

    setTimeout(() => {
      document.getElementById('alertFiltro').setAttribute('hidden', 'true')

    }, 3000);

  }
  let filtros = [
    {
      columna: 'examen', valor: examen
    },
    {
      columna: 'paciente', valor: paciente
    },
    {
      columna: 'laboratorio', valor: laboratorio
    },
    {
      columna: 'desde', valor: desde
    },
    {
      columna: 'hasta', valor: hasta
    },
    {
      columna: 'usuario', valor: usuario
    },
    {
      columna: 'genero', valor: genero
    }


  ]

  const filtrosValue = filtros.filter(e => e.valor != '')
  const headReport = document.getElementById('tHeadReport')
  const bodyReport = document.getElementById('tBodyReport')

  headReport.innerHTML = ''
  bodyReport.innerHTML = ''

  try {

    const res = await axios.post(
      urlsv + "/api/espejo/get-externos-reportes",
      { filtrosValue, desde: desdeFecha, hasta: hastaFecha }
    );
    Data = res.data.examenes

    res.data.columnas.forEach(c => {
      headReport.innerHTML += `
        <th scope="col" onclick="contarExternos('${c}')" data-bs-toggle="modal" data-bs-target="#modalTotales">${c}</th>
      `
    })

    examenesArr = res.data.examenes.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    examenesArr.forEach(e => {

      bodyReport.innerHTML += `
      <tr style="font-size:medium">
                            <td scope="col">${e.id}</td>
                            <td scope="col">${e.examen}</td>
                            <td scope="col">${e.seccion}</td>
                            <td scope="col">${e.orden}</td>
                            <td scope="col">${e.paciente}</td>
                            <td scope="col">${e.laboratorio}</td>
                            <td scope="col">${e.bioanalista}</td>
                            <td scope="col">${e.categoria}</td>
                            <td scope="col">${e.usuario}</td>
                            <td scope="col">${e.fecha.split('T')[0]}</td>
                            <td scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-eye hoverMouse" onclick="previewPdfExterno('${e.id}')" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg></td>
                            

                          </tr>
      `
    })

  } catch (error) {
    console.log(error)
  }
}
async function previewPdfExterno(id) {
  window.open(`/externos?id=${id}`);

}

function setInputs(idEx) {

  examen.detallesExamenPc.forEach((e) => {
    if (e.status != 'titulo') {
      const res = document.getElementById(`inputRs${e.idCar}`);
      const nota = document.getElementById(`inputNt${e.idCar}`);

      nota.value = e.nota;
      try {
        res.value = e.resultado;
      } catch (error) {
        console.log(error);
      }
    }

  });
  examen.subCaracteristicasExPc.forEach((e) => {
    const res = document.getElementById(`Rs-${e.idSub}`);
    const nota = document.getElementById(`Nt-${e.idSub}`);
    res.value = e.resultado;
    nota.value = e.nota;
  });
}
const calcularEdadNormal = (fecha) => {

  const mes = moment(fecha).format("MM");
  const ano = moment(fecha).format("YYYY");
  const dia = moment(fecha).format("DD");



  const mesAc = moment().format("MM");
  const anoAc = moment().format("YYYY");
  const diaAc = moment().format("DD");

  let mesR = mesAc - mes;
  let diaR = diaAc - dia;
  let anoR = anoAc - ano;

  if (mesR < 0) {
    mesR = mesR + 12;
    anoR--;
  }
  if (diaR < 0) {
    mesR--;
  }

  return `${anoR} años;  ${mesR} meses`;
};


const abrirResultadosModal = async (examen, idPac, idRes) => {
  let pacienteObj
  try {
    const res = await axios.get(urlsv + '/api/espejo/get-paciente', {
      params: { idPac }
    })
    pacienteObj = res.data
  } catch (error) {
    console.log(error)
  }
  pacienteObj.edad = calcularEdadNormal(pacienteObj.fecha_nacimiento);


  const h1Ex = document.getElementById("h1NombreEx");
  const tBodyDiagnosticos = document.getElementById("tBodyDiagnosticos");
  tBodyDiagnosticos.innerHTML = "";
  h1Ex.innerText = `${idRes} - ${examen} - ${pacienteObj.nombre} - ${pacienteObj.edad}`;




  new bootstrap.Modal("#resultadosModal").toggle();

  try {

    let { data: resultados } = await axios.get(
      urlsv + "/api/espejo/resultados-examen",
      {
        params: {
          id: idRes,
        }
      }
    );
    resultados = resultados.sort(function (a, b) {
      if (a.posicion > b.posicion) {
        return 1;
      }
      if (a.posicion < b.posicion) {
        return -1;
      }
      // a must be equal to b
      return 0;
    })


    resultados.forEach((ct) => {


      if (ct.status == 'titulo') {
        tBodyDiagnosticos.innerHTML += `
            <tr>
                        <th scope="row" colspan="7">${ct.titulo}</th>
                        
          
                      </tr>
            `;
      } else {


        if (ct.sub.length > 0) {
          tBodyDiagnosticos.innerHTML += `
        <tr >
                <td scope="row" colspan="2">${ct.nombre}</td>
                <td> <input disabled class="form-control form-control-sm inputExDetallePacCar" rango='no' name='rs-${ct.id}' type="text" id='inputRs${ct.id}' value="SubCaracteristica"  aria-label=".form-control-sm example"> </td>
                <td>Resultado</td>
                <td></td>
                <td>  <input disabled class="inputSc${ct.id} form-control form-control-sm" type="text" id='inputNt${ct.id}' value="${ct.nota}"  aria-label=".form-control-sm example">              </td>
                
              </tr>
        `;
          ct.sub.forEach((sb) => {
            if (sb.tipo == "formula") {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                  <td colspan="2"></td>
                  <td scope="row" colspan="">${sb.nombre}</td>
                  <td>  <input disabled id="Rs-${sb.id}"cvalue="${sb.resultado}" class="form-control form-control-sm inputFormula${ct.id} inputSc${ct.id} inputSubCaCa${ct.id}" columna="resultado" sb='${sb.id}' name="rs-${sb.nombre}" type="number" value="${sb.resultado}" valor="${sb.valor}" readonly  aria-label=".form-control-sm example">              </td>
                  <td></td>
                  <td> <input disabled id="Nt-${sb.id}" class="form-control form-control-sm inputSc${ct.id} inputSubCaCaNota${ct.id}" columna="nota" sb="${sb.id}" name="nt-${sb.nombre}" type="text" value="${sb.nota}"  aria-label=".form-control-sm example"></td>
                  <td>
                  </td>
                </tr>
            `;
            } else {
              if (sb.tipo == "numero") {
                tBodyDiagnosticos.innerHTML += `
              <tr>
                    <td colspan="2"></td>
                    <td scope="row" colspan="">${sb.nombre}</td>
                    <td> <input disabled id="Rs-${sb.id}" value="${sb.resultado}"  class="inputSc${ct.id} form-control form-control-sm inputSubCaCa${ct.id}" columna="resultado" sb="${sb.id}" name="rs-${sb.nombre}" type="number" aria-label=".form-control-sm example">              </td>
                    <td></td>
                    <td>  <input disabled id="Nt-${sb.id}"  class="form-control inputSc${ct.id} form-control-sm inputSubCaCaNota${ct.id}" value="${sb.nota}" name="nt-${sb.nombre}" columna="nota" sb="${sb.id}" type="text"  aria-label=".form-control-sm example">              </td>
                    <td>
                    </td>
                  </tr>
              `;
              } else {
                tBodyDiagnosticos.innerHTML += `
              <tr>
                    <td colspan="2"></td>
                    <td scope="row" colspan="">${sb.nombre}</td>
                    <td>  <input disabled id="Rs-${sb.id}" value="${sb.resultado}" class="form-control form-control-sm inputSc${ct.id} inputSubCaCa${ct.id}" name="rs-${sb.nombre}" columna="resultado" sb="${sb.id}" type="text" aria-label=".form-control-sm example">              </td>
                    <td></td>
                    <td>  <input disabled id="Nt-${sb.id}" class="form-control form-control-sm inputSc${ct.id} inputSubCaCaNota${ct.id}" value="${sb.nota}" columna="nota" sb="${sb.id}" name="nt-${sb.nombre}" type="text" aria-label=".form-control-sm example">              </td>
                    <td>
                    </td>
                  </tr>
              `;
              }
            }
          });
        } else {
          if (ct.rango) {
            if (ct.resultados.length > 0) {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                        <td scope="row" colspan="2">${ct.nombre}</td>
                        <td> <select class="form-select form-select-sm selectRs${ct.nombre} inputExDetallePacCar" rango='${rango.id}' id='inputRs${ct.id}' aria-label="Small select example">
                        <option selected>
                        --
                </option>
                      </select></td>
                        <td>${ct.unidad}</td>
                        <td>${ct.rango.inferior}  -  ${ct.rango.superior}</td>
                        <td>  <input disabled class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' value="${ct.nota}"  aria-label=".form-control-sm example">              </td>
                        
          
                      </tr>
            `;
              ct.resultados.forEach((rs) => {
                if (ct.resultado == rs.resultado) {
                  document.getElementsByClassName(
                    `selectRs${ct.nombre}`
                  )[0].innerHTML += `
                <option selected value="${rs.resultado}">
                ${rs.resultado}
                </option>
                `;
                } else {
                  document.getElementsByClassName(
                    `selectRs${ct.nombre}`
                  )[0].innerHTML += `
                <option value="${rs.resultado}">
                ${rs.resultado}
                </option>
                `;
                }
              });

              document.getElementsByClassName(`selectRs${ct.nombre}`)[0].value =
                ct.resultado;
            } else {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                        <td scope="row" colspan="2">${ct.nombre}</td>
                        <td>  <input disabled class="form-control form-control-sm inputExDetallePacCar" rango='${ct.rango.id}' name='rs-${ct.id}' type="text" id='inputRs${ct.id}' value="${ct.resultado}"  aria-label=".form-control-sm example">              </td>
                        <td>${ct.unidad}</td>
                        <td>${ct.rango.inferior}  -  ${ct.rango.superior}</td>
                        <td><input disabled class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' value="${ct.nota}" aria-label=".form-control-sm example"></td>
                        
          
                      </tr>
            `;
            }
          } else {
            if (ct.resultados.length > 0) {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                        <td scope="row" colspan="2">${ct.nombre}</td>
                        <td> <select disabled class="form-select form-select-sm selectRs${ct.nombre} inputExDetallePacCar" rango='no' id='inputRs${ct.id}' aria-label="Small select example">
                        <option selected>
                        --
                </option>
                      </select></td>
                        <td>${ct.unidad}</td>
                        <td> - </td>
                        <td>  <input disabled class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' value="${ct.nota}" placeholder="Nota" aria-label=".form-control-sm example"></td>
                        
          
                      </tr>
            `;
              ct.resultados.forEach((rs) => {
                if (ct.resultado == rs.resultado) {
                  document.getElementsByClassName(
                    `selectRs${ct.nombre}`
                  )[0].innerHTML += `
                <option selected value="${rs.resultado}">
                ${rs.resultado}
                </option>
                `;
                } else {
                  document.getElementsByClassName(
                    `selectRs${ct.nombre}`
                  )[0].innerHTML += `
                <option value="${rs.resultado}">
                ${rs.resultado}
                </option>
                `;
                }
              });
            } else {
              tBodyDiagnosticos.innerHTML += `
            <tr>
                        <td scope="row" colspan="2">${ct.nombre}</td>
                        <td>  <input disabled class="form-control form-control-sm inputExDetallePacCar" name='rs-${ct.id}' rango='no' type="text" id='inputRs${ct.id}' value='${ct.resultado}' aria-label=".form-control-sm example">              </td>
                        <td>${ct.unidad}</td>
                        <td> - </td>
                        <td>  <input disabled class="form-control form-control-sm inputExDetallePacNota" name='nt-${ct.id}' type="text" id='inputNt${ct.id}' value='${ct.nota}'  aria-label=".form-control-sm example">              </td>
                        
          
                      </tr>
            `;
            }
          }
        }
      }
    });
    document.getElementById('reimprimirModalBtn').setAttribute('onclick', `reimprimirExamen(${idRes})`)
  } catch (error) {
    console.log(error);
  }

};

function reimprimirExamen(id) {
  if (isNaN(id) || id == '') {
    return alert('Error: envie un id de examen valido')
  }
  window.open(`/reimprimir-examen?id=${id}`);
}

async function busquedaOrdenDetallado() {
  const orden = document.getElementById('inputOrdenDet').value
  if (orden == '') {
    return
  }
  let filtrosValue = [
    {
      columna: 'orden', valor: orden
    }
  ]

  const headReport = document.getElementById('tHeadReport')
  const bodyReport = document.getElementById('tBodyReport')
  headReport.innerHTML = ''
  bodyReport.innerHTML = ''

  try {

    const res = await axios.post(
      urlsv + "/api/espejo/get-orden-reportes",
      { filtrosValue, desde: '', hasta: '' });



    res.data.columnas.forEach(c => {
      headReport.innerHTML += `
        <th scope="col">${c}</th>
      `
    })

    examenesArr = res.data.ordenes.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    examenesArr.forEach(e => {

      bodyReport.innerHTML += `
      <tr style="font-size:medium">
                            <td scope="col">${e.id}</td>
                            <td scope="col">${e.orden}</td>
                            <td scope="col">${e.clave == 'orden' ? `<img src="../assets/img/la-milagrosa-logo.png"   width="20" alt="" srcset="">` : ''}${e.clave == 'clave' ? `<img src="../assets/img/salud-vital-logo.png"  width="20" alt="" srcset="">` : ''}${e.clave == 'no' ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="green" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                          </svg>` : ''}</td>
                            <td scope="col">${e.sede}</td>
                            <td scope="col">${e.paciente}</td>
                            <td scope="col">${e.bioanalista}</td>
                            <td scope="col">${e.expediente}</td>
                            <td scope="col">${e.fecha.split('T')[0]}</td>
                            <td scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-eye" viewBox="0 0 16 16" onclick="examenesOrdenPaciente('orden',${e.id})">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg></td>
                            

                          </tr>
      `
    })

  } catch (error) {
    console.log(error)
  }
}

async function busquedaBioanalistaDetallado() {
  const bioanalista = document.getElementById('selectBioanalistaDet').value
  if (bioanalista == '') {
    return
  }
  let filtrosValue = [
    {
      columna: 'bioanalista', valor: bioanalista
    }
  ]

  const headReport = document.getElementById('tHeadReport')
  const bodyReport = document.getElementById('tBodyReport')
  headReport.innerHTML = ''
  bodyReport.innerHTML = ''

  try {

    const res = await axios.post(
      urlsv + "/api/espejo/get-bioanalistas-reportes",
      { filtrosValue, desde: '', hasta: '' }
    );


    res.data.columnas.forEach(c => {
      headReport.innerHTML += `
        <th scope="col">${c}</th>
      `
    })

    examenesArr = res.data.bioanalistas.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    examenesArr.forEach(e => {

      bodyReport.innerHTML += `
      <tr style="font-size:medium">
                            <td scope="col">${e.id}</td>
                            <td scope="col">${e.nombre}</td>
                            <td scope="col">${e.colegio}</td>
                            <td scope="col">${e.ministerio}</td>
                            <td scope="col">${e.telefono}</td>
                            <td scope="col">${e.direccion}</td>
                            

                          </tr>
      `
    })

  } catch (error) {
    console.log(error)
  }
}


async function busquedaExamenDetallado() {
  const examen = document.getElementById('inputExamenDet').value
  if (examen == '') {
    return
  }
  let filtrosValue = [
    {
      columna: 'examen', valor: examen
    }
  ]

  const headReport = document.getElementById('tHeadReport')
  const bodyReport = document.getElementById('tBodyReport')
  headReport.innerHTML = ''
  bodyReport.innerHTML = ''

  try {
    const res = await axios.post(
      urlsv + "/api/espejo/get-examenes-reportes",
      { filtrosValue, desde: '', hasta: '' });

    res.data.columnas.forEach(c => {
      headReport.innerHTML += `
        <th scope="col">${c}</th>
      `
    })

    examenesArr = res.data.examenes.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    examenesArr.forEach(e => {

      bodyReport.innerHTML += `
      <tr style="font-size:medium">
                            <td scope="col">${e.id}</td>
                            <td scope="col">${e.nombre}</td>
                            <td scope="col">${e.seccion}</td>
                            <td scope="col">${e.paciente}</td>
                            <td scope="col">${e.bioanalista}</td>
                            <td scope="col">${e.clave == 'orden' ? `<img src="../assets/img/la-milagrosa-logo.png"   width="20" alt="" srcset="">` : ''}${e.clave == 'clave' ? `<img src="../assets/img/salud-vital-logo.png"  width="20" alt="" srcset="">` : ''}${e.clave == 'no' ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="green" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                          </svg>` : ''}  - ${e.orden}</td>
                            <td scope="col">${e.sede}</td>
                            <td scope="col">${e.categoria}</td>
                            <td scope="col">${e.fecha.split('T')[0]}</td>
                            <td scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-eye" style="cursor:pointer" viewBox="0 0 16 16" onclick="abrirResultadosModal('${e.nombre}','${e.id_pac}','${e.id}')">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg></td>
                            

                          </tr>
      `
    })

  } catch (error) {
    console.log(error)
  }
}



async function busquedaPacienteDetallado() {
  const paciente = document.getElementById('inputPacienteDet').value
  if (paciente == '') {
    return
  }
  let filtrosValue = [
    {
      columna: 'paciente', valor: paciente
    }
  ]


  const headReport = document.getElementById('tHeadReport')
  const bodyReport = document.getElementById('tBodyReport')

  headReport.innerHTML = ''
  bodyReport.innerHTML = ''
  try {
    const res = await axios.post(
      urlsv + "/api/espejo/get-pacientes-reportes",
      { filtrosValue, desde: '', hasta: '' }
    );

    res.data.columnas.forEach(c => {
      headReport.innerHTML += `
        <th scope="col">${c}</th>
      `
    })

    res.data.pacientes.forEach(e => {
      bodyReport.innerHTML += `
      <tr>
                            <td scope="col">${e.id}</td>
                            <td scope="col">${e.cedula}</td>
                            <td scope="col">${e.nombre}</td>
                            <td scope="col">${e.genero == 'Hombre' ? 'Masculino' : 'Femenino'}</td>
                            <td scope="col">${calcularEdad(e.fecha_nacimiento.split('T')[0])}</td>
                            <td scope="col">${e.telefono}</td>
                            <td scope="col">${e.direccion}</td>
                            <td scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-eye" viewBox="0 0 16 16" onclick="examenesOrdenPaciente('paciente',${e.id})">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg></td>
                          </tr>
      `
    })





  } catch (error) {
    console.log(error)
  }
}


async function examenesOrdenPaciente(tipo, id) {

  if (id == '') {
    return
  }
  let filtrosValue = [
    {
      columna: tipo, valor: id
    }
  ]
  const desdeFecha = document.getElementById('fechaDesdeInput').value;
  const hastaFecha = document.getElementById('fechaHastaInput').value;
  if (hastaFecha == '' || desdeFecha == '') {
    document.getElementById('alertFiltro').innerHTML = 'Por Favor seleccione la fecha a filtrar'
    document.getElementById('alertFiltro').removeAttribute('hidden')

    setTimeout(() => {
      document.getElementById('alertFiltro').setAttribute('hidden', 'true')

    }, 3000);
    return
  }

  const headReport = document.getElementById('tHeadReport')
  const bodyReport = document.getElementById('tBodyReport')
  headReport.innerHTML = ''
  bodyReport.innerHTML = ''

  try {

    const res = await axios.post(
      urlsv + "/api/espejo/get-examenes-reportes",
      { filtrosValue, desde: desdeFecha, hasta: hastaFecha }
    );

    res.data.columnas.forEach(c => {
      headReport.innerHTML += `
        <th scope="col">${c}</th>
      `
    })

    examenesArr = res.data.examenes.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    examenesArr.forEach(e => {

      bodyReport.innerHTML += `
      <tr style="font-size:medium">
                            <td scope="col">${e.id}</td>
                            <td scope="col">${e.nombre}</td>
                            <td scope="col">${e.seccion}</td>
                            <td scope="col">${e.paciente}</td>
                            <td scope="col">${e.bioanalista}</td>
                            <td scope="col">${e.clave == 'orden' ? `<img src="../assets/img/la-milagrosa-logo.png"   width="20" alt="" srcset="">` : ''}${e.clave == 'clave' ? `<img src="../assets/img/salud-vital-logo.png"  width="20" alt="" srcset="">` : ''}${e.clave == 'no' ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="green" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                          </svg>` : ''}  - ${e.orden}</td>
                            <td scope="col">${e.sede}</td>
                            <td scope="col">${e.categoria}</td>
                            <td scope="col">${e.fecha.split('T')[0]}</td>
                            <td scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" class="bi bi-eye" style="cursor:pointer" viewBox="0 0 16 16" onclick="abrirResultadosModal('${e.nombre}','${e.id_pac}','${e.id}')">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg></td>
                            

                          </tr>
      `
    })

  } catch (error) {
    console.log(error)
  }


}



async function busquedapaciente() {
  const empresaRatios = document.getElementsByName('tipoOrden')
  const empresa = [...empresaRatios].find(e => e.checked == true).value
  const examen = document.getElementById("examenInputPaciente").value;
  const sede = document.getElementById("selectSedePaciente").value;
  const bioanalista = document.getElementById("selectBioanalistaPaciente").value;
  const categoria = document.getElementById("selectCategoriaPaciente").value;
  const seccion = document.getElementById("selectSeccionPaciente").value;
  const genero = document.getElementById("selectGeneroPaciente").value;
  const usuario = document.getElementById("usuariosSelectPaciente").value;
  const desde = document.getElementById("inputDesdePaciente").value;
  const hasta = document.getElementById("inputHastaPaciente").value;
  const desdeFecha = document.getElementById('fechaDesdeInput').value;
  const hastaFecha = document.getElementById('fechaHastaInput').value;

  if (hastaFecha == '' || desdeFecha == '') {
    document.getElementById('alertFiltro').innerHTML = 'Por Favor seleccione la fecha a filtrar'
    document.getElementById('alertFiltro').removeAttribute('hidden')

    setTimeout(() => {
      document.getElementById('alertFiltro').setAttribute('hidden', 'true')

    }, 3000);

  }

  let filtros = [
    {
      columna: 'empresa', valor: empresa
    },
    {
      columna: 'examen', valor: examen
    },
    {
      columna: 'sede', valor: sede
    },
    {
      columna: 'bioanalista', valor: bioanalista
    },
    {
      columna: 'categoria', valor: categoria
    },
    {
      columna: 'seccion', valor: seccion
    },
    {
      columna: 'desde', valor: desde
    },
    {
      columna: 'hasta', valor: hasta
    },
    {
      columna: 'usuario', valor: usuario
    },
    {
      columna: 'genero', valor: genero
    }


  ]

  const filtrosValue = filtros.filter(e => e.valor != '')
  const headReport = document.getElementById('tHeadReport')
  const bodyReport = document.getElementById('tBodyReport')

  headReport.innerHTML = ''
  bodyReport.innerHTML = ''
  try {


    const res = await axios.post(
      urlsv + "/api/espejo/get-pacientes-reportes",
      { filtrosValue, desde: desdeFecha, hasta: hastaFecha }
    );
    Data = res.data.pacientes

    res.data.columnas.forEach(c => {
      headReport.innerHTML += `
        <th scope="col" data-bs-toggle="modal" data-bs-target="#modalTotales" onclick="contarPacientes('${c}')">${c}</th>
      `
    })

    res.data.pacientes.forEach(e => {
      bodyReport.innerHTML += `
      <tr>
                            <td scope="col">${e.id}</td>
                            <td scope="col">${e.cedula}</td>
                            <td scope="col">${e.nombre}</td>
                            <td scope="col">${e.genero == 'Hombre' ? 'Masculino' : 'Femenino'}</td>
                            <td scope="col">${calcularEdad(e.fecha_nacimiento.split('T')[0])}</td>
                            <td scope="col">${e.telefono}</td>
                            <td scope="col">${e.direccion}</td>
                            <td scope="col"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-eye" viewBox="0 0 16 16" onclick="examenesOrdenPaciente('paciente',${e.id})">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg></td>
                          </tr>
      `
    })






  } catch (error) {
    console.log(error)
  }



}

function calcularEdad(fecha) {
  const mes = moment(fecha).format("MM");
  const ano = moment(fecha).format("YYYY");
  const dia = moment(fecha).format("DD");

  const mesAc = moment().format("MM");
  const anoAc = moment().format("YYYY");
  const diaAc = moment().format("DD");

  let mesR = mesAc - mes;
  let diaR = diaAc - dia;
  let anoR = anoAc - ano;

  if (mesR < 0) {
    mesR = mesR + 12;
    anoR--;
  }
  if (diaR < 0) {
    mesR--;
  }

  return `${anoR} años;  ${mesR} meses`;
}


const abrirModalPacientes = (event) => {




  new bootstrap.Modal("#pacientes-list").toggle();
  const menu = document.getElementById('menuPacientesUl')
  menu.innerHTML = ''
  pacientesArray.forEach(e => {
    menu.innerHTML += `
        <li class="list-group-item list-group-item-light list-group-item-action" >
          <div class="row">
            <div class="col-3">
              <span class="">${e.cedula}</span>

            </div>
            <div class="col-6">
              <span class="">${e.nombre.trim()}</span>

            </div>
            <div class="col-3 d-flex justify-content-end align-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" data-bs-dismiss="modal" style="cursor:pointer" width="24" height="24" fill="green" onclick="setInputPaciente(${e.id},'${event.target.tagName == 'BUTTON' ? `${event.target.parentNode.children[1].id}` : event.target.tagName == 'path' ? `${event.target.parentNode.parentNode.parentNode.children[1].id}` : `${event.target.parentNode.parentNode.children[1].id}`}')" class="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg>
            </div>

          </div>
        </li> 
        `
  })

}

function contarPacientes(col) {
  const tBody = document.getElementById('tBodyTotales')

  total = Data.length
  objetos = []
  let setOp = new Set()

  switch (col) {
    case 'Cedula':
      Data.forEach(e => setOp.add(e.cedula))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.cedula == s).length
        })

      })
      break;
    case 'Nombre':
      Data.forEach(e => setOp.add(e.nombre))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.nombre == s).length
        })

      })
      break;
    case 'Genero':
      Data.forEach(e => setOp.add(e.genero))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.genero == s).length
        })

      })
      break;
    default:
      document.getElementById('h1ModalTotales').innerText = `ESTA COLUMNA NO ES CONTABLE`
      tBody.innerHTML = ''
      return
      break;
  }


  document.getElementById('h1ModalTotales').innerText = `Pacientes - ${col}`
  tBody.innerHTML = ''
  objetos.forEach(e => {
    tBody.innerHTML += `
    <tr>
              <td>${e.nombre}</td>
              <td>${e.cuenta}</td>
              <td>${((e.cuenta / total) * 100).toFixed(2)} %</td>
            </tr>
    
    `
  })
  tBody.innerHTML += `
  <tr>
              <td>Total</td>
              <td>${total}</td>
              <td></td>
            </tr>
  `

}


function contarExternos(col) {
  const tBody = document.getElementById('tBodyTotales')

  total = Data.length
  objetos = []
  let setOp = new Set()


  switch (col) {
    case 'Seccion': Data.forEach(e => setOp.add(e.seccion))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.seccion == s).length
        })

      })
      break;
    case 'Nombre': Data.forEach(e => setOp.add(e.examen))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.examen == s).length
        })

      })
      break;
    case 'Paciente': Data.forEach(e => setOp.add(e.paciente))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.paciente == s).length
        })

      })
      break;
    case 'Bioanalista': Data.forEach(e => setOp.add(e.bioanalista))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.bioanalista == s).length
        })

      })
      break;
    case 'Categoria':
      Data.forEach(e => setOp.add(e.categoria))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.categoria == s).length
        })

      })
      break;
    case 'Fecha':
      Data.forEach(e => setOp.add(e.fecha.split('T')[0]))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.fecha.split('T')[0] == s).length
        })

      })
      break;
    case 'Laboratorio':
      Data.forEach(e => setOp.add(e.laboratorio))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.laboratorio == s).length
        })

      })
      break;
    case 'Usuario':
      Data.forEach(e => setOp.add(e.usuario))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.usuario == s).length
        })

      })
      break;
    default: document.getElementById('h1ModalTotales').innerText = `ESTA COLUMNA NO ES CONTABLE`
      tBody.innerHTML = ''
      return
      break;

  }



  document.getElementById('h1ModalTotales').innerText = `Examenes Externos - ${col}`
  tBody.innerHTML = ''
  objetos.forEach(e => {
    tBody.innerHTML += `
    <tr>
              <td>${e.nombre}</td>
              <td>${e.cuenta}</td>
              <td>${((e.cuenta / total) * 100).toFixed(2)} %</td>
            </tr>
    
    `
  })
  tBody.innerHTML += `
  <tr>
              <td>Total</td>
              <td>${total}</td>
              <td></td>
            </tr>
  `

}



function contarExamenes(col) {
  const tBody = document.getElementById('tBodyTotales')

  total = Data.length
  objetos = []
  let setOp = new Set()


  switch (col) {
    case 'Seccion': Data.forEach(e => setOp.add(e.seccion))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.seccion == s).length
        })

      })
      break;
    case 'Nombre': Data.forEach(e => setOp.add(e.nombre))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.nombre == s).length
        })

      })
      break;
    case 'Paciente': Data.forEach(e => setOp.add(e.paciente))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.paciente == s).length
        })

      })
      break;
    case 'Bioanalista': Data.forEach(e => setOp.add(e.bioanalista))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.bioanalista == s).length
        })

      })
      break;
    case 'Categoria':
      Data.forEach(e => setOp.add(e.categoria))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.categoria == s).length
        })

      })
      break;
    case 'Fecha':
      Data.forEach(e => setOp.add(e.fecha.split('T')[0]))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.fecha.split('T')[0] == s).length
        })

      })
      break;
    case 'Sede':
      Data.forEach(e => setOp.add(e.sede))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.sede == s).length
        })

      })
      break;
    default: document.getElementById('h1ModalTotales').innerText = `ESTA COLUMNA NO ES CONTABLE`
      tBody.innerHTML = ''
      return
      break;

  }



  document.getElementById('h1ModalTotales').innerText = `Examenes - ${col}`
  tBody.innerHTML = ''
  objetos.forEach(e => {
    tBody.innerHTML += `
    <tr>
              <td>${e.nombre}</td>
              <td>${e.cuenta}</td>
              <td>${((e.cuenta / total) * 100).toFixed(2)} %</td>
            </tr>
    
    `
  })
  tBody.innerHTML += `
  <tr>
              <td>Total</td>
              <td>${total}</td>
              <td></td>
            </tr>
  `

}

function contarOrdenes(col) {
  const tBody = document.getElementById('tBodyTotales')

  total = Data.length
  objetos = []
  let setOp = new Set()


  switch (col) {
    case 'Orden': Data.forEach(e => setOp.add(e.orden))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.orden == s).length
        })

      })
      break;
    case 'Empresa': Data.forEach(e => setOp.add(e.clave))
      setOp.forEach(s => {
        let imagen
        if (s == 'clave') {
          imagen = `<img src="../imgs/la-milagrosa-logo.png"   width="30" alt="" srcset="">`

        }
        if (s == 'orden') {
          imagen = `<img src="../imgs/salud-vital-logo.png"   width="30" alt="" srcset="">`
        }

        if (s == 'no') {
          imagen = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"  fill="green" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                          </svg>`
        }

        objetos.push({


          nombre: imagen,
          cuenta: Data.filter(e => e.clave == s).length
        })

      })
      break;
    case 'Paciente': Data.forEach(e => setOp.add(e.paciente))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.paciente == s).length
        })

      })
      break;
    case 'Bioanalista': Data.forEach(e => setOp.add(e.bioanalista))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.bioanalista == s).length
        })

      })
      break;
    case 'Expediente':
      Data.forEach(e => setOp.add(e.expediente))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.expediente == s).length
        })

      })
      break;
    case 'Fecha':
      Data.forEach(e => setOp.add(e.fecha.split('T')[0]))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.fecha.split('T')[0] == s).length
        })

      })
      break;
    case 'Sede':
      Data.forEach(e => setOp.add(e.sede))
      setOp.forEach(s => {
        objetos.push({
          nombre: s,
          cuenta: Data.filter(e => e.sede == s).length
        })

      })
      break;
    default: document.getElementById('h1ModalTotales').innerText = `ESTA COLUMNA NO ES CONTABLE`
      tBody.innerHTML = ''
      return
      break;

  }



  document.getElementById('h1ModalTotales').innerText = `Examenes - ${col}`
  tBody.innerHTML = ''
  objetos.forEach(e => {
    tBody.innerHTML += `
    <tr>
              <td>${e.nombre}</td>
              <td>${e.cuenta}</td>
              <td>${((e.cuenta / total) * 100).toFixed(2)} %</td>
            </tr>
    
    `
  })
  tBody.innerHTML += `
  <tr>
              <td>Total</td>
              <td>${total}</td>
              <td></td>
            </tr>
  `

}

const abrirModalPacientes2 = (event) => {
  new bootstrap.Modal("#pacientes-list").toggle();

  const menu = document.getElementById('menuPacientesUl')
  menu.innerHTML = ''
  pacientesArray.forEach(e => {
    menu.innerHTML += `
        <li class="list-group-item list-group-item-light list-group-item-action" >
          <div class="row">
            <div class="col-3">
              <span class="">${e.cedula}</span>

            </div>
            <div class="col-6">
              <span class="">${e.nombre.trim()}</span>

            </div>
            <div class="col-3 d-flex justify-content-end align-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" data-bs-dismiss="modal" style="cursor:pointer" width="24" height="24" fill="green" onclick="setInputPaciente(${e.id},'${event.target.tagName == 'BUTTON' ? `${event.target.parentNode.children[0].id}` : event.target.tagName == 'path' ? `${event.target.parentNode.parentNode.parentNode.children[0].id}` : `${event.target.parentNode.parentNode.children[0].id}`}')" class="bi bi-check-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
              <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
            </svg>
            </div>

          </div>
        </li> 
        `
  })

}


const abrirModalExamenes = (event, tipo) => {

  new bootstrap.Modal("#examenes-list").toggle();

  seccionSelec = document.getElementById("seccionExamenSelect");
  seccionSelec.setAttribute('onchange', `validarSelectSeccion(value,'${tipo}','${event.target.tagName == 'BUTTON' ? `${event.target.parentNode.children[0].id}` : event.target.tagName == 'svg' ? `${event.target.parentNode.parentNode.children[0].id}` : `${event.target.parentNode.parentNode.parentNode.children[0].id}`}')`)

  input = document.getElementById("examenDiagnosticoInput");
  input.setAttribute('oninput', `buscarExamen('${tipo}','${event.target.tagName == 'BUTTON' ? `${event.target.parentNode.children[0].id}` : event.target.tagName == 'svg' ? `${event.target.parentNode.parentNode.children[0].id}` : `${event.target.parentNode.parentNode.parentNode.children[0].id}`}')`)
  const menuDiagnosticoUl = document.getElementById("menuDiagnosticoUl");
  menuDiagnosticoUl.innerHTML = ''
  examenesArray.forEach((ex) => {
    menuDiagnosticoUl.innerHTML += `
    <li class="list-group-item list-group-item-light list-group-item-action" >
          <div class="row">
            <div class="col-9">
              <span class="">${ex.nombre}</span>

            </div>
            <div class="col-3 d-flex justify-content-end align-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer" data-bs-dismiss="modal" onclick="setInputExamen(${ex.id},'${event.target.tagName == 'BUTTON' ? `${event.target.parentNode.children[0].id}` : event.target.tagName == 'path' ? `${event.target.parentNode.parentNode.parentNode.children[0].id}` : `${event.target.parentNode.parentNode.children[0].id}`}','${tipo}')" width="24" height="24" fill="green" class="bi bi-check-circle " viewBox="0 0 16 16">
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
