// @flow

import {call, put, takeEvery, all, take} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {normalize} from 'normalizr';
// import {AsyncStorage} from 'react-native';

import userAPI from './userAPI';
import {userProfile} from './schema';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';

import type {Action} from '../../storeTypes';

function* userSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('GET_USER_DETAIL_REQUESTED', getUserDetailSaga);
}

function* getUserDetailSaga(action: Action): Generator<*, *, *> {
  if (action.type !== 'GET_USER_DETAIL_REQUESTED') {
    return;
  }
  let {userID} = action;

  try {
    let raw = yield call(userAPI.getUserDetail, {userID});
    let normalizedData = normalize(raw.data, userProfile);
    let result = convertSnakeCasedToCamelCase(normalizedData);

    let {entities: {nodeList, permissionList, user}, result: id} = result;

    if (raw.status.code === 200) {
      yield put({
        type: 'PERMISSION_RECEIVED',
        list: user[id].permission.map((permissionID) => {
          return permissionList[permissionID];
        }),
      });

      yield put({
        type: 'NODE_RECEIVED',
        list: user[id].node.map((nodeID) => {
          return nodeList[nodeID];
        }),
      });

      yield put({
        type: 'GET_USER_DETAIL_SUCCEED',
        user: user[id],
      });
    } else {
      throw new Error(raw.status.description);
    }
  } catch (error) {
    yield put({
      type: 'ERROR_OCCURRED',
      error,
    });
    yield put({
      type: 'SHOW_NOTIFICATION_REQUESTED',
      notification: {
        id: userID,
        text: `Failed to get user detail. ${error.message}`,
      },
    });
    yield put({
      type: 'GET_USER_DETAIL_FAILED',
      error,
    });
  }
}

export {userSagaWatcher, getUserDetailSaga};
