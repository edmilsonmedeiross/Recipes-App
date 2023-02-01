import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const getUserFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    const { email } = getUserFromLocalStorage;
    setUser(email);
  }, []);

  return (
    <div>
      <Header
        isSearchIcon={ false }
        title="Profile"
      />
      <Header />
      <p data-testid="profile-email">{user}</p>
      <button data-testid="profile-done-btn" type="button">Done Recipes</button>
      <button data-testid="profile-favorite-btn" type="button">Favorite Recipes</button>
      <button data-testid="profile-logout-btn" type="button">Logout</button>
      <Footer />
    </div>
  );
}

export default Profile;
