let pacientesArray = [];
let examenesArray = [];
function buscarPaciente(value) {
  let parse = parseInt(value);
  const tBody = document.getElementById("tBodyPacientesDia");
  tBody.innerHTML = ``;
  let resultado = [];
  if (isNaN(parse)) {
    resultado = pacientesArray.filter((pc) =>
      pc.nombre.toLowerCase().includes(value.toLowerCase())
    );
  } else {
    resultado = pacientesArray.filter((pc) =>
      pc.cedula.toString().includes(value)
    );
  }
  resultado.forEach((element) => {
    let edad = calcularEdadNormal(element.fecha_nacimiento.split("T")[0]);
    tBody.innerHTML += `
        <tr>
                            <td scope="col">${element.cedula}</td>
                            <td scope="col">${element.nombre}</td>
                            <td scope="col">${edad}</td>
                            <td scope="col">${element.direccion}</td>
                            <td scope="col">${element.genero}</td>
                            <td scope="col">${element.telefono}</td>
                            <td scope="col">${element.correo}</td>
                            <td scope="col">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" style="cursor:pointer" onclick="detalleExamenesPaciente('${element.id}','${element.nombre}')" class="bi bi-file-text" viewBox="0 0 16 16">
                                    <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"/>
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
                                  </svg>
                            </td>
      
                          </tr>
        `;
  });
}

async function detalleExamenesPaciente(id, nombre) {
  document.getElementById("nombrePaciente").innerText = nombre;
  const tBodyDetalle = document.getElementById(`tBodyDetalle`);

  try {
    const res = await axios.get(
      "/api/espejo/get-examenes-paciente",
      { params: { id } }
    );
    examenesArray = res.data.examenes;
    console.log(res);
    tBodyDetalle.innerHTML = "";
    res.data.examenes.forEach((ex) => {
      tBodyDetalle.innerHTML += `
        <tr>
                        <td scope="col">${ex.examen}</td>
                        <td scope="col">${ex.bioanalista}</td>
                        <td scope="col">${ex.fecha.split("T")[0]}  ${
        ex.fecha.split("T")[1].split(".")[0]
      }</td>
                        <td scope="col"><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="green"
                        class="bi bi-eye"
                        viewBox="0 0 16 16"
                        data-bs-toggle="collapse" href="#collapseEx${
                          ex.id
                        }" role="button" aria-expanded="false" aria-controls="collapseEx${
        ex.id
      }" onclick="detalleExamen('${ex.id}')"
                      >
                        <path
                          d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                        />
                        <path
                          d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                        />
                      </svg></td>
                      

                      </tr>
                      <tr class="collapse" id="collapseEx${ex.id}">
                        <td colspan="4">
                        
                        <table class="table table-sm"> 
                        <thead>
                          <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Resultado</th>
                            <th scope="col">Rango</th>
                          </tr>
                        </thead>
                        <tbody id='tBodyEx${ex.id}'>
                        
                        </tbody>
                      </table>
                        
                        </td>
                      
                    </tr>
                      
        `;
    });
  } catch (error) {
    if(error.response.status=='400'){
      tBodyDetalle.innerHTML=`
      <tr><td colspan="4"><h1 class='display-2'>El paciente ${nombre} no tiene examenes hechos</h1></tr>
      `
    }else{
      console.log("🚀 ~ detalleExamenesPaciente ~ error:", error);
      alert(error);
    }
    
  }
}

const calcularEdadNormal = (fecha) => {
  const mes = moment(fecha).format("MM");
  const ano = moment(fecha).format("YYYY");
  const dia = moment(fecha).format("DD");

  const mesAc = moment().format("MM");
  const anoAc = moment().format("YYYY");
  const diaAc = moment().format("DD");

  let mesR = mesAc - mes;
  let diaR = diaAc - dia;
  let anoR = anoAc - ano;

  if (mesR < 0) {
    mesR = mesR + 12;
    anoR--;
  }
  if (diaR < 0) {
    mesR--;
  }

  return `${anoR} años;  ${mesR} meses`;
};

function detalleExamen(id) {
  const examen = examenesArray.find((e) => e.id == id);
  console.log(examen);
  const collapse = document.getElementById(`tBodyEx${id}`);
  collapse.innerHTML = "";
  examen.caracteristicas.forEach((ct) => {
    collapse.innerHTML += `
        <tr>
                                <td scope="col">${ct.nombre}</td>
                                <td scope="col">${ct.resultado}</td>
                                <td scope="col">${ct.inferior} - ${ct.superior}</td>
                              </tr>
        `;
  });
}

async function traerPacientesDia() {
  try {
    const res = await axios.get(
      "/api/espejo/get-pacientes-dia"
    );
    console.log(res);

    pacientesArray = res.data.pacientesTabla;
    const tBody = document.getElementById("tBodyPacientesDia");
    tBody.innerHTML = "";
    if (res.data.pacientes.length == 0) {
      tBody.innerHTML = `
      <tr>
      <td scope="col" colspan="8"><h5>No se han encontrado pacientes que se hayan hecho examenes el dia de hoy</h5></td>
    </tr>
      `;
    } else {
      res.data.pacientes.forEach((element) => {
        let edad = calcularEdadNormal(element.fecha_nacimiento.split("T")[0]);

        tBody.innerHTML += `
        <tr>
                            <td scope="col">${element.cedula}</td>
                            <td scope="col">${element.nombre}</td>
                            <td scope="col">${edad}</td>
                            <td scope="col">${element.direccion}</td>
                            <td scope="col">${element.genero}</td>
                            <td scope="col">${element.telefono}</td>
                            <td scope="col">${element.correo}</td>
                            <td scope="col">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="orange" style="cursor:pointer" onclick="detalleExamenesPaciente('${element.id}','${element.nombre}')" class="bi bi-file-text" viewBox="0 0 16 16">
                                    <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z"/>
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/>
                                  </svg>
                            </td>
      
                          </tr>
        `;
      });
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
}
