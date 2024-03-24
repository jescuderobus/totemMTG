let misRelojes = [
  "<div class='ra0_clock'><div class='ra0_outer-clock-face'><div class='ra0_marking ra0_marking-one'></div><div class='ra0_marking ra0_marking-two'></div><div class='ra0_marking ra0_marking-three'></div><div class='ra0_marking ra0_marking-four'></div><div class='ra0_inner-clock-face'><div class='ra0_hand ra0_hour-hand'></div><div class='ra0_hand ra0_min-hand'></div><div class='ra0_hand ra0_second-hand'></div></div></div></div>",
  "<div class='ra1_clock'><div class='ra1_outer-clock-face'><div class='ra1_marking ra1_marking-one'></div><div class='ra1_marking ra1_marking-two'></div><div class='ra1_marking ra1_marking-three'></div><div class='ra1_marking ra1_marking-four'></div><div class='ra1_inner-clock-face'><div class='ra1_hand ra1_hour-hand'></div><div class='ra1_hand ra1_min-hand'></div><div class='ra1_hand ra1_second-hand'></div></div></div></div>",
  "<div class='ra2_clock'><div class='ra2_outer-clock-face'><div class='ra2_marking ra2_marking-one'></div><div class='ra2_marking ra2_marking-two'></div><div class='ra2_marking ra2_marking-three'></div><div class='ra2_marking ra2_marking-four'></div><div class='ra2_inner-clock-face'><div class='ra2_hand ra2_hour-hand'></div><div class='ra2_hand ra2_min-hand'></div><div class='ra2_hand ra2_second-hand'></div></div></div></div>",
  "<div class='ra3_clock'><div><div class='ra3_info ra3_date'></div><div class='ra3_info ra3_day'></div></div><div class='ra3_dot'></div><div><div class='ra3_hour-hand'></div><div class='ra3_minute-hand'></div><div class='ra3_second-hand'></div></div><div><span class='ra3_h3'>3</span><span class='ra3_h6'>6</span><span class='ra3_h9'>9</span><span class='ra3_h12'>12</span></div><div class='ra3_diallines'></div></div>",
  "<second class='ra4_clock'><div class='ra4_seconds'></div><div class='ra4_minutes'></div><div class='ra4_minute'>44</div><div class='ra4_hour'></div></second>",
  "<div class='ra5_clock'><div class='ra5_block' data-num='0'></div><div class='ra5_block' data-num='1'></div><div class='ra5_block' data-num='2'></div><div class='ra5_block' data-num='3'></div><div class='ra5_block' data-num='4'></div><div class='ra5_block' data-num='5'></div><div class='ra5_block' data-num='6'></div><div class='ra5_block' data-num='7'></div><div class='ra5_block' data-num='8'></div><div class='ra5_block' data-num='9'></div><div class='ra5_block' data-num='10'></div><div class='ra5_block' data-num='11'></div><div class='ra5_block' data-num='12'></div><div class='ra5_block' data-num='13'></div><div class='ra5_block' data-num='14'></div><div class='ra5_block' data-num='15'></div><div class='ra5_block' data-num='16'></div><div class='ra5_block' data-num='17'></div><div class='ra5_block' data-num='18'></div><div class='ra5_block' data-num='19'></div><div class='ra5_block' data-num='20'></div><div class='ra5_block' data-num='21'></div><div class='ra5_block' data-num='22'></div><div class='ra5_block' data-num='23'></div><div class='ra5_block' data-num='24'></div><div class='ra5_block' data-num='25'></div><div class='ra5_block' data-num='26'></div><div class='ra5_block' data-num='27'></div><div class='ra5_block' data-num='28'></div><div class='ra5_block' data-num='29'></div><div class='ra5_block' data-num='30'></div><div class='ra5_block' data-num='31'></div><div class='ra5_block' data-num='32'></div><div class='ra5_block' data-num='33'></div><div class='ra5_block' data-num='34'></div><div class='ra5_block' data-num='35'></div><div class='ra5_block' data-num='36'></div><div class='ra5_block' data-num='37'></div><div class='ra5_block' data-num='38'></div><div class='ra5_block' data-num='39'></div><div class='ra5_block' data-num='40'></div><div class='ra5_block' data-num='41'></div><div class='ra5_block' data-num='42'></div><div class='ra5_block' data-num='43'></div><div class='ra5_block' data-num='44'></div><div class='ra5_block' data-num='45'></div><div class='ra5_block' data-num='46'></div><div class='ra5_block' data-num='47'></div><div class='ra5_block' data-num='48'></div><div class='ra5_block' data-num='49'></div><div class='ra5_block' data-num='50'></div><div class='ra5_block' data-num='51'></div><div class='ra5_block' data-num='52'></div><div class='ra5_block' data-num='53'></div><div class='ra5_block' data-num='54'></div><div class='ra5_block' data-num='55'></div><div class='ra5_block' data-num='56'></div><div class='ra5_block' data-num='57'></div><div class='ra5_block' data-num='58'></div><div class='ra5_block' data-num='59'></div><div class='ra5_divider'></div></div>",
];

// Función para cargar scripts dinámicamente
function cargarScriptDinamicamente(src) {
  if (!document.querySelector(`script[src="${src}"]`)) {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
  }
}

// Función para cambiar el reloj y cargar el script correspondiente
function cambiarRelojYScript() {
  var indiceAleatorio = Math.floor(Math.random() * misRelojes.length);
  document.getElementById("relojActual").innerHTML = misRelojes[indiceAleatorio];
  // Determina el script a cargar basado en el índice aleatorio
  cargarScriptDinamicamente(`js/ra${indiceAleatorio}.js`);
  actualizarHora();
}

function actualizarHora() {
  var ahora = new Date();
  var hora = ahora.getHours();
  var minuto = ahora.getMinutes();
  var segundo = ahora.getSeconds();

  hora = hora < 10 ? "0" + hora : hora;
  minuto = minuto < 10 ? "0" + minuto : minuto;
  segundo = segundo < 10 ? "0" + segundo : segundo;

  var tiempo = hora + ":" + minuto + ":" + segundo;
  document.querySelector(".relojDigital0").textContent = tiempo;

  if (segundo === "00") {
    setTimeout(function() {
      window.location.reload();
    }, 550); // Ajusta este tiempo según sea necesario
  } else {
    setTimeout(actualizarHora, 1000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  cambiarRelojYScript(); // Cambia el reloj y carga el script en la primera carga
});
