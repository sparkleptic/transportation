// @flow

import fetchJSON from '../../helpers/fetchJSON';

type GetBagListParams = {
  search: string,
  limit: number,
  sortByColumn: string,
  sortOrderType: 'asc' | 'desc',
  page: number,
  nodeID: number,
};

export function createBagAPI(fetch: Fetch) {
  return {
    getBagList(params: GetBagListParams) {
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
        .get('/bag', {
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

export default createBagAPI(fetchJSON);
