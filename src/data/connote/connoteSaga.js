// @flow

import {call, put, takeEvery, all, take} from 'redux-saga/effects';

import connoteAPI from './connoteAPI';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';

import type {ConnoteAction} from './Connote-type';

function* connoteSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('GET_CONNOTE_LIST_REQUESTED', getConnoteListSaga);
}

function* getConnoteListSaga(action: ConnoteAction): Generator<*, *, *> {
  if (action.type !== 'GET_CONNOTE_LIST_REQUESTED') {
    return;
  }
  let {search, limit, sortByColumn, sortOrderType, page, nodeID} = action;
  if (!nodeID) {
    return;
  }
  try {
    let raw = yield call(connoteAPI.getConnoteList, {
      search,
      limit,
      sortByColumn,
      sortOrderType,
      page,
      nodeID,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let {nextPageUrl, prevPageUrl, total} = result;
      let convertedData = raw.data.map((datum) =>
        convertSnakeCasedToCamelCase(datum),
      );
      yield put({
        type: 'GET_CONNOTE_LIST_SUCCEED',
        data: convertedData,
        nextPageUrl,
        prevPageUrl,
        total,
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
        id: nodeID,
        text: `Failed to get connote list. ${error.message}`,
      },
    });
    yield put({
      type: 'GET_CONNOTE_LIST_FAILED',
      error,
    });
  }
}

export {connoteSagaWatcher, getConnoteListSaga};
