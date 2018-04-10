// @flow

import type {Bag, BagItemType} from '../bag/Bag-type';

export type BagDetail = {
  bagDetailID: number,
  baggingHeaderID: number,
  type: BagItemType,
  createdBy: ?string,
  updatedBy: ?string,
  valueID: string,
  valueNo: string,
  isUnbagged: number,
};

export type BagMaster = Bag & {
  isUnbagged: number,
  detail: Array<BagDetail>,
};

export type InventoryUnbaggingState = {
  bag: Array<BagMaster>,
  total: number,
  unbaggedCount: number,
  unbaggedDetailCount: Map<string, number>,
  isLoading: boolean,
};

export type GetBackHistoryRequested = {
  type: 'GET_BAG_HISTORY_REQUESTED',
  nodeID: number,
  limit: number,
  sortByColumn: string,
  sortOrderType: SortType,
  page: number,
};

export type GetBackHistorySucceed = {
  type: 'GET_BAG_HISTORY_SUCCEED',
  data: Array<BagMaster>,
  total: number,
  totalUnbagged: number,
};

export type GetBackHistoryFailed = {
  type: 'GET_BAG_HISTORY_FAILED',
};

export type UnbagBagOnlyRequested = {
  type: 'UNBAG_BAG_ONLY_REQUESTED',
  nodeID: number,
  bagNumber: string,
  tableSettings: {
    limit: number,
    sortByColumn: string,
    sortOrderType: SortType,
    page: number,
  },
};

export type UnbagBagOnlySucceed = {
  type: 'UNBAG_BAG_ONLY_SUCCEED',
};

export type UnbagBagOnlyFailed = {
  type: 'UNBAG_BAG_ONLY_FAILED',
};

export type UnbagBagConnoteRequested = {
  type: 'UNBAG_BAG_CONNOTE_REQUESTED',
  nodeID: number,
  connoteNumber: string,
  tableSettings: {
    limit: number,
    sortByColumn: string,
    sortOrderType: SortType,
    page: number,
  },
};

export type UnbagBagConnoteSucceed = {
  type: 'UNBAG_BAG_CONNOTE_SUCCEED',
};

export type UnbagBagConnoteFailed = {
  type: 'UNBAG_BAG_CONNOTE_FAILED',
};

export type InventoryUnbaggingAction =
  | GetBackHistoryRequested
  | GetBackHistorySucceed
  | GetBackHistoryFailed
  | UnbagBagOnlyRequested
  | UnbagBagOnlySucceed
  | UnbagBagOnlyFailed
  | UnbagBagConnoteRequested
  | UnbagBagConnoteSucceed
  | UnbagBagConnoteFailed
  | {
      type: 'RESET_UNBAG_REQUESTED',
    };

