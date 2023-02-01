import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export const RecipesContext = createContext();

const MAX_RECIPES = 12;
const MAX_INGREDIENTS_DRINKS = 15;
const MAX_INGREDIENTS_MEALS = 20;

function RecipesProvider({ children }) {
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [detailRecipe, setDetailRecipe] = useState({ recipe: { route: '',
    id: 0,
    recipeContainer: {} } });

  const [allRecipes, setAllRecipes] = useState({ recipes: { meals: {}, drinks: {} } });

  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [displayRecipeInProgress, setDisplayRecipeInProgress] = useState({
    img: '',
    name: '',
    foodId: '',
    category: '',
    instructions: '',
    ingredients: [],
  });

  const [favoriteRecipe, setFavoriteRecipes] = useState([]);

  const history = useHistory();
  const pathName = history.location.pathname;
  const isDrink = (pathName.includes('/drinks'));

  const favoriteRecipesKey = 'favoriteRecipes';

  // Gravar no localStorage os itens setados
  const setLocalStorage = (chaveLocalStorage, objectLocalStorage) => {
    localStorage.setItem(chaveLocalStorage, JSON.stringify(objectLocalStorage));
  };

  // Busca no localStorage os itens setados
  const getLocalStorage = (chaveLocalStorage, funcao) => {
    const contentLocalStorage = JSON.parse(localStorage.getItem(chaveLocalStorage));
    if (contentLocalStorage) {
      funcao(contentLocalStorage);
    }
  };

  const addFavorite = (favorite) => {
    const favorites = [...favoriteRecipe, ...favorite];
    setFavoriteRecipes(favorites);
    setLocalStorage(favoriteRecipesKey, favorites);
  };

  const removeFavorite = (id) => {
    const favorites = favoriteRecipe.filter((favorite) => favorite.id !== id);
    setFavoriteRecipes(favorites);
    setLocalStorage(favoriteRecipesKey, [...favorites]);
  };

  const getIngredients = (object) => {
    const arrayOutput = [];
    const qtdIngredients = isDrink ? MAX_INGREDIENTS_DRINKS : MAX_INGREDIENTS_MEALS;
    for (let i = 1; i <= qtdIngredients; i += 1) {
      const ingredientName = (object[`strIngredient${i}`]);
      if (ingredientName) {
        arrayOutput.push(ingredientName);
      }
    }
    return arrayOutput;
  };

  const makeDisplayRecipes = (rec) => {
    const arrayResults = [];
    let arrayInputs = [];

    if (rec && isDrink) {
      ({ drinks: arrayInputs } = rec);
    } else {
      ({ meals: arrayInputs } = rec);
    }

    if (arrayInputs) {
      for (let i = 0; i < Math.min(MAX_RECIPES, arrayInputs.length); i += 1) {
        const object = {
          id: i,
          img: isDrink ? arrayInputs[i].strDrinkThumb : arrayInputs[i].strMealThumb,
          name: isDrink ? arrayInputs[i].strDrink : arrayInputs[i].strMeal,
          foodId: isDrink ? arrayInputs[i].idDrink : arrayInputs[i].idMeal,
        };
        arrayResults.push(object);
        setDisplayRecipes([...arrayResults]);
      }
    }
  };

  const makeRecipeInProgress = (rec) => {
    let arrayInputs = [];

    if (rec && isDrink) {
      ({ drinks: arrayInputs } = rec);
    }
    if (rec && !isDrink) {
      ({ meals: arrayInputs } = rec);
    }
    if (arrayInputs) {
      const object = {
        img: isDrink ? arrayInputs[0].strDrinkThumb : arrayInputs[0].strMealThumb,
        name: isDrink ? arrayInputs[0].strDrink : arrayInputs[0].strMeal,
        foodId: isDrink ? arrayInputs[0].idDrink : arrayInputs[0].idMeal,
        category: arrayInputs[0].strCategory,
        instructions: arrayInputs[0].strInstructions,
        ingredients: getIngredients(arrayInputs[0]),
      };
      setRecipeInProgress(arrayInputs);
      setDisplayRecipeInProgress(object);
    }
  };

  const values = useMemo(() => ({
    displayRecipes,
    makeDisplayRecipes,
    detailRecipe,
    setDetailRecipe,
    recipeInProgress,
    makeRecipeInProgress,
    displayRecipeInProgress,
    allRecipes,
    setAllRecipes,
    favoriteRecipe,
    setFavoriteRecipes,
    addFavorite,
    removeFavorite,
    setLocalStorage,
    getLocalStorage,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [displayRecipes, detailRecipe,
    recipeInProgress, displayRecipeInProgress, allRecipes, favoriteRecipe]);

  return (
    <RecipesContext.Provider
      value={ values }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
