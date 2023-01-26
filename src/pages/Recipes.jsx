import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFetchRecipes from '../hooks/useFetchRecipes';
import RecipeCard from '../components/RecipeCard';

function Recipes(props) {
  const { location: { pathname } } = props;
  const isDrink = (pathname === '/drinks');

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  const { makeFetch } = useFetchRecipes();
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);

  const cards = (rec) => {
    const arrayResults = [];
    let arrayInputs = [];
    if (isDrink) {
      ({ drinks: arrayInputs } = rec);
    } else {
      ({ meals: arrayInputs } = rec);
    }

    if (rec) {
      for (let i = 0; i < MAX_RECIPES; i += 1) {
        const object = {
          id: i,
          img: isDrink ? arrayInputs[i].strDrinkThumb : arrayInputs[i].strMealThumb,
          name: isDrink ? arrayInputs[i].strDrink : arrayInputs[i].strMeal,
        };
        arrayResults.push(object);
      }
      setDisplayRecipes(arrayResults);
    }
  };

  const categories = (cat) => {
    const arrayResults = ['All'];
    let arrayInputs = [];

    if (isDrink) {
      ({ drinks: arrayInputs } = cat);
    } else {
      ({ meals: arrayInputs } = cat);
    }

    if (cat) {
      for (let i = 0; i < MAX_CATEGORIES; i += 1) {
        const element = arrayInputs[i].strCategory;
        arrayResults.push(element);
      }
      setDisplayCategories(arrayResults);
    }
  };

  useEffect(() => {
    let endpoint = '';
    let epCategories = '';

    if (isDrink) {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      epCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    } else {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      epCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    }

    const getRecipes = async (url) => {
      const recipesResults = await makeFetch(url);
      cards(recipesResults);
    };

    const getCategories = async (url) => {
      const categoriesResults = await makeFetch(url);
      categories(categoriesResults);
    };

    getRecipes(endpoint);
    getCategories(epCategories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrink]);

  return (
    <div>
      <Header
        isSearchIcon
        title={ isDrink ? 'Drinks' : 'Meals' }
      />
      <main className="recipes">
        { displayCategories.map((displayCategorie, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${displayCategorie}-category-filter` }
          >
            { displayCategorie }
          </button>)) }
        { displayRecipes.map((displayRecipe, index) => (<RecipeCard
          key={ index }
          index={ index }
          id={ displayRecipe.id }
          img={ displayRecipe.img }
          name={ displayRecipe.name }
        />)) }
      </main>
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipes;
