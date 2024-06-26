document.addEventListener('DOMContentLoaded', function() {
    // Prefijo del URL del proxy CORS Anywhere de Heroku
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // URL original del archivo JSON
    const targetUrl = 'https://biblus.us.es/bib2/portatiles/results.json';
    // URL completa con el proxy
    const proxiedUrl = proxyUrl + targetUrl;
  
    // Función para obtener los datos del archivo JSON a través del proxy
    fetch(proxiedUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Aquí actualizamos los valores en la página con los datos del JSON
        // Asegúrate de que los IDs de los elementos coincidan con los usados aquí
        if (data.com !== undefined) {
          document.getElementById('portatilesCom').textContent = data.com;
        }
  
        if (data.ing !== undefined) {
          document.getElementById('portatilesIng').textContent = data.ing;
        }
  
        // Asumiendo que los cargadores tienen valores fijos en el ejemplo original
        // Si los valores también vienen del JSON, repite el proceso como arriba
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
});
