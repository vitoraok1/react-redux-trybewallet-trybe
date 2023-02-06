import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import rootReducer from '../redux/reducers';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import App from '../App';

const emailExample = 'trybe@trybe.com';
const tagLint = 'Alimentação';

const initialStateWithExpense = {
  user: {
    email: emailExample,
  },
  wallet: {
    currencies: [],
    expenses: [
      {
        id: 0,
        value: '10',
        description: 'McDonalds',
        currency: 'USD',
        method: 'Dinheiro',
        tag: tagLint,
        exchangeRates: {
          USD: {
            ask: '5',
            name: 'Dolar Americano/Real Brasileiro',
          },
        },
      },
    ],
  },
};

describe('Verifica se o componente do formulário é renderizado dentro da rota da carteira', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

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

  it('Verifica se ao adicionar uma nova despesa ela é adicionada ao estado global', async () => {
    const store = createStore(
      rootReducer,
      initialStateWithExpense,
      applyMiddleware(thunk),
    );

    await act(() => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], store });
    });

    const addExpenseBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addExpenseBtn).toBeDefined();

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const methodSelected = screen.getByTestId('method-input');
    const tagSelected = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'McDonalds');
    userEvent.selectOptions(currency, 'USD');
    userEvent.selectOptions(methodSelected, 'Dinheiro');
    userEvent.selectOptions(tagSelected, tagLint);

    act(() => {
      userEvent.click(addExpenseBtn);
    });

    const { expenses } = store.getState().wallet;

    expect(expenses).toHaveLength(1);
    expect(expenses[0].value).toBe('10');
    expect(expenses[0].description).toBe('McDonalds');
    expect(expenses[0].currency).toBe('USD');
    expect(expenses[0].method).toBe('Dinheiro');
    expect(expenses[0].tag).toBe(tagLint);
  });
});
