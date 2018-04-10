// @flow

import type {VehicleState, VehicleAction} from './Vehicle-type';

const initialState = {
  vehicleID: null,
  detailInfo: null,
  activity: {
    list: [],
    nextPageUrl: null,
    prevPageUrl: null,
    total: 0,
    isLoading: false,
  },
  isLoading: false,
};

export default function vehicleReducer(
  state: VehicleState = initialState,
  action: VehicleAction,
) {
  switch (action.type) {
    case 'GET_VEHICLE_DETAIL_REQUESTED': {
      return {
        ...state,
        isLoading: true,
        vehicleID: action.vehicleID,
      };
    }
    case 'GET_VEHICLE_DETAIL_SUCCEED': {
      return {
        ...state,
        detailInfo: action.detailInfo,
        isLoading: false,
      };
    }
    case 'GET_VEHICLE_DETAIL_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'GET_VEHICLE_ACTIVITY_LIST_REQUESTED': {
      return {
        ...state,
        activity: {
          ...state.activity,
          isLoading: true,
        },
      };
    }
    case 'GET_VEHICLE_ACTIVITY_LIST_SUCCEED': {
      let {vehicleID, data, nextPageUrl, prevPageUrl, total} = action;

      if (state.vehicleID && Number(state.vehicleID) !== Number(vehicleID)) {
        return state;
      }
      return {
        ...state,
        activity: {
          list: [...data],
          nextPageUrl,
          prevPageUrl,
          total,
          isLoading: false,
        },
      };
    }
    case 'GET_VEHICLE_ACTIVITY_LIST_FAILED': {
      return {
        ...state,
        activity: {
          ...state.activity,
          isLoading: false,
        },
      };
    }
    default:
      return state;
  }
}
