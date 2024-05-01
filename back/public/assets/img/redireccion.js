const cookies = document.cookie;

const getCookieValue = (name) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

function redireccion(url) {
  window.location.href = `http://localhost:3000/${url}`;
}

function displayName() {
  document.getElementById("h1User").innerText =
    "Hola " + getCookieValue("username").replace(/%20|\+/g, " ");
}
