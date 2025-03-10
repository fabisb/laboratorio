// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const Store = require("electron-store");
const os = require("os");
const path = require("path");
const fs = require("fs").promises;
var moment = require("moment");
const axios = require("axios");
//RECARGA AUTOMATICA
/* const electronReload = require("electron-reload");
const env = process.env.NODE_ENV || "development";
if (env === "development") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
    ignored: /main\.js/,
    });
    }  */
//RECARGA AUTOMATICA
const devTools = true;
//AUTO UPDATER
const { autoUpdater } = require("electron-updater");
//Basic flags for auto-updater
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;
let validacionActualizacion = false;

/*New Update Available*/
autoUpdater.checkForUpdates();

let downloadWindow;
autoUpdater.on("update-available", (info) => {
  validacionActualizacion = true;
  downloadWindow = new BrowserWindow({
    title: "Actualizacion",
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: devTools,
    },
  });
  downloadWindow.loadFile("app/screens/download.html");
  //downloadWindow.webContents.openDevTools();
  downloadWindow.setMenuBarVisibility(false);
});

ipcMain.on("comenzar-descarga", (e, arg) => {
  autoUpdater.downloadUpdate();
  downloadWindow.webContents.send("conf", "comenzando");
});

autoUpdater.on("update-downloaded", (info) => {
  downloadWindow.webContents.send("descarga-finalizada", {
    mensaje: "descarga finalizada",
    info,
  });
  autoUpdater.quitAndInstall();
});

autoUpdater.on("update-not-available", (info) => {
  validacionActualizacion = false;
});

autoUpdater.on("error", (info) => {
  downloadWindow.webContents.send("updater-error", {
    mensaje: "error al descargar",
    info,
  });
});
//AUTO UPDATER

//URL DE SEVIDOR
const urlsv = "http://localhost:3000";
//const urlsv = "https://laboratorio-sv.up.railway.app";
//URL DE SEVIDOR
const store = new Store();
store.clear();

ipcMain.on("token", async (event, token) => {
  store.clear();
  await store.set("token", token);
});
ipcMain.handle("getToken", (event, arg) => {
  const token = store.get("token");
  return token;
});

ipcMain.on("sede", async (event, sede) => {
  store.delete("sede");
  await store.set("sede", sede);
});
ipcMain.handle("getSede", (event, arg) => {
  const sede = store.get("sede");
  return sede;
});

ipcMain.on("reimpresion", async (event, id) => {
  store.delete("reimpresion");
  await store.set("reimpresion", id);
});
ipcMain.handle("getReimpresion", (event, arg) => {
  const reimpresion = store.get("reimpresion");
  return reimpresion;
});

ipcMain.on("examen", async (event, examen) => {
  store.delete("examen");
  await store.set("examen", examen);
});
ipcMain.handle("getExamen", (event, arg) => {
  const examen = store.get("examen");
  return examen;
});

let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    title: "Menu",
    icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "app/preloads/preload.js"),
      devTools: devTools
    },
  });
  mainWindow.setMenuBarVisibility(false)

  // and load the index.html of the app.
  mainWindow.loadFile("app/screens/index.html");
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

/* function facturarWindow() {
  let facturarWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Facturar",
    webPreferences: {
      preload: path.join(__dirname, "app/preloads/preload.js"),
      devTools: devTools
    },
  });
  facturarWindow.loadFile("app/screens/facturar.html");
  facturarWindow.on("closed", () => (facturarWindow = null));
} 

ipcMain.handle("facturarWindow", () => facturarWindow());
*/
function menuWindow() {
  let menuWindow = new BrowserWindow({
    width: 1024,
    icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
    height: 768,
    title: "Menu",
    webPreferences: {
      preload: path.join(__dirname, "app/preloads/preload.js"),
      devTools: devTools
    },
  });
  menuWindow.setMenuBarVisibility(false)

  menuWindow.loadFile("app/screens/menu.html");
  menuWindow.on("closed", () => (menuWindow = null));
}
ipcMain.handle("menuWindow", () => menuWindow());

