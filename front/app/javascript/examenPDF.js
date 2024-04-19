const imprimir = async () => {
  try {
    await imprimirPDF();
  } catch (error) {
    console.log("🚀 ~ imprimir ~ error:", error);
  }
};

const pintarExamen = async () => {
  //const { examen } = await examenVar.get();
  //console.log("🚀 ~ pintarExamen ~ examen:", examen)
  const examen = {
    nombre:'Fabian Silva',
    cedula:"28146771",
    direccion:'san francisco',
    telefono:'04146308395',
    correo:'fabian@gmail.com',
    fecha_nacimiento:'17/12/2002',
    edad:'21 años y 5 meses',
    orden:'C-0000',
    bioanalista:'Rumina Arambulo',
    emision:'19/4/2024',
    examenes: [
      {
        examen:'EXAMEN PRUEBA',
        idExamen:'1',
        seccion:'10',
        nombreSeccion:'HEMATOLOGIA COMPLETA',
        caracteristicas: [
          {
            idCar:'2',
            nombre:'Car 1',
            resultado:'Resultado 1',
            inferior:'10',
            superior:'15',
            unidad:'gr',
            nota:'nota 1',
            subCaracteristicas: [{nombre:'sub1', resultado:'0', nota:'nota 5'}],
          },
          {
            idCar:'3',
            nombre:'Car 2',
            resultado:'Resultado 2',
            inferior:'5',
            superior:'10',
            unidad:'ml',
            nota:'nota 2',
            subCaracteristicas: [{nombre:'sub2', resultado:'1', nota:'nota 3'},{nombre:'sub2.1', resultado:'1.1', nota:'nota 4'}],
          },
        ],
      },
    ],
  };
  document.getElementsByName("direccion")[0].innerText = examen.direccion;
  document.getElementsByName("correo")[0].innerText = "Email: " + examen.correo;
  document.getElementsByName("cabecera")[0].innerHTML = `
  <div class="col" style="font-size: small;">
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span class="fw-bold">Empresa:</span></li>
      <li class="list-group-item"><span class="fw-bold">Paciente:</span> <br> ${examen.nombre}</li>
      <li class="list-group-item"><span class="fw-bold">Cedula:</span><br> ${examen.cedula}</li>
      <li class="list-group-item"><span class="fw-bold">Factura: </span><br> ${examen.orden}</li>
    </ul>
  </div>
</div>
<div class="col" style="font-size: small;">
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span class="fw-bold">Fecha Nacimiento:</span><br> ${examen.fecha_nacimiento}</li>
      <li class="list-group-item"><span class="fw-bold">Edad:</span><br> ${examen.edad}</li>
      <li class="list-group-item"><span class="fw-bold">Emision:</span><br> ${examen.emision}</li>
    </ul>
  </div>
</div>
  `;

  const seccionesSet = new Set(examen.examenes.map((e) => e.nombreSeccion));

  document.getElementsByName('examenContainer')[0].innerHTML= [...seccionesSet].map((s) => {
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
            <td>${sc.nombre}</td>
            <td>-</td>
            <td>-</td>
            <td>${sc.resultado}</td>
          </tr>

          <tr>
            <th scope="row"></th>
            <td>total</td>
            <td>-</td>
            <td>-</td>
            <td>COMO SE PINTA EL TOTAL?</td>
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
  }).join('');
};
