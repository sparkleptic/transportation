// @flow

import type {BagItemType} from '../bag/Bag-type';

export type Bag = {
  bagNumber: string,
  bagID: number,
};

export type Item = {
  id: string,
  type: BagItemType,
};

export type InventoryBaggingState = {
  activeBag: ?Bag,
  baggingItemList: Array<Item>,
  service: string,
  destination: string,
  isLoading: boolean,
  isValidating: boolean,
  error: ?Error,
};

export type InventoryBaggingAction =
  | {
      type: 'NEW_BAG_GENERATED',
      bag: Bag,
    }
  | {
      type: 'BAG_CONNOTE_REQUESTED',
      connoteNumber: string,
      nodeID: number,
      activeBag?: ?Bag,
    }
  | {
      type: 'BAG_CONNOTE_SUCCEED',
      item: Item,
      additionalBagInfo: ?{service: string, destination: string},
    }
  | {
      type: 'BAG_CONNOTE_FAILED',
      error: Error,
    }
  | {
      type: 'CLOSE_BAG_REQUESTED',
      activeBag: Bag,
    }
  | {
      type: 'CLOSE_BAG_SUCCEED',
    }
  | {
      type: 'CLOSE_BAG_FAILED',
      error: Error,
    };
