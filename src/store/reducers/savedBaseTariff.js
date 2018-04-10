import {baseTariff} from './initialStates';

const savingBaseTariff = (state = baseTariff, action) => {
  switch (action.type) {
    case 'SAVE_BASETARIFF':
      return state + action.BaseTariff;

    default:
      return state;
  }
};
export default savingBaseTariff;
