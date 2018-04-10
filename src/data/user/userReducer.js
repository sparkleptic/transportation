// @flow

import type {User, UserAction} from './User-type.js';

const initialState = {
  active: '',
  config: {},
  created_at: '',
  deleted: '',
  effective_date_from: '',
  effective_date_to: '',
  email: '',
  email_verified: '',
  id: '',
  is_logged_in: 0,
  name: '',
  phone: '',
  phone_verified: '',
  updated_at: '',
  user_id: 0,
  username: '',
  node: [],
  permission: [],
};

export default function userReducer(
  state: User = initialState,
  action: UserAction,
) {
  switch (action.type) {
    case 'GET_USER_DETAIL_SUCCEED': {
      return action.user;
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
