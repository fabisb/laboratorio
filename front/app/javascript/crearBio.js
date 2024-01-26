const subirImagen = async () => {
  try {
    const imagen = document.getElementById("file");

    console.log("🚀 ~ subirImagen ~ imagen.files[0]:", imagen.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(imagen.files[0]);
    //HAY QUE AGREGAR VALIDACIONES PARA QUE NO ENVIEN OTRO FORMATO QUE NO SEA DE FOTO, O EL FORMATO QUE USEN PARA LAS FIRMAS (que es uno distinto a los clasicos)
    reader.onload = async () => {
      const imgRes = reader.result;
      console.log("🚀 ~ reader.onload= ~ imgRes:", imgRes);

      const { data } = await axios.post(urlsv + "/api/users/imagen", {
        cedula: "123",
        nombre: "Fabian Silva",
        colegio: "111",
        img: imgRes,
      });
      console.log("🚀 ~ reader.onload= ~ data:", data);

      var imageUrl = await new Blob([new Uint8Array(data.img.data)], {
        type: "image/jpeg",
      }).text();

      const imgPrueba = document.getElementById("imgPrueba");
      imgPrueba.src = imageUrl;
    };
  } catch (error) {
    console.log(error);
  }
};

const agregarBioanalista = async (event) => {
  const { token } = await login.getToken();
 
  console.log(event)
  const paciente = [];
  let firma;
  const validacion = [...event.target].some((el) => {
   
    if (el.tagName == "SELECT" || el.tagName == "INPUT") {
      if (el.name == "genero") {
        let generoChk= document.getElementsByClassName('generoCheck')
        console.log("🚀 ~ validacion ~ generoChk:", generoChk)
        let suma = 0;
        [...generoChk].forEach(chk=>{
          console.log(chk)
          if (chk.checked == true){suma++}
        })
        if(suma>0){     
          if (el.checked == true) {
            const elemento = { valor: el.value, nombre: el.name };
            paciente.push(elemento);
          }
        }else{
          console.log("no genero")
          return true

        }
      } else if(el.name =='firma'){
        console.log('firma:'+el)
        if (el.value !== '') {
          const reader = new FileReader();
          reader.readAsDataURL(el.files[0]);
          reader.onload = async () => {
             firma = await  reader.result;
             console.log("🚀 ~ reader.onload= ~ firma:", firma)
          }
        }
      } else {
        if(el.value== ""){
          if (el.name == 'firma') {
            console.log(`Campo ${el.name} vacio`)
            
          }else{

            console.log(`Campo ${el.name} vacio`)
            return true 
          }

        }
        if(el.name=='telefono'){
          let validarletra=false

          for (let i = 0; i < el.value.length; i++) {
            const c = el.value[i];
            if(c=='+'){
              if(i!=0){
                validarletra=true
              }
            }else{
              if(isNaN(parseInt(c))){
                validarletra==true
              }
            }
          }
          
          if(validarletra){
            console.log(`Campo ${el.name} invalido`)
            return true
          }
        }


        if (el.name =='cedula') {
          if (el.value < 0) {
             console.log('Ingrese una cedula valida');
            return true

          }
        }
        if (el.name =='nombre') {
          if (!isNaN(el.value )) {
          console.log('Ingrese un nombre valido');
            return true
         
          }
        }
        
        if (el.name == 'fecha_nacimiento') {
          if (moment(el.value).isAfter(moment().format('YYYY-MM-DD')) ) {
 console.log('Ingrese una fecha valida');
            return true

          }
        }        
       
        
        const elemento = { value: el.value, name: el.name };
        paciente.push(elemento);
    }
  }
  });
  if (validacion) {
    return console.log('SE HA ENCONTRADO ALGUN ERROR')
  }
  console.log("🚀 ~ agregarPaciente ~ paciente:", paciente);
  await axios.post(
    urlsv + "/api/creacion/agregar-bioanalista",
    { paciente,firma },
    { headers: { token } }
  );
};

/*const render = () =>{
  const fechaActual = moment().format('YYYY-MM-DD');
  console.log(fechaActual);
  document.getElementsByName('fecha_nacimiento')[0].setAttribute('max', fechaActual);
}*/
