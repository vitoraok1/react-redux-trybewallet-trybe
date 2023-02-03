import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import App from '../App';

describe('Verifica se o formulário para login foi criado na rota inicial', () => {
  it('Verifica se a rota inicial possui os componentes necessários', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeDefined();

    const pwInput = screen.getByTestId('password-input');
    expect(pwInput).toBeDefined();

    const enterBtn = screen.getByRole('button', { name: /entrar/i });
    expect(enterBtn).toBeDefined();
  });

  it('Verifica se o botão "Entrar" só é habilitado se o e-mail estiver no formato certo e a senha possuir 6 ou mais caracteres', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByPlaceholderText(/example@email.com/i);
    const pwInput = screen.getByPlaceholderText(/password/i);
    const enterBtn = screen.getByRole('button', { name: /entrar/i });
    const email = 'alguem@alguem.com';
    const wrongEmail = 'alguem@alguem';

    userEvent.type(emailInput, email);
    userEvent.type(pwInput, '123456');
    expect(enterBtn).toBeEnabled();

    userEvent.type(emailInput, email);
    userEvent.type(pwInput, '12345');
    expect(enterBtn).toBeDisabled();

    userEvent.type(emailInput, wrongEmail);
    userEvent.type(pwInput, '123456');
    expect(enterBtn).toBeDisabled();
  });

  it('Verifica se ao clicar no botão "Entrar" é direcionado para a rota da carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/example@email.com/i);
    const pwInput = screen.getByPlaceholderText(/password/i);
    const enterBtn = screen.getByRole('button', { name: /entrar/i });
    const email = 'alguem@alguem.com';
    const password = '123456';

    userEvent.type(emailInput, email);
    userEvent.type(pwInput, password);
    userEvent.click(enterBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
