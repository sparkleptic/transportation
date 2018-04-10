import React from 'react';
import {Route, Link} from 'react-router-dom';
import classNames from 'classnames';
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
import {DatePicker} from 'material-ui-custom-datepicker';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import Grid from 'material-ui/Grid/Grid';
import EnhancedTableHead from './extComps/tableHead';
import {Button, Chip} from 'material-ui';
import {Add} from 'material-ui-icons';
import {makeBreadcrumbs} from '../../reusableFunc';
import UserLinearProgress from '../../UserLinearprogress';
import {getEntityList} from '../../../actions/entity';
import {styles} from '../../css';
import moment from 'moment';

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: 2,
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
        <Typography type="title">Pick Up Request List</Typography>
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
      orderBy: 'PickUpTime',
      selected: [],
      data: [],
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
    this.state.data.length === 0 && this.getList(this.props.entity);
  }
  getList = (entity, name) => {
    return getEntityList('pickup', null).then((response) => {
      const {data} = response.data;
      return this.setState({data});
    });
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
    const {url} = match;
    const breadCrumbs = makeBreadcrumbs(location);

    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Pickup /
              <span className={classes.transactionBreadcrumbs}> Request</span>
            </div>
            <br />
            <Button
              style={{float: 'right', width: '8.5%'}}
              component={Link}
              to={`${url}/create`}
              variant="raised"
              color="primary"
            >
              <Add />&nbsp;New
            </Button>
            <p className={classes.titleWrapper}>New Request</p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid md={12} item>
            <Paper className={classes.formWrapper}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <div className={classes.tableWrapper}>
                {data.length === 0 && <UserLinearProgress />}
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
                    {data
                      .sort(
                        (a, b) =>
                          a.pickup_request_id < b.pickup_request_id ? -1 : 1,
                      )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((n) => {
                        const isSelected = this.isSelected(n.pickup_request_id);
                        return (
                          <TableRow
                            hover
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.pickup_request_id}
                            selected={isSelected}
                          >
                            {/*<TableCell classes={{ root: classes.dateRow }}>{n.req_date}</TableCell>
                                                    <TableCell >{n.req_time}</TableCell>*/}
                            <TableCell padding="none">{n.req_name}</TableCell>
                            <TableCell padding="dense">
                              {n.req_address}
                            </TableCell>
                            <TableCell>{n.req_phone}</TableCell>
                            <TableCell style={{color: '#42a5f5'}}>
                              {n.req_name}
                            </TableCell>
                            <TableCell padding="none">
                              {moment(n.req_date).format('DD MMM, HH:mm')}
                            </TableCell>
                            <TableCell numeric>
                              Rp.{Number(0).toFixed(3)}
                            </TableCell>
                            <TableCell padding="none">
                              <Chip label={n.status} />
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="raised"
                                dense="true"
                                color="primary"
                                component={Link}
                                to={`${match.url}/edit/${n.pickup_request_id}`}
                              >
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
