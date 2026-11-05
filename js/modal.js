(function () {
  var YM = 113894003, REF = "fastgame777.xyz/9M8hLa";
  function goal(name) { if (window.ym) try { ym(YM, "reachGoal", name); } catch (e) {} }

  var shown = 0, timer = null, started = Date.now();
  function isOpen(modal) { return modal.classList.contains("is-open"); }
  function openModal(modal) {
    if (isOpen(modal)) return;
    if (modal.id === "lb-bonus-modal") { if (shown >= 3) return; shown++; goal("bait_show"); }
    modal.classList.add("is-open");
  }
  function closeModal(modal) {
    if (!isOpen(modal)) return;
    modal.classList.remove("is-open");
    // повтор окна с бонусом: через 60 с, потом через 150 с, не больше трёх показов
    if (modal.id === "lb-bonus-modal" && shown < 3) {
      clearTimeout(timer);
      timer = setTimeout(function () { openModal(modal); }, shown < 2 ? 60000 : 150000);
    }
  }

  document.querySelectorAll("[data-lb-modal]").forEach(function (modal) {
    modal.querySelectorAll("[data-lb-modal-close]").forEach(function (el) {
      el.addEventListener("click", function () { closeModal(modal); });
    });
  });

  document.querySelectorAll("[data-lb-modal-open]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var modal = document.getElementById(btn.getAttribute("data-lb-modal-open"));
      if (modal) openModal(modal);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") document.querySelectorAll(".lb-modal.is-open").forEach(closeModal);
  });

  var auto = document.getElementById("lb-bonus-modal");
  if (auto && auto.getAttribute("data-lb-modal-auto") !== "off") {
    setTimeout(function () { openModal(auto); }, 5000);
    // вернулся на вкладку (например, после перехода в казино) — напомнить про бонус
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible" && Date.now() - started > 20000 && shown < 3) {
        setTimeout(function () { openModal(auto); }, 900);
      }
    });
  }

  // цели Метрики на переходы по реф-ссылке
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.href.indexOf(REF) < 0) return;
    goal(a.closest(".lb-modal") ? "bait_click" : a.closest(".lb-stick") ? "stick_click" : "ref_click");
  }, true);

  // нижняя кнопка на телефоне, появляется после первого экрана
  var st = document.createElement("style");
  st.textContent = ".lb-stick{position:fixed;left:12px;right:12px;bottom:12px;z-index:900;display:flex;align-items:center;gap:12px;padding:10px 10px 10px 16px;border-radius:16px;background:#06060C;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:transform .25s ease,opacity .25s ease}"
    + ".lb-stick[hidden]{display:flex!important;transform:translateY(140%);opacity:0;pointer-events:none}"
    + ".lb-stick__txt{flex:1;color:#fff;font-size:14px;font-weight:700;line-height:1.25}.lb-stick__txt span{display:block;color:#9BB8E8;font-weight:500;font-size:12px}"
    + ".lb-stick__btn{flex:none;display:inline-flex;align-items:center;height:44px;padding:0 20px;border-radius:12px;background:#2589FF;color:#fff;font-weight:700;font-size:15px;text-decoration:none}"
    + "@media(min-width:900px){.lb-stick{display:none!important}}";
  document.head.appendChild(st);
  var bar = document.createElement("div");
  bar.className = "lb-stick"; bar.hidden = true;
  bar.innerHTML = '<div class="lb-stick__txt">+360% и 250 FS<span>Бонус новым игрокам Lucky Bear</span></div>'
    + '<a class="lb-stick__btn" href="https://' + REF + '" target="_blank" rel="noopener">Играть</a>';
  document.body.appendChild(bar);
  function onScroll() { bar.hidden = window.scrollY < window.innerHeight * 0.8; }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  window.lbOpenModal = function (id) {
    var modal = document.getElementById(id);
    if (modal) openModal(modal);
  };
})();
