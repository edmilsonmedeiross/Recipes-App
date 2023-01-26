import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <a href="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="icone de drinks"
        />
      </a>
      <a href="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="icone de meals"
        />
      </a>
    </footer>
  );
}

export default Footer;
