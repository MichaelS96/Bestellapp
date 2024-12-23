function init() {
    const foodContainer = document.getElementById("food-container");
    const restaurantInfo = generateRestaurantInfo();
    const dishCards = generateDishCards(dishes);

    foodContainer.innerHTML = restaurantInfo + dishCards;
    updateBasketSummary();
}

function addToBasket(index) {
    const dish = dishes[index];
    const basket = document.getElementById('basket-items');

    const existingBasketItem = findExistingBasketItem(basket, dish.name);

    if (existingBasketItem) {
        increaseItemCounter(existingBasketItem);
    } else {
        addNewItemToBasket(basket, dish);
    }
    updateBasketSummary();
}

function findExistingBasketItem(basket, dishName) {
    const existingBasketItems = basket.getElementsByClassName('basket-item');
    for (let i = 0; i < existingBasketItems.length; i++) {
        const item = existingBasketItems[i];
        if (item.querySelector('span').innerText === dishName) {
            return item;
        }
    }
    return null;
}

function increaseItemCounter(existingBasketItem) {
    const counterSpan = existingBasketItem.querySelector('div span:last-child');
    counterSpan.innerText = parseInt(counterSpan.innerText, 10) + 1;
}

function addNewItemToBasket(basket, dish) {
    const basketItem = document.createElement('div');
    basketItem.className = 'basket-item';
    basketItem.innerHTML = `
        <span>${dish.name}</span> 
        <span>${dish.price}€</span>
        <div class="add-busket">
            <img class="busket-minus" src="./assets/button/minus-basket.jpg" onclick="updateItemQuantity(this, -1)">
            <img class="busket-plus" src="./assets/button/plus-basket.jpg" onclick="updateItemQuantity(this, 1)">
            <span>1</span>
        </div>
    `;
    basket.appendChild(basketItem);
}

function updateItemQuantity(button, change) {
    const counterSpan = button.parentElement.querySelector('span:last-child');
    let newQuantity = parseInt(counterSpan.innerText, 10) + change;
    if (newQuantity <= 0) {
        button.closest('.basket-item').remove();
    } else {
        counterSpan.innerText = newQuantity;
    }
    updateBasketSummary();
}

function updateBasketSummary() {
    const basket = document.getElementById('basket-items');
    const basketItems = basket.getElementsByClassName('basket-item');
    let subtotal = 0;

    for (let i = 0; i < basketItems.length; i++) {
        const item = basketItems[i];
        const price = parseFloat(item.querySelector('span:nth-child(2)').innerText.replace('€', ''));
        const quantity = parseInt(item.querySelector('div span:last-child').innerText, 10);
        subtotal += price * quantity;
    }

    const deliveryCost = 5.00; // Fester Betrag für die Lieferkosten
    const total = subtotal + deliveryCost;

    document.getElementById('subtotal').innerText = `${subtotal.toFixed(2)}€`;
    document.getElementById('delivery-cost').innerText = `${deliveryCost.toFixed(2)}€`;
    document.getElementById('total').innerText = `${total.toFixed(2)}€`;
}
;