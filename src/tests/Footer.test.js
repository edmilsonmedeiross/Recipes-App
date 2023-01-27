import React from 'react';
import { act, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderHelper';

test('se ao acessar a home page o componente não é renderizado', () => {
  renderWithRouter(<App />);
  const drinkImg = screen.queryByTestId('drinks-bottom-btn');
  expect(drinkImg).not.toBeInTheDocument();
});

test('se ao acessar a meals o componente é renderizado', () => {
  renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/meals');
  });
  const drinkImg = screen.getByTestId('drinks-bottom-btn');
  expect(drinkImg).toBeInTheDocument();
});
