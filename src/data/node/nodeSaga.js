// @flow

import {takeEvery, put, call} from 'redux-saga/effects';

import nodeAPI from './nodeAPI';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';

import type {NodeAction} from './Node-type';

function* nodeSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('GET_NODE_DETAIL_REQUESTED', getNodeDetailSaga);
  yield takeEvery('GET_NODE_INVENTORY_LIST_REQUESTED', getNodeIventoryList);
  yield takeEvery('GET_NODE_VEHICLE_LIST_REQUESTED', getNodeVehicleList);
  yield takeEvery('GET_NODE_EMPLOYEE_LIST_REQUESTED', getNodeEmployeeList);
}

function* getNodeDetailSaga(action: NodeAction): Generator<*, *, *> {
  if (action.type !== 'GET_NODE_DETAIL_REQUESTED') {
    return;
  }

  let {nodeID} = action;
  try {
    let infoRaw = yield call(nodeAPI.getNodeDetail, {nodeID});
    let infoResult = convertSnakeCasedToCamelCase(infoRaw);

    if (infoResult.status.code === 200) {
      let {data} = infoResult;
      yield put({
        type: 'GET_NODE_DETAIL_SUCCEED',
        nodeID,
        detailInfo: data,
      });
    } else {
      throw new Error(
        `Failed to get node detail. ${infoResult.status.description}`,
      );
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
        text: error.message,
      },
    });

    yield put({
      type: 'GET_NODE_DETAIL_FAILED',
      error,
    });
  }
}

function* getNodeIventoryList(action: NodeAction): Generator<*, *, *> {
  if (action.type !== 'GET_NODE_INVENTORY_LIST_REQUESTED') {
    return;
  }

  let {nodeID, limit, sortByColumn, sortOrderType, page} = action;
  try {
    let raw = yield call(nodeAPI.getNodeInventoryVehicleEmployeeList, {
      nodeID,
      type: 'inventory',
      limit,
      sortByColumn,
      sortOrderType,
      page,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let {data, nextPageUrl, prevPageUrl, total = 0, bag = 0} = result;
      yield put({
        type: 'GET_NODE_INVENTORY_LIST_SUCCEED',
        nodeID,
        data,
        nextPageUrl,
        prevPageUrl,
        total,
        summaryList: [
          {
            key: 'Connotes',
            value: String(total),
          },
          {
            key: 'Bags',
            value: String(bag),
          },
        ],
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
        text: `Failed to get node inventory list. ${error.message}`,
      },
    });
    yield put({
      type: 'GET_NODE_INVENTORY_LIST_FAILED',
      error,
    });
  }
}

function* getNodeVehicleList(action: NodeAction): Generator<*, *, *> {
  if (action.type !== 'GET_NODE_VEHICLE_LIST_REQUESTED') {
    return;
  }

  let {nodeID, limit, sortByColumn, sortOrderType, page} = action;
  try {
    let raw = yield call(nodeAPI.getNodeInventoryVehicleEmployeeList, {
      nodeID,
      type: 'vehicle',
      limit,
      sortByColumn,
      sortOrderType,
      page,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let {data, nextPageUrl, prevPageUrl, total = 0, dataGroup = []} = result;
      yield put({
        type: 'GET_NODE_VEHICLE_LIST_SUCCEED',
        nodeID,
        data,
        nextPageUrl,
        prevPageUrl,
        total,
        summaryList: dataGroup.map((summaryItem) => {
          return {
            key: summaryItem.typeName,
            value: summaryItem.jumlah,
          };
        }),
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
        text: `Failed to get node vehicle list. ${error.message}`,
      },
    });
    yield put({
      type: 'GET_NODE_VEHICLE_LIST_FAILED',
      error,
    });
  }
}

function* getNodeEmployeeList(action: NodeAction): Generator<*, *, *> {
  if (action.type !== 'GET_NODE_EMPLOYEE_LIST_REQUESTED') {
    return;
  }

  let {nodeID, limit, sortByColumn, sortOrderType, page} = action;
  try {
    let raw = yield call(nodeAPI.getNodeInventoryVehicleEmployeeList, {
      nodeID,
      type: 'employee',
      limit,
      sortByColumn,
      sortOrderType,
      page,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let {data, nextPageUrl, prevPageUrl, total = 0, dataGroup = {}} = result;
      let summaryList = Object.entries(dataGroup).map(([key, value]) => {
        if (key === 'total') {
          return {
            key: 'Total',
            value: String(value),
          };
        } else {
          if (
            value &&
            typeof value === 'object' &&
            value.hasOwnProperty('statusName') &&
            value.hasOwnProperty('jumlah')
          ) {
            return {
              key: value.statusName,
              value: value.jumlah,
            };
          } else {
            return {key: '', value: ''};
          }
        }
      });

      yield put({
        type: 'GET_NODE_EMPLOYEE_LIST_SUCCEED',
        nodeID,
        data,
        nextPageUrl,
        prevPageUrl,
        total,
        summaryList,
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
        text: `Failed to get node employee list. ${error.message}`,
      },
    });
    yield put({
      type: 'GET_NODE_EMPLOYEE_LIST_FAILED',
      error,
    });
  }
}

export {
  nodeSagaWatcher,
  getNodeDetailSaga,
  getNodeIventoryList,
  getNodeVehicleList,
  getNodeEmployeeList,
};
