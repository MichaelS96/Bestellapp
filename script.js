function init() {
    const foodContainer = document.getElementById("food-container");
    const restaurantInfo = generateRestaurantInfo();

    foodContainer.innerHTML = restaurantInfo;
    renderMainDishes();
    renderSides();
    renderDrinks();
    updateBasketSummary();
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

    // Update beide Warenkörbe, um sicherzustellen, dass sie synchronisiert sind
    updateBasketSummary();
    updateMobileBasket();
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

function placeOrder() {
    const basket = document.getElementById('basket-items'); // Korrektes Element mit der ID
    basket.innerHTML = ''; // Entfernt alle Warenkorbeinträge aus dem DOM

    const subtotalElement = document.getElementById('subtotal');
    const deliveryCostElement = document.getElementById('delivery-cost');
    const totalElement = document.getElementById('total');

    if (subtotalElement) subtotalElement.innerText = '0.00€';     // Zwischensumme auf 0.00€
    if (deliveryCostElement) deliveryCostElement.innerText = '5.00€'; // Lieferkosten bleiben konstant
    if (totalElement) totalElement.innerText = '5.00€';           // Gesamt auf Lieferkosten zurücksetzen

    document.querySelector('.order-message').innerText = "Vielen Dank für Ihre Bestellung";
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

    updateMobileBasket(); // Synchronisiere auch den mobilen Warenkorb
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

function toggleBasket() {
    const basketWrapper = document.querySelector('.basket-wrapper');
    const showBasketButton = document.getElementById('show-basket-button');

    // Wenn der Warenkorb aktuell ausgeblendet ist, zeige ihn an
    if (basketWrapper.style.display === 'none' || !basketWrapper.style.display) {
        basketWrapper.style.display = 'block';  // Zeige den Warenkorb
        showBasketButton.style.display = 'none'; // Verstecke den Button
    } else {
        // Andernfalls verstecke den Warenkorb und zeige den Button an
        basketWrapper.style.display = 'none';
        showBasketButton.style.display = 'block';
    }
}

function closeBasket() {
    const basketWrapper = document.querySelector('.basket-wrapper');
    const foodContainer = document.getElementById('food-container');

    // Verstecke den Warenkorb und stelle sicher, dass der Food-Container wieder sichtbar ist
    basketWrapper.style.display = 'none';
    
    // Zeige den Button wieder an, um den Warenkorb zu öffnen
    document.getElementById('show-basket-button').style.display = 'block';
}

function updateMobileBasket() {
    const mobileBasket = document.getElementById('mobile-basket-items');
    const basketItems = document.getElementById('basket-items').children;
}

