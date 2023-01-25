import React from 'react';
import PropTypes from 'prop-types';
import useFormInput from '../hooks/useFormInput';

export default function Login({ history }) {
  const userEmail = useFormInput('');
  const userPassword = useFormInput('');

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: userEmail.value }));
    history.push('/meals');
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
          onClick={ handleSubmit }
          disabled={ userPassword.value.length <= Number('6') || !userEmail.value.match(
            /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
          ) }
          data-testid="login-submit-btn"
        >
          Login
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};
