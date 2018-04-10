// @flow
import fetchJSON from '../../helpers/fetchJSON';

type GetConnoteByIdParams = {
  id: number,
};

type GetConnoteActivityParams = {
  id: number,
  limit?: number,
  sortByColumn?: string,
  sortOrderType?: SortType,
  page?: number,
};

export function createConnoteSearchAPI(fetch: Fetch) {
  return {
    getConnoteById: ({id}: GetConnoteByIdParams) =>
      fetch.get(`/connote/${id}`, {}).then((response) => response.data),

    getConnoteActivity: (params: GetConnoteActivityParams) => {
      let {id, limit, sortByColumn, sortOrderType, page} = params;

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
        .get(`/connote/${id}/activity`, {
          params: {
            ...requestParams,
          },
        })
        .then((response) => response.data);
    },
  };
}

export default createConnoteSearchAPI(fetchJSON);
