import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
  const { id, img, name, index, redirectRoute } = props;
  console.log(redirectRoute);

  return (
    <Link to={ redirectRoute }>
      <div
        key={ index }
        data-testid={ `${id}-recipe-card` }
      >
        <img
          alt="recipe"
          src={ img }
          data-testid={ `${id}-card-img` }
        />
        <div
          data-testid={ `${id}-card-name` }
        >
          { name }
        </div>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  redirectRoute: PropTypes.string.isRequired,
};

export default RecipeCard;
