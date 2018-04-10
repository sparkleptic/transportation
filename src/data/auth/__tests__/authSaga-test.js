// @flow
import {call, put, takeEvery, all, take, select} from 'redux-saga/effects';
import {push} from 'react-router-redux';

import {
  authSagaWatcher,
  loginSaga,
  signOutSaga,
  verifyExistingToken,
} from '../authSaga';
import authAPI from '../authAPI';
import convertSnakeCasedToCamelCase from '../../../helpers/convertSnakeCasedToCamelCase';
import storageKey from '../../../constants/storageKey';
import {setDefaultHeadersConfiguration} from '../../../helpers/fetchJSON';
import {
  persistData,
  getPersistedData,
  clearPersistedData,
} from '../../../helpers/persistData';

describe('authSaga', () => {
  it('should run the watcher correctly and verify existing token if any', () => {
    let generator = authSagaWatcher();
    expect(generator.next().value).toEqual(
      takeEvery('LOGIN_REQUESTED', loginSaga),
    );
    expect(generator.next().value).toEqual(
      takeEvery('SIGN_OUT_REQUESTED', signOutSaga),
    );

    expect(generator.next().value).toEqual(call(verifyExistingToken));
  });

  it('should verify token correctly', () => {
    let generator = verifyExistingToken();
    let token = '123';
    let userID = 'userID';
    expect(generator.next().value).toEqual(
      call(getPersistedData, storageKey.auth.token),
    );
    expect(generator.next(token).value).toEqual(
      call(getPersistedData, storageKey.user.id),
    );

    expect(generator.next(userID).value).toEqual(
      call(setDefaultHeadersConfiguration, 'Authorization', token),
    );

    expect(generator.next().value).toEqual(
      put({
        type: 'VALIDATE_TOKEN_REQUESTED',
      }),
    );

    expect(generator.next().value).toEqual(
      put({
        type: 'GET_USER_DETAIL_REQUESTED',
        userID,
      }),
    );

    expect(generator.next().value).toEqual(take('GET_USER_DETAIL_SUCCEED'));
    expect(generator.next().value).toEqual(
      put({
        type: 'LOGIN_SUCCEED',
        token,
        userID,
      }),
    );
  });

  it('should log user in to the system and save the token', () => {
    let auth = {
      username: 'username',
      password: 'password',
    };
    let action = {
      type: 'LOGIN_REQUESTED',
      ...auth,
    };
    let generator = loginSaga(action);

    expect(generator.next().value).toEqual(call(authAPI.login, {...auth}));

    let response = {
      data: {
        status: {
          code: 200,
        },
        data: {
          userID: 123,
        },
        token: 'token',
      },
    };

    let adjustedToken = `Bearer ${response.data.token}`;

    expect(generator.next(response).value).toEqual(
      call(setDefaultHeadersConfiguration, 'Authorization', adjustedToken),
    );

    expect(generator.next().value).toEqual(
      call(persistData, 'userData', JSON.stringify(response.data)),
    );
    expect(generator.next().value).toEqual(
      call(persistData, storageKey.auth.token, adjustedToken),
    );
    expect(generator.next().value).toEqual(
      call(persistData, storageKey.user.id, response.data.data.userID),
    );

    expect(generator.next().value).toEqual(
      put({
        type: 'GET_USER_DETAIL_REQUESTED',
        userID: response.data.data.userID,
      }),
    );
    expect(generator.next().value).toEqual(take('GET_USER_DETAIL_SUCCEED'));
    expect(generator.next().value).toEqual(
      put({
        type: 'LOGIN_SUCCEED',
        token: adjustedToken,
        userID: response.data.data.userID,
      }),
    );
    expect(generator.next().value).toEqual(put(push('/new-transactions')));
  });

  it('should logging out user correctly', () => {
    let generator = signOutSaga();
    expect(generator.next().value).toEqual(call(clearPersistedData));
    expect(generator.next().value).toEqual(
      put({
        type: 'SIGN_OUT_SUCCEED',
      }),
    );
    expect(generator.next().value).toEqual(put(push('/login')));
  });
});
