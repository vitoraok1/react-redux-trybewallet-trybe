import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Verifica se o componente do formulário é renderizado dentro da rota da carteira', () => {
  it('Verifica se ao navegar para rota "/carteira" a mesma possui os componentes do formulário', () => {
    const initialEntries = ['/carteira'];
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries });

    const loginMail = screen.getByTestId('email-field');
    const totalExpenses = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(loginMail).toBeDefined();
    expect(totalExpenses).toBeDefined();
    expect(currency).toBeDefined();

    const expenseValue = screen.getByTestId('value-input');
    const expenseDescr = screen.getByTestId('description-input');
    const expenseCurrency = screen.getByTestId('currency-input');
    const paymentMethod = screen.getByTestId('method-input');
    const expenseTag = screen.getByTestId('tag-input');
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(expenseValue).toBeDefined();
    expect(expenseDescr).toBeDefined();
    expect(expenseCurrency).toBeDefined();
    expect(paymentMethod).toBeDefined();
    expect(expenseTag).toBeDefined();
    expect(addExpenseBtn).toBeDefined();

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });

  it('Verifica se é possível adicionar uma nova despesa no estado global ao clicar no botão', () => {
    const MOCK_INITAL_STATE = {
      user: {
        email: '',
      },
      wallet: {
        currencies: [],
        expenses: [],
      },
    };

    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: MOCK_INITAL_STATE },
    );

    const expenseValue = screen.getByTestId('value-input');
    expect(expenseValue).toBeDefined();
    expect(expenseValue.value).toBe('');

    const expenseDescr = screen.getByTestId('description-input');
    expect(expenseDescr).toBeDefined();
    expect(expenseDescr.value).toBe('');

    userEvent.type(expenseValue, '10');
    userEvent.type(expenseDescr, 'McDonalds');
    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(addExpenseBtn);

    expect(store.getState()).toMatchObject(MOCK_INITAL_STATE);

    // Preciso refazer essa parte do teste..
  });
});
