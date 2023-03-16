//item objects
class storeItem {
  // for this MVP the class is instantiated once for each item in the basket
  // a long-term solution, should see a counter paired to a single object
  // for each product type added to the basket
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
  addToBasket() {
    let basketContents = getBasketFromStorage();
    basketContents.push(this);
    setBasketToStorage(basketContents);
  }
}

// available stock
const waxedCottonHoodedJacket = {
  //for the purposes of this exercise, a simple object was created
  //where there would likely be an API call to the catalogue & stock information
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

// update basket on navbar ///////////////////////////////
/////////////////////////////////////////////////////////
function fillBasketTotalDisplay(color) {
  let basketTotalDisplay = document.querySelector(".basket__number");
  basketTotalDisplay.style.backgroundColor = color;
}

function displayBasketTally() {
  let basketContents = getBasketFromStorage();
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
  let minusButton = document.querySelector(".controls__button--minus");
  let submitButton = document.querySelector(".add-button");

  minusButton.disabled = true;
  submitButton.disabled = true;
}

function enableSelectionButtons() {
  let minusButton = document.querySelector(".controls__button--minus");
  let submitButton = document.querySelector(".add-button");

  minusButton.disabled = false;
  submitButton.disabled = false;
}

function disableAllStockInteraction() {
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
// display the number of items selected by the user
function displayUserSelection(number = 1) {
  let userSelection = document.querySelector(".controls__number");
  userSelection.value = number;
  userSelection.textContent = number;
}

// evaluate and adjust the number of items selected by the user
function addToUserSelection() {
  let { quantity: stockCount } = waxedCottonHoodedJacket;
  let count = document.querySelector(".controls__number").value;
  let alertMessage = `only ${stockCount} units available of this item`;

  if (count >= stockCount) return window.alert(alertMessage);
  count++;
  displayUserSelection(count);
  if (count === 1) return enableSelectionButtons();
}

function subtractFromUserSelection() {
  let count = document.querySelector(".controls__number").value;

  count--;
  displayUserSelection(count);
  if (count === 0) return disableSelectionButtons();
}

// evaluate and display the current stock available
function displayStockCount() {
  let { quantity: stockCount } = waxedCottonHoodedJacket;
  if (stockCount === 0) return disableAllStockInteraction();

  let stockCountDisplay = document.querySelector(".info__quantity--stock");
  stockCountDisplay.textContent = `${stockCount} in stock`;
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
  displayUserSelection();
  displayBasketTally();
  displayStockCount();
}

renderPage();
