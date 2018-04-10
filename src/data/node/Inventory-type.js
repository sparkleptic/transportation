// @flow

import type {ConnoteItem} from '../connote/Connote-type';
import type {SummaryItem} from './Node-type';

export type InventoryState = {
  list: Array<ConnoteItem>,
  nextPageUrl: ?string,
  prevPageUrl: ?string,
  total: number,
  isLoading: boolean,
  summaryList: Array<SummaryItem>,
};

export type InventoryAction =
  | {
      type: 'GET_NODE_INVENTORY_LIST_SUCCEED',
      nodeID: number,
      data: Array<ConnoteItem>,
      nextPageUrl: ?string,
      prevPageUrl: ?string,
      total: number,
      summaryList: Array<SummaryItem>,
    }
  | {
      type: 'GET_NODE_INVENTORY_LIST_REQUESTED',
      nodeID: number,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    }
  | {
      type: 'GET_NODE_INVENTORY_LIST_FAILED',
      error: Error,
    };
