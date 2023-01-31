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
    <div className="carroussel-container">
      {sixCard.map((recipe, index) => (
        <div
          className="carroussel-card"
          key={ recipe.idDrink || recipe.idMeal }
          data-testid={ `${index}-recommendation-card` }
        >
          <h6
            data-testid={ `${index}-recommendation-title` }
          >
            {recipe.strDrink || recipe.strMeal}
          </h6>
          <img
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
        </div>
      ))}
    </div>
  );
}
export default Recomendation;
