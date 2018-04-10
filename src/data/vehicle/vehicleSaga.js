// @flow

import {takeEvery, put, call} from 'redux-saga/effects';

import vehicleAPI from './vehicleAPI';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';

import type {VehicleAction} from './Vehicle-type';

function* vehicleSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('GET_VEHICLE_DETAIL_REQUESTED', getVehicleDetailSaga);
  yield takeEvery(
    'GET_VEHICLE_ACTIVITY_LIST_REQUESTED',
    getVehicleActivityList,
  );
}

function* getVehicleDetailSaga(action: VehicleAction): Generator<*, *, *> {
  if (action.type !== 'GET_VEHICLE_DETAIL_REQUESTED') {
    return;
  }

  let {vehicleID} = action;
  try {
    let infoRaw = yield call(vehicleAPI.getVehicleDetail, {vehicleID});
    let infoResult = convertSnakeCasedToCamelCase(infoRaw);

    if (infoResult.status.code === 200) {
      let {data} = infoResult;
      yield put({
        type: 'GET_VEHICLE_DETAIL_SUCCEED',
        detailInfo: data,
      });
    } else {
      throw new Error(
        `Failed to get vehicle detail. ${infoResult.status.description}`,
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
        id: vehicleID,
        text: error.message,
      },
    });

    yield put({
      type: 'GET_VEHICLE_DETAIL_FAILED',
      error,
    });
  }
}

function* getVehicleActivityList(action: VehicleAction): Generator<*, *, *> {
  if (action.type !== 'GET_VEHICLE_ACTIVITY_LIST_REQUESTED') {
    return;
  }

  let {vehicleID, limit, sortByColumn, sortOrderType, page} = action;
  try {
    let raw = yield call(vehicleAPI.getVehicleActivities, {
      vehicleID,
      limit,
      sortByColumn,
      sortOrderType,
      page,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let {data, nextPageUrl, prevPageUrl, total = 0} = result.data;
      yield put({
        type: 'GET_VEHICLE_ACTIVITY_LIST_SUCCEED',
        vehicleID,
        data,
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
        id: vehicleID,
        text: `Failed to get vehicle activity list. ${error.message}`,
      },
    });
    yield put({
      type: 'GET_VEHICLE_ACTIVITY_LIST_FAILED',
      error,
    });
  }
}

export {vehicleSagaWatcher, getVehicleDetailSaga, getVehicleActivityList};
