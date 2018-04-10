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
import EnhancedIregularityTableHead from './extComps/tableHeadiregularity';
import {Button} from 'material-ui';
import {makeBreadcrumbs} from '../../reusableFunc';
import {Train,FlightTakeoff} from 'material-ui-icons';

import { PieChart, Pie, ResponsiveContainer, Sector, Label, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot,
  XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList } from 'recharts';

import {LineChart} from 'react-easy-chart';
import UserLinearProgress from '../../UserLinearprogress';
import {getEntityList} from '../../../actions/entity';
import {styles} from '../../css';

const columnscell_imcom = ["lagg_id", "Origin", "Vehicle", "ETA", "Bag Count"];
const columnscell_irregu = ["laggirre_id", "SMU #", "ETD", "ETA", "Delay (day)"];

const driverdata = [  
  { name: 'Active', value: 30, colorf: '#6cb26f' },
  { name: 'Inactive', value: 6, colorf: '#fddf6d' },
];

const staticsdata = [
  { name: 'Pending', value: 2731, colorf: '#f17676' },
  { name: 'Success', value: 5700, colorf: '#6cb26f' },
  { name: 'Fail', value: 8523, colorf: '#fddf6d' },
];

const renderLabelContent = (props) => {
  const { value, percent, x, y, midAngle, name } = props;

  return (
    <g transform={`translate(${x}, ${y})`} textAnchor={ (midAngle < -90 || midAngle >= 90) ? 'end' : 'start'}>
      <text x={0} y={0}>{`${name}`}</text>
      <text x={0} y={20}>{`${value}`}</text>
      {/*<text x={0} y={20}>{`(Percent: ${(percent * 100).toFixed(2)}%)`}</text>*/}
    </g>
  );
};

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

