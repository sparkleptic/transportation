// @flow

import type {
  ConnoteSearchAction,
  ConnoteSearchState,
} from './ConnoteSearch-type.js';

const initialState = {
  connoteID: null,
  detailInfo: null,
  fetchLoading: false,
  activity: {
    list: [],
    total: 0,
    isLoading: false,
  },
};

export default function connoteSearchReducer(
  state: ConnoteSearchState = initialState,
  action: ConnoteSearchAction,
) {
  switch (action.type) {
    case 'GET_CONNOTE_BY_ID_REQUESTED': {
      return {...state, connoteID: action.id, fetchLoading: true};
    }
    case 'GET_CONNOTE_BY_ID_SUCCESS': {
      if (action.data) {
        return {...state, detailInfo: action.data, fetchLoading: false};
      }
      return state;
    }
    case 'GET_CONNOTE_ACTIVITY_BY_ID_REQUESTED': {
      return {
        ...state,
        activity: {
          ...state.activity,
          isLoading: true,
        },
      };
    }

    case 'GET_CONNOTE_ACTIVITY_BY_ID_SUCCEED': {
      let {id, data, total} = action;
      let {connoteID} = state;

      if (connoteID && connoteID !== id) {
        return state;
      }

      return {
        ...state,
        activity: {
          ...state.activity,
          list: data,
          total,
          isLoading: false,
        },
      };
    }

    case 'GET_CONNOTE_ACTIVITY_BY_ID_FAILED': {
      return {
        ...state,
        activity: {
          ...state.activity,
          isLoading: false,
        },
      };
    }
    default: {
      return state;
    }
  }
}
