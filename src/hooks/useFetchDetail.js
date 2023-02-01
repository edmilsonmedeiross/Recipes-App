import { useContext, useState } from 'react';
import { RecipesContext } from '../context/RecipesProvider';

function useFetchDetail() {
  const { detailRecipe, setDetailRecipe } = useContext(RecipesContext);
  const [isLoading, setIsLoading] = useState(false);

  const makeFetchDetails = (recipe) => {
    setIsLoading(true);
    const url = recipe.recipe.route === 'meals'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.recipe.id}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipe.recipe.id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setDetailRecipe({
        ...detailRecipe,
        recipe: {
          ...detailRecipe.recipe,
          recipeContainer: data.meals || data.drinks,
        },
      }));
    setIsLoading(false);
  };

  return [isLoading, makeFetchDetails];
}

export default useFetchDetail;
