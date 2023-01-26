import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes(props) {
  const { location: { pathname } } = props;
  const isDrink = (pathname === '/drinks');
  return (
    <div>
      <Header
        isSearchIcon
        title={ isDrink ? 'Drinks' : 'Meals' }
      />
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipes;
