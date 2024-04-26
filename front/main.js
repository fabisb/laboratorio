// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const Store = require("electron-store");
const path = require("path");
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

ipcMain.on("examen", async (event, examen) => {
  store.delete("examen");
  await store.set("examen", examen);
});
ipcMain.handle("getExamen", (event, arg) => {
  const examen = store.get("examen");
  console.log("🚀 ~ ipcMain.handle ~ examen:", examen);
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
    },
  });

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
      //devTools:false
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
      //devTools:false
    },
  });
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
        //devTools:false
      },
    });
    creacionPaciWindowVar.loadFile("app/screens/crearPaci.html");
    creacionPaciWindowVar.on("closed", () => (creacionPaciWindowVar = null));
  } else {
    creacionPaciWindowVar.focus();
  }
}
ipcMain.handle("creacionPaciWindow", () => creacionPaciWindow());

let creacionBioWindowVar;
function creacionBioWindow() {
  if (!creacionBioWindowVar) {
    creacionBioWindowVar = new BrowserWindow({
      width: 1024,
      height: 2000,
      title: "Creacion - Bioanalista",
      icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),

      parent: crearExamenWindowVar,
      modal: true,

      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        //devTools:false
      },
    });
    creacionBioWindowVar.loadFile("app/screens/crearBio.html");
    creacionBioWindowVar.on("closed", () => (creacionBioWindowVar = null));
  } else {
    creacionBioWindowVar.focus();
  }
}
ipcMain.handle("creacionBioWindow", () => creacionBioWindow());

let crearExamenWindowVar;
function creacionExamenWindow() {
  if (!crearExamenWindowVar) {
    crearExamenWindowVar = new BrowserWindow({
      width: 1368,
      icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
      height: 960,
      title: "Diagnosticos",
      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        //devTools:false
      },
    });
    crearExamenWindowVar.maximize();

    crearExamenWindowVar.loadFile("app/screens/examen.html");
    crearExamenWindowVar.on("closed", () => (crearExamenWindowVar = null));
    if (mainWindow) {
      mainWindow.close();
    }
  } else {
    crearExamenWindowVar.focus();
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
        //devTools:false
      },
    });
    crearExWindowVar.maximize();

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
        //devTools:false
      },
    });
    menuExamenesVar.loadFile("app/screens/menuExamenes.html");
    menuExamenesVar.on("closed", () => (menuExamenesVar = null));
  } else {
    menuExamenesVar.focus();
  }
}
ipcMain.handle("menuExamenesWindow", () => menuExamenesWindow());

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
  console.log("🚀 ~ file: main.js:102 ~ ipcMmenule ~ result:", result);
  return result;
});

ipcMain.handle("errorWindow", async (event, arg) => {
  const currentWindow = event.sender.getOwnerBrowserWindow();
  const result = await dialog.showErrorBox(
    "ERROR",
    "Ha ocurrido un error en el servidor"
  );
  console.log("🚀 ~ file: main.js:102 ~ ipcMain.handle ~ result:", result);
  return result;
});

let examenPDFVar;
function examenPDFWindow() {
  if (!examenPDFVar) {
    examenPDFVar = new BrowserWindow({
      width: 1024,
      icon: path.join(__dirname, "app/imgs/icons/app-logo.ico"),
      height: 768,
      title: "Menu - Examenes",
      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        //devTools:false
      },
    });
    examenPDFVar.loadFile("app/screens/examenPlantilla.html");
    examenPDFVar.on("closed", () => (examenPDFVar = null));
  } else {
    examenPDFVar.focus();
  }
}
ipcMain.handle("examenPDFWindow", () => examenPDFWindow());

ipcMain.on("print", (e, arg) => {
  if (!examenPDFVar) {
    return;
  } else {
    examenPDFVar.webContents
      .printToPDF({ printBackground: true })
      .then((data) => {
        console.log("printToPDF");
        // Save the PDF data to a file (you can modify the path)
        const fs = require("fs");
        fs.writeFileSync("app/assets/my_generated_pdf.pdf", data);
        shell.openPath(path.join(__dirname, "app/assets/my_generated_pdf.pdf"));
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  }

  // When the page finishes loading, generate the PDF
});

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
