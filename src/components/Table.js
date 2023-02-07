import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../redux/actions';
import TableHeader from './TableHeader';
import './css/Table.css';

class Table extends Component {
  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  handleEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section className="wallet-table">
        <div className="table">
          <table>
            <TableHeader />
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
                          className="button-edit-expense"
                          data-testid="edit-btn"
                          onClick={ () => this.handleEdit(id) }
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="button-edit-expense"
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
      </section>
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
