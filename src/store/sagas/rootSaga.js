// @flow

import {fork} from 'redux-saga/effects';

// all data watchers here
import alamatPenerimaSaga from './fetchAlmtPenerima';
import {authSagaWatcher} from '../../data/auth/authSaga';
import {userSagaWatcher} from '../../data/user/userSaga';
import {connoteSagaWatcher} from '../../data/connote/connoteSaga';
import {manifestSagaWatcher} from '../../data/manifest/manifestSaga';
import {connoteSearchSagaWatcher} from '../../data/connoteSearch/connoteSearchSaga';
import {bagSagaWatcher} from '../../data/bag/bagSaga';
import {inventoryBaggingSagaWatcher} from '../../data/inventoryBagging/inventoryBaggingSaga';
import {bookingSagaWatcher} from '../../data/booking/bookingSaga';
import {globalSearchSagaWatcher} from '../../data/globalSearch/globalSearchSaga';
import {employeeSagaWatcher} from '../../data/employee/employeSaga';
import {vehicleSagaWatcher} from '../../data/vehicle/vehicleSaga';
import {nodeSagaWatcher} from '../../data/node/nodeSaga';
import {inventoryUnbaggingSagaWatcher} from '../../data/inventoryUnbagging/inventoryUnbaggingSaga';

// all library's watchers here
import {bugReportSagaWatcher} from '../../libraries/bugReport/bugReportSaga';

export default function* rootSaga(): Generator<*, *, *> {
  // yield takeEvery('*', (action) =>  // eslint-disable-line
  yield fork(alamatPenerimaSaga);

  yield fork(authSagaWatcher);
  yield fork(userSagaWatcher);
  yield fork(connoteSagaWatcher);
  yield fork(manifestSagaWatcher);
  yield fork(connoteSearchSagaWatcher);
  yield fork(bagSagaWatcher);
  yield fork(inventoryBaggingSagaWatcher);
  yield fork(bookingSagaWatcher);
  yield fork(globalSearchSagaWatcher);
  yield fork(employeeSagaWatcher);
  yield fork(vehicleSagaWatcher);
  yield fork(nodeSagaWatcher);
  yield fork(inventoryUnbaggingSagaWatcher);

  yield fork(bugReportSagaWatcher);

  // -> '*' a wildcard that reads every action. Will change this later based on usage
}
