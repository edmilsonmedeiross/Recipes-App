import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesProvider';

function CardDetails() {
  const history = useHistory();
  const [isHidenToo, setIsHidenToo] = useState(false);

  const { detailRecipe: { recipe: { recipeContainer,
    route, id } } } = useContext(RecipesContext);

  const isHidden = () => {
    const contentLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (contentLocalStorage.length) {
      setIsHidenToo(contentLocalStorage.find((rec) => rec.id === id));
    }
    setIsHidenToo(false);
  };

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }

    isHidden();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!recipeContainer || !Object.keys(recipeContainer).length) return;

  const ingredients = Object.entries(recipeContainer[0]);
  const filteredIngredients = ingredients.filter((ingredient) => ingredient[0]
    .includes('strIngredient') && ingredient[1]);

  const meassures = Object.entries(recipeContainer[0]);
  const filteredMeassures = meassures.filter((meassure) => meassure[0]
    .includes('strMeasure') && meassure[1]);

  return (
    <div className="card-details">
      <h1
        data-testid="recipe-title"
      >
        {recipeContainer[0].strMeal || recipeContainer[0].strDrink}
      </h1>
      <img
        data-testid="recipe-photo"
        width={ 400 }
        src={ recipeContainer[0].strMealThumb || recipeContainer[0].strDrinkThumb }
        alt={ recipeContainer[0].strMeal || recipeContainer[0].strDrink }
      />
      <h4
        data-testid="recipe-category"
      >
        {recipeContainer[0].strCategory || recipeContainer[0].strDrink}
        {route === 'drinks' && recipeContainer[0].strAlcoholic}
      </h4>
      {route === 'meals' && <h4>{recipeContainer[0].strTags}</h4>}
      <h6
        data-testid="instructions"
      >
        {recipeContainer[0].strInstructions}
      </h6>
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
        onClick={ () => history.push(`/${route}/${id}/in-progress`) }
        hidden={ isHidenToo }
      >
        Continue Recipe
      </button>
    </div>
  );
}

export default CardDetails;
