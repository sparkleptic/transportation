// @flow

import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import {
  Typography,
  Button,
  Table,
  TableCell,
  TableRow,
  Icon,
  TextField,
} from 'material-ui';
import {View, StyleSheet} from 'react-native';

import {
  TableHead,
  TableBody,
  TableTitle,
  TableFooter,
} from '../../../components/Table';
import Form from '../../../components/core-ui/Form';
import {DEFAULT_ROWS_PER_PAGE} from '../../../components/Table/TableFooter';
import MasterDetailTable, {
  type TableSettings,
} from './components/MasterDetailTable';
import {
  unbagBagOnlyMasterColumnList,
  unbagBagOnlyDetailColumnList,
} from './constants';

import type {BagMaster} from '../../../data/inventoryUnbagging/InventoryUnbagging-type';

type Props = {
  data: Array<BagMaster>,
  total: number,
  isLoading: boolean,
  activeNode: number,
  unbaggedCount: number,
  unbaggedDetailCount: Map<string, number>,
  fetchMasterData: (
    rowsPerPage: number,
    activeSortColumn: string,
    activeSortType: SortType,
    activePage: number,
    nodeID: number,
  ) => void,
  onTextFieldSubmit: (
    bagNumber: string,
    nodeID: number,
    tableSettings: {
      limit: number,
      sortByColumn: string,
      sortOrderType: SortType,
      page: number,
    },
  ) => void,
  resetData: () => void,
};

type State = {
  textFieldInput: string,
  tableSettings: TableSettings,
};

export default class UnbaggingBagOnlyScene extends React.Component<
  Props,
  State,
> {
  state = {
    textFieldInput: '',
    tableSettings: {
      rowsPerPage: DEFAULT_ROWS_PER_PAGE,
      activePage: 1,
      activeSortColumn: '',
      activeSortType: 'asc',
    },
  };
  componentDidMount() {
    let {fetchMasterData, activeNode} = this.props;
    if (activeNode) {
      let {
        tableSettings: {
          rowsPerPage,
          activePage,
          activeSortColumn,
          activeSortType,
        },
      } = this.state;
      fetchMasterData(
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage,
        activeNode,
      );
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    let oldProps = this.props;

    if (
      !oldProps.activeNode &&
      nextProps.activeNode &&
      oldProps.activeNode !== nextProps.activeNode
    ) {
      let {
        tableSettings: {
          rowsPerPage,
          activePage,
          activeSortColumn,
          activeSortType,
        },
      } = this.state;
      nextProps.fetchMasterData(
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage,
        nextProps.activeNode,
      );
    }
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    let {
      data,
      total,
      activeNode,
      fetchMasterData,
      onTextFieldSubmit,
      unbaggedCount,
      unbaggedDetailCount,
      isLoading,
    } = this.props;
    let {textFieldInput, tableSettings} = this.state;

    return (
      <View style={styles.root}>
        <View style={styles.textFieldContainer}>
          <Form onSubmit={this._onFormSubmit}>
            <TextField
              id="scan"
              label="Masukkan kode BAG / Connote"
              type="search"
              value={textFieldInput}
              onChange={(event) => {
                this._onTextFieldInputChanged(event.target.value);
              }}
              style={StyleSheet.flatten(styles.textField)}
            />
            <Button
              variant="raised"
              color="primary"
              onClick={this._onFormSubmit}
            >
              Add
            </Button>
          </Form>
        </View>
        <View style={{flex: 1}}>
          <MasterDetailTable
            data={data}
            tableSettings={tableSettings}
            total={total}
            defaultRowsPerPage={DEFAULT_ROWS_PER_PAGE}
            masterTableColumnList={unbagBagOnlyMasterColumnList}
            detailTableColumnList={unbagBagOnlyDetailColumnList}
            unbaggedCount={unbaggedCount}
            unbaggedDetailCount={unbaggedDetailCount}
            onMasterTableSettingChanged={(changedSettings: TableSettings) => {
              let {
                rowsPerPage,
                activeSortColumn,
                activeSortType,
                activePage,
              } = changedSettings;
              fetchMasterData(
                rowsPerPage,
                activeSortColumn,
                activeSortType,
                activePage,
                activeNode,
              );
              this.setState({
                tableSettings: {
                  ...changedSettings,
                },
              });
            }}
            isLoading={isLoading}
          />
        </View>
        <View style={styles.footer}>
          <Route>
            {({history}) => {
              return (
                <Button
                  onClick={() => {
                    history.goBack();
                  }}
                  variant="raised"
                  color="primary"
                >
                  BACK
                </Button>
              );
            }}
          </Route>
        </View>
      </View>
    );
  }

  _onTextFieldInputChanged = (textFieldInput: string) => {
    this.setState({textFieldInput});
  };

  _onFormSubmit = () => {
    let {textFieldInput, tableSettings} = this.state;
    if (textFieldInput) {
      let {onTextFieldSubmit, activeNode} = this.props;
      let {
        rowsPerPage,
        activeSortColumn,
        activeSortType,
        activePage,
      } = tableSettings;
      onTextFieldSubmit(textFieldInput, activeNode, {
        limit: rowsPerPage,
        sortByColumn: activeSortColumn,
        sortOrderType: activeSortType,
        page: activePage,
      });
      this.setState({textFieldInput: ''});
    }
  };
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 30,
    height: '100%',
  },
  textFieldContainer: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  textField: {
    width: 350,
    marginRight: 10,
  },
  footer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});
