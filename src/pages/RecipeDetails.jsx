import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesProvider';
import CardDetails from '../components/cardDetaisl';
import useFetchDetail from '../hooks/useFetchDetail';
import Recomendation from '../components/Recomendation';

function RecipeDetails() {
  const { id: idRecipe } = useParams();
  const history = useHistory();
  const { detailRecipe, setDetailRecipe } = useContext(RecipesContext);
  const [isLoading, makeFetchDetails] = useFetchDetail();
  const firstRenderRef = useRef(true);
  const [startFetch, setStartFetch] = useState(false);

  useEffect(() => {
    const route = history.location.pathname.split('/')[1];

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
      <Recomendation />
      <div>{idRecipe}</div>
    </div>
  );
}

export default RecipeDetails;
