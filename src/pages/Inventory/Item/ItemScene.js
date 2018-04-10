// @flow

import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Typography, Tabs, Tab, Paper} from 'material-ui';

import ConnoteList from './Connote/ConnoteList';
import BagList from './Bag/BagList';
import {DEFAULT_ROWS_PER_PAGE} from '../../../components/Table/TableFooter';

type ActiveTab = 'connote' | 'bag';

type TabValue = 'inventory' | 'employee' | 'vehicle';

type TableState = {
  rowsPerPage: number,
  activePage: number,
  activeSortColumn: string,
  activeSortType: SortType,
};

type Props = {
  tab?: ActiveTab,
  getConnotes: (
    searchTextInput: string,
    rowsPerPage: number,
    activeSortColumn: string,
    activeSortType: SortType,
    activePage: number,
    nodeID: number,
  ) => void,
  getBags: (
    searchTextInput: string,
    rowsPerPage: number,
    activeSortColumn: string,
    activeSortType: SortType,
    activePage: number,
    nodeID: number,
  ) => void,
};

type State = {
  activeTab: ActiveTab,
  connoteTable: TableState,
  bagTable: TableState,
};

let getTableInitialState = () => ({
  rowsPerPage: DEFAULT_ROWS_PER_PAGE,
  activePage: 0,
  activeSortColumn: '',
  activeSortType: 'desc',
});

class ItemScene extends React.Component<Props, State> {
  state = {
    activeTab: this.props.tab || 'connote',
    connoteTable: {...getTableInitialState(), activeSortColumn: 'created_on'},
    bagTable: {...getTableInitialState(), activeSortColumn: 'bag_date'},
  };

  render() {
    let {activeTab} = this.state;
    return (
      <View style={{flex: 1, paddingHorizontal: 60}}>
        <View style={{marginVertical: 40}}>
          <Typography variant="title">Item</Typography>
        </View>
        <Paper>
          <View style={{paddingHorizontal: 20, paddingTop: 30}}>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={this._onTabPress}
            >
              <Tab label="Connote" value="connote" />
              <Tab label="Bag" value="bag" />
            </Tabs>
            <View>{this._renderContent(activeTab)}</View>
          </View>
        </Paper>
      </View>
    );
  }
  _onTabPress = (event: Event, activeTab: ActiveTab) => {
    this.setState({activeTab});
    if (activeTab === 'connote') {
      let {
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage,
      } = this.state.connoteTable;
      this.props.getConnotes(
        this.props.connoteSearchTextInput,
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage + 1,
        this.props.activeNode,
      );
    } else {
      let {
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage,
      } = this.state.bagTable;
      this.props.getBags(
        this.props.bagSearchTextInput,
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage + 1,
        this.props.activeNode,
      );
    }
  }

  _renderContent = (activeTab: ActiveTab) => {
    let {
      rowsPerPage,
      activeSortColumn,
      activeSortType,
      activePage,
    } = this.state.connoteTable;
    let connoteComponent = (
      <ConnoteList
        onTableSettingChanged={(changedSettings) =>
          this._onTableSettingChanged('connoteTable', changedSettings)
        }
        rowsPerPage={rowsPerPage}
        activePage={activePage}
        activeSortColumn={activeSortColumn}
        activeSortType={activeSortType}
      />
    );
    switch (activeTab) {
      case 'connote': {
        return connoteComponent;
      }
      case 'bag': {
        let {
          rowsPerPage,
          activeSortColumn,
          activeSortType,
          activePage,
        } = this.state.bagTable;
        return (
          <BagList
            onTableSettingChanged={(changedSettings) =>
              this._onTableSettingChanged('bagTable', changedSettings)
            }
            rowsPerPage={rowsPerPage}
            activePage={activePage}
            activeSortColumn={activeSortColumn}
            activeSortType={activeSortType}
          />
        );
      }

      default:
        return connoteComponent;
    }
  };

  _onTableSettingChanged = (
    type: 'connoteTable' | 'bagTable',
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

function mapStateToProps(state: RootState) {
  return {
    connoteSearchTextInput: state.connote.searchTextInput,
    bagSearchTextInput: state.bag.searchTextInput,
    activeNode: state.header.currenNode,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    getConnotes: (
      search: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
      nodeID: number,
    ) => {
      dispatch({
        type: 'GET_CONNOTE_LIST_REQUESTED',
        search,
        limit,
        sortByColumn,
        sortOrderType,
        page,
        nodeID,
      });
    },
    getBags: (
      search: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
      nodeID: number,
    ) => {
      dispatch({
        type: 'GET_BAG_LIST_REQUESTED',
        search,
        limit,
        sortByColumn,
        sortOrderType,
        page,
        nodeID,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemScene);
