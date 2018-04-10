// @flow

export type ManifestItem = {
  manifest_id: string,
  manifest_no: string,
  manifest_type_id: integer,
  vehicle_id: integer,
  origin_id: integer,
  origin_name: string,
  destination_id: integer,
  destination_name: string,
  police_no: string,
  driver_id: integer,
  driver_name: string,
  checker_id: integer,
  checker_name: string,
};

export type ManifestState = {
  list: Array<ManifestItem>,
  nextPageUrl: ?string,
  prevPageUrl: ?string,
  total: number,
  isLoading: boolean,
  searchTextInput: string,
};

export type ManifestAction =
  | {
      type: 'GET_MANIFEST_LIST_SUCCEED',
      data: Array<ManifestItem>,
      nextPageUrl: ?string,
      prevPageUrl: ?string,
      total: number,
    }
  | {
      type: 'GET_MANIFEST_LIST_REQUESTED',
      search: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
      nodeID: number,
    }
  | {
      type: 'RESET_MANIFEST_LIST_DATA',
    }
  | {
      type: 'MANIFEST_SEARCH_TEXT_INPUT_CHANGED',
      searchTextInput: string,
    };
