import {call, put, takeEvery, all} from 'redux-saga/effects';
import axios from 'axios';

const API = 'http://coreapi.skyware.system/api/';
// const API = 'http://192.168.0.111/core_laravel/public/api/zipcodes?search='
// const API = 'http://coreapi.jne.co.id/api/'

function getAlmt(almtInput) {
  return axios.get(API + almtInput).then((response) => {
    const {data} = response.data;
    return data;
  });
}

function* callGetAlmt({almt, resolve, reject}) {
  try {
    const datas = yield call(getAlmt, almt);

    if (datas.length === 0) {
      yield put({type: 'FETCH_ALMTPENERIMA_DONE', payload: datas});
      yield call(resolve);
    } else {
      yield call(reject, {almt: 'Data not found'});
    }
  } catch (error) {
    yield put({type: 'ERROR', error});
  }
}

function* getAlmtSaga() {
  yield takeEvery('FETCH_ALMTPENERIMA', callGetAlmt);
}

export default function* root() {
  yield all(getAlmt);
}
