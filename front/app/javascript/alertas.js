const alertaCedula = document.getElementById("alertaCedula");
const cedulaAlerta = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div id="alertCedulaDiv" class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertaCedula.append(wrapper);
  setTimeout(() => new bootstrap.Alert("#alertCedulaDiv").close(), 6000);
};
