(function () {
  function closeModal(modal) { modal.classList.remove("is-open"); }
  function openModal(modal) { modal.classList.add("is-open"); }

  document.querySelectorAll("[data-lb-modal]").forEach(function (modal) {
    modal.querySelectorAll("[data-lb-modal-close]").forEach(function (el) {
      el.addEventListener("click", function () { closeModal(modal); });
    });
  });

  document.querySelectorAll("[data-lb-modal-open]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var id = btn.getAttribute("data-lb-modal-open");
      var modal = document.getElementById(id);
      if (modal) openModal(modal);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".lb-modal.is-open").forEach(closeModal);
    }
  });

  var auto = document.getElementById("lb-bonus-modal");
  if (auto && auto.getAttribute("data-lb-modal-auto") !== "off") {
    setTimeout(function () { openModal(auto); }, 5000);
  }

  window.lbOpenModal = function (id) {
    var modal = document.getElementById(id);
    if (modal) openModal(modal);
  };
})();
