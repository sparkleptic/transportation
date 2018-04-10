import {initOriginData} from './initialStates';
const originData = (state = initOriginData, action) => {
  switch (action.type) {
    case 'ORIGIN_DATA_FULFILLED':
      const {customer_id, customer_name, cust_phone, address, zip_code, customer_code} = action.payload;
      return {
        ...state,
        customer_id: customer_id,
        namaPengirim: customer_name,
        tlpPengirim: cust_phone,
        almtPengirim: address,
        customer_code: customer_code,
        kodePos: zip_code,
      };
    case 'SET_ORIGIN_INPUT':
      return {
        ...state,
        [action.key]: action.payload,
      };
    case 'SET_VIEW_CONSIGNMENT':
      return {
        ...state,
        ...action.payload.OriginData,
      };
    case 'RESET_ALL_FORM':
      return {
        ...initOriginData,
      };
    default:
      return state;
  }
};
export default originData;
