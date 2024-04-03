
// Dia de la semana

var elementoDia = document.querySelector('.dia');
var hoy = new Date(); 
var opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var fechaFormateada = hoy.toLocaleDateString('es-ES', opciones);
elementoDia.innerHTML = fechaFormateada;


// Hora

function actualizarHora() {
    var ahora = new Date();
    var hora = ahora.getHours();
    var minuto = ahora.getMinutes();
    var segundo = ahora.getSeconds();
    
    // Añadir un cero adelante si es necesario para tener siempre dos dígitos
    hora = (hora < 10) ? "0" + hora : hora;
    minuto = (minuto < 10) ? "0" + minuto : minuto;
    segundo = (segundo < 10) ? "0" + segundo : segundo;

    // Formato de hora: HH:MM:SS
    var tiempo = hora + ":" + minuto + ":" + segundo;

    // Seleccionar el elemento con la clase 'hora' y actualizarlo
    document.querySelector('.hora').textContent = tiempo;
    
    // Actualizar la hora cada segundo
    setTimeout(actualizarHora, 1000);
}

// Iniciar la función al cargar la página
document.addEventListener('DOMContentLoaded', actualizarHora);



/* Modal de información */ 

// Obtiene el modal
var modal = document.getElementById("infoModal");

// Obtiene el botón que abre el modal
var btn = document.querySelector(".mdi-information-slab-circle");

// Obtiene el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en el botón, abre el modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
span.onclick = function() {
  modal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier lugar fuera del modal, lo cierra
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


