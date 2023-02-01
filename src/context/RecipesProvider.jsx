import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';

// Criação do contexto
export const RecipesContext = createContext();

// Constantes
const MAX_RECIPES = 12;
const MAX_INGREDIENTS_DRINKS = 15;
const MAX_INGREDIENTS_MEALS = 20;
const favoriteRecipesKey = 'favoriteRecipes';
const defDisplayRIP = {
  img: '',
  name: '',
  foodId: '',
  category: '',
  instructions: '',
  ingredients: [],
};
const defDetailRecipe = { recipe: { route: '',
  id: 0,
  recipeContainer: {},
  recomendation: [] } };

// Criação do provider
function RecipesProvider({ children }) {
  // Hooks
  const history = useHistory();
  const pathName = history.location.pathname;
  const isDrink = (pathName.includes('/drinks'));

  // Estados do contexto
  const [id, setId] = useState(0);
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [displayRecipeInProgress, setDisplayRecipeInProgress] = useState(defDisplayRIP);
  const [favoriteRecipe, setFavoriteRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [detailRecipe, setDetailRecipe] = useState(defDetailRecipe);
  const [linkCopied, setLinkCopied] = useState(false);

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

  // Adiciona favorito ao estado e localStorage
  const addFavorite = () => {
    const newFavorite = [{
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
    const favorites = [...favoriteRecipe, ...newFavorite];
    setFavoriteRecipes(favorites);
    setLocalStorage(favoriteRecipesKey, favorites);
  };

  // Remove favorito do estado e do localStorage
  const removeFavorite = (idFavorite) => {
    const favorites = favoriteRecipe.filter((favorite) => favorite.id !== idFavorite);
    setFavoriteRecipes(favorites);
    setLocalStorage(favoriteRecipesKey, [...favorites]);
  };

  // Pega os ingredientes do objeto e transforma em array
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

  // Pega o objeto retornado pela api e gera objeto para renderização
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

  // Pega o objeto retornado pela api e gera objeto para renderização
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

  // Função para copiar link para clipboard
  const handleClickShare = () => {
    const currentUrl = `http://localhost:3000${pathName}`;
    const url = currentUrl.replace('/in-progress', '');
    copy(url);
    setLinkCopied(true);
  };

  // Função que determina se a receita atual é favorita
  const isFavorite = () => {
    if (favoriteRecipe) {
      return favoriteRecipe
        .some((favorite) => (Number(favorite.id) === Number(id)));
    }
    return false;
  };

  // Função para setar favorito localStorage
  const handleClickFavorite = () => {
    const thisFavorite = isFavorite();
    if (thisFavorite) {
      removeFavorite(id);
    } else {
      addFavorite();
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
    handleClickFavorite,
    setLocalStorage,
    getLocalStorage,
    handleClickShare,
    isFavorite,
    linkCopied,
    isDrink,
    setId,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [displayRecipes, detailRecipe,
    recipeInProgress, displayRecipeInProgress,
    allRecipes, favoriteRecipe, linkCopied]);

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
