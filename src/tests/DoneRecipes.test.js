import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderHelper';

describe('componente Done Recipes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('se ao acessar a meals o componente é renderizado', async () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    await waitFor(() => {
      const allButton = screen.getByRole('button', { name: /all/i });
      expect(allButton).toBeInTheDocument();
      const mealsButton = screen.getByRole('button', { name: /meals/i });
      expect(mealsButton).toBeInTheDocument();
      const drinksButton = screen.getByRole('button', { name: /drinks/i });
      expect(drinksButton).toBeInTheDocument();
    });
  });

  test('clicar no botão all', async () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    await waitFor(() => {
      const allButton = screen.getByRole('button', { name: /all/i });
      userEvent.click(allButton);
    });
  });

  test('clicar no botão meals', async () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    await waitFor(() => {
      const mealsButton = screen.getByRole('button', { name: /meals/i });
      userEvent.click(mealsButton);
    });
  });

  test('clicar no botão drinks', async () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    await waitFor(() => {
      const drinksButton = screen.getByRole('button', { name: /drinks/i });
      userEvent.click(drinksButton);
    });
  });
  //   test('se ao acessar a drinks o componente é renderizado', async () => {
  //     const { history } = renderWithRouter(<App />);
  //     act(() => {
  //       history.push('/drinks');
  //     });
  //     await waitFor(() => {
  //       const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
  //       expect(allCategoryButton).toBeInTheDocument();
  //     });
  //   });

  //   test('se ao acessar a drinks conseguimos clicar no card', async () => {
  //     const { history } = renderWithRouter(<App />);
  //     act(() => {
  //       history.push('/drinks');
  //     });
  //     await waitFor(() => {
  //       const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
  //       expect(allCategoryButton).toBeInTheDocument();
  //     });
  //     // await waitFor(() => {
  //     //   const recipe = screen.getAllByRole('link', {
  //     //     name: /recipe/i,
  //     //   });
  //     //   userEvent.click(recipe[0]);
  //     // });
  //   });

  //   test('se ao acessar a meals conseguimos clicar no card', async () => {
  //     const { history } = renderWithRouter(<App />);
  //     act(() => {
  //       history.push('/meals');
  //     });
  //     await waitFor(() => {
  //       const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
  //       expect(allCategoryButton).toBeInTheDocument();
  //       userEvent.click(allCategoryButton);
  //     });

  //     await waitFor(() => {
  //       const recipe = screen.getAllByRole('link', {
  //         name: /recipe/i,
  //       });
  //       userEvent.click(recipe[0]);
  //     });
  //   });

//   test('se ao acessar a meals conseguimos clicar na categoria beef', async () => {
//     const { history } = renderWithRouter(<App />);
//     act(() => {
//       history.push('/meals');
//     });
//     await waitFor(() => {
//       const beefCategoryButton = screen.getByTestId('Beef-category-filter');
//       expect(beefCategoryButton).toBeInTheDocument();
//       userEvent.click(beefCategoryButton);
//     });
//   });
});
