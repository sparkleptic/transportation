// @flow

import React from 'react';
import {connect} from 'react-redux';
import {View, Image, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {Paper, Typography} from 'material-ui';

import PersonalInfo from './components/PersonalInfo';
import ActivityInfo from './components/ActivityInfo';

import {DEFAULT_ROWS_PER_PAGE} from '../../components/Table/TableFooter';

import type {EmployeeState} from '../../data/employee/Employee-type';
import type {RootState, Dispatch} from '../../storeTypes';

type Props = {
  id: string,
  employee: EmployeeState,
  requestEmployeeDetail: (employeeID: string) => void,
  fetchActivityData: (
    employeeID: string,
    limit: number,
    sortByColumn: string,
    sortOrderType: SortType,
    page: number,
  ) => void,
};

class EmployeeDetail extends React.Component<Props, void> {
  componentWillMount() {
    let {id, requestEmployeeDetail} = this.props;
    requestEmployeeDetail(id);
  }

  render() {
    let {id, employee, fetchActivityData} = this.props;
    if (employee.isLoading) {
      return <ActivityIndicator animating />;
    }

    let {personalInfo, activity} = employee;
    return (
      <View style={styles.root}>
        <Paper
          style={StyleSheet.flatten([
            styles.generalCard,
            styles.personalInfoCard,
          ])}
        >
          {personalInfo && <PersonalInfo info={personalInfo} />}
        </Paper>
        <Paper
          style={StyleSheet.flatten([styles.generalCard, styles.activityCard])}
        >
          <ActivityInfo
            activity={activity}
            fetchData={(
              limit: number,
              sortByColumn: string,
              sortOrderType: SortType,
              page: number,
            ) => {
              fetchActivityData(id, limit, sortByColumn, sortOrderType, page);
            }}
          />
        </Paper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  generalCard: {
    padding: 20,
  },
  personalInfoCard: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    maxHeight: 300,
    marginRight: 10,
  },
  activityCard: {
    display: 'flex',
    flexGrow: 3,
    flexShrink: 3,
    height: 500,
  },
});

function mapStateToProps(state: RootState) {
  return {
    employee: state.employee,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    requestEmployeeDetail: (employeeID: string) => {
      dispatch({
        type: 'GET_EMPLOYEE_DETAIL_REQUESTED',
        employeeID: Number(employeeID),
      });
      dispatch({
        type: 'GET_EMPLOYEE_ACTIVITY_LIST_REQUESTED',
        employeeID: Number(employeeID),
        limit: DEFAULT_ROWS_PER_PAGE,
        sortByColumn: '',
        sortOrderType: 'asc',
        page: 1,
      });
    },
    fetchActivityData: (
      employeeID: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    ) => {
      dispatch({
        type: 'GET_EMPLOYEE_ACTIVITY_LIST_REQUESTED',
        employeeID: Number(employeeID),
        limit,
        sortByColumn,
        sortOrderType,
        page,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
