import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard(props) {
  const { id, img, name, index } = props;
  return (
    <div
      className="recipesCard"
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
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default RecipeCard;
