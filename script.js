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


document.addEventListener("DOMContentLoaded", () => {

  const spaImages = [
    "LaVidRitualSpa/foto.webp",
    "LaVidRitualSpa/foto2.webp",
    "LaVidRitualSpa/foto3.webp",
    "LaVidRitualSpa/foto4.webp",
    "LaVidRitualSpa/foto5.webp"
  ];

  const spaCurrent = document.querySelector("#spa .spa-slide-current");
  const spaNext = document.querySelector("#spa .spa-slide-next");
  const spaDots = document.querySelectorAll("#spaDots span");

  let spaIndex = 0;

  if (!spaCurrent || !spaNext) return;

  spaCurrent.style.backgroundImage =
    `url("${spaImages[0]}")`;

  function showSpa(index) {

    spaIndex = (index + spaImages.length) % spaImages.length;

    spaNext.style.backgroundImage =
      `url("${spaImages[spaIndex]}")`;

    spaDots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === spaIndex);
    });

    spaNext.style.opacity = "1";
    spaNext.style.transform = "scale(1.04)";


    setTimeout(() => {

      spaCurrent.style.backgroundImage =
        `url("${spaImages[spaIndex]}")`;

      spaCurrent.style.opacity = "1";
      spaCurrent.style.transform = "scale(1)";

      spaNext.style.opacity = "0";
      spaNext.style.transform = "scale(1)";

    }, 1200);
  }

  setInterval(() => {
    showSpa(spaIndex + 1);
  }, 5000);

});

