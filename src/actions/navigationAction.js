export function setPageIsDirty(bool) {
  return function(dispatch) {
    dispatch({type: 'USER_INTRECTION_DIRTY', payload: bool});
  };
}
