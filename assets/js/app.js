const container = document.getElementById("container");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const genders = document.getElementById("genders");

const searchByName = async (value) => {
  const response = await fetch(`http://localhost:3000/world/`);
  const data = await response.json();
  let filteredData = data.filter(
    (item) =>
      item.firstname.toLowerCase().includes(value) ||
      item.lastname.toLowerCase().includes(value)
  );

  container.innerHTML = "";
  filteredData.map((item) => {
    let card = document.createElement("div");
    card.className = "myCard";
    card.innerHTML = ` 
    <img src="${item.avatar}" alt="">   
    <div><h3><b>ID :</b> ${item.id}</h3> 
    <p><b>NAME :</b> ${item.firstname}</p>    
    <p><b>L-NAME :</b> ${item.lastname}</p>    
    <p><b>GENDER :</b> ${item.gender}</p>   
    <p><b>E-MAIL :</b> ${item.email}</p></div>
    <button>ADD</button>
    
   
    `;
    container.appendChild(card);
  });
  console.log(filteredData);
};

input.addEventListener("input", (e) => {
  searchByName(e.target.value);
});

const searchByGender = async (gender) => {
  document.getElementById("btn").style.display = "none";
  const response = await fetch(`http://localhost:3000/world/`);
  const data = await response.json();
  let filteredData = data.filter((item) =>
    item.gender.toLowerCase().startsWith(gender)
  );

  container.innerHTML = "";
  filteredData.map((item) => {
    let card = document.createElement("div");
    card.className = "myCard";
    card.innerHTML = ` 
    <img src="${item.avatar}" alt="">   
    <div><h3><b>ID :</b> ${item.id}</h3> 
    <p><b>NAME :</b> ${item.firstname}</p>    
    <p><b>L-NAME :</b> ${item.lastname}</p>    
    <p><b>GENDER :</b> ${item.gender}</p>   
    <p><b>E-MAIL :</b> ${item.email}</p></div>
    <button onclick="addToBasket(${item.id})">ADD</button>   
    `;
    container.appendChild(card);
  });
  console.log(filteredData);
};

genders.addEventListener("change", (e) => {
  let gender = e.target.value;
  if (gender == "all") {
    renderData();
  } else {
    searchByGender(gender);
  }
});

let page = 1;
let limit = 4;

const renderData = async () => {
  document.getElementById("btn").style.display = "block";
  let skip = (page - 1) * limit;
  const response = await fetch(
    `http://localhost:3000/world?_page=${page}&_limit=${limit}&_skip=${skip}`
  );
  const data = await response.json();
  db = data
  db.map((item) => {
    let card = document.createElement("div");
    card.className = "myCard";
    card.innerHTML = ` 
    <img src="${item.avatar}" alt="">   
    <div><h3><b>ID :</b> ${item.id}</h3> 
    <p><b>NAME :</b> ${item.firstname}</p>    
    <p><b>L-NAME :</b> ${item.lastname}</p>    
    <p><b>GENDER :</b> ${item.gender}</p>   
    <p><b>E-MAIL :</b> ${item.email}</p></div>
    <button onclick="addToBasket(${item.id})">ADD</button>
    
   
    `;
    container.appendChild(card);
  });
  page++;
};

btn.addEventListener("click", renderData);
renderData();

function addToBasket(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(db.find((item) => item.id == id));
  localStorage.setItem("cart", JSON.stringify(cart));
}
//THEME CHANGE

const themeBtn = document.getElementById("themeBtn");
let mode = "dark";
themeBtn.addEventListener("click", modeChanger);
function modeChanger() {
  if (mode == "dark") {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "black";
    mode = "white";
    themeBtn.innerHTML = `<i class="fa-regular fa-sun"></i> Light Mode`;
    document.querySelector(".myCard").style.backgroundColor = "#fff";

  } else {
    document.body.style.backgroundColor = "#202D36";
    document.body.style.color = "white";
    mode = "dark";
    themeBtn.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    document.querySelector(".myCard").style.backgroundColor = "#2B3743";
  }
}
