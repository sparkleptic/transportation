// @flow

import {takeEvery, put, call} from 'redux-saga/effects';
import {
  employeeSagaWatcher,
  getEmployeeDetailSaga,
  getEmployeeActivityList,
} from '../employeSaga';
import employeeAPI from '../employeeAPI';

describe('employeeSaga', () => {
  it('should run the watcher correctly', () => {
    let generator = employeeSagaWatcher();

    expect(generator.next().value).toEqual(
      takeEvery('GET_EMPLOYEE_DETAIL_REQUESTED', getEmployeeDetailSaga),
    );
    expect(generator.next().value).toEqual(
      takeEvery(
        'GET_EMPLOYEE_ACTIVITY_LIST_REQUESTED',
        getEmployeeActivityList,
      ),
    );
  });

  it('should fetch user detail correctly', () => {
    let action = {
      type: 'GET_EMPLOYEE_DETAIL_REQUESTED',
      employeeID: 123,
    };
    let generator = getEmployeeDetailSaga(action);

    expect(generator.next().value).toEqual(
      call(employeeAPI.getEmployeeDetail, {employeeID: action.employeeID}),
    );

    let detailResponse = {
      status: {
        code: 200,
      },
      data: {},
    };

    expect(generator.next(detailResponse).value).toEqual(
      put({
        type: 'GET_EMPLOYEE_DETAIL_SUCCEED',
        personalInfo: detailResponse.data,
      }),
    );
  });

  it('should fetch activity list', () => {
    let action = {
      type: 'GET_EMPLOYEE_ACTIVITY_LIST_REQUESTED',
      employeeID: 123,
      limit: 5,
      sortByColumn: '',
      sortOrderType: 'asc',
      page: 1,
    };
    let generator = getEmployeeActivityList(action);

    let {type, ...restActionParams} = action;

    expect(generator.next().value).toEqual(
      call(employeeAPI.getEmployeeActivities, {...restActionParams}),
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
        type: 'GET_EMPLOYEE_ACTIVITY_LIST_SUCCEED',
        employeeID: action.employeeID,
        data: [],
        nextPageUrl: undefined,
        prevPageUrl: undefined,
        total: 0,
      }),
    );
  });
});
