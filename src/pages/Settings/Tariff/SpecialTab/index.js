import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
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
import EnhancedTableHead from './extComps/tableHead';
import EnhancedTableToolbar from './extComps/tableToolbar';
import UserLinearprogress from '../../UserLinearprogress';
import {Info} from 'material-ui-icons';
import axios from 'axios';
import Icon from 'material-ui/Icon/Icon';
import SpecialTabForm from './form';
// import { lighten } from 'material-ui/styles/colorManipulator';

const BASE_API = 'http://coreapi.skyware.system/api/';
// const BASE_API = 'http://192.168.0.111/core_laravel/public/api/'
// const BASE_API = 'http://coreapi.jne.co.id/api/'
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
  icon: {
    marginTop: 10,
    marginLeft: 15,
  },
});

let index = 0;
function createData(Name, EffectiveDateFrom, EffectiveDateTo, Status, editBtn) {
  index += 1;
  return {index, Name, EffectiveDateFrom, EffectiveDateTo, Status, editBtn};
}

class SpecialTab extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'status',
      selected: [],
      data: [
        createData(
          'HARBOLNAS',
          '21/12/2016 00:00',
          '21/12/2016 00:00',
          'Active',
        ),
        createData(
          'HARBOLNAS',
          '21/12/2016 00:00',
          '21/12/2016 00:00',
          'Active',
        ),
        createData(
          'HARBOLNAS',
          '21/12/2016 00:00',
          '21/12/2016 00:00',
          'Active',
        ),
        createData(
          'HARBOLNAS',
          '21/12/2016 00:00',
          '21/12/2016 00:00',
          'Active',
        ),
        createData(
          'HARBOLNAS',
          '21/12/2016 00:00',
          '21/12/2016 00:00',
          'Active',
        ),
        createData(
          'HARBOLNAS',
          '21/12/2016 00:00',
          '21/12/2016 00:00',
          'Active',
        ),
      ],
      page: 0,
      rowsPerPage: 5,
    };
  }

  // getUserRoleList = () => {
  //     let dataUserRoles
  //     return axios.get(`${BASE_API}users`)
  //         .then(response => {
  //             const { data } = response.data
  //             return dataUserRoles = data.map(item => item.usergroup.role)
  //         })
  //         .then(response => {
  //
  //             return this.setState({ data: dataUserRoles })
  //         })
  // }

  componentDidMount() {
    // this.getUserRoleList()
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
    if (checked) {
      this.setState({selected: this.state.data.map((n) => n.id)});
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
          {location.pathname !== '/settings/tariff/new-special-tariff' &&
          match.isExact ? (
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
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((n, index) => {
                          const isSelected = this.isSelected(index + 1);
                          return (
                            <TableRow
                              hover
                              aria-checked={isSelected}
                              tabIndex={-1}
                              key={index}
                              selected={isSelected}
                            >
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{n.Name}</TableCell>
                              <TableCell>{n.EffectiveDateFrom}</TableCell>
                              <TableCell>
                                {n.EffectiveDateTo}
                                <Icon
                                  color="primary"
                                  classes={{root: classes.icon}}
                                >
                                  <Info />
                                </Icon>
                              </TableCell>
                              <TableCell numeric>
                                <Chip
                                  label={n.Status}
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
            <SpecialTabForm />
          )}
        </Grid>
      </div>
    );
  }
}

SpecialTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpecialTab);
