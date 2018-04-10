import {searchAlmtContainer} from './initialStates';

const throwToDestAlmtPenerima = (state = searchAlmtContainer, action) => {
  switch (action.type) {
    case 'SET_DESTINATION_INPUT':
      if (action.key === 'triK') {
        return {
          ...state,
          city_name: null,
          tariff_code: null,
          zip_code: null,
        };
      }
      return {
        ...state,
        [action.key]: action.payload,
      };
    case 'SET_ALMT_TO_FIELD':
      return {
        ...state,
        ...action.payload,
      };
    case 'RESET_FORM':
    case 'RESET_ALL_FORM':
      return {
        ...searchAlmtContainer,
      };
    default:
      return state;
  }
};
export default throwToDestAlmtPenerima;
