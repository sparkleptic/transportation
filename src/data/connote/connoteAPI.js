// @flow

import fetchJSON from '../../helpers/fetchJSON';

type GetConnoteListParams = {
  search?: string,
  limit: number,
  sortByColumn?: string,
  sortOrderType?: SortType,
  page: number,
  nodeID: number,
};

export function createConnoteAPI(fetch: Fetch) {
  return {
    getConnoteList(params: GetConnoteListParams) {
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
        .get('/connote', {
          params: {
            l: limit,
            n: nodeID,
            page,
            ...additionalParams,
          },
        })
        .then((response) => response.data);
    },
  };
}

export default createConnoteAPI(fetchJSON);
