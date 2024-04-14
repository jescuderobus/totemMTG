const categoryToFileMap = {
    "Adaptación Literaria": "Adaptación_literaria.json",
    "Aventura / Superhéroes": "Aventura_Superhéroes.json",
    "Bélico": "Bélico.json",
    "Biografía": "Biografía.json",
    "Ciencia Ficción": "Ciencia_Ficción.json",
    "Costumbrismo/Drama": "Costumbrismo_Drama.json",
    "Fantasía/Romance": "Fantasía_Romance.json",
    "Negro/Terror/Underground": "Género_negro_Terror_Underground.json",
    "Histórico/Política": "Histórico_Política.json",
    "Humor": "Humor.json",
    "Manga": "Manga.json",
    "Metacomic": "Metacomic.json",
    "Mujeres/Feminismo": "Mujeres_Feminismo.json",
    "Premios Nacionales": "Premios_Nacionales.json",
    "Social/LGTBI+": "Social_LGTBIplus.json"
};


document.addEventListener('DOMContentLoaded', function() {
    const switchElegirTodas = document.getElementById('elegirTodas').querySelector('input[type="checkbox"]');
    const switchElegirNinguna = document.getElementById('elegirNinguna').querySelector('input[type="checkbox"]');
    const categorySwitches = document.querySelectorAll('#elige-tipo-cont .categoria input[type="checkbox"]:not([id="elegirTodas"], [id="elegirNinguna"])');
    const mainDeckCount = document.getElementById('main-deck-count'); // Asegúrate de que este ID está en tu HTML

    function updateComicsCount() {
        let totalComics = 0;
        const promises = [];

        Array.from(categorySwitches).forEach(sw => {
            if (sw.checked) {
                const categoryName = sw.closest('.categoria').querySelector('.legend').textContent.trim();
                const filename = categoryToFileMap[categoryName];
                const promise = fetch(`js/${filename}`) // Asegúrate de que la ruta es correcta
                    .then(response => response.json())
                    .then(data => {
                        totalComics += data.bib.length;
                    })
                    .catch(error => console.error('Error loading JSON for category:', categoryName, error));
                promises.push(promise);
            }
        });

        Promise.all(promises).then(() => {
            mainDeckCount.textContent = totalComics; // Actualizar el contador en el UI
        });
    }

    // Añadir manejadores de eventos para 'Elegir Todas' y 'Elegir Ninguna'
    [switchElegirTodas, switchElegirNinguna].forEach(switchEl => {
        switchEl.addEventListener('change', () => {
            categorySwitches.forEach(sw => sw.checked = switchEl.checked);
            updateComicsCount(); // Actualiza el contador cada vez que se cambia 'Elegir Todas' o 'Elegir Ninguna'
        });
    });

    // Añadir evento a cada switch de categoría individual
    categorySwitches.forEach(sw => {
        sw.addEventListener('change', updateComicsCount);
    });
});
