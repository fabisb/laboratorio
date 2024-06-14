const imprimir = async () => {
  const botones = document.getElementsByName("botones")[0];
  botones.hidden = true;
  try {
    await imprimirPDF();
    setTimeout(() => {
      botones.hidden = false;
    }, 3000);
  } catch (error) {
    console.log("🚀 ~ imprimir ~ error:", error);
    botones.removeAttribute("hidden");
  }
};

const reimprimirExamen = async () => {
  const examen = await examenVar.get();
  console.log("🚀 ~ pintarExamen ~ examen:", examen);

  document.getElementsByName("firmaBioanalista")[0].innerHTML = "";

  const bioSet = new Set();
  examen.examenes.forEach((ex) => {
    bioSet.add(ex.bioanalista.id);
  });

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
          let nombreExamen = `<div class="card-header" id="headerExamen">${ex.examen}</div>`;
          if (ex.nombreSeccion == s) {
            if (ex.caracteristicas.length == 1) {
              if (ex.examen == ex.caracteristicas[0].nombre) {
                //nombreExamen = ex.caracteristicas[0].nombre;
                nombreExamen = "";
              }
            }
          }
          return `
      <div class="card">
      <div class="card-header text-start fw-bolder fs-6">${s}</div>
      ${ex.nombreSeccion == s
              ? ` 
          <div class="card">
          ${nombreExamen}
          <div class="card-body">
            <table class="table table-sm" style="font-size: 11px;">
              <thead>
                <tr>
                  <th scope="col">CARACTERISTICA</th>
                  <th scope="col">RESULTADO</th>
                  <th scope="col">UNIDAD</th>
                  <th scope="col">INFERIOR</th>
                  <th scope="col">SUPERIOR</th>
                </tr>
              </thead>
              <tbody>
              ${ex.caracteristicas
                .map((c) => {
                  if (c?.status == "titulo") {
                    return `
                    <tr>
                    <th colspan="5" scope="row">${c.titulo}</th>
                  </tr>
                    `;
                  } else {
                    return `
                <tr>
                <th scope="row">${c.nombre}</th>
                <td>${c.resultado} ${c.nota != ""
                        ? `<p class="m-0 fst-italic">(${c.nota})</p>`
                        : ""
                      } 
                </td>
                <td>${c.unidad ? c.unidad : ''}</td>
                <td>${c.inferior == 'no' ? '-' : c.inferior}</td>
                <td>${c.superior == 'no' ? '-' : c.superior}</td>
              </tr>
              ${c.subCaracteristicas.length > 0
                        ? `
              <tr>
              <th scope="row"></th>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td><span class="fw-bold">RESULTADO</span></td>
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
                  }
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
    <div  ${index + 1 == [...bioSet].length
        ? 'style="page-break-before:avoid"'
        : 'style="page-break-after:always"'
      } class="d-flex justify-content-center">
    <div class="card-body my-auto text-start">
      <h5>Lcd. ${bioanalistaInfo?.nombre}</h5>
      <h6>BIOANALISTA</h6>
      <h6>C.I.: ${bioanalistaInfo?.cedula} - COBIOZUL: ${bioanalistaInfo?.colegio
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
  document.getElementById("numeroTlf").value = examen.paciente.telefono;
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

  examen.examenes.forEach((ex) => {
    ex.caracteristicas.sort(function (a, b) {
      if (a.posicion > b.posicion) {
        return 1;
      }
      if (a.posicion < b.posicion) {
        return -1;
      }
      return 0;
    });
  });

  const seccionesSet = new Set(examen.examenes.map((e) => e.nombreSeccion));
  console.log("🚀 ~ pintarExamen ~ seccionesSet:", seccionesSet);
  document.getElementsByName("firmaBioanalista")[0].innerHTML = `
  
  ${reimpresion == true
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
            let nombreExamen = `<div class="card-header" id="headerExamen">${e.examen}</div>`;
            if (e.nombreSeccion == s) {
              if (e.caracteristicas.length == 1) {
                if (e.examen == e.caracteristicas[0].nombre) {
                  //nombreExamen = e.caracteristicas[0].nombre;
                  nombreExamen = "";
                }
              }
              return ` 
        <div class="card">
        ${nombreExamen}
        <div class="card-body">
          <table class="table table-sm" style="font-size: 11px;">
            <thead>
              <tr>
                <th scope="col">CARACTERISTICA</th>
                <th scope="col">RESULTADO</th>
                <th scope="col">UNIDAD</th>
                <th scope="col">INFERIOR</th>
                <th scope="col">SUPERIOR</th>
              </tr>
            </thead>
            <tbody>
            ${e.caracteristicas
                  .map((c) => {
                    if (c?.status == "titulo") {
                      return `
                  <tr>
                  <th colspan="5" scope="row">${c.nombre}</th>
                </tr>
                  `;
                    } else {
                      return `
              <tr>
              <th scope="row">${c.nombre}</th>
              <td>${c.resultado} ${c.nota != ""
                          ? `<p class="m-0 fst-italic">(${c.nota})</p>`
                          : ""
                        } 
          </td>
              <td>${c.unidad ? c.unidad : ''}</td>
              <td>${c.inferior == 'no' ? '-' : c.inferior}</td>
              <td>${c.superior == 'no' ? '-' : c.superior}</td>
            </tr>
            ${c.subCaracteristicas.length > 0
                          ? `
            <tr>
            <th scope="row"></th>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td><span class="fw-bold">RESULTADO</span></td>
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
                    }
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

const whatsapp = async () => {
  const numero =
    document.getElementById("numeroTlf").value.charAt(0) == "0"
      ? document.getElementById("numeroTlf").value.slice(1)
      : document.getElementById("numeroTlf").value;
  console.log("🚀 ~ whatsapp ~ numeroInput:", numero);

  const code = document.getElementById("codeTlf").value;
  if (numero == "" || isNaN(numero) || numero <= 0) {
    return whatsappAlerta("Error en el numero de telefono", "warning");
  }
  if (code == "" || isNaN(code) || code <= 0) {
    return whatsappAlerta("Error en el codigo de pais", "warning");
  }

  const botones = document.getElementsByName("botones")[0];
  try {
    await document.getElementById("wsModalBtnClose").click();
    botones.hidden = true;
    await wsPDF({ numero, code });
    setTimeout(() => {
      botones.hidden = false;
    }, 3000);
  } catch (error) {
    console.log("🚀 ~ imprimir ~ error:", error);
    botones.hidden = false;
  }
};

const email = async () => {
  const email = document.getElementById("emailInput").value;
  if (email == "") {
    return whatsappAlerta("Ingrese un correo electronico valido", "warning");
  }
  const botones = document.getElementsByName("botones")[0];
  try {
    botones.hidden = true;
    await emailPDF({ email });
    whatsappAlerta("Correo electronico enviado", "success");
    setTimeout(() => {
      document.getElementById("emailModalBtnClose").click();
    }, 1000);
    setTimeout(() => {
      botones.hidden = false;
    }, 3000);
  } catch (error) {
    console.log("🚀 ~ imprimir ~ error:", error);
    botones.hidden = false;
  }
};
