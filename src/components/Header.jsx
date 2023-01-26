import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { isSearchIcon, title } = props;
  const [isSearchBar, setIsSearchBar] = useState(false);

  const toogleSearchBar = () => {
    setIsSearchBar(!isSearchBar);
  };

  return (
    <header>
      <h3
        data-testid="page-title"
      >
        { title }
      </h3>
      <a href="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="icone de perfil"
        />
      </a>
      { isSearchIcon && (
        <button
          onClick={ toogleSearchBar }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="icone de pesquisa"
          />
        </button>)}
      { isSearchBar && (<SearchBar />) }
    </header>
  );
}

Header.propTypes = {
  isSearchIcon: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
