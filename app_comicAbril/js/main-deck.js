document.addEventListener('DOMContentLoaded', function() {
    const mainDeckBtn = document.getElementById('main-deck-btn');
    const mainDeckCont = document.getElementById('main-deck-cont');
    const activeCategoriesList = document.getElementById('active-categories-list');
    const categorySwitches = document.querySelectorAll('#elige-tipo-cont .categoria input[type="checkbox"]');

    mainDeckBtn.addEventListener('click', function() {
        // Limpiar la lista anterior
        activeCategoriesList.innerHTML = '';

        // Recopilar y mostrar categorías activas
        categorySwitches.forEach(sw => {
            if (sw.checked) {
                // Asegurarse de seleccionar el texto del span con clase 'legend'
                const categoryName = sw.closest('.categoria').querySelector('.legend').textContent.trim();
                const listItem = document.createElement('li');
                listItem.textContent = categoryName;
                activeCategoriesList.appendChild(listItem);
            }
        });

        // Mostrar el contenedor si estaba oculto
        mainDeckCont.style.display = 'block';
    });
});
