// @flow

export type AuthState = {
  token: string,
  isLoading: boolean,
  error: ?Error,
};

export type AuthAction =
  | {
      type: 'LOGIN_REQUESTED',
      username: string,
      password: string,
      onSuccess?: () => void,
    }
  | {
      type: 'LOGIN_SUCCEED',
      token: string,
      userID: number,
    }
  | {
      type: 'LOGIN_FAILED',
      error: Error,
    }
  | {
      type: 'SIGN_OUT_REQUESTED',
    }
  | {
      type: 'SIGN_OUT_SUCCEED',
    }
  | {
      type: 'SIGN_OUT_FAILED',
      error: Error,
    }
  | {
      type: 'VALIDATE_TOKEN_REQUESTED',
    };
