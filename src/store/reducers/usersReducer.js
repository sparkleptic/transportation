import _ from 'lodash/fp';

const initialState = {
  readyStatus: 'USER_INVALID',
  err: null,
  data: [],
};

export default (state = initialState, action) => {
  /* eslint-disable no-alert, no-console */
  console.log('hey', action)
  switch (action.type) {
    case 'GET_USER_DETAIL_SUCCEED':
      /**
       * Not sure if this is best place to keep users nodes, but I think its best woraround for now.
       * TO DO: implement it in reducer where login handled
       */
      
      //sessionStorage.setItem('userNode',JSON.stringify(response.data.data),);
      //sessionStorage.setItem( 'userNodeId', response.data.data.node[0].node.node_id,);
      //sessionStorage.setItem( 'userNodeName',response.data.data.node[0].node.node_name,);

      return {
        ...state,
      }
    case 'USER_LIST_REQUESTING':
      return _.assign(state, {
        readyStatus: 'USER_LIST_REQUESTING',
      });
    case 'USER_LIST_FAILURE':
      return _.assign(state, {
        readyStatus: 'USER_LIST_FAILURE',
        err: action.err,
      });
    case 'USER_LIST_SUCCESS':
      return _.assign(state, {
        readyStatus: 'USER_LIST_SUCCESS',
        data: action.data.data,
      });

    case 'USER_SAVE_REQUESTING':
      return _.assign(state, {
        readyStatus: 'USER_SAVE_REQUESTING',
      });
    case 'USER_SAVE_FAILURE':
      return _.assign(state, {
        readyStatus: 'USER_SAVE_FAILURE',
        err: action.err,
      });
    case 'USER_SAVE_SUCCESS':
      return _.assign(state, {
        readyStatus: 'USER_SAVE_SUCCESS',
        data: action.data,
      });

    case 'USER_INFO_REQUESTING':
      return _.assign(state, {
        readyStatus: 'USER_INFO_REQUESTING',
      });
    case 'USER_INFO_FAILURE':
      return _.assign(state, {
        readyStatus: 'USER_INFO_FAILURE',
        err: action.err,
      });
    case 'USER_INFO_SUCCESS':
      return _.assign(state, {
        readyStatus: 'USER_INFO_SUCCESS',
        data: action.data,
      });
    default:
      return state;
  }
};
