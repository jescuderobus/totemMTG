document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const apps = document.querySelectorAll('.app, .app1'); // Incluye .app1 en la selección si tiene una clase diferente

    // Función para actualizar el elemento visible
    const updateVisibleApp = () => {
      // Oculta todos los elementos
      apps.forEach(app => app.classList.remove('show'));

      // Muestra el siguiente elemento
      apps[currentIndex].classList.add('show');

      // Actualiza el índice para el siguiente elemento, rotando al principio si es necesario
      currentIndex = (currentIndex + 1) % apps.length;
    };

    // Inicializa la rotación de los elementos
    setInterval(updateVisibleApp, 10000); // Cambia cada 10 segundos

    // Asegúrate de que el primer elemento está visible inicialmente si es necesario
    apps[currentIndex].classList.add('show');
  });