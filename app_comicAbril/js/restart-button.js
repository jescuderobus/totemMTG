document.addEventListener('DOMContentLoaded', function() {
    const restartBtn = document.getElementById('restart-btn'); // Asegúrate de que el ID del botón es 'restart-btn'

    restartBtn.addEventListener('click', function() {
        // Mostrar un cuadro de diálogo para confirmar si el usuario realmente quiere reiniciar
        const confirmRestart = confirm("¿Deseas reiniciar todo?");
        if (confirmRestart) {
            // Si el usuario confirma, recarga la página
            window.location.reload();
        }
        // Si el usuario no confirma, no se hace nada
    });
});