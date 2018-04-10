// @flow

import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import styles from './components/styles';
import {Paper} from 'material-ui';

import TrackingInfo from './components/TrackingInfo';
import {DEFAULT_ROWS_PER_PAGE} from '../../components/Table/TableFooter';

// imports Card
import FromCard from './components/FromCard';
import ToCard from './components/ToCard';
import InformationCard from './components/InformationCard';

import type {
  ConnoteSearchData,
  ConnoteSearchActivityState,
} from '../../data/connoteSearch/ConnoteSearch-type';

type Props = {
  detailInfo: ConnoteSearchData,
  id: string,
  activity: ConnoteSearchActivityState,
  fetchConnoteDetail: (id: string) => void,
  fetchConnoteActivityData: (
    connoteID: string,
    limit: number,
    sortByColumn: string,
    sortOrderType: SortType,
    page: number,
  ) => void,
};

export class ConnoteDetail extends React.Component<Props> {
  componentDidMount() {
    let {id} = this.props;
    if (id) {
      this.props.fetchConnoteDetail(id);
    }
  }

  render() {
    let {id, detailInfo} = this.props;

    let fromData = {};
    let toData = {};

    if (detailInfo) {
      let keys = Object.keys(detailInfo);
      /*
        I separate fromData to toData
        for each respective component props;
      */
      for (let key of keys) {
        if (key.match(/from/gi)) {
          fromData[key] = detailInfo[key];
        }
        if (key.match(/to/gi)) {
          toData[key] = detailInfo[key];
        }
      }
    }

    return (
      <View style={{padding: 40}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          {/* From Card Here */}
          <FromCard data={fromData} />

          {/* To Card Here */}
          <ToCard data={toData} />

          {/* Information Card Here */}
          <InformationCard data={detailInfo ? detailInfo : null} />
        </View>
        <View style={{flex: 1, marginTop: 25}}>
          <Paper style={StyleSheet.flatten(styles.paper)}>
            <TrackingInfo
              activity={this.props.activity}
              fetchData={(
                limit: number,
                sortByColumn: string,
                sortOrderType: SortType,
                page: number,
              ) => {
                this.props.fetchConnoteActivityData(
                  id,
                  limit,
                  sortByColumn,
                  sortOrderType,
                  page,
                );
              }}
            />
          </Paper>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  let {connoteSearch: {detailInfo, activity}} = state;
  return {
    detailInfo,
    activity,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchConnoteDetail: (connoteID: string) => {
      dispatch({
        type: 'GET_CONNOTE_BY_ID_REQUESTED',
        id: connoteID,
      });
      dispatch({
        type: 'GET_CONNOTE_ACTIVITY_BY_ID_REQUESTED',
        id: connoteID,
        limit: DEFAULT_ROWS_PER_PAGE,
        sortByColumn: '',
        sortOrderType: 'asc',
        page: 1,
      });
    },
    fetchConnoteActivityData: (
      connoteID: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    ) => {
      dispatch({
        type: 'GET_CONNOTE_ACTIVITY_BY_ID_REQUESTED',
        id: connoteID,
        limit,
        sortByColumn,
        sortOrderType,
        page,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnoteDetail);
