import { useContext, useState } from 'react';
import { RecipesContext } from '../context/RecipesProvider';

function useFetchDetail() {
  const { setDetailRecipe } = useContext(RecipesContext);
  const [isLoading, setIsLoading] = useState(false);

  const makeFetchDetails = (recipe) => {
    setIsLoading(true);
    const url = recipe.recipe.route === 'meals'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.recipe.id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipe.recipe.id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setDetailRecipe((prevState) => ({
        ...prevState,
        recipe: {
          ...prevState.recipe,
          recipeContainer: data.meals || data.drinks,
        },
      })));
    setIsLoading(false);
  };

  const makeFetchRecomendations = (route) => {
    setIsLoading(true);
    const url = route === 'meals'
      ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
      : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setDetailRecipe((prevState) => ({
        ...prevState,
        recipe: {
          ...prevState.recipe,
          recomendation: data.meals || data.drinks,
        },
      })));
    setIsLoading(false);
  };

  return [isLoading, makeFetchDetails, makeFetchRecomendations];
}

export default useFetchDetail;
