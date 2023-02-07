import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrencyAPI,
  addExpense,
  saveEditedExpense,
} from '../redux/actions';
import './css/WalletForm.css';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
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

  resetInputs = () => {
    this.setState({
      value: '',
      description: '',
    });
  };

  handleAddExpense = () => {
    const { id } = this.state;

    const { dispatch } = this.props;

    dispatch(addExpense({ ...this.state }));
    this.setState({ id: id + 1 });
    this.resetInputs();
  };

  handleEditExpense = () => {
    const { value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;

    dispatch(saveEditedExpense({
      value,
      description,
      currency,
      method,
      tag,
    }));

    this.resetInputs();
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies, editor } = this.props;

    return (
      <section className="wallet-form">
        <div className="row">
          <label htmlFor="description-input">
            Descrição do Despesa:
            <input
              type="text"
              id="description-input"
              data-testid="description-input"
              onChange={ this.handleChange }
              name="description"
              value={ description }
            />
          </label>
          <label htmlFor="tag-input">
            Categoria da Despesa:
            <select
              id="tag-input"
              data-testid="tag-input"
              onChange={ this.handleChange }
              name="tag"
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <div className="row">
          <label htmlFor="value-input">
            Valor:
            <input
              type="text"
              id="value-input"
              data-testid="value-input"
              onChange={ this.handleChange }
              name="value"
              value={ value }
            />
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              id="method-input"
              data-testid="method-input"
              onChange={ this.handleChange }
              name="method"
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((element) => (
                  <option key={ element }>{ element }</option>
                ))
              }
            </select>
          </label>
        </div>
        <button
          type="button"
          className="button-wallet-form"
          onClick={ editor ? this.handleEditExpense : this.handleAddExpense }
        >
          { editor ? 'Editar despesa' : 'Adicionar despesa' }
        </button>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  editor: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
