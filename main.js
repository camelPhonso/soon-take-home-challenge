//item objects
class storeItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  addToBasket() {
    basketContents.push(this);
    setBasketToStorage(basketContents);
  }
}

// available stock
const waxedCottonHoodedJacket = {
  price: 650.0,
  quantity: 10,
};

// Local Storage ///////////////////////////////////////////
///////////////////////////////////////////////////////////
function setBasketToStorage(item) {
  let stringifiedItem = JSON.stringify(item);
  localStorage.setItem("basketSOON", stringifiedItem);
}

function getBasketFromStorage() {
  let storedItems = localStorage.getItem("basketSOON") || "[]";
  return JSON.parse(storedItems);
}

let basketContents = getBasketFromStorage();

// update basket on navbar ///////////////////////////////
/////////////////////////////////////////////////////////
function fillBasketTotalDisplay(color) {
  let basketTotalDisplay = document.querySelector(".basket__number");
  basketTotalDisplay.style.backgroundColor = color;
}

function displayBasketTally() {
  let basketTally = document.querySelector(".basket__number-value");
  basketTally.textContent = basketContents.length;
  basketTally.textContent >= 1
    ? fillBasketTotalDisplay("#3F51B5")
    : fillBasketTotalDisplay("rgba(0, 0, 0, 0.25)");
}

// interact with button displays //////////////////////
//////////////////////////////////////////////////////

// disable buttons in response to stock levels
function disableSelectionButtons() {
  // this function is called later in response to stock changes
  let minusButton = document.querySelector(".controls__button--minus");
  let submitButton = document.querySelector(".add-button");

  minusButton.disabled = true;
  submitButton.disabled = true;
}

function enableSelectionButtons() {
  // this function is called later in response to stock changes
  let minusButton = document.querySelector(".controls__button--minus");
  let submitButton = document.querySelector(".add-button");

  minusButton.disabled = false;
  submitButton.disabled = false;
}

function disableAllStockInteraction() {
  // this function is called later in response to stock changes
  let minusButton = document.querySelector(".controls__button--minus");
  let plusButton = document.querySelector(".controls__button--plus");
  let submitButton = document.querySelector(".add-button");

  minusButton.disabled = true;
  plusButton.disabled = true;
  submitButton.disabled = true;

  let userSelection = document.querySelector(".controls__number");
  userSelection.textContent = 0;
}

// update stock count /////////////////////////////////
//////////////////////////////////////////////////////

// evaluate and adjust the number of items selected by the user
function addToUserSelection() {
  let { quantity: stockCount } = waxedCottonHoodedJacket;
  let userSelection = document.querySelector(".controls__number");
  let count = userSelection.value;

  if (count > stockCount)
    return window.alert(`only ${stockCount} available of this product`);
  count++;
  userSelection.textContent = count;
  userSelection.value = count;
  if (count === 1) return enableSelectionButtons();
}

function subtractFromUserSelection() {
  let userSelection = document.querySelector(".controls__number");
  let count = userSelection.value;

  count--;
  userSelection.textContent = count;
  userSelection.value = count;
  if (count === 0) return disableSelectionButtons();
}

// evaluate and display the current stock available
function displayStockCount() {
  let stockCountDisplay = document.querySelector(".info__quantity--stock");
  let { quantity: stockCount } = waxedCottonHoodedJacket;
  stockCountDisplay.textContent = `${stockCount} in stock`;
  if (stockCount === 0) return disableAllStockInteraction();
}

function adjustStockAvailable() {
  let userSelection = document.querySelector(".controls__number").value;
  let { quantity: stock } = waxedCottonHoodedJacket;
  waxedCottonHoodedJacket.quantity = stock - userSelection;
  displayStockCount();
}

// adjust the number of items in the basket
function adjustBasketTally() {
  let itemName = document.querySelector(".info__details--name").innerText;
  let itemPrice = parseInt(
    document.querySelector(".info__details--cost").innerText.replace(/^£/, "")
  );
  let itemQuantity = document.querySelector(".controls__number").value;

  for (let i = 0; i < itemQuantity; i++) {
    let currentItem = new storeItem(itemName, itemPrice);
    currentItem.addToBasket();
  }
  displayBasketTally();
}

// Event Listeners ////////////////////////////
//////////////////////////////////////////////

// listen to 'plus button'
let plusButton = document.querySelector(".controls__button--plus");
plusButton.addEventListener("click", () => {
  addToUserSelection();
});

// listen to 'minus button'
let minusButton = document.querySelector(".controls__button--minus");
minusButton.addEventListener("click", () => {
  subtractFromUserSelection();
});

// listen to 'add to basket button'
let submitButton = document.querySelector(".add-button");
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  adjustStockAvailable();
  adjustBasketTally();
});

// initialise the page ////////////////////////
//////////////////////////////////////////////
function renderPage() {
  let currentUserSelection = document.querySelector(".controls__number");
  currentUserSelection.value = 1;

  displayBasketTally();
  displayStockCount();
}

renderPage();
