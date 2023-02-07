import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [user, setUser] = useState('');
  const { isSearchIcon, title } = props;
  const [isSearchBar, setIsSearchBar] = useState(false);

  const toogleSearchBar = () => {
    setIsSearchBar(!isSearchBar);
  };

  const getEmailLocalStorage = async () => {
    const getUserFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (!getUserFromLocalStorage) return;
    setUser(getUserFromLocalStorage.email);
  };

  useEffect(() => {
    getEmailLocalStorage();
  }, []);

  return (
    <header>
      <div className="navBarHeader">
        <p
          className="profile-email"
          data-testid="profile-email"
        >
          { user }

        </p>
        <button
          href="/profile"
          onClick={ toogleSearchBar }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="icone de perfil"
          />
        </button>

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
      </div>
      { isSearchBar && (<SearchBar />) }
      <h2
        data-testid="page-title"
      >
        { title }
      </h2>
    </header>
  );
}

Header.defaultProps = {
  isSearchIcon: false,
  title: '',
};

Header.propTypes = {
  isSearchIcon: PropTypes.bool,
  title: PropTypes.string,
};

export default Header;
