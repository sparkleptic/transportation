// @flow

export type Bag = {
  bagID: number,
  bagDate: string,
  bagNo: ?string,
  createdBy: string,
  destination: string,
  employee: Object,
  origin: string,
  status: string,
  updatedBy: string,
  weight: number,
  consolidation: number,
};

export type BagItemType = 'CON' | 'BAG';

export type BagState = {
  list: Array<Bag>,
  nextPageUrl: ?string,
  prevPageUrl: ?string,
  total: number,
  isLoading: boolean,
  searchTextInput: string,
};

export type BagAction =
  | {
      type: 'GET_BAG_LIST_SUCCEED',
      data: Array<Bag>,
      nextPageUrl: ?string,
      prevPageUrl: ?string,
      total: number,
    }
  | {
      type: 'GET_BAG_LIST_REQUESTED',
      search: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: 'asc' | 'desc',
      page: number,
      nodeID: number,
    }
  | {
      type: 'RESET_BAG_LIST_DATA',
    }
  | {
      type: 'BAG_SEARCH_TEXT_INPUT_CHANGED',
      searchTextInput: string,
    };
