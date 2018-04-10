// @flow

import React from 'react';
import {connect} from 'react-redux';
import {View, Image, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {Paper, Typography, Tabs, Tab} from 'material-ui';

import EmployeeTable from './components/EmployeeTable';
import VehicleTable from './components/VehicleTable';
import InventoryDetail from './components/InventoryDetail';
import NodeInfo from './components/NodeInfo';
import Maps from '../../components/Maps';

import {DEFAULT_ROWS_PER_PAGE} from '../../components/Table/TableFooter';

import type {GlobalSearchNodeState} from '../../data/node/Node-type';
import type {RootState, Dispatch} from '../../storeTypes';

type FetchData = (
  nodeID: string,
  limit: number,
  sortByColumn: string,
  sortOrderType: SortType,
  page: number,
) => void;

type Props = {
  id: string,
  node: GlobalSearchNodeState,
  requestNodeDetail: (nodeID: string) => void,
  fetchVehicleData: FetchData,
  fetchEmployeeData: FetchData,
  fetchInventoryData: FetchData,
};

type TabValue = 'inventory' | 'employee' | 'vehicle';

type TableState = {
  rowsPerPage: number,
  activePage: number,
  activeSortColumn: string,
  activeSortType: SortType,
};

type State = {
  activeTab: TabValue,
  vehicleTable: TableState,
  employeeTable: TableState,
};

const TABS = [
  {label: 'Inventories', value: 'inventory'},
  {label: 'Vehicles', value: 'vehicle'},
  {label: 'Employees', value: 'employee'},
];

let getTableInitialState = () => ({
  rowsPerPage: DEFAULT_ROWS_PER_PAGE,
  activePage: 0,
  activeSortColumn: '',
  activeSortType: 'asc',
});

class NodeDetail extends React.Component<Props, State> {
  state = {
    activeTab: 'inventory',
    vehicleTable: getTableInitialState(),
    employeeTable: getTableInitialState(),
  };
  componentWillMount() {
    let {id, requestNodeDetail} = this.props;
    requestNodeDetail(id);
  }

  render() {
    let {id, node} = this.props;
    let {activeTab} = this.state;

    if (node.isLoading) {
      return <ActivityIndicator animating />;
    }

    let {detailInfo} = node;
    let markerPosition;

    if (detailInfo && detailInfo.nodeLat && detailInfo.nodeLon) {
      markerPosition = {
        lat: Number(detailInfo.nodeLat),
        lng: Number(detailInfo.nodeLon),
      };
    }

    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <Paper
            style={StyleSheet.flatten([
              styles.generalCard,
              styles.headerCard,
              styles.vehicleCard,
            ])}
          >
            {detailInfo && <NodeInfo info={detailInfo} />}
          </Paper>
          {markerPosition && (
            <Paper
              style={StyleSheet.flatten([
                styles.generalCard,
                styles.headerCard,
                styles.mapCard,
              ])}
            >
              <View style={{flex: 1}}>
                <Maps
                  markerPositionList={[markerPosition]}
                  defaultCenter={markerPosition}
                />
              </View>
            </Paper>
          )}
        </View>
        <View style={styles.activityContainer}>
          <Paper style={StyleSheet.flatten([styles.generalCard])}>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={(event, activeTab) => this.setState({activeTab})}
            >
              {TABS.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>

            {this._renderTabContent(activeTab)}
          </Paper>
        </View>
      </View>
    );
  }
  _renderTabContent = (activeTab: TabValue) => {
    let {
      id,
      node,
      fetchInventoryData,
      fetchEmployeeData,
      fetchVehicleData,
    } = this.props;
    let {vehicleTable, employeeTable} = this.state;

    switch (activeTab) {
      case 'inventory': {
        return <InventoryDetail data={node.inventory} />;
      }
      case 'employee': {
        let {
          rowsPerPage,
          activePage,
          activeSortColumn,
          activeSortType,
        } = employeeTable;
        return (
          <EmployeeTable
            data={node.employee}
            rowsPerPage={rowsPerPage}
            activePage={activePage}
            activeSortColumn={activeSortColumn}
            activeSortType={activeSortType}
            onTableSettingChanged={(changedSettings) => {
              this._onTableSettingChanged('employeeTable', changedSettings);
            }}
            fetchData={(
              limit: number,
              sortByColumn: string,
              sortOrderType: SortType,
              page: number,
            ) => {
              fetchEmployeeData(id, limit, sortByColumn, sortOrderType, page);
            }}
          />
        );
      }
      case 'vehicle': {
        let {
          rowsPerPage,
          activePage,
          activeSortColumn,
          activeSortType,
        } = vehicleTable;
        return (
          <VehicleTable
            data={node.vehicle}
            rowsPerPage={rowsPerPage}
            activePage={activePage}
            activeSortColumn={activeSortColumn}
            activeSortType={activeSortType}
            onTableSettingChanged={(changedSettings) => {
              this._onTableSettingChanged('vehicleTable', changedSettings);
            }}
            fetchData={(
              limit: number,
              sortByColumn: string,
              sortOrderType: SortType,
              page: number,
            ) => {
              fetchInventoryData(id, limit, sortByColumn, sortOrderType, page);
            }}
          />
        );
      }
    }
  };

  _onTableSettingChanged = (
    type: 'vehicleTable' | 'employeeTable',
    changedSettings: {[key: string]: any},
  ) => {
    this.setState({
      [type]: {
        ...this.state[type],
        ...changedSettings,
      },
    });
  };
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
  },
  generalCard: {
    padding: 20,
  },
  headerCard: {
    height: 450,
  },
  vehicleCard: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    marginRight: 10,
  },
  mapCard: {
    display: 'flex',
    flexGrow: 3,
    flexShrink: 3,
  },
  activityContainer: {
    flex: 1,
    marginTop: 10,
  },
  activityCard: {
    display: 'flex',
    flexGrow: 3,
    flexShrink: 3,
    maxHeight: 300,
  },
});

