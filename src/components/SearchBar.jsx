import React from 'react';
import useFetch from '../hooks/useFetch';

function SearchBar() {
  return (
    <div>
      <input type="text" data-testid="search-input" name="searchText" />
      <label htmlFor="ingredient">
        ingredient
        <input
          type="radio"
          name="searchType"
          id="i"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        name
        <input
          type="radio"
          name="searchType"
          id="s"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter">
        first letter
        <input
          type="radio"
          name="searchType"
          id="f"
          data-testid="first-letter-search-radio"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        // onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
