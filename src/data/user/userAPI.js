// @flow

import fetchJSON from '../../helpers/fetchJSON';

type LoginParams = {
  userID: string,
};

export function createUserAPI(fetch: Fetch) {
  return {
    getUserDetail(params: LoginParams) {
      let {userID} = params;
      return fetch
        .get(`/users/${userID}`, {})
        .then((response) => response.data);
    },
  };
}

export default createUserAPI(fetchJSON);
