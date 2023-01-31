import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CardDetails from '../components/CardDetails';
import { RecipesContext } from '../context/RecipesProvider';
import useFetchDetail from '../hooks/useFetchDetail';

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
  }, [startFetch]);

  if (isLoading || !Object.keys(detailRecipe).length) {
    console.log(isLoading);
    return <h2>Carregando...</h2>;
  }

  return (
    <div>
      {isLoading && <h2>Carregando...</h2>}
      <h1>oioioioioioi</h1>
      <h1>Testando</h1>
      <CardDetails />
      <div>{idRecipe}</div>
    </div>
  );
}

export default RecipeDetails;
