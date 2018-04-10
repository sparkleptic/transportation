// @flow

import {takeEvery, put, call} from 'redux-saga/effects';
import {
  vehicleSagaWatcher,
  getVehicleDetailSaga,
  getVehicleActivityList,
} from '../vehicleSaga';
import vehicleAPI from '../vehicleAPI';

describe('vehicleSaga', () => {
  it('should run the watcher correctly', () => {
    let generator = vehicleSagaWatcher();

    expect(generator.next().value).toEqual(
      takeEvery('GET_VEHICLE_DETAIL_REQUESTED', getVehicleDetailSaga),
    );
    expect(generator.next().value).toEqual(
      takeEvery('GET_VEHICLE_ACTIVITY_LIST_REQUESTED', getVehicleActivityList),
    );
  });

  it('should fetch vehicle detail correctly', () => {
    let action = {
      type: 'GET_VEHICLE_DETAIL_REQUESTED',
      vehicleID: 123,
    };
    let generator = getVehicleDetailSaga(action);

    expect(generator.next().value).toEqual(
      call(vehicleAPI.getVehicleDetail, {vehicleID: action.vehicleID}),
    );

    let detailResponse = {
      status: {
        code: 200,
      },
      data: {},
    };

    expect(generator.next(detailResponse).value).toEqual(
      put({
        type: 'GET_VEHICLE_DETAIL_SUCCEED',
        detailInfo: detailResponse.data,
      }),
    );
  });

  it('should fetch activity list', () => {
    let action = {
      type: 'GET_VEHICLE_ACTIVITY_LIST_REQUESTED',
      vehicleID: 123,
      limit: 5,
      sortByColumn: '',
      sortOrderType: 'asc',
      page: 1,
    };
    let generator = getVehicleActivityList(action);

    let {type, ...restActionParams} = action;

    expect(generator.next().value).toEqual(
      call(vehicleAPI.getVehicleActivities, {...restActionParams}),
    );

    let response = {
      status: {
        code: 200,
      },
      data: {
        data: [],
      },
    };

    expect(generator.next(response).value).toEqual(
      put({
        type: 'GET_VEHICLE_ACTIVITY_LIST_SUCCEED',
        vehicleID: action.vehicleID,
        data: [],
        nextPageUrl: undefined,
        prevPageUrl: undefined,
        total: 0,
      }),
    );
  });
});
