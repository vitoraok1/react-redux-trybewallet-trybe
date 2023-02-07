import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';

describe('Verifica se a tabela é renderizada dentro da rota da carteira, com os elementos requisitados', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Verifica se os botões de adicionar despesa, editar e excluir são funcionais', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const expensesTable = screen.getByRole('table');
    const valueInputTag = 'value-input';
    const descrInputTag = 'description-input';
    const descriptionHeader = screen.getByRole('columnheader', { name: /descrição/i });
    const tagHeader = screen.getByRole('columnheader', { name: /tag/i });
    const methodHeader = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const exchangeHeader = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const valueConvertHeader = screen.getByRole('columnheader', { name: /valor convertido/i });
    const currencyConvertHeader = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const editExcludeHeader = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(expensesTable).toBeDefined();
    expect(descriptionHeader).toBeDefined();
    expect(tagHeader).toBeDefined();
    expect(methodHeader).toBeDefined();
    expect(exchangeHeader).toBeDefined();
    expect(valueConvertHeader).toBeDefined();
    expect(currencyConvertHeader).toBeDefined();
    expect(editExcludeHeader).toBeDefined();

    userEvent.type(screen.getByTestId(valueInputTag), '10');
    expect(screen.getByTestId(valueInputTag).value).toEqual('10');

    userEvent.type(screen.getByTestId(descrInputTag), 'McDonalds');
    userEvent.click(screen.getByRole('button', { name: /adicionar despesa/i }));

    await waitFor(() => userEvent.click(screen.getByRole('button', { name: /editar/i })), { timeout: 5000 });
    userEvent.click(screen.getByRole('button', { name: /editar despesa/i }));
    userEvent.click(screen.getByTestId('delete-btn'));
  });
});
