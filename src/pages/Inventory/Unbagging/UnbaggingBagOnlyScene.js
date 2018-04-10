// @flow

/*import {connect} from 'react-redux';
import UnbaggingScene from './UnbaggingScene';

import type {RootState, Dispatch} from '../../../storeTypes';

function mapStateToProps(state: RootState) {
  let {
    bag: data,
    total,
    isLoading,
    unbaggedCount,
    unbaggedDetailCount,
  } = state.inventoryUnbagging;*/

import React from 'react';

import {connect} from 'react-redux';
import UnbaggingScene from './UnbaggingScene';

import type {RootState, Dispatch} from '../../../storeTypes';

function mapStateToProps(state: RootState) {

  let {
    bag: data,
    total,
    isLoading,
    unbaggedCount,
    unbaggedDetailCount,
  } = state.inventoryUnbagging;
  return {
    data,
    total,
    isLoading,
    unbaggedCount,
    unbaggedDetailCount,
    activeNode: state.node.activeNode,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchMasterData: (
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
      nodeID: number,
    ) => {
      dispatch({
        type: 'GET_BAG_HISTORY_REQUESTED',
        limit,
        sortByColumn,
        sortOrderType,
        page,
        nodeID,
      });
    },

    onTextFieldSubmit: (
      bagNumber: string,
      nodeID: number,
      tableSettings: {
        limit: number,
        sortByColumn: string,
        sortOrderType: SortType,
        page: number,
      },
    ) => {
      dispatch({
        type: 'UNBAG_BAG_ONLY_REQUESTED',
        bagNumber,
        nodeID,
        tableSettings,
      });
    },
    resetData: () => {
      dispatch({
        type: 'RESET_UNBAG_REQUESTED',
      });
    },
  };
}

/*export default connect(mapStateToProps, mapDispatchToProps)(UnbaggingScene);*/
/*export default connect(mapStateToProps, mapDispatchToProps)(
  UnbaggingBagOnlyScene,
);*/

export default connect(mapStateToProps, mapDispatchToProps)(UnbaggingScene);

