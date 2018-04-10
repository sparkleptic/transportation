// @flow

import React from 'react';
import {View, Text} from 'react-native';
import {Table, TableRow, TableCell, Icon} from 'material-ui';
import {
  TableHead,
  TableBody,
  TableTitle,
  TableFooter,
} from '../../../components/Table';

import {DEFAULT_ROWS_PER_PAGE} from '../../../components/Table/TableFooter';
import Summary from './Summary';
import {employeeColumnList} from '../constants';

import type {EmployeeState} from '../../../data/node/Employee-type';
import type {Employee} from '../../../data/employee/Employee-type';

type Props = {
  data: EmployeeState,
  rowsPerPage: number,
  activePage: number,
  activeSortColumn: string,
  activeSortType: SortType,
  fetchData: (
    limit: number,
    sortByColumn: string,
    sortOrderType: SortType,
    page: number,
  ) => void,
  onTableSettingChanged: ({[key: string]: any}) => void,
};

export default function EmployeeTable(props: Props) {
  let {
    data,
    fetchData,
    rowsPerPage,
    activePage,
    activeSortColumn,
    activeSortType,
    onTableSettingChanged,
  } = props;
  return (
    <View style={{flex: 1}}>
      <Summary totalAtFirst data={data.summaryList} />
      <Table style={{tableLayout: 'auto'}}>
        <TableHead
          columnList={employeeColumnList}
          onSortClick={(activeSortType: SortType, activeSortColumn: string) => {
            fetchData(
              rowsPerPage,
              activeSortColumn,
              activeSortType,
              activePage + 1,
            );
            onTableSettingChanged({activeSortType, activeSortColumn});
          }}
        />
        <TableBody
          data={data.list}
          style={{height: '100%'}}
          columnLength={5}
          render={(datum: Employee, index) => {
            return (
              <TableRow key={index}>
                <TableCell style={{width: 50}}>
                  {rowsPerPage * activePage + index + 1}
                </TableCell>
                <TableCell>
                  <a href={`/employee/${datum.employeeID}`}>{datum.nik}</a>
                </TableCell>
                <TableCell>
                  {`${datum.firstName} ${datum.lastName || ''}`}
                </TableCell>
                <TableCell>{datum.positionID}</TableCell>
                <TableCell>{datum.phoneNumber}</TableCell>
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
          dataLength={data.total}
          onChangePage={(activePage: number) => {
            fetchData(
              rowsPerPage,
              activeSortColumn,
              activeSortType,
              activePage + 1,
            );
            onTableSettingChanged({activePage});
          }}
          onChangeRowsPerPage={(rowsPerPage: number) => {
            fetchData(rowsPerPage, activeSortColumn, activeSortType, 1);
            onTableSettingChanged({rowsPerPage, activePage: 0});
          }}
        />
      </View>
    </View>
  );
}
