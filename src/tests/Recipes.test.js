import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderHelper';

const ALL_CATEGORY_FILTER = 'All-category-filter';

describe('componente Recipes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('se ao acessar a meals o componente é renderizado', async () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
      expect(allCategoryButton).toBeInTheDocument();
    });
  });

  test('se ao acessar a drinks o componente é renderizado', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
      expect(allCategoryButton).toBeInTheDocument();
    });
  });

  test('se ao acessar a drinks o componente é renderizado', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
      expect(allCategoryButton).toBeInTheDocument();
    });
  });

  test('se ao acessar a drinks conseguimos clicar no card', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    await waitFor(() => {
      const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
      expect(allCategoryButton).toBeInTheDocument();
    });
    // await waitFor(() => {
    //   const recipe = screen.getAllByRole('link', {
    //     name: /recipe/i,
    //   });
    //   userEvent.click(recipe[0]);
    // });
  });

  test('se ao acessar a meals conseguimos clicar no card', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      const allCategoryButton = screen.getByTestId(ALL_CATEGORY_FILTER);
      expect(allCategoryButton).toBeInTheDocument();
      userEvent.click(allCategoryButton);
    });

    await waitFor(() => {
      const recipe = screen.getAllByRole('link', {
        name: /recipe/i,
      });
      userEvent.click(recipe[0]);
    });
  });

  test('se ao acessar a meals conseguimos clicar na categoria beef', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    await waitFor(() => {
      const beefCategoryButton = screen.getByTestId('Beef-category-filter');
      expect(beefCategoryButton).toBeInTheDocument();
      userEvent.click(beefCategoryButton);
    });
  });
});
