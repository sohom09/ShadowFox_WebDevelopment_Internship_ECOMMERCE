let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const wishlistCount = document.getElementById("wishlist-count");

cartCount.innerText = cart.length;
wishlistCount.innerText = wishlist.length;

function displayProducts(data) {
  productList.innerHTML = "";

  data.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" loading="lazy">
        <h4>${product.name}</h4>
        <p class="price">₹${product.price}</p>
        <div class="btn-group">
          <button onclick="addToCart(${product.id})">
            Add to Cart
          </button>
          <button class="wish-btn"
            onclick="addToWishlist(${product.id})">
            ❤️
          </button>
        </div>
      </div>
    `;
  });

  document.getElementById("productCount").innerText =
    data.length + " Products Found";
}

displayProducts(products);

function addToCart(id) {
  cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.innerText = cart.length;
}

function addToWishlist(id) {
  wishlist.push(id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  wishlistCount.innerText = wishlist.length;
}

document.getElementById("priceRange")
  .addEventListener("input", applyFilters);

document.querySelectorAll(".categoryFilter")
  .forEach(cb => cb.addEventListener("change", applyFilters));

document.getElementById("sortOptions")
  .addEventListener("change", applyFilters);

document.getElementById("searchInput")
  .addEventListener("input", applyFilters);

function applyFilters() {
  let maxPrice =
    document.getElementById("priceRange").value;

  document.getElementById("priceValue")
    .innerText = maxPrice;

  let selectedCategories =
    [...document.querySelectorAll(".categoryFilter:checked")]
    .map(cb => cb.value);

  let searchText =
    document.getElementById("searchInput")
    .value.toLowerCase();

  let filtered = products.filter(p =>
    p.price <= maxPrice &&
    (selectedCategories.length === 0 ||
      selectedCategories.includes(p.category)) &&
    p.name.toLowerCase().includes(searchText)
  );

  let sortType =
    document.getElementById("sortOptions").value;

  if (sortType === "priceLow")
    filtered.sort((a,b)=>a.price-b.price);

  if (sortType === "priceHigh")
    filtered.sort((a,b)=>b.price-a.price);

  displayProducts(filtered);
}

document.getElementById("clearFilters")
  .addEventListener("click", () => {
    location.reload();
  });
