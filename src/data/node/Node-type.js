// @flow

import type {EmployeeGender} from '../employee/Employee-type';

import type {InventoryState, InventoryAction} from './Inventory-type';
import type {VehicleState, VehicleAction} from './Vehicle-type';
import type {EmployeeState, EmployeeAction} from './Employee-type';

export type SummaryItem = {
  key: string,
  value: string,
};

export type Node = {
  nodeID: number,
  agentName: ?string,
  allowConnote: string,
  allowSpecialCargo: ?boolean,
  cityID: string,
  districtID: string,
  employeeID: ?string,
  isLabel: string,
  nodeAddress: string,
  nodeCode: string,
  nodeLat: ?number,
  nodeLon: ?number,
  nodeName: string,
  nodeTypeID: number,
  parentNodeID: number,
  phone: string,
  provinceID: string,
  remark: ?string,
  status: string,
  subdistrictID: string,
  tariffCode: string,
  timeZoneID: string,
  zipCode: string,
  zoneCode: string,
};

export type PIC = {
  employeeID: number,
  firstName: string,
  lastName: ?string,
  nik: number,
  birthDate: ?string,
  birthPlace: ?string,
  noKtp: ?string,
  noSim: ?string,
  employementStatus: string,
  userID: ?number,
  positionID: ?number,
  phoneNumber: ?string,
  gender: EmployeeGender,
  workLocation: number,
};

export type GlobalSearchNode = Node & {
  pic: ?PIC,
};

export type GlobalSearchNodeState = {
  nodeID: ?number,
  detailInfo: ?GlobalSearchNode,
  inventory: InventoryState,
  vehicle: VehicleState,
  employee: EmployeeState,
  isLoading: boolean,
};

export type NodeState = {
  list: Map<number, Node>,
  activeNode: number,
  globalSearch: GlobalSearchNodeState,
};

export type NodeAction =
  | InventoryAction
  | VehicleAction
  | EmployeeAction
  | {
      type: 'GET_NODE_DETAIL_SUCCEED',
      nodeID: number,
      detailInfo: GlobalSearchNode,
    }
  | {
      type: 'GET_NODE_DETAIL_REQUESTED',
      nodeID: number,
    }
  | {
      type: 'GET_NODE_DETAIL_FAILED',
      error: Error,
    }
  | {
      type: 'NODE_RECEIVED',
      list: Array<Node>,
    }
  | {
      type: 'ACTIVE_NODE_CHANGED',
      nodeID: number,
    };
