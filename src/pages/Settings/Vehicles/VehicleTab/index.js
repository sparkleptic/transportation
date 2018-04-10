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
import Grid from 'material-ui/Grid/Grid';
import {Button, Chip} from 'material-ui';
import {LocationOn} from 'material-ui-icons';
import UserLinearprogress from '../../UserLinearprogress';
import EnhancedTableHead from './extComps/tableHead';
import EnhancedTableToolbar from './extComps/tableToolbar';
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

class EnhancedVehicleTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      page: 0,
      rowsPerPage: 5,
    };
  }
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.props.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.props.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({data, order, orderBy});
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({selected: this.props.data.map((n) => n.id)});
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
    const {classes, data, match, location} = this.props;
    const {order, orderBy, selected, rowsPerPage, page} = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div className={classes.root}>
        <Grid md={12} item>
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((n, index) => {
                      const isSelected = this.isSelected(n.vehicle_id);
                      return (
                        <TableRow
                          hover
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.vehicle_id}
                          selected={isSelected}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{n.type && n.type.type_name}</TableCell>
                          <TableCell>{n.Name}</TableCell>
                          <TableCell>{n.police_no}</TableCell>
                          <TableCell>
                            {n.max_weight ? n.max_weight : 'No Data'}
                          </TableCell>
                          <TableCell>
                            {n.max_volume ? n.max_volume : 'No Data'}
                          </TableCell>
                          <TableCell>
                            {n.expiry_date ? n.expiry_date : 'No Data'}
                          </TableCell>
                          <TableCell>
                            <LocationOn />
                          </TableCell>
                          <TableCell numeric>
                            <Chip
                              label={n.vehicle_status}
                              classes={{root: classes.chips}}
                            />
                          </TableCell>
                          <TableCell>
                            <Button variant="raised" dense="true" color="primary">
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
                      data.length < 25 ? [5, 10] : [5, 10, 25]
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
        </Grid>
      </div>
    );
  }
}

EnhancedVehicleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedVehicleTable);
