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
import {vehicleColumnList} from '../constants';

import type {VehicleState} from '../../../data/node/Vehicle-type';
import type {Vehicle} from '../../../data/vehicle/Vehicle-type';

type Props = {
  data: VehicleState,
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

export default function VehicleTable(props: Props) {
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
      <Summary data={data.summaryList} />
      <Table style={{tableLayout: 'auto'}}>
        <TableHead
          columnList={vehicleColumnList}
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
          columnLength={6}
          render={(datum: Vehicle, index) => {
            return (
              <TableRow key={index}>
                <TableCell style={{width: 50}}>
                  {rowsPerPage * activePage + index + 1}
                </TableCell>
                <TableCell>{datum.vehicleName}</TableCell>
                <TableCell>{datum.policeNo}</TableCell>
                <TableCell>Vehicle Type Value goes here</TableCell>
                <TableCell>{datum.ownedBy}</TableCell>
                <TableCell>{datum.vehicleStatus}</TableCell>
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
