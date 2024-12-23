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
            <span>Hauptgerichte / Beilagen / Getränke</span>
        </div>
    </div>`;
}

function generateDishCard(dish, i) {
    return `
    <div class="dish-card">
        <div class="dish-header">${dish.name} 
            <img class="add-button" src="./assets/button/plus.png" onclick="addToBasket(${i})">
        </div>
        <div class="separator"></div>
        <div class="dish-info">
            <p><strong>Zutaten:</strong> ${dish.description}</p>
            <p><strong>Preis:</strong> ${dish.price}€</p>
        </div>
    </div>`;
}

function generateDishCards(dishes) {
    const dishCards = dishes.map((dish, i) => generateDishCard(dish, i)).join('');
    return `<div class="food-container">${dishCards}</div>`;
}
