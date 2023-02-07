const editItem = (state, action) => state.expenses.map((item) => {
  if (item.id === state.idToEdit) {
    return {
      id: item.id,
      value: action.payload.value,
      description: action.payload.description,
      currency: action.payload.currency,
      method: action.payload.method,
      tag: action.payload.tag,
      exchangeRates: item.exchangeRates,
    };
  }
  return item;
});

export default editItem;
