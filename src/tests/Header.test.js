import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWith';

test('se ao acessar a home page o componente não é renderizado', () => {
  renderWithRouter(<App />);
  const profileIcon = screen.queryByTestId('profile-top-btn');
  expect(profileIcon).not.toBeInTheDocument();
});

test('se ao acessar a meals o componente é renderizado', () => {
  renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/meals');
  });
  const profileIcon = screen.getByTestId('profile-top-btn');
  expect(profileIcon).toBeInTheDocument();
});

test('se a barra aparece após clicar', () => {
  renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/meals');
  });
  const searchButton = screen.getByRole('img', { name: /icone de pesquisa/i });
  userEvent.click(searchButton);
  const searchBar = screen.getByTestId('search-input');
  expect(searchBar).toBeInTheDocument();
});
