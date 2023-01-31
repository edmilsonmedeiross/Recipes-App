import React, { useContext } from 'react';
import { RecipesContext } from '../context/RecipesProvider';
// import useFetchDetail from '../hooks/useFetchDetail';

function CardDetails() {
  // const [isLoading] = useFetchDetail();
  const { detailRecipe: { recipe: { recipeContainer,
    route } } } = useContext(RecipesContext);

  if (!recipeContainer || !Object.keys(recipeContainer).length) return;

  const ingredients = Object.entries(recipeContainer[0]);
  const filteredIngredients = ingredients.filter((ingredient) => ingredient[0]
    .includes('strIngredient') && ingredient[1]);

  const meassures = Object.entries(recipeContainer[0]);
  const filteredMeassures = meassures.filter((meassure) => meassure[0]
    .includes('strMeasure') && meassure[1]);

  return (
    <div>
      <h1
        data-testid="recipe-title"
      >
        {recipeContainer[0].strMeal || recipeContainer[0].strDrink}
      </h1>
      <h4
        data-testid="recipe-category"
      >
        {recipeContainer[0].strCategory || recipeContainer[0].strDrink}
        {route === 'drinks' && <p>{recipeContainer[0].strAlcoholic}</p>}
      </h4>
      {route === 'meals' && <h4>{recipeContainer[0].strTags}</h4>}
      <img
        data-testid="recipe-photo"
        width={ 400 }
        src={ recipeContainer[0].strMealThumb || recipeContainer[0].strDrinkThumb }
        alt={ recipeContainer[0].strMeal || recipeContainer[0].strDrink }
      />
      <h6
        data-testid="instructions"
      >
        {recipeContainer[0].strInstructions}
      </h6>
      {console.log(filteredIngredients)}
      {console.log(filteredMeassures)}
      {filteredIngredients.map((ing, index) => (
        <p
          key={ ing + index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ing[1]}: ${filteredMeassures[index] ? filteredMeassures[index][1] : ''}`}
        </p>
      ))}
      {route === 'meals' && (
        <iframe
          width="100%"
          height="360"
          data-testid="video"
          src={ recipeContainer[0].strYoutube.replace('watch?v=', 'embed/') }
          title="video"
        />)}
      <button
        className="start-recipe-btn"
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default CardDetails;
