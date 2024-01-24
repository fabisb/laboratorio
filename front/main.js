// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const Store = require("electron-store");
const path = require("path");
const { PosPrinter } = require("electron-pos-printer");

const electronReload = require("electron-reload");
const env = process.env.NODE_ENV || "development";
if (env === "development") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
    hardResetMethod: "exit",
    ignored: /main\.js/,
  });
}
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
function createWindow() {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Menu",
    webPreferences: {
      preload: path.join(__dirname, "app/preloads/preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("app/screens/index.html");

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
    width: 800,
    height: 600,
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
      width: 800,
      height: 600,
      title: "Menu",
      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        //devTools:false
      },
    });
    creacionPaciWindowVar.loadFile("app/screens/crearPaci.html");
    creacionPaciWindowVar.on("closed", () => (creacionPaciWindowVar = null));
  }else{
    creacionPaciWindowVar.focus()
  }
}
ipcMain.handle("creacionPaciWindow", () => creacionPaciWindow());

let creacionBioWindowVar;
function creacionBioWindow() {
  if (!creacionBioWindowVar) {
    creacionBioWindowVar = new BrowserWindow({
      width: 800,
      height: 600,
      title: "Menu",
      webPreferences: {
        preload: path.join(__dirname, "app/preloads/preload.js"),
        //devTools:false
      },
    });
    creacionBioWindowVar.loadFile("app/screens/crearBio.html");
    creacionBioWindowVar.on("closed", () => (creacionBioWindowVar = null));
  }else{
    creacionBioWindowVar.focus()
  }
}
ipcMain.handle("creacionBioWindow", () => creacionBioWindow());

ipcMain.handle("alertWindow", async (event, { titulo, body }) => {
  const currentWindow = event.sender.getOwnerBrowserWindow();
  const result = await dialog.showMessageBox(currentWindow, {
    type: "info",
    message: titulo,
    detail: body,
    buttons: ["OK", "Cancel"],
    defaultId: 0,
    title: "Alerta",
    cancelId: 1,
  });
  console.log("🚀 ~ file: main.js:102 ~ ipcMmenule ~ result:", result);
  return rult;
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
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
ipcMain.on("print", (e, arg) => {
  const data = JSON.parse(arg);
  PosPrinter.print(data, {
    pageSize: "58mm",
    preview: true,
    //silent: true,
  }).catch((e) => console.error(e));
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
