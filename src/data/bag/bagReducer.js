// @flow

import type {BagState, BagAction} from './Bag-type';
const initialState = {
  list: [],
  nextPageUrl: null,
  prevPageUrl: null,
  total: 0,
  isLoading: false,
  searchTextInput: '',
};

export default function connoteReducer(
  state: BagState = initialState,
  action: BagAction,
) {
  switch (action.type) {
    case 'BAG_SEARCH_TEXT_INPUT_CHANGED': {
      return {
        ...state,
        searchTextInput: action.searchTextInput,
      };
    }
    case 'GET_BAG_LIST_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_BAG_LIST_SUCCEED': {
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
    case 'RESET_BAG_LIST_DATA': {
      return initialState;
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
