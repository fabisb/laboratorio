async function pdfExterno() {

  try {
    const reimpresion = await reimpresionVar.get();
    const { token } = await login.getToken();

    const { data } = await axios.get(
      urlsv + "/api/estadisticas/get-externos-pdf",
      {
        params: { id: reimpresion?.id }, headers: { token }
      },

    );
    document.getElementById("pdfExternoEmbed").src = data;

  } catch (error) {
    console.log("🚀 ~ pdfExterno ~ error:", error)

  }
}


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


const pintarExamen = async () => {
  try {
    const reimpresion = await reimpresionVar.get();

    const { token } = await login.getToken();

    const { data: examen } = await axios.post(
      urlsv + "/api/estadisticas/reimpresion-examen",
      { reimp: [reimpresion?.id] }, { headers: { token } }
    );
    await examenVar.store(examen.examenes[0]);

    //examen.examenes[0].paciente.cedula
    document.getElementById("numeroTlf").value = examen.examenes[0].paciente.telefono || '';
    document.getElementById("emailInput").value = examen.examenes[0].paciente.correo || '';
    document.getElementsByName("firmaBioanalista")[0].innerHTML = "";

    const bioSet = new Set();
    examen.examenes.forEach((ex) => {
      bioSet.add(ex.bioanalista.id);
    });

    /*   document.getElementById('headerExamenes').innerHTML = `
            <div class="text-center">
            <div class="row">
          <div class="col my-1">
            <div class="card">
              <div class="row m-0">
                <div class=" col-2 mx-auto my-auto">
                  <img
                    width="60px"
                    src='../imgs/la-milagrosa-logo.png'
                    class="img-fluid"
                    alt="La milagrosa logo"
                  />
                </div>
                <div class="col p-0">
                  <div class="card-body text-start">
                    <h6 class="card-title">
                      LA MILAGROSA INSTITUTO PRESTADOR DE SERVICIOS DE SALUD
                    </h6>
                    <p class="card-text m-0" style="font-size: 12px;">R.I.F.: J-501761426 / N.I.T.:</p>
                    <p class="card-text">
                      <small name="direccion" style="font-size: 12px;" class="text-body-secondary"
                        >Calle 79 Casa Nro 78 - 179 Sector La Macandona, Maracaibo,
                        Edo. Zulia. Zona Postal 4005</small
                      >
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
        <div class="row" style="font-size: 12px;">
          <div class="col my-1">
            <div class="card">
              <div class="row">
                <div class="col-9 my-auto mx-auto">
                  <div class="card border border-0">
                    <div class="container p-0  text-center">
                      <div name="cabecera" class="row p-0 align-items-center">
                        <div class="col">
                          <div class="card-body p-0 ">
                            <ul class="list-group p-0  list-group-flush">
                            <li class="list-group-item p-0"><span class="fw-bold">Paciente:</span> <br> ${examen.examenes[0].paciente.nombre
        }</li>
                            <li class="list-group-item p-0"><span class="fw-bold">Cedula:</span><br> ${examen.examenes[0].paciente.pre_cedula
        }-${examen.examenes[0].paciente.cedula}</li>
                            <li class="list-group-item p-0"><span class="fw-bold">Factura: </span><br> ${examen.examenes[0].orden.orden
        }</li>
                            </ul>
                          </div>
                        </div>
                        <div class="col">
                          <div class="card-body p-0 ">
                            <ul class="list-group p-0  list-group-flush">
                            <li class="list-group-item p-0"><span class="fw-bold">Fecha Nacimiento:</span><br> ${moment(examen.examenes[0].paciente.fecha_nacimiento).format(
          "DD-MM-YYYY"
        )} </li>
                            <li class="list-group-item p-0"><span class="fw-bold">Edad:</span><br> ${moment().diff(moment(examen.examenes[0].paciente.fecha_nacimiento), "years")} </li>
                            <li class="list-group-item p-0"><span class="fw-bold">Emision:</span><br> ${moment(examen.examenes[0].orden.fecha).format(
          "DD-MM-YYYY h:mm:ss a"
        )}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-3 my-auto mx-auto">
                  <div class="card-body">
                    <h6 class="card-title">
                      RESULTADOS DE EXAMENES DE LABORATORIO
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
            `; */

    document.getElementsByName("examenContainer")[0].innerHTML = "";
    for (let index = 0; index < [...bioSet].length; index++) {
      const bio = [...bioSet][index];
      let bioanalistaInfo;
      const examenesBio = examen.examenes.filter((e) => e.bioanalista.id == bio);
      examenesBio.forEach((ex) => {
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
                    <td>${c.inferior}</td>
                    <td>${c.superior}</td>
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
          <h5>${bioanalistaInfo?.nombre}</h5>
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
  } catch (error) {
    console.log("🚀 ~ reimprimirExamen ~ error:", error)

  }
};

const whatsapp = async () => {
  const numero =
    document.getElementById("numeroTlf").value.charAt(0) == "0"
      ? document.getElementById("numeroTlf").value.slice(1)
      : document.getElementById("numeroTlf").value;

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
    await document.getElementById("emailModalBtnClose").click();
    botones.hidden = true;
    await emailPDF({ email });
    setTimeout(() => {
      botones.hidden = false;
    }, 3000);
  } catch (error) {
    console.log("🚀 ~ imprimir ~ error:", error);
    botones.hidden = false;
  }
};