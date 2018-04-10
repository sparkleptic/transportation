// @flow

export type ConnoteItem = {
  connoteID: number,
  connoteNumber: string,
  fromCustomerID: number,
  fromName: string,
  fromStreetAddress: string,
  fromAdministrativeAddress: string,
  fromEmail: null,
  fromZipCode: string,
  fromTariffCode: string,
  toCustomerID: number,
  toName: string,
  toStreetAddress: string,
  toAdministrativeAddress: string,
  toEmail: ?string,
  toZipCode: string,
  toTariffCode: string,
  serviceCode: string,
  amountInsurance: ?number,
  amountSurcharge: ?number,
  amountPackingFee: ?number,
  amountDiscount: ?number,
  remarks: ?string,
  userID: number,
  createdOn: string,
  amountPrice: string,
  description: string,
  fromPhone: string,
  toPhone: string,
  chargeableWeight: string,
  isReceived: ?boolean,
  actualWeight: string,
  slaDate: ?string,
  createdNodeID: null,
  lastNodeID: ?number,
};

export type ConnoteState = {
  list: Array<ConnoteItem>,
  nextPageUrl: ?string,
  prevPageUrl: ?string,
  total: number,
  isLoading: boolean,
  searchTextInput: string,
};

export type ConnoteAction =
  | {
      type: 'GET_CONNOTE_LIST_SUCCEED',
      data: Array<ConnoteItem>,
      nextPageUrl: ?string,
      prevPageUrl: ?string,
      total: number,
    }
  | {
      type: 'GET_CONNOTE_LIST_REQUESTED',
      search: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
      nodeID: number,
    }
  | {
      type: 'RESET_CONNOTE_LIST_DATA',
    }
  | {
      type: 'CONNOTE_SEARCH_TEXT_INPUT_CHANGED',
      searchTextInput: string,
    };
