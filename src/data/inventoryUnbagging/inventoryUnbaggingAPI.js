// @flow

import fetchJSON from '../../helpers/fetchJSON';

type GetUnbaggingHistoryParam = {
  nodeID: number,
  limit?: number,
  sortByColumn?: string,
  sortOrderType?: SortType,
  page?: number,
};

type UnbagBagOnlyParams = {
  bagNumber: string,
  nodeID: number,
};

type UnbagBagConnoteParams = {
  connoteNumber: string,
  nodeID: number,
};

export function createInventoryUnbaggingAPI(fetch: Fetch) {
  return {
    getUnbaggingHistory: (params: GetUnbaggingHistoryParam) => {
      let {nodeID, limit, sortByColumn, sortOrderType, page} = params;

      let requestParams = {};

      if (sortByColumn) {
        requestParams = {
          ...requestParams,
          sort_by: sortByColumn,
        };
      }

      if (sortOrderType) {
        requestParams = {
          ...requestParams,
          sort_order: sortOrderType,
        };
      }

      if (limit) {
        requestParams = {
          ...requestParams,
          l: limit,
        };
      }

      if (page) {
        requestParams = {
          ...requestParams,
          page,
        };
      }
      return fetch
        .get('/unbagging', {
          params: {
            ...requestParams,
            n: nodeID,
          },
        })
        .then((response) => response.data);
    },
    unbagBagOnly: (params: UnbagBagOnlyParams) => {
      let {bagNumber, nodeID} = params;
      return fetch
        .post('/unbagging/bag', {
          n: nodeID,
          bag_no: bagNumber,
        })
        .then((response) => response.data);
    },
    unbagBagConnote: (params: UnbagBagConnoteParams) => {
      let {connoteNumber, nodeID} = params;
      return fetch
        .post('/unbagging/connote', {
          n: nodeID,
          value_no: connoteNumber,
        })
        .then((response) => response.data);
    },
  };
}

export default createInventoryUnbaggingAPI(fetchJSON);
