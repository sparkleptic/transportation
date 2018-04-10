// @flow

import fetchJSON from '../../helpers/fetchJSON';

type LoginParams = {
  username: string,
  password: string,
};

export function createAuthAPI(fetch: Fetch) {
  const AuthAPI = {
    login(params: LoginParams) {
      let {username, password} = params;

      return fetch.post('/auth/login', {
        username,
        password,
      });
    },
  };
  return AuthAPI;
}

export default createAuthAPI(fetchJSON);
