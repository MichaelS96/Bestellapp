function init() {
    const foodContainer = document.getElementById("food-container");

    const restaurantInfo = generateRestaurantInfo();
    const dishCards = generateDishCards(dishes);

    foodContainer.innerHTML = restaurantInfo + dishCards;
}