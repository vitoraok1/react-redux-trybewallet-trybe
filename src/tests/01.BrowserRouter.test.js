import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

describe('Verifica se as rotas necessárias para aplicação foram criadas', () => {
  it('Verifica se a rota de login existe e possui os componentes requisitados', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByPlaceholderText(/example@email.com/i);
    expect(emailInput).toBeDefined();

    const pwInput = screen.getByPlaceholderText(/password/i);
    expect(pwInput).toBeDefined();

    const enterBtn = screen.getByRole('button', { name: /entrar/i });
    expect(enterBtn).toBeDefined();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se a rota da carteira existe', () => {
    const initialEntries = ['/carteira'];
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries });

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
