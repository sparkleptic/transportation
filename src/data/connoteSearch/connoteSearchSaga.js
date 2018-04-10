// @flow

import {takeEvery, put, call} from 'redux-saga/effects/';

import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';
import connoteSearchApi from './connoteSearchAPI';

import type {
  GetConnoteByIdRequestedAction,
  GetConnoteByIdSuccessAction,
  GetConnotActivityByIdRequestedAction,
} from './ConnoteSearch-type';

function* getConnoteById(
  action: GetConnoteByIdRequestedAction,
): Generator<*, *, *> {
  if (action.type === 'GET_CONNOTE_BY_ID_REQUESTED') {
    let {id} = action;
    try {
      let raw = yield call(connoteSearchApi.getConnoteById, {
        id,
      });
      let result = convertSnakeCasedToCamelCase(raw);
      let {data} = result;

      let getConnoteByIdSuccessAction: GetConnoteByIdSuccessAction = {
        type: 'GET_CONNOTE_BY_ID_SUCCESS',
        data,
      };
      if (result.status.code === 200) {
        yield put(getConnoteByIdSuccessAction);
      } else {
        throw new Error(
          `Failed to get connote by id. ${result.status.description}`,
        );
      }
    } catch (error) {
      yield put({
        type: 'ERROR_OCCURED',
        error,
      });

      yield put({
        type: 'SHOW_NOTIFICATION_REQUESTED',
        notification: {
          id,
          text: `Failed to get connote by id. ${error.message}`,
        },
      });
    }
  }
  return;
}

function* getConnotActivitySaga(
  action: GetConnotActivityByIdRequestedAction,
): Generator<*, *, *> {
  let {id, limit, sortByColumn, sortOrderType, page} = action;
  try {
    let raw = yield call(connoteSearchApi.getConnoteActivity, {
      id,
      limit,
      sortByColumn,
      sortOrderType,
      page,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let {data, total = 0} = result;
      yield put({
        type: 'GET_CONNOTE_ACTIVITY_BY_ID_SUCCEED',
        id,
        data,
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
        id,
        text: `Failed to get connote activity list. ${error.message}`,
      },
    });
    yield put({
      type: 'GET_CONNOTE_ACTIVITY_BY_ID_FAILED',
      error,
    });
  }
}

function* connoteSearchSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('GET_CONNOTE_BY_ID_REQUESTED', getConnoteById);
  yield takeEvery(
    'GET_CONNOTE_ACTIVITY_BY_ID_REQUESTED',
    getConnotActivitySaga,
  );
}

export {getConnoteById, connoteSearchSagaWatcher, getConnotActivitySaga};
