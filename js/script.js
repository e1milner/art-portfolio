const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");

// Load the artwork list from the data file, then build the gallery
fetch("data/artworks.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (artworks) {
    artworks.forEach(function (art) {
      const card = document.createElement("a");
      card.className = "art-card";
      card.href = "#";
      card.innerHTML =
        '<img src="' + art.image + '" alt="' + art.title + '">' +
        '<span class="art-title">' + art.title + '</span>';

      // Open the lightbox when this card is clicked
      card.addEventListener("click", function (event) {
        event.preventDefault();
        lightboxImg.src = art.image;
        lightbox.classList.add("open");
      });

      gallery.appendChild(card);
    });
  });

// Close the lightbox
lightbox.addEventListener("click", function () {
  lightbox.classList.remove("open");
});