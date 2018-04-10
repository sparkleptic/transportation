import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Route} from 'react-router-dom';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid/Grid';
import {Button, Chip} from 'material-ui';
import UserLinearprogress from '../../UserLinearprogress';
import EnhancedTableHead from './extComps/tableHead';
import BaseTabForm from './form';
import EnhancedTableToolbar from './extComps/tableToolbar';
import axios from 'axios';

const styles = (theme) => ({
  pageTitle: {
    // marginBottom: '10%'
  },
  breadCrumbs: {
    float: 'left',
    color: '#323990',
    fontSize: 14,
  },
  transactionBreadcrumbs: {
    color: 'black',
    margin: 0,
    fontSize: 14,
  },
  titleWrapper: {
    fontSize: window.innerWidth >= 1024 ? 26 : 15,
    fontWeight: 'bold',
    marginTop: window.innerWidth >= 1024 ? 0 : 2,
    marginBottom: 0,
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  chips: {
    backgroundColor: '#61d47b',
    color: '#fafafa',
    fontWeight: 600,
  },
});
// const BASE_API = 'http://192.168.0.111/core_laravel/public/api/'
const BASE_API = 'http://coreapi.skyware.systems/api/';
let index = 0;
function createData(
  Origin,
  Destination,
  Service,
  Tariff,
  MinWeight,
  MaxWeight,
  Status,
  editBtn,
) {
  index += 1;
  return {
    index,
    Origin,
    Destination,
    Service,
    Tariff,
    MinWeight,
    MaxWeight,
    Status,
    editBtn,
  };
}

class EnhancedUserTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
    };
    this.getBasetariffList = this.getBasetariffList.bind(this);
  }

  getBasetariffList = () => {
    axios.get(`${BASE_API}tarif`).then((response) => {
      const {data} = response.data;
      return this.setState({data});
    });
  };

  componentDidMount() {
    this.getBasetariffList();
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({data, order, orderBy});
  };

  handleSelectAllClick = (event, checked) => {
    const {data} = this.state;
    if (checked) {
      this.setState({selected: data.length > 0 && data.map((n) => n.id)});
      return;
    }
    this.setState({selected: []});
  };

  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected: newSelected});
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: event.target.value});
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    const {classes, match, location} = this.props;
    const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <div className={classes.root}>
        <Grid md={12} item>
          {location.pathname !== '/settings/tariff/new-base-tariff' ? (
            <div>
              <EnhancedTableToolbar numSelected={selected.length} {...match} />
              <div className={classes.tableWrapper}>
                {data.length === 0 && <UserLinearprogress />}
                <Table className={classes.table}>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={this.handleSelectAllClick}
                    onRequestSort={this.handleRequestSort}
                    rowCount={data.length}
                  />

                  <TableBody>
                    {data.length > 0 &&
                      data
                        .sort((a, b) => (a.id < b.id ? -1 : 1))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((n) => {
                          const isSelected = this.isSelected(n.Origin);
                          return (
                            <TableRow
                              hover
                              aria-checked={isSelected}
                              tabIndex={-1}
                              key={n.id}
                              selected={isSelected}
                            >
                              <TableCell>{n.id}</TableCell>
                              <TableCell>{n.origin}</TableCell>
                              <TableCell>{n.destination}</TableCell>
                              <TableCell>{n.service_code}</TableCell>
                              <TableCell>Rp&nbsp;&nbsp;{n.price_1}</TableCell>
                              <TableCell>{n.min_weight} Kg</TableCell>
                              <TableCell>{n.max_weight} Kg</TableCell>
                              <TableCell numeric>
                                <Chip
                                  label={
                                    n.active >= 1 ? 'Active' : 'Not Active'
                                  }
                                  classes={{root: classes.chips}}
                                />
                              </TableCell>
                              <TableCell>
                                <Button dense="true" color="primary">
                                  Edit
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    {emptyRows > 0 && (
                      <TableRow style={{height: 49 * emptyRows}}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={
                          data.length > 0 && data.length < 25
                            ? [5, 10]
                            : [5, 10, 25]
                        }
                        page={page}
                        backIconButtonProps={{
                          'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                          'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          ) : (
            <BaseTabForm />
          )}
        </Grid>
      </div>
    );
  }
}

EnhancedUserTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedUserTable);
