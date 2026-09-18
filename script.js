(function () {

  "use strict";

  console.log("SCRIPT FUNCIONANDO");
/* ==========================
   ANIMACIÓN DE CARGA HEADER
========================== */

var headerRule = document.querySelector(".header-rule");

if (headerRule) {

  window.addEventListener("load", function () {

    setTimeout(function () {

      document.body.classList.add("page-loaded");

      setTimeout(function () {
        headerRule.classList.add("line-finished");
      }, 1100);

    }, 150);

  });

}
  /* ==========================
     HEADER
  ========================== */

  var header = document.getElementById("siteHeader");

  if (!header) {
    console.error("NO SE ENCONTRO #siteHeader");
    return;
  }

  console.log("HEADER ENCONTRADO", header);

  var lastScrollY = window.scrollY;
  var hideThreshold = 100;
  var ticking = false;

  function updateHeader() {

    var currentScrollY = window.scrollY;

    if (currentScrollY <= hideThreshold) {

      header.classList.remove("header-hidden");
      lastScrollY = currentScrollY;

      return;
    }

    if (currentScrollY > lastScrollY) {

      // Bajando
      header.classList.add("header-hidden");

    } else if (currentScrollY < lastScrollY) {

      // Subiendo
      header.classList.remove("header-hidden");

    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener(
    "scroll",
    function () {

      if (!ticking) {

        window.requestAnimationFrame(function () {

          updateHeader();

          ticking = false;

        });

        ticking = true;
      }

    },
    { passive: true }
  );
  
function updateHeaderTopState(){
  if(!header) return;

  if(window.scrollY <= 10){
    header.classList.add("at-top");
  }else{
    header.classList.remove("at-top");
  }
}

window.addEventListener("scroll", updateHeaderTopState);
updateHeaderTopState();

  /* ==========================
     CONTADORES - EL DESARROLLO
  ========================== */

  var statRow = document.getElementById("statRow");

  if (!statRow) {
    console.warn("NO SE ENCONTRO #statRow");
    return;
  }

  var counters = statRow.querySelectorAll(".stat-num");


  function animateCounter(element) {

    if (element.dataset.animated === "true") {
      return;
    }

    element.dataset.animated = "true";

    var target = parseFloat(
      element.getAttribute("data-target")
    );

    var prefix =
      element.getAttribute("data-prefix") || "";

    var suffix =
      element.getAttribute("data-suffix") || "";

    if (isNaN(target)) {
      return;
    }

    var duration = 1800;
    var startTime = null;


    function update(timestamp) {

      if (!startTime) {
        startTime = timestamp;
      }

      var progress =
        (timestamp - startTime) / duration;

      progress = Math.min(progress, 1);


      /*
       * Ease Out
       * Empieza rápido y termina suavemente.
       */
      var easedProgress =
        1 - Math.pow(1 - progress, 3);


      var current =
        Math.floor(easedProgress * target);


      element.textContent =
        prefix + current + suffix;


      if (progress < 1) {

        window.requestAnimationFrame(update);

      } else {

        element.textContent =
          prefix + target + suffix;

      }

    }


    window.requestAnimationFrame(update);
  }


  /* ==========================
     ACTIVAR CUANDO ENTRE EN PANTALLA
  ========================== */

  if ("IntersectionObserver" in window) {

    var statObserver = new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            counters.forEach(function (counter) {
              animateCounter(counter);
            });

            statObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.35
      }
    );

    statObserver.observe(statRow);

  } else {

    // Compatibilidad con navegadores antiguos
    counters.forEach(function (counter) {
      animateCounter(counter);
    });

  }


})();
const heroImages = [
  "/carrcucel/1.webp",
  "/carrcucel/2.webp",
  "/carrcucel/3.webp",
  "/carrcucel/4.webp",
  "/carrcucel/5.webp"
];

const heroBg = document.getElementById("heroBg");
const heroBgNext = document.getElementById("heroBgNext");

const heroDots = document.querySelectorAll("#heroDots span");

const heroPrev = document.querySelector(".hero-arrow-prev");
const heroNext = document.querySelector(".hero-arrow-next");

let heroIndex = 0;
let heroTimer = null;
let heroTransitioning = false;


/* =========================
   CAMBIAR IMAGEN
========================= */

function showHero(index){

  if(
    !heroBg ||
    !heroBgNext ||
    heroTransitioning
  ) return;

  heroTransitioning = true;

  heroIndex =
    (index + heroImages.length) %
    heroImages.length;


  /* Preparar siguiente imagen */
  heroBgNext.style.backgroundImage =
    `url("${heroImages[heroIndex]}")`;


  /* Actualizar indicador inmediatamente */
  heroDots.forEach((dot, i) => {

    dot.classList.toggle(
      "is-active",
      i === heroIndex
    );

  });


  /*
    Comienza el crossfade:
    la actual desaparece
    mientras la nueva aparece
  */
  requestAnimationFrame(() => {

    heroBg.classList.add("is-transitioning");
    heroBgNext.classList.add("is-transitioning");

  });


  /*
    Cuando termina la transición,
    convertimos la siguiente en la actual
  */
  setTimeout(() => {

    heroBg.style.backgroundImage =
      `url("${heroImages[heroIndex]}")`;

    heroBg.classList.remove("is-transitioning");
    heroBgNext.classList.remove("is-transitioning");

    heroTransitioning = false;

  }, 1250);

}


/* =========================
   CAMBIO AUTOMÁTICO
========================= */

function startHeroCarousel(){

  clearInterval(heroTimer);

  heroTimer = setInterval(() => {

    showHero(heroIndex + 1);

  }, 5000);

}


/* =========================
   FLECHA ANTERIOR
========================= */

if(heroPrev){

  heroPrev.addEventListener("click", () => {

    showHero(heroIndex - 1);

    startHeroCarousel();

  });

}


/* =========================
   FLECHA SIGUIENTE
========================= */

if(heroNext){

  heroNext.addEventListener("click", () => {

    showHero(heroIndex + 1);

    startHeroCarousel();

  });

}


/* =========================
   INDICADORES
========================= */

heroDots.forEach((dot, index) => {

  dot.addEventListener("click", () => {

    showHero(index);

    startHeroCarousel();

  });

});


/* =========================
   INICIAR
========================= */

if(heroBg && heroBgNext){

  heroBg.style.backgroundImage =
    `url("${heroImages[0]}")`;

  heroBgNext.style.backgroundImage =
    `url("${heroImages[1]}")`;

  heroDots.forEach((dot, i) => {

    dot.classList.toggle(
      "is-active",
      i === 0
    );

  });

  startHeroCarousel();

}
