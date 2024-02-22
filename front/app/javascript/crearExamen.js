const pushDetalle = () => {
  const nombre = document.getElementById("nombreDetalleExamenCrud").value;
  const inferior = document.getElementById("inferiorExamenCrud").value;
  const superior = document.getElementById("superiorExamenCrud").value;
  const unidad = document.getElementById("unidadExamenCrud").value;
  const posicion = document.getElementById("ordenExamenCrud").value;
  const tBody = document.getElementById("tBodyDetalles");
  const alertaCaracteristica = document.getElementById("alertaCaracteristicas");

  contadorCaracteristica+=1;

  
  if (!nombre || nombre == "") {
    
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>El campo nombre no puede estar vacio<p>
                    ` 
                   return 
  }
  if (!unidad || unidad == "") {
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>El campo unidad no puede estar vacio<p>
                    ` 
                   return 
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
                   return 
  } 
  
    let resultadosSQl = ''
    resultados.forEach(e=>{
      console.log('eeee')
      e= e.replaceAll('~','')
      resultadosSQl+=`${e}~`
    })
    console.log(resultadosSQl)
    resultadosSQl=resultadosSQl.slice(0,-1)
    console.log(resultadosSQl)
  

  detallesExamen.push({
    id: contadorCaracteristica,
    nombre,
    inferior,
    superior,
    unidad,
    posicion,
    resultados: resultadosSQl,
    impsiempre: 0,
  });

  alertaCaracteristica.removeAttribute("hidden");
  alertaCaracteristica.className= "alert alert-success text-center"
  alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Registro exitoso</h4>
                  <hr>
                  <p>Caracteristica "${nombre}" registrada con exito<p>
                  ` 

  tBody.innerHTML += `
  <tr id='tr-${contadorCaracteristica}'>
                      <td scope="col">${nombre}</td>
                      <td scope="col">${inferior}</td> 
                      <td scope="col">${superior}</td>
                      <td scope="col">${posicion}</td>
                      <td scope="col">${unidad}</td>
                        
                        <td >
                        <div class="form-check justify-content-center">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </div>
                      </td>
                        <td style="cursor:pointer"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample" onclick="modificarCaracteristica('${contadorCaracteristica}')">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="#FACD0B"
                        class="bi bi-pencil-square"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                      </td>
                      <td style="cursor:pointer" onclick="eliminarCaracteristica('${contadorCaracteristica}')">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        fill="red"
                        class="bi bi-x-lg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                        />
                      </svg>
                    </td>
                    </tr>
  `;
  document.getElementById("nombreDetalleExamenCrud").value = "";
  document.getElementById("inferiorExamenCrud").value = "";
  document.getElementById("superiorExamenCrud").value = "";
  document.getElementById("unidadExamenCrud").value = "";
  document.getElementById("ordenExamenCrud").value = ""; 
  document.getElementById("inputContainerResultados").innerHTML= `
  <input
                        name="resultadoInput"
                        class="form-control inputExamen"
                        type="text"
                        placeholder="Ingrese un resultado unico en el examen"
                        aria-label="default input example"
                      />
                      <input
                        name="resultadoInput"
                        class="form-control inputExamen"
                        type="text"
                        placeholder="Ingrese un resultado unico en el examen"
                        aria-label="default input example"
                      />
  `
  
 
  
};
function modificarCaracteristica(id){
  const caracteristicaDetalle = detallesExamen.find(e=>e.id==id)
  console.log(caracteristicaDetalle)
  document.getElementById("nombreDetalleExamenCrud").value = caracteristicaDetalle.nombre;
  document.getElementById("inferiorExamenCrud").value =caracteristicaDetalle.inferior;
  document.getElementById("superiorExamenCrud").value = caracteristicaDetalle.superior;
  document.getElementById("unidadExamenCrud").value = caracteristicaDetalle.unidad;
  document.getElementById("ordenExamenCrud").value = caracteristicaDetalle.posicion; 
  document.getElementById("inputContainerResultados").innerHTML= `
  
  `
  caracteristicaDetalle.resultados.split('~').forEach(e=>{
    document.getElementById("inputContainerResultados").innerHTML+= `
    <input
    name="resultadoInput"
    class="form-control inputExamen"
    type="text"
    value="${e}"
    placeholder="Ingrese un resultado unico en el examen"
    aria-label="default input example"
  />
  `
  })
  if(caracteristicaDetalle.resultados==""){ 
    console.log('aaa')
    document.getElementById("inputContainerResultados").innerHTML= `
    <input
    name="resultadoInput"
    class="form-control inputExamen"
    type="text"
    value=""
    placeholder="Ingrese un resultado unico en el examen"
    aria-label="default input example"
  />
  <input
    name="resultadoInput"
    class="form-control inputExamen"
    type="text"
    value=""
    placeholder="Ingrese un resultado unico en el examen"
    aria-label="default input example"
  />
  `
  }
  
  document.getElementById('collapseExample').className = 'collapse row show'
 
  eliminarCaracteristica(id)
}

function eliminarCaracteristica(id){
if(document.getElementById(`tr-${id}`)){
  document.getElementById(`tr-${id}`).remove()

}
detallesExamen = detallesExamen.filter(e=>e.id!=id)
}




function borrarAlerta(){
  const alertaCaracteristica = document.getElementById("alertaCaracteristicas");

  if(!alertaCaracteristica.hasAttribute('hidden')){
    console.log('aaaaa')
    setTimeout(() => {
      alertaCaracteristica.setAttribute('hidden','true')
    }, "3000")
  }
}
var detallesExamen = [];
var contadorCaracteristica=0;

const guardarExamen = async () => {
  const alertaCaracteristica = document.getElementById("alertaCaracteristicas");

  const { token } = await login.getToken();

  const examenCrud = document.getElementById("examenNameCrud");
  const examen = examenCrud.value;
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
  
  try {
    const res = await axios.post(
      urlsv + "/api/examenes/crear-examen",
      { examen, detalle: detallesExamen },
      { headers: { token } }
    );
    console.log("🚀 ~ guardarExamen ~ res :", res);
    const modal = new bootstrap.Modal("#confirmacion-modal");
    modal.show();
    examenCrud.value=''
    detallesExamen=[]
    document.getElementById('tBodyDetalles').innerHTML=''
  } catch (error) {
    console.log(error);
    if (error.response.data.mensaje) {
      return await alerta.alert("Error:", error.response.data.mensaje);
    } else {
      return await alerta.error();
    }
  }
};
