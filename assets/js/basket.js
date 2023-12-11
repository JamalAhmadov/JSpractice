const div = document.getElementById("container");

function getProducts() {
  div.innerHTML = ``;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.map((item, index) => {
    const box = document.createElement("div");
    box.className = "myCard"
    box.innerHTML =` 
    <img src="${item.avatar}" alt="">   
    <div><h3><b>ID :</b> ${item.id}</h3> 
    <p><b>NAME :</b> ${item.firstname}</p>    
    <p><b>L-NAME :</b> ${item.lastname}</p>    
    <p><b>GENDER :</b> ${item.gender}</p>   
    <p><b>E-MAIL :</b> ${item.email}</p></div>
    <button onclick="removeItem(${index})">Remove</button>
    
   
    `;

    div.appendChild(box);
  });
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  getProducts();
}

window.onload = () => {
  getProducts();
};
