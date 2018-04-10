export default {
  mapStateToProps(state) {
    return {
      items: state.users.data,
    };
  },
};
