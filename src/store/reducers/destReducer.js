import {initDestinationData} from './initialStates';
const destinationData = (state = initDestinationData, action) => {
  switch (action.type) {
    case 'ORIGIN_DATA_FULFILLED':
      return {
        ...state,
        focusField: 'namaPenerima',
      };
    case 'DESTINATION_DATA_FULFILLED':
      const {customer_id, customer_name, cust_phone, address} = action.payload;
      return {
        ...state,
        customer_id: customer_id,
        namaPenerima: customer_name,
        tlpPenerima: cust_phone,
        almtPenerima: address,
        focusField: 'triK',
      };
    case 'SET_ALMT_TO_FIELD':
      if (action.payload) {
        const {zip_code, tariff_code, city_name, subdistrict_name, district_name, province_name} = action.payload;
        return {
          ...state,
          triK: subdistrict_name + ' ' + district_name + ' ' + city_name,
        };
      }
      return {...state};
    case 'SET_DESTINATION_INPUT':
      if (action.key === 'triK') {
        return {
          ...state,
          [action.key]: action.payload,
          kodePos: null,
          kodeTo: null,
        };
      }
      return {
        ...state,
        [action.key]: action.payload,
      };
    case 'THROW_KODEPOSTO_TO_DESTINATIONDATA':
      return {
        ...state,
        kodePos: action.kodePos,
        kodeTo: action.kodeTo,
      };
    case 'RESET_FORM':
    case 'RESET_ALL_FORM':
      return {
        ...initDestinationData,
        focusField: action.type === 'RESET_FORM' && action.payload ? 'namaPenerima' : '',
      };
    case 'SET_VIEW_CONSIGNMENT':
      return {
        ...state,
        ...action.payload.DestinationData,
      };
    case 'SET_FOCUS_ON_INPUT':
      return {
        ...state,
        focusField: action.payload,
      };
    default:
      return state;
  }
};
export default destinationData;
