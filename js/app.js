let currentCardIndex = 0;
let cards = [];
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
    const card = cards[index];
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

// Función para actualizar los contadores
function updateCounts() {
    document.getElementById('choose-type-count').textContent = cards.length - currentCardIndex;
    document.getElementById('discard-count').textContent = discardCount;
    document.getElementById('favorite-count').textContent = favoriteCount;
}

// Evento para el botón de descartar
document.getElementById('discard-btn').addEventListener('click', function() {
    if (currentCardIndex < cards.length) {
        currentCardIndex++; // Avanza al siguiente índice
        discardCount++; // Incrementa el contador de descartes
        updateCounts(); // Actualiza los contadores
        showCard(currentCardIndex); // Muestra la siguiente carta
    }
});

// Evento para el botón de favoritos
document.getElementById('favorite-btn').addEventListener('click', function() {
    if (currentCardIndex < cards.length) {
        currentCardIndex++; // Avanza al siguiente índice
        favoriteCount++; // Incrementa el contador de favoritos
        updateCounts(); // Actualiza los contadores
        showCard(currentCardIndex); // Muestra la siguiente carta
    }
});

// Inicializar la aplicación
document.getElementById('restart-btn').addEventListener('click', loadCards);
