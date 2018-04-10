// @flow

import type {AuthState, AuthAction} from './Auth-type';

const initialState = {
  token: '',
  isLoading: false,
  error: null,
};

export default function authReducer(
  state: AuthState = initialState,
  action: AuthAction,
) {
  switch (action.type) {
    case 'VALIDATE_TOKEN_REQUESTED':
    case 'LOGIN_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'LOGIN_SUCCEED': {
      let {token} = action;
      return {
        ...state,
        isLoading: false,
        token,
      };
    }
    case 'LOGIN_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case 'VALIDATE_TOKEN_SUCCEED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
