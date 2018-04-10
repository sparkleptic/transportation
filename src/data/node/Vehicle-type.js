// @flow

import type {Vehicle} from '../vehicle/Vehicle-type';
import type {SummaryItem} from './Node-type';

export type VehicleState = {
  list: Array<Vehicle>,
  nextPageUrl: ?string,
  prevPageUrl: ?string,
  total: number,
  isLoading: boolean,
  summaryList: Array<SummaryItem>,
};

export type VehicleAction =
  | {
      type: 'GET_NODE_VEHICLE_LIST_SUCCEED',
      nodeID: number,
      data: Array<Vehicle>,
      nextPageUrl: ?string,
      prevPageUrl: ?string,
      total: number,
      summaryList: Array<SummaryItem>,
    }
  | {
      type: 'GET_NODE_VEHICLE_LIST_REQUESTED',
      nodeID: number,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    }
  | {
      type: 'GET_NODE_VEHICLE_LIST_FAILED',
      error: Error,
    };
