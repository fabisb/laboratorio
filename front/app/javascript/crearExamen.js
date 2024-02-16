const pushDetalle = () => {
  const nombre = document.getElementById("nombreDetalleExamenCrud").value;
  const inferior = document.getElementById("inferiorExamenCrud").value;
  const superior = document.getElementById("superiorExamenCrud").value;
  const unidad = document.getElementById("unidadExamenCrud").value;
  const posicion = document.getElementById("ordenExamenCrud").value;
  const tBody = document.getElementById('tBodyDetalles');
  const resultados2 = [...document.getElementsByName("resultadoInput")].map(
    (e) => e.value
  );
  let resultados= resultados2.toString()
  console.log(resultados)
  detallesExamen.push({
    nombre,
    inferior,
    superior,
    unidad,
    posicion,
    resultados,
    impsiempre:0
  });
  tBody.innerHTML+=`
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
  `
  console.log("🚀 ~ pushDetalle ~ detallesExamen:", detallesExamen)
};
var detallesExamen = [];

const guardarExamen =async  ()=>{
    const { token } = await login.getToken();

const examen = document.getElementById('examenNameCrud').value;
      console.log("🚀 ~ guardarExamen ~ examen:", examen)
      
const res = await axios.post(urlsv+'/api/examenes/crear-examen',{examen,detalle:detallesExamen},{ headers: { token } })
console.log("🚀 ~ guardarExamen ~ res :", res )
}
