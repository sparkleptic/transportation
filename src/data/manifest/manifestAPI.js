// @flow

import fetchJSON from '../../helpers/fetchJSON';

type GetManifestListParams = {
  search: string,
  limit: number,
  sortByColumn: string,
  sortOrderType: SortType,
  page: number,
  nodeID: number,
};

export function createManifestAPI(fetch: Fetch) {
  return {
    getManifestList(params: GetManifestListParams) {
      let {search, limit, sortByColumn, sortOrderType, page, nodeID} = params;

      let additionalParams = {};

      if (search) {
        additionalParams = {
          ...additionalParams,
          s: search,
        };
      }

      if (sortByColumn) {
        additionalParams = {
          ...additionalParams,
          sort_by: sortByColumn,
        };
      }

      if (sortOrderType) {
        additionalParams = {
          ...additionalParams,
          sort_order: sortOrderType,
        };
      }

      return fetch
        .get('/manifest', {
          params: {
            l: limit,
            page: page,
            n: nodeID,
            ...additionalParams,
          },
        })
        .then((response) => response.data);
    },
  };
}

export default createManifestAPI(fetchJSON);
