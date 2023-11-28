const mobileNavShow = document.querySelector('.mobile-nav-show');
const mobileNavHide = document.querySelector('.mobile-nav-hide');

document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
        event.preventDefault();
        mobileNavToogle();
    })
});

function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
}

document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
            mobileNavToogle();
        }
    });

});



const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
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
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });
}


// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}

const stars = document.querySelectorAll(".star");
const ratingText = document.querySelector(".selected-rating");
const averageText = document.querySelector(".average-rating");
let ratings = [];

stars.forEach(function(star) {
    star.addEventListener("click", setRating);
    star.addEventListener("mouseover", function() {
        resetStars();
        highlightStars(star.getAttribute("data-value"));
    });
    star.addEventListener("mouseout", resetStars);
});

function setRating(e) {
    const rating = parseInt(e.target.getAttribute("data-value"));
    ratings.push(rating);
    const averageRating = ratings.reduce((a, b) => a + b) / ratings.length;
    ratingText.textContent = `You rated this ${rating} stars.`;
    averageText.textContent = `Average rating: ${averageRating.toFixed(1)} stars (${ratings.length} ratings).`;
}

function resetStars() {
    stars.forEach(function(star) {
        star.classList.remove("active");
    });
}

function highlightStars(rating) {
    stars.forEach(function(star) {
        if (star.getAttribute("data-value") <= rating) {
            star.classList.add("active");
        }
    });
}


// create a modal
function mealRecipeModal(meal) {
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
        <div class = "recipe-btn">
            <a href = "${meal.strYoutube}" target = "_blank"  id = "watch-btn">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}