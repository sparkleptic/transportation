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
  Chip,

} from 'material-ui';

import {View} from 'react-native';
import BlockUI from 'react-block-ui';

import {
  TableHead,
  TableBody,
  TableTitle,
  TableFooter,
} from '../../../../components/Table';

import {columnList} from './constants';

import type {Bag} from '../../../../data/bag/Bag-type';
import type {RootState, Dispatch} from '../../../../storeTypes';

type Props = {
  rowsPerPage: number,
  activePage: number,
  activeSortColumn: string,
  activeSortType: SortType,
  data: Array<Bag>,
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
  onSearchTextInputChanged: (searchTextInput: string) => void,
  onTableSettingChanged: ({[key: string]: any}) => void,
};

export class BagList extends React.Component<Props> {
  componentWillMount() {
    let {
      data,
      fetchData,
      searchTextInput,
      activeNode,
      rowsPerPage,
      activeSortColumn,
      activeSortType,
      activePage,
    } = this.props;
    //if (data.length === 0) {
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
      data,
      total,
      fetchData,
      activeNode,
      searchTextInput,
      onSearchTextInputChanged,
      rowsPerPage,
      activeSortColumn,
      activeSortType,
      activePage,
      onTableSettingChanged,
      isLoading,
    } = this.props;

    return (

      <BlockUI tag="div" blocking={isLoading}>
        <View style={{flex: 1}}>
          <TableTitle
            title="Bag List"
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
            columnList={columnList}
            data={data}
//<<<<<<< HEAD
            render={(datum, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{datum.bagNo}</TableCell>
                  <TableCell>{datum.bagDate}</TableCell>
                  <TableCell>{datum.qtyConnote}</TableCell>
                  <TableCell numeric style={{width: 50}}>
                    {datum.weight}
                  </TableCell>
                  <TableCell>{datum.origin}</TableCell>
                  <TableCell>{datum.destination}</TableCell>
                  <TableCell style={{maxWidth: 50}}>
                    {datum.consolidation ? (
                      <Icon style={{color: 'green', alignSelf: 'center'}}>
                        check_circle
                      </Icon>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="raised"
                      style={{backgroundColor: 'blue', color: 'white'}}
                      onClick={() => {}}
                    >
                      UNBAG
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }}
          />
          {/*<TableFooter
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
//=======
            //filename="bag.xlsx"
            //orgName="JNE"
//>>>>>>> origin/dev_mayur
          />*/}
        <Table key={data.length}>
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
                onTableSettingChanged({activeSortType, activeSortColumn});
              }}
            />
            <TableBody
              data={data}
              render={(datum, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{datum.bagNo}</TableCell>
                    <TableCell>{datum.bagDate}</TableCell>
                    <TableCell>{datum.connoteQty}</TableCell>
                    <TableCell numeric style={{width: 50}}>
                      {datum.weight}
                    </TableCell>
                    <TableCell>{datum.origin}</TableCell>
                    <TableCell>{datum.destination}</TableCell>
                  <TableCell style={{maxWidth: 50}}>
                      {datum.consolidation ? (
                        <Icon style={{color: 'green', alignSelf: 'center'}}>
                          check_circle
                        </Icon>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip label={
                            datum.status === 0 ? 'OPEN' :
                              (datum.status === 1 ? 'SEALED' :
                                (datum.status === 2 ? 'CLOSED' : '')
                              )
                          }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="raised"
                        style={{backgroundColor: 'blue', color: 'white'}}
                        onClick={() => {}}
                      >
                        UNBAG
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
  } = state.bag;
  return {
    data: list,
    nextPageUrl,
    prevPageUrl,
    total,
    isLoading,
    searchTextInput,
    activeNode: state.header.currentNode,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchData: (
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
    onSearchTextInputChanged: (searchTextInput: string) => {
      dispatch({
        type: 'BAG_SEARCH_TEXT_INPUT_CHANGED',
        searchTextInput,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BagList);
