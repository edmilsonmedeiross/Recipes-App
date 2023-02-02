import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const handleClickRoute = (route) => {
    if (route === '/') {
      localStorage.clear();
    }
    history.push(route);
  };

  return (
    <div>
      <Header
        isSearchIcon={ false }
        title="Profile"
      />
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => handleClickRoute('done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => handleClickRoute('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => handleClickRoute('/') }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
