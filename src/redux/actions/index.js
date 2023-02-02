export const GET_USER = 'GET_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const getUser = (email) => ({
  type: GET_USER,
  payload: {
    email,
  },
});

export const fetchCurrencyAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  const filteredCurrencies = Object.keys(currencies)
    .filter((_currency, index) => index !== 1);

  return dispatch({
    type: GET_CURRENCIES,
    payload: {
      currencies: filteredCurrencies,
    },
  });
};

export const addExpense = (values) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const {
    id,
    value,
    description,
    currency,
    method,
    tag,
  } = values;

  return dispatch({
    type: ADD_EXPENSE,
    payload: {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    },
  });
};
