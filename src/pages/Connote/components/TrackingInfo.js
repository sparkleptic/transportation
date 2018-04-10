// @flow

import React from 'react';
import {View, Text} from 'react-native';
import {Table, TableRow, TableCell, Typography} from 'material-ui';
import {
  TableHead,
  TableBody,
  TableTitle,
  TableFooter,
} from '../../../components/Table';

import {DEFAULT_ROWS_PER_PAGE} from '../../../components/Table/TableFooter';
import {trackingColumnList} from '../constants';

import type {
  ConnoteSearchActivityState,
  ConnoteActivity,
} from '../../../data/connoteSearch/ConnoteSearch-type';

type Props = {
  activity: ConnoteSearchActivityState,
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

export default class TrackingInfo extends React.Component<Props, State> {
  state = {
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    activePage: 0,
    activeSortColumn: '',
    activeSortType: 'asc',
  };
  render() {
    let {activity, fetchData} = this.props;
    //
    let {
      rowsPerPage,
      activePage,
      activeSortColumn,
      activeSortType,
    } = this.state;
    return (
      <View style={{flex: 1}}>
        <Typography variant="title" style={{fontWeight: 'bold'}}>
          Tracking
        </Typography>
        <Table style={{tableLayout: 'auto'}}>
          <TableHead
            columnList={trackingColumnList}
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
            render={(data: ConnoteActivity, index) => {
              return (
                <TableRow key={index}>
                  <TableCell style={{width: 50}}>
                    {rowsPerPage * activePage + index + 1}
                  </TableCell>
                  <TableCell>{data.createdOn}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell style={{fontWeight: 'bold', color: '#76b3ef'}}>
                    {data.node.pic.firstName}
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', color: '#76b3ef'}}>
                    {data.node.nodeCode}
                  </TableCell>
                  <TableCell>
                    {data.description.split(' ').map((word, i) => {
                      /*
                      I change the style for every activity description
                      that match PIC name and with hashtag
                      with blue color, according to the design.
                      */
                      let picName = data.node.pic.firstName;
                      let regexName = new RegExp(picName, 'gi');
                      if (
                        word.match(/([#?])(\w+)\b/gi) ||
                        word.match(regexName)
                      ) {
                        return (
                          <Text
                            key={i}
                            style={{fontWeight: 'bold', color: '#76b3ef'}}
                          >
                            {`${word} `}
                          </Text>
                        );
                      }
                      return `${word} `;
                    })}
                  </TableCell>
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
