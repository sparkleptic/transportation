// @flow

import convertArrayToMap from '../../helpers/convertArrayToMap';

import type {NodeState, NodeAction} from './Node-type';

const initialState: NodeState = {
  list: new Map(),
  activeNode: 0,
  globalSearch: {
    isLoading: false,
    nodeID: null,
    detailInfo: null,
    inventory: {
      list: [],
      nextPageUrl: null,
      prevPageUrl: null,
      total: 0,
      summaryList: [],
      isLoading: false,
    },
    vehicle: {
      list: [],
      nextPageUrl: null,
      prevPageUrl: null,
      total: 0,
      summaryList: [],
      isLoading: false,
    },
    employee: {
      list: [],
      nextPageUrl: null,
      prevPageUrl: null,
      total: 0,
      summaryList: [],
      isLoading: false,
    },
  },
  isLoading: false,
};

export default function nodeReducer(
  state: NodeState = initialState,
  action: NodeAction,
) {
  switch (action.type) {
    case 'NODE_RECEIVED': {
      let list = convertArrayToMap(action.list, 'nodeID');
      return {
        ...state,
        list,
      };
    }
    case 'ACTIVE_NODE_CHANGED': {
      return {
        ...state,
        activeNode: action.nodeID,
      };
    }
    case 'GET_NODE_DETAIL_REQUESTED': {
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          nodeID: action.nodeID,
          isLoading: true,
        },
      };
    }
    case 'GET_NODE_DETAIL_FAILED': {
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          isLoading: false,
        },
      };
    }
    case 'GET_NODE_DETAIL_SUCCEED': {
      let {nodeID, detailInfo} = action;
      if (
        state.globalSearch.nodeID &&
        Number(state.globalSearch.nodeID) !== Number(nodeID)
      ) {
        return state;
      }
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          detailInfo,
          isLoading: false,
        },
      };
    }
    case 'GET_NODE_INVENTORY_LIST_REQUESTED': {
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          nodeID: action.nodeID,
          inventory: {
            ...state.globalSearch.inventory,
            isLoading: true,
          },
        },
      };
    }
    case 'GET_NODE_INVENTORY_LIST_SUCCEED': {
      let {nodeID, data, nextPageUrl, prevPageUrl, total, summaryList} = action;
      if (
        state.globalSearch.nodeID &&
        Number(state.globalSearch.nodeID) !== Number(nodeID)
      ) {
        return state;
      }
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          nodeID: action.nodeID,
          inventory: {
            ...state.globalSearch.inventory,
            list: data,
            nextPageUrl,
            prevPageUrl,
            total,
            summaryList,
            isLoading: false,
          },
        },
      };
    }
    case 'GET_NODE_INVENTORY_LIST_FAILED': {
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          inventory: {
            ...state.globalSearch.inventory,
            isLoading: false,
          },
        },
      };
    }
    case 'GET_NODE_VEHICLE_LIST_REQUESTED': {
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          nodeID: action.nodeID,
          vehicle: {
            ...state.globalSearch.vehicle,
            isLoading: true,
          },
        },
      };
    }
    case 'GET_NODE_VEHICLE_LIST_SUCCEED': {
      let {nodeID, data, nextPageUrl, prevPageUrl, total, summaryList} = action;
      if (
        state.globalSearch.nodeID &&
        Number(state.globalSearch.nodeID) !== Number(nodeID)
      ) {
        return state;
      }
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          nodeID: action.nodeID,
          vehicle: {
            ...state.globalSearch.vehicle,
            list: data,
            nextPageUrl,
            prevPageUrl,
            total,
            summaryList,
            isLoading: false,
          },
        },
      };
    }
    case 'GET_NODE_VEHICLE_LIST_FAILED': {
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          vehicle: {
            ...state.globalSearch.vehicle,
            isLoading: false,
          },
        },
      };
    }
    case 'GET_NODE_EMPLOYEE_LIST_REQUESTED': {
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          nodeID: action.nodeID,
          employee: {
            ...state.globalSearch.employee,
            isLoading: true,
          },
        },
      };
    }
    case 'GET_NODE_EMPLOYEE_LIST_SUCCEED': {
      let {nodeID, data, nextPageUrl, prevPageUrl, total, summaryList} = action;
      if (
        state.globalSearch.nodeID &&
        Number(state.globalSearch.nodeID) !== Number(nodeID)
      ) {
        return state;
      }
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          nodeID: action.nodeID,
          employee: {
            ...state.globalSearch.employee,
            list: data,
            nextPageUrl,
            prevPageUrl,
            total,
            summaryList,
            isLoading: false,
          },
        },
      };
    }
    case 'GET_NODE_EMPLOYEE_LIST_FAILED': {
      return {
        ...state,
        globalSearch: {
          ...state.globalSearch,
          employee: {
            ...state.globalSearch.employee,
            isLoading: false,
          },
        },
      };
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
