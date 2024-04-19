const { contextBridge, ipcRenderer, dialog } = require("electron");

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
  creacionExWindow: async () => await ipcRenderer.invoke("creacionExWindow"),
  mainWindow: async () => await ipcRenderer.invoke("createWindow"),
  menuExamenesWindow: async () =>
    await ipcRenderer.invoke("menuExamenesWindow"),
  loginWindow: async () => await ipcRenderer.invoke("loginWindow"),
  PDFWindow: async () => await ipcRenderer.invoke("examenPDFWindow"),
});

contextBridge.exposeInMainWorld("urlsv", "http://localhost:3000");

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

contextBridge.exposeInMainWorld("ticket", {
  store: async (producto) => {
    const result = await ipcRenderer.send("setTicketProducto", producto);
    console.log("🚀 ~ file: preload.js:21 ~ login: ~ result:", result);
    return result;
  },
  getStore: async (key) => await ipcRenderer.invoke("getTicketProducto", key),
  storeExistencia: async (existencia) => {
    const result = await ipcRenderer.send("setExistencia", existencia);
    console.log("🚀 ~ file: preload.js:21 ~ login: ~ result:", result);
    return result;
  },
  getExistencia: async () => await ipcRenderer.invoke("getExistencia"),
});

contextBridge.exposeInMainWorld("alerta", {
  alert: async (titulo, body) => {
    const result = await ipcRenderer.invoke("alertWindow", { titulo, body });
    console.log("🚀 ~ file: preload.js:29 ~ alert: ~ result:", result);
    return result;
  },

  error: async () => {
    const result = await ipcRenderer.invoke("errorWindow");
    console.log("🚀 ~ file: preload.js:44 ~ error: ~ result:", result);
    return result;
  },
});

contextBridge.exposeInMainWorld(
  "imprimirPDF",
  async () => await ipcRenderer.send("print", JSON.stringify())
);
