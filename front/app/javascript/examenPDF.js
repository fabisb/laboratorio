const imprimir = async () => {
  document.getElementById("prueba").innerText = "modificacion";
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
    nombre,
    cedula,
    direccion,
    telefono,
    correo,
    fecha_nacimiento,
    edad,
    orden,
    bioanalista,
    emision,
    examenes: [
      {
        examen,
        idExamen,
        seccion,
        nombreSeccion,
        caracteristicas: [
          {
            idCar,
            nombre,
            resultado,
            inferior,
            superior,
            unidad,
            nota,
            subcaracteristicas: [nombre, resultado, nota],
          },
        ],
      },
    ],
  };
  document.getElementsByName("direccion")[0].innerText = examen.direccion;
  document.getElementsByName("correo")[0].innerText = "Email: " + examen.correo;
  document.getElementsByName("cabecera")[0].innerHTML = `
  <div class="col">
  <div class="card-body">
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span class="fw-bold">Empresa:</span></li>
      <li class="list-group-item"><span class="fw-bold">Paciente:</span> <br> ${examen.nombre}</li>
      <li class="list-group-item"><span class="fw-bold">Cedula:</span><br> ${examen.cedula}</li>
      <li class="list-group-item"><span class="fw-bold">Factura: </span><br> ${examen.orden}</li>
    </ul>
  </div>
</div>
<div class="col">
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

  [...seccionesSet].map((s) => {
    `
    <div class="card">
    <div class="card-header text-start fw-bolder fs-4">${s}</div>
    ${examen.examenes
      .map((e) => {
        if (e.seccion == s) {
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
            <td>SubCaracteristica</td>
            <td>-</td>
            <td>-</td>
            <td>Resultado</td>
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
            <td>100</td>
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
  });
};
