// @flow

import type {Node} from '../node/Node-type';

export type EmployeeGender = 'M' | 'F';

export type Employee = {
  employeeID: number,
  firstName: string,
  lastName: ?string,
  nik: ?string,
  birthDate: ?string,
  birthPlace: ?string,
  noKtp: ?string,
  noSim: ?string,
  workLocation: string,
  employementStatus: string,
  userID: string,
  positionID: string,
  phoneNumber: ?string,
  gender: EmployeeGender,
  position: {
    positionID: number,
    statusName: string,
  },
  nodeLocation: Node,
};

export type EmployeeActivity = {
  activity: string,
  ipAddress: string,
  recordID: string,
  rn: string,
  timestampAction: string,
  userID: string,
};

export type EmployeeActivityState = {
  list: Array<EmployeeActivity>,
  nextPageUrl: ?string,
  prevPageUrl: ?string,
  total: number,
  isLoading: boolean,
};

export type EmployeeState = {
  employeeID: ?number,
  personalInfo: ?Employee,
  activity: EmployeeActivityState,
  isLoading: boolean,
  employees: Array<Employee>,
};

export type EmployeeAction =
  | {
      type: 'GET_EMPLOYEE_DETAIL_REQUESTED',
      employeeID: number,
    }
  | {
      type: 'GET_EMPLOYEE_DETAIL_SUCCEED',
      personalInfo: Employee,
    }
  | {
      type: 'GET_EMPLOYEE_DETAIL_FAILED',
      error: Error,
    }
  | {
      type: 'GET_EMPLOYEE_ACTIVITY_LIST_SUCCEED',
      employeeID: number,
      data: Array<EmployeeActivity>,
      nextPageUrl: ?string,
      prevPageUrl: ?string,
      total: number,
    }
  | {
      type: 'GET_EMPLOYEE_ACTIVITY_LIST_REQUESTED',
      employeeID: number,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    }
  | {
      type: 'GET_EMPLOYEE_ACTIVITY_LIST_FAILED',
      error: Error,
    }
  | {
      type: 'GET_EMPLOYEES_COURIER_REQUESTED',
    }
  | {
      type: 'GET_EMPLOYEES_COURIER_SUCCEED',
      employees: Array<Employee>,
    }
  | {
      type: 'GET_EMPLOYEES_COURIER_FAILED',
      error: Error,
    };
