import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderHelper';
import Login from '../pages/Login';

describe('Teste da pagina de login', () => {
  test('Verificar email placeholder', () => {
    renderWithRouter(<Login />);
    const placeholderEmail = screen.getByTestId('email-input');
    expect(placeholderEmail).toBeInTheDocument();
  });
  test('Verificar password placeholder', () => {
    renderWithRouter(<Login />);
    const placeholderPass = screen.getByTestId('password-input');
    expect(placeholderPass).toBeInTheDocument();
  });
  test('Verificar password input', () => {
    renderWithRouter(<Login />);
    const testInputPassword = screen.getByTestId('password-input');
    expect(testInputPassword).toBeInTheDocument();
  });
  test('Verificar login Button', () => {
    renderWithRouter(<Login />);
    const testEmailInput = screen.getByTestId('login-submit-btn');
    expect(testEmailInput).toBeInTheDocument();
  });
});
