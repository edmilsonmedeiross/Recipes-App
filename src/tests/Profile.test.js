// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { renderWithRouterAndProvider } from './helpers/renderWith';
// import SearchBar from '../components/SearchBar';
// import mockFetch from './mocks/mockFetch';
// import Profile from '../pages/Profile';
// // import App from '../App';

// const buttons = {
//   doneRecipes: 'profile-done-btn',
//   favoriteRecipes: 'profile-favorite-btn',
//   logout: 'profile-logout-btn',
// };

// const testButtons = (value) => {
//   const input = screen.getByTestId(value);
//   userEvent.click(input);
//   userEvent.type(input, value);
//   const testIdRadio = screen.getByTestId(buttons[search]);
//   userEvent.click(screen.getByTestId('exec-search-btn'));
// };

// describe('Teste da tela de Profile', () => {
//   test('Verificar se a url é chamada da forma certa com ingrediente chicken', async () => {
//     const getUserFromLocalStorage = jest.fn().mockReturnValue({ email: 'teste@teste.com' });
//     const spyFetch = jest.spyOn(global, 'fetch');
//     spyFetch.mockImplementation(mockFetch);
//     const { history } = renderWithRouterAndProvider(<Profile />, {
//       initialEntries: ['/profile'],
//     });
//     const profileIcon = screen.getByRole('heading', { name: /profile/i });
//     expect(profileIcon).toBeInTheDocument();

//     await testRadios('ingredient', 'chicken');
//     expect(global.fetch).toHaveBeenCalledWith(
//       'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken',
//     );
//   });
// });
