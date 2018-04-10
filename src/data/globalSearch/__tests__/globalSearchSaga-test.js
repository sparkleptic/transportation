// @flow

import {call, put, takeEvery} from 'redux-saga/effects';

import globalSearchAPI from '../globalSearchAPI';
import convertSnakeCasedToCamelCase from '../../../helpers/convertSnakeCasedToCamelCase';
import {globalSearchSagaWatcher, searchSaga} from '../globalSearchSaga';

describe('globalSearchSaga', () => {
  it('should run the watcher correctly', () => {
    let generator = globalSearchSagaWatcher();
    expect(generator.next().value).toEqual(
      takeEvery('GLOBAL_SEARCH_SUGGESTION_REQUESTED', searchSaga),
    );
  });
  it('should do global search correctly', () => {
    let action = {
      type: 'GLOBAL_SEARCH_SUGGESTION_REQUESTED',
      searchText: 'searchText',
    };

    let response = {
      data: [
        {
          desc: 'example address',
          id: 6877,
          name: 'AGEN',
          route: '/nodes/6877',
          type: 'node',
        },
        {
          desc: 'another example address',
          id: 123,
          name: 'User Test',
          route: '/nodes/123',
          type: 'employee_male',
        },
      ],
      status: {
        code: 200,
      },
    };
    let generator = searchSaga(action);

    let converted = response.data.map((data) =>
      convertSnakeCasedToCamelCase(data),
    );

    expect(generator.next().value).toEqual(
      call(globalSearchAPI.search, {
        searchText: action.searchText,
      }),
    );

    expect(generator.next(response).value).toEqual(
      put({
        type: 'GLOBAL_SEARCH_SUGGESTION_SUCCEED',
        suggestionList: converted,
      }),
    );
  });
});
