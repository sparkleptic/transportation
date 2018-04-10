import _ from 'lodash/fp';

const initialState = {
  readyStatus: 'USER_INVALID',
  err: null,
  nodes: [],
  currentNode: 0,
  activeNode: {},
};

export default (state = initialState, action) => {
  
  switch (action.type) {
    case 'GET_USER_DETAIL_SUCCEED':
      /**
       * Not sure if this is best place to keep users nodes, but I think its best woraround for now.
       * TO DO: implement it in reducer where login handled
       */
      sessionStorage.setItem('userNode', JSON.stringify(action.user));
      sessionStorage.setItem('userNodeId', action.user.nodes[0].nodeID);
      sessionStorage.setItem('userNodeName', action.user.nodes[0].nodeName);
      sessionStorage.setItem('originCode', action.user.nodes[0].tariffCode);
      return {
        ...state,
        nodes: action.user.nodes,
        currentNode: action.user.nodes[0].nodeID,
        activeNode: action.user.nodes[0]
      };
    case 'ACTIVE_NODE_CHANGED':
      const currentNode = state.nodes.filter((item) => item.nodeID === action.nodeID);
      sessionStorage.setItem('userNodeId', currentNode[0].nodeID);
      sessionStorage.setItem('userNodeName', currentNode[0].nodeName);
      sessionStorage.setItem('originCode', currentNode[0].tariffCode);
      return {
        ...state,
        currentNode: action.nodeID,
        activeNode: currentNode[0],
      };
    default:
      return state;
  }
};
