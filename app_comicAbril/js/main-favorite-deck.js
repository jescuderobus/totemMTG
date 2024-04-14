let favoritesData = []; // Almacena los cómics marcados como favoritos
let shuffled = false;

document.addEventListener("DOMContentLoaded", function () {
  const mainDeckBtn = document.getElementById("main-deck-btn");
  const favoriteBtn = document.getElementById("favorite-btn");
  const mainDeckCont = document.getElementById("main-deck-cont");
  const favoriteCont = document.getElementById("favorite-cont");
  const comicDisplay = document.getElementById("comic-display");
  const favComicDisplay = document.getElementById("fav-comic-display");
  const comicStatus = document.querySelector(".comic-status");
  const comicInfo = document.querySelector(".comic-info");
  const favComicInfo = document.querySelector(".fav-comic-info");
  const favComicStatus = document.querySelector(".fav-comic-status");
  const prevComicBtn = document.getElementById("prev-comic");
  const nextComicBtn = document.getElementById("next-comic");
  const prevFavComicBtn = document.getElementById("fav-prev-comic");
  const nextFavComicBtn = document.getElementById("fav-next-comic");
  const heartComicBtn = document.getElementById("heart-comic");
  const favHeartComicBtn = document.getElementById("fav-heart-comic");
  const favoriteCountSpan = document.getElementById("favorite-count"); // Contador de favoritos
  let currentComicIndex = 0;
  let currentFavoriteIndex = 0;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function updateFavoriteCount() {
    favoriteCountSpan.textContent = favoritesData.length; // Actualizar el contador de favoritos en la UI
  }

  mainDeckBtn.addEventListener("click", function () {
    loadComics();
    mainDeckCont.style.display = "block";
    favoriteCont.style.display = "none";
  });

  favoriteBtn.addEventListener("click", function () {
    if (favoritesData.length > 0) {
      displayFavorite(currentFavoriteIndex);
    } else {
      alert("No hay favoritos seleccionados.");
    }
    favoriteCont.style.display = "block";
    mainDeckCont.style.display = "none";
  });

  function loadComics() {
    comicsData = [];
    const activeSwitches = document.querySelectorAll(
      '#elige-tipo-cont .categoria input[type="checkbox"]:checked'
    );

    activeSwitches.forEach((sw) => {
      const categoryName = sw
        .closest(".categoria")
        .querySelector(".legend")
        .textContent.trim();
      const filename = categoryToFileMap[categoryName];
      fetch(`js/${filename}`)
        .then((response) => response.json())
        .then((data) => {
          data.bib.forEach((comic) => {
            comic.category = categoryName;
            comicsData.push(comic);
          });
          if (!shuffled) {
            shuffleArray(comicsData);
            shuffled = true;
          }
          if (comicsData.length > 0) {
            displayComic(currentComicIndex);
          }
        })
        .catch((error) =>
          console.error("Error loading JSON for category:", categoryName, error)
        );
    });
  }

  function displayComic(index) {
    const comic = comicsData[index];
    comicInfo.innerHTML = `<br><span class="ct">${comic.title} <span class="ca">${comic.author}</span></span>`;
    comicDisplay.innerHTML = `<img id="comic-cover" src="${comic.cover2}" style="width:100%; height:100%;">`;
    comicStatus.textContent = `${index + 1}/${comicsData.length} - ${
      comic.category
    }`;
    heartComicBtn.classList.toggle("active", favoritesData.includes(comic));
  }

  function displayFavorite(index) {
    const comic = favoritesData[index];
    favComicInfo.innerHTML = `<br><span class="ct">${comic.title} <span class="ca">${comic.author}</span></span>`;
    favComicDisplay.innerHTML = `<img id="comic-cover" src="${comic.cover2}" style="width:100%; height:100%;">`;
    favComicStatus.textContent = `${index + 1}/${favoritesData.length} - ${
      comic.category
    }`;
    favHeartComicBtn.classList.toggle("active", true); // Favoritos siempre marcados como activos
  }

  [prevComicBtn, nextComicBtn].forEach((btn) => {
    btn.addEventListener("click", function () {
      if (btn === prevComicBtn) {
        currentComicIndex =
          (currentComicIndex - 1 + comicsData.length) % comicsData.length;
      } else {
        currentComicIndex = (currentComicIndex + 1) % comicsData.length;
      }
      displayComic(currentComicIndex);
    });
  });

  [prevFavComicBtn, nextFavComicBtn].forEach((btn) => {
    btn.addEventListener("click", function () {
      if (btn === prevFavComicBtn) {
        currentFavoriteIndex =
          (currentFavoriteIndex - 1 + favoritesData.length) %
          favoritesData.length;
      } else {
        currentFavoriteIndex =
          (currentFavoriteIndex + 1) % favoritesData.length;
      }
      displayFavorite(currentFavoriteIndex);
    });
  });

  heartComicBtn.addEventListener("click", function () {
    const comic = comicsData[currentComicIndex];
    const index = favoritesData.findIndex((fav) => fav.mms_id === comic.mms_id);
    if (index > -1) {
      favoritesData.splice(index, 1);
      heartComicBtn.classList.remove("active");
    } else {
      favoritesData.push(comic);
      heartComicBtn.classList.add("active");
    }
    updateFavoriteCount();
  });
});