let creacionPaciWindowVar;
function creacionPaciWindow() {
  if (!creacionPaciWindowVar) {
    creacionPaciWindowVar = new BrowserWindow({
      width: 1024,
      icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
      height: 768,
      title: "Creacion - Paciente",
      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        devTools: devTools
      },
    });
    creacionPaciWindowVar.setMenuBarVisibility(false)

    creacionPaciWindowVar.loadFile("app/screens/crearPaci.html");
    creacionPaciWindowVar.on("closed", () => (creacionPaciWindowVar = null));
  } else {
    creacionPaciWindowVar.focus();
  }
}
ipcMain.handle("creacionPaciWindow", () => creacionPaciWindow());

let estadisticasWindowVar;
function estadisticasWindow() {
  if (!estadisticasWindowVar) {
    estadisticasWindowVar = new BrowserWindow({
      width: 1368,
      icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
      height: 960,
      title: "Estadísticas",
      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        devTools: devTools
      },
    });
    estadisticasWindowVar.maximize();
    estadisticasWindowVar.setMenuBarVisibility(false)

    estadisticasWindowVar.loadFile("app/screens/estadisticas.html");
    estadisticasWindowVar.on("closed", () => (estadisticasWindowVar = null));
  } else {
    estadisticasWindowVar.focus();
  }
}
ipcMain.handle("estadisticasWindow", () => estadisticasWindow());

let creacionBioWindowVar;
function creacionBioWindow() {
  if (!creacionBioWindowVar) {
    creacionBioWindowVar = new BrowserWindow({
      width: 1268,
      minWidth: 1024,
      height: 2000,
      title: "Creacion - Bioanalista",
      icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),

      parent: crearExamenWindowVar,
      modal: true,

      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        devTools: devTools
      },
    });
    creacionBioWindowVar.setMenuBarVisibility(false)

    creacionBioWindowVar.loadFile("app/screens/crearBio.html");
    creacionBioWindowVar.on("closed", () => (creacionBioWindowVar = null));
  } else {
    creacionBioWindowVar.focus();
  }
}
ipcMain.handle("creacionBioWindow", () => creacionBioWindow());

let crearExamenWindowVar;
function creacionExamenWindow() {
  if (!validacionActualizacion) {

    if (!crearExamenWindowVar) {
      crearExamenWindowVar = new BrowserWindow({
        width: 1368,
        icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
        height: 960,
        title: "Diagnósticos",
        webPreferences: {
          preload: path.join(__dirname, "app/preloads/preload.js"),
          devTools: devTools
        },
      });
      crearExamenWindowVar.maximize();
      crearExamenWindowVar.setMenuBarVisibility(false)

      crearExamenWindowVar.loadFile("app/screens/examen.html");
      crearExamenWindowVar.on("closed", () => (crearExamenWindowVar = null));
      if (mainWindow) {
        mainWindow.close();
      }
    } else {
      crearExamenWindowVar.focus();
    }
  }
}
ipcMain.handle("creacionExamenWindow", () => creacionExamenWindow());

let crearExWindowVar;
function creacionExWindow() {
  if (!crearExWindowVar) {
    crearExWindowVar = new BrowserWindow({
      width: 1368,
      icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
      height: 960,
      title: "Creacion - Examen",
      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        devTools: devTools
      },
    });
    crearExWindowVar.maximize();
    crearExWindowVar.setMenuBarVisibility(false)

    crearExWindowVar.loadFile("app/screens/examenCreacion.html");
    crearExWindowVar.on("closed", () => (crearExWindowVar = null));
    if (mainWindow) {
      mainWindow.close();
    }
  } else {
    crearExWindowVar.focus();
  }
}
ipcMain.handle("creacionExWindow", () => creacionExWindow());

let menuExamenesVar;
function menuExamenesWindow() {
  if (!menuExamenesVar) {
    menuExamenesVar = new BrowserWindow({
      width: 1024,
      icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
      height: 768,
      title: "Menu - Examenes",
      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        devTools: devTools
      },
    });
    menuExamenesVar.setMenuBarVisibility(false)

    menuExamenesVar.loadFile("app/screens/menuExamenes.html");
    menuExamenesVar.on("closed", () => (menuExamenesVar = null));
  } else {
    menuExamenesVar.focus();
  }
}
ipcMain.handle("menuExamenesWindow", () => menuExamenesWindow());

let reimpresionesVar;
function reimpresionesWindow() {
  reimpresionesVar = null;
  const reimpresion = store.get("reimpresion");

  if (!reimpresionesVar) {
    reimpresionesVar = new BrowserWindow({
      width: 1024,
      icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
      height: 768,
      title: "Examenes - Reimpresion",
      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        devTools: devTools
      },
    });
    const file = reimpresion.tipo;
    reimpresionesVar.setMenuBarVisibility(false)

    reimpresionesVar.loadFile(`app/screens/${file}.html`);
    reimpresionesVar.on("closed", () => (reimpresionesVar = null));
  } else {
    reimpresionesVar.focus();
  }
}
ipcMain.handle("reimpresionesWindow", () => reimpresionesWindow());

//handlers

ipcMain.handle("loginWindow", () => {
  store.clear();
  if (crearExamenWindowVar) {
    crearExamenWindowVar.close();
  }
  createWindow();
});

//handlers

ipcMain.handle("alertWindow", async (event, { titulo, body }) => {
  const currentWindow = event.sender.getOwnerBrowserWindow();
  const result = await dialog.showMessageBox(currentWindow, {
    type: "warning",
    message: titulo,
    detail: body,
    buttons: ["OK", "Cancelar"],
    defaultId: 0,
    title: "Alerta",
    cancelId: 1,
  });
  return result;
});

ipcMain.handle("errorWindow", async (event, arg) => {
  const currentWindow = event.sender.getOwnerBrowserWindow();
  const result = await dialog.showErrorBox(
    "ERROR",
    "Ha ocurrido un error en el servidor"
  );
  return result;
});

let examenPDFVar;
function examenPDFWindow() {
  examenPDFVar = null;
  if (!examenPDFVar) {
    examenPDFVar = new BrowserWindow({
      width: 1024,
      icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
      height: 768,
      title: "Menu - Examenes",
      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        devTools: devTools
      },
    });
    examenPDFVar.setMenuBarVisibility(false)

    examenPDFVar.loadFile("app/screens/examenPlantilla.html");
    examenPDFVar.on("closed", () => (examenPDFVar = null));
  } else {
    examenPDFVar.focus();
  }
}
ipcMain.handle("examenPDFWindow", () => examenPDFWindow());

