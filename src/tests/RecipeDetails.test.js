// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { renderWithRouterAndProvider } from './helpers/renderWith';
// import SearchBar from '../components/SearchBar';
// import mockFetch from './mocks/mockFetch';
// import RecipeDetails from '../pages/RecipeDetails';
// import CardDetails from '../components/cardDetaisl';
// import App from '../App';

// describe('Teste da SearchBar', () => {
//   test('Verificar se a url é chamada da forma certa com ingrediente chicken', async () => {
//     const spyFetch = jest.spyOn(global, 'fetch');
//     spyFetch.mockImplementation(mockFetch);
//     renderWithRouterAndProvider(<RecipeDetails />, {
//       initialEntries: ['/meals/52771'],
//     });
//     const foodTitle = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
//     expect(foodTitle).toBeInTheDocument();
//   });
// });
