/* ==========================================================
   RANCHO LA CAÑADA — scripts
   ----------------------------------------------------------
   ÍNDICE
   01. Utilidades
   02. Datos (imágenes y lotes)
   03. Header: animación de carga, ocultar al bajar, estado "arriba"
   04. Contadores de "El desarrollo"
   05. Hero: carrusel de fondo
   06. Spa: carrusel de fondo
   07. Lotes: cambio de información e imágenes
   08. Amenidades: carrusel con crossfade

   Todo vive dentro de una función para no crear variables
   globales, y cada módulo se apaga solo si su HTML no existe
   (antes, si faltaba #siteHeader, dejaban de correr los contadores).
   ========================================================== */
(function () {
  "use strict";


  /* ==========================================================
     01. UTILIDADES
     ========================================================== */

  /* Ejecuta fn cuando el DOM está listo (funciona aunque el script cargue tarde) */
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  /* Descarga las imágenes en segundo plano para que el cambio no muestre huecos */
  var whenIdle = window.requestIdleCallback || function (fn) { setTimeout(fn, 1500); };

  function preload(urls) {
    whenIdle(function () {
      urls.forEach(function (url) { new Image().src = url; });
    });
  }

  /* Marca el punto activo de un grupo de indicadores */
  function setActiveDot(dots, index, className) {
    dots.forEach(function (dot, i) {
      dot.classList.toggle(className, i === index);
    });
  }


  /* ==========================================================
     02. DATOS
     ========================================================== */

  var HERO_IMAGES = [
    "/carrcucel/1.webp",
    "/carrcucel/2.webp",
    "/carrcucel/3.webp",
    "/carrcucel/4.webp",
    "/carrcucel/5.webp"
  ];

  var SPA_IMAGES = [
    "LaVidRitualSpa/foto.webp",
    "LaVidRitualSpa/foto2.webp",
    "LaVidRitualSpa/foto3.webp",
    "LaVidRitualSpa/foto4.webp",
    "LaVidRitualSpa/foto5.webp"
  ];

  var AMENITY_IMAGES = [
    "./amenidades/1.webp",
    "./amenidades/2.webp",
    "./amenidades/3.webp",
    "./amenidades/4.webp",
    "./amenidades/5.webp"
  ];

  /* Cada lote: textos + 3 imágenes. La clave coincide con data-lot del botón. */
  var LOTS = {
    "lot-20": {
      name: "Lote 20", block: "Manzana 16",
      land: "527.40 m²", construction: "384.13 m²",
      bedrooms: "3 Recámaras", halfBath: "1 Medio Baño", bathrooms: "3 Baños Completos",
      terraces: "3 Terrazas Privadas", poolTerrace: "Terraza con Alberca", pool: "Alberca",
      plan: "./lotes/lote20mazana16/plano.webp",
      front: "./lotes/lote20mazana16/casa_lote20_terraza.webp",
      interior: "./lotes/lote20mazana16/casa_lote20_sala.webp"
    },
    "lot-3": {
      name: "Lote 3", block: "Manzana 05",
      land: "503.65 m²", construction: "298.06 m²",
      bedrooms: "3 Recámaras", halfBath: "2 Medio Baño", bathrooms: "3 Baños Completos",
      terraces: "Sala de Juegos", poolTerrace: "Terraza con Vista", pool: "Alberca",
      plan: "./lotes/lote3manzana05/plano_lote3.webp",
      front: "./lotes/lote3manzana05/casa_lote3_frontal_lateral.webp",
      interior: "./lotes/lote3manzana05/casa_lote3_recamara.webp"
    },
    "lot-13": {
      name: "Lote 13", block: "Manzana 07",
      land: "600.00 m²", construction: "335.80 m²",
      bedrooms: "3 Recámaras", halfBath: "1 Medio Baño", bathrooms: "3 Baños Completos",
      terraces: "2 Terrazas Privadas", poolTerrace: "Sala de Juegos", pool: "Alberca",
      plan: "./lotes/lote13manzana07/plano1.webp",
      front: "./lotes/lote13manzana07/casa_lote13_ingreso.webp",
      interior: "./lotes/lote13manzana07/casa_lote13_estancia.webp"
    },
    "lot-5a": {
      name: "Lote 5A", block: "Manzana 05",
      land: "524.17 m²", construction: "268.94 m²",
      bedrooms: "3 Recámaras", halfBath: "1 Medio Baño", bathrooms: "3 Baños Completos",
      terraces: "Balcon Perimetral", poolTerrace: "Terraza con Vista", pool: "Carril de Nado",
      plan: "./lotes/lote5amanzana05/plano2.webp",
      front: "./lotes/lote5amanzana05/casa_lote5a_posterior.webp",
      interior: "./lotes/lote5amanzana05/casa_lote5a_sala.webp"
    },
    "lot-4": {
      name: "Lote 4", block: "Manzana 07",
      land: "600.00 m²", construction: "294.20 m²",
      bedrooms: "3 Recámaras", halfBath: "1 Medio Baño", bathrooms: "4 Baños Completos",
      terraces: "Sala de juegos", poolTerrace: "Terraza con Vista", pool: "Roof Top",
      plan: "./lotes/lote4manzana07/plano3.webp",
      front: "./lotes/lote4manzana07/casa_lote4_frontal.webp",
      interior: "./lotes/lote4manzana07/casa_lote4_sala.webp"
    }
  };

  /* id del elemento HTML → campo del lote que va dentro */
  var LOT_TEXT_FIELDS = {
    "lot-name": "name",
    "lot-block": "block",
    "lot-land": "land",
    "lot-construction": "construction",
    "lot-bedrooms": "bedrooms",
    "lot-half-bath": "halfBath",
    "lot-bathrooms": "bathrooms",
    "lot-terraces": "terraces",
    "lot-pool-terrace": "poolTerrace",
    "lot-pool": "pool"
  };

  var LOT_IMAGE_FIELDS = {
    "lot-plan-image": "plan",
    "lot-front-image": "front",
    "lot-interior-image": "interior"
  };


  /* ==========================================================
     03. HEADER
     ========================================================== */

  /* La línea bajo el logo se dibuja cuando termina de cargar la página */
  function initHeaderIntro() {
    var rule = document.querySelector(".header-rule");
    if (!rule) return;

    function start() {
      setTimeout(function () {
        document.body.classList.add("page-loaded");
        setTimeout(function () { rule.classList.add("line-finished"); }, 1100);
      }, 150);
    }

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start);
    }
  }

  /* Baja → se esconde. Sube → aparece. Arriba del todo → clase .at-top (transparente) */
  function initHeader() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    var HIDE_AFTER = 100;   // px: antes de esto el header nunca se esconde
    var TOP_LIMIT = 10;     // px: por debajo se considera "arriba del todo"
    var lastY = window.scrollY;
    var ticking = false;

    function update() {
      var y = window.scrollY;

      header.classList.toggle("at-top", y <= TOP_LIMIT);

      if (y <= HIDE_AFTER) {
        header.classList.remove("header-hidden");
      } else if (y > lastY) {
        header.classList.add("header-hidden");      // bajando
      } else if (y < lastY) {
        header.classList.remove("header-hidden");   // subiendo
      }

      lastY = y;
      ticking = false;
    }

    /* Un solo listener, limitado a un cuadro de animación */
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  }


  /* ==========================================================
     04. CONTADORES — EL DESARROLLO
     Lee data-target, data-prefix y data-suffix de cada .stat-num
     ========================================================== */
  function initCounters() {
    var row = document.getElementById("statRow");
    if (!row) return;

    var counters = row.querySelectorAll(".stat-num");
    var DURATION = 1800;

    function animate(el) {
      if (el.dataset.animated === "true") return;

      var target = parseFloat(el.getAttribute("data-target"));
      if (isNaN(target)) return;

      el.dataset.animated = "true";

      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";
      var startTime = null;

      function step(timestamp) {
        if (startTime === null) startTime = timestamp;

        var progress = Math.min((timestamp - startTime) / DURATION, 1);
        var eased = 1 - Math.pow(1 - progress, 3);   // ease-out: empieza rápido, termina suave

        if (progress < 1) {
          el.textContent = prefix + Math.floor(eased * target) + suffix;
          window.requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target + suffix;
        }
      }

      window.requestAnimationFrame(step);
    }

    function runAll() {
      counters.forEach(animate);
    }

    /* Navegadores sin IntersectionObserver: se animan de inmediato */
    if (!("IntersectionObserver" in window)) {
      runAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) {
        runAll();
        observer.disconnect();
      }
    }, { threshold: 0.35 });

    observer.observe(row);
  }


  /* ==========================================================
     05. HERO — carrusel de fondo
     #heroBg (imagen actual) + #heroBgNext (la que entra).
     El CSS hace el fundido con la clase .is-transitioning.
     ========================================================== */
  function initHeroCarousel() {
    var bg = document.getElementById("heroBg");
    var next = document.getElementById("heroBgNext");
    if (!bg || !next) return;

    var dots = document.querySelectorAll("#heroDots span");
    var prevBtn = document.querySelector(".hero-arrow-prev");
    var nextBtn = document.querySelector(".hero-arrow-next");

    var FADE_MS = 1250;       // un poco más que la transición del CSS (1.2s)
    var AUTOPLAY_MS = 5000;
    var index = 0;
    var timer = null;
    var busy = false;

    function setImage(el, i) {
      el.style.backgroundImage = 'url("' + HERO_IMAGES[i] + '")';
    }

    function show(i) {
      if (busy) return;
      busy = true;

      index = (i + HERO_IMAGES.length) % HERO_IMAGES.length;

      setImage(next, index);
      setActiveDot(dots, index, "is-active");

      /* Empieza el fundido */
      requestAnimationFrame(function () {
        bg.classList.add("is-transitioning");
        next.classList.add("is-transitioning");
      });

      /* Al terminar, la nueva pasa a ser la actual */
      setTimeout(function () {
        setImage(bg, index);
        bg.classList.remove("is-transitioning");
        next.classList.remove("is-transitioning");
        busy = false;
      }, FADE_MS);
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { show(index + 1); }, AUTOPLAY_MS);
    }

    function goTo(i) {
      show(i);
      restart();
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(index - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(index + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { goTo(i); });
    });

    preload(HERO_IMAGES);
    setImage(bg, 0);
    setActiveDot(dots, 0, "is-active");
    restart();
  }


  /* ==========================================================
     06. SPA — carrusel de fondo
     .spa-slide-current (actual) + .spa-slide-next (entra por encima)
     ========================================================== */
  function initSpaCarousel() {
    var current = document.querySelector("#spa .spa-slide-current");
    var next = document.querySelector("#spa .spa-slide-next");
    if (!current || !next) return;

    var dots = document.querySelectorAll("#spaDots span");
    var FADE_MS = 1200;
    var AUTOPLAY_MS = 5000;
    var index = 0;

    function setImage(el, i) {
      el.style.backgroundImage = 'url("' + SPA_IMAGES[i] + '")';
    }

    function show(i) {
      index = (i + SPA_IMAGES.length) % SPA_IMAGES.length;

      setImage(next, index);
      setActiveDot(dots, index, "is-active");

      next.style.opacity = "1";
      next.style.transform = "scale(1.04)";

      setTimeout(function () {
        setImage(current, index);
        next.style.opacity = "0";
        next.style.transform = "scale(1)";
      }, FADE_MS);
    }

    preload(SPA_IMAGES);
    setImage(current, 0);
    setActiveDot(dots, 0, "is-active");

    setInterval(function () { show(index + 1); }, AUTOPLAY_MS);
  }


  /* ==========================================================
     07. LOTES
     Botones .lot-tab (data-lot="lot-20"…) → cambian textos e imágenes
     ========================================================== */
  function initLots() {
    var buttons = document.querySelectorAll(".lot-tab");
    if (!buttons.length) return;

    /* Cambia una imagen con fundido. Si la imagen ya es esa, no hace nada. */
    function swapImage(img, src) {
      if (!img) return;

      if (img.src === new URL(src, document.baseURI).href) {
        img.style.opacity = "1";
        return;
      }

      /* Token: si el usuario cambia de lote muy rápido, solo cuenta el último clic */
      var token = String((Number(img.dataset.swap) || 0) + 1);
      img.dataset.swap = token;

      img.style.opacity = "0";

      setTimeout(function () {
        if (img.dataset.swap !== token) return;

        img.onload = img.onerror = function () {
          if (img.dataset.swap === token) img.style.opacity = "1";
        };
        img.src = src;
      }, 180);
    }

    function changeLot(lotId) {
      var lot = LOTS[lotId];
      if (!lot) {
        console.warn("No existe información para:", lotId);
        return;
      }

      /* Botón activo (+ se vuelve −) */
      buttons.forEach(function (button) {
        var isActive = button.dataset.lot === lotId;
        var symbol = button.querySelector("b");

        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
        if (symbol) symbol.textContent = isActive ? "−" : "+";
      });

      /* Textos */
      Object.keys(LOT_TEXT_FIELDS).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = lot[LOT_TEXT_FIELDS[id]];
      });

      /* Imágenes */
      Object.keys(LOT_IMAGE_FIELDS).forEach(function (id) {
        swapImage(document.getElementById(id), lot[LOT_IMAGE_FIELDS[id]]);
      });
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () { changeLot(button.dataset.lot); });
    });

    /* Lote inicial: el botón que venga con .is-active en el HTML */
    var initial = document.querySelector(".lot-tab.is-active");
    if (initial) changeLot(initial.dataset.lot);
  }


  /* ==========================================================
     08. AMENIDADES — carrusel con crossfade
     Hay 3 .carousel-slide (izquierda, centro, derecha). Cada uno
     tiene su <img> y, al cambiar, se crea una segunda <img>
     (.carousel-crossfade-img) que aparece por encima.
     ========================================================== */
  function initAmenitiesCarousel() {
    var root = document.querySelector(".amenities-carousel");
    if (!root) return;

    var imgs = root.querySelectorAll(".carousel-slide img");
    var dots = root.querySelectorAll(".carousel-dot");
    var prevBtn = root.querySelector(".carousel-btn-prev");
    var nextBtn = root.querySelector(".carousel-btn-next");

    var FADE_MS = 800;        // un poco más que la transición del CSS (.75s)
    var AUTOPLAY_MS = 9000;
    var index = 0;
    var timer = null;

    /* Cuando termina el fundido, la <img> original toma la nueva foto SIN
       transición (si no, se ve un parpadeo al cruzarse dos opacidades). */
    function commit(img, overlay, src) {
      img.style.transition = "none";
      overlay.style.transition = "none";

      img.src = src;
      img.classList.remove("carousel-crossfade-hide");
      overlay.classList.remove("carousel-crossfade-show");

      void img.offsetWidth;   // fuerza a aplicar los cambios antes de reactivar transiciones

      img.style.transition = "";
      overlay.style.transition = "";
    }

    function crossfade(img, src) {
      var slide = img.closest(".carousel-slide");
      if (!slide) return;

      var overlay = slide.querySelector(".carousel-crossfade-img");
      if (!overlay) {
        overlay = document.createElement("img");
        overlay.className = "carousel-crossfade-img";
        overlay.alt = img.alt;
        slide.appendChild(overlay);
      }

      /* Token: si llega otro cambio antes de terminar, se ignora el anterior */
      var token = String((Number(slide.dataset.fade) || 0) + 1);
      slide.dataset.fade = token;

      overlay.classList.remove("carousel-crossfade-show");
      img.classList.remove("carousel-crossfade-hide");

      /* Se espera a que la nueva imagen cargue para no mostrar un hueco */
      overlay.onload = function () {
        if (slide.dataset.fade !== token) return;

        requestAnimationFrame(function () {
          overlay.classList.add("carousel-crossfade-show");
          img.classList.add("carousel-crossfade-hide");
        });

        setTimeout(function () {
          if (slide.dataset.fade === token) commit(img, overlay, src);
        }, FADE_MS);
      };
      overlay.src = src;
    }

    function update() {
      var total = AMENITY_IMAGES.length;
      var visible = [
        (index - 1 + total) % total,   // izquierda
        index,                         // centro
        (index + 1) % total            // derecha
      ];

      imgs.forEach(function (img, i) {
        if (visible[i] !== undefined) crossfade(img, AMENITY_IMAGES[visible[i]]);
      });

      setActiveDot(dots, index, "active");
    }

    function goTo(i) {
      index = (i + AMENITY_IMAGES.length) % AMENITY_IMAGES.length;
      update();
    }

    function startAutoplay() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(index + 1); }, AUTOPLAY_MS);
    }

    function stopAutoplay() {
      clearInterval(timer);
    }

    function manual(i) {
      goTo(i);
      startAutoplay();
    }

    if (nextBtn) nextBtn.addEventListener("click", function () { manual(index + 1); });
    if (prevBtn) prevBtn.addEventListener("click", function () { manual(index - 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { manual(i); });
    });

    /* Pausa mientras el mouse está encima */
    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);

    preload(AMENITY_IMAGES);
    update();
    startAutoplay();
  }


  /* ==========================================================
     ARRANQUE
     ========================================================== */
  ready(function () {
    initHeaderIntro();
    initHeader();
    initCounters();
    initHeroCarousel();
    initSpaCarousel();
    initLots();
    initAmenitiesCarousel();
  });

})();