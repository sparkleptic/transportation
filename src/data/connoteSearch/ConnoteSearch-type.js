// @flow

import type {Node} from '../node/Node-type';
import type {Employee} from '../employee/Employee-type';

export type ConnoteActivity = {
  connoteTrackingID: number,
  connoteNumber: string,
  employeeID: ?number,
  internal: number,
  typeID: number,
  link: ?string,
  createdOn: string,
  updatedOn: string,
  description: string,
  connoteID: string,
  connoteTlc: string,
  node: {
    nodeID: number,
    nodeCode: string,
    pic: Employee,
  },
};

export type ConnoteSearchActivityState = {
  list: Array<ConnoteActivity>,
  total: number,
  isLoading: boolean,
};

export type NodePosition = {
  connoteID: number,
  nodeID: number,
  updatedOn: string,
  updatedBy: any,
  nodeDetail: Node,
};

export type ConnoteSearchState = {
  connoteID: ?number,
  detailInfo: ?ConnoteSearchData,
  activity: ConnoteSearchActivityState,
};

export type ConnoteSearchData = {
  connoteID: number,
  connoteNumber: string,
  // TODO: find the real type for fromCustomerID
  fromCustomerID: mixed,
  fromName: string,
  fromStreetAddress: string,
  fromAdministrativeAddress: string,
  fromEmail: ?string,
  fromZipCode: ?string,
  fromTarriffCode: string,
  // TODO: find the real type for fromCustomerID
  toCustomerID: mixed,
  toName: string,
  toStreetAddress: string,
  toAdministrativeAddress: ?string,
  toEmail: ?string,
  toZipCode: ?string,
  toTarriffCode: ?string,
  serviceCode: string,
  transactionID: number,
  amountInsurance: string,
  amountSurcharge: any,
  amountPackingFee: any,
  amountDiscount: any,
  remarks: string,
  userID: number,
  createdOn: string,
  amountPrice: number,
  description: string,
  fromPhone: string,
  toPhone: string,
  chargeableWeight: string,
  isReceived: any,
  actualWeight: string,
  slaDate: any,
  lastNodeID: any,
  fromTlc: string,
  toTlc: any,
  isInsurance: any,
  isVoid: number,
  statusID: number,
  nodePosition: NodePosition,
};

export type GetConnoteByIdRequestedAction = {
  type: 'GET_CONNOTE_BY_ID_REQUESTED',
  id: string,
  nodeID: number,
};

export type GetConnoteByIdSuccessAction = {
  type: 'GET_CONNOTE_BY_ID_SUCCESS',
  data: ConnoteSearchData,
};

export type GetConnotActivityByIdRequestedAction = {
  type: 'GET_CONNOTE_ACTIVITY_BY_ID_REQUESTED',
  id: string,
  limit: number,
  sortByColumn: string,
  sortOrderType: SortType,
  page: number,
};

export type GetConnotActivityByIdSucceedAction = {
  type: 'GET_CONNOTE_ACTIVITY_BY_ID_SUCCEED',
  id: string,
  data: Array<ConnoteActivity>,
  total: number,
};

export type GetConnotActivityByIdFailedAction = {
  type: 'GET_CONNOTE_ACTIVITY_BY_ID_FAILED',
  error: Error,
};

export type ConnoteSearchAction =
  | GetConnoteByIdRequestedAction
  | GetConnoteByIdSuccessAction
  | GetConnotActivityByIdRequestedAction
  | GetConnotActivityByIdSucceedAction
  | GetConnotActivityByIdFailedAction;
