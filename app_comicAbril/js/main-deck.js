document.addEventListener('DOMContentLoaded', function() {
    const mainDeckBtn = document.getElementById('main-deck-btn');
    const mainDeckCont = document.getElementById('main-deck-cont');
    const comicDisplay = document.getElementById('comic-display');
    const prevComicBtn = document.getElementById('prev-comic');
    const nextComicBtn = document.getElementById('next-comic');
    let currentComicIndex = 0;
    let comicsData = [];

    mainDeckBtn.addEventListener('click', function() {
        loadComics();
    });

    function loadComics() {
        const activeSwitches = document.querySelectorAll('#elige-tipo-cont .categoria input[type="checkbox"]:checked');
        comicsData = []; // Resetear el array de cómics
        currentComicIndex = 0; // Resetear el índice del cómic actual

        activeSwitches.forEach(sw => {
            const categoryName = sw.closest('.categoria').querySelector('.legend').textContent.trim();
            const filename = categoryToFileMap[categoryName];
            fetch(`js/${filename}`)
                .then(response => response.json())
                .then(data => {
                    comicsData.push(...data.bib); // Asumimos que cada archivo tiene un array 'bib'
                    if (comicsData.length > 0) {
                        displayComic(0); // Mostrar el primer cómic
                    }
                })
                .catch(error => console.error('Error loading JSON for category:', categoryName, error));
        });
    }

    function displayComic(index) {
        const comic = comicsData[index];
        comicDisplay.innerHTML = `<h3>${comic.title}</h3>
                                  <p>${comic.author}</p>
                                  <img src="${comic.cover2}" alt="${comic.title} cover">`;
        mainDeckCont.style.display = 'block';
    }

    prevComicBtn.addEventListener('click', function() {
        if (currentComicIndex > 0) {
            currentComicIndex--;
            displayComic(currentComicIndex);
        }
    });

    nextComicBtn.addEventListener('click', function() {
        if (currentComicIndex < comicsData.length - 1) {
            currentComicIndex++;
            displayComic(currentComicIndex);
        }
    });
});




