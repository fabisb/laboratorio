let bioArray,sedeArray,seccionesArray,categoriasArray,laboratoriosArray

async function tok(){
    let token = await login.getToken()
    nivelUser = token.nivel
    cedulaUser= token.cedula
  
    const elementsNivel= document.getElementsByClassName('user'+nivelUser)
    console.log(elementsNivel)
    for (const e of elementsNivel) {
      e.removeAttribute('hidden','true')
      
    }
  }


 async function render(){
    var { token } = await login.getToken();

    try {
        let { data: bioanalistas } = await axios.get(
            urlsv + "/api/examenes/get-bioanalistas",
            { headers: { token } }
          );
          
          bioArray=bioanalistas
          const selects = document.getElementsByClassName('bioanalistaSelect')
        for (let index = 0; index < selects.length; index++) {
            const element = selects[index];
            element.innerHTML=`
            <option value='' selected>Bioanalista</option>
            `
            bioArray.forEach(e => {
                element.innerHTML+=`
            <option value='${e.id}'>${e.nombre}</option>
            
            `
            });
            
            
        }
          
          
    } catch (error) {
        console.log(error)
        
    }
    try {
        let { data: usuarios } = await axios.get(
            urlsv + "/api/estadisticas/get-users",
            { headers: { token } }
          );

          usuarioArray=usuarios
          const selects = document.getElementsByClassName('selectUsuario')
        for (let index = 0; index < selects.length; index++) {
            const element = selects[index];
            element.innerHTML=`
            <option value='' selected>Usuario</option>
            `
            usuarioArray.forEach(e => {
                element.innerHTML+=`
            <option value='${e.id}'>${e.nombre}</option>
            
            `
            });
            
            
        }
          console.log(usuarios)
    } catch (error) {
        console.log(error)
        
    }
    try {
        const { data: laboratorios } = await axios.get(
            urlsv + "/api/modulo-examenes/laboratorios",
            { headers: { token } }
          );
          console.log(laboratorios)
          laboratoriosArray=laboratorios
          const selects = document.getElementsByClassName('laboratorioSelect')
        for (let index = 0; index < selects.length; index++) {
            const element = selects[index];
            element.innerHTML=`
            <option value='' selected>Laboratorio</option>
            `
            laboratoriosArray.forEach(e => {
                element.innerHTML+=`
            <option value='${e.id}'>${e.razon_social}</option>`
            });
            
            
        }
    } catch (error) {
        console.log(error)
        
    }
    try {
        const secciones = await axios.get(
            urlsv + "/api/modulo-examenes/secciones",
            { headers: { token } }
          );
          console.log(secciones)
          seccionesArray=secciones.data
          const selects = document.getElementsByClassName('seccionSelect')
        for (let index = 0; index < selects.length; index++) {
            const element = selects[index];
            element.innerHTML=`
            <option value='' selected>Seccion</option>
            `
            seccionesArray.forEach(e => {
                element.innerHTML+=`
            <option value='${e.id}'>${e.nombre}</option>
            
            `
            });
            
            
        }
    } catch (error) {
        console.log(error)
        
    }
    try {
        const categorias = await axios.get(
            urlsv + "/api/modulo-examenes/categorias",
            { headers: { token } }
          );
          console.log(categorias)
          categoriasArray=categorias.data
          const selects = document.getElementsByClassName('categoriaSelect')
        for (let index = 0; index < selects.length; index++) {
            const element = selects[index];
            element.innerHTML=`
            <option value='' selected>Categoria</option>
            `
            categoriasArray.forEach(e => {
                element.innerHTML+=`
            <option value='${e.id}'>${e.nombre}</option>
            
            `
            });
            
            
        }

    } catch (error) {
        console.log(error)
        
    }
    try {
        const { data: sedes } = await axios.get(urlsv + "/api/users/sedes");
        console.log(sedes)
        sedeArray=sedes
        const selectsSede = document.getElementsByClassName('sedeSelect')
        console.log(selectsSede)
        for (let index = 0; index < selectsSede.length; index++) {
            const element = selectsSede[index];
            element.innerHTML=`
            <option value='' selected>Sede</option>
            `
            sedeArray.forEach(e => {
                element.innerHTML+=`
            <option value='${e.id}'>${e.nombre}</option>
            
            `
            });
            
            
        }
        
    } catch (error) {
        console.log(error)
    }
    
 } 


function validarInputsExamenPaciente(value){
    const inputEx=document.getElementById('examenInputPaciente')
    const selectCat=document.getElementById('selectCategoriaPaciente')
    const selectSec=document.getElementById('selectSeccionPaciente')
    if(value=='examen'){
        selectCat.value=''
        selectSec.value=''
    }else{
        inputEx.value=''
    }
    
} 

function validarInputExamenEx(value){
    const examenInp=document.getElementById('inputExamenEx')
    const pacienteInp=document.getElementById('inputPacienteEx')
    const ordenInp=document.getElementById('inputOrdenEx')
    const SedeInp=document.getElementById('selectSedeExamen')
    const BioanalistaInp=document.getElementById('selectBioanalistaExamen')
    const CategoriaInp=document.getElementById('selectCategoriaExamen')
    const SeccionInp=document.getElementById('selectSeccionExamen')
    const GeneroInp=document.getElementById('selectGeneroExamen')
    const UsuarioInp=document.getElementById('usuariosSelectExamen')
    const TipoInp=document.getElementById('selectTipoExamen')
    const LaboratorioInp=document.getElementById('selectLaboratorioExamen')
    const desdeInp=document.getElementById('inputDesdeExamen')
    const hastaInp=document.getElementById('inputHastaExamen')







    switch (value) {
        case 'examen':
            CategoriaInp.value=''; SeccionInp.value=''
        break;
        case 'paciente': ordenInp.value="";GeneroInp.value="";desdeInp.value='';hastaInp.value='' 
        break;
        case 'orden': pacienteInp.value=""; UsuarioInp.value=""; GeneroInp.value="";desdeInp.value="";hastaInp.value="";SedeInp.value="";BioanalistaInp.value="";TipoInp.value="";LaboratorioInp.value="";
        break;
        case 'sede': ordenInp.value='';
        break;
        case 'bioanalista': ordenInp.value=''; LaboratorioInp.value=''; TipoInp.value='';
        break;
        case 'categoria': examenInp.value='';
        break;
        case 'seccion': examenInp.value='';
        break;
        case 'genero': pacienteInp.value='';
        break;
        case 'edad': pacienteInp.value='';ordenInp.value='';
        break;
        case 'usuario' : ordenInp.value="";
        break;
        case 'externo' : ordenInp.value=''; BioanalistaInp.value='';
        break;
        case 'local' : LaboratorioInp.value="";
        break;
        case 'laboratorio' : TipoInp.value="externo";
        break;


    }
}