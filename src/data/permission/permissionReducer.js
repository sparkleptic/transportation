// @flow

import convertArrayToMap from '../../helpers/convertArrayToMap';

import type {PermissionState, PermissionAction} from './Permission-type';

const initialState: PermissionState = {
  list: new Map(),
};

export default function permissionReducer(
  state: PermissionState = initialState,
  action: PermissionAction,
) {
  switch (action.type) {
    case 'PERMISSION_RECEIVED': {
      return {
        list: convertArrayToMap(action.list, 'moduleID'),
      };
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