function mapStateToProps(state: RootState) {
  return {
    node: state.node.globalSearch,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    requestNodeDetail: (nodeID: string) => {
      dispatch({
        type: 'GET_NODE_DETAIL_REQUESTED',
        nodeID: Number(nodeID),
      });
      dispatch({
        type: 'GET_NODE_INVENTORY_LIST_REQUESTED',
        nodeID: Number(nodeID),
        limit: DEFAULT_ROWS_PER_PAGE,
        sortByColumn: '',
        sortOrderType: 'asc',
        page: 1,
      });
      dispatch({
        type: 'GET_NODE_VEHICLE_LIST_REQUESTED',
        nodeID: Number(nodeID),
        limit: DEFAULT_ROWS_PER_PAGE,
        sortByColumn: '',
        sortOrderType: 'asc',
        page: 1,
      });
      dispatch({
        type: 'GET_NODE_EMPLOYEE_LIST_REQUESTED',
        nodeID: Number(nodeID),
        limit: DEFAULT_ROWS_PER_PAGE,
        sortByColumn: '',
        sortOrderType: 'asc',
        page: 1,
      });
    },
    fetchInventoryData: (
      nodeID: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    ) => {
      dispatch({
        type: 'GET_NODE_INVENTORY_LIST_REQUESTED',
        nodeID: Number(nodeID),
        limit,
        sortByColumn,
        sortOrderType,
        page,
      });
    },
    fetchVehicleData: (
      nodeID: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    ) => {
      dispatch({
        type: 'GET_NODE_VEHICLE_LIST_REQUESTED',
        nodeID: Number(nodeID),
        limit,
        sortByColumn,
        sortOrderType,
        page,
      });
    },
    fetchEmployeeData: (
      nodeID: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    ) => {
      dispatch({
        type: 'GET_NODE_EMPLOYEE_LIST_REQUESTED',
        nodeID: Number(nodeID),
        limit,
        sortByColumn,
        sortOrderType,
        page,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeDetail);
