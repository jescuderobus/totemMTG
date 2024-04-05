const sectors = [
  { color: "#f82", label: "PELÍCULAS" },
  { color: "#0bf", label: "FRASES" },
  { color: "#fb0", label: "ESCENAS" }, // Trailers
  { color: "#0fb", label: "LIBROS" },
  { color: "#f82", label: "PELÍCULAS" },
  { color: "#b0f", label: "NEW♥YORK" }, // Paris, Londres
  { color: "GREEN", label: "PARTICIPA" },
  { color: "#f0b", label: "EXTRA" },
];

const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const spinEl = document.querySelector("#spin");
const ctx = document.querySelector("#wheel").getContext("2d");
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;

const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

function drawSector(sector, i) {
  const ang = arc * i;
  ctx.save();
  // COLOR
  ctx.beginPath();
  ctx.fillStyle = sector.color;
  ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad, ang, ang + arc);
  ctx.lineTo(rad, rad);
  ctx.fill();
  // TEXT
  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = "right";
  ctx.fillStyle = "#fff";
  ctx.font = "bold 1em sans-serif";
  ctx.fillText(sector.label, rad - 10, 10);
  //
  ctx.restore();
}

function rotate() {
  const sector = sectors[getIndex()];
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;
  spinEl.textContent = !angVel ? "⟳" : sector.label;
  spinEl.style.background = sector.color;
}

function frame_OLD() {
  if (!angVel) return;
  angVel *= friction; // Decrement velocity by friction
  if (angVel < 0.002) angVel = 0; // Bring to stop
  ang += angVel; // Update angle
  ang %= TAU; // Normalize angle
  rotate();
}

let alertMostrado = false; // Para asegurarse de que el alert se muestra solo una vez
let sectorSeleccionado = null; // Para almacenar el sector seleccionado cuando la rueda se detenga

function frame() {
  if (!angVel) return;
  angVel *= friction; // Decrement velocity by friction
  if (angVel < 0.002) {
    angVel = 0; // Bring to stop
    sectorSeleccionado = sectors[getIndex()]; // Almacenar el sector seleccionado
    // Si la rueda se detuvo y el alert aún no se ha mostrado
    if (!alertMostrado && sectorSeleccionado) {
      setTimeout(() => {
        finJugada(sectorSeleccionado.label);
        //alert(`La rueda ha elegido: ${sectorSeleccionado.label} con el color ${sectorSeleccionado.color}`);
        alertMostrado = true; // Asegurarse de que el alert se muestra solo una vez
        sectorSeleccionado = null; // Restablecer el sector seleccionado para la próxima jugada
      }, 2000); // Esperar 5 segundos para mostrar el alert
    }
  }
  ang += angVel; // Update angle
  ang %= TAU; // Normalize angle
  rotate();
}

function engine() {
  frame();
  requestAnimationFrame(engine);
}

function init() {
  sectors.forEach(drawSector);
  rotate(); // Initial rotation
  engine(); // Start engine
  spinEl.addEventListener("click", () => {
    if (!angVel) angVel = rand(0.25, 0.45);
    inicioJugada();
  });
}

init();

function reiniciarFooterYAgregarQR() {
  // Buscar un elemento footer existente
  const footerExistente = document.querySelector("footer");

  // Si hay un footer existente, limpiar su contenido
  if (footerExistente) {
    footerExistente.innerHTML = ""; // Esto elimina todo dentro del footer

    // Crear el div que contendrá el QR y añadirlo al footer existente
    const divQR = document.createElement("div");
    divQR.id = "pageQR";
    footerExistente.appendChild(divQR);
  } else {
    // Si no hay un footer existente, crear uno nuevo y añadirlo al cuerpo del documento
    const nuevoFooter = document.createElement("footer");
    const divQR = document.createElement("div");
    divQR.id = "pageQR2";
    nuevoFooter.appendChild(divQR);
    document.body.appendChild(nuevoFooter);
  }
}

function inicioJugada() {
  document.getElementById("NEW♥YORK").style.display = "none";
  document.getElementById("FRASES").style.display = "none";
  document.getElementById("ESCENAS").style.display = "none";
  document.getElementById("LIBROS").style.display = "none";
  document.getElementById("PELÍCULAS").style.display = "none";
  document.getElementById("EXTRA").style.display = "none";
  document.getElementById("PARTICIPA").style.display = "none";
  document.getElementById("mostrarWoodyAllen").textContent = "";
  const containerQR = document.getElementById("pageQR");
  if (containerQR) {
    containerQR.innerHTML = ""; // Esto elimina el QR anterior
  }
  alertMostrado = false;
}

