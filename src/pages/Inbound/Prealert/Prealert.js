import React from 'react';
import {Route, Link} from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import Typography from 'material-ui/Typography';
import ExcelExportBtn from '../../../components/ExcelExportBtn';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid/Grid';
import IconButton from 'material-ui/IconButton';
import EnhancedInboundTableHead from './extComps/tableHead';
import {Button, Chip, TextField} from 'material-ui';
import {Add} from 'material-ui-icons';
import {makeBreadcrumbs} from '../../reusableFunc';
import UserLinearProgress from '../../UserLinearprogress';
// import fetch from "whatwg-fetch";

import {styles} from '../../css';

const columnscell = ["Type", "From", "Menifest No.", "# Menifest", "# Bag", "Weight (Kg)", "Vehcile No", "Driver", "ETA", "ETD", "Landed", "Arrived"];

let colmndata = [
      {
         "type": "Air",
         "from":"Medan (MES)",
         "menifest_no":"#12345678",
         "menifest":"5",
         "bag":"50",
         "weight_kg":"500",
         "vehcile_no":"GA123",
         "driver": "",
         "eta": "09:00",
         "etd": "11:00",
         "landed": "Test1",
         "arrived": "goal"
      },
      {
         "type": "Road",
         "from":"Bandung (BDO)",
         "menifest_no":"#12445678",
         "menifest":"10",
         "bag":"100",
         "weight_kg":"1200",
         "vehcile_no":"D 123 JNE",
         "driver": "Fidel",
         "eta": "09:00",
         "etd": "13:00",
         "landed": "",
         "arrived": "goal"
      },
      {
         "type": "Air",
         "from":"Medan (MES)",
         "menifest_no":"#12355678",
         "menifest":"5",
         "bag":"50",
         "weight_kg":"500",
         "vehcile_no":"GA123",
         "driver": "",
         "eta": "09:00",
         "etd": "11:00",
         "landed": "",
         "arrived": "air"
      },
      {
         "type": "Road",
         "from":"Bandung (BDO)",
         "menifest_no":"#12346678",
         "menifest":"10",
         "bag":"100",
         "weight_kg":"1200",
         "vehcile_no":"D 123 JNE",
         "driver": "Fidel",
         "eta": "09:00",
         "etd": "13:00",
         "landed": "",
         "arrived": "goal"
      },
      {
         "type": "Air",
         "from":"Medan (MES)",
         "menifest_no":"#12345778",
         "menifest":"5",
         "bag":"50",
         "weight_kg":"500",
         "vehcile_no":"GA123",
         "driver": "",
         "eta": "09:00",
         "etd": "11:00",
         "landed": "goal",
         "arrived": ""
      },
      {
         "type": "Road",
         "from":"Bandung (BDO)",
         "menifest_no":"#12345688",
         "menifest":"10",
         "bag":"100",
         "weight_kg":"1200",
         "vehcile_no":"D 123 JNE",
         "driver": "Fidel",
         "eta": "09:00",
         "etd": "13:00",
         "landed": "",
         "arrived": "goal"
      },
      {
         "type": "Air",
         "from":"Medan (MES)",
         "menifest_no":"#12335678",
         "menifest":"5",
         "bag":"50",
         "weight_kg":"500",
         "vehcile_no":"GA123",
         "driver": "",
         "eta": "09:00",
         "etd": "11:00",
         "landed": "",
         "arrived": ""
      }
    ];

let prealertcelldata = [];

  {colmndata.length > 0 &&
                    colmndata.map((prealert, index) => {
    prealertcelldata.push([prealert.type, prealert.from, prealert.menifest_no, prealert.menifest, prealert.bag, prealert.weight_kg, prealert.vehcile_no, prealert.driver, prealert.eta, prealert.etd, prealert.landed, prealert.arrived]);
  })}

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
  const {numSelected, classes, value, handleSearch, handleChange, match} = props;
  
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
          <Typography type="subheading"><strong>Pre-alert Inbound List</strong></Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Button
          variant="flat"
          dense="false"
          color="primary"
          component={Link}
          style={{width: '140px', marginRight: '120px'}}
          to={`${match.url}/edit/scan`}
        >
          Scan Here
        </Button>
      </div>
      <div className={classes.actions}>
        <form onSubmit={e => handleSearch(e)}>
          <TextField
            id="search"
            label="Search..."
            type="search"
            onChange={(e) => handleChange(e)}
            value={value}
          />
        </form>
      </div>
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
      <div className={classes.actions}>
        <ExcelExportBtn
          columnList={columnscell}
          data={prealertcelldata}
          filename="prealert_inbound_list.xlsx"
          orgName="JNT"
          title="pre-alert inbound list"
        />
      </div>
    </Toolbar>
  );

};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);


