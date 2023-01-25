import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

test('Farewell, front-end', () => {
  // Este arquivo pode ser modificado ou deletado sem problemas
  renderWithRouter(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
