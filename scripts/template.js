function generateDishCard(dish, categoryIndex, dishIndex) {
    return `
        <div class="dish-card">
            <div class="dish-header">
                ${dish.name}
                <img class="add-button" src="./assets/button/plus.png" onclick="addToBasket(${categoryIndex}, ${dishIndex})">
            </div>
            <div class="separator"></div>
            <div class="dish-info">
                <p><strong>Zutaten:</strong> ${dish.description}</p>
                <p><strong>Preis:</strong> ${dish.price}€</p>
            </div>
        </div>
    `;
}

function generateRestaurantInfo() {
    return `
        <div class="restaurant-container">
            <div class="under-header">
                <div class="image-container">
                    <div class="text-overlay">
                        <h1 class="restaurant-name">Steh Pizzeria</h1>
                        <p class="rating">Bewertung (4.8 von 5 Sternen)</p>
                    </div>
                </div>
            </div>
            <div class="menu-categories">
                <a href="#main-dishes">Hauptgerichte</a> / 
                <a href="#sides">Beilagen</a> / 
                <a href="#drinks">Getränke</a>
            </div>
        </div>
    `;
}

function addNewItemToBasket(basket, dish) {
    const basketItem = document.createElement('div');
    basketItem.className = 'basket-item';
    basketItem.innerHTML = `
        <span>${dish.name}</span> 
        <span>${dish.price}€</span>
        <div class="add-basket">
            <img class="basket-trash" src="./assets/button/trash-busket.png" onclick="removeItemFromBasket(this)">    
            <img class="basket-minus" src="./assets/button/minus-basket.jpg" onclick="updateItemQuantity(this, -1)">
            <img class="basket-plus" src="./assets/button/plus-basket.jpg" onclick="updateItemQuantity(this, 1)">
            <span>1</span>
        </div>
    `;
    basket.appendChild(basketItem);
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