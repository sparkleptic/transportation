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
import UserLinearprogress from '../../UserLinearprogress';
import EnhancedTableHead from './extComps/tableHead';
import EnhancedTableToolbar from './extComps/tableToolbar';
import NodeTabForm from './form';
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

let index = 0;
function createData(Code, Name, Address, Phone, PIC, Remark, Status, editBtn) {
  index += 1;
  return {index, Code, Name, Address, Phone, PIC, Remark, Status, editBtn};
}

class EnhancedUserTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      order: 'asc',
      orderBy: 'node_id',
      selected: [],
      page: 0,
      rowsPerPage: 5,
    };
    this.handleRequestSort = this.handleRequestSort.bind(this);
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

    this.setState({order, orderBy});
  };

  handleSelectAllClick = (event, checked) => {
    const {data} = this.props;
    if (checked) {
      this.setState({selected: data.length > 0 && data.map((n) => n.node_id)});
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
    const {classes, location, match, data} = this.props;
    const {order, orderBy, selected, rowsPerPage, page} = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <div className={classes.root}>
        <Grid md={12} item>
          {location.pathname !== '/settings/nodes/new-node' ? (
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
                        .sort((a, b) => (a.node_id < b.node_id ? -1 : 1))
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((n) => {
                          const isSelected = this.isSelected(n.node_id);
                          return (
                            <TableRow
                              hover
                              aria-checked={isSelected}
                              tabIndex={-1}
                              key={n.node_id}
                              selected={isSelected}
                            >
                              <TableCell>{n.node_id}</TableCell>
                              <TableCell>{n.node_code}</TableCell>
                              <TableCell>{n.node_name}</TableCell>
                              <TableCell>
                                {!n.node_address
                                  ? 'No Data'
                                  : n.node_address || n.address}
                              </TableCell>
                              <TableCell>
                                {!n.phone ? 'No Data' : n.phone}
                              </TableCell>
                              <TableCell>
                                {!n.agent_name ? 'No Data' : n.agent_name}
                              </TableCell>
                              <TableCell>
                                {!n.remark ? 'No Data' : n.remark}
                              </TableCell>
                              <TableCell numeric>
                                <Chip
                                  label={n.status}
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
            data.length > 0 && <NodeTabForm />
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
