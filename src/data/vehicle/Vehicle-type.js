// @flow

import type {Node} from '../node/Node-type';

export type Vehicle = {
  vehicleID: number,
  policeNo: string,
  vehicleStatus: string,
  ownedBy: string,
  maxWeight: string,
  maxVolume: string,
  expiryDate: string,
  vehicleLat: string,
  vehicleLot: string,
  vehicleName: string,
  ownDate: string,
  nodeID: number,
  type: {
    vehicleTypeID: number,
    typeName: string,
  },
  node: Node,
};

export type VehicleActivity = {
  manifestNo: string,
  createdOn: string,
};

export type VehicleActivityState = {
  list: Array<VehicleActivity>,
  nextPageUrl: ?string,
  prevPageUrl: ?string,
  total: number,
  isLoading: boolean,
};

export type VehicleState = {
  vehicleID: ?number,
  detailInfo: ?Vehicle,
  activity: VehicleActivityState,
  isLoading: boolean,
};

export type VehicleAction =
  | {
      type: 'GET_VEHICLE_DETAIL_REQUESTED',
      vehicleID: number,
    }
  | {
      type: 'GET_VEHICLE_DETAIL_SUCCEED',
      detailInfo: Vehicle,
    }
  | {
      type: 'GET_VEHICLE_DETAIL_FAILED',
      error: Error,
    }
  | {
      type: 'GET_VEHICLE_ACTIVITY_LIST_SUCCEED',
      vehicleID: number,
      data: Array<VehicleActivity>,
      nextPageUrl: ?string,
      prevPageUrl: ?string,
      total: number,
    }
  | {
      type: 'GET_VEHICLE_ACTIVITY_LIST_REQUESTED',
      vehicleID: number,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    }
  | {
      type: 'GET_VEHICLE_ACTIVITY_LIST_FAILED',
      error: Error,
    };
