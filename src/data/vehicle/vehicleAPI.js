// @flow

import fetchJSON from '../../helpers/fetchJSON';

type GetVehicleDetailParams = {
  vehicleID: number,
};
type GetVehicleActivitiesParams = {
  vehicleID: number,
  limit?: number,
  sortByColumn?: string,
  sortOrderType?: SortType,
  page?: number,
};

export function createVehicleAPI(fetch: Fetch) {
  return {
    getVehicleDetail(params: GetVehicleDetailParams) {
      let {vehicleID} = params;

      return fetch
        .get(`/vehicle/${vehicleID}`, {})
        .then((response) => response.data);
    },
    getVehicleActivities(params: GetVehicleActivitiesParams) {
      let {vehicleID, limit, sortByColumn, sortOrderType, page} = params;

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
        .get(`/vehicle/${vehicleID}/activity`, {
          params: {
            ...requestParams,
          },
        })
        .then((response) => response.data);
    },
  };
}

export default createVehicleAPI(fetchJSON);
