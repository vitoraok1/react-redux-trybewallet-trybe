import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyAPI } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenseValue: '',
    expenseDescription: '',
    currencyValue: 'USD',
    paymentMethod: 'Dinheiro',
    expenseCategory: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyAPI());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      expenseValue,
      expenseDescription,
      currencyValue,
      paymentMethod,
      expenseCategory,
    } = this.state;

    const { currencies } = this.props;

    return (
      <section>
        <form>
          <h3>Adicionar despesa:</h3>
          <input
            type="text"
            data-testid="value-input"
            placeholder="Valor"
            onChange={ this.handleChange }
            name="expenseValue"
            value={ expenseValue }
          />
          <input
            type="text"
            data-testid="description-input"
            placeholder="Descrição"
            onChange={ this.handleChange }
            name="expenseDescription"
            value={ expenseDescription }
          />
          <select
            name="currencyValue"
            id="currency-input"
            data-testid="currency-input"
            value={ currencyValue }
            onChange={ this.handleChange }
          >
            {
              currencies.map((currency, index) => (
                <option key={ index } value={ currency }>{ currency }</option>
              ))
            }
          </select>
          <select
            data-testid="method-input"
            onChange={ this.handleChange }
            name="paymentMethod"
            value={ paymentMethod }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="expenseCategory"
            value={ expenseCategory }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