class InboundOverview extends React.Component {
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
           "lagg_id": 12,
           "origin_name":"CGK",
           "vehicle_icon":"plane",
           "vehicle_number":"GA-721",
           "eta":"21/12/2016 09:00",
           "bagcount":"100 (1200 connotes)"
        },
        {
           "lagg_id": 13,
           "origin_name":"BDO",
           "vehicle_icon":"plane",
           "vehicle_number":"GA-125",
           "eta":"21/12/2016 11:00",
           "bagcount":"85 (90 connotes)"
        },
        {
           "lagg_id": 14,
           "origin_name":'BDO',
           "vehicle_icon":'truck',
           "vehicle_number":'D 1234 JNE',
           "eta":'21/12/2016 11:15',
           "bagcount":'72 (80 connotes)'
        },
        {
           "lagg_id": 15,
           "origin_name":"MES",
           "vehicle_icon":"plane",
           "vehicle_number":"GA-136",
           "eta":"21/12/2016 12:15",
           "bagcount":"45 (47 connotes)"
        },
        {
           "lagg_id": 16,
           "origin_name":"CGK",
           "vehicle_icon":"plane",
           "vehicle_number":"GA-721",
           "eta":"21/12/2016 09:00",
           "bagcount":"100 (1200 connotes)"
        },
        {
           "lagg_id": 17,
           "origin_name":"BDO",
           "vehicle_icon":"plane",
           "vehicle_number":"GA-125",
           "eta":"21/12/2016 11:00",
           "bagcount":"85 (90 connotes)"
        },
        {
           "lagg_id": 18,
           "origin_name":'BDO',
           "vehicle_icon":'truck',
           "vehicle_number":'D 1234 JNE',
           "eta":'21/12/2016 11:15',
           "bagcount":'72 (80 connotes)'
        },
        {
           "lagg_id": 19,
           "origin_name":"MES",
           "vehicle_icon":"plane",
           "vehicle_number":"GA-136",
           "eta":"21/12/2016 12:15",
           "bagcount":"45 (47 connotes)"
        },
        {
           "lagg_id": 20,
           "origin_name":"CGK",
           "vehicle_icon":"plane",
           "vehicle_number":"GA-721",
           "eta":"21/12/2016 09:00",
           "bagcount":"100 (1200 connotes)"
        },
        {
           "lagg_id": 21,
           "origin_name":"BDO",
           "vehicle_icon":"plane",
           "vehicle_number":"GA-125",
           "eta":"21/12/2016 11:00",
           "bagcount":"85 (90 connotes)"
        },
        {
           "lagg_id": 22,
           "origin_name":'BDO',
           "vehicle_icon":'truck',
           "vehicle_number":'D 1234 JNE',
           "eta":'21/12/2016 11:15',
           "bagcount":'72 (80 connotes)'
        },
        {
           "lagg_id": 23,
           "origin_name":"MES",
           "vehicle_icon":"plane",
           "vehicle_number":"GA-136",
           "eta":"21/12/2016 12:15",
           "bagcount":"45 (47 connotes)"
        }
      ],
      "irregularitydata":[
        {
           "laggirre_id": 12,
           "smu_name":"SMUXXX",
           "etd":"21/11/2016 09:00",
           "eta":"21/12/2016 09:00",
           "delayt": 1
        },
        {
           "laggirre_id": 13,
           "smu_name":"SMUXXX",
           "etd":"21/11/2016 11:00",
           "eta":"21/12/2016 11:00",
           "delayt": 2
        },
        {
           "laggirre_id": 14,
           "smu_name":'SMUXXX',
           "etd":"21/11/2016 11:15",
           "eta":'21/12/2016 11:15',
           "delayt": 1
        },
        {
           "laggirre_id": 15,
           "smu_name":"SMUXXX",
           "etd":"21/11/2016 12:15",
           "eta":"21/12/2016 12:15",
           "delayt": 1
        },
        {
           "laggirre_id": 16,
           "smu_name":"SMUXXX",
           "etd":"21/11/2016 09:00",
           "eta":"21/12/2016 09:00",
           "delayt": 1
        },
        {
           "laggirre_id": 17,
           "smu_name":"SMUXXX",
           "etd":"21/11/2016 11:00",
           "eta":"21/12/2016 11:00",
           "delayt": 2
        },
        {
           "laggirre_id": 18,
           "smu_name":'SMUXXX',
           "etd":"21/11/2016 11:15",
           "eta":'21/12/2016 11:15',
           "delayt": 1
        },
        {
           "laggirre_id": 19,
           "smu_name":"SMUXXX",
           "etd":"21/11/2016 12:15",
           "eta":"21/12/2016 12:15",
           "delayt": 1
        }
      ]
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

  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: event.target.value});
  };

  componentDidMount() {
    setTimeout(location.reload.bind(location), 30000);
  }

  render() {

    const {classes, match, location} = this.props;
    const {data, irregularitydata, order, orderBy, selected, rowsPerPage, page} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const emptyRowsirre = rowsPerPage - Math.min(rowsPerPage, irregularitydata.length - page * rowsPerPage);
    const breadCrumbs = makeBreadcrumbs(location);

    let prealertimcomingdata = [];
    let irregularitycelldata = [];

    {data.length > 0 &&
                      data.map((imcomdata, index) => {
      prealertimcomingdata.push([imcomdata.lagg_id, imcomdata.origin_name, imcomdata.vehicle_number, imcomdata.eta, imcomdata.bagcount]);
    })}

    {irregularitydata.length > 0 &&
                      irregularitydata.map((irredata, index) => {
      irregularitycelldata.push([irredata.laggirre_id, irredata.smu_name, irredata.etd, irredata.eta, irredata.delayt]);
    })}

    return (
      <div>

        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Inbound /
              <span className={classes.transactionBreadcrumbs}> Overview</span>
            </div>
            <br />
            <p className={classes.titleWrapper}>Overview</p>
          </div>
        </div>
        
        <div className={classes.root}>
          <Grid container>
            <Grid md={8} item xs={8}>
              <Paper className={classes.formWrapper}>
                <div style={excellexportbt}>
                  <ExcelExportBtn
                    columnList={columnscell_imcom}
                    data={prealertimcomingdata}
                    filename="prealertincoming_list.xlsx"
                    orgName="JNT"
                    title="prealertincoming list"
                  />
                </div>
                <Typography type="title"><strong>PreAlert Imcoming</strong></Typography>
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
                            a.lagg_id < b.lagg_id ? -1 : 1,
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
                              key={n.lagg_id}
                            >
                              <TableCell>{n.origin_name}</TableCell>
                              {n.vehicle_icon == 'plane' && (
                                <TableCell><span style={laggicon}><FlightTakeoff style={laggiconsize} /></span> {n.vehicle_number}</TableCell>
                              )}
                              {n.vehicle_icon == 'truck' && (
                                <TableCell><span style={laggicon}><Train style={laggiconsize} /></span> {n.vehicle_number}</TableCell>
                              )}
                              <TableCell>{n.eta}</TableCell>
                              <TableCell>{n.bagcount}</TableCell>
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
            <Grid md={4} item xs={4}>
              <Paper className={classes.formWrapper}>
                <Typography type="title"><strong>Received</strong></Typography>
                <br/>
                <div style={bagStylewrap}><Typography style={bagStyle} variant="headline"><strong>1,700</strong></Typography><span>Bags</span></div>
                <div style={connoteStylewrap}><Typography style={connoteStyle} variant="headline" gutterBottom><strong>18,523</strong></Typography><span>Connotes</span></div>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <div className={classes.root}>
          <Grid container>
            <Grid md={6} item xs={6}>
              <Paper className={classes.formWrapper}>
                <div style={excellexportbt}>
                  <ExcelExportBtn
                    columnList={columnscell_irregu}
                    data={irregularitycelldata}
                    filename="irregularity_list.xlsx"
                    orgName="JNT"
                    title="irregularity list"
                  />
                </div>
                  <Typography type="title"><strong>Irregularity</strong></Typography>
                  <br/>

                  <div className={classes.tableWrapper}>
                    {irregularitydata.length === 0 && <UserLinearProgress />}
                    <Table className={classes.table}>
                      <EnhancedIregularityTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onSort={this.handleSort}
                        rowCount={irregularitydata.length}
                      />
                      <TableBody>
                        {irregularitydata
                          .sort(
                            (a, b) =>
                              a.laggirre_id < b.laggirre_id ? -1 : 1,
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
                                key={n.laggirre_id}
                              >
                                <TableCell>{n.smu_name}</TableCell>
                                <TableCell>{n.etd}</TableCell>
                                <TableCell>{n.eta}</TableCell>
                                <TableCell>{n.delayt}</TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRowsirre > 0 && (
                          <TableRow style={{height: 49 * emptyRowsirre}}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            count={irregularitydata.length}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={
                              irregularitydata.length < 25 ? [5, 10] : [5, 10, 25]
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
            <Grid md={6} item xs={6}>
              <Paper className={classes.formWrapper}>
                  <Typography type="title"><strong>Traffic Inbound / Hour</strong></Typography>
                  <br/>
                  
                  <LineChart
                    axes
                    grid
                    verticalGrid
                    dataPoints
                    xTicks={5}
                    yTicks={5}
                    xDomainRange={[11, 18]}
                    yDomainRange={[0, 4000]}
                    width={500}
                    height={350}
                    interpolate={'cardinal'}
                    lineColors={['#6f74b1']}
                    data={[
                      [
                        { x: 11, y: 1800 },
                        { x: 12, y: 3000 },
                        { x: 13, y: 3200 },
                        { x: 14, y: 2900 },
                        { x: 15, y: 2000 },
                        { x: 16, y: 4000 },
                        { x: 17, y: 1000 },
                        { x: 18, y: 300 }
                      ]
                    ]}
                  />

              </Paper>
            </Grid>
          </Grid>
        </div>

        <div className={classes.root}>
          <Grid container>
            <Grid md={6} item xs={6}>
              <Paper className={classes.formWrapper}>
                  <Typography type="title"><strong>Delivery Drivers</strong></Typography>
                  <br/>
                  <div style={leftgrahside}>
                    <PieChart width={500} height={270}>
                      <Pie
                        data={driverdata}
                        dataKey="value"
                        cx={270}
                        cy={125}
                        startAngle={90}
                        endAngle={-270}
                        innerRadius={70}
                        outerRadius={110}
                        label={renderLabelContent}
                        paddingAngle={0}
                        isAnimationActive={this.state.animation}
                      >
                        {
                          driverdata.map((entry, index) => (
                            <Cell key={`slice-${index}`} fill={entry.colorf}/>
                          ))
                        }
                        <Label width={50} position="center">
                          30/
                          36
                        </Label>
                      </Pie>
                    </PieChart>
                  </div>
              </Paper>
            </Grid>                
            <Grid md={6} item xs={6}>
              <Paper className={classes.formWrapper}>
                  <Typography type="title"><strong>Delivery Statistics</strong></Typography>
                  <br/>
                  <div style={leftgrahside}>
                    <PieChart width={500} height={270}>
                      <Pie
                        data={staticsdata}
                        dataKey="value"
                        cx={270}
                        cy={125}
                        startAngle={90}
                        endAngle={-270}
                        innerRadius={70}
                        outerRadius={110}
                        label={renderLabelContent}
                        paddingAngle={0}
                        isAnimationActive={this.state.animation}
                      >
                        {
                          staticsdata.map((entry, index) => (
                            <Cell key={`slice-${index}`} fill={entry.colorf}/>
                          ))
                        }
                        <Label width={50} position="center">
                          18,253/
                          70,489
                        </Label>
                      </Pie>
                    </PieChart>
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

const bagStylewrap = {
  display: 'block',
  marginBottom: 40
};

const bagStyle = {
  fontSize: 40,
  color: '#323990',
  display: 'inline-block',
  marginRight: 15
};

const connoteStylewrap = {
  display: 'block'
};

const connoteStyle = {
  fontSize: 40,
  color: '#323990',
  display: 'inline-block',
  marginRight: 15
};

const leftgrahside = {
  textAlign: 'center'
};

const laggicon = {
  display: 'inline-block',
  backgroundColor: '#d8d8d8',
  width: 20,
  height: 20,
  textAlign: 'center',
  borderRadius: '100%',
  verticalAlign: 'middle'
};

const laggiconsize = {
  fontSize: 15,
  verticalAlign: 'middle'
};

const excellexportbt = {
  display: 'block',
  textAlign: 'right'
}

InboundOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InboundOverview);
