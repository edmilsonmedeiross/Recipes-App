import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesProvider';
import useFetchRecipes from '../hooks/useFetchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { favoriteRecipesKey, inProgressRecipesKey,
  doneRecipesKey } from '../constants/constants';

function RecipeInProgress() {
  // Estado global
  const { displayRecipeInProgress, makeRecipeInProgress,
    isFavorite, setFavoriteRecipes, handleFavoriteProgress,
    getLocalStorage, setLocalStorage, setDoneRecipes,
    handleClickShare, isDrink, setId,
    handleFinish } = useContext(RecipesContext);

  // Estado local
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Hooks
  const { id } = useParams();
  const { makeFetch } = useFetchRecipes();
  const history = useHistory();
  const route = history.location.pathname.split('/')[1];

  // Funções
  // Função que controla os estados dos ingredientes
  const handleChange = (e) => {
    const object = {

      ...checkedIngredients,
      [e.target.name]: e.target.checked,
    };
    setCheckedIngredients(object);
    setLocalStorage(inProgressRecipesKey, object);
  };

  // Função que  chama a API
  const getDetails = async () => {
    let endpointDetails = '';

    if (isDrink) {
      endpointDetails = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
      endpointDetails = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const recipesResults = await makeFetch(endpointDetails);
    makeRecipeInProgress(recipesResults);
  };

  // Função que verifica os ingredients
  const isChecked = () => {
    if (displayRecipeInProgress) {
      return displayRecipeInProgress.ingredients
        .every((ingredient) => checkedIngredients[ingredient]);
    }
    return false;
  };

  // UseEffect
  useEffect(() => {
    setId(id);
    getDetails();
    getLocalStorage(inProgressRecipesKey, setCheckedIngredients);
    getLocalStorage(favoriteRecipesKey, setFavoriteRecipes);
    getLocalStorage(doneRecipesKey, setDoneRecipes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="recipe-in-progress">
      { displayRecipeInProgress && (
        <>
          <h1
            data-testid="recipe-title"
          >
            { displayRecipeInProgress.name }
          </h1>
          <img
            src={ displayRecipeInProgress.img }
            alt="receita"
            data-testid="recipe-photo"
          />
<<<<<<< HEAD
          <button
            type="button"
            data-testid="share-btn"
            value="share"
            onClick={ handleClickShare }
          >
            Share
            {linkCopied && (<div>Link copied!</div>) }
=======
          <div
            data-testid="recipe-title"
          >
            { displayRecipeInProgress.name }
          </div>
          <button
            data-testid="share-btn"
            onClick={ (event) => handleClickShare(event, id, route) }
          >
            compartilhar
>>>>>>> d2f8873ec557668dff371271f5b61adfd679f413
          </button>
          <button
            data-testid="favorite-btn"
            onClick={ handleFavoriteProgress }
            src={ isFavorite() ? blackHeartIcon : whiteHeartIcon }
          >
            Favorites
          </button>
          <h4
            data-testid="recipe-category"
          >
            { displayRecipeInProgress.category }
          </h4>
          <h3>Ingredients</h3>
          <fieldset>
            { displayRecipeInProgress.ingredients
              .map((ingredient, index) => (
                <label
                  htmlFor="ingredient"
                  data-testid={ `${index}-ingredient-step` }
                  key={ index }
                  className={ checkedIngredients[ingredient]
                    ? 'text-decoration'
                    : undefined }
                >
                  { ingredient }
                  <input
                    type="checkbox"
                    name={ ingredient }
                    onChange={ handleChange }
                    checked={ checkedIngredients[ingredient] || false }
                  />
                </label>))}
          </fieldset>
          <h3>Instructions</h3>
          <div
            className="instructions"
            data-testid="instructions"
          >
            { displayRecipeInProgress.instructions }
          </div>
          <button
            className="finish-recipe-btn"
            type="button"
            data-testid="finish-recipe-btn"
            value="finalizar"
            disabled={ !isChecked() }
<<<<<<< HEAD
          >
            Finalizar
          </button>
=======
            onClick={ handleFinish }
          />
>>>>>>> d2f8873ec557668dff371271f5b61adfd679f413
        </>
      )}
    </div>
  );
}

export default RecipeInProgress;
