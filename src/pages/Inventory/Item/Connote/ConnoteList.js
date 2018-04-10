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
} from 'material-ui';
import {View} from 'react-native';
import BlockUI from 'react-block-ui';

import {
  TableHead,
  TableBody,
  TableTitle,
  TableFooter,
} from '../../../../components/Table';

import {getConnoteData} from '../../../../constants/excelFilters';

import {columnList} from './constants';

import type {ConnoteItem} from '../../../../data/connote/Connote-type';
import type {RootState, Dispatch} from '../../../../storeTypes';

type Props = {
  rowsPerPage: number,
  activePage: number,
  activeSortColumn: string,
  activeSortType: SortType,
  data: Array<ConnoteItem>,
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
  bagConnoteRequested: (connoteNumber: string, nodeID: number) => void,
  onSearchTextInputChanged: (searchTextInput: string) => void,
  onTableSettingChanged: ({[key: string]: any}) => void,
};

export class ConnoteList extends React.Component<Props> {
  componentWillMount() {
    let {
      searchTextInput,
      data,
      fetchData,
      activeNode,
      rowsPerPage,
      activeSortColumn,
      activeSortType,
      activePage,
    } = this.props;
    //if (data.length === 0) {
      /*let {
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage,
      } = this.props;
*/
      fetchData(
        searchTextInput,
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage + 1,
        activeNode,
      );
    //}
  }

  componentWillReceiveProps(newProps: Props) {
    let oldProps = this.props;
    let {
      rowsPerPage,
      activeSortColumn,
      activeSortType,
      activePage,
    } = this.props;
    if (oldProps.activeNode !== newProps.activeNode) {
      let {
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage,
      } = newProps;
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

  render() {
    let {
      rowsPerPage,
      activeSortColumn,
      activeSortType,
      activePage,
      data,
      total,
      fetchData,
      bagConnoteRequested,
      activeNode,
      //rowsPerPage,
      //activeSortColumn,
      //activeSortType,
      //activePage,
      searchTextInput,
      onSearchTextInputChanged,
      onTableSettingChanged,
      isLoading,
      isValidating,
    } = this.props;
    let {columns, excelData} = getConnoteData(columnList, data);
    return (

      <BlockUI tag="div" blocking={isLoading || isValidating}>
      <View style={{flex: 1}}>
        <TableTitle
          title="Connote List"
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
        <Table key={data.length}>
          {/*<TableHead
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

              onTableSettingChanged({activeSortType, activeSortColumn});
            }}
          />
          <TableBody
            data={data}
            columnLength={columnList.length}
            render={(datum, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{datum.connoteNumber}</TableCell>
                  <TableCell>{datum.createdOn}</TableCell>
                  <TableCell>{datum.toTariffCode}</TableCell>
                  <TableCell numeric>{datum.chargeableWeight}</TableCell>
                  <TableCell>{datum.serviceCode}</TableCell>
                  <TableCell>{datum.slaDate}</TableCell>
                  <TableCell style={{maxWidth: 50}}>
                    {datum.isWoodPackage && (
                      <Icon style={{color: 'green', alignSelf: 'center'}}>
                        check_circle
                      </Icon>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="raised"
                      style={{backgroundColor: 'green', color: 'white'}}
                      onClick={() => {
                        bagConnoteRequested(datum.connoteNumber, activeNode);
                      }}
                    >
                      BAG
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
              onTableSettingChanged({activePage});
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
              onTableSettingChanged({rowsPerPage, activePage: 0});
            }}
            columns={columns}
            data={excelData}
            filename="connote.xlsx"
            orgName="JNE"
          />*/}
          <Table>
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
                onTableSettingChanged({activeSortColumn, activeSortType});
              }}
            />
            <TableBody
              data={data}
              render={(datum) => {
                return (
                  <TableRow>
                    <TableCell>{datum.connoteNumber}</TableCell>
                    <TableCell>{datum.createdOn}</TableCell>
                    <TableCell>{datum.toTariffCode}</TableCell>
                    <TableCell numeric>{datum.chargeableWeight}</TableCell>
                    <TableCell>{datum.serviceCode}</TableCell>
                    <TableCell>{datum.slaDate}</TableCell>
                    <TableCell>
                      {datum.isWoodPackage && (
                        <Icon style={{color: 'green', alignSelf: 'center'}}>
                          check_circle
                        </Icon>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="raised"
                        style={{backgroundColor: 'green', color: 'white'}}
                        onClick={() => {
                          console.log('masuk');
                          bagConnoteRequested(datum.connoteNumber, activeNode);
                        }}
                      >
                        BAG
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
                onTableSettingChanged({activePage});
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
                onTableSettingChanged({rowsPerPage, activePage: 0});
              }}
            />
          </Table>
        </Table>
      </View>
      </BlockUI>
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
  } = state.connote;
  return {
    data: list,
    nextPageUrl,
    prevPageUrl,
    total,
    isLoading,
    searchTextInput,
    isValidating: state.inventoryBagging.isValidating,
    activeNode: state.header.currentNode,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onSearchTextInputChanged: (searchTextInput: string) => {
      dispatch({
        type: 'CONNOTE_SEARCH_TEXT_INPUT_CHANGED',
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
        type: 'GET_CONNOTE_LIST_REQUESTED',
        search,
        limit,
        sortByColumn,
        sortOrderType,
        page,
        nodeID,
      });
    },
    bagConnoteRequested: (connoteNumber: string, nodeID: number) => {
      dispatch({
        type: 'BAG_CONNOTE_REQUESTED',
        connoteNumber,
        nodeID,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnoteList);
