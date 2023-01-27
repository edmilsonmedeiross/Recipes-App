import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header
        isSearchIcon={ false }
        title="Profile"
      />
      <Footer />
    </div>
  );
}

export default Profile;
