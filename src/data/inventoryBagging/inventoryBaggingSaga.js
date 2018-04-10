// @flow

import {call, put, takeEvery, all, take, select} from 'redux-saga/effects';
import {push, goBack} from 'react-router-redux';

import inventoryBaggingAPI from './inventoryBaggingAPI';
import convertSnakeCasedToCamelCase from '../../helpers/convertSnakeCasedToCamelCase';
import {HOST} from '../../constants/api';

import type {InventoryBaggingAction} from './InventoryBagging-type';
import type {RootState} from '../../storeTypes';

function* inventoryBaggingSagaWatcher(): Generator<*, *, *> {
  yield takeEvery('BAG_CONNOTE_REQUESTED', bagConnoteSaga);
  yield takeEvery('CLOSE_BAG_REQUESTED', closeBagSaga);
}

function* bagConnoteSaga(action: InventoryBaggingAction): Generator<*, *, *> {
  if (action.type !== 'BAG_CONNOTE_REQUESTED') {
    return;
  }

  let {connoteNumber, activeBag, nodeID} = action;
  try {
    let raw = yield call(inventoryBaggingAPI.putConnoteInBag, {
      nodeID,
      connoteNumber,
      activeBag,
    });
    let result = convertSnakeCasedToCamelCase(raw);
    if (result.status.code === 200) {
      activeBag = {
        bagID: result.bagID,
        bagNumber: result.dataBag.bagNo,
      };

      yield put({
        type: 'NEW_BAG_GENERATED',
        bag: activeBag,
      });

      let state: RootState = yield select();
      let splittedPathname = state.router.location.pathname.split('/');

      let additionalBagInfo = {};
      if (result.type === 'CON') {
        additionalBagInfo = {
          ...additionalBagInfo,
          service: result.dataValue.serviceCode,
          destination: `${result.dataValue.toTlc}`,
        };
      }

      yield put({
        type: 'BAG_CONNOTE_SUCCEED',
        item: {
          id: result.valueNumber,
          type: result.type,
        },
        additionalBagInfo,
      });
      yield put({
        type: 'SHOW_NOTIFICATION_REQUESTED',
        notification: {
          id: connoteNumber,
          text: `Success in adding connote ${connoteNumber}`,
        },
      });

      if (
        splittedPathname[splittedPathname.length - 1] !==
        String(activeBag.bagID)
      ) {
        yield put(push(`/inventory/bagging/${activeBag.bagID}`));
      }
    } else {
      throw new Error(
        `Failed in adding connote number ${connoteNumber}. ${
          result.status.description
        }`,
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
        id: connoteNumber,
        text: error.message,
      },
    });
    yield put({
      type: 'BAG_CONNOTE_FAILED',
      error,
    });
  }
}

function* closeBagSaga(action: InventoryBaggingAction): Generator<*, *, *> {
  if (action.type !== 'CLOSE_BAG_REQUESTED') {
    return;
  }

  let {activeBag, nodeID} = action;
  try {
    let raw = yield call(inventoryBaggingAPI.closeBag, {
      bagID: activeBag.bagID,
      n: nodeID,
    });
    let result = convertSnakeCasedToCamelCase(raw);

    if (result.status.code === 200) {
      yield put({
        type: 'RESET_BAG_LIST_DATA',
      });
      yield put({
        type: 'RESET_CONNOTE_LIST_DATA',
      });

      yield put({
        type: 'CLOSE_BAG_SUCCEED',
      });
      yield put({
        type: 'SHOW_NOTIFICATION_REQUESTED',
        notification: {
          id: activeBag.bagID,
          text: `Success in closing ${activeBag.bagNumber}`,
        },
      });

      yield put(push('/inventory/item/list?tab=connote'));
      
      window.open(`${HOST}/bag/${activeBag.bagNumber}/label`, 'Bag Barcode', 'toolbar=0,status=0,width=548,height=325');
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
        id: activeBag.bagID,
        text: `Failed to close bag ${activeBag.bagNumber}. ${error.message}`,
      },
    });

    yield put({
      type: 'CLOSE_BAG_FAILED',
      error,
    });
  }
}

export {inventoryBaggingSagaWatcher, bagConnoteSaga, closeBagSaga};
