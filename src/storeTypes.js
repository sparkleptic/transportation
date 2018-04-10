// @flow

import type {AuthState, AuthAction} from './data/auth/Auth-type';
import type {User, UserAction} from './data/user/User-type';
import type {ConnoteState, ConnoteAction} from './data/connote/Connote-type';
import type {BagState, BagAction} from './data/bag/Bag-type';
import type {
  PermissionState,
  PermissionAction,
} from './data/permission/Permission-type';
import type {NodeState, NodeAction} from './data/node/Node-type';
import type {
  InventoryBaggingState,
  InventoryBaggingAction,
} from './data/inventoryBagging/InventoryBagging-type';

import type {
  NotificationState,
  NotificationAction,
} from './data/notification/Notification-type';

import type {
  GlobalSearchState,
  GlobalSearchAction,
} from './data/globalSearch/GlobalSearch-type';

import type {
  EmployeeState,
  EmployeeAction,
} from './data/employee/Employee-type';

import type {VehicleState, VehicleAction} from './data/vehicle/Vehicle-type.js';

import type {
  InventoryUnbaggingState,
  InventoryUnbaggingAction,
} from './data/inventoryUnbagging/InventoryUnbagging-type';

import type {NavigationState} from './data/routing/Navigation-type.js';

import type {BugReportAction} from './libraries/bugReport/BugReport-type';

export type RootState = {
  auth: AuthState,
  user: User,
  connote: ConnoteState,
  bag: BagState,
  permission: PermissionState,
  node: NodeState,
  inventoryBagging: InventoryBaggingState,
  notification: NotificationState,
  globalSearch: GlobalSearchState,
  router: NavigationState,
  employee: EmployeeState,
  vehicle: VehicleState,
  inventoryUnbagging: InventoryUnbaggingState,
};

export type Action =
  | AuthAction
  | ConnoteAction
  | BagAction
  | PermissionAction
  | UserAction
  | NodeAction
  | InventoryBaggingAction
  | NotificationAction
  | GlobalSearchAction
  | EmployeeAction
  | VehicleAction
  | BugReportAction
  | InventoryUnbaggingAction;

export type Dispatch = (action: Action) => void;
