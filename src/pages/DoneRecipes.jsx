import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { doneRecipesKey } from '../constants/constants';
import { RecipesContext } from '../context/RecipesProvider';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  // Estado local
  const [doneRecipesFiltered, setDoneRecipesFiltered] = useState([]);

  // Estado global
  const { doneRecipes, handleClickShare,
    getLocalStorage, setDoneRecipes,
  } = useContext(RecipesContext);

  // Função
  const filter = ({ target: { value } }) => {
    if (value !== 'all') {
      const doneRecipesFilter = doneRecipes
        .filter((recipe) => (recipe.type === value));
      setDoneRecipesFiltered([...doneRecipesFilter]);
    } else {
      setDoneRecipesFiltered([...doneRecipes]);
    }
  };

  // UseEffect
  useEffect(() => {
    getLocalStorage(doneRecipesKey, setDoneRecipes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDoneRecipesFiltered([...doneRecipes]);
  }, [doneRecipes]);

  return (
    <div>
      <Header
        isSearchIcon={ false }
        title="Done Recipes"
      />

      { doneRecipesFiltered && doneRecipesFiltered.map((doneRecipe, index) => (
        <div
          key={ index }
        >
          <div
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${doneRecipe.nationality} - ${doneRecipe.category}` }
            { doneRecipe.alcoholicOrNot && `- ${doneRecipe.alcoholicOrNot}`}
          </div>
          <Link to={ `/${doneRecipe.type}s/${doneRecipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ doneRecipe.image }
              alt="receita concluida"
            />
            <div
              data-testid={ `${index}-horizontal-name` }
            >
              { doneRecipe.name }
            </div>
          </Link>
          <div
            data-testid={ `${index}-horizontal-done-date` }
          >
            { doneRecipe.doneDate }
          </div>
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ (event) => handleClickShare(
              event,
              doneRecipe.id,
              `${doneRecipe.type}s`,
            ) }
          >
            Share
          </button>
          <div>
            { doneRecipe.tags.map((tag) => (
              <div
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </div>
            )) }
          </div>
        </div>
      )) }
    </div>
  );
}

export default DoneRecipes;
