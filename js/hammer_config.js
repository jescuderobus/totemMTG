// Asegúrate de que este script se ejecute después de que la página se haya cargado completamente
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene el elemento de la imagen de la carta
  var cardImageElement = document.getElementById("card-image");

  // Crea una instancia de Hammer pasándole el elemento de la imagen
  var hammer = new Hammer(cardImageElement);

  // Configura la detección de deslizamientos hacia la izquierda y derecha
  hammer.on("swipeleft", function () {
    // Muestra el icono de favoritos
    document.getElementById("discard-icon").style.display = "block";
    document.getElementById("icon-overlay").style.display = "block";

    // Espera 0.5 segundos antes de proceder
    setTimeout(() => {
      // Oculta el icono
      document.getElementById("discard-icon").style.display = "none";
      document.getElementById("icon-overlay").style.display = "none";

      cardImageElement.classList.add("card-swipe");
      // Lógica para descartar la carta
      console.log("Descartada");
      if (currentCardIndex < cards.length) {
        currentCardIndex++;
        discardCount++;
        updateCounts();
        showCard(currentCardIndex);
      }
    }, 180); // 500 milisegundos = 0.5 segundos
  });

  hammer.on("swiperight", function () {
    // Muestra el icono de favoritos
    document.getElementById("favorite-icon").style.display = "block";
    document.getElementById("icon-overlay").style.display = "block";

    // Espera 0.5 segundos antes de proceder
    setTimeout(() => {
      // Oculta el icono
      document.getElementById("favorite-icon").style.display = "none";
      document.getElementById("icon-overlay").style.display = "none";

      cardImageElement.classList.add("card-swipe");
      // Lógica para añadir a favoritos
      console.log("Añadida a favoritos");
      if (currentCardIndex < cards.length) {
        currentCardIndex++;
        favoriteCount++;
        updateCounts();
        showCard(currentCardIndex);
      }
    }, 180); // 500 milisegundos = 0.5 segundos
  });
});
