import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export const RecipesContext = createContext();

const MAX_RECIPES = 12;

function RecipesProvider({ children }) {
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const history = useHistory();
  const pathName = history.location.pathname;
  const isDrink = (pathName === '/drinks');

  const makeDisplayRecipes = (rec) => {
    console.log('chamou');
    console.log(rec);
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
        setDisplayRecipes(arrayResults);
      }
    }
  };

  const values = useMemo(() => ({
    displayRecipes,
    makeDisplayRecipes,
  }), [displayRecipes]);

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
