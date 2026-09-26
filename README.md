# Rancho La Cañada — Landing Page

Landing page web desarrollada como una recreación técnica y visual del sitio de **Rancho La Cañada**, tomando como referencia la experiencia pública de [rancholacanada.com.mx](https://rancholacanada.com.mx/).

El proyecto transforma la estructura y propuesta comercial de la referencia en una implementación propia enfocada en **diseño responsive, interacción, animaciones, navegación fluida y presentación inmobiliaria premium**.

> **Nota:** Este repositorio corresponde a una implementación independiente para fines de desarrollo y demostración. No representa el sitio oficial de Rancho La Cañada ni de Grupo UDAI.

---

## ✨ Características principales

- Hero de pantalla completa con carrusel fotográfico.
- Transición **crossfade** entre imágenes para un cambio suave y contemporáneo.
- Controles de carrusel mediante flechas e indicadores.
- Cambio automático de imágenes.
- Navegación principal responsive.
- Header fijo con comportamiento dinámico al hacer scroll.
- Efecto de **glassmorphism verde botella** en el header.
- Navegación móvil mediante menú desplegable.
- Línea decorativa animada en el header.
- Secciones informativas organizadas por bloques.
- Estadísticas destacadas con animación.
- Sección **La Vid Ritual Spa** con carrusel propio.
- Masterplan visual.
- Selector interactivo de lotes.
- Información dinámica de diferentes lotes residenciales.
- Galería de imágenes por lote.
- Sección de experiencia y Grupo UDAI.
- Amenidades presentadas mediante elementos visuales.
- Carrusel de imágenes para SPA La Vid.
- Sección de ubicación y puntos de referencia.
- Formulario de contacto con validación.
- Integración de contacto mediante WhatsApp.
- Footer informativo.
- Botón flotante de WhatsApp.
- Soporte para navegación suave mediante **Lenis**.
- Diseño adaptable a desktop, tablet y dispositivos móviles.
- Uso de HTML semántico y atributos de accesibilidad.

---

## 🧩 Estructura del proyecto

```text
laca-adag/
│
├── index.html
├── style.css
├── script.js
│
├── carrcucel/
│   ├── 1.webp
│   ├── 2.webp
│   ├── 3.webp
│   ├── 4.webp
│   ├── 5.webp
│   ├── Logo.png
│   └── logob.webp
│
├── desarrollo/
├── LaVidRitualSpa/
├── masterplan/
├── lotes/
├── amenidades/
├── ubicacion/
├── contacto/
├── footer/
└── 12años/
```

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica y contenido |
| **CSS3** | Diseño, responsive design, transiciones y efectos visuales |
| **JavaScript** | Interacciones, carruseles, navegación y contenido dinámico |
| **Lenis** | Scroll suave |
| **Google Fonts** | Tipografía Montserrat |
| **WhatsApp** | Canal de contacto desde el formulario y CTA |

No se utiliza un framework frontend. La interfaz está construida con **HTML, CSS y JavaScript vanilla**, manteniendo control directo sobre la estructura, estilos y comportamiento.

---

## 🎞️ Carrusel principal

El Hero utiliza cinco fotografías y dos capas de fondo para realizar un **crossfade**.

En lugar de ocultar completamente una imagen antes de mostrar la siguiente, la siguiente fotografía se prepara en una segunda capa y ambas se mezclan mediante `opacity` y `transform`.

Esto permite una transición visual más orgánica:

```text
Imagen actual
████████████████████░░░░

Imagen siguiente
░░░░░░░░░░░░████████████
```

El carrusel puede controlarse mediante:

- Cambio automático.
- Flecha anterior.
- Flecha siguiente.
- Indicadores inferiores.
- Reinicio del temporizador después de una interacción manual.

Las imágenes también se precargan para reducir la posibilidad de mostrar espacios vacíos durante las transiciones.

---

## 🏡 Información dinámica de lotes

La sección de lotes utiliza un objeto de datos en JavaScript para mantener separada la información del contenido visual.

Cada lote contiene información como:

- Superficie del terreno.
- Metros de construcción.
- Número de recámaras.
- Baños.
- Terrazas.
- Características adicionales.
- Plano.
- Vista exterior.
- Imagen interior.

Actualmente se manejan diferentes lotes mediante un selector interactivo, evitando duplicar toda la estructura HTML para cada propiedad.

---

## 📱 Responsive Design

La interfaz adapta:

- Header y navegación.
- Hero.
- Carruseles.
- Estadísticas.
- Masterplan.
- Selector de lotes.
- Galerías.
- Formulario.
- Footer.

El objetivo es conservar la jerarquía visual y la experiencia de navegación tanto en pantallas grandes como en dispositivos móviles.

---

## 🎨 Dirección visual

La propuesta visual busca combinar:

- Arquitectura y naturaleza.
- Espacios amplios.
- Tipografía limpia.
- Fotografía como elemento principal.
- Tonos verdes asociados al entorno natural.
- Transparencias y glassmorphism.
- Animaciones discretas.
- Transiciones suaves.
- Jerarquía visual orientada a conversión.

El header utiliza un tono verde botella basado en **#064E3B**, acompañado de transparencia, blur y reflejos sutiles para mantener una sensación de cristal sin convertir la navegación en botones tradicionales.

---

## ♿ Accesibilidad y UX

Se incorporan elementos básicos de accesibilidad y experiencia de usuario:

- `alt` descriptivos en imágenes.
- `aria-label` en controles.
- `aria-expanded` para navegación móvil.
- `aria-controls` para relacionar controles y menú.
- `role="tablist"` y estados `aria-selected` en el selector de lotes.
- Enlace para saltar directamente al contenido principal.
- Formularios con labels.
- Estados visuales para elementos interactivos.

---

## 🚀 Ejecución local

No requiere un proceso de build.

Puede ejecutarse directamente con un servidor local, por ejemplo:

```bash
git clone https://github.com/miguelagcz/laca-adag.git
cd laca-adag
```

Después puede utilizarse cualquier servidor estático local.

Por ejemplo, con VS Code:

```text
Live Server
```

o con Python:

```bash
python3 -m http.server 5500
```

Y abrir:

```text
http://localhost:5500
```

---

## 📌 Referencia del proyecto

La referencia utilizada para analizar la estructura pública, contenido comercial y jerarquía de secciones es:

**Rancho La Cañada**  
https://rancholacanada.com.mx/

La implementación de este repositorio reorganiza y desarrolla la experiencia mediante una arquitectura propia de HTML, CSS y JavaScript.

---

## 👨‍💻 Autor

**Miguel Cruz**

Frontend Developer Jr. enfocado en:

- JavaScript
- React
- Next.js
- HTML
- CSS
- Tailwind CSS
- Responsive Web Design
- UI/UX
- Consumo de APIs
- Desarrollo de interfaces interactivas

GitHub: https://github.com/miguelagcz

---

## 📄 Licencia

Proyecto desarrollado con fines de demostración y portafolio.

Los nombres, marcas, fotografías y contenido comercial relacionados con Rancho La Cañada y Grupo UDAI pertenecen a sus respectivos propietarios.
