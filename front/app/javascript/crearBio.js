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
      return '';
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
      const modal = new bootstrap.Modal("#confirmacion-modal");
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

/*const render = () =>{
  const fechaActual = moment().format('YYYY-MM-DD');
  console.log(fechaActual);
  document.getElementsByName('fecha_nacimiento')[0].setAttribute('max', fechaActual);
}*/
