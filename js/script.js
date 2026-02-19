const container = document.getElementById("productContainer");

function displayProducts(items){
container.innerHTML="";
items.forEach(product=>{
container.innerHTML+=`
<div class="card">
<img src="${product.image}">
<h3>${product.name}</h3>
<p class="price">₹${product.price}</p>
<button onclick="openModal(${product.id})">View Details</button>
<button onclick="addToCart(${product.id})">Add to Cart</button>
</div>
`;
});
}

function openModal(id){
const product = products.find(p=>p.id===id);
document.getElementById("productModal").style.display="block";
document.getElementById("modalImage").src=product.image;
document.getElementById("modalName").innerText=product.name;
document.getElementById("modalDesc").innerText=product.description;
document.getElementById("modalPrice").innerText="₹"+product.price;

let featureList="";
product.features.forEach(f=>{
featureList+=`<li>${f}</li>`;
});
document.getElementById("modalFeatures").innerHTML=featureList;

document.getElementById("modalCartBtn").onclick=()=>addToCart(id);
}

function closeModal(){
document.getElementById("productModal").style.display="none";
}

function addToCart(id){
let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart.push(products.find(p=>p.id===id));
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart!");
}

displayProducts(products);
