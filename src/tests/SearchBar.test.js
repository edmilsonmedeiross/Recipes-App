import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndProvider } from './helpers/renderWith';
import SearchBar from '../components/SearchBar';
import mockFetch from './mocks/mockFetch';

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
  beforeEach(() => {
    const spyFetch = jest.spyOn(global, 'fetch');
    spyFetch.mockImplementation(mockFetch);
    renderWithRouterAndProvider(<SearchBar />, { initialEntries: ['/meals'] });
  });

  test('Verificar se a url é chamada da forma certa com ingrediente chicken', async () => {
    const textBox = screen.getByRole('textbox');
    expect(textBox).toBeInTheDocument();

    testRadios('ingredient', 'chicken');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
    );
  });

  test('Verificar se a url é chamada da forma certa com name soup', async () => {
    const textBox = screen.getByRole('textbox');
    expect(textBox).toBeInTheDocument();

    testRadios('name', 'soup');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=soup',
    );
  });
  test('Verificar se a url é chamada da forma certa com first letter', async () => {
    const textBox = screen.getByRole('textbox');
    expect(textBox).toBeInTheDocument();

    testRadios('firstLetter', 'f');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=f',
    );
  });
});
