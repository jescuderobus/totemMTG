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

function inicioJugada() {
  document.getElementById("NEW♥YORK").style.display = "none";
  document.getElementById("FRASES").style.display = "none";
  document.getElementById("ESCENAS").style.display = "none";
  document.getElementById("LIBROS").style.display = "none";
  document.getElementById("PELÍCULAS").style.display = "none";
  document.getElementById("EXTRA").style.display = "none";
  document.getElementById("PARTICIPA").style.display = "none";
  document.getElementById("mostrarWoodyAllen").textContent = "";
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
      procesaPelicula();
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
      procesaPelicula();
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
      document.getElementById("PARICIPA").style.display = "block";
      procesaParticipa();
      break;
    default:
      procesaFrases();
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
    const response = await fetch("./js/PELÍCULAS.json");
    const pelicula = await response.json();

    const indiceAleatorio = Math.floor(Math.random() * pelicula.length);
    const peliculaElegida = pelicula[indiceAleatorio];

    // Construir la cadena HTML
    const html = `
        <h1 class="peliculaTitulo">${peliculaElegida.Title}&nbsp;(${peliculaElegida.Year})</h1>
        <div class="peliculaHtml"><img src="${peliculaElegida.Poster}"></div>
        <div class="peliculaComentario">${peliculaElegida.Plot}</div>
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
        <h1 class="participaTitulo">${participaElegida.Title}&nbsp;(${participaElegida.Year})</h1>
        <div class="participaHtml"><img src="${participaElegida.Poster}"></div>
        <div class="participaComentario">${participaElegida.Plot}</div>
        `;

    // Insertar HTML en el DOM, ajusta el selector según sea necesario
    document.getElementById("mostrarWoodyAllen").innerHTML = html;
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error);
  }
}