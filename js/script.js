const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");

// Load the artwork list from the data file, then build the gallery
fetch("data/artworks.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Match each category to its gallery grid by section id
    const grids = {
      "ICEBORN": document.querySelector("#iceborn .gallery"),
      "Comics": document.querySelector("#comics .gallery"),
      "Illustrations": document.querySelector("#illustrations .gallery")
    };

    data.artworks.forEach(function (art) {
      const card = document.createElement("a");
      card.className = "art-card";
      card.href = "#";
      card.innerHTML =
        '<img src="' + art.image + '" alt="' + art.title + '">' +
        '<span class="art-title">' + art.title + '</span>';

      card.addEventListener("click", function (event) {
        event.preventDefault();
        lightboxImg.src = art.image;
        lightbox.classList.add("open");
      });

      // Drop the card into the grid that matches its category
      const targetGrid = grids[art.category];
      if (targetGrid) {
        targetGrid.appendChild(card);
      }
    });
  });

// Close the lightbox
lightbox.addEventListener("click", function () {
  lightbox.classList.remove("open");
});