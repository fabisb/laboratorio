const pushDetalle = () => {
  const nombre = document.getElementById("nombreDetalleExamenCrud").value;
  const inferior = document.getElementById("inferiorExamenCrud").value;
  const superior = document.getElementById("superiorExamenCrud").value;
  const unidad = document.getElementById("unidadExamenCrud").value;
  const posicion = document.getElementById("ordenExamenCrud").value;
  const tBody = document.getElementById("tBodyDetalles");
  const alertaCaracteristica = document.getElementById("alertaCaracteristicas");
  
  
  if (!nombre || nombre == "") {
    
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>El campo nombre no puede estar vacio<p>
                    ` 
                   //return 
  }
  if (!unidad || unidad == "") {
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>El campo unidad no puede estar vacio<p>
                    ` 
                   //return 
  }
  
  const resultados2 = [...document.getElementsByName("resultadoInput")].map(
    (e) => {
      if(e.value !=''){
        return e.value
      }else{
        return ''
      }
    
    }
  );


  let resultados = resultados2.filter(e=>e!='');
  console.log(resultados)
  if((resultados.length<2 || resultados.length >10) && resultados.length !=0){
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>Debe colocar minimo 2 resultados y maximo 10<p>
                    ` 
                   //return 
  } 

  detallesExamen.push({
    nombre,
    inferior,
    superior,
    unidad,
    posicion,
    resultados: resultados.toString(),
    impsiempre: 0,
  });
  tBody.innerHTML += `
  <tr>
                      <td scope="col">${nombre}</td>
                      <td scope="col">${inferior}</td> 
                      <td scope="col">${superior}</td>
                      <td scope="col">${posicion}</td>
                      <td scope="col">${unidad}</td>
                      <td>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
  `;
  console.log("🚀 ~ pushDetalle ~ detallesExamen:", detallesExamen);
 /*  document.getElementById("nombreDetalleExamenCrud").value = "";
  document.getElementById("inferiorExamenCrud").value = "";
  document.getElementById("superiorExamenCrud").value = "";
  document.getElementById("unidadExamenCrud").value = "";
  document.getElementById("ordenExamenCrud").value = ""; */
  new bootstrap.collapse("#collapseExample").close();
};
var detallesExamen = [];

const guardarExamen = async () => {
  const alertaCaracteristica = document.getElementById("alertaCaracteristicas");

  const { token } = await login.getToken();

  const examen = document.getElementById("examenNameCrud").value;
  if(examen==''){
    console.log('aaa')
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>El nombre del examen no puede estar vacio<p>
                    
                    ` 
                   //return 
  }
  if(detallesExamen.length==0){
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>Debe agregar al menos una caracteristica<p>
                    ` 
                   //return 
  }
  console.log("🚀 ~ guardarExamen ~ examen:", examen);
  try {
    const res = await axios.post(
      urlsv + "/api/examenes/crear-examen",
      { examen, detalle: detallesExamen },
      { headers: { token } }
    );
    console.log("🚀 ~ guardarExamen ~ res :", res);
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
