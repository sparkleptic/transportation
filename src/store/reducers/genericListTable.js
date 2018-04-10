import {initGenericListTableData} from './initialStates';

const genericListTable = (state = initGenericListTableData, action) => {
  switch (action.type) {
    case 'SET_PAYLOAD':
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state;
  }
};

export default genericListTable;
