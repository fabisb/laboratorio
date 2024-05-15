let usuariosArray=[],users=[]
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

function buscarUserFiltro(value){
  const tBody = document.getElementById(`tBodyUsuarios`);
  
  tBody.innerHTML = "";
  let usersFiltro = []

  value== '' ? usersFiltro = users : isNaN(value) ? usersFiltro = users.filter(e=>e.nombre.toLowerCase().includes(value.toLowerCase())) : usersFiltro =users.filter(e=>e.cedula.includes(value))
  usersFiltro.forEach((user) => {
    

    tBody.innerHTML += `
                    <tr>
                  <th scope="row">${user.cedula}</th>
                  <td>${user.nombre}</td>
                  <td>${user.nivel == 1 ? 'Administrador' : user.nivel ==2 ? 'Auxiliar' : 'Bioanalista'}</td>
                  <td style="cursor:pointer">${user.status == 'activo' ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green"  onclick="cambiarStatus('inactivo','${user.nivel == 1 ? 'administrador' : user.nivel ==2 ? 'auxiliar' : 'bioanalista'}','${user.id}')" class="bi bi-check-square mx-1" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                  </svg>`:
                  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-octagon" viewBox="0 0 16 16"  onclick="cambiarStatus('activo','${user.nivel == 1 ? 'administrador' : user.nivel ==2 ? 'auxiliar' : 'bioanalista'}','${user.id}')">
                    <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>`}</td>
                  <td><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="green"
                    class="bi bi-eye mx-1"
                    viewBox="0 0 16 16"
                    style="cursor:pointer"
                  >
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                    />
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" class="bi bi-pencil-square"   style="cursor:pointer" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></td>
                </tr>
    `;
  });
}

