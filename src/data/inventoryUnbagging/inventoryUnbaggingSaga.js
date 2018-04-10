// @flow

import {call, put, takeEvery, all, take, select} from 'redux-saga/effects';

import inventoryUnbaggingAPI from './inventoryUnbaggingAPI';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';

import type {
  GetBackHistoryRequested,
  GetBackHistorySucceed,
  UnbagBagOnlyRequested,
  UnbagBagConnoteRequested,
} from './InventoryUnbagging-type';

function* inventoryUnbaggingSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('GET_BAG_HISTORY_REQUESTED', getBagHistorySaga);
  yield takeEvery('UNBAG_BAG_ONLY_REQUESTED', unbagBagOnlySaga);
  yield takeEvery('UNBAG_BAG_CONNOTE_REQUESTED', unbagBagConnoteSaga);
}

function* getBagHistorySaga(
  action: GetBackHistoryRequested,
): Generator<*, *, *> {
  let {nodeID, limit, sortByColumn, sortOrderType, page} = action;
  try {
    let raw = yield call(inventoryUnbaggingAPI.getUnbaggingHistory, {
      nodeID,
      limit,
      sortByColumn,
      sortOrderType,
      page,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let {data, total = 0, totalBagUnbagged = 0} = result;
      let action: GetBackHistorySucceed = {
        type: 'GET_BAG_HISTORY_SUCCEED',
        data,
        total,
        nodeID,
        totalUnbagged: totalBagUnbagged,
      };
      yield put(action);
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
        text: `Failed to get bag history from node id ${nodeID}. ${
          error.message
        }`,
      },
    });
    yield put({
      type: 'GET_BAG_HISTORY_FAILED',
      error,
    });
  }
}

function* unbagBagOnlySaga(action: UnbagBagOnlyRequested): Generator<*, *, *> {
  let {
    nodeID,
    bagNumber,
    tableSettings: {limit, sortByColumn, sortOrderType, page},
  } = action;
  try {
    let raw = yield call(inventoryUnbaggingAPI.unbagBagOnly, {
      nodeID,
      bagNumber,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let action: GetBackHistoryRequested = {
        type: 'GET_BAG_HISTORY_REQUESTED',
        nodeID,
        limit,
        sortByColumn,
        sortOrderType,
        page,
      };
      yield put(action);
      yield put({
        type: 'SHOW_NOTIFICATION_REQUESTED',
        notification: {
          id: bagNumber,
          text: `Unbag ${bagNumber} success`,
        },
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
        id: bagNumber,
        text: `Failed to unbag ${bagNumber} from node id ${nodeID}. ${
          error.message
        }`,
      },
    });
    yield put({
      type: 'UNBAG_BAG_ONLY_FAILED',
      error,
    });
  }
}

function* unbagBagConnoteSaga(
  action: UnbagBagConnoteRequested,
): Generator<*, *, *> {
  let {
    nodeID,
    connoteNumber,
    tableSettings: {limit, sortByColumn, sortOrderType, page},
  } = action;
  try {
    let raw = yield call(inventoryUnbaggingAPI.unbagBagConnote, {
      nodeID,
      connoteNumber,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let action: GetBackHistoryRequested = {
        type: 'GET_BAG_HISTORY_REQUESTED',
        nodeID,
        limit,
        sortByColumn,
        sortOrderType,
        page,
      };
      yield put(action);
      yield put({
        type: 'SHOW_NOTIFICATION_REQUESTED',
        notification: {
          id: connoteNumber,
          text: `Unbag ${connoteNumber} success`,
        },
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
        id: connoteNumber,
        text: `Failed to unbag ${connoteNumber} from node id ${nodeID}. ${
          error.message
        }`,
      },
    });
    yield put({
      type: 'UNBAG_BAG_CONNOTE_FAILED',
      error,
    });
  }
}

export {inventoryUnbaggingSagaWatcher, getBagHistorySaga};
