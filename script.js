function init() {
    const foodContainer = document.getElementById("food-container");

    const restaurantInfo = generateRestaurantInfo();
    const dishCards = generateDishCards(dishes);

    foodContainer.innerHTML = restaurantInfo + dishCards;

}

function addToBasket(index) {
    const dish = dishes[index];
    const basket = document.getElementById('basket');

    const existingBasketItem = findExistingBasketItem(basket, dish.name);

    if (existingBasketItem) {
        increaseItemCounter(existingBasketItem);
    } else {
        addNewItemToBasket(basket, dish);
    }
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
        <div>
            <span><img class="busket-minus" src="./assets/button/minus-basket.jpg"></span>
            <span><img class="busket-plus" src="./assets/button/plus-basket.jpg"></span>  
            <span>1</span>
        </div>
        
    `;
    basket.appendChild(basketItem);
}