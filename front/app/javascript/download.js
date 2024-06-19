const { ipcRenderer } = require("electron");


ipcRenderer.on("conf", (e, arg) => {

    document.querySelector('#mensaje').innerHTML = 'Descargando... La aplicacion se reiniciara al finalizar'
    document.querySelector('#show-progressbar').setAttribute('disabled', 'true')
});

ipcRenderer.on("descarga-finalizada", (e, arg) => {

    document.querySelector('#mensaje').innerHTML = arg.mensaje
});
ipcRenderer.on("updater-error", (e, arg) => {

    document.querySelector('#mensaje').innerHTML = arg.mensaje
    document.querySelector('#show-progressbar').removeAttribute('disabled')
});


ipcRenderer.on('progreso', (event, progress) => {
    // Actualizar el valor de la barra de progreso en la ventana downloadWindow
    // utilizando la biblioteca que estás utilizando para la barra de progreso
});



document
    .querySelector("#show-progressbar")
    .addEventListener("click", function () {
        ipcRenderer.send("comenzar-descarga");
    });