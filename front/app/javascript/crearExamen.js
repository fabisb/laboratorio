async function modificarExamenBdd(idExamen){
  const { token } = await login.getToken();
  const alertaCaracteristica = document.getElementById("alertaCaracteristicas");


  const examenCrud = document.getElementById("examenNameCrud");
  const examen = examenCrud.value;
  if(examen==''){
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>El nombre del examen no puede estar vacio<p>
                    
                    ` 
                    borrarAlerta()
                   return 
  }
  if(detallesExamen.length==0){
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>Debe agregar al menos una caracteristica<p>
                    ` 
                    borrarAlerta()
                   return 
  }
  
  try {
    const res = await axios.put(
      urlsv + "/api/examenes/modificar-examen",
      { examen, detalle: detallesExamen,  idExamen },
      { headers: { token } }
    );
    console.log("🚀 ~ modificarExamenBdd ~ res:", res)
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
}

function añadirRowRango(){
  const tableRango = document.getElementById("tableRangosBody");
  const trRangos=document.getElementsByClassName("tr-rango");
  contadorCaracteristica=trRangos.length
  if(trRangos.length>4){
    return
  }
  let tr = document.createElement("tr");
  tr.className="tr-rango"
  tr.innerHTML=`
  <td scope="row"><input
    name="rangoSup"
    type="number"
    min="0"
    max="150"
    class="form-control inputExamenRango"
    id="superiorExamenCrud${contadorCaracteristica}"
    placeholder=""
  /></td>
  <td scope="row"><input
    name="rangoInf"
    type="number"
    min="0"
    max="150"
    class="form-control inputExamenRango"
    id="inferiorExamenCrud${contadorCaracteristica}"
    placeholder=""
  /></td>
  <td scope="row"><input
    name="rangoDesde"
    type="number"
    min="0"
    max="150"
    class="form-control inputExamenRango"
    id="DesdeExamenCrud${contadorCaracteristica}"
    placeholder="Desde"
  /></td>
  <td scope="row"><input
    name="rangoHasta"
    min="0"
    max="150"
    type="number"
    class="form-control inputExamenRango"
    id="HastaExamenCrud${contadorCaracteristica}"
    placeholder="Hasta"
  /></td>
  <td scope="row">
    <select class="form-select form-select-sm inputExamenRango" id="selectRango${contadorCaracteristica}" name="rangoSelect" aria-label="Small select example">
      <option selected>Genero</option>
      <option value="Hombre">Masculino</option>
      <option value="Mujer">Femenino</option>

    </select>
</td>
  `
  

  tableRango.appendChild(tr)                             

}




async function modificarExamen(id){
  const { token } = await login.getToken();
  const btn = document.getElementById('btnGuardarExamen');
  try {
    const { token } = await login.getToken();

    const resp= await axios.post(
      urlsv + "/api/examenes/get-examen",
      { id },
      { headers: { token } }
    );
    const {examen,detalle} = resp.data
    console.log(examen,detalle)
    document.getElementById("examenNameCrud").value = examen[0][0].nombre
    btn.setAttribute('onclick',`modificarExamenBdd('${id}')`)

    
    const tBodyDetalles = document.getElementById("tBodyDetalles")

    tBodyDetalles.innerHTML= '';
    detalle[0].forEach(e=>{
      
      contadorCaracteristica+=1
      detallesExamen.push({
        id: contadorCaracteristica,
        nombre: e.nombre,
        inferior: e.inferior,
        superior: e.superior,
        unidad: e.unidad,
        posicion: e.posicion,
        resultados: e.resultados,
        impsiempre: 0,
        idDetalleBdd:e.id
      });
      tBodyDetalles.innerHTML+=`
      <tr id='tr-${contadorCaracteristica}'>
                      <td scope="col">${e.nombre}</td>
                      <td scope="col">${e.inferior}</td> 
                      <td scope="col">${e.superior}</td>
                      <td scope="col">${e.posicion}</td>
                      <td scope="col">${e.unidad}</td>
                        
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
                        aria-controls="collapseExample" onclick="modificarCaracteristica('${contadorCaracteristica}','${e.id}')">
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
      
    })
      


  } catch (error) {
    console.log(error);
    
  }

}




const pushDetalle = () => {
  const nombre = document.getElementById("nombreDetalleExamenCrud").value;
  const unidad = document.getElementById("unidadExamenCrud").value;
  const posicion = document.getElementById("ordenExamenCrud").value;
  const tBody = document.getElementById("tBodyDetalles");
  const alertaCaracteristica = document.getElementById("alertaCaracteristicas");
  const alertaCaracteristicaRangos = document.getElementById("alertaCaracteristicasRangos");
  const trRango = document.getElementsByClassName("tr-rango");
  let validacionRango=false

  contadorCaracteristica+=1
  const examenRango=document.getElementsByClassName("inputExamenRango");
  let rangos=[];

  [...trRango].forEach((e,i)=>{
    const inputsE = [...examenRango].filter(f=> f.id.endsWith(i));
       console.log(inputsE)
      const select = document.getElementById(`selectRango${i}`)
      const superior = inputsE.find(e=>e.name=="rangoSup")
      const inferior = inputsE.find(e=>e.name=="rangoInf")
      const desde = inputsE.find(e=>e.name=="rangoDesde")
      const hasta = inputsE.find(e=>e.name=="rangoHasta")
      console.log(superior.value,inferior,desde,hasta,select)
      if(i>0){
        if(superior.value=="" || inferior.value=="" ){
          validacionRango=true;
        }
      }
      if(i==0){
        
          if(superior.value!="" || inferior.value!=""){
            if(superior.value!="" && inferior.value!=""){
              validacionRango=false
            }else{
              validacionRango=true
            }
          }
        
      }
      
      if(superior.value!='' && inferior.value!=''){
        
        rangos.push({
          genero: select.value,
          superior: superior.value,
          inferior: inferior.value,
          desde: desde.value,
          hasta: hasta.value
        })
      }
      
  })
  if(validacionRango){
    alertaCaracteristicaRangos.removeAttribute("hidden");
                    alertaCaracteristicaRangos.className= "alert alert-danger text-center"
                    alertaCaracteristicaRangos.innerHTML =`
                    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>Existe la posibildad de que algun dato de Rango no haya podido ser ingresado Verifique!!!<p>
                    ` 
              
       
  }
 
  
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
      e= e.replaceAll('~','')
      resultadosSQl+=`${e}~`
    })
    resultadosSQl=resultadosSQl.slice(0,-1)

  


  detallesExamen.push({
    id: contadorCaracteristica,
    nombre,
    unidad,
    posicion,
    resultados: resultadosSQl,
    rangos,
    impsiempre: 0,
    idDetalleBdd: idCaracteristicaBdd
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
  document.getElementById("tableRangosBody").innerHTML=`
  <tr class="tr-rango">
                              <td scope="row"><input
                                name="rangoSup"
                                type="number"
                                min="0"
                                max="150"
                                class="form-control inputExamenRango"
                                id="superiorExamenCrud0"
                                placeholder=""
                              /></td>
                              <td scope="row"><input
                                name="rangoInf"
                                type="number"
                                min="0"
                                max="150"
                                class="form-control inputExamenRango"
                                id="inferiorExamenCrud0"
                                placeholder=""
                              /></td>
                              <td scope="row"><input
                                name="rangoDesde"
                                type="number"
                                min="0"
                                max="150"
                                class="form-control inputExamenRango"
                                id="DesdeExamenCrud0"
                                placeholder="Desde"
                              /></td>
                              <td scope="row"><input
                                name="rangoHasta"
                                min="0"
                                max="150"
                                type="number"
                                class="form-control inputExamenRango"
                                id="HastaExamenCrud0"
                                placeholder="Hasta"
                              /></td>
                              <td scope="row">
                                <select class="form-select form-select-sm inputExamenRango" id="selectRango0" name="rangoSelect" aria-label="Small select example">
                                  <option selected>Genero</option>
                                  <option value="Hombre">Masculino</option>
                                  <option value="Mujer">Femenino</option>

                                </select>
                            </td>
                              
                            </tr>
  `
  
 
  
};
var idCaracteristicaBdd = ''
function modificarCaracteristica(id,idBdd){
  idCaracteristicaBdd= idBdd
  const caracteristicaDetalle = detallesExamen.find(e=>e.id==id)
  console.log(caracteristicaDetalle)
  document.getElementById("nombreDetalleExamenCrud").value = caracteristicaDetalle.nombre;
  document.getElementById("unidadExamenCrud").value = caracteristicaDetalle.unidad;
  document.getElementById("ordenExamenCrud").value = caracteristicaDetalle.posicion; 
  document.getElementById("inputContainerResultados").innerHTML= ``
  document.getElementById("tableRangosBody").innerHTML=``

  caracteristicaDetalle.rangos.forEach((e,i)=>{
    console.log(caracteristicaDetalle.id)
    document.getElementById("tableRangosBody").innerHTML=`
    <tr class="tr-rango">
  <td scope="row"><input
    name="rangoSup"
    type="number"
    min="0"
    max="150"
    value="${e.superior}"
    class="form-control inputExamenRango"
    id="superiorExamenCrud${i}"
    placeholder=""
  /></td>
  <td scope="row"><input
    name="rangoInf"
    type="number"
    min="0"
    max="150"
    value="${e.inferior}"
    class="form-control inputExamenRango"
    id="inferiorExamenCrud${i}"
    placeholder=""
  /></td>
  <td scope="row"><input
    name="rangoDesde"
    type="number"
    min="0"
    value="${e.desde}"
    max="150"
    class="form-control inputExamenRango"
    id="DesdeExamenCrud${i}"
    placeholder="Desde"
  /></td>
  <td scope="row"><input
    name="rangoHasta"
    min="0"
    max="150"
    value="${e.hasta}"
    type="number"
    class="form-control inputExamenRango"
    id="HastaExamenCrud${i}"
    placeholder="Hasta"
  /></td>
  <td scope="row">
    <select class="form-select form-select-sm inputExamenRango" id="selectRango${i}" name="rangoSelect" aria-label="Small select example">
      <option selected>Genero</option>
      <option value="Hombre">Masculino</option>
      <option value="Mujer">Femenino</option>

    </select>
</td>
  
</tr>
    `
    document.getElementById("selectRango"+i).value = e.genero;
  })

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
  const alertaCaracteristicaRango = document.getElementById("alertaCaracteristicasRangos");

  if(!alertaCaracteristica.hasAttribute('hidden')){
    setTimeout(() => {
      alertaCaracteristica.setAttribute('hidden','true')
    }, "3000")
  }
  if(!alertaCaracteristicaRango.hasAttribute('hidden')){
    setTimeout(() => {
      alertaCaracteristicaRango.setAttribute('hidden','true')
    }, "3000")
  }
}
var detallesExamen = [];
var contadorCaracteristica=0;

const guardarExamen = async (newExamen) => {
  const alertaCaracteristica = document.getElementById("alertaCaracteristicas");

  const { token } = await login.getToken();

  const examenCrud = document.getElementById("examenNameCrud");
  const examen = examenCrud.value;
  if(examen==''){
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>El nombre del examen no puede estar vacio<p>
                    
                    ` 
                    borrarAlerta()
                   return 
  }
  if(detallesExamen.length==0){
    alertaCaracteristica.removeAttribute("hidden");
    alertaCaracteristica.className= "alert alert-danger text-center"
    alertaCaracteristica.innerHTML =`
    <h4 class="alert-heading">Error</h4>
                    <hr>
                    <p>Debe agregar al menos una caracteristica<p>
                    ` 
                    borrarAlerta()
                   return 
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
