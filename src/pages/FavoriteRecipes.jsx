import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { favoriteRecipesKey } from '../constants/constants';
import { RecipesContext } from '../context/RecipesProvider';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  // Estado local
  const [favoriteRecipesFiltered, setFavoriteRecipesFiltered] = useState([]);

  // Estado global
  const { favoriteRecipe, handleClickShare, handleFavorite,
    getLocalStorage, setFavoriteRecipes, isFavorite,
  } = useContext(RecipesContext);

  // Função
  const filter = ({ target: { value } }) => {
    if (value !== 'all') {
      const favoriteRecipeFilter = favoriteRecipe
        .filter((recipe) => (recipe.type === value));
      setFavoriteRecipesFiltered([...favoriteRecipeFilter]);
    } else {
      setFavoriteRecipesFiltered([...favoriteRecipe]);
    }
  };

  // UseEffect
  useEffect(() => {
    getLocalStorage(favoriteRecipesKey, setFavoriteRecipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFavoriteRecipesFiltered([...favoriteRecipe]);
  }, [favoriteRecipe]);

  return (
    <div>
      <Header
        isSearchIcon={ false }
        title="Favorite Recipes"
      />
      <button
        data-testid="filter-by-all-btn"
        value="all"
        onClick={ filter }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        value="meal"
        onClick={ filter }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        value="drink"
        onClick={ filter }
      >
        Drinks
      </button>
      { favoriteRecipesFiltered && favoriteRecipesFiltered
        .map((recipe, index) => (
          <div
            key={ index }
          >
            <div
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}` }
              { recipe.alcoholicOrNot && `- ${recipe.alcoholicOrNot}`}
            </div>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt="receita concluida"
              />
              <div
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </div>
            </Link>
            <button
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ (event) => handleClickShare(
                event,
                recipe.id,
                `${recipe.type}s`,
              ) }
            >
              Share
            </button>
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => handleFavorite(recipe) }
              src={ isFavorite() ? blackHeartIcon : whiteHeartIcon }
            >
              favoritar
            </button>
            {console.log(recipe)}
          </div>
        )) }
    </div>
  );
}

export default FavoriteRecipes;