function buscarUserTipo(value){
  const tBody = document.getElementById(`tBodyUsuarios`);
  
  tBody.innerHTML = "";
  value=='todos' ? users=usuariosArray.usuarios :   users = usuariosArray.usuarios.filter(e=>e.nivel == value);
  users.forEach((user) => {
    

    tBody.innerHTML += `
                    <tr>
                  <th scope="row">${user.cedula}</th>
                  <td>${user.nombre}</td>
                  <td>${user.nivel == 1 ? 'Administrador' : user.nivel ==2 ? 'Auxiliar' : 'Bioanalista'}</td>
                  <td style="cursor:pointer">${user.status == 'activo' ? `<svg xmlns="http://www.w3.org/2000/svg" onclick="cambiarStatus('inactivo','${user.nivel == 1 ? 'administrador' : user.nivel ==2 ? 'auxiliar' : 'bioanalista'}','${user.id}')" width="20" height="20" fill="green" class="bi bi-check-square mx-1" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                  </svg>`:
                  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" onclick="cambiarStatus('activo','${user.nivel == 1 ? 'administrador' : user.nivel ==2 ? 'auxiliar' : 'bioanalista'}','${user.id}')" class="bi bi-x-octagon" viewBox="0 0 16 16">
                    <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>`}</td>
                  <td><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="green"
                    class="bi bi-eye mx-1"
                    viewBox="0 0 16 16"
                    style="cursor:pointer"
                  >
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                    />
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" class="bi bi-pencil-square"   style="cursor:pointer" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></td>
                </tr>
    `;
  });
  
}

function detalleUsuario(id){
  const usuario = usuariosArray.usuarios.find(e=>e.id==id)
  let bio
  const pre_cedula = document.getElementById("precedula")
  const cedula = document.getElementById("cedula")
  const nombre = document.getElementById("nombre")
  const clave = document.getElementById("clave")
  const direccion = document.getElementById("direccion")
  const correo = document.getElementById("correo")
  const telefono = document.getElementById("telefono")
  const ministerio = document.getElementById("ministerio")
  const colegio = document.getElementById("colegio")
  const bioDiv=document.getElementsByClassName('bioanalistaDiv')
  const formulario = document.getElementsByClassName('formulario')
  for (let index = 0; index < formulario.length; index++) {
    const element = formulario[index];
    element.setAttribute('disabled','true')
    
  }

  if(usuario.nivel == 3){
    pre_cedula.value = usuario.pre_cedula
    cedula.value = usuario.cedula
    nombre.value = usuario.nombre
    direccion.value = usuario.direccion
    correo.value=usuario.correo
    telefono.value=usuario.telefono
    bio = usuariosArray.bioanalistas.find(e=>e.id==usuario.bioanalista)
    ministerio.value=bio.ministerio
    colegio.value=bio.colegio

    for (let index = 0; index < bioDiv.length; index++) {
      const element = bioDiv[index];
      element.removeAttribute('hidden')
      
    }
    return
  }

  for (let index = 0; index < bioDiv.length; index++) {
    const element = bioDiv[index];
    element.setAttribute('hidden','true')
    
  }
  pre_cedula.value = usuario.pre_cedula
    cedula.value = usuario.cedula
    nombre.value = usuario.nombre
    direccion.value = usuario.direccion
    correo.value=usuario.correo
    telefono.value=usuario.telefono





}

const guardarUsuario = async (tipo) => {
  const pre_cedula = document.getElementById("precedula").value;
  const cedula = document.getElementById("cedula").value;
  const nombre = document.getElementById("nombre").value;
  const clave = document.getElementById("clave").value;
  const direccion = document.getElementById("direccion").value;
  const correo = document.getElementById("correo").value;
  const telefono = document.getElementById("telefono").value;

  if (!isNaN(nombre) || nombre == "") {
    return console.log("Ingrese un nombre valido");
  }
  if (pre_cedula!='V' && pre_cedula != "E" ) {
    return console.log("Ingrese una pre cedula valido");
  }
  if (cedula < 0) {
    return console.log("Ingrese una cedula valida");
  }
  if (telefono < 0 || telefono == "") {
    return console.log("Ingrese un telefono valido");
  }
  if (correo.split("@")[0] == "" || correo.split("@")[1] == "") {
    console.log("Ingrese un correo valido");
    return;
  }
  if (!correo.split("@")[1].split(".")[1].includes("com")) {
    console.log("Ingrese un correo valido");
    return;
  }
  if (clave == "") {
    console.log("Ingrese una clave valida");
    return;
  }
  if (direccion == "") {
    console.log("Ingrese una direccion valida");
    return;
  }
  if (tipo != "1" && tipo != "2" && tipo != "3") {
    console.log("Nivel de usuario no valido");
    return;
  }

  try {
    if (tipo == "3") {
      const ministerio = document.getElementById("ministerio").value;
      const colegio = document.getElementById("colegio").value;
      const firma = await subirImagen();
      console.log("🚀 ~ guardarUsuario ~ firma:", firma)
      const res = await axios.post(urlsv+"/api/creacion/guardar-bioanalista", {
        pre_cedula,
        cedula,
        nombre,
        telefono,
        direccion,
        ministerio,
        colegio,
        foto_firma:firma ?firma  : null,
      });
      const res2 = await axios.post(urlsv+"/api/creacion/guardar-usuario", {
        pre_cedula,
        cedula,
        nombre,
        password:clave,
        telefono,
        direccion,
        correo,
        nivel:tipo,
      });
    } else {
      const res2 = await axios.post(urlsv+"/api/creacion/guardar-usuario", {
        pre_cedula,
        cedula,
        nombre,
        password:clave,
        telefono,
        direccion,
        correo,
        nivel:tipo,
      });
    }
  } catch (error) {
    //CREAR MEJORES ALERTAS
    console.log("🚀 ~ guardarUsuario ~ error:", error);
    
  }
};

function formularioCreacion(nivel){
  console.log(nivel)
  const buttonGuardar = document.getElementById('guardarButton')

  const bioDiv=document.getElementsByClassName('bioanalistaDiv')
  const formulario = document.getElementsByClassName('formulario')
  for (let index = 0; index < formulario.length; index++) {
    const element = formulario[index];
    element.removeAttribute('disabled')
    element.value=''
    
  }

  switch (nivel){
    case '3': 
    console.log('eee')
    for (let index = 0; index < bioDiv.length; index++) {
      const element = bioDiv[index];
      element.removeAttribute('hidden')
      
    }
    
    break;
    case '2':
      for (let index = 0; index < bioDiv.length; index++) {
        const element = bioDiv[index];
        element.setAttribute('hidden',true)

        
      }

      break;
    case '1':
      for (let index = 0; index < bioDiv.length; index++) {
        const element = bioDiv[index];
        element.setAttribute('hidden',true)
        
        
      }

      break;
  }
  buttonGuardar.setAttribute('onclick',`guardarUsuario(${nivel})`)

  
}


const buscarUsuarios = async () => {
  const { token } = await login.getToken();

  const { data } = await axios.get(urlsv+"/api/creacion/buscar-usuarios",{ headers: { token } });
  console.log("🚀 ~ buscarUsuarios ~ data:", data);
  usuariosArray = data;
  users=data.usuarios;
  const tBody = document.getElementById(`tBodyUsuarios`);
  tBody.innerHTML = "";
  data.usuarios.forEach((user) => {
    try {
      let bioanalista = data.bioanalistas.find((e) => e.id == user.bioanalista);
    } catch (error) {}

    tBody.innerHTML += `
                    <tr>
                  <th scope="row">${user.cedula}</th>
                  <td>${user.nombre}</td>
                  <td>${user.nivel == 1 ? 'Administrador' : user.nivel ==2 ? 'Auxiliar' : 'Bioanalista'}</td>
                  <td style="cursor:pointer">${user.status == 'activo' ? `<svg xmlns="http://www.w3.org/2000/svg"  onclick="cambiarStatus('inactivo','${user.nivel == 1 ? 'administrador' : user.nivel ==2 ? 'auxiliar' : 'bioanalista'}','${user.id}')" width="20" height="20" fill="green" class="bi bi-check-square mx-1" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                  </svg>`:
                  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-x-octagon"  onclick="cambiarStatus('activo','${user.nivel == 1 ? 'administrador' : user.nivel ==2 ? 'auxiliar' : 'bioanalista'}','${user.id}')" viewBox="0 0 16 16">
                    <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>`}</td>
                  <td><svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="green"
                    class="bi bi-eye mx-1"
                    viewBox="0 0 16 16"
                    style="cursor:pointer"
                    onclick='detalleUsuario(${user.id})'
                  >
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                    />
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" class="bi bi-pencil-square"   style="cursor:pointer" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></td>
                </tr>
    `;
  });
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
          if (el.name == "firma" || el.name == "direccion") {
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
    return usuariosAlerta("Error al ingresar alguno de los datos", "danger");
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
        if (el.name == "correo" || el.name == "direccion") {
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

      if (el.name != "password") {
        const elemento = { value: el.value, name: el.name };
        usuario.push(elemento);
      }
    }
  });
  if (validacion) {
    return usuariosAlerta("Error al ingresar alguno de los datos", "danger");

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
//  document.getElementsByName("ingreso")[0].setAttribute("max", fechaActual);
  window.scroll(0,120)
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
              <div id="creacionUsuarioAlerta"></div>

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
  window.scroll(0,120)
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
              <div id="creacionUsuarioAlerta"></div>

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
  window.scroll(0,120)

};

