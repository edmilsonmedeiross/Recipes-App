import React from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
  const { 'id-da-receita': idRecipe } = useParams();
  return (
    <div>
      Testando
      <div>{idRecipe}</div>
    </div>
  );
}

export default RecipeDetails;
