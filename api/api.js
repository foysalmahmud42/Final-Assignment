const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const homeButton = document.getElementById('home');
const mealCategory = document.getElementById('mealMain');

// event listeners

homeButton.addEventListener('click', getAllMeal);
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
mealCategory.addEventListener('click', getRecipe);


recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
function getAllMeal(){
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let html = "";
        data.categories.forEach(mealAll => {
            html += `
                <div class = "meal-item" data-id = "${mealAll.idCategory}">
                    <div class = "meal-img">
                        <img src = "${mealAll .strCategoryThumb}" alt = "food">
                    </div>
                    <div class = "meal-name">
                            <h3>${mealAll .strCategory}</h3>
                            <a href = "#" class = "view-btn">View All</a>
                    </div>
                    <div class = "meal-detail">
                        <p>${mealAll .strCategoryDescription}</p>
                    </div>
                </div>
            `;
            });
        mealList.innerHTML = html;
    });    
}
getAllMeal();

function getRecipe(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    e.preventDefault();
    if(target.classList.contains('view-btn')){
        let mealItem = target.parentElement.parentElement;
        var id = parseInt(mealItem.dataset.id);
        fetch(`https:www.themealdb.com/api/json/v1/1/categories.php`)
        .then(response => response.json())
        .then(data => showByCategory(data, id));   
    }
}
function showByCategory(data, id){
    console.log(data.categories[id-1].strCategory);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${data.categories[id-1].strCategory}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    });
}

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e){
    e = e || window.event;
    var target = e.target || e.srcElement;
    console.log(target);
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
        console.log(mealItem.dataset.id)
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}