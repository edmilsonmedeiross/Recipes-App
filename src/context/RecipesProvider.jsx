import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { MAX_RECIPES, MAX_INGREDIENTS_DRINKS, MAX_INGREDIENTS_MEALS, favoriteRecipesKey,
  doneRecipesKey, defDisplayRIP, defDetailRecipe } from '../constants/constants';

// Criação do contexto
export const RecipesContext = createContext();

// Criação do provider
function RecipesProvider({ children }) {
  // Hooks
  const history = useHistory();
  const pathName = history.location.pathname;
  const isDrink = (pathName.includes('/drinks'));

  // Estados do contexto
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [displayRecipeInProgress, setDisplayRecipeInProgress] = useState(defDisplayRIP);
  const [favoriteRecipe, setFavoriteRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [detailRecipe, setDetailRecipe] = useState(defDetailRecipe);
  const [doneRecipes, setDoneRecipes] = useState([]);

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

  const getNow = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    return today.toISOString();
  };

  // Adiciona favorito ao estado e localStorage
  const addFavorite = (ref) => {
    const newFavorite = [{
      id: isDrink ? ref.idDrink : ref.idMeal,
      type: isDrink ? 'drink' : 'meal',
      nationality: ref.strArea || '',
      category: ref.strCategory,
      alcoholicOrNot: isDrink ? ref.strAlcoholic : '',
      name: isDrink ? ref.strDrink : ref.strMeal,
      image: isDrink
        ? ref.strDrinkThumb
        : ref.strMealThumb,
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

  // Adiciona favorito ao estado e localStorage
  const addDoneRecipe = (ref) => {
    const newDone = [{
      id: isDrink ? ref.idDrink : ref.idMeal,
      nationality: ref.strArea || '',
      name: isDrink ? ref.strDrink : ref.strMeal,
      category: ref.strCategory,
      image: isDrink
        ? ref.strDrinkThumb
        : ref.strMealThumb,
      tags: ref.strTags ? ref.strTags.split(',') : [],
      alcoholicOrNot: isDrink ? ref.strAlcoholic : '',
      type: isDrink ? 'drink' : 'meal',
      doneDate: getNow(),
    }];
    const doneRecipesArray = [...doneRecipes, ...newDone];
    setDoneRecipes(doneRecipesArray);
    setLocalStorage(doneRecipesKey, doneRecipesArray);
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
  const handleClickShare = ({ target }, idShare, typeFood) => {
    const { location: { origin } } = window;
    navigator.clipboard.writeText(`${origin}/${typeFood}/${idShare}`);
    target.textContent = 'Link copied!';
  };

  // Função que determina se a receita atual é favorita
  const isFavorite = (idFav) => {
    if (favoriteRecipe) {
      const haveFavorite = favoriteRecipe
        .some((favorite) => (Number(favorite.id) === Number(idFav)));
      return haveFavorite;
    }
    return false;
  };

  // Função para setar favorito localStorage
  const handleFavorite = (ref) => {
    // Pega id do objeto
    const idFav = isDrink ? ref.idDrink : ref.idMeal;
    // Verifica se ele já e um favorito
    const thisFavorite = isFavorite(idFav);

    if (thisFavorite) {
      removeFavorite(idFav);
    } else {
      addFavorite(ref);
    }
  };

  // Função para setar favorito localStorage
  const handleFinish = () => {
    addDoneRecipe(recipeInProgress[0]);
    history.push('/done-recipes');
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
    handleFavorite,
    setLocalStorage,
    getLocalStorage,
    handleClickShare,
    isFavorite,
    isDrink,
    handleFinish,
    doneRecipes,
    setDoneRecipes,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [displayRecipes, detailRecipe,
    recipeInProgress, displayRecipeInProgress,
    allRecipes, favoriteRecipe, doneRecipes]);

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
