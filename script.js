// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

let addedCartList = [];

function loadCartFromSession(){
	const cartData=sessionStorage.getItem("cart");
	if(cartData){
		addedCartList=JSON.parse(cartData);
	}else{
		addedCartList=[];
	}
}

function setToSession(){
	sessionStorage.setItem("cart", JSON.stringify(addedCartList));
}

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear existing list
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add event listeners AFTER rendering
  const addButtons = document.querySelectorAll(".add-to-cart-btn");
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear current cart items
  addedCartList.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
	let currCart=JSON.parse(sessionStorage.getItem("cart"))|| [];
	currCart.push(product);
	  
    sessionStorage.setItem("cart",JSON.stringify(currCart));
	addedCartList = currCart;
    renderCart();
  }
}

// Remove item from cart (not implemented yet)
function removeFromCart(productId) {}

// Clear cart
function clearCart() {
  addedCartList = [];
	sessionStorage.removeItem("cart");
  renderCart();
}

// Attach event listener for Clear Cart button
clearBtn.addEventListener("click", clearCart);

// Initial render
loadCartFromSession();
renderProducts();
renderCart(); // Optional: shows empty cart on load