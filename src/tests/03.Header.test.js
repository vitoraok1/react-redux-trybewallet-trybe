import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import App from '../App';

describe('Verifica se o componente "Header" é renderizado dentro da rota da carteira', () => {
  it('Verifica se ao navegar para rota "/carteira" a mesma possui os componentes requisitados', () => {
    const initialEntries = ['/carteira'];
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries });

    const loginMail = screen.getByTestId('email-field');
    const totalExpenses = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(loginMail).toBeDefined();
    expect(totalExpenses).toBeDefined();
    expect(currency).toBeDefined();

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  it('Verifica se o "Header" possui as informações levadas do estado global do email, despesas totais e moeda', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/example@email.com/i);
    const pwInput = screen.getByPlaceholderText(/password/i);
    const enterBtn = screen.getByRole('button', { name: /entrar/i });
    const email = 'alguem@alguem.com';
    const password = '123456';

    userEvent.type(emailInput, email);
    userEvent.type(pwInput, password);
    userEvent.click(enterBtn);

    const loginMail = screen.getByTestId('email-field');
    const totalExpenses = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(loginMail).toBeDefined();
    expect(totalExpenses).toBeDefined();
    expect(currency).toBeDefined();
    expect(loginMail.innerHTML).toBe('alguem@alguem.com');
    expect(totalExpenses.innerHTML).toBe('0.00');
    expect(currency.innerHTML).toBe('BRL');

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
