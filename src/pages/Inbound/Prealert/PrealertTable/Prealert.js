import React from 'react';
import {Route, Link} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import ToolTip from 'material-ui/Tooltip';
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
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid/Grid';
import IconButton from 'material-ui/IconButton';
import EnhancedInboundTableHead from './extComps/tableHead';
import {Button, Chip} from 'material-ui';
import {Add} from 'material-ui-icons';
import {makeBreadcrumbs} from '../../reusableFunc';
import UserLinearProgress from '../../UserLinearprogress';

import {styles} from '../../css';

const columnscell = ["Type", "From", "Menifest No.", "# Menifest", "# Bag", "Weight (Kg)", "Vehcile No", "Driver", "ETA", "ETD", "Landed", "Arrived"];

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
  table: {
    maxWidth: 200,
  },
});

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
      "data":[
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
           "landed": "",
           "arrived": "",
        },
        {
           "type": "Road",
           "from":"Bandung (BDO)",
           "menifest_no":"#12345678",
           "menifest":"10",
           "bag":"100",
           "weight_kg":"1200",
           "vehcile_no":"D 123 JNE",
           "driver": "Fidel",
           "eta": "09:00",
           "etd": "13:00",
           "landed": "",
           "arrived": "",
        },
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
           "landed": "",
           "arrived": "",
        },
        {
           "type": "Road",
           "from":"Bandung (BDO)",
           "menifest_no":"#12345678",
           "menifest":"10",
           "bag":"100",
           "weight_kg":"1200",
           "vehcile_no":"D 123 JNE",
           "driver": "Fidel",
           "eta": "09:00",
           "etd": "13:00",
           "landed": "",
           "arrived": "",
        },
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
           "landed": "",
           "arrived": "",
        },
        {
           "type": "Road",
           "from":"Bandung (BDO)",
           "menifest_no":"#12345678",
           "menifest":"10",
           "bag":"100",
           "weight_kg":"1200",
           "vehcile_no":"D 123 JNE",
           "driver": "Fidel",
           "eta": "09:00",
           "etd": "13:00",
           "landed": "",
           "arrived": "",
        },
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
           "landed": "",
           "arrived": "",
        }
      ]
    };

  }

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: event.target.value});
  };

  render() {

    const {classes, match, location} = this.props;
    const {data, irregularitydata, order, orderBy, selected, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const breadCrumbs = makeBreadcrumbs(location);
    const {url} = match;

    let prealertcelldata = [];

    {data.length > 0 &&
                      data.map((prealert, index) => {
      prealertcelldata.push([prealert.type, prealert.from, prealert.menifest_no, prealert.menifest, prealert.bag, prealert.weight_kg, prealert.vehcile_no, prealert.driver, prealert.eta, prealert.etd, prealert.landed, prealert.arrived]);
    })}

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
          <Grid container>
            <Grid md={12} item xs={12}>
              <Paper className={classes.formWrapper}>
                <div style={excellexportbt}>
                  <ExcelExportBtn
                    columnList={columnscell}
                    data={prealertcelldata}
                    filename="prealert_inbound_list.xlsx"
                    orgName="JNT"
                    title="pre-alert inbound list"
                  />
                </div>
                <Typography type="headline"><strong>Pre-alert Inbound List</strong></Typography>
                <br/>
                <div className={classes.tableWrapper}>
                  {data.length === 0 && <UserLinearProgress />}
                  <Table className={classes.table}>
                    <EnhancedInboundTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onSort={this.handleSort}
                      rowCount={data.length}
                    />
                    <TableBody>
                      {data
                        .sort(
                          (a, b) =>
                            a.menifest_no < b.menifest_no ? -1 : 1,
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
                              key={n.menifest_no}
                            >
                              <TableCell padding="none">{n.type}</TableCell>
                              <TableCell>{n.from}</TableCell>
                              <TableCell>
                                <Button
                                    variant="flat"
                                    dense="false"
                                    color="primary"
                                    component={Link}
                                    to={`${match.url}/edit/${n.menifest_no}`}
                                  >
                                    Edit
                                </Button>
                              </TableCell>
                              <TableCell numeric>{n.menifest}</TableCell>
                              <TableCell numeric>{n.bag}</TableCell>
                              <TableCell>{n.weight_kg}</TableCell>
                              <TableCell>{n.vehcile_no}</TableCell>
                              <TableCell>{n.driver}</TableCell>                              
                              <TableCell>{n.eta}</TableCell>
                              <TableCell>{n.etd}</TableCell>
                              <TableCell>{n.landed}</TableCell>
                              <TableCell>{n.arrived}</TableCell>
                              <TableCell>
                                <Button
                                  variant="flat"
                                  dense="true"
                                  color="primary"
                                  component={Link}
                                  to={`${match.url}/edit/${n.menifest_no}`}
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

InboundPrealert.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InboundPrealert);
