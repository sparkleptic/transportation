// @flow

import type {GlobalSearchState, GlobalSearchAction} from './GlobalSearch-type';

const initialState = {
  textInput: '',
  suggestionList: [],
  isLoading: false,
};

export default function globalSearchReducer(
  state: GlobalSearchState = initialState,
  action: GlobalSearchAction,
) {
  switch (action.type) {
    case 'GLOBAL_SEARCH_TEXT_INPUT_CHANGED': {
      return {
        ...state,
        textInput: action.textInput,
      };
    }
    case 'GLOBAL_SEARCH_SUGGESTION_REQUESTED': {
      return {
        ...state,
        isLoading: true,
        suggestionList: [],
      };
    }
    case 'GLOBAL_SEARCH_SUGGESTION_SUCCEED': {
      return {
        ...state,
        isLoading: false,
        suggestionList: action.suggestionList,
      };
    }
    case 'GLOBAL_SEARCH_SUGGESTION_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'GLOBAL_SEARCH_RESET_SUGGESTION_REQUESTED': {
      return {
        ...state,
        suggestionList: [],
      };
    }
    default:
      return state;
  }
}
