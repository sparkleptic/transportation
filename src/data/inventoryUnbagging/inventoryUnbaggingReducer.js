// @flow

import type {
  InventoryUnbaggingState,
  InventoryUnbaggingAction,
} from './InventoryUnbagging-type';

let initialState: InventoryUnbaggingState = {
  bag: [],
  total: 0,
  isLoading: false,
  unbaggedCount: 0,
  unbaggedDetailCount: new Map(),
};

export default function inventoryUnbaggingReducer(
  state: InventoryUnbaggingState = initialState,
  action: InventoryUnbaggingAction,
) {
  switch (action.type) {
    case 'UNBAG_BAG_ONLY_REQUESTED':
    case 'UNBAG_BAG_CONNOTE_REQUESTED':
    case 'GET_BAG_HISTORY_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'UNBAG_BAG_ONLY_FAILED':
    case 'UNBAG_BAG_CONNOTE_FAILED':
    case 'GET_BAG_HISTORY_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'GET_BAG_HISTORY_SUCCEED': {
      let {data, totalUnbagged} = action;
      let {unbaggedDetailCount} = state;

      let newUnbaggedDetailCount = new Map(unbaggedDetailCount);

      data.forEach((datum) => {
        let detailCount = datum.detail.reduce((total, datum) => {
          if (datum.isUnbagged) {
            return total + 1;
          }
          return total;
        }, 0);
        newUnbaggedDetailCount.set(
          datum.bagNo || String(datum.bagID),
          detailCount,
        );
      });
      return {
        ...state,
        bag: action.data,
        total: action.total,
        unbaggedCount: totalUnbagged,
        unbaggedDetailCount: newUnbaggedDetailCount,
        isLoading: false,
      };
    }
    case 'RESET_UNBAG_REQUESTED': {
      return initialState;
    }
    default:
      return state;
  }
}
