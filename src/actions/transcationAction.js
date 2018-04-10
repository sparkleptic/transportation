import HttpClient from './http-client';

export function getTransaction(id) {
  return function(dispatch) {
    new HttpClient().get(`transaction/${id}`).then((response) => {
      dispatch({type: 'FETCH_TRANSACTION_FULLFILLED', payload: response.data.data });
    })
    .catch((error) => {
      console.log('error', error);
    });
  };
};

export function voidTransaction(transaction_id, connote_id) {
  return function(dispatch) {
    new HttpClient().put(`connote/${connote_id}/void`).then((response) => {
      dispatch({type: 'CONNOT_VOID_FULLFILLED'});
      dispatch(getTransaction(transaction_id));
    })
    .catch((error) => {
      console.log('error', error);
    });
  };
}