// @flow

import React from 'react';
import {connect} from 'react-redux';
import {
  Typography,
  Button,
  Table,
  TableCell,
  TableRow,
  Icon,
  Paper,
} from 'material-ui';
import {View, StyleSheet, ScrollView} from 'react-native';


import {
  TableHead,
  TableBody,
  TableTitle,
  TableFooter,
} from '../../../../components/Table';
import {DEFAULT_ROWS_PER_PAGE} from '../../../../components/Table/TableFooter';

import type {
  BagMaster,
  BagDetail,
} from '../../../../data/inventoryUnbagging/InventoryUnbagging-type';


export type TableSettings = {
  rowsPerPage: number,
  activeSortColumn: string,
  activeSortType: SortType,
  activePage: number,
};

type Props = {
  data: Array<BagMaster>,
  tableSettings: TableSettings,
  total: number,
  masterTableColumnList: Array<Object>,
  detailTableColumnList: Array<Object>,
  unbaggedCount: number,
  unbaggedDetailCount: Map<string, number>,
  isLoading: boolean,
  onMasterTableSettingChanged: (changedTableSetting: Object) => void,
};

type State = {
  detailTable: {
    data: Array<BagDetail>,
  },
  selectedMasterData: ?string,
  hoveredIndex: ?number,
};

let intialDetailTable = {
  data: [],
};

export default class MasterDetailTablew extends React.Component<Props, State> {
  state = {
    detailTable: intialDetailTable,
    selectedMasterData: null,
    hoveredIndex: null,
  };

  componentWillReceiveProps(nextProps: Props) {
    let oldProps = this.props;
    let {detailTable, hoveredIndex, selectedMasterData} = this.state;

    let newDetailCount = selectedMasterData
      ? nextProps.unbaggedDetailCount.get(selectedMasterData) || 0
      : 0;

    let oldDetailCount = selectedMasterData
      ? oldProps.unbaggedDetailCount.get(selectedMasterData) || 0
      : 0;

    if (newDetailCount !== oldDetailCount) {
      let selectedData = nextProps.data.find(
        (datum) => datum.bagNo === selectedMasterData,
      );
      if (selectedData) {
        this.setState({
          detailTable: {
            ...this.state.detailTable,
            data: selectedData.detail,
          },
        });
      }
    }
  }
  render() {
    let {
      data,
      tableSettings,
      total,
      onMasterTableSettingChanged,
      masterTableColumnList,
      detailTableColumnList,
      unbaggedCount,
      unbaggedDetailCount,
      isLoading,
    } = this.props;
    let {detailTable, hoveredIndex, selectedMasterData} = this.state;

    let detailCount = selectedMasterData
      ? unbaggedDetailCount.get(selectedMasterData) || 0
      : 0;

    return (
      <View style={styles.root}>
        <Paper
          style={{
            ...StyleSheet.flatten(styles.paper),
            marginRight: 10,
          }}
        >
          <View style={styles.headerContainer}>
            <View style={{flex: 1}}>
              <Typography
                variant="headline"
                style={StyleSheet.flatten(styles.title)}
              >
                Unbagging
              </Typography>
            </View>
            <View style={styles.countContainer}>
              <Typography
                variant="display2"
                style={StyleSheet.flatten(styles.title)}
              >
                {unbaggedCount}
              </Typography>
              <Typography variant="title">unbagged</Typography>
            </View>
          </View>
          <View style={styles.tableContainer}>
            <Table key={unbaggedCount}>
              <TableHead
                columnList={masterTableColumnList}
                onSortClick={(
                  activeSortType: SortType,
                  activeSortColumn: string,
                ) => {
                  onMasterTableSettingChanged({
                    ...this.props.tableSettings,
                    activeSortType,
                    activeSortColumn,
                  });
                }}
              />
              <TableBody
                data={data}
                isLoading={isLoading}
                columnLength={masterTableColumnList.length}
                render={(datum: BagMaster, index) => {
                  let rowBackgroundColor = 'white';
                  if (selectedMasterData === datum.bagNo) {
                    rowBackgroundColor = '#F5F5F5';
                  } else if (hoveredIndex === index) {
                    rowBackgroundColor = '#BDBDBD';
                  }

                  return (
                    <TableRow
                      key={index}
                      onClick={() => {
                        this.setState({
                          detailTable: {
                            ...intialDetailTable,
                            data: datum.detail,
                          },
                          selectedMasterData: datum.bagNo,
                        });
                      }}
                      onMouseOver={() => {
                        this.setState({hoveredIndex: index});
                      }}
                      onMouseOut={() => {
                        this.setState({hoveredIndex: null});
                      }}
                      style={{
                        ...StyleSheet.flatten(styles.row),
                        backgroundColor: rowBackgroundColor,
                      }}
                    >
                      <TableCell style={StyleSheet.flatten(styles.noColumn)}>
                        {tableSettings.rowsPerPage *
                          (tableSettings.activePage - 1) +
                          index +
                          1}
                      </TableCell>
                      <TableCell>{datum.bagNo}</TableCell>
                      <TableCell>
                        {datum.isUnbagged ? (
                          <Icon style={StyleSheet.flatten(styles.checkMark)}>
                            check_circle
                          </Icon>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                }}
              />
            </Table>
          </View>
          <View style={styles.tableFooter}>
            <Table>
              <TableFooter
                rowsPerPage={tableSettings.rowsPerPage}
                activePage={tableSettings.activePage - 1}
                dataLength={total}
                onChangePage={(activePage: number) => {
                  onMasterTableSettingChanged({
                    ...tableSettings,
                    activePage: activePage + 1,
                  });
                }}
                onChangeRowsPerPage={(rowsPerPage) => {
                  onMasterTableSettingChanged({
                    ...tableSettings,
                    rowsPerPage,
                    activePage: 1,
                  });
                }}
              />
            </Table>
          </View>
        </Paper>
        <Paper style={{...StyleSheet.flatten(styles.paper), marginLeft: 10}}>
          <View style={styles.headerContainer}>
            <View style={{flex: 1}}>
              <Typography
                variant="headline"
                style={StyleSheet.flatten(styles.title)}
              >
                {selectedMasterData}
              </Typography>
            </View>
            <View style={styles.countContainer}>
              <Typography
                variant="display2"
                style={StyleSheet.flatten(styles.title)}
              >
                {detailCount} / {detailTable.data.length}
              </Typography>
              <Typography variant="title">Connote Scanned</Typography>
            </View>
          </View>
          <View style={styles.tableContainer}>
            <Table key={`${selectedMasterData || ''}${detailCount}`}>
              <TableHead columnList={detailTableColumnList} />
              <TableBody
                data={detailTable.data}
                noDataPlaceholderText="Choose bag to see the detail"
                columnLength={detailTableColumnList.length}
                render={(datum: BagDetail, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell style={StyleSheet.flatten(styles.noColumn)}>
                        {index + 1}
                      </TableCell>
                      <TableCell>{datum.valueNo}</TableCell>
                      <TableCell>
                        {datum.isUnbagged ? (
                          <Icon style={StyleSheet.flatten(styles.checkMark)}>
                            check_circle
                          </Icon>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                }}
              />
            </Table>
          </View>
        </Paper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  paper: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    flexDirection: 'column',
  },
  tableContainer: {
    flex: 1,
    display: 'block',
    overflow: 'auto',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  countContainer: {
    alignItems: 'flex-end',
  },
  checkMark: {
    color: 'green',
    alignSelf: 'center',
  },
  row: {
    cursor: 'pointer',
  },
  noColumn: {
    width: 50,
  },
  tableFooter: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
  },
});
