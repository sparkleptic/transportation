// @flow

import fetchJSON from '../../helpers/fetchJSON';

type GetEmployeeDetailParams = {
  employeeID: number,
};
type GetEmployeeActivitiesParams = {
  employeeID: number,
  limit?: number,
  sortByColumn?: string,
  sortOrderType?: SortType,
  page?: number,
};

export function createEmployeeAPI(fetch: Fetch) {
  return {
    getEmployeeDetail(params: GetEmployeeDetailParams) {
      let {employeeID} = params;

      return fetch
        .get(`/employee/${employeeID}`, {})
        .then((response) => response.data);
    },
    getEmployeeActivities(params: GetEmployeeActivitiesParams) {
      let {employeeID, limit, sortByColumn, sortOrderType, page} = params;

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
        .get(`/employee/${employeeID}/activity`, {
          params: {
            ...requestParams,
          },
        })
        .then((response) => response.data);
    },
    getEmployeesCourier() {
      return fetch
        .get(`/employee?pstatus=4`, {})
        .then((response) => response.data);
    },
  };
}

export default createEmployeeAPI(fetchJSON);
