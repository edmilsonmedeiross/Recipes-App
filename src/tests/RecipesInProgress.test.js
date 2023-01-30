import React from 'react';
import { act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderHelper';

describe('componente Recipes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('se ao acessar /drinks/11007/in-progress/ o componente é renderizado', async () => {
    // jest.spyOn(global, 'fetch').mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(drinks),
    // });
    act(() => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks/11007/in-progress/');
    });

    // act(() => {
    //   const drinkTitle = screen.getAllByTestId('recipe-title');
    //   expect(drinkTitle).toBeInTheDocument();
    // });
    // await waitFor(() => {
    //   const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
    //   expect(allCategoryButton).toBeInTheDocument();
    // });
  });
  test('se ao acessar /meals/52977/in-progress/ o componente é renderizado', async () => {
    // jest.spyOn(global, 'fetch').mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(meals),
    // });
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52977/in-progress/');
    });
    // await waitFor(() => {
    //   const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
    //   expect(allCategoryButton).toBeInTheDocument();
    // });
  });
});
