import {
  GET_CURRENCIES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVED_EDITED_EXPENSE,
} from '../actions';

import editItem from '../../tests/helpers/editItem';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.payload.id,
      editor: true,
    };
  case SAVED_EDITED_EXPENSE:
    return {
      ...state,
      expenses: editItem(state, action),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
