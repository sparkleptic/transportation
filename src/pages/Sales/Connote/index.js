import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
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
import {Button, Chip} from 'material-ui';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import FilterListIcon from 'material-ui-icons/FilterList';
import Grid from 'material-ui/Grid/Grid';
import {getEntityList} from '../../../actions/entity';
import {styles} from '../../css';
import SearchField from '../../Searchfield';

const columnData = [
  {id: 'connote_id', numeric: false, disablePadding: true, label: 'Connote #'},
  {id: 'from_name', numeric: false, disablePadding: true, label: 'From'},
  {id: 'to_name', numeric: false, disablePadding: true, label: 'To'},
  {id: 'service_code', numeric: false, disablePadding: true, label: 'Service'},
  {id: 'origin_code', numeric: false, disablePadding: true, label: 'Origin'},
  {
    id: 'destination_code',
    numeric: false,
    disablePadding: true,
    label: 'Destination',
  },
  {id: 'transaction_date', numeric: false, disablePadding: true, label: 'Date'},
  {id: 'due_date', numeric: false, disablePadding: true, label: 'Due Date'},
  {
    id: 'transaction_type',
    numeric: false,
    disablePadding: true,
    label: 'Amount',
  },
  {
    id: 'transation_status',
    numeric: false,
    disablePadding: true,
    label: 'Status',
  },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {order, orderBy} = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnData.map((column) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                {column.label}
              </TableCell>
            );
          }, this)}
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: 2,
    paddingLeft: 0,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.dark,
          //   backgroundColor: lighten(theme.palette.secondary.light, 0.4),
        }
      : {
          //   color: lighten(theme.palette.secondary.light, 0.4),
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = (props) => {
  const {numSelected, classes, handleChange} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {' '}
        <Typography type="title">Connote List</Typography>{' '}
      </div>
      <div className={classes.spacer} />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'total_connote',
      selected: [],
      connotes: [],
      page: 0,
      transaction_number: '...',
      transaction_date: '',
      rowsPerPage: 5,
    };
  }

  componentDidMount() {
    getEntityList(`transaction/${this.props.match.params.id}`, null).then(
      (response) => {
        const {data} = response.data;
        return this.setState({...data});
      },
    );
  }
  handleClick = (event, id) => {
    /**
     * enable tansaction view mode
     */
    this.props.history.push(`/sales/transaction/${id}`);
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: event.target.value});
  };

  render() {
    const {classes, match} = this.props;
    const {
      connotes,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      transaction_number,
      transaction_date,
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, connotes.length - page * rowsPerPage);
    //
    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Sales /{' '}
              <span className={classes.transactionBreadcrumbs}>
                {' '}
                Transactions / {transaction_number}
              </span>
            </div>
            <br />
            <p className={classes.titleWrapper}>{transaction_number}</p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid md={12} item>
            <Paper className={classes.formWrapper}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={this.handleSelectAllClick}
                    onRequestSort={this.handleRequestSort}
                    rowCount={connotes.length}
                  />
                  <TableBody>
                    {connotes
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((n, index) => {
                        return (
                          <TableRow tabIndex={-1} key={index}>
                            <TableCell padding="none">
                              {n.connote_number}
                            </TableCell>
                            <TableCell padding="none">{n.from_name}</TableCell>
                            <TableCell padding="none">{n.to_name}</TableCell>
                            <TableCell padding="none">
                              {n.service_code}
                            </TableCell>
                            <TableCell padding="none">
                              {n.from_tariff_code}
                            </TableCell>
                            <TableCell padding="none">
                              {n.to_tariff_code}
                            </TableCell>
                            <TableCell padding="none">
                              {transaction_date}
                            </TableCell>
                            <TableCell padding="none">{n.sla_date}</TableCell>
                            <TableCell padding="none">
                              {n.amount_price}
                            </TableCell>
                            <TableCell padding="none">
                              <Chip
                                label={n.status}
                                classes={{root: classes.chips}}
                              />
                            </TableCell>
                            <TableCell padding="none">
                              <Button onClick={(event) => this.handleClick(event, n.transaction_id)} variant="raised" dense="true" color="primary">
                                View
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
                        count={connotes.length}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={
                          connotes.length < 25 ? [5, 10] : [5, 10, 25]
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
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
