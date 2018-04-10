// @flow

import React from 'react';
import {connect} from 'react-redux';
import {View, Image, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {Paper, Typography, Tabs, Tab} from 'material-ui';

import VehicleInfo from './components/VehicleInfo';
import ActivityInfo from './components/ActivityInfo';
import Maps from '../../components/Maps';

import {DEFAULT_ROWS_PER_PAGE} from '../../components/Table/TableFooter';

import type {VehicleState} from '../../data/vehicle/Vehicle-type';
import type {RootState, Dispatch} from '../../storeTypes';

type Props = {
  id: string,
  vehicle: VehicleState,
  requestVehicleDetail: (vehicleID: string) => void,
  fetchActivityData: (
    vehicleID: string,
    limit: number,
    sortByColumn: string,
    sortOrderType: SortType,
    page: number,
  ) => void,
};

class VehicleDetail extends React.Component<Props, void> {
  componentWillMount() {
    let {id, requestVehicleDetail} = this.props;
    requestVehicleDetail(id);
  }

  render() {
    let {id, vehicle, fetchActivityData} = this.props;

    if (vehicle.isLoading) {
      return <ActivityIndicator animating />;
    }

    let {detailInfo, activity} = vehicle;
    let markerPosition;

    if (detailInfo && detailInfo.vehicleLat && detailInfo.vehicleLot) {
      markerPosition = {
        lat: Number(detailInfo.vehicleLat),
        lng: Number(detailInfo.vehicleLot),
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
            {detailInfo && <VehicleInfo info={detailInfo} />}
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
              value="activity"
              indicatorColor="primary"
              textColor="primary"
              onChange={() => {}}
            >
              <Tab label="Activity" value="activity" />
            </Tabs>

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
      </View>
    );
  }
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
    height: 300,
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
    vehicle: state.vehicle,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    requestVehicleDetail: (vehicleID: string) => {
      dispatch({
        type: 'GET_VEHICLE_DETAIL_REQUESTED',
        vehicleID: Number(vehicleID),
      });
      dispatch({
        type: 'GET_VEHICLE_ACTIVITY_LIST_REQUESTED',
        vehicleID: Number(vehicleID),
        limit: DEFAULT_ROWS_PER_PAGE,
        sortByColumn: '',
        sortOrderType: 'asc',
        page: 1,
      });
    },
    fetchActivityData: (
      vehicleID: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    ) => {
      dispatch({
        type: 'GET_VEHICLE_ACTIVITY_LIST_REQUESTED',
        vehicleID: Number(vehicleID),
        limit,
        sortByColumn,
        sortOrderType,
        page,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetail);