function finJugada(resultado) {
  // Ocultar todos los posibles resultados
  document.getElementById("NEW♥YORK").style.display = "none";
  document.getElementById("FRASES").style.display = "none";
  document.getElementById("ESCENAS").style.display = "none";
  document.getElementById("LIBROS").style.display = "none";
  document.getElementById("PELÍCULAS").style.display = "none";
  document.getElementById("PARTICIPA").style.display = "none";
  document.getElementById("EXTRA").style.display = "none";

  switch (resultado) {
    case "NEW♥YORK":
      document.getElementById("NEW♥YORK").style.display = "block";
      procesaNewYork();
      //procesaEscenas();
      break;
    case "FRASES":
      document.getElementById("FRASES").style.display = "block";
      procesaFrases();
      break;
    case "ESCENAS":
      document.getElementById("ESCENAS").style.display = "block";
      procesaEscenas();
      break;
    case "LIBROS":
      document.getElementById("LIBROS").style.display = "block";
      procesaNewYork();
      break;
    case "PELÍCULAS":
      document.getElementById("PELÍCULAS").style.display = "block";
      procesaPelicula();
      break;
    case "EXTRA":
      document.getElementById("EXTRA").style.display = "block";
      procesaExtra();
      break;
    case "PARTICIPA":
      document.getElementById("PARTICIPA").style.display = "block";
      procesaNewYork();
      break;
    default:
      procesaNewYork();
  }
}

