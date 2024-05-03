let usuariosArray=[]
let examenesArray=[]


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

  function activarFormulario(){
    const formulario = document.getElementsByClassName('formulario');
    const formArr=[...formulario]
    formArr.forEach(e=> {
      e.removeAttribute('disabled')
      e.value=''

     })
  }
  function desactivarFormulario(){
    const formulario = document.getElementsByClassName('formulario');
    const formArr=[...formulario]
    formArr.forEach(e=> {
      e.setAttribute('disabled','true')
      e.value=''
     })
  }

  function validarSelectTipo(value){
    const biodiv=document.getElementsByClassName('bioanalistaDiv')

    if(value==3){

      for (let index = 0; index < biodiv.length; index++) {
        const element = biodiv[index];
        element.value=''
        element.removeAttribute('hidden');
        
      }
    }else{
      for (let index = 0; index < biodiv.length; index++) {
        const element = biodiv[index];
        element.value=''
        element.setAttribute('hidden','true');
        
      }
    }
  }

  function modificarFormulario(id,nombre){
    activarFormulario()
    const usuario=document.getElementById('spanUser')
    usuario.innerText=`${nombre}`
    const biodiv=document.getElementsByClassName('bioanalistaDiv')

    for (let index = 0; index < biodiv.length; index++) {
      const element = biodiv[index];
      element.setAttribute('hidden','true')
      
    }
    const usuarioInfo = usuariosArray.usuarios.find(e=>e.id==id)

    const nombreInp=document.getElementById('nombre');
    const direccionInp=document.getElementById('direccion');
    const correoInp=document.getElementById('correo');
    const tipoInp=document.getElementById('tipo');

    if(usuarioInfo.nivel==3){
      let bioanalista = usuariosArray.bioanalistas.filter(e=>e.id==44)
      const colegioInp=document.getElementById('colegio');
      const ministerioInp=document.getElementById('ministerio');
      const firmaInp=document.getElementById('firma');

      for (let index = 0; index < biodiv.length; index++) {
        const element = biodiv[index];
        element.removeAttribute('hidden')
        
      }
      colegioInp.value=bioanalista[0].colegio
      ministerioInp.value=bioanalista[0].ministerio
    
    }
    nombreInp.value=usuarioInfo.nombre;
    direccionInp.value=usuarioInfo.direccion;
    correoInp.value=usuarioInfo.correo;
    tipoInp.value=usuarioInfo.nivel;

  }

  function crearUsuario(){
    const biodiv=document.getElementsByClassName('bioanalistaDiv')

    for (let index = 0; index < biodiv.length; index++) {
      const element = biodiv[index];
      element.setAttribute('hidden','true')
      
    }
    const usuario=document.getElementById('spanUser')
    usuario.innerText=`CREANDO....`
    activarFormulario()
    
  }

  const buscarUsuarioTable = (value)=>{
    let parse= parseInt(value)
    const tBody = document.getElementById('tBodyUsuarios')
    tBody.innerHTML=``
    let resultado=[]
    if(isNaN(parse)){
        resultado = usuariosArray.usuarios.filter(pc=> pc.nombre.toLowerCase().includes(value.toLowerCase()))
    }else{
        resultado = usuariosArray.usuarios.filter(pc=> pc.cedula.toString().includes(value))


    }
    resultado.forEach(user=>{
        tBody.innerHTML+=`
        <tr>
                      <td scope="col">${user.cedula}</td>
                      <td scope="col">${user.nombre}</td>
                      <td scope="col">${user.direccion}</td>
                      <td scope="col">${user.correo}</td>
                      <td scope="col">${user.telefono}</td>
                      <td scope="col">${user.nivel}</td>
                      <td scope="col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" onclick="modificarFormulario(${user.id},'${user.nombre}')" style="cursor:pointer" class="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </td>
                    </tr>
        `
    })


  }






const buscarUsuarios = async ()=>{
  const {data}=await axios.get('/api/espejo/get-usuarios');
  console.log("🚀 ~ buscarUsuarios ~ data:", data)
  usuariosArray=data
  const tBody = document.getElementById(`tBodyUsuarios`)
  tBody.innerHTML=""
  data.usuarios.forEach(user=>{
    try {
    let bioanalista = data.bioanalistas.find(e=>e.id==user.bioanalista)
      
    } catch (error) {
      
    }

    tBody.innerHTML+=`
    <tr>
                      <td scope="col">${user.cedula}</td>
                      <td scope="col">${user.nombre}</td>
                      <td scope="col">${user.direccion}</td>
                      <td scope="col">${user.correo}</td>
                      <td scope="col">${user.telefono}</td>
                      <td scope="col">${user.nivel}</td>
                      <td scope="col">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" class="bi bi-pencil-square" onclick="modificarFormulario(${user.id},'${user.nombre}')"  style="cursor:pointer" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </td>
                    </tr>
    `
  })
}