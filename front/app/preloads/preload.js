const { contextBridge, ipcRenderer } = require("electron");
/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

contextBridge.exposeInMainWorld("ventanas", {
  menuWindow: async () => await ipcRenderer.invoke("menuWindow"),
  creacionPaciWindow: async () =>
    await ipcRenderer.invoke("creacionPaciWindow"),
  creacionBioWindow: async () => await ipcRenderer.invoke("creacionBioWindow"),
  creacionExamenWindow: async () =>
    await ipcRenderer.invoke("creacionExamenWindow"),
  creacionEstadisticasWindow: async () =>
    await ipcRenderer.invoke("estadisticasWindow"),
  creacionExWindow: async () => await ipcRenderer.invoke("creacionExWindow"),
  mainWindow: async () => await ipcRenderer.invoke("createWindow"),
  menuExamenesWindow: async () =>
    await ipcRenderer.invoke("menuExamenesWindow"),
  loginWindow: async () => await ipcRenderer.invoke("loginWindow"),
  PDFWindow: async () => await ipcRenderer.invoke("examenPDFWindow"),
  reimprimirWindow: async () => await ipcRenderer.invoke("reimpresionesWindow"),
});

contextBridge.exposeInMainWorld("urlsv", "http://localhost:3000");
//contextBridge.exposeInMainWorld("urlsv", "https://laboratorio-sv.up.railway.app");

contextBridge.exposeInMainWorld("login", {
  login: async (user, pass) => {
    const result = ipcRenderer.sendSync("login", { user, pass });
    return result;
  },
  storeToken: async (token) => {
    await ipcRenderer.send("token", token);
    return;
  },
  getToken: async () => await ipcRenderer.invoke("getToken"),
});

contextBridge.exposeInMainWorld("examenVar", {
  store: async (examen) => {
    await ipcRenderer.send("examen", examen);
    return;
  },
  get: async () => await ipcRenderer.invoke("getExamen"),
});

contextBridge.exposeInMainWorld("sedeVar", {
  store: async (sede) => {
    await ipcRenderer.send("sede", sede);
    return;
  },
  get: async () => await ipcRenderer.invoke("getSede"),
});

contextBridge.exposeInMainWorld("reimpresionVar", {
  store: async (sede) => {
    await ipcRenderer.send("reimpresion", sede);
    return;
  },
  get: async () => await ipcRenderer.invoke("getReimpresion"),
});

contextBridge.exposeInMainWorld("ticket", {
  store: async (producto) => {
    const result = await ipcRenderer.send("setTicketProducto", producto);
    return result;
  },
  getStore: async (key) => await ipcRenderer.invoke("getTicketProducto", key),
  storeExistencia: async (existencia) => {
    const result = await ipcRenderer.send("setExistencia", existencia);
    return result;
  },
  getExistencia: async () => await ipcRenderer.invoke("getExistencia"),
});

contextBridge.exposeInMainWorld("alerta", {
  alert: async (titulo, body) => {
    const result = await ipcRenderer.invoke("alertWindow", { titulo, body });
    return result;
  },

  error: async () => {
    const result = await ipcRenderer.invoke("errorWindow");
    return result;
  },
});

//EXAMENES PDF
contextBridge.exposeInMainWorld(
  "imprimirPDF",
  async () => await ipcRenderer.send("print", JSON.stringify())
);

contextBridge.exposeInMainWorld(
  "wsPDF",
  async (numero) => await ipcRenderer.send("ws", JSON.stringify(numero))
);

contextBridge.exposeInMainWorld(
  "emailPDF",
  async (email) => await ipcRenderer.send("email", JSON.stringify(email))
);

//APP VERSION
contextBridge.exposeInMainWorld("versionApp", async () => await ipcRenderer.invoke("getAppVersion"));