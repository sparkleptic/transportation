// @flow

import fetchJSON from '../../helpers/fetchJSON';

type GetNodeDetailParams = {
  nodeID: number,
};

type GetNodeInventoryVehicleEmployeeListParams = {
  type: 'vehicle' | 'inventory' | 'employee',
  nodeID: number,
  limit?: number,
  sortByColumn?: string,
  sortOrderType?: SortType,
  page?: number,
};

export function createNodeAPI(fetch: Fetch) {
  return {
    getNodeDetail(params: GetNodeDetailParams) {
      let {nodeID} = params;

      return fetch
        .get(`/nodes/${nodeID}`, {})
        .then((response) => response.data);
    },
    getNodeInventoryVehicleEmployeeList(
      params: GetNodeInventoryVehicleEmployeeListParams,
    ) {
      let {type, nodeID, limit, sortByColumn, sortOrderType, page} = params;

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
        .get(`/nodes/${nodeID}/${type}`, {
          params: {
            ...requestParams,
          },
        })
        .then((response) => response.data);
    },
  };
}

export default createNodeAPI(fetchJSON);
