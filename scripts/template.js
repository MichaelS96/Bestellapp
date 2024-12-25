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
    </div>`;
}

function generateDishCard(dish, categoryIndex, dishIndex) {
    return `
    <div class="dish-card">
        <div class="dish-header">${dish.name} 
            <img class="add-button" src="./assets/button/plus.png" onclick="addToBasket(${categoryIndex}, ${dishIndex})">
        </div>
        <div class="separator"></div>
        <div class="dish-info">
            <p><strong>Zutaten:</strong> ${dish.description}</p>
            <p><strong>Preis:</strong> ${dish.price}€</p>
        </div>
    </div>`;
}

// Hinzufügen eines neuen Artikels zum Warenkorb
function addNewItemToBasket(basket, dish) {
    const basketItem = document.createElement('div');
    basketItem.className = 'basket-item';
    basketItem.innerHTML = `
        <span>${dish.name}</span> 
        <span>${dish.price}€</span>
        <div class="add-busket">
        <img class="busket-trash" src="./assets/button/trash-busket.png" onclick="removeItemFromBasket(this)">    
        <img class="busket-minus" src="./assets/button/minus-basket.jpg" onclick="updateItemQuantity(this, -1)">
            <img class="busket-plus" src="./assets/button/plus-basket.jpg" onclick="updateItemQuantity(this, 1)">
            <span>1</span>
        </div>
    `;
    basket.appendChild(basketItem);
}

