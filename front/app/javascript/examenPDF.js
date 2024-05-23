const imprimir = async () => {
  const botones = document.getElementsByName("botones")[0];
  botones.hidden = true;
  try {
    await imprimirPDF();
  } catch (error) {
    console.log("🚀 ~ imprimir ~ error:", error);
    botones.removeAttribute("hidden");
  }
};

const reimprimirExamen = async () => {
  const examen = await examenVar.get();
  console.log("🚀 ~ pintarExamen ~ examen:", examen);
  const { token } = await login.getToken();

  document.getElementsByName("firmaBioanalista")[0].innerHTML = "";

  const bioSet = new Set();
  examen.examenes.forEach((ex) => {
    bioSet.add(ex.bioanalista.id);
  });
  console.log("🚀 ~ pintarExamen ~ bioSet:", bioSet);
  /* 
  document.getElementsByName("direccion")[0].innerText =
    examen.paciente.direccion;
  document.getElementsByName("correo")[0].innerText =
    "Email: " + examen.paciente.correo;
  document.getElementsByName("cabecera")[0].innerHTML = `
  <div class="col" style="font-size: small;">
  <div class="card-body">
    <ul class="list-group list-group-flush">
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
 */
  document.getElementsByName("examenContainer")[0].innerHTML = "";
  for (let index = 0; index < [...bioSet].length; index++) {
    const bio = [...bioSet][index];
    let bioanalistaInfo;
    const examenesBio = examen.examenes.filter((e) => e.bioanalista.id == bio);
    console.log(examenesBio);
    examenesBio.forEach((ex) => {
      console.log(ex);
      bioanalistaInfo = ex.bioanalista;
      ex.caracteristicas.sort(function (a, b) {
        if (a.posicion > b.posicion) {
          return 1;
        }
        if (a.posicion < b.posicion) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      const seccionesSet = new Set(examenesBio.map((e) => e.nombreSeccion));
      console.log("🚀 ~ pintarExamen ~ seccionesSet:", seccionesSet);

      document.getElementsByName("examenContainer")[0].innerHTML += [
        ...seccionesSet,
      ]
        .map((s) => {
          return `
      <div class="card">
      <div class="card-header text-start fw-bolder fs-6">${s}</div>
      ${
        ex.nombreSeccion == s
          ? ` 
          <div class="card">
          <div class="card-header">${ex.examen}</div>
          <div class="card-body">
            <table class="table table-sm" style="font-size: 11px;">
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
              ${ex.caracteristicas
                .map((c) => {
                  return `
                <tr>
                <th scope="row">${c.nombre}</th>
                <td>${c.resultado} ${
                    c.nota != ""
                      ? `<p class="m-0 fst-italic">(${c.nota})</p>`
                      : ""
                  } 
                </td>
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
         `
          : ""
      }
        
    </div>`;
        })
        .join("");
    });

    document.getElementsByName("examenContainer")[0].innerHTML += `
    <div  ${
      index + 1 == [...bioSet].length
        ? 'style="page-break-before:avoid"'
        : 'style="page-break-after:always"'
    } class="d-flex justify-content-center">
    <div class="card-body my-auto text-start">
      <h5>Lcd. ${bioanalistaInfo?.nombre}</h5>
      <h6>BIOANALISTA</h6>
      <h6>C.I.: ${bioanalistaInfo?.cedula} - COBIOZUL: ${
      bioanalistaInfo?.colegio
    } - MSDS: ${bioanalistaInfo?.ministerio} </h6>
    </div>
  <img id='bioanalistaFirma${bio}' style="width: 150px;" class="card-img-top mx-auto my-auto" alt="firma Ej">
  </div>
 
  `;
    /*  ${
    index + 1 == [...bioSet].length
      ? ""
      : '<div style="page-break-before:always"></div> '
  } */
    document.getElementById(`bioanalistaFirma${bio}`).src =
      bioanalistaInfo.foto_firma;
  }
};

const pintarExamen = async () => {
  const examen = await examenVar.get();
  console.log("🚀 ~ pintarExamen ~ examen:", examen);
  const { token } = await login.getToken();
  var imageUrl = "";
  var bioanalista;
  var reimpresion = false;
  console.log(examen.orden);
  if (examen.orden == "Reimpresion") return reimprimirExamen();
  if (reimpresion == false) {
    const { data } = await axios.get(urlsv + "/api/users/firma", {
      headers: { token },
      params: { idBioanalista: examen.bioanalista },
    });
    bioanalista = data;
    console.log("🚀 ~ pintarExamen ~ bioanalista:", bioanalista);
    //const imageUrl = await syncFiles(firmaImg.foto_firma)
    imageUrl = bioanalista.foto_firma;
  }
  console.log("🚀 ~ pintarExamen ~ reimpresion:", reimpresion);

  examen.examenes.forEach((ex) => {
    ex.caracteristicas.sort(function (a, b) {
      if (a.posicion > b.posicion) {
        return 1;
      }
      if (a.posicion < b.posicion) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  });

  /* 
  document.getElementsByName("direccion")[0].innerText =
    examen.paciente.direccion;
  document.getElementsByName("correo")[0].innerText =
    "Email: " + examen.paciente.correo;
  document.getElementsByName("cabecera")[0].innerHTML = `
  <div class="col" style="font-size: small;">
  <div class="card-body">
    <ul class="list-group list-group-flush">
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
 */
  const seccionesSet = new Set(examen.examenes.map((e) => e.nombreSeccion));
  console.log("🚀 ~ pintarExamen ~ seccionesSet:", seccionesSet);
  document.getElementsByName("firmaBioanalista")[0].innerHTML = `
  
  ${
    reimpresion == true
      ? `<div class="card-body text-center">
  <h4>REIMPRESION</h4>
</div>`
      : `
      <div class="card-body my-auto text-start">
        <h5>Lcd. ${bioanalista?.nombre}</h5>
        <h6>BIOANALISTA</h6>
        <h6>C.I.: ${bioanalista?.cedula} - COBIOZUL: ${bioanalista?.colegio} - MSDS: ${bioanalista?.ministerio} </h6>
      </div>
      <img id='bioanalistaFirma' style="width: 150px;" class="card-img-top mx-auto my-auto" alt="firma Ej">
    `
  }  
  `;

  reimpresion == false
    ? (document.getElementById("bioanalistaFirma").src = imageUrl)
    : "";
  document.getElementsByName("examenContainer")[0].innerHTML = [...seccionesSet]
    .map((s) => {
      return `
    <div class="card">
    <div class="card-header text-start fw-bolder fs-6">${s}</div>
    ${examen.examenes
      .map((e) => {
        if (e.nombreSeccion == s) {
          return ` 
        <div class="card">
        <div class="card-header">${e.examen}</div>
        <div class="card-body">
          <table class="table table-sm" style="font-size: 11px;">
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
