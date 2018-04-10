// @flow

import type {ManifestState, ManifestAction} from './Manifest-type';
const initialState = {
  list: [],
  searchTextInput: '',
  nextPageUrl: null,
  prevPageUrl: null,
  total: 0,
  isLoading: false,
};

export default function manifestReducer(
  state: ManifestState = initialState,
  action: ManifestAction,
) {
  switch (action.type) {
    case 'MANIFEST_SEARCH_TEXT_INPUT_CHANGED': {
      return {
        ...state,
        searchTextInput: action.searchTextInput,
      };
    }
    case 'GET_MANIFEST_LIST_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_MANIFEST_LIST_SUCCEED': {
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
    case 'RESET_MANIFEST_LIST_DATA': {
      return initialState;
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
