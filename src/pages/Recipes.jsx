import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useFetchRecipes from '../hooks/useFetchRecipes';
import RecipeCard from '../components/RecipeCard';
import '../styles/recipes.css';
import { RecipesContext } from '../context/RecipesProvider';

function Recipes() {
  const history = useHistory();

  const pathName = history.location.pathname;
  const isDrink = (pathName === '/drinks');

  const MAX_CATEGORIES = 5;

  const { makeFetch } = useFetchRecipes();
  const { displayRecipes, makeDisplayRecipes } = useContext(RecipesContext);
  const [displayCategories, setDisplayCategories] = useState([]);
  const [toogleButtons, setToogleButton] = useState({});

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

export default Recipes;
