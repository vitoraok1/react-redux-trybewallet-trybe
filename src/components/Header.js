import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './css/Header.css';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const sum = expenses.reduce((acc, curr) => {
      const { value, exchangeRates, currency } = curr;
      const { ask } = exchangeRates[currency];
      return acc + (value * ask);
    }, 0);
    return sum.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <div className="row">
          <p className="header-email" data-testid="email-field">{ email }</p>
        </div>
        <div className="row">
          <br />
          <p className="main-header">
            <strong>Despesas totais:</strong>
          </p>
          <p
            className="main-header"
            data-testid="total-field"
          >
            { `${this.totalExpenses()}` }
          </p>
          <p data-testid="header-currency-field" className="main-header">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