async function procesaFrases() {
  try {
    const response = await fetch("./js/FRASES.json");
    const frases = await response.json();

    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    const fraseElegida = frases[indiceAleatorio];

    // Construir la cadena HTML
    const html = `
		<h1 class="temFrase">${fraseElegida.tematica}</h1>
		<blockquote class="cuerpoFrase">${fraseElegida.frase}</blockquote>
		<div class="peliFrase">${fraseElegida.pelicula}</div>
	  `;

    // Insertar HTML en el DOM, ajusta el selector según sea necesario
    document.getElementById("mostrarWoodyAllen").innerHTML = html;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}

async function procesaEscenas() {
  try {
    const response = await fetch("./js/ESCENAS.json");
    const escenas = await response.json();

    const indiceAleatorio = Math.floor(Math.random() * escenas.length);
    const escenaElegida = escenas[indiceAleatorio];

    // Construir la cadena HTML
    const html = `
		  <h1 class="peliEscena">${escenaElegida.pelicula}</h1>
		  <div>${escenaElegida.escena}</div>
		  <div class="peliFrase">${escenaElegida.comentario}</div>
		`;

    // Insertar HTML en el DOM, ajusta el selector según sea necesario
    document.getElementById("mostrarWoodyAllen").innerHTML = html;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}

async function procesaExtra() {
  try {
    const response = await fetch("./js/EXTRA.json");
    const extra = await response.json();

    const indiceAleatorio = Math.floor(Math.random() * extra.length);
    const extraElegida = extra[indiceAleatorio];

    // Construir la cadena HTML
    const html = `
			<h1 class="extraTitulo">${extraElegida.titulo}</h1>
			<div class="extraHtml">${extraElegida.html}</div>
			<div class="extraComentario">${extraElegida.comentario}</div>
		  `;

    // Insertar HTML en el DOM, ajusta el selector según sea necesario
    document.getElementById("mostrarWoodyAllen").innerHTML = html;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}

async function procesaPelicula() {
  try {
    const response = await fetch("./js/PELÍCULAS_omeka.json");
    const pelicula = await response.json();

    const indiceAleatorio = Math.floor(Math.random() * pelicula.length);
    const peliculaElegida = pelicula[indiceAleatorio];

    // Construir la cadena HTML sin el script
    const html = `
          <h1 class="peliculaTitulo">${peliculaElegida.titulo}</h1>
          <div class="peliculaHtml">
          <img src="${peliculaElegida.cartel}" width="250px" style="float: left; margin-right: 1em; margin-bottom: 0.5em;">
          ${peliculaElegida.descripcion}
          </div>
          `;

    // Insertar HTML en el DOM
    const container = document.getElementById("mostrarWoodyAllen");
    container.innerHTML = html;

    // Crea y añade dinámicamente el código para el QR
    const scriptQR = document.createElement("script");
    scriptQR.type = "text/javascript";
    scriptQR.src = "js/qrcode.min.js";
    scriptQR.onload = function () {
      new QRCode(document.getElementById("pageQR"), {
        text: peliculaElegida.enlace_permanente,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    };
    document.body.appendChild(scriptQR);
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}

async function procesaExtra() {
  try {
    const response = await fetch("./js/EXTRA.json");
    const extra = await response.json();

    const indiceAleatorio = Math.floor(Math.random() * extra.length);
    const extraElegida = extra[indiceAleatorio];

    // Construir la cadena HTML
    const html = `
			<h1 class="extraTitulo">${extraElegida.titulo}</h1>
			<div class="extraHtml">${extraElegida.html}</div>
			<div class="extraComentario">${extraElegida.comentario}</div>
		  `;

    // Insertar HTML en el DOM, ajusta el selector según sea necesario
    document.getElementById("mostrarWoodyAllen").innerHTML = html;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}

async function procesaParticipa() {
  try {
    const response = await fetch("./js/PARTICIPA.json");
    const participa = await response.json();

    const indiceAleatorio = Math.floor(Math.random() * participa.length);
    const participaElegida = participa[indiceAleatorio];

    // Construir la cadena HTML
    const html = `
        <h1 class="participaTitulo">${participaElegida.titulo}</h1>
        <div class="participaMensaje1"><p>${participaElegida.mensaje1}</p></div>
        <div class="participaMensaje2">${participaElegida.mensaje2}</div>
        `;

    // Insertar HTML en el DOM, ajusta el selector según sea necesario
    document.getElementById("mostrarWoodyAllen").innerHTML = html;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}

async function procesaNewYork() {
  try {
    const response = await fetch("./js/NEW♥YORK.json");
    const newyork = await response.json();

    const indiceAleatorio = Math.floor(Math.random() * newyork.length);
    const newyorkElegida = newyork[indiceAleatorio];

    // Construye la cadena HTML para el carrusel de imágenes
    const imagesHtml = `
          <img src="${newyorkElegida.image1}" alt="Imagen 1" class="active">
          <img src="${newyorkElegida.image2}" alt="Imagen 2">
          <img src="${newyorkElegida.image3}" alt="Imagen 3">
          <img src="${newyorkElegida.image4}" alt="Imagen 4">
      `;

    // Construye el HTML completo, incluyendo mapa y carrusel
    const html = `
          <h1 class="newyorkTitulo">${newyorkElegida.site}</h1>
          <div class="newyorkHtml">
              <div id="mapid"></div>
              <div class="carousel" id="carousel">
                  ${imagesHtml}
              </div>
          </div>
          <div class="descSite">${newyorkElegida.descripcion}</div>
          
      `;

    // Inserta el HTML en el DOM
    const container = document.getElementById("mostrarWoodyAllen");
    container.innerHTML = html;

    const scriptLeaflet = document.createElement("script");
    scriptLeaflet.type = "text/javascript";
    scriptLeaflet.src = "js/leaflet.js"; // URL de la versión de Leaflet que desees utilizar
    document.head.appendChild(scriptLeaflet);

    scriptLeaflet.onload = function () {
      // Aquí inicializas el mapa y el marcador usando Leaflet
      var mymap = L.map("mapid", {
        center: JSON.parse(newyorkElegida.openStreetMap_center),
        zoom: parseInt(newyorkElegida.openStreetMap_site_zoom),
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false,
        keyboard: false,
      });

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {}
      ).addTo(mymap);

      var marker = L.marker(
        JSON.parse(newyorkElegida.openStreetMap_site_coord)
      ).addTo(mymap);
      marker.bindPopup(newyorkElegida.openStreetMap_site).openPopup();
    };

    // Inicializa el carrusel
    let current = 0;
    const images = document.querySelectorAll("#carousel img");
    const totalImages = images.length;

    setInterval(() => {
      images[current].classList.remove("active");
      current = (current + 1) % totalImages;
      images[current].classList.add("active");
    }, 10000);

    // Crea y añade dinámicamente el código para el QR
    const scriptQR = document.createElement("script");
    scriptQR.type = "text/javascript";
    scriptQR.src = "js/qrcode.min.js";
    scriptQR.onload = function () {
      new QRCode(document.getElementById("pageQR"), {
        text: newyorkElegida.googleMaps,
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    };
    document.body.appendChild(scriptQR);
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}
