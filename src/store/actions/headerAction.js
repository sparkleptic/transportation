export default {
  mapDispatchToProps(dispatch) {
    return {
      onActiveNodeChanged: (nodeID) => {
        dispatch({
          type: 'ACTIVE_NODE_CHANGED',
          nodeID,
        });
      },
      locationChange: () => {
        dispatch({
          type: 'RESET_ALL_FORM',
        });
      }
    };
  },
  mapStateToProps(state) {
    return {
      user: state.user,
      permissionList: state.permission.list,
      pagedata: state.navigation,
      nodes: state.header.nodes,
      currentNode: state.header.currentNode,
    };
  }
};
