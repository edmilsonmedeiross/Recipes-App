import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import { RecipesContext } from '../context/RecipesProvider';
import useFetchRecipes from '../hooks/useFetchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  // Estado global
  const { recipeInProgress, displayRecipeInProgress, makeRecipeInProgress,
    favoriteRecipe, addFavorite, setFavoriteRecipes, removeFavorite,
    setLocalStorage, getLocalStorage } = useContext(RecipesContext);

  // Estado local
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [linkCopied, setLinkCopied] = useState(false);

  // Hooks
  const history = useHistory();
  const { id } = useParams();
  const { makeFetch } = useFetchRecipes();

  // Variaveis
  const pathName = history.location.pathname;
  const isDrink = (pathName.includes('/drinks'));
  const inProgressRecipesKey = 'inProgressRecipes';
  const favoriteRecipesKey = 'favoriteRecipes';

  // Funções
  // Função que controla os estados do formulário
  const handleChange = (e) => {
    const object = {

      ...checkedIngredients,
      [e.target.name]: e.target.checked,
    };
    setCheckedIngredients(object);
    setLocalStorage(inProgressRecipesKey, object);
  };

  // Função para copiar link para clipboard
  const handleClickShare = () => {
    const currentUrl = `http://localhost:3000${pathName}`;
    const url = currentUrl.replace('/in-progress', '');
    copy(url);
    setLinkCopied(true);
  };

  const isFavorite = (idRef) => {
    if (favoriteRecipe) {
      return favoriteRecipe
        .some((favorite) => (Number(favorite.id) === Number(idRef)));
    }
    return false;
  };

  // Função para setar favorito localStorage
  const handleClickFavorite = () => {
    if (recipeInProgress) {
      let newFavorite = [];
      newFavorite = [{
        id: isDrink ? recipeInProgress[0].idDrink : recipeInProgress[0].idMeal,
        type: isDrink ? 'drink' : 'meal',
        nationality: recipeInProgress[0].strArea || '',
        category: recipeInProgress[0].strCategory,
        alcoholicOrNot: isDrink ? recipeInProgress[0].strAlcoholic : '',
        name: isDrink ? recipeInProgress[0].strDrink : recipeInProgress[0].strMeal,
        image: isDrink
          ? recipeInProgress[0].strDrinkThumb
          : recipeInProgress[0].strMealThumb,
      }];
      const thisFavorite = isFavorite(id);
      if (thisFavorite) {
        removeFavorite(id);
      } else {
        addFavorite(newFavorite);
      }
    }
  };

  // Função que pega o endpoint
  const getEndpoint = (idEndpoint) => {
    let endpointDetails = '';

    if (isDrink) {
      endpointDetails = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idEndpoint}`;
    } else {
      endpointDetails = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idEndpoint}`;
    }
    return endpointDetails;
  };

  // Função que  chama a API
  const getDetails = async (url) => {
    const recipesResults = await makeFetch(url);
    makeRecipeInProgress(recipesResults);
  };

  const handleHeart = () => {
    if (displayRecipeInProgress) {
      return isFavorite(displayRecipeInProgress.foodId);
    }
  };

  // UseEffect
  useEffect(() => {
    const endpoint = getEndpoint(id);
    getDetails(endpoint);
    getLocalStorage(inProgressRecipesKey, setCheckedIngredients);
    getLocalStorage(favoriteRecipesKey, setFavoriteRecipes);
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
            onClick={ handleClickShare }
          />
          { linkCopied && (<div>Link copied!</div>) }
          <button
            data-testid="favorite-btn"
            onClick={ handleClickFavorite }
            src={ handleHeart() ? blackHeartIcon : whiteHeartIcon }
          >
            favoritar
          </button>
          {/* <input
            type="button"
            data-testid="favorite-btn"
            value="favoritar"
            onClick={ handleClickFavorite }
          > */}
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
                  onChange={ handleChange }
                  checked={ checkedIngredients[ingredient] || false }
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
