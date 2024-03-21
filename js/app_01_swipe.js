let cards = []; // El mazo principal se carga desde el archivo JSON
let discardedCards = []; // Mazo de cartas descartadas
let favoriteCards = []; // Mazo de cartas favoritas
let currentMazo = 'principal'; // Puede ser 'principal', 'descartadas', 'favoritas'
let currentCardIndex = 0; // Índice de la carta actual en el mazo que se está revisando
let discardCount = 0;
let favoriteCount = 0;

// Función para cargar las cartas y reiniciar la aplicación
function loadCards() {
    fetch('js/mazo1_scryfall.json')
        .then(response => response.json())
        .then(data => {
            cards = data;
            resetApp(); // Llama a la función de reinicio
            showCard(currentCardIndex);
        })
        .catch(error => console.error('Error al cargar las cartas:', error));
}

// Función para reiniciar la aplicación
function resetApp() {
    currentCardIndex = 0; // Reinicia el índice de la carta actual
    discardCount = 0; // Reinicia el contador de descartes
    favoriteCount = 0; // Reinicia el contador de favoritos
    updateCounts(); // Actualiza los contadores en la interfaz de usuario
}

function showCard(index) {
    const cardImageElement = document.getElementById('card-image');
    let mazoActual = [];
    switch (currentMazo) {
        case 'principal':
            mazoActual = cards;
            break;
        case 'descartadas':
            mazoActual = discardedCards;
            break;
        case 'favoritas':
            mazoActual = favoriteCards;
            break;
    }
    const card = mazoActual[index];
    //const cardImageElement = document.getElementById('card-image');
    //const card = cards[index];
    if (card) {
        // Temporalmente quita la transición para cambiar la imagen instantáneamente
        cardImageElement.style.transition = 'none';
        const imageUrl = `imagesMTG/${card.id}.png`; // Construye la URL de la imagen basada en el ID de la carta
        cardImageElement.src = imageUrl;

        // Restablece la opacidad y la transición después de un breve retraso
        setTimeout(() => {
            cardImageElement.classList.remove('card-swipe');
            cardImageElement.style.transition = 'opacity 0.3s ease-in-out';
        }, 10); // Un retraso muy corto asegura que el cambio se registre después de la actualización de la imagen
    } else {
        console.log("No hay más cartas para mostrar.");
    }
}

// Funciones para mostrar las cartas del mazo actual

function showCardFromCurrentMazo() {
    let currentCards = getCurrentCards(); // Obtiene el mazo actual

    if (currentCardIndex < currentCards.length) {
        const card = currentCards[currentCardIndex];
        document.getElementById('card-image').src = `imagesMTG/${card.id}.png`;
    } else {
        document.getElementById('card-image').src = ""; // O una imagen predeterminada
        alert(`Fin del mazo ${currentMazo}. Cambie de mazo para seguir con su selección o reinicie la aplicación.`);
    }
}

function getCurrentCards() {
    switch(currentMazo) {
        case 'principal':
            return cards;
        case 'descartadas':
            return discardedCards;
        case 'favoritas':
            return favoriteCards;
    }
}


function moveCardToOtherMazo(targetMazo) {
    let currentCards = getCurrentCards();
    if (currentCardIndex < currentCards.length) {
        const card = currentCards.splice(currentCardIndex, 1)[0]; // Remueve la carta del mazo actual

        // Imprime el nombre de la carta y el mazo destino
        console.log(`Carta "${card.name}" movida a ${targetMazo === 'descartadas' ? 'descartadas' : 'favoritas'}.`);

        if (targetMazo === 'descartadas') {
            discardedCards.push(card);
            //discardCount++; // Asegúrate de incrementar el contador
        } else if (targetMazo === 'favoritas') {
            favoriteCards.push(card);
            //favoriteCount++; // Asegúrate de incrementar el contador
        }
        updateCounts(); // Actualiza los contadores
        showCardFromCurrentMazo(); // Muestra la siguiente carta
    }
}



// Funciones de Control

function printMazoNames() {
    console.log("Mazo Principal:", cards.map(card => card.name));
    console.log("Mazo Descartadas:", discardedCards.map(card => card.name));
    console.log("Mazo Favoritas:", favoriteCards.map(card => card.name));
}

function verifyTotalCards() {
    const totalCards = cards.length + discardedCards.length + favoriteCards.length;
    console.log(`Principal(${cards.length}) + Descartadas(${discardedCards.length}) + Favoritas(${favoriteCards.length}) = ${totalCards}`);
}



// Función para actualizar los contadores
function updateCounts() {
    //document.getElementById('main-deck-count').textContent = cards.length - currentCardIndex;
    //document.getElementById('discard-count').textContent = discardCount;
    //document.getElementById('favorite-count').textContent = favoriteCount;
    document.getElementById('main-deck-count').textContent = cards.length;
    document.getElementById('discard-count').textContent = discardedCards.length;
    document.getElementById('favorite-count').textContent = favoriteCards.length;
}


document.getElementById('discard-btn').addEventListener('click', function() {
    currentMazo = 'descartadas';
    currentCardIndex = 0;
    showCardFromCurrentMazo();
});


document.getElementById('favorite-btn').addEventListener('click', function() {
    currentMazo = 'favoritas';
    currentCardIndex = 0;
    showCardFromCurrentMazo();
});

document.getElementById('main-deck-btn').addEventListener('click', function() {
    currentMazo = 'principal';
    currentCardIndex = 0;
    showCardFromCurrentMazo();
});

// Inicializar la aplicación
document.getElementById('restart-btn').addEventListener('click', loadCards);


