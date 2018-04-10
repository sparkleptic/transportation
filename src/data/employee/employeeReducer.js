// @flow

import type {EmployeeState, EmployeeAction} from './Employee-type';

const initialState = {
  employeeID: null,
  personalInfo: null,
  activity: {
    list: [],
    nextPageUrl: null,
    prevPageUrl: null,
    total: 0,
    isLoading: false,
  },
  isLoading: false,
  employees: [],
};

export default function employeeReducer(
  state: EmployeeState = initialState,
  action: EmployeeAction,
) {
  switch (action.type) {
    case 'GET_EMPLOYEE_DETAIL_REQUESTED': {
      return {
        ...state,
        isLoading: true,
        employeeID: action.employeeID,
      };
    }
    case 'GET_EMPLOYEE_DETAIL_SUCCEED': {
      return {
        ...state,
        personalInfo: action.personalInfo,
        isLoading: false,
      };
    }
    case 'GET_EMPLOYEE_DETAIL_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'GET_EMPLOYEE_ACTIVITY_LIST_REQUESTED': {
      return {
        ...state,
        activity: {
          ...state.activity,
          isLoading: true,
        },
      };
    }
    case 'GET_EMPLOYEE_ACTIVITY_LIST_SUCCEED': {
      let {employeeID, data, nextPageUrl, prevPageUrl, total} = action;
      if (state.employeeID && Number(state.employeeID) !== Number(employeeID)) {
        return state;
      }
      return {
        ...state,
        activity: {
          list: data,
          nextPageUrl,
          prevPageUrl,
          total,
          isLoading: false,
        },
      };
    }
    case 'GET_EMPLOYEE_ACTIVITY_LIST_FAILED': {
      return {
        ...state,
        activity: {
          ...state.activity,
          isLoading: false,
        },
      };
    }
    case 'GET_EMPLOYEES_COURIER_REQUESTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'GET_EMPLOYEES_COURIER_SUCCEED': {
      console.log('employees, ', action);
      return {
        ...state,
        employees: action.personalInfo,
        isLoading: false,
      };
    }
    case 'GET_EMPLOYEES_COURIER_FAILED': {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
