// @flow

export type Permission = {
  accessAdd: string,
  accessAll: string,
  accessDelete: string,
  accessEdit: string,
  accessView: string,
  isDefault: string,
  moduleCode: string,
  moduleID: string,
  moduleName: string,
  orderNo: string,
};

export type PermissionState = {
  list: Map<string, Permission>,
};

export type PermissionAction = {
  type: 'PERMISSION_RECEIVED',
  list: Array<Permission>,
};
