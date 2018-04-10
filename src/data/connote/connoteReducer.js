// @flow

import type {ConnoteState, ConnoteAction} from './Connote-type';
const initialState = {
  list: [],
  searchTextInput: '',
  nextPageUrl: null,
  prevPageUrl: null,
  total: 0,
  isLoading: false,
};

export default function connoteReducer(
  state: ConnoteState = initialState,
  action: ConnoteAction,
) {
  switch (action.type) {
    case 'CONNOTE_SEARCH_TEXT_INPUT_CHANGED': {
      return {
        ...state,
        searchTextInput: action.searchTextInput,
      };
    }
    case 'GET_CONNOTE_LIST_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_CONNOTE_LIST_SUCCEED': {
      let {data, nextPageUrl, prevPageUrl, total} = action;
      return {
        ...state,
        isLoading: false,
        list: data,
        nextPageUrl,
        prevPageUrl,
        total,
      };
    }
    case 'RESET_CONNOTE_LIST_DATA': {
      return initialState;
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
