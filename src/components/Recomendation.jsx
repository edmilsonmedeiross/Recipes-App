import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesProvider';
import useFetchDetail from '../hooks/useFetchDetail';

function Recomendation() {
  const history = useHistory();
  const [,, makeFetchRecomendations] = useFetchDetail();
  const { detailRecipe } = useContext(RecipesContext);

  const { recomendation } = detailRecipe.recipe;

  const route = history.location.pathname.split('/')[1];
  const sixCard = recomendation.filter((_, index) => index < +'6');

  useEffect(() => {
    const goFetch = async () => {
      await makeFetchRecomendations(route);
    };
    goFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {sixCard.map((recipe, index) => (
        <div
          key={ recipe.idDrink || recipe.idMeal }
          data-testid={ `${index}-recommendation-card` }
        >
          <h4
            data-testid={ `${index}-recommendation-title` }
          >
            {recipe.strDrink || recipe.strMeal}
          </h4>
          <img
            width={ 300 }
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
        </div>
      ))}
    </div>
  );
}
export default Recomendation;
