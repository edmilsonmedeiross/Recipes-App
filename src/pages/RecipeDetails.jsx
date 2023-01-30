import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesProvider';
import useFetchDetail from '../hooks/useFetchDetail';

function RecipeDetails() {
  const { id: idRecipe } = useParams();
  const history = useHistory();
  const { detailRecipe, setDetailRecipe } = useContext(RecipesContext);
  const [, makeFetchDetails] = useFetchDetail();
  const firstRenderRef = useRef(true);
  const [startFetch, setStartFetch] = useState(false);

  useEffect(() => {
    const route = history.location.pathname.split('/')[1];
    setDetailRecipe({ ...detailRecipe, route, id: idRecipe });
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

  return (
    <div>
      <h1>oioioioioioi</h1>
      <h1>Testando</h1>
      <div>{idRecipe}</div>
    </div>
  );
}

export default RecipeDetails;
