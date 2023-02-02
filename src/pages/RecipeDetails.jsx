import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesProvider';
import CardDetails from '../components/cardDetaisl';
import useFetchDetail from '../hooks/useFetchDetail';
import Recomendation from '../components/Recomendation';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  // Estado global
  const { detailRecipe, setDetailRecipe, getLocalStorage,
    isFavorite, setFavoriteRecipes, handleFavorite,
  } = useContext(RecipesContext);

  // Estado local
  const [isLoading, makeFetchDetails] = useFetchDetail();
  const firstRenderRef = useRef(true);
  const [startFetch, setStartFetch] = useState(false);

  // Importação hooks
  const { id: idRecipe } = useParams();
  const history = useHistory();
  const route = history.location.pathname.split('/')[1];

  // Constantes
  const favoriteRecipesKey = 'favoriteRecipes';

  // UseEffect
  useEffect(() => {
    getLocalStorage(favoriteRecipesKey, setFavoriteRecipes);
    setDetailRecipe({ ...detailRecipe,
      recipe: { ...detailRecipe.recipe, route, id: idRecipe } });

    setStartFetch(!startFetch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRecipe]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    const goFetch = async () => {
      await makeFetchDetails(detailRecipe);
    };
    goFetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startFetch]);

  if (isLoading || !Object.keys(detailRecipe).length) {
    return <h2>Carregando...</h2>;
  }

  return (
    <div>
      {isLoading && <h2>Carregando...</h2>}
      <CardDetails />
      <button
        type="button"
        data-testid="share-btn"
        title="oi"
        onClick={ ({ target }) => {
          const { location: { origin } } = window;
          navigator.clipboard.writeText(`${origin}/${route}/${idRecipe}`);
          target.textContent = 'Link copied!';
          global.alert('Link copied!');
        } }
      >
        Share
      </button>
      <button
        data-testid="favorite-btn"
        onClick={ () => handleFavorite(detailRecipe.recipe.recipeContainer[0]) }
        src={ isFavorite() ? blackHeartIcon : whiteHeartIcon }
      >
        Favorite
      </button>
      {/* <button
         // type="button"
         // data-testid="favorite-btn"
        // onClick={ () => {
        //   const { recipe } = detailRecipe;
        //   const { strArea, strCategory, strAlcoholic } = recipe.recipeContainer[0];
        //   const favorite = {
        //     id: recipe.id,
        //     type: route.substring(0, route.length - 1),
        //     nationality: strArea || '',
        //     category: strCategory || '',
        //     alcoholicOrNot: strAlcoholic || '',
        //     name: recipe.recipeContainer[0].strDrink
        //       || recipe.recipeContainer[0].strMeal,
        //     image: recipe.recipeContainer[0].strDrinkThumb
        //       || recipe.recipeContainer[0].strMealThumb,
        //   };
        //   const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
        //   if (favoriteRecipes) {
        //     const isFavorite = favoriteRecipes.some((item) => item.id === recipe.id);
        //     if (isFavorite) {
        //       const newFavoriteRecipes = favoriteRecipes.filter(
        //         (item) => item.id !== recipe.id,
        //       );
        //       localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
        //     } else {
        //       localStorage.setItem('favoriteRecipes', JSON.stringify(
        //         [...favoriteRecipes, favorite],
        //       ));
        //     }
        //   } else {
        //     localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
        //   }
        // } }
        //
        //>
        //Favorite
        //</button> */}
      <Recomendation />
      <div>{idRecipe}</div>
    </div>
  );
}

export default RecipeDetails;
