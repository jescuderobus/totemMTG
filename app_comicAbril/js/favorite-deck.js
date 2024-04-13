document.addEventListener('DOMContentLoaded', function() {
    const heartBtn = document.getElementById('heart-comic');

    heartBtn.addEventListener('click', function() {
        this.classList.toggle('active'); // Alternar la clase 'active' al hacer clic
    });
});