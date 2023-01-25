import React from 'react';
import useFormInput from '../hooks/useFormInput';

export default function Login() {
  const userEmail = useFormInput('');
  const userPassword = useFormInput('');
  // const das = useFormInput('');

  const handleLogin = () => {

  };

  return (
    <div>
      <form>
        <input
          type="email"
          name="userEmail"
          placeholder="Email"
          value={ userEmail.value }
          onChange={ userEmail.onChange }
          data-testid="email-input"
        />
        <input
          type="password"
          name="userPassword"
          placeholder="Senha"
          value={ userPassword.value }
          onChange={ userPassword.onChange }
          data-testid="password-input"
        />
        <button
          type="button"
          onClick={ handleLogin }
          data-testid="login-submit-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
}
