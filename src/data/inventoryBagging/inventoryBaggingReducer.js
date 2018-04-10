// @flow

import type {
  InventoryBaggingState,
  InventoryBaggingAction,
} from './InventoryBagging-type';

const initialState = {
  activeBag: null,
  baggingItemList: [],
  isValidating: false,
  isLoading: false,
  error: null,
  service: '',
  destination: '',
};

export default function inventoryBaggingReducer(
  state: InventoryBaggingState = initialState,
  action: InventoryBaggingAction,
) {
  switch (action.type) {
    case 'NEW_BAG_GENERATED': {
      return {
        ...state,
        activeBag: action.bag,
      };
    }
    case 'BAG_CONNOTE_REQUESTED': {
      return {
        ...state,
        isValidating: true,
      };
    }
    case 'BAG_CONNOTE_SUCCEED': {
      let {item, additionalBagInfo} = action;
      let {baggingItemList, service, destination} = state;

      let newService = '';
      let newDestination = '';
      if (!service && additionalBagInfo && additionalBagInfo.service) {
        newService = additionalBagInfo.service;
      }
      if (!destination && additionalBagInfo && additionalBagInfo.destination) {
        newDestination = additionalBagInfo.destination;
      }

      return {
        ...state,
        service: newService || service,
        destination: newDestination || destination,
        baggingItemList: [item, ...baggingItemList],
        isValidating: false,
      };
    }
    case 'BAG_CONNOTE_FAILED': {
      return {
        ...state,
        isValidating: false,
        error: action.error,
      };
    }
    case 'CLOSE_BAG_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'CLOSE_BAG_SUCCEED': {
      return initialState;
    }
    case 'CLOSE_BAG_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
