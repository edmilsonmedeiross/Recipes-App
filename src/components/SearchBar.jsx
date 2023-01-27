import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { SearchBarContext } from '../context/SearchBarProvider';

function SearchBar() {
  const [, makeFetch] = useFetch();
  const history = useHistory();

  const { optionSearch, setOptionSearch, nameSearch, setNameSearch,
    startFetch, setStartFetch, dataApi } = useContext(SearchBarContext);

  const goFetch = async () => {
    await makeFetch(nameSearch, optionSearch.id);
  };

  useEffect(() => {
    console.log(dataApi);
    const keys = Object.keys(dataApi)[0];
    const recipe = dataApi[keys];
    if (recipe.length === 1) {
      const id = recipe[0].idDrink || recipe[0].idMeal;
      history.push(`/${keys}/${id}`);
    }
  }, [dataApi]);

  const handleChange = ({ target: { value, id, type } }) => {
    if (type === 'text') {
      return setNameSearch(value);
    }
    return setOptionSearch(
      { ...optionSearch,
        option: value,
        id },
    );
  };

  const handleClick = async () => {
    setStartFetch(!startFetch);
    await goFetch();
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        name="searchText"
        value={ nameSearch }
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">
        ingredient
        <input
          type="radio"
          name="searchType"
          id="i"
          data-testid="ingredient-search-radio"
          value="ingrediente"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="name">
        name
        <input
          type="radio"
          name="searchType"
          id="s"
          data-testid="name-search-radio"
          value="nome"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="first-letter">
        first letter
        <input
          type="radio"
          name="searchType"
          id="f"
          data-testid="first-letter-search-radio"
          value="primeira-letra"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
