const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("lightbox-close");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDesc = document.getElementById("lightbox-desc");

// Mobile: tap "Gallery" to toggle the dropdown menu
const dropdown = document.querySelector(".dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");

dropdownToggle.addEventListener("click", function (event) {
  // Only intercept the tap on small screens
  if (window.innerWidth <= 600) {
    event.preventDefault();
    dropdown.classList.toggle("open");
  }
});

// Tapping a menu item closes the menu
document.querySelectorAll(".dropdown-menu a").forEach(function (link) {
  link.addEventListener("click", function () {
    dropdown.classList.remove("open");
  });
});

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
        lightboxTitle.textContent = art.title;
        lightboxDesc.textContent = art.description || "";
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