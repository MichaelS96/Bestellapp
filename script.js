function init() {
    const foodContainer = document.getElementById("food-container");
    const restaurantInfo = generateRestaurantInfo();
    const dishCards = generateDishCards(dishes);

    foodContainer.innerHTML = restaurantInfo + dishCards;
    updateBasketSummary();
}

function addToBasket(categoryIndex, dishIndex) {
    const categoryName = getCategoryByIndex(categoryIndex); // Hole den Kategorie-Namen
    const dish = dishes.filter(dish => dish.category === categoryName)[dishIndex];

    console.log('Dish:', dish); // Überprüfe, ob das Gericht korrekt gefunden wird

    const basket = document.getElementById('basket-items');
    const existingBasketItem = findExistingBasketItem(basket, dish.name);

    if (existingBasketItem) {
        increaseItemCounter(existingBasketItem);
    } else {
        addNewItemToBasket(basket, dish);
    }
    updateBasketSummary();
}

// Überprüfen, ob das Gericht bereits im Warenkorb ist
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

// Erhöhen der Anzahl des Artikels im Warenkorb
function increaseItemCounter(existingBasketItem) {
    const counterSpan = existingBasketItem.querySelector('div span:last-child');
    counterSpan.innerText = parseInt(counterSpan.innerText, 10) + 1;
}



// Aktualisieren der Artikelmenge im Warenkorb
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

// Warenkorb-Zusammenfassung aktualisieren
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

    const deliveryCost = 5.00; // fester betrag fuer die Lieferkosten
    const total = subtotal + deliveryCost;

    document.getElementById('subtotal').innerText = `${subtotal.toFixed(2)}€`;
    document.getElementById('delivery-cost').innerText = `${deliveryCost.toFixed(2)}€`;
    document.getElementById('total').innerText = `${total.toFixed(2)}€`;
}

function generateDishCards(dishes) {
    // Gerichte nach Kategorien filtern
    const mainDishes = dishes.filter(dish => dish.category === 'Hauptgerichte');
    const sides = dishes.filter(dish => dish.category === 'Beilagen');
    const drinks = dishes.filter(dish => dish.category === 'Getränke');
    
    return `
        <div id="main-dishes" class="food-container">
            <h2>Hauptgerichte</h2>
            ${mainDishes.map((dish, i) => generateDishCard(dish, 0, i)).join('')}  <!-- categoryIndex = 0 für Hauptgerichte -->
        </div>
        <div id="sides" class="food-container">
            <h2>Beilagen</h2>
            ${sides.map((dish, i) => generateDishCard(dish, 1, i)).join('')}  <!-- categoryIndex = 1 für Beilagen -->
        </div>
        <div id="drinks" class="food-container">
            <h2>Getränke</h2>
            ${drinks.map((dish, i) => generateDishCard(dish, 2, i)).join('')}  <!-- categoryIndex = 2 für Getränke -->
        </div>
    `;
}

function getCategoryByIndex(index) {
    const categories = ['Hauptgerichte', 'Beilagen', 'Getränke'];
    return categories[index] || ''; // gibt nichts aus wenn ungueltiger index 
}

// Funktion zum Löschen eines Artikels aus dem Warenkorb
function removeItemFromBasket(button) {
    const basketItem = button.closest('.basket-item'); // Finde das übergeordnete Element mit der Klasse 'basket-item'
    basketItem.remove(); // Entferne das Element aus dem DOM
    updateBasketSummary(); // Aktualisiere die Warenkorb-Zusammenfassung
}