import {allData} from './initialStates';
const allDataConcating = (state = allData, action) => {
  switch (action.type) {
    case 'CONCAT_ALLDATA':
      return state.concat({
        package: {
          transaction_id: action.transaction_id,
          OriginData: action.OriginData,
          DestinationData: action.DestinationData,
          OtherInfoData: action.OtherInfoData,
          Total: action.Total,
          ConnoteCode: action.ConnoteCode,
        },
      });
    case 'RESET_ALL_FORM':
      return [];
    default:
      return state;
  }
};
export default allDataConcating;
