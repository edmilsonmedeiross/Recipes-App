import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchBarContext = createContext();

function SearchBarProvider({ children }) {
  const [optionSearch, setOptionSearch] = useState({});
  const [nameSearch, setNameSearch] = useState('');
  const [dataApi, setDataApi] = useState({ meals: [],
    drinks: [] });
  const [startFetch, setStartFetch] = useState(false);

  const values = useMemo(() => ({
    optionSearch,
    setOptionSearch,
    nameSearch,
    setNameSearch,
    dataApi,
    setDataApi,
    startFetch,
    setStartFetch,
  }), [dataApi, optionSearch, nameSearch, startFetch]);

  return (
    <SearchBarContext.Provider
      value={ values }
    >
      { children }
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchBarProvider;
