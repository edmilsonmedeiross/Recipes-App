import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProvider } from './helpers/renderWith';
import SearchBar from '../components/SearchBar';
import mockFetch from './mocks/mockFetch';
// import App from '../App';

const options = {
  ingredient: 'ingredient-search-radio',
  name: 'name-search-radio',
  firstLetter: 'first-letter-search-radio',
};

/**
 * @param {string} search
 * @param {string} value
 * @example testRadios('ingredient', 'chicken')
 */

const testRadios = (search, value) => {
  const input = screen.getByTestId('search-input');
  userEvent.type(input, value);
  const testIdRadio = screen.getByTestId(options[search]);
  userEvent.click(testIdRadio);
  userEvent.click(screen.getByTestId('exec-search-btn'));
};

describe('Teste da SearchBar', () => {
  test('Verificar se a url é chamada da forma certa com ingrediente chicken', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    spyFetch.mockImplementation(mockFetch);
    renderWithRouterAndProvider(<SearchBar />, {
      initialEntries: ['/meals'],
    });
    const textBox = screen.getByRole('textbox');
    expect(textBox).toBeInTheDocument();

    await testRadios('ingredient', 'chicken');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
    );
  });

  test('Verificar se a url é chamada da forma certa com name soup', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    spyFetch.mockImplementation(mockFetch);
    renderWithRouterAndProvider(<SearchBar />, {
      initialEntries: ['/meals'],
    });
    const textBox = screen.getByRole('textbox');
    expect(textBox).toBeInTheDocument();

    testRadios('name', 'soup');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=soup',
    );
  });

  test('Verificar se a url é chamada da forma certa com first letter', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    spyFetch.mockImplementation(mockFetch);
    renderWithRouterAndProvider(<SearchBar />, {
      initialEntries: ['/meals'],
    });
    const textBox = screen.getByRole('textbox');
    expect(textBox).toBeInTheDocument();

    testRadios('firstLetter', 'f');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=f',
    );
  });

  test('Verificar se retornado apenas uma receita de comida é redirecionado para a rota da mesma', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    spyFetch.mockImplementation(mockFetch);

    const { history } = renderWithRouterAndProvider(<SearchBar />, {
      initialEntries: ['/meals'],
    });

    await testRadios('name', 'Spicy Arrabiata Penne');
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=Spicy Arrabiata Penne',
      );
    });
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });

  test('Verificar se retornado apenas uma receita de bebida redirecionado para a rota da mesma', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    spyFetch.mockImplementation(mockFetch);

    const { history } = renderWithRouterAndProvider(<SearchBar />, {
      initialEntries: ['/drinks'],
    });

    await testRadios('name', 'Aquamarine');
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine',
      );
    });
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'));
  });

  /* test('Verificar se pesquisado uma receita inexistente retorna erro', async () => {
    const spyFetch = jest.spyOn(global, 'fetch');
    jest.spyOn(global, 'alert');
    spyFetch.mockImplementation(mockFetch);
    global.alert = jest.fn();

    const { history } = renderWithRouterAndProvider(<SearchBar />, {
      initialEntries: ['/drinks'],
    });

    await waitFor(() => testRadios('name', 'xablau'));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau',
      );
    });
    await waitFor(() => expect(history.location.pathname).toBe('/drinks'));
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  }); */
});
