import {call, put, takeEvery, all, take} from 'redux-saga/effects';

import bookingAPI from './bookingAPI';

function* bookingSagaWatcher() {
  yield takeEvery('GET_BOOKING_LIST_REQUESTED', getBookingListSaga);
}

function* getBookingListSaga(action) {
  if (action.type !== 'GET_BOOKING_LIST_REQUESTED') {
    return;
  }
  let {search, rowsPerPage, sort_by, sort_order, page, activeNode} = action;
  if (!activeNode) {
    return;
  }
  try {
    let result = yield call(bookingAPI.getBookingList, {
      search,
      rowsPerPage,
      sort_by,
      sort_order,
      page,
      activeNode,
    });
    if (result.status.code === 200) {
      let {nextPageUrl, prevPageUrl, total} = result;
      yield put({
        ...action,
        type: 'GET_BOOKING_LIST_SUCCEED',
        data: result.data,
        nextPageUrl,
        prevPageUrl,
        total,
      });
    }
  } catch (e) {
    console.log(e);
  }
}

export {bookingSagaWatcher, getBookingListSaga};
