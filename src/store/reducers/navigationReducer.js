let pagestate = {
  pageIsDirty: false,
};
/**
 * 
 * @param {*} state 
 * @param {*} action 
 */
const navigationReducer = (state = pagestate, action) => {
  switch (action.type) {
    case 'USER_INTRECTION_DIRTY':
      return {
        pageIsDirty: action.payload,
      };
    default:
      return state;
  }
};
export default navigationReducer;