ipcMain.on("print", async (event, arg) => {
  const currentWindow = event.sender.getOwnerBrowserWindow();

  const desktopDir = path.join(os.homedir(), "Desktop");
  const examen = store.get("examen");
  const ccsData = await fs.readFile(path.join(__dirname, "app/modules/bootstrap.min.css"), "utf8");
  const imgData =
    `data:image/png;base64,` +
    (await fs.readFile(path.join(__dirname, "app/imgs/la-milagrosa-logo.png"), "base64"));

  currentWindow.webContents
    .printToPDF({
      pageSize: "A4",
      displayHeaderFooter: true,
      printBackground: true,
      headerTemplate: `
        <style>
        ${ccsData}
        </style>
        <main class="container my-6 mx-12 fs-2">
        <div class="container text-center">
        <div class="row">
      <div class="col my-1">
        <div class="card">
          <div class="row m-0">
            <div class=" col-2 mx-auto my-auto">
              <img
                width="60px"
                src=${imgData}
                class="img-fluid"
                alt="La milagrosa logo"
              />
            </div>
            <div class="col-9 p-0">
              <div class="card-body text-start">
                <h5 class="card-title fs-1">
                  LA MILAGROSA INSTITUTO PRESTADOR DE SERVICIOS DE SALUD
                </h5>
                <p class="card-text m-0">R.I.F.: J-501761426 / N.I.T.:</p>
                <p class="card-text">
                  <small name="direccion" class="text-body-secondary"
                    >Calle 79 Casa Nro 78 - 179 Sector La Macandona, Maracaibo,
                    Edo. Zulia. Zona Postal 4005</small
                  >
                  <br />
                </p>
              </div>
            </div>
            <div class="col-1 p-0">
              <div class="card-body text-start">
                <p class="card-text m-0"><span class=pageNumber></span>/<span class=totalPages></span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col my-1">
        <div class="card">
          <div class="row">
            <div class="col-9 my-auto mx-auto">
              <div class="card border border-0">
                <div class="container text-center">
                  <div name="cabecera" class="row align-items-center">
                    <div class="col">
                      <div class="card-body">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span class="fw-bold">Paciente:</span> <br> ${examen.paciente.nombre
        }</li>
                        <li class="list-group-item"><span class="fw-bold">Cedula:</span><br> ${examen.paciente.pre_cedula
        }-${examen.paciente.cedula}</li>
                        <li class="list-group-item"><span class="fw-bold">Factura: </span><br> ${examen.orden ? examen.orden : examen.orden.orden
        }</li>
                        </ul>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card-body">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span class="fw-bold">Fecha Nacimiento:</span><br>  ${moment(examen.paciente.fecha_nacimiento).format(
          "DD-MM-YYYY"
        )}</li>
                        <li class="list-group-item"><span class="fw-bold">Edad:</span><br> ${examen.paciente.edad
        }</li>
                        <li class="list-group-item"><span class="fw-bold">Emision:</span><br> ${moment().format(
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
                <h6 class="fs-1 card-title">
                  RESULTADOS DE EXAMENES DE LABORATORIO
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </main>
    `,
      marginType: 0,
    })
    .then(async (data) => {
      // Save the PDF data to a file (you can modify the path)
      const fs = require("fs");
      fs.writeFileSync(path.join(desktopDir, "EXAMENES-LABORATORIO/generated_pdf.pdf"), data);
      shell.openPath(path.join(desktopDir, "EXAMENES-LABORATORIO/generated_pdf.pdf"));
      if (examen.orden != "Reimpresion") {
        const { token } = await store.get("token");
        try {
          await axios.put(
            urlsv + "/api/examenes/status-examen",
            { col: "status_imp", status: 1, id: examen?.ordenId },
            { headers: { token } }
          );
        } catch (error) {
          console.log("🚀 ~ .then ~ error):", error);
          const currentWindow = event.sender.getOwnerBrowserWindow();
          const result = await dialog.showErrorBox(
            "ERROR",
            "Ha ocurrido un error confirmando el status de Impresion"
          );
          return result;
        }
      }
    })
    .catch(async (error) => {
      console.error("Error generating PDF:", error);
      const currentWindow = event.sender.getOwnerBrowserWindow();
      const result = await dialog.showErrorBox(
        "ERROR",
        "Ha ocurrido un generando el PDF"
      );
      return result;
    });


  // When the page finishes loading, generate the PDF
});
ipcMain.on("ws", async (event, numeroArg) => {
  const currentWindow = event.sender.getOwnerBrowserWindow();

  const examen = store.get("examen");
  const ccsData = await fs.readFile(path.join(__dirname, "app/modules/bootstrap.min.css"), "utf8");
  const imgData =
    `data:image/png;base64,` +
    (await fs.readFile(path.join(__dirname, "app/imgs/la-milagrosa-logo.png"), "base64"));

  currentWindow.webContents
    .printToPDF({
      pageSize: "A4",
      displayHeaderFooter: true,
      printBackground: true,
      headerTemplate: `
        <style>
        ${ccsData}
        </style>
        <main class="container my-6 mx-12 fs-2">
        <div class="container text-center">
        <div class="row">
      <div class="col my-1">
        <div class="card">
          <div class="row m-0">
            <div class=" col-2 mx-auto my-auto">
              <img
                width="60px"
                src=${imgData}
                class="img-fluid"
                alt="La milagrosa logo"
              />
            </div>
            <div class="col-9 p-0">
              <div class="card-body text-start">
                <h5 class="card-title fs-1">
                  LA MILAGROSA INSTITUTO PRESTADOR DE SERVICIOS DE SALUD
                </h5>
                <p class="card-text m-0">R.I.F.: J-501761426 / N.I.T.:</p>
                <p class="card-text">
                  <small name="direccion" class="text-body-secondary"
                    >Calle 79 Casa Nro 78 - 179 Sector La Macandona, Maracaibo,
                    Edo. Zulia. Zona Postal 4005</small
                  >
                  <br />
                </p>
              </div>
            </div>
            <div class="col-1 p-0">
              <div class="card-body text-start">
                <p class="card-text m-0"><span class=pageNumber></span>/<span class=totalPages></span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col my-1">
        <div class="card">
          <div class="row">
            <div class="col-9 my-auto mx-auto">
              <div class="card border border-0">
                <div class="container text-center">
                  <div name="cabecera" class="row align-items-center">
                    <div class="col">
                      <div class="card-body">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span class="fw-bold">Paciente:</span> <br> ${examen.paciente.nombre
        }</li>
                        <li class="list-group-item"><span class="fw-bold">Cedula:</span><br> ${examen.paciente.pre_cedula
        }-${examen.paciente.cedula}</li>
                        <li class="list-group-item"><span class="fw-bold">Factura: </span><br> ${examen.orden ? examen.orden : examen.orden.orden
        }</li>
                        </ul>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card-body">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span class="fw-bold">Fecha Nacimiento:</span><br>  ${moment(examen.paciente.fecha_nacimiento).format(
          "DD-MM-YYYY"
        )}</li>
                        <li class="list-group-item"><span class="fw-bold">Edad:</span><br> ${examen.paciente.edad
        }</li>
                        <li class="list-group-item"><span class="fw-bold">Emision:</span><br> ${moment().format(
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
                <h6 class="fs-1 card-title">
                  RESULTADOS DE EXAMENES DE LABORATORIO
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </main>
    `,
      marginType: 0,
    })
    .then(async (data) => {
      const desktopDir = path.join(os.homedir(), "Desktop");
      const rutaArchivo = path.join(
        desktopDir,
        `EXAMENES-LABORATORIO/${examen.paciente.cedula}/${examen.orden ? examen.orden : examen.orden.orden}/examen-${examen.orden ? examen.orden : examen.orden.orden}-${examen.paciente.cedula}.pdf`
      );
      const rutaCarpeta = path.join(desktopDir, `EXAMENES-LABORATORIO`);
      const rutaPaciente = path.join(
        desktopDir,
        `EXAMENES-LABORATORIO/${examen.paciente.cedula}`
      );
      const rutaOrden = path.join(
        desktopDir,
        `EXAMENES-LABORATORIO/${examen.paciente.cedula}/${examen.orden ? examen.orden : examen.orden.orden}`
      );
      const fs = require("fs");

      try {
        if (!fs.existsSync(rutaCarpeta)) {
          fs.mkdirSync(rutaCarpeta, { recursive: true });
        }
        if (!fs.existsSync(rutaPaciente)) {
          fs.mkdirSync(rutaPaciente);
        }
        if (!fs.existsSync(rutaOrden)) {
          fs.mkdirSync(rutaOrden);
        }
      } catch (err) {
        console.error(err);
        const currentWindow = event.sender.getOwnerBrowserWindow();
        const result = dialog.showErrorBox(
          "ERROR",
          "Ha ocurrido un generando la carpeta del paciente"
        );
        return result;
      }

      fs.writeFileSync(rutaArchivo, data);
      shell.showItemInFolder(rutaArchivo);
      const texto = `${examen.paciente.pre_cedula}-${examen.paciente.cedula} ${examen.orden ? examen.orden : examen.orden.orden}`;
      const numero = JSON.parse(numeroArg);
      const linkWs =
        `https://wa.me/+${numero.code}${numero.numero}?text=` +
        encodeURI(texto);
      shell.openExternal(linkWs);

      if (examen.orden != "Reimpresion") {
        const { token } = await store.get("token");
        try {
          await axios.put(
            urlsv + "/api/examenes/status-examen",
            { col: "status_ws", status: 1, id: examen?.ordenId },
            { headers: { token } }
          );
        } catch (error) {
          console.log("🚀 ~ .then ~ error):", error);
          const currentWindow = event.sender.getOwnerBrowserWindow();
          const result = await dialog.showErrorBox(
            "ERROR",
            "Ha ocurrido un error confirmando el status de WhatsApp"
          );
          return result;
        }
      }
    })
    .catch(async (error) => {
      console.error("Error generating PDF:", error);
      const currentWindow = event.sender.getOwnerBrowserWindow();
      const result = await dialog.showErrorBox(
        "ERROR",
        "Ha ocurrido un generando el PDF y enviandolo por WhatsApp"
      );
      return result;
    });


  // When the page finishes loading, generate the PDF
});
ipcMain.on("email", async (event, email) => {
  const currentWindow = event.sender.getOwnerBrowserWindow();

  const examen = store.get("examen");
  const ccsData = await fs.readFile(path.join(__dirname, "app/modules/bootstrap.min.css"), "utf8");
  const imgData =
    `data:image/png;base64,` +
    (await fs.readFile(path.join(__dirname, "app/imgs/la-milagrosa-logo.png"), "base64"));

  currentWindow.webContents
    .printToPDF({
      pageSize: "A4",
      displayHeaderFooter: true,
      printBackground: true,
      headerTemplate: `
        <style>
        ${ccsData}
        </style>
        <main class="container my-6 mx-12 fs-2">
        <div class="container text-center">
        <div class="row">
      <div class="col my-1">
        <div class="card">
          <div class="row m-0">
            <div class=" col-2 mx-auto my-auto">
              <img
                width="60px"
                src=${imgData}
                class="img-fluid"
                alt="La milagrosa logo"
              />
            </div>
            <div class="col-9 p-0">
              <div class="card-body text-start">
                <h5 class="card-title fs-1">
                  LA MILAGROSA INSTITUTO PRESTADOR DE SERVICIOS DE SALUD
                </h5>
                <p class="card-text m-0">R.I.F.: J-501761426 / N.I.T.:</p>
                <p class="card-text">
                  <small name="direccion" class="text-body-secondary"
                    >Calle 79 Casa Nro 78 - 179 Sector La Macandona, Maracaibo,
                    Edo. Zulia. Zona Postal 4005</small
                  >
                  <br />
                </p>
              </div>
            </div>
            <div class="col-1 p-0">
              <div class="card-body text-start">
                <p class="card-text m-0"><span class=pageNumber></span>/<span class=totalPages></span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col my-1">
        <div class="card">
          <div class="row">
            <div class="col-9 my-auto mx-auto">
              <div class="card border border-0">
                <div class="container text-center">
                  <div name="cabecera" class="row align-items-center">
                    <div class="col">
                      <div class="card-body">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span class="fw-bold">Paciente:</span> <br> ${examen.paciente.nombre
        }</li>
                        <li class="list-group-item"><span class="fw-bold">Cedula:</span><br> ${examen.paciente.pre_cedula
        }-${examen.paciente.cedula}</li>
                        <li class="list-group-item"><span class="fw-bold">Factura: </span><br> ${examen.orden ? examen.orden : examen.orden.orden
        }</li>
                        </ul>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card-body">
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span class="fw-bold">Fecha Nacimiento:</span><br> 
                          ${moment(examen.paciente.fecha_nacimiento).format(
          "DD-MM-YYYY"
        )} 
                        </li>
                        <li class="list-group-item"><span class="fw-bold">Edad:</span><br> ${examen.paciente.edad
        }</li>
                        <li class="list-group-item"><span class="fw-bold">Emision:</span><br> ${moment().format(
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
                <h6 class="fs-1 card-title">
                  RESULTADOS DE EXAMENES DE LABORATORIO
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </main>
    `,
      marginType: 0,
    })
    .then(async (data) => {


      const texto = `${examen.paciente.pre_cedula}-${examen.paciente.cedula} ${examen.orden ? examen.orden : examen.orden.orden}`;
      const correo = (JSON.parse(email)).email;
      try {
        const { token } = await store.get("token");

        await axios.post(
          urlsv + "/api/examenes/enviar-correo",
          { texto, correo, data },
          { headers: { token } }
        );

        if (examen.orden != "Reimpresion") {
          try {
            await axios.put(
              urlsv + "/api/examenes/status-examen",
              { col: "status_correo", status: 1, id: examen?.ordenId },
              { headers: { token } }
            );
          } catch (error) {
            console.log("🚀 ~ .then ~ error):", error);
            const currentWindow = event.sender.getOwnerBrowserWindow();
            const result = await dialog.showErrorBox(
              "ERROR",
              "Ha ocurrido un error confirmando el status de Correo electronico"
            );
            return result;
          }
        }
      } catch (error) {
        console.log("🚀 ~ .then ~ error:", error)
        const currentWindow = event.sender.getOwnerBrowserWindow();
        const result = await dialog.showErrorBox(
          "ERROR",
          "Ha ocurrido un error enviando el examen por correo electronico"
        );
        return result;
      }

    })
    .catch(async (error) => {
      console.error("Error generating PDF:", error);
      const currentWindow = event.sender.getOwnerBrowserWindow();
      const result = await dialog.showErrorBox(
        "ERROR",
        "Ha ocurrido un generando el PDF y enviandolo por Correo"
      );
      return result;
    });


  // When the page finishes loading, generate the PDF
});

//APP VERSION
ipcMain.handle("getAppVersion", async () => app.getVersion());

//
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
