function placeOrder(){
let name=document.getElementById("name").value;
let address=document.getElementById("address").value;
let phone=document.getElementById("phone").value;

if(name===""||address===""||phone===""){
alert("Please fill all details");
return;
}

localStorage.removeItem("cart");

window.location.href="success.html";
}
