const data = [
  {
    name: "Pizza Palace",
    desc: "Delicious hand-tossed pizzas",
    img: "https://source.unsplash.com/400x300/?pizza,restaurant",
    menu: [
      { name: "Margherita Pizza", price: 299, img: "https://source.unsplash.com/300x200/?margherita,pizza" },
      { name: "Veggie Supreme", price: 349, img: "https://source.unsplash.com/300x200/?veggie,pizza" }
    ]
  },
  {
    name: "Burger Hub",
    desc: "Juicy American burgers",
    img: "https://source.unsplash.com/400x300/?burger,restaurant",
    menu: [
      { name: "Cheese Burger", price: 199, img: "https://source.unsplash.com/300x200/?cheeseburger" },
      { name: "Double Patty", price: 249, img: "https://source.unsplash.com/300x200/?burger,beef" }
    ]
  },
  {
    name: "Sushi World",
    desc: "Authentic Japanese sushi",
    img: "https://source.unsplash.com/400x300/?sushi,restaurant",
    menu: [
      { name: "California Roll", price: 399, img: "https://source.unsplash.com/300x200/?california,sushi" },
      { name: "Spicy Tuna", price: 429, img: "https://source.unsplash.com/300x200/?tuna,sushi" }
    ]
  }
];

let cart = [];

function renderRestaurants() {
  const container = document.getElementById("restaurant-list");
  container.innerHTML = "";
  data.forEach((r, i) => {
    const card = document.createElement("div");
    card.className = "restaurant-card";
    card.innerHTML = `
      <img src="${r.img}" alt="${r.name}">
      <div class="info">
        <h3>${r.name}</h3>
        <p>${r.desc}</p>
      </div>
    `;
    card.onclick = () => showMenu(i);
    container.appendChild(card);
  });
}

function showMenu(index) {
  const restaurant = data[index];
  document.getElementById("menu-title").innerText = restaurant.name;
  const menuGrid = document.getElementById("menu-items");
  menuGrid.innerHTML = "";

  restaurant.menu.forEach(item => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="desc">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <button onclick="addToCart('${item.name}', ${item.price})">Add</button>
      </div>
    `;
    menuGrid.appendChild(div);
  });

  document.getElementById("menu-modal").classList.remove("hidden");
}

function closeMenu() {
  document.getElementById("menu-modal").classList.add("hidden");
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartPreview();
}

function updateCartPreview() {
  const preview = document.getElementById("cart-preview");
  if (!preview) return;

  const count = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  preview.innerHTML = `
    <strong>${count} item${count > 1 ? "s" : ""}</strong> - ₹${total}
    <button onclick="alert('Redirecting to cart...')">View Cart</button>
  `;
}

// Run on page load
window.onload = renderRestaurants;
// OTHER WORK 

window.onload = renderRestaurants;
function closeMenu() {
  document.getElementById("menu-modal").classList.add("hidden");
}
const pizzasContainer = document.getElementById('pizzas-container');
const addRowBtn = document.getElementById('add-row');
const totalSpan = document.getElementById('totalPrice');

function updateTotal() {
  let total = 0;
  document.querySelectorAll('.pizza-row').forEach(row => {
    const sel = row.querySelector('.pizza-select');
    const price = +sel.selectedOptions[0].dataset.price || 0;
    const qty = +row.querySelector('.qty-input').value || 0;
    total += price * qty;
  });
  totalSpan.innerText = total;
}

function removeRow(e) {
  e.target.closest('.pizza-row').remove();
  updateTotal();
}

function addRow() {
  const row = document.querySelector('.pizza-row').cloneNode(true);
  row.querySelector('.pizza-select').value = '';
  row.querySelector('.qty-input').value = 1;
  row.querySelector('.remove-btn').addEventListener('click', removeRow);
  row.querySelector('.pizza-select').addEventListener('change', updateTotal);
  row.querySelector('.qty-input').addEventListener('input', updateTotal);
  pizzasContainer.appendChild(row);
}

document.querySelectorAll('.remove-btn').forEach(btn => btn.addEventListener('click', removeRow));
document.querySelectorAll('.pizza-select').forEach(sel => sel.addEventListener('change', updateTotal));
document.querySelectorAll('.qty-input').forEach(inp => inp.addEventListener('input', updateTotal));

addRowBtn.addEventListener('click', addRow);

document.getElementById('order-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = this;
  const pizzas = [];
  document.querySelectorAll('.pizza-row').forEach(row => {
    const sel = row.querySelector('.pizza-select');
    const price = sel.selectedOptions[0].dataset.price;
    const name = sel.value;
    const qty = +row.querySelector('.qty-input').value;
    if (!name || qty < 1) return;
    pizzas.push({ name, price, qty });
  });
  if (pizzas.length === 0) {
    alert('Please add at least one pizza.');
    return;
  }

  const params = new URLSearchParams();
  ['name','email','phone','address'].forEach(k => params.append(k, form[k].value));
  pizzas.forEach((p, i) => {
    params.append(`pizza${i}`, p.name);
    params.append(`price${i}`, p.price);
    params.append(`qty${i}`, p.qty);
  });
  params.append('count', pizzas.length);

  window.location.href = `confirmation.html?${params.toString()}`;
});
