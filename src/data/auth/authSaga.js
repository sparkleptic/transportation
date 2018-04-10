// @flow

import {call, put, takeEvery, all, take, select} from 'redux-saga/effects';
import {push} from 'react-router-redux';

import authAPI from './authAPI';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';
import storageKey from '../../constants/storageKey';
import {setDefaultHeadersConfiguration} from '../../helpers/fetchJSON';
import {
  persistData,
  getPersistedData,
  clearPersistedData,
} from '../../helpers/persistData';

import type {Action} from '../../storeTypes';

function* authSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('LOGIN_REQUESTED', loginSaga);
  yield takeEvery('SIGN_OUT_REQUESTED', signOutSaga);

  yield call(verifyExistingToken);
}

function* verifyExistingToken(): Generator<*, *, *> {
  let token = yield call(getPersistedData, storageKey.auth.token);
  let userID = yield call(getPersistedData, storageKey.user.id);
  if (token && userID) {
    yield call(setDefaultHeadersConfiguration, 'Authorization', token);
    yield put({
      type: 'VALIDATE_TOKEN_REQUESTED',
    });
    yield put({
      type: 'GET_USER_DETAIL_REQUESTED',
      userID,
    });

    yield take('GET_USER_DETAIL_SUCCEED');
    yield put({
      type: 'LOGIN_SUCCEED',
      token,
      userID,
    });
  }
}

function* loginSaga(action: Action): Generator<*, *, *> {
  if (action.type !== 'LOGIN_REQUESTED') {
    return;
  }
  let {username, password, onSuccess} = action;
  try {
    let raw = yield call(authAPI.login, {username, password});
    let result = convertSnakeCasedToCamelCase(raw);
    let {data: {data, status, token}} = result;
    if (status.code === 200) {
      let adjustedToken = `Bearer ${token}`;
      yield call(
        setDefaultHeadersConfiguration,
        'Authorization',
        adjustedToken,
      );

      yield call(persistData, 'userData', JSON.stringify(raw.data));
      yield call(persistData, storageKey.auth.token, adjustedToken);
      yield call(persistData, storageKey.user.id, data.userID);
      yield put({
        type: 'GET_USER_DETAIL_REQUESTED',
        userID: data.userID,
      });

      yield take('GET_USER_DETAIL_SUCCEED');
      yield put({
        type: 'LOGIN_SUCCEED',
        token: adjustedToken,
        userID: data.userID,
      });

      if (onSuccess) {
        yield call(onSuccess);
      } else {
        yield put(push('/new-transactions'));
      }
    } else {
      throw new Error(status.description);
    }
  } catch (error) {
    yield put({
      type: 'ERROR_OCCURRED',
      error,
    });
    yield put({
      type: 'SHOW_NOTIFICATION_REQUESTED',
      notification: {
        id: username,
        text: `Failed to login. ${error.message}`,
      },
    });
    yield put({
      type: 'LOGIN_FAILED',
      error,
    });
  }
}

function* signOutSaga(): Generator<*, *, *> {
  yield call(clearPersistedData);
  yield put({
    type: 'SIGN_OUT_SUCCEED',
  });

  yield put(push('/login'));
}

export {authSagaWatcher, loginSaga, signOutSaga, verifyExistingToken};
