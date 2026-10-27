document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");

  if (category) {
    highlightCategory(category);
    filterProducts(category);
  }
});

function highlightCategory(cat) {
  const items = document.querySelectorAll(".sidebar .categories a");
  items.forEach(item => {
    if (item.dataset.category === cat) {
      item.classList.add("active-category");
    }
  });
}

function filterProducts(cat) {
  const cards = document.querySelectorAll(".pd-card");

  cards.forEach(card => {
    const cardCat = card.dataset.category;
    card.style.display = (cardCat === cat) ? "block" : "none";
  });
}
