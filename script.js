function init() {
    const foodContainer = document.getElementById("food-container");
    const restaurantInfo = generateRestaurantInfo();

    foodContainer.innerHTML = restaurantInfo;
    renderMainDishes();
    renderSides();
    renderDrinks();
    updateBasketSummary();
}

function renderMainDishes() {
    const container = document.createElement('div');
    container.id = 'main-dishes';
    container.className = 'food-container';

    const header = document.createElement('h2');
    header.innerText = 'Hauptgerichte';
    container.appendChild(header);

    Hauptgerichte.forEach((dish, index) => {
        const dishCard = generateDishCard(dish, 0, index); // categoryIndex = 0
        container.innerHTML += dishCard;
    });

    document.getElementById('food-container').appendChild(container);
}

function renderSides() {
    const container = document.createElement('div');
    container.id = 'sides';
    container.className = 'food-container';

    const header = document.createElement('h2');
    header.innerText = 'Beilagen';
    container.appendChild(header);

    beilagen.forEach((dish, index) => {
        const dishCard = generateDishCard(dish, 1, index); // categoryIndex = 1
        container.innerHTML += dishCard;
    });

    document.getElementById('food-container').appendChild(container);
}

function renderDrinks() {
    const container = document.createElement('div');
    container.id = 'drinks';
    container.className = 'food-container';

    const header = document.createElement('h2');
    header.innerText = 'Getränke';
    container.appendChild(header);

    getränke.forEach((dish, index) => {
        const dishCard = generateDishCard(dish, 2, index); // categoryIndex = 2
        container.innerHTML += dishCard;
    });

    document.getElementById('food-container').appendChild(container);
}

function addToBasket(categoryIndex, dishIndex) {
    let dish;

    if (categoryIndex === 0) {
        dish = Hauptgerichte[dishIndex];
    } else if (categoryIndex === 1) {
        dish = beilagen[dishIndex];
    } else if (categoryIndex === 2) {
        dish = getränke[dishIndex];
    }

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

    const deliveryCost = 5.00; // fester Betrag für die Lieferkosten
    const total = subtotal + deliveryCost;

    document.getElementById('subtotal').innerText = `${subtotal.toFixed(2)}€`;
    document.getElementById('delivery-cost').innerText = `${deliveryCost.toFixed(2)}€`;
    document.getElementById('total').innerText = `${total.toFixed(2)}€`;
}

function removeItemFromBasket(button) {
    const basketItem = button.closest('.basket-item'); // Finde das übergeordnete Element mit der Klasse 'basket-item'
    basketItem.remove(); // Entferne das Element aus dem DOM
    updateBasketSummary(); // Aktualisiere die Warenkorb-Zusammenfassung
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