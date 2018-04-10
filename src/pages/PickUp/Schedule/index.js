import React          from 'react';
import {Route, Link}  from 'react-router-dom';

import PropTypes      from 'prop-types';
import {withStyles}   from 'material-ui/styles';
import Table, {
  TableHead,  TableBody, TableFooter,
  TableRow, TableCell,
  TablePagination, TableSortLabel,
} from 'material-ui/Table';
// import {DatePicker} from 'material-ui-custom-datepicker';

import {
  Button, Chip, Checkbox, Paper,  IconButton, Tooltip,
  Delete as DeleteIcon, FilterList as FilterListIcon,
  Grid,                         }     from 'material-ui';

import {Add}              from 'material-ui-icons';
import {makeBreadcrumbs}  from '../../reusableFunc';
import {getEntityList} from '../../../actions/entity';
import {styles} from '../../css';
import moment from 'moment';

import { EnhancedTableToolbar, UserLinearProgress, EnhancedTableHead }   from './Components/'

require('./style.css');

//var jsonData = require('./Data/data.json');
//console.log(jsonData)

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order:      'asc',
      orderBy:    'name',
      selected:   [],
      data:       [],
      page:       0,
      rowsPerPage: 5,
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') { order = 'asc'; }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({data, order, orderBy});
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({selected: this.state.data.map((n) => n.name)});
      return;
    }
    this.setState({selected: []});
  };

  componentDidMount() {
    this.state.data.length === 0 && this.getList(this.props.entity);
  }
  
  getList = (entity, name) => {
    // return this.setState({ data: jsonData });
    return getEntityList('pickup_schedule', null).then((response) => {
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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const {url} = match;
    const breadCrumbs = makeBreadcrumbs(location);

    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Pickup /
              <span className={classes.transactionBreadcrumbs}> Schedule</span>
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
            <p className={classes.titleWrapper}>Schedule</p>
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
                      .sort( (a, b) => a.pickup_schedule_id < b.pickup_schedule_id ? -1 : 1, )
                      .slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage, )
                      .map((n) => {
                        const isSelected = this.isSelected(n.pickup_schedule_id);
                        const weekdays = _.map(n.time, 'schedule_day').join(',');

                        return (
                          <TableRow
                            hover
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.id}
                            selected={isSelected}
                          >
                            <TableCell paddingleft="20px">{ weekdays }</TableCell>
                            <TableCell style={{size:50}}>{n.sche_name}</TableCell>
                            <TableCell>{n.courier.first_name}</TableCell>
                            <TableCell padding="auto"><Chip label={n.courier.employement_status} /></TableCell>
                            <TableCell padding="auto">
                              <Button
                                className={classes.button}
                                // variant="raised"
                                dense="true"
                                color="primary"
                                component={Link}
                                to={`${match.url}/edit/${n.pickup_schedule_id}`}
                              >
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{height: 10 * emptyRows}}>
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
// export default getList
export default withStyles(styles)(EnhancedTable); 