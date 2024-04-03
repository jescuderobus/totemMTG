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
    document.querySelector('.relojDigital0').textContent = tiempo;

    // Actualizar la hora cada segundo
    setTimeout(actualizarHora, 1000);
}

// Iniciar la función al cargar la página
document.addEventListener('DOMContentLoaded', actualizarHora);