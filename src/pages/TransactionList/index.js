import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import ExcelExportBtn from '../../components/ExcelExportBtn';
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
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import Grid from 'material-ui/Grid/Grid';
import Button from 'material-ui/Button/Button';
import {Add} from 'material-ui-icons';
import {getEntityList} from '../../actions/entity';
import {styles} from '../css';
import UserLinearprogress from '../UserLinearprogress';
const columnData = [
  {
    id: 'transaction',
    numeric: false,
    disablePadding: true,
    label: 'Transaction #',
  },
  {
    id: 'from_name',
    numeric: false,
    disablePadding: true,
    label: 'Customer Name',
  },
  {
    id: 'total_amount',
    numeric: false,
    disablePadding: true,
    label: 'Total Amount',
  },
  {id: 'date', numeric: false, disablePadding: true, label: 'Date'},
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
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
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
  const {numSelected, classes} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography type="subheading">{numSelected} selected</Typography>
        ) : (
          <Typography type="title">Transactions List</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
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
      data: [],
      page: 1,
      rowsPerPage: 20,
      loading: true,
      per_page: 20,
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
  componentDidMount() {
    let userNodeId = null;
    if (sessionStorage.getItem('userNodeId') !== null) {
      userNodeId = JSON.parse(sessionStorage.getItem('userNodeId'));
    }
    this.state.data.length === 0 && this.getList('transaction', {n: userNodeId});
  }
  getList = (entity, data) => {
    this.setState({loading: true});
    return getEntityList(entity, data).then((response) => {
      const {data, total, per_page} = response.data;
      return this.setState({page: 0, data, loading: false, total, per_page});
    });
  };
  handleClick = (event, id) => {
    this.props.history.push(`/sales/connote/${id}`);
  };

  handleChangePage = (event, page) => {
    const next = page * this.state.rowsPerPage + this.state.rowsPerPage;
    if (next > this.state.data.length) {
      this.setState({loading: true});
      getEntityList('transaction', {
        page: Math.floor(next / this.state.per_page) + 1,
        s: this.state.searchKey,
      }).then((response) => {
        const {data, total, per_page} = response.data;
        return this.setState({
          data: this.state.data.concat(data),
          loading: false,
          total,
          per_page,
        });
      });
    }

    this.setState({page});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({page: 0, rowsPerPage: event.target.value});
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    const {classes} = this.props;
    const {
      data,
      loading,
      total,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const start = page * rowsPerPage;
    const end = (page + 1) * rowsPerPage;

    let columnscell = [];
    let transdata = [];

    {columnData.map((columnvalue) => {
        columnscell.push(columnvalue.label);
     })}

    {data.length > 0 &&
                      data.map((transvalue, index) => {
      transdata.push([transvalue.transaction_number, transvalue.from_name, transvalue.total_tariff, transvalue.transaction_date]);
    })}

    // console.log('Start');
    // console.log(columnscell);
    // console.log(transdata);
    // console.log('End');

    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Sales /{' '}
              <span className={classes.transactionBreadcrumbs}>
                {' '}
                Transactions{' '}
              </span>
            </div>
            <Button
              component={Link}
              to="/new-transaction"
              style={{float: 'right', width: '10%'}}
              variant="raised"
              color="primary"
            >
              <Add />&nbsp;New
            </Button>
            <br />
            <p className={classes.titleWrapper}>Transactions</p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid md={12} item>
            <Paper className={classes.formWrapper}>
              <div style={excellexportbt}>
                <ExcelExportBtn
                  columnList={columnscell}
                  data={transdata}
                  filename="transaction_list.xlsx"
                  orgName="JNT"
                  title="transaction list"
                />
              </div>
              <EnhancedTableToolbar numSelected={selected.length} />
              <div className={classes.tableWrapper}>
                {loading && <UserLinearprogress />}
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
                      data.slice(start, end).map((n, index) => {
                        return (
                          <TableRow
                            hover
                            onClick={(event) =>
                              this.handleClick(event, n.transaction_id)
                            }
                            tabIndex={-1}
                            key={index}
                          >
                            <TableCell padding="none">
                              {n.transaction_number}
                            </TableCell>
                            <TableCell padding="none">{n.from_name}</TableCell>
                            <TableCell padding="none">
                              Rp. {n.total_tariff}
                            </TableCell>
                            <TableCell padding="none">
                              {n.transaction_date}
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
                        count={total ? total : data.length}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 20]}
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

const excellexportbt = {
  display: 'block',
  textAlign: 'right'
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
