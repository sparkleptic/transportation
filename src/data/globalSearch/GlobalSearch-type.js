// @flow

export type GlobalSearchSuggestionItemType =
  | 'employee_male'
  | 'employee_female'
  | 'node'
  | 'vehicle'
  | 'connote'
  | 'customer';

export type GlobalSearchSuggestionItem = {
  type: GlobalSearchSuggestionItemType,
  id: string,
  name: string,
  desc: string,
  route: string,
};

export type GlobalSearchState = {
  textInput: string,
  suggestionList: Array<GlobalSearchSuggestionItem>,
  isLoading: boolean,
};

export type GlobalSearchAction =
  | {
      type: 'GLOBAL_SEARCH_RESET_SUGGESTION_REQUESTED',
    }
  | {
      type: 'GLOBAL_SEARCH_TEXT_INPUT_CHANGED',
      textInput: string,
    }
  | {
      type: 'GLOBAL_SEARCH_SUGGESTION_REQUESTED',
      searchText: string,
    }
  | {
      type: 'GLOBAL_SEARCH_SUGGESTION_SUCCEED',
      suggestionList: Array<GlobalSearchSuggestionItem>,
    }
  | {
      type: 'GLOBAL_SEARCH_SUGGESTION_FAILED',
      error: Error,
    };
