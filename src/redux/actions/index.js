export const GET_USER = 'GET_USER';
export const GET_CURRENCIES = 'GET_CURRENCIES';

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
