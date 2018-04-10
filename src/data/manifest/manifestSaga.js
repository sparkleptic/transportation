// @flow

import {call, put, takeEvery, all, take} from 'redux-saga/effects';

import manifestAPI from './manifestAPI';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';

import type {ManifestAction} from './Manifest-type';

function* manifestSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('GET_MANIFEST_LIST_REQUESTED', getManifestListSaga);
}

function* getManifestListSaga(action: ManifestAction): Generator<*, *, *> {
  if (action.type !== 'GET_MANIFEST_LIST_REQUESTED') {
    return;
  }
  let {search, limit, sortByColumn, sortOrderType, page, nodeID} = action;
  if (!nodeID) {
    return;
  }
  try {
    let raw = yield call(manifestAPI.getManifestList, {
      search,
      limit,
      sortByColumn,
      sortOrderType,
      page,
      nodeID,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      let {nextPageUrl, prevPageUrl, total} = result;
      let convertedData = raw.data.map((datum) =>
        convertSnakeCasedToCamelCase(datum),
      );
      yield put({
        type: 'GET_MANIFEST_LIST_SUCCEED',
        data: convertedData,
        nextPageUrl,
        prevPageUrl,
        total,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export {manifestSagaWatcher, getManifestListSaga};
