const alertaCedula = document.getElementById("alertaCedula");
const cedulaAlerta = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div id="alertCedulaDiv" class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");
  if (alertaCedula.children.length == 0) {
    alertaCedula.append(wrapper);
    setTimeout(() => {
      new bootstrap.Alert("#alertCedulaDiv").close();
      alertaCedula.removeChild(alertaCedula.firstChild);
      return;
    }, 6000);
  }
};
const alertaCedula2 = document.getElementById("alertaCedula2");
const cedulaAlerta2 = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div id="alertCedulaDiv2" class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");
  if (alertaCedula2.children.length == 0) {
    alertaCedula2.append(wrapper);
    setTimeout(() => {
      new bootstrap.Alert("#alertCedulaDiv2").close();
      alertaCedula2.removeChild(alertaCedula2.firstChild);
      return;
    }, 6000);
  }
};

const alertaExamenesCreacion = document.getElementById(
  "alertaExamenesCreacion"
);
const examenesAlerta = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div id="alertaExamenesCreacionDiv" class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");
  if (alertaExamenesCreacion.children.length == 0) {
    alertaExamenesCreacion.append(wrapper);
    setTimeout(() => {
      new bootstrap.Alert("#alertaExamenesCreacionDiv").close();
      alertaExamenesCreacion.removeChild(alertaExamenesCreacion.firstChild);
      return;
    }, 6000);
  }
};

const creacionUsuarioAlerta = document.getElementById(
  "creacionUsuarioAlerta"
);
const usuariosAlerta = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div id="creacionUsuarioAlertaDiv" class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message.toUpperCase()}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");
  if (creacionUsuarioAlerta.children.length == 0) {
    creacionUsuarioAlerta.append(wrapper);
    setTimeout(() => {
      new bootstrap.Alert("#creacionUsuarioAlertaDiv").close();
      creacionUsuarioAlerta.removeChild(creacionUsuarioAlerta.firstChild);
      return;
    }, 6000);
  }
};

const PDFAlerta = document.getElementById(
  "PDFAlerta"
);
const whatsappAlerta = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div id="PDFAlertaDiv" class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message.toUpperCase()}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");
  if (PDFAlerta.children.length == 0) {
    PDFAlerta.append(wrapper);
    setTimeout(() => {
      new bootstrap.Alert("#PDFAlertaDiv").close();
      PDFAlerta.removeChild(PDFAlerta.firstChild);
      return;
    }, 6000);
  }
};
