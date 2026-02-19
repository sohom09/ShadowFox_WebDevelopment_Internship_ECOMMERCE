let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cartItems");
let total = 0;

if (cart.length === 0) {
  container.innerHTML = "<p style='text-align:center'>Your cart is empty.</p>";
}

cart.forEach(item => {
  total += item.price;

  container.innerHTML += `
    <div class="card">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p class="price">₹${item.price}</p>
    </div>
  `;
});

document.getElementById("totalPrice").innerText =
  "Total:
