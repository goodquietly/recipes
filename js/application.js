const updateRecipeButton = document.getElementById('update-recipe');
const recipeContainer = document.getElementById('recipe');

const getRecipe = () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((data) => updateRecipe(data.meals[0]));
};

const updateRecipe = (recipe) => {
  console.log(recipe);

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];

    if (ingredient) {
      ingredients.push(`<li>${ingredient} - ${recipe[`strMeasure${i}`]}</li>`);
    } else {
      break;
    }
  }

  recipeContainer.innerHTML = `
  <h2 class="mb-1">${recipe.strMeal}a</h2>
  
  <div class="row">
  <div class="column mb-1">    
    <img src=${recipe.strMealThumb} alt="${
    recipe.strMeal
  }a" class="img mt-1 mb-1">
    <h3 class="mt-1 mb-1">Ingredients</h3>
    <ul>
      ${ingredients.join('')}
    </ul>
  </div>

  <div class="column mb-1">
    <iframe class="mt-1 mb-1" width="420" height="315"
      src=${recipe.strYoutube.replace(/watch\?v\=/g, 'embed/')}>
    </iframe>
    <h3 class="mt-1 mb-1">Instructions</h3>
    <p>${recipe.strInstructions.replace(/\r\n/g, '</p><p>')}</p>
  </div>
  </div>
  `;
};

updateRecipeButton.addEventListener('click', getRecipe);

getRecipe();
