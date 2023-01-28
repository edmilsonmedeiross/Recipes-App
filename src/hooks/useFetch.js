import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecipesContext } from '../context/RecipesProvider';
import { SearchBarContext } from '../context/SearchBarProvider';

function useFetch() {
  const { makeDisplayRecipes } = useContext(RecipesContext);
  const { setDataApi } = useContext(SearchBarContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  console.log(history.location.pathname);

  const makeFetch = (value, type) => {
    if (type === 'f' && value.length >= 2) {
      return global.alert('Your search must have only 1 (one) character');
    }

    setIsLoading(true);
    const url = history.location.pathname.includes('meals')
      ? 'https://www.themealdb.com/api/json/v1/1/'
      : 'https://www.thecocktaildb.com/api/json/v1/1/';
    const customUrl = type === 'i'
      ? `${url}filter.php?${type}=${value}`
      : `${url}search.php?${type}=${value}`;
    console.log(customUrl);
    fetch(customUrl)
      .then((response) => response.json())
      .then((result) => {
        setDataApi(result);
        makeDisplayRecipes(result);
      });
    setIsLoading(false);
  };

  return [isLoading, makeFetch];
}

export default useFetch;
