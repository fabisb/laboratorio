const imprimir = async () => {
  const botones = document.getElementsByName('botones')[0];
  botones.hidden = true;
  try {
    await imprimirPDF() ;
  } catch (error) {
    console.log("🚀 ~ imprimir ~ error:", error);
    botones.removeAttribute('hidden')
  }
};

const pintarExamen = async () => {
  const examen = await examenVar.get();
  const { token } = await login.getToken();
  const { data: bioanalista } = await axios.get(urlsv + "/api/users/firma", {
    headers: { token },
    params: { idBioanalista: examen.bioanalista },
  });
  console.log("🚀 ~ pintarExamen ~ bioanalista:", bioanalista);
  //const imageUrl = await syncFiles(firmaImg.foto_firma)
  const imageUrl = bioanalista.foto_firma;


  console.log("🚀 ~ pintarExamen ~ examen:", examen);

  document.getElementsByName("direccion")[0].innerText =
    examen.paciente.direccion;
  document.getElementsByName("correo")[0].innerText =
    "Email: " + examen.paciente.correo;
  document.getElementsByName("cabecera")[0].innerHTML = `
  <div class="col" style="font-size: small;">
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span class="fw-bold">Empresa:</span></li>
      <li class="list-group-item"><span class="fw-bold">Paciente:</span> <br> ${examen.paciente.nombre}</li>
      <li class="list-group-item"><span class="fw-bold">Cedula:</span><br> ${examen.paciente.pre_cedula}-${examen.paciente.cedula}</li>
      <li class="list-group-item"><span class="fw-bold">Factura: </span><br> ${examen.orden}</li>
    </ul>
  </div>
</div>
<div class="col" style="font-size: small;">
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span class="fw-bold">Fecha Nacimiento:</span><br> ${examen.paciente.fecha_nacimiento}</li>
      <li class="list-group-item"><span class="fw-bold">Edad:</span><br> ${examen.paciente.edad}</li>
      <li class="list-group-item"><span class="fw-bold">Emision:</span><br> ${moment().format('DD-MM-YYYY')}</li>
    </ul>
  </div>
</div>
  `;

  const seccionesSet = new Set(examen.examenes.map((e) => e.nombreSeccion));
  console.log("🚀 ~ pintarExamen ~ seccionesSet:", seccionesSet)
  document.getElementsByName("firmaBioanalista")[0].innerHTML = `
  <img id='bioanalistaFirma'  class="card-img-top w-50 mx-auto my-auto" alt="firma Ej">
          <div class="card-body text-center">
            <h4>Lcd. ${bioanalista.nombre}</h4>
            <h5>BIOANALISTA</h5>
            <h5>C.I.: ${bioanalista.cedula} - COBIOZUL: ${bioanalista.colegio} - MSDS: ${bioanalista.ministerio} </h5>
          </div>
  `;
  document.getElementById("bioanalistaFirma").src = imageUrl;
  document.getElementsByName("examenContainer")[0].innerHTML = [...seccionesSet]
    .map((s) => {
      return `
    <div class="card">
    <div class="card-header text-start fw-bolder fs-4">${s}</div>
    ${examen.examenes
      .map((e) => {
        if (e.nombreSeccion == s) {
          return ` 
        <div class="card">
        <div class="card-header">${e.examen}</div>
        <div class="card-body">
          <table class="table table-sm" style="font-size: small;">
            <thead>
              <tr>
                <th scope="col">Caracteristica</th>
                <th scope="col">Resultado</th>
                <th scope="col">Unidad</th>
                <th scope="col">Inferior</th>
                <th scope="col">Superior</th>
              </tr>
            </thead>
            <tbody>
            ${e.caracteristicas
              .map((c) => {
                return `
              <tr>
              <th scope="row">${c.nombre}</th>
              <td>${c.resultado}</td>
              <td>${c.unidad}</td>
              <td>${c.inferior}</td>
              <td>${c.superior}</td>
            </tr>
            ${
              c.subCaracteristicas.length > 0
                ? `
            <tr>
            <th scope="row"></th>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td><span class="fw-bold">Resultado</span></td>
          </tr>
          ${c.subCaracteristicas
            .map((sc) => {
              return `
          <tr>
            <th scope="row"></th>
            <td>${sc.nombreSub}</td>
            <td>-</td>
            <td>-</td>
            <td>${sc.resultado}</td>
          </tr>
          `;
            })
            .join("")}
          `
                : ""
            }
              `;
              })
              .join("")}
            </tbody>
          </table>
        </div>
      </div>
       `;
        }
      })
      .join("")}
  </div>`;
    })
    .join("");
};
