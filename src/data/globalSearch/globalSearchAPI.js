// @flow

import fetchJSON from '../../helpers/fetchJSON';

type SearchParam = {
  searchText: string,
};

export function createGlobalSearchAPI(fetch: Fetch) {
  return {
    search(params: SearchParam) {
      let {searchText} = params;

      return fetch
        .get(`/search?s=${searchText}`, {})
        .then((response) => response.data);
    },
  };
}

export default createGlobalSearchAPI(fetchJSON);
