import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyAPI, addExpense } from '../redux/actions';

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

  handleClick = () => {
    const { id } = this.state;

    const { dispatch } = this.props;

    dispatch(addExpense({ ...this.state }));
    this.setState({ id: id + 1 });
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

    const { currencies } = this.props;

    return (
      <section>
        <form>
          <input
            type="text"
            id="value-input"
            data-testid="value-input"
            placeholder="Valor"
            onChange={ this.handleChange }
            name="value"
            value={ value }
          />
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            placeholder="Descrição"
            onChange={ this.handleChange }
            name="description"
            value={ description }
          />
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
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa

          </button>
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
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