const buscarBio = async () => {
  const pre_cedula = document.getElementsByName("pre_cedula")[0].value;
  const cedula = document.getElementsByName("cedula")[0].value;
  if (pre_cedula == "" || cedula == "") {
    //CREAR ALERTA PARA VALIDACION
    return usuariosAlerta("La cedula no es valida", "danger");
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
    return usuariosAlerta("El ID no es valido", "danger");
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
    ingreso == ""
  ) {
    //ALERTAS PARA VALIDACION
    return usuariosAlerta("Algun dato no es valido", "danger");
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
    return usuariosAlerta("La cedula no es valida", "danger");
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
  console.log(tipo)
  if (id < 0 || id == "" || !id) return; //ALERTA PARA VALIDACION

  if (status != "activo" && status != "inactivo")
    return //ALERTA PARA VALIDACION

  if (tipo != "administrador" && tipo != "bioanalista" && tipo!='auxiliar')
    return //ALERTA PARA VALIDACION
  try {
    const { token } = await login.getToken();

    const { data } = await axios.put(
      urlsv + "/api/creacion/editar-status",
      { id, status, tipo },
      { headers: { token } }
    );
    buscarUsuarios()
  } catch (error) {
    console.log("🚀 ~ cambiarStatus ~ error:", error);
    if (error.response.data.mensaje) {
      return 
    } else {
      return 
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
    return usuariosAlerta("El ID del usuario no es valido", "danger");
  }
  if (nombre == "" || telefono == "" || nivel == "" || password == "") {
    return usuariosAlerta("Algun dato no es valido", "danger");
    //ALERTAS PARA VALIDACION
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
