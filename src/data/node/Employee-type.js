// @flow

import type {Employee} from '../employee/Employee-type';
import type {SummaryItem} from './Node-type';

export type EmployeeState = {
  list: Array<Employee>,
  nextPageUrl: ?string,
  prevPageUrl: ?string,
  total: number,
  isLoading: boolean,
  summaryList: Array<SummaryItem>,
};

export type EmployeeAction =
  | {
      type: 'GET_NODE_EMPLOYEE_LIST_SUCCEED',
      nodeID: number,
      data: Array<Employee>,
      nextPageUrl: ?string,
      prevPageUrl: ?string,
      total: number,
      summaryList: Array<SummaryItem>,
    }
  | {
      type: 'GET_NODE_EMPLOYEE_LIST_REQUESTED',
      nodeID: number,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    }
  | {
      type: 'GET_NODE_EMPLOYEE_LIST_FAILED',
      error: Error,
    };
