import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderHelper';

test('se ao acessar a meals o componente é renderizado', async () => {
  renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/meals');
  });
  await waitFor(() => {
    const allCategoryButton = screen.getByTestId('All-category-filter');
    expect(allCategoryButton).toBeInTheDocument();
  });
});

test('se ao acessar a drinks o componente é renderizado', async () => {
  renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/drinks');
  });
  await waitFor(() => {
    const allCategoryButton = screen.getByTestId('All-category-filter');
    expect(allCategoryButton).toBeInTheDocument();
  });
});
