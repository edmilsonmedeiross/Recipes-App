import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import SearchBarProvider from '../../context/SearchBarProvider';
import RecipesProvider from '../../context/RecipesProvider';

function withRouter(component, history) {
  return <Router history={ history }>{component}</Router>;
}

export function renderWithRouterAndProvider(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(
      <RecipesProvider>
        <SearchBarProvider>
          {withRouter(component, history)}
        </SearchBarProvider>
        ,
      </RecipesProvider>,
    ),
    history,
  };
}