/* =========================================================
   LOTES - CAMBIO DE INFORMACIÓN E IMÁGENES
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     DATOS DE LOS LOTES
  ======================================================= */

  const lotsData = {

    "lot-20": {

      name: "Lote 20",
      block: "Manzana 16",

      land: "527.40 m²",
      construction: "384.13 m²",

      bedrooms: "3 Recámaras",
      halfBath: "1 Medio Baño",
      bathrooms: "3 Baños Completos",
      terraces: "3 Terrazas Privadas",
      poolTerrace: "Terraza con Alberca",
      pool: "Alberca",

      plan:
        "./lotes/lote20mazana16/plano.webp",

      front:
        "./lotes/lote20mazana16/casa_lote20_terraza.webp",

      interior:
        "./lotes/lote20mazana16/casa_lote20_sala.webp"

    },


    "lot-3": {

      name: "Lote 3",
      block: "Manzana 05",

      land: "503.65 m²",
      construction: "298.06 m²",

      bedrooms: "3 Recámaras",
      halfBath: "2 Medio Baño",
      bathrooms: "3 Baños Completos",
      terraces: "Sala de Juegos",
      poolTerrace: "Terraza con Vista",
      pool: "Alberca",

      plan:
        "./lotes/lote3manzana05/plano_lote3.webp",

      front:
        "./lotes/lote3manzana05/casa_lote3_frontal_lateral.webp",

      interior:
        "./lotes/lote3manzana05/casa_lote3_recamara.webp"

    },


    "lot-13": {

      name: "Lote 13",
      block: "Manzana 07",

      land: "600.00 m²",
      construction: "335.80 m²",

      bedrooms: "3 Recámaras",
      halfBath: "1 Medio Baño",
      bathrooms: "3 Baños Completos",
      terraces: "2 Terrazas Privadas",
      poolTerrace: "Sala de Juegos",
      pool: "Alberca",

      plan:
        "./lotes/lote13manzana07/plano1.webp",

      front:
        "./lotes/lote13manzana07/casa_lote13_ingreso.webp",
      

      interior:
        "./lotes/lote13manzana07/casa_lote13_estancia.webp"

    },


    "lot-5a": {

      name: "Lote 5A",
      block: "Manzana 05",

      land: "524.17 m²",
      construction: "268.94 m²",

      bedrooms: "3 Recámaras",
      halfBath: "1 Medio Baño",
      bathrooms: "3 Baños Completos",
      terraces: "Balcon Perimetral",
      poolTerrace: "Terraza con Vista",
      pool: "Carril de Nado",

      plan:
        "./lotes/lote5amanzana05/plano2.webp",

      front:
        "./lotes/lote5amanzana05/casa_lote5a_posterior.webp",

      interior:
        "./lotes/lote5amanzana05/casa_lote5a_sala.webp"

    },


    "lot-4": {

      name: "Lote 4",
      block: "Manzana 07",

      land: "600.00 m²",
      construction: "294.20 m²",

      bedrooms: "3 Recámaras",
      halfBath: "1 Medio Baño",
      bathrooms: "4 Baños Completos",
      terraces: "Sala de juegos",
      poolTerrace: "Terraza con Vista",
      pool: "Roof Top",

      plan:
        "./lotes/lote4manzana07/plano3.webp",

      front:
        "./lotes/lote4manzana07/casa_lote4_frontal.webp",

      interior:
        "./lotes/lote4manzana07/casa_lote4_sala.webp"

    }

  };


  /* =======================================================
     ELEMENTOS HTML
  ======================================================= */

  const buttons =
    document.querySelectorAll(".lot-tab");

  const lotName =
    document.getElementById("lot-name");

  const lotBlock =
    document.getElementById("lot-block");

  const lotLand =
    document.getElementById("lot-land");

  const lotConstruction =
    document.getElementById("lot-construction");

  const lotBedrooms =
    document.getElementById("lot-bedrooms");

  const lotHalfBath =
    document.getElementById("lot-half-bath");

  const lotBathrooms =
    document.getElementById("lot-bathrooms");

  const lotTerraces =
    document.getElementById("lot-terraces");

  const lotPoolTerrace =
    document.getElementById("lot-pool-terrace");

  const lotPool =
    document.getElementById("lot-pool");

  const lotPlanImage =
    document.getElementById("lot-plan-image");

  const lotFrontImage =
    document.getElementById("lot-front-image");

  const lotInteriorImage =
    document.getElementById("lot-interior-image");


  /* =======================================================
     CAMBIAR LOTE
  ======================================================= */

  function changeLot(lotId) {

    const lot = lotsData[lotId];

    if (!lot) {
      console.warn("No existe información para:", lotId);
      return;
    }


    /* =====================================================
       ACTIVAR BOTÓN
    ===================================================== */

    buttons.forEach(button => {

      const isActive =
        button.dataset.lot === lotId;

      button.classList.toggle(
        "is-active",
        isActive
      );

      button.setAttribute(
        "aria-selected",
        isActive ? "true" : "false"
      );

      /* Cambiar + por − */

      const symbol =
        button.querySelector("b");

      if (symbol) {
        symbol.textContent =
          isActive ? "−" : "+";
      }

    });


    /* =====================================================
       CAMBIAR INFORMACIÓN
    ===================================================== */

    lotName.textContent =
      lot.name;

    lotBlock.textContent =
      lot.block;

    lotLand.textContent =
      lot.land;

    lotConstruction.textContent =
      lot.construction;

    lotBedrooms.textContent =
      lot.bedrooms;

    lotHalfBath.textContent =
      lot.halfBath;

    lotBathrooms.textContent =
      lot.bathrooms;

    lotTerraces.textContent =
      lot.terraces;

    lotPoolTerrace.textContent =
      lot.poolTerrace;

    lotPool.textContent =
      lot.pool;


    /* =====================================================
       CAMBIAR IMÁGENES
    ===================================================== */

    changeImage(
      lotPlanImage,
      lot.plan
    );

    changeImage(
      lotFrontImage,
      lot.front
    );

    changeImage(
      lotInteriorImage,
      lot.interior
    );

  }


  /* =======================================================
     TRANSICIÓN DE IMAGEN
  ======================================================= */

  function changeImage(imageElement, newSource) {

    if (!imageElement) {
      return;
    }


    imageElement.style.opacity = "0";


    setTimeout(() => {

      imageElement.src =
        newSource;

      imageElement.onload = () => {

        imageElement.style.opacity = "1";

      };

    }, 180);

  }


  /* =======================================================
     EVENTOS DE LOS BOTONES
  ======================================================= */

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const lotId =
        button.dataset.lot;

      changeLot(lotId);

    });

  });


  /* =======================================================
     LOTE INICIAL
  ======================================================= */

  const initialButton =
    document.querySelector(
      ".lot-tab.is-active"
    );

  if (initialButton) {

    changeLot(
      initialButton.dataset.lot
    );

  }

});