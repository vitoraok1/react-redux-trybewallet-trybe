import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../redux/actions';
import './css/Login.css';

class Login extends Component {
  state = {
    userEmail: '',
    userPassword: '',
    btnEnabled: false,
  };

  handleValidate = () => {
    const { userEmail, userPassword } = this.state;

    const requireCaracteres = 6;
    const regexMail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const validateMail = regexMail.test(userEmail);
    const validatePw = userPassword !== null && userPassword.length >= requireCaracteres;

    if (validateMail && validatePw) {
      this.setState({
        btnEnabled: true,
      });
    } else {
      this.setState({
        btnEnabled: false,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleValidate);
  };

  handleClick = (event) => {
    event.preventDefault();
    const { userEmail } = this.state;
    const { dispatch, history } = this.props;
    dispatch(getUser(userEmail));
    history.push('/carteira');
  };

  render() {
    const { userEmail, userPassword, btnEnabled } = this.state;
    return (
      <div className="login-page">
        <form className="login-form">
          <input
            type="text"
            className="email-input"
            data-testid="email-input"
            placeholder="example@email.com"
            onChange={ this.handleChange }
            value={ userEmail }
            name="userEmail"
            required
          />
          <input
            type="password"
            className="password-input"
            data-testid="password-input"
            placeholder="password"
            onChange={ this.handleChange }
            value={ userPassword }
            name="userPassword"
            required
          />
          <button
            type="submit"
            className="button-login"
            onClick={ this.handleClick }
            disabled={ !btnEnabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
