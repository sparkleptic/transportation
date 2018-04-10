// @flow

import {call, put, takeEvery, all, take} from 'redux-saga/effects';

import bagAPI from './bagAPI';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';

import type {BagAction} from './Bag-type';

function* bagSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('GET_BAG_LIST_REQUESTED', getBagListSaga);
}

function* getBagListSaga(action: BagAction): Generator<*, *, *> {
  if (action.type !== 'GET_BAG_LIST_REQUESTED') {
    return;
  }
  let {search, limit, sortByColumn, sortOrderType, page, nodeID} = action;
  if (!nodeID) {
    return;
  }
  try {
    let raw = yield call(bagAPI.getBagList, {
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
        type: 'GET_BAG_LIST_SUCCEED',
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
        text: `Failed to get bag list. ${error.message}`,
      },
    });
    yield put({
      type: 'GET_BAG_LIST_FAILED',
      error,
    });
  }
}

export {bagSagaWatcher, getBagListSaga};
