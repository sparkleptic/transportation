// @flow

import React from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  Typography,
  Button,
  Table,
  TableCell,
  TableRow,
  Icon,
} from 'material-ui';
import {View} from 'react-native';

import {
  TableHead,
  TableBody,
  TableTitle,
  TableFooter,
} from '../../../../components/Table';
import PrintManifest from './PrintManifest';
import UserLinearProgress from '../UserLinearprogress';

import {columnList} from './constants';
import {DEFAULT_ROWS_PER_PAGE} from '../../../../components/Table/TableFooter';

import type {ManifestItem} from '../../../../data/manifest/Manifest-type';
import {getEntityList} from '../../../../actions/entity';
import type {RootState, Dispatch} from '../../../../storeTypes';

type Props = {
  data: Array<ManifestItem>,
  total: number,
  nextPageUrl: ?string,
  prevPageUrl: ?string,
  isLoading: boolean,
  activeNode: number,
  searchTextInput: string,
  fetchData: (
    searchTextInput: string,
    rowsPerPage: number,
    activeSortColumn: string,
    activeSortType: SortType,
    activePage: number,
    nodeID: number,
  ) => void,
  bagManifestRequested: (manifestNumber: string) => void,
  onSearchTextInputChanged: (searchTextInput: string) => void,
};

type State = {
  rowsPerPage: number,
  activePage: number,
  activeSortColumn: string,
  activeSortType: SortType,
};

export class ManifestList extends React.Component<Props, State> {
  state = {
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    activePage: 0,
    activeSortColumn: '',
    activeSortType: 'asc',
    openPrintWindowDialog: false,
    printdata: [],
  };
  componentWillMount() {
    let {searchTextInput, data, fetchData, activeNode} = this.props;
    if (data.length === 0) {
      let {
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage,
      } = this.state;
      fetchData(
        searchTextInput,
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage + 1,
        activeNode,
      );
    }
  }

  componentWillReceiveProps(newProps: Props) {
    let oldProps = this.props;
    let {
      rowsPerPage,
      activeSortColumn,
      activeSortType,
      activePage,
    } = this.state;

    if (oldProps.activeNode !== newProps.activeNode) {
      newProps.fetchData(
        newProps.searchTextInput,
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage + 1,
        newProps.activeNode,
      );
    }
  }

  handlePrintWindowDialog = (manifestID) => {

    getEntityList(`manifest/${manifestID}`, null).then((response) => {
      const {data} = response.data;
      this.setState({
        openPrintWindowDialog: !this.state.openPrintWindowDialog,
        printdata: data,
      });
    });

  };

  handlePrintWindowDialogClose = (manifestID) => {
    return this.setState({
      openPrintWindowDialog: !this.state.openPrintWindowDialog,
    });
  };

  render() {
    const {
      handlePrintWindowDialogClose,
    } = this;
    let {
      data,
      total,
      fetchData,
      bagManifestRequested,
      activeNode,
      searchTextInput,
      onSearchTextInputChanged,
    } = this.props;
    let {
      rowsPerPage,
      activeSortColumn,
      activeSortType,
      activePage,
      openPrintWindowDialog,
      handlePrintWindowDialog,
    } = this.state;

      // console.log("testinmg");
      // console.log(data);

    return (
      <View style={{flex: 1}}>
        <TableTitle
          title="Manifest List"
          searchTextInput={searchTextInput}
          onSearchTextChange={onSearchTextInputChanged}
          onSearchSubmit={(searchTextInput) => {
            fetchData(
              searchTextInput,
              rowsPerPage,
              activeSortColumn,
              activeSortType,
              activePage + 1,
              activeNode,
            );
          }}
        />
        
          {data.length === 0 && <UserLinearProgress />}
          <Table id="printableTable">
            <TableHead
              columnList={columnList}
              onSortClick={(
                activeSortType: SortType,
                activeSortColumn: string,
              ) => {
                fetchData(
                  searchTextInput,
                  rowsPerPage,
                  activeSortColumn,
                  activeSortType,
                  activePage + 1,
                  activeNode,
                );
                this.setState({activeSortColumn, activeSortType});
              }}
            />
            <TableBody
              data={data}
              render={(datum, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{datum.manifestNo ? datum.manifestNo : '-'}</TableCell>
                    <TableCell>{datum.manifestType.manifestTypeName ? datum.manifestType.manifestTypeName : 'Not Available'}</TableCell>
                    <TableCell>{datum.destinationDetail.nodeName ? datum.destinationDetail.nodeName : 'Not Available'}</TableCell>
                    <TableCell numeric>{datum.manifestDetail.length > 0 ? datum.manifestDetail[0].totalWeight : 0}</TableCell>
                    <TableCell numeric>{datum.manifestDetail.length > 0 ? datum.manifestDetail[0].totalConnote : 0}</TableCell>
                    <TableCell>
                      
                      <Route render={({ history}) => (
                        <Button
                          style={{color: '#343b91'}}
                          onClick={() => { history.push(`/transport/manifest/edit/${datum.manifestID}`) }}
                        >
                          EDIT
                        </Button>
                      )} />

                    </TableCell>
                    <TableCell>
                      <Button
                        style={{color: '#42a5f5'}}
                        onClick={() => {this.handlePrintWindowDialog(datum.manifestID)}}
                      >
                        PRINT
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }}
            />
            <TableFooter
              rowsPerPage={rowsPerPage}
              activePage={activePage}
              dataLength={total}
              onChangePage={(activePage: number) => {
                fetchData(
                  searchTextInput,
                  rowsPerPage,
                  activeSortColumn,
                  activeSortType,
                  activePage + 1,
                  activeNode,
                );
                this.setState({activePage});
              }}
              onChangeRowsPerPage={(rowsPerPage) => {
                fetchData(
                  searchTextInput,
                  rowsPerPage,
                  activeSortColumn,
                  activeSortType,
                  1,
                  activeNode,
                );
                this.setState({rowsPerPage, activePage: 0});
              }}
            />
          </Table>

          {openPrintWindowDialog && (
            <PrintManifest
              openDialog={openPrintWindowDialog}
              handleOpenDialog={handlePrintWindowDialogClose}
              printdatavalue={this.state.printdata}
            />
          )}
        
      </View>
    );
  }
}

function mapStateToProps(state: RootState) {
  let {
    list,
    nextPageUrl,
    prevPageUrl,
    total,
    isLoading,
    searchTextInput,
  } = state.manifest;
  return {
    data: list,
    nextPageUrl,
    prevPageUrl,
    total,
    isLoading,
    searchTextInput,
    activeNode: state.node.activeNode,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onSearchTextInputChanged: (searchTextInput: string) => {
      dispatch({
        type: 'MANIFEST_SEARCH_TEXT_INPUT_CHANGED',
        searchTextInput,
      });
    },
    fetchData: (
      search: string,
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
      nodeID: number,
    ) => {
      dispatch({
        type: 'GET_MANIFEST_LIST_REQUESTED',
        search,
        limit,
        sortByColumn,
        sortOrderType,
        page,
        nodeID,
      });
    },
    bagManifestRequested: (manifestNumber: string) => {
      dispatch({
        type: 'BAG_MANIFEST_REQUESTED',
        manifestNumber,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManifestList);
