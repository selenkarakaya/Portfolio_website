if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  let removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  let addToCartButtons = document.getElementsByClassName("shopping");
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked(e) {
  // var cartItems = document.getElementsByClassName("cart-items")[0];
  // while (cartItems.hasChildNodes()) {
  //   cartItems.removeChild(cartItems.firstChild);
  // }
  e.preventDefault();
  let pageContent = document.getElementById("selen").innerHTML;
  sessionStorage.setItem("page1content", pageContent);
  document.location.href = "shopping.html";
  updateCartTotal();
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  console.log(shopItem);
  let day =
    button.parentElement.parentElement.parentElement.previousElementSibling
      .innerText;
  console.log(day);
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let time = shopItem.getElementsByClassName("shop-item-time")[0].innerText;
  addItemToCart(title, price, time, day);
  updateCartTotal();
}

function addItemToCart(title, price, time, day) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemHeader = cartItems.getElementsByClassName("cart-item-titles");
  let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  let cartItemTime = cartItems.getElementsByClassName("cart-item-time");
  for (let i = 0; i < cartItemTime.length; i++) {
    for (let j = 0; j < cartItemNames.length; j++)
      for (let z = 0; z < cartItemHeader.length; z++) {
        {
          if (
            cartItemNames[i].innerText == title &&
            cartItemTime[i].innerText == time &&
            cartItemHeader[i].innerText == day
          ) {
            alert("This item is already added to the cart");
            return;
          }
        }
      }
  }
  let cartRowContents = `
      <div class="cart-item cart-column">
          <span class="cart-item-titles">${day}</span>
          <span class="cart-item-title me-1">${title}</span>
          <span class="cart-item-time">${time}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">delete</button>
      </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

// total of class price
function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];

    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace("£", " "));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "£ " + total;
}
