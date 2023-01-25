import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderHelper';

import Login from '../pages/Login';
import App from '../App';

describe('Teste da pagina de login', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  const loginButtonTestId = 'login-submit-btn';

  test('Verificar email placeholder', () => {
    renderWithRouter(<Login />);
    const placeholderEmail = screen.getByTestId(emailTestId);
    expect(placeholderEmail).toBeInTheDocument();
  });

  test('Verificar password placeholder', () => {
    renderWithRouter(<Login />);
    const placeholderPass = screen.getByTestId(passwordTestId);
    expect(placeholderPass).toBeInTheDocument();
  });

  test('Verificar password input', () => {
    renderWithRouter(<Login />);
    const testInputPassword = screen.getByTestId(passwordTestId);
    expect(testInputPassword).toBeInTheDocument();
  });

  test('Verificar login Button', () => {
    renderWithRouter(<Login />);
    const testEmailInput = screen.getByTestId(loginButtonTestId);
    expect(testEmailInput).toBeInTheDocument();
  });

  test('Verificar botão "Entrar" no Login', () => {
    renderWithRouter(<Login />);
    const buttonEnter = screen.getByTestId(loginButtonTestId);
    expect(buttonEnter).toBeInTheDocument();
  });

  test('Verificar se botão "Entrar" inicia disabled', () => {
    renderWithRouter(<Login />);
    const buttonEnter = screen.getByTestId(loginButtonTestId);
    expect(buttonEnter).toHaveAttribute('disabled');
  });

  test('Verificar se ao clicar no botão o Email é salvo no localStorage e redireciona para o /meals', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(emailTestId);
    userEvent.type(emailInput, 'test@test.com');
    const passwordInput = screen.getByTestId(passwordTestId);
    userEvent.type(passwordInput, '1234567');
    const loginButton = screen.getByTestId(loginButtonTestId);
    expect(loginButton).not.toBeDisabled();
    userEvent.click(loginButton);

    expect(localStorage.getItem('user')).toBe('{"email":"test@test.com"}');
    expect(history.location.pathname).toBe('/meals');
  });
});
