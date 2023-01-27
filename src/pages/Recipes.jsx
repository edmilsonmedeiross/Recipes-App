import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFetchRecipes from '../hooks/useFetchRecipes';
import RecipeCard from '../components/RecipeCard';
import '../styles/recipes.css';

function Recipes(props) {
  const { location: { pathname } } = props;
  const isDrink = (pathname === '/drinks');

  const MAX_RECIPES = 12;
  const MAX_CATEGORIES = 5;

  const { makeFetch } = useFetchRecipes();
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [displayCategories, setDisplayCategories] = useState([]);
  const [toogleButtons, setToogleButton] = useState({});

  const makeDisplayRecipes = (rec) => {
    const arrayResults = [];
    let arrayInputs = [];
    if (isDrink) {
      ({ drinks: arrayInputs } = rec);
    } else {
      ({ meals: arrayInputs } = rec);
    }

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
  };

  const categories = (cat) => {
    const arrayResults = ['All'];
    let arrayInputs = [];

    if (isDrink) {
      ({ drinks: arrayInputs } = cat);
    } else {
      ({ meals: arrayInputs } = cat);
    }
    for (let i = 0; i < MAX_CATEGORIES; i += 1) {
      const element = arrayInputs[i].strCategory;
      arrayResults.push(element);
    }
    setDisplayCategories(arrayResults);
  };

  const getRecipes = async (url) => {
    const recipesResults = await makeFetch(url);
    makeDisplayRecipes(recipesResults);
  };

  const getCategories = async (url) => {
    const categoriesResults = await makeFetch(url);
    categories(categoriesResults);
  };

  const getEndpoint = (category) => {
    let endpoint = '';
    let epCategories = '';
    let endpointFiltered = '';

    if (isDrink) {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      epCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      endpointFiltered = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    } else {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      epCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      endpointFiltered = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }

    return ({
      endpoint,
      epCategories,
      endpointFiltered,
    });
  };

  const onCategoryClick = (category) => {
    let endpointFinal = '';
    if (category === 'All' || toogleButtons[category]) {
      ({ endpoint: endpointFinal } = getEndpoint(category));
    } else {
      ({ endpointFiltered: endpointFinal } = getEndpoint(category));
    }
    getRecipes(endpointFinal);
    setToogleButton({ [category]: !toogleButtons[category] });
  };

  const redirectRecipeDetails = (idCard) => {
    if (isDrink) {
      return (`/drinks/${idCard}`);
    }
    return (`/meals/${idCard}`);
  };

  useEffect(() => {
    const { endpoint, epCategories } = getEndpoint();
    getCategories(epCategories);
    getRecipes(endpoint);
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
            className="buttonCategoriesOff"
            value={ displayCategorie }
            type="button"
            onClick={ ({ target }) => onCategoryClick(target.value) }
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
          redirectRoute={ redirectRecipeDetails(displayRecipe.foodId) }
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
