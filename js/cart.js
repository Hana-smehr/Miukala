let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// نمایش محصولات
function renderCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <a href="product.html?id=${item.id}">${item.name}</a>
                    <p>${item.price} تومان</p>

                    <div class="qty">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${index}, +1)">+</button>
                    </div>
                </div>

                <button class="remove" onclick="removeItem(${index})">حذف</button>
            </div>
        `;
    });

    cartTotal.textContent = total.toLocaleString();
}

renderCart();

// تغییر تعداد
function changeQty(index, delta) {
    cart[index].quantity += delta;

    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// حذف محصول
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
