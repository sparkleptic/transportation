// @flow

import {cloneableGenerator} from 'redux-saga/utils';
import {call, put, takeEvery, all, take, select} from 'redux-saga/effects';
import {push, goBack} from 'react-router-redux';
import {createStore} from 'redux';

import inventoryBaggingAPI from '../inventoryBaggingAPI';
import convertSnakeCasedToCamelCase from '../../../helpers/convertSnakeCasedToCamelCase';
import rootReducer from '../../../store/reducers';

import {
  inventoryBaggingSagaWatcher,
  bagConnoteSaga,
  closeBagSaga,
} from '../inventoryBaggingSaga';

describe('inventorySaga', () => {
  it('should run the watcher correctly', () => {
    let generator = inventoryBaggingSagaWatcher();
    expect(generator.next().value).toEqual(
      takeEvery('BAG_CONNOTE_REQUESTED', bagConnoteSaga),
    );
    expect(generator.next().value).toEqual(
      takeEvery('CLOSE_BAG_REQUESTED', closeBagSaga),
    );
  });

  it('should do bagging connote correctly', () => {
    let action = {
      type: 'BAG_CONNOTE_REQUESTED',
      connoteNumber: 'connoteNumber',
      nodeID: 17,
    };
    let generator = cloneableGenerator(bagConnoteSaga)(action);
    generator = generator.clone();

    let response = {
      status: {
        code: 200,
      },
      bagID: 123,
      dataBag: {
        bagNo: 'BAG 123001',
      },
      valueNumber: 'CON 000123',
      type: 'CON',
      dataValue: {
        toTlc: 'destination',
        serviceCode: 'service',
      },
    };
    expect(generator.next().value).toEqual(
      call(inventoryBaggingAPI.putConnoteInBag, {
        nodeID: action.nodeID,
        connoteNumber: action.connoteNumber,
        activeBag: undefined,
      }),
    );

    let store = createStore(rootReducer);
    let state = {
      ...store.getState(),
      router: {
        location: {
          pathname: '',
        },
      },
    };

    let activeBag = {
      bagID: response.bagID,
      bagNumber: response.dataBag.bagNo,
    };

    expect(generator.next(response).value).toEqual(
      put({
        type: 'NEW_BAG_GENERATED',
        bag: activeBag,
      }),
    );

    expect(generator.next().value).toEqual(select());

    expect(generator.next(state).value).toEqual(
      put({
        type: 'BAG_CONNOTE_SUCCEED',
        item: {
          id: response.valueNumber,
          type: response.type,
        },
        additionalBagInfo: {
          service: response.dataValue.serviceCode,
          destination: `${response.dataValue.toTlc}`,
        },
      }),
    );
    expect(generator.next().value).toEqual(
      put({
        type: 'SHOW_NOTIFICATION_REQUESTED',
        notification: {
          id: action.connoteNumber,
          text: `Success in adding connote ${action.connoteNumber}`,
        },
      }),
    );
    expect(generator.next().value).toEqual(
      put(push(`/inventory/bagging/${activeBag.bagID}`)),
    );
  });

  it('should close the bag correctly', () => {
    let activeBag = {
      bagID: 123,
      bagNumber: 'BAG 123xxx',
    };

    let action = {
      type: 'CLOSE_BAG_REQUESTED',
      activeBag,
    };

    let generator = closeBagSaga(action);

    expect(generator.next().value).toEqual(
      call(inventoryBaggingAPI.closeBag, {
        bagID: activeBag.bagID,
      }),
    );

    let response = {
      status: {
        code: 200,
      },
    };

    expect(generator.next(response).value).toEqual(
      put({
        type: 'RESET_BAG_LIST_DATA',
      }),
    );
    expect(generator.next().value).toEqual(
      put({
        type: 'RESET_CONNOTE_LIST_DATA',
      }),
    );
    expect(generator.next().value).toEqual(
      put({
        type: 'CLOSE_BAG_SUCCEED',
      }),
    );
    expect(generator.next().value).toEqual(
      put({
        type: 'SHOW_NOTIFICATION_REQUESTED',
        notification: {
          id: activeBag.bagID,
          text: `Success in closing ${activeBag.bagNumber}`,
        },
      }),
    );
    expect(generator.next().value).toEqual(
      put(push('/inventory/item/list?tab=bag')),
    );
  });
});
