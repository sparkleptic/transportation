import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';

import originReducer from './originReducer';
import genericListTable from './genericListTable';
import destReducer from './destReducer';
import otherInfoReducer from './otherInfoReducer';
import allReducer from './allReducers';
import almtPenerimaReducer from './Fetch_almtPenerima';
import almtPenerimaExistingChecker from './almtPenerimaChecker';
import resetAllForms from './resetFormReducer';
import saveBaseTariff from './savedBaseTariff';
import transactionReducer from './transactionReducer';

import userReducer from '../../data/user/userReducer';
import authReducer from '../../data/auth/authReducer';
import routeReducer from '../../data/routing/routeReducer';
import connoteReducer from '../../data/connote/connoteReducer';

import manifestReducer from '../../data/manifest/manifestReducer';

import connoteSearchReducer from '../../data/connoteSearch/connoteSearchReducer';

import bagReducer from '../../data/bag/bagReducer';
import permissionReducer from '../../data/permission/permissionReducer';
import nodeReducer from '../../data/node/nodeReducer';
import inventoryBaggingReducer from '../../data/inventoryBagging/inventoryBaggingReducer';
import notificationReducer from '../../data/notification/notificationReducer';
import bookingReducer from '../../data/booking/bookingReducer';
import globalSearchReducer from '../../data/globalSearch/globalSearchReducer';
import employeeReducer from '../../data/employee/employeeReducer';
import vehicleReducer from '../../data/vehicle/vehicleReducer';
import navigation from './navigationReducer';
import headerReducer from './headerReducer';
import inventoryUnbaggingReducer from '../../data/inventoryUnbagging/inventoryUnbaggingReducer';


export default combineReducers({
  auth: authReducer,
  user: userReducer,
  router: routeReducer,
  connote: connoteReducer,
  booking: bookingReducer,

  manifest: manifestReducer,
  connoteSearch: connoteSearchReducer,
  bag: bagReducer,
  permission: permissionReducer,
  node: nodeReducer,
  inventoryBagging: inventoryBaggingReducer,
  notification: notificationReducer,
  globalSearch: globalSearchReducer,
  employee: employeeReducer,
  vehicle: vehicleReducer,
  inventoryUnbagging: inventoryUnbaggingReducer,
  originReducer,
  destReducer,
  otherInfoReducer,
  allReducer,
  saveBaseTariff,
  almtPenerimaChecker: almtPenerimaExistingChecker,
  almtPenerimaReducer,
  resetAllForms,
  form: FormReducer,
  genericListTable,
  transaction: transactionReducer,
  navigation: navigation,
  header: headerReducer,
});
