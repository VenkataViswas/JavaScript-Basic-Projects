document.addEventListener("DOMContentLoaded", () => {
  var productList = document.getElementById("product-list");
  var cartItems = document.getElementById("cart-items");
  var emptyCartMessage = document.getElementById("empty-cart");
  var checkoutBtn = document.getElementById("checkout-btn");
  var cartTotalMessage = document.getElementById("cart-total");
  var totalPriceMessage = document.getElementById("total-price");

  const products = [
    { id: 1, name: "product 1", price: 99.99 },
    { id: 2, name: "product 2", price: 49.99 },
    { id: 3, name: "product 3", price: 150 },
  ];

  let cart = [];

  // render all the products
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);

    productDiv.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;
      const productId = parseInt(e.target.getAttribute("data-id"));
      const productToCart = products.find(
        (product) => product.id === productId
      );
      cart.push(productToCart);
      renderCart();
    });
  });

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length) {
      
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
          <div id="cartdiv">
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button class="deleteBtn" data-id="${item.id}">Remove</button>
          </div>
        `;
        cartItems.appendChild(cartItem);
      });

      totalPriceMessage.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceMessage.textContent = "$0.00";
    }

    // Attach event listener to all delete buttons using query selector all 
    document.querySelectorAll(".deleteBtn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = parseInt(e.target.getAttribute("data-id"));
        cart = cart.filter((prdt) => prdt.id !== id);
        renderCart();
      });
    });
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successful");
    renderCart();
  });
});
