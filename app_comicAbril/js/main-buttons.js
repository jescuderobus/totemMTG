document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los botones y los contenedores
    const restartBtn = document.getElementById('restart-btn');
    const eligeTipoBtn = document.getElementById('elige-tipo-btn');
    const mainDeckBtn = document.getElementById('main-deck-btn');
    const favoriteBtn = document.getElementById('favorite-btn');
    
    const restartCont = document.getElementById('restart-cont');
    const eligeTipoCont = document.getElementById('elige-tipo-cont');
    const mainDeckCont = document.getElementById('main-deck-cont');
    const favoriteCont = document.getElementById('favorite-cont');

    // Función para ocultar todos los contenedores
    function hideAllContainers() {
        restartCont.style.display = 'none';
        eligeTipoCont.style.display = 'none';
        mainDeckCont.style.display = 'none';
        favoriteCont.style.display = 'none';
    }

    // Mostrar el contenedor asociado a cada botón
    restartBtn.addEventListener('click', function() {
        hideAllContainers();
        restartCont.style.display = 'block';
    });

    eligeTipoBtn.addEventListener('click', function() {
        hideAllContainers();
        eligeTipoCont.style.display = 'block';
    });

    mainDeckBtn.addEventListener('click', function() {
        hideAllContainers();
        mainDeckCont.style.display = 'block';
    });

    favoriteBtn.addEventListener('click', function() {
        hideAllContainers();
        favoriteCont.style.display = 'block';
    });
});
