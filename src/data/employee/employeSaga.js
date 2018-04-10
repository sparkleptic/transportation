// @flow

import {takeEvery, put, call} from 'redux-saga/effects';

import employeeAPI from './employeeAPI';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';

import type {EmployeeAction} from './Employee-type';

function* employeeSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('GET_EMPLOYEE_DETAIL_REQUESTED', getEmployeeDetailSaga);
  yield takeEvery(
    'GET_EMPLOYEE_ACTIVITY_LIST_REQUESTED',
    getEmployeeActivityList,
  );
  yield takeEvery('GET_EMPLOYEES_COURIER_REQUESTED', getEmployeesCourierSaga);
}

function* getEmployeeDetailSaga(action: EmployeeAction): Generator<*, *, *> {
  if (action.type !== 'GET_EMPLOYEE_DETAIL_REQUESTED') {
    return;
  }

  let {employeeID} = action;
  try {
    let infoRaw = yield call(employeeAPI.getEmployeeDetail, {employeeID});
    let infoResult = convertSnakeCasedToCamelCase(infoRaw);

    if (infoResult.status.code === 200) {
      let {data} = infoResult;
      yield put({
        type: 'GET_EMPLOYEE_DETAIL_SUCCEED',
        personalInfo: data,
      });
    } else {
      throw new Error(
        `Failed to get employee detail. ${infoResult.status.description}`,
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
        id: employeeID,
        text: error.message,
      },
    });

    yield put({
      type: 'GET_EMPLOYEE_DETAIL_FAILED',
      error,
    });
  }
}

function* getEmployeeActivityList(action: EmployeeAction): Generator<*, *, *> {
  if (action.type !== 'GET_EMPLOYEE_ACTIVITY_LIST_REQUESTED') {
    return;
  }

  let {employeeID, limit, sortByColumn, sortOrderType, page} = action;
  try {
    let raw = yield call(employeeAPI.getEmployeeActivities, {
      employeeID,
      limit,
      sortByColumn,
      sortOrderType,
      page,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let {data, nextPageUrl, prevPageUrl, total = 0} = result.data;
      yield put({
        type: 'GET_EMPLOYEE_ACTIVITY_LIST_SUCCEED',
        employeeID,
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
        id: employeeID,
        text: `Failed to get employee activity list. ${error.message}`,
      },
    });
    yield put({
      type: 'GET_EMPLOYEE_ACTIVITY_LIST_FAILED',
      error,
    });
  }
}

function* getEmployeesCourierSaga(action: EmployeeAction): Generator<*, *, *> {
  if (action.type !== 'GET_EMPLOYEES_COURIER_REQUESTED') {
    return;
  }
  console.log('request came in employees courier');
  try {
    let infoRaw = yield call(employeeAPI.getEmployeesCourier);
    let infoResult = convertSnakeCasedToCamelCase(infoRaw);

    if (infoResult.status.code === 200) {
      let {data} = infoResult;
      yield put({
        type: 'GET_EMPLOYEES_COURIER_SUCCEED',
        personalInfo: data,
      });
    } else {
      throw new Error(
        `Failed to get couriers. ${infoResult.status.description}`,
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
        id: 'couriers',
        text: error.message,
      },
    });

    yield put({
      type: 'GET_EMPLOYEE_COURIERS_FAILED',
      error,
    });
  }
}

export {employeeSagaWatcher, getEmployeeDetailSaga, getEmployeeActivityList, getEmployeesCourierSaga};
