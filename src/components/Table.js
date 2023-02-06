import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';
import './Table.css';

class Table extends Component {
  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses && expenses.map((expense) => {
                const {
                  id, description, tag, method, value, exchangeRates, currency,
                } = expense;
                return (
                  <tr key={ id }>
                    <td>
                      {description}
                    </td>
                    <td>
                      {tag}
                    </td>
                    <td>
                      {method}
                    </td>
                    <td>
                      {parseFloat(value).toFixed(2)}
                    </td>
                    <td>
                      {exchangeRates[currency].name}
                    </td>
                    <td>
                      {parseFloat(exchangeRates[currency].ask).toFixed(2)}
                    </td>
                    <td>
                      {parseFloat(exchangeRates[currency].ask
                    * value).toFixed(2)}
                    </td>
                    <td>
                      Real
                    </td>
                    <td>
                      <button
                        type="button"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.handleDelete(id) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
