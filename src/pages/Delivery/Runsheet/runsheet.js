import React from 'react';
import {Route, Link} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Toolbar from 'material-ui/Toolbar';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import {withStyles} from 'material-ui/styles';
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
import EnhancedDeliveryTableHead from './extComps/tableHead';
import {Button, Chip, TextField} from 'material-ui';
import {Add} from 'material-ui-icons';
import {makeBreadcrumbs} from '../../reusableFunc';
import UserLinearProgress from '../../UserLinearprogress';

import {styles} from '../../css';

const columnscell = ["Node", "Agent", "Address", "Driver", "Connote", "Bag", "Weight (Kg), Status"];
let colmndata = [
    {
       "node": "CGKXXXX",
       "agent_name":"Agent A",
       "address":"Jalan Meruya llir No. 88",
       "driver":"Dwi",
       "connote":"25",
       "bag":"3",
       "weight_kg":"75",
       "status": "active"
    },
    {
       "node": "CGTXXXX",
       "agent_name":"Agent B",
       "address":"Jalan Meruya llir No. 88",
       "driver":"Tito",
       "connote":"22",
       "bag":"3",
       "weight_kg":"82",
       "status": "active"
    },
    {
       "node": "CGYXXXX",
       "agent_name":"Agent C",
       "address":"Jalan Meruya llir No. 88",
       "driver":"Bayulisar",
       "connote":"45",
       "bag":"4",
       "weight_kg":"105",
       "status": "active"
    },
    {
       "node": "CGRXXXX",
       "agent_name":"Agent D",
       "address":"Jalan Meruya llir No. 88",
       "driver":"Wildan",
       "connote":"12",
       "bag":"2",
       "weight_kg":"32",
       "status": "active"
    },
    {
       "node": "CGEXXXX",
       "agent_name":"Agent E",
       "address":"Jalan Meruya llir No. 88",
       "driver":"Dicky",
       "connote":"30",
       "bag":"3",
       "weight_kg":"64",
       "status": "active"
    },
    {
       "node": "CGPXXXX",
       "agent_name":"Agent F",
       "address":"Jalan Meruya llir No. 88",
       "driver":"Dwi",
       "connote":"25",
       "bag":"3",
       "weight_kg":"75",
       "status": "active"
    },
    {
       "node": "CGWXXXX",
       "agent_name":"Agent G",
       "address":"Jalan Meruya llir No. 88",
       "driver":"Tito",
       "connote":"25",
       "bag":"3",
       "weight_kg":"82",
       "status": "active"
    },
    {
       "node": "CGOXXXX",
       "agent_name":"Agent H",
       "address":"Jalan Meruya llir No. 88",
       "driver":"Bayulisar",
       "connote":"25",
       "bag":"3",
       "weight_kg":"105",
       "status": "active"
    },
    {
       "node": "CGPXXXX",
       "agent_name":"Agent I",
       "address":"Jalan Meruya llir No. 88",
       "driver":"Wildan",
       "connote":"25",
       "bag":"3",
       "weight_kg":"88",
       "status": "active"
    },
    {
       "node": "CGLXXXX",
       "agent_name":"Agent J",
       "address":"Jalan Meruya llir No. 88",
       "driver":"Dicky",
       "connote":"25",
       "bag":"3",
       "weight_kg":"63",
       "status": "active"
    }
  ];

let delordercelldata = [];

{colmndata.length > 0 &&
                  colmndata.map((delorder, index) => {
  delordercelldata.push([delorder.node, delorder.agent_name, delorder.address, delorder.driver, delorder.connote, delorder.bag, delorder.weight_kg, delorder.status]);
})}

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
  const {numSelected, classes, value, handleSearch} = props;

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
          <Typography type="subheading"><strong>Delivery Order list</strong></Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <TextField
          id="search"
          label="Search..."
          type="search"
          onChange={handleSearch} 
          value={value}
        />
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
          data={delordercelldata}
          filename="delorder_list.xlsx"
          orgName="JNT"
          title="delivery order list"
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

class DeliveryOrder extends React.Component {
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
      filterData: colmndata
    };
    this.styles = {
      '.pie-chart-lines': {
        stroke: 'rgba(0, 0, 0, 1)',
        strokeWidth: 1
      },
      '.pie-chart-text': {
        fontSize: '10px',
        fill: 'white'
      }
    };

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
    this.setState({page});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: event.target.value});
  };

  handleSearch = event => {
    const {data} = this.state
    let filteredDatas = []
    filteredDatas = data.filter(e => {
        let mathesItems = Object.values(e)
        let retVal = true;
        mathesItems.forEach(e => {
            const regex = new RegExp(event.target.value, 'gi')
            if (typeof e == 'string')
                retVal = e.match(regex)
            else
                return false
        })
        return retVal;
    })
    this.setState({filterData: filteredDatas, searchValue: event.target.value})
  }

  render() {

    const {classes, match, location} = this.props;
    const {filterData, irregularitydata, order, orderBy, selected, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filterData.length - page * rowsPerPage);
    const breadCrumbs = makeBreadcrumbs(location);
    const {url} = match;

    return (
      <div>

        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Delivery /
              <span className={classes.transactionBreadcrumbs}> Delivery Order</span>
            </div>
            <Button
              style={{float: 'right', width: '8.5%'}}
              component={Link}
              to={`${url}/create`}
              variant="raised"
              color="primary"
            >
              <Add />&nbsp;New
            </Button>
            <br />
            <p className={classes.titleWrapper}>Delivery Order</p>
          </div>
        </div>
        
        <div className={classes.root}>
          <Grid container>
            <Grid md={12} item xs={12}>
              <Paper className={classes.formWrapper}>
                <EnhancedTableToolbar numSelected={selected.length} handleSearch={this.handleSearch} value={this.searchValue} />
                <div className={classes.tableWrapper}>
                  {filterData.length === 0 && <UserLinearProgress />}
                  <Table className={classes.table}>
                    <EnhancedDeliveryTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onSort={this.handleSort}
                      rowCount={filterData.length}
                    />
                    <TableBody>
                      {filterData
                        .sort(
                          (a, b) =>
                            a.node < b.node ? -1 : 1,
                        )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((n) => {
                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={n.node}
                            >
                              <TableCell padding="none">{n.node}</TableCell>
                              <TableCell padding="none">{n.agent_name}</TableCell>
                              <TableCell>{n.address}</TableCell>
                              <TableCell>{n.driver}</TableCell>
                              <TableCell>{n.connote}</TableCell>
                              <TableCell>{n.bag}</TableCell>
                              <TableCell>{n.weight_kg}</TableCell>
                              <TableCell>
                                <Chip label={n.status} />
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="flat"
                                  dense="true"
                                  color="primary"
                                  component={Link}
                                  to={`${match.url}/edit/${n.node}`}
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
                          count={filterData.length}
                          rowsPerPage={rowsPerPage}
                          rowsPerPageOptions={
                            filterData.length < 25 ? [5, 10] : [5, 10, 25]
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
          </Grid>
        </div>

      </div>
    );
  }
}

const divStyle = {
  textAlign: 'right',
  fontSize: 30,
  color: '#323990'
};

const excellexportbt = {
  display: 'block',
  textAlign: 'right'
}

DeliveryOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeliveryOrder);
