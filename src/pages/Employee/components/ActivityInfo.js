// @flow

import React from 'react';
import {View, Text} from 'react-native';
import {Table, TableRow, TableCell} from 'material-ui';
import {
  TableHead,
  TableBody,
  TableTitle,
  TableFooter,
} from '../../../components/Table';

import {DEFAULT_ROWS_PER_PAGE} from '../../../components/Table/TableFooter';
import {columnList} from '../constants';

import type {EmployeeActivityState} from '../../../data/employee/Employee-type';

type Props = {
  activity: EmployeeActivityState,
  fetchData: (
    limit: number,
    sortByColumn: string,
    sortOrderType: SortType,
    page: number,
  ) => void,
};

type State = {
  rowsPerPage: number,
  activePage: number,
  activeSortColumn: string,
  activeSortType: SortType,
};

export default class ActivityInfo extends React.Component<Props, State> {
  state = {
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    activePage: 0,
    activeSortColumn: '',
    activeSortType: 'asc',
  };
  render() {
    let {activity, fetchData} = this.props;
    let {
      rowsPerPage,
      activePage,
      activeSortColumn,
      activeSortType,
    } = this.state;
    return (
      <View style={{flex: 1}}>
        <Table style={{tableLayout: 'auto'}}>
          <TableHead
            columnList={columnList}
            onSortClick={(
              activeSortType: SortType,
              activeSortColumn: string,
            ) => {
              fetchData(
                rowsPerPage,
                activeSortColumn,
                activeSortType,
                activePage + 1,
              );
              this.setState({activeSortColumn, activeSortType});
            }}
          />
          <TableBody
            data={activity.list}
            style={{height: '100%'}}
            render={(
              {activity: activityName, timestampAction, recordID},
              index,
            ) => {
              return (
                <TableRow key={index}>
                  <TableCell style={{width: 50}}>
                    {rowsPerPage * activePage + index + 1}
                  </TableCell>
                  <TableCell style={{width: 200}}>{timestampAction}</TableCell>
                  <TableCell>{activityName}</TableCell>
                </TableRow>
              );
            }}
          />
        </Table>
        <View
          style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}
        >
          <TableFooter
            rowsPerPage={rowsPerPage}
            activePage={activePage}
            dataLength={activity.total}
            onChangePage={(activePage: number) => {
              fetchData(
                rowsPerPage,
                activeSortColumn,
                activeSortType,
                activePage + 1,
              );
              this.setState({activePage});
            }}
            onChangeRowsPerPage={(rowsPerPage: number) => {
              fetchData(rowsPerPage, activeSortColumn, activeSortType, 1);
              this.setState({rowsPerPage, activePage: 0});
            }}
          />
        </View>
      </View>
    );
  }
}
