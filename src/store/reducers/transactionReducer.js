let initState = {
  data: null,
};

const transactionReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_TRANSACTION_FULLFILLED':
      return {
        ...state,
        data: Object.assign({}, action.payload),
      };
    default:
      return {
        ...state,
      };
  }
};

export default transactionReducer;
