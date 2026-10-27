document.addEventListener("DOMContentLoaded", function () {

  /* --- لود هدر --- */
  fetch("components/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      initSliders();
      initCategoryClick();
      initMiniCartHover();
      updateCartCount();
      renderMiniCart();
    });

  /* --- لود فوتر --- */
  fetch("components/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });
});

/* -------------------------------------------------
   اسلایدر
------------------------------------------------- */
function initSliders() {
  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
  }

  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  if (nextBtn && prevBtn) {
    nextBtn.onclick = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    };

    prevBtn.onclick = () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(currentSlide);
    };
  }

  showSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }, 5000);
}

/* -------------------------------------------------
   کلیک روی کارت‌های دسته‌بندی → صفحه محصولات
------------------------------------------------- */
function initCategoryClick() {
  const cards = document.querySelectorAll(".category-card");
  if (cards.length === 0) return;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const cat = card.dataset.category;
      window.location.href = `products.html?category=${cat}`;
    });
  });
}

/* -------------------------------------------------
   سبد خرید
------------------------------------------------- */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const el = document.querySelector(".cart-count");
  if (el) el.textContent = cart.length;
}

function renderMiniCart() {
  const items = JSON.parse(localStorage.getItem("cart") || "[]");
  const box = document.querySelector(".mini-cart-items");
  if (!box) return;

  box.innerHTML = items.map(i =>
    `<div class="mini-cart-item">
       <strong>${i.name}</strong>
       <span>${i.price}</span>
     </div>`
  ).join("");
}

/* -------------------------------------------------
   نمایش/مخفی‌کردن minicart با hover
------------------------------------------------- */
function initMiniCartHover() {
  const wrapper = document.querySelector(".cart-icon-wrapper");
  const mini = document.querySelector(".mini-cart");

  if (!wrapper || !mini) return;

  wrapper.addEventListener("mouseenter", () => {
    mini.classList.add("open");
  });

  wrapper.addEventListener("mouseleave", () => {
    mini.classList.remove("open");
  });
}
