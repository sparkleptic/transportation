// @flow

import {call, put, takeEvery} from 'redux-saga/effects';

import globalSearchAPI from './globalSearchAPI';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';

import type {GlobalSearchAction} from './GlobalSearch-type';

function* globalSearchSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('GLOBAL_SEARCH_SUGGESTION_REQUESTED', searchSaga);
}

function* searchSaga(action: GlobalSearchAction): Generator<*, *, *> {
  if (action.type !== 'GLOBAL_SEARCH_SUGGESTION_REQUESTED') {
    return;
  }
  let {searchText} = action;

  try {
    let raw = yield call(globalSearchAPI.search, {
      searchText,
    });
    let result = convertSnakeCasedToCamelCase(raw);

    if (result.status.code === 200) {
      let {data} = result;
      yield put({
        type: 'GLOBAL_SEARCH_SUGGESTION_SUCCEED',
        suggestionList: data,
      });
    } else {
      throw new Error(result.status.description);
    }
  } catch (error) {
    yield put({
      type: 'ERROR_OCCURRED',
      error,
    });
    yield put({
      type: 'SHOW_NOTIFICATION_REQUESTED',
      notification: {
        id: searchText,
        text: `Failed to global search. ${error.message}`,
      },
    });
    yield put({
      type: 'GLOBAL_SEARCH_SUGGESTION_FAILED',
      error,
    });
  }
}

export {globalSearchSagaWatcher, searchSaga};
