(function () {
  "use strict";
  const forms = document.querySelectorAll(".requires-validation");
  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        agregarPaciente(event);
        if (!form.checkValidity()) {
          event.stopPropagation();
        } else {
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();
