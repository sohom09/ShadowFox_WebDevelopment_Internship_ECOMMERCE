const container = document.getElementById("productContainer");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const countElement = document.getElementById("cartCount");
  if (countElement) {
    countElement.innerText = cart.length;
  }
}

function addToCart(id) {
  const cart = getCart();
  const product = products.find(p => p.id === id);

  if (product) {
    cart.push(product);
    saveCart(cart);
    updateCartCount();

    alert(product.name + " added to cart successfully!");
  }
}


function openModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").innerText = product.name;
  document.getElementById("modalDescription").innerText = product.description;
  document.getElementById("modalPrice").innerText = "₹" + product.price;

  let featuresHTML = "";
  product.features.forEach(f => {
    featuresHTML += `<li>${f}</li>`;
  });

  document.getElementById("modalFeatures").innerHTML = featuresHTML;

  document.getElementById("modalAddBtn").onclick = function () {
    addToCart(id);
  };

  document.getElementById("productModal").style.display = "block";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

function displayProducts() {
  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <button onclick="openModal(${product.id})">View Details</button>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}
document.getElementById("categoryFilter").addEventListener("change", applyFilters);
document.getElementById("priceFilter").addEventListener("change", applyFilters);
document.getElementById("searchInput").addEventListener("keyup", applyFilters);

function applyFilters() {

  let category = document.getElementById("categoryFilter").value;
  let price = document.getElementById("priceFilter").value;
  let search = document.getElementById("searchInput").value.toLowerCase();

  let filtered = products;

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (price !== "all") {
    filtered = filtered.filter(p => p.price <= parseInt(price));
  }

  if (search !== "") {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search)
    );
  }

  container.innerHTML = "";

  filtered.forEach(product => {
    container.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <button onclick="openModal(${product.id})">View Details</button>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });

}
displayProducts();
updateCartCount();
