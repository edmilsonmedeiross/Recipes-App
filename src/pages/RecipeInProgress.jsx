import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesProvider';
import useFetchRecipes from '../hooks/useFetchRecipes';

function RecipeInProgress() {
  // Estado global
  const { displayRecipeInProgress, makeRecipeInProgress } = useContext(RecipesContext);

  // Estado local
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Hooks
  const history = useHistory();
  const { id } = useParams();
  const { makeFetch } = useFetchRecipes();

  // Variaveis
  const pathName = history.location.pathname;
  const isDrink = (pathName.includes('/drinks'));

  // Funções
  // Função que controla os estados do formulário
  const handleChange = (e) => {
    setCheckedIngredients({
      ...checkedIngredients,
      [e.target.name]: e.target.checked,
    });
  };

  const getEndpoint = (idEndpoint) => {
    let endpointDetails = '';

    if (isDrink) {
      endpointDetails = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idEndpoint}`;
    } else {
      endpointDetails = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idEndpoint}`;
    }
    return endpointDetails;
  };

  const getDetails = async (url) => {
    const recipesResults = await makeFetch(url);
    makeRecipeInProgress(recipesResults);
  };

  // UseEffect;
  useEffect(() => {
    const endpoint = getEndpoint(id);
    getDetails(endpoint);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      { displayRecipeInProgress && (
        <>
          <img
            src={ displayRecipeInProgress.img }
            alt="receita"
            data-testid="recipe-photo"
          />
          <div
            data-testid="recipe-title"
          >
            { displayRecipeInProgress.name }
          </div>
          <input
            type="button"
            data-testid="share-btn"
            value="compartilhar"
          />
          <input
            type="button"
            data-testid="favorite-btn"
            value="favoritar"
          />
          <div
            data-testid="recipe-category"
          >
            { displayRecipeInProgress.category }
          </div>
          { displayRecipeInProgress.ingredients
            .map((ingredient, index) => (
              <label
                htmlFor="ingredient"
                data-testid={ `${index}-ingredient-step` }
                key={ index }
                className={ checkedIngredients[ingredient]
                  ? 'textDecoration'
                  : undefined }
              >
                { ingredient }
                <input
                  type="checkbox"
                  name={ ingredient }
                  onClick={ handleChange }
                />
              </label>))}
          <div
            data-testid="instructions"
          >
            { displayRecipeInProgress.instructions }
          </div>
          <input
            type="button"
            data-testid="finish-recipe-btn"
            value="finalizar"
          />
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;