class InboundPrealert extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showToolTip: false,
      componentWidth: 300,
      order: 'asc',
      orderBy: 'PickUpTime',
      selected: [],
      page: 0,
      rowsPerPage: 5,
      searchValue: '',
      data: colmndata,
      filterData: colmndata,
      loading: false,
      errMsg: '',
    };

  }
  
  componentDidMount() {
    if (_.get(this.props, 'node.activeNode', 0) !== 0) {
      this.fetchData();
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.node, nextProps.node)) {
      if (_.get(nextProps, 'node.activeNode', 0) !== 0) {
        this.fetchData(nextProps);
      }
    }
  }
  
  fetchData(props = this.props) {
    if (this.state.loading) {
      return null;
    }
    this.setState({
      loading: true,
      errMsg: '',
    });
    let url = `http://coreapi.skyware.systems/api/inbound/prealert?n=${_.get(props, 'node.activeNode', 0)}&l=${this.state.rowsPerPage}`;
    if (this.state.searchValue !== '') {
      url = `http://coreapi.skyware.systems/api/inbound/prealert?n=${_.get(props, 'node.activeNode', 0)}&l=${this.state.rowsPerPage}&s=${this.state.searchValue}`;
    }
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json(),
    ).then((data) => {
        this.setState({
          data,
          loading: false,
          searchValue: '',
        });
      },
    ).catch((err) => {
      this.setState({
        loading: false,
        errMsg: 'There was an error fetching data.',
        searchValue: '',
      });
      console.log(err);
    });
  }

  handleSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const filterData =
      order === 'desc'
        ? this.state.filterData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.filterData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({filterData, order, orderBy});
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({selected: this.state.filterData.map((n) => n.id)});
      return;
    }
    this.setState({selected: []});
  };

  handleChangePage = (event, page) => {
    if (page > this.state.page) {
      this.loadPaginatedResults(_.get(this.state.data, 'next_page_url', ''), page);
    }
    else if (page < this.state.page) {
      this.loadPaginatedResults(_.get(this.state.data, 'prev_page_url', ''), page);
    }
  };
  
  loadPaginatedResults = (url, page) => {
    this.setState({
      loading: true,
      errMsg: '',
    });
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json(),
    ).then((data) => {
        this.setState({
          data,
          loading: false,
          searchValue: '',
          page,
        });
      },
    ).catch((err) => {
      this.setState({
        loading: false,
        errMsg: 'There was an error fetching data.',
        searchValue: '',
      });
      console.log(err);
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: event.target.value}, () => this.fetchData());
  };
  handleChange = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.setState({
      searchValue: event.target.value,
    });
  };
  handleSearch = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.setState({
      data: {},
    });
    this.fetchData();
  };

  render() {

    const {classes, match, location} = this.props;
    const {filterData, irregularitydata, order, orderBy, selected, rowsPerPage, page, data} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filterData.length - page * rowsPerPage);
    const breadCrumbs = makeBreadcrumbs(location);
    const {url} = match;
    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Inbound /
              <span className={classes.transactionBreadcrumbs}> Pre-alert Inbound</span>
            </div>
            <br />
            <p className={classes.titleWrapper}>Pre-alert Inbound</p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={9}>
              <Paper className={classes.formWrapper}>
                <EnhancedTableToolbar numSelected={selected.length} handleSearch={(e) => this.handleSearch(e)} value={this.state.searchValue}  handleChange={(e) => this.handleChange(e)} match={match}/>
                <div className={classes.tableWrapper}>
                  {this.state.loading && <UserLinearProgress />}
                  <Table className={classes.table}>
                    <EnhancedInboundTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onSort={this.handleSort}
                      rowCount={filterData.length}
                    />
                    <TableBody>
                      {
                        _.map(_.get(data, 'data', []), (n, key) => {
                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={key}
                            >
                              <TableCell padding="none">{_.get(n, 'manifest_type.manifest_type_name', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'from.node_name', '')}</TableCell>
                              <TableCell padding="none">
                                <Button
                                  variant="flat"
                                  dense="false"
                                  color="primary"
                                  component={Link}
                                  style={{color: '#42a5f5'}}
                                  to={`${match.url}/edit/${_.get(n, 'manifest_no', 0)}`}
                                >
                                  {_.get(n, 'manifest_no', 0)}
                                </Button>
                              </TableCell>
                              <TableCell padding="none">{_.get(n, 'manifest_id', 0)}</TableCell>
                              <TableCell padding="none">{_.get(n, 'bag_count', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'weight_kg', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'police_no', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'driver_name', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'eta', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'etd', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'landed', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'arrived', '')}</TableCell>
                              <TableCell padding="none">
                                <Button
                                  variant="flat"
                                  dense="true"
                                  color="primary"
                                  component={Link}
                                  to={`${match.url}/edit/${_.get(n, 'manifest_no', 0)}`}
                                >
                                  Edit
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      }
                      {(!this.state.loading && _.isEmpty(_.get(this.state.data, 'data', [])) && this.state.errMsg === '') && (
                        <TableRow style={{height: 49 * emptyRows}}>
                          <TableCell colSpan={12} style={{textAlign: 'center', padding: '15px'}}>No results found.</TableCell>
                        </TableRow>
                      )}
                      {(!this.state.loading && this.state.errMsg !== '') && (
                        <TableRow style={{height: 49 * emptyRows}}>
                          <TableCell colSpan={12} style={{textAlign: 'center', padding: '15px'}}>{this.state.errMsg}</TableCell>
                        </TableRow>
                      )}
                      {(this.state.loading && _.isEmpty(_.get(this.state.data, 'data', []))) && (
                        <TableRow style={{height: 49 * emptyRows}}>
                          <TableCell colSpan={12} style={{textAlign: 'center', padding: '15px'}}>Loading Results...</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                    {
                      (_.get(data, 'total', 0) !== 0) &&
                      (
                        <TableFooter>
                          <TableRow>
                            <TablePagination
                              count={data.total}
                              rowsPerPage={rowsPerPage}
                              rowsPerPageOptions={
                                data.total < 25 ? [5, 10] : [5, 10, 25]
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
                      )
                    }
                  </Table>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>

      </div>
    );
  }
}

const divStyle = {
  textAlign: 'right',
  fontSize: 30,
  color: '#323990',
};

const excellexportbt = {
  display: 'block',
  textAlign: 'right',
};

InboundPrealert.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    node: state.node,
  };
}
export default connect(mapStateToProps)(withStyles(styles)(InboundPrealert));
