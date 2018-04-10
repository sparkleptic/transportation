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
import {makeBreadcrumbs} from '../../reusableFunc';
import {Train, Traffic, FlightTakeoff, Toys} from 'material-ui-icons';
import UserLinearProgress from '../../UserLinearprogress';
import { PieChart, Pie, ResponsiveContainer, Sector, Label, BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot,
  XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList } from 'recharts';
import GoogleMapReact from 'google-map-react';
import {getEntityList} from '../../../actions/entity';
import {styles} from '../../css';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
const columnscell = ["node_id", "Agent", "Address", "#Connote", "#Bag", "Weight (Kg)"];

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const renderLabelContent = (props) => {
  const { value, percent, x, y, midAngle, name } = props;

  return (
    <g transform={`translate(${x}, ${y})`} textAnchor={ (midAngle < -90 || midAngle >= 90) ? 'end' : 'start'}>
      <text x={0} y={0}>{`${name}`}</text>
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



class MarkerWithTooltip extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showToolTip: false
    }
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }
  toggleTooltip() {
    this.setState({
      showToolTip: !this.state.showToolTip,
    });
  }
  showTooltip() {
    this.setState({
      showToolTip: true,
    });
  }
  hideTooltip() {
    this.setState({
      showToolTip: false,
    });
  }
  render() {
    return (
      <Marker onMouseOver={this.showTooltip} onMouseOut={this.hideTooltip} position={this.props.position} >
        {this.state.showToolTip && <InfoWindow onCloseClick={this.toggleTooltip}><div>
          <strong>{this.props.position.node_name}</strong><br />
          {this.props.position.remark && <span>{this.props.position.remark}<br /></span>}
          {this.props.position.status && <span>({this.props.position.status})<br /></span>}
        </div></InfoWindow>}
      </Marker>
    );
  }
}


const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => {
    const {lat, lng, data} = props;
    const positions = data.map((position, index) => {
      return {
        lat: position.node_lat,
        lng: position.node_lon,
        node_name: position.node_name,
        status: position.status,
        remark: position.remark,
      };
    });

    if (this.mapRef && positions.length > 0 && !this.bounds) {
      this.bounds = new google.maps.LatLngBounds();
      if (positions.length > 0) {
        positions.forEach((position) => {
          if (!this.bounds.contains(position)) {
            this.bounds.extend(position);
          }
        });
        this.mapRef.fitBounds(this.bounds);
      }
    }
    return (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{lat, lng}}
        ref={(ref) => {this.mapRef = ref;}}
        >
        {
          data && data.length > 0 &&
          <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={1}
            >
            {
              positions.map((position, index) => (
                <MarkerWithTooltip position={position} key={index}/>
              ))
            }
          </MarkerClusterer>
        }
      </GoogleMap>
    );
  }),
);

class PickUpOverview extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showToolTip: false,
      componentWidth: 300,
      order: 'asc',
      orderBy: 'PickUpTime',
      selected: [],
      pickupdata: [],
      page: 0,
      rowsPerPage: 5,
      picktabledata:[],
      ready: false,
      lat: -6.2115,
      lng: 106.8452,
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

  componentDidMount() {

    setTimeout(location.reload.bind(location), 30000);

    this.props.edit !== true && this.setState({ready: true});

    if (sessionStorage.getItem('userNodeId') !== null) {
      let userNodeId = JSON.parse(sessionStorage.getItem('userNodeId'));

      getEntityList(`pickup/overview/services?n=${userNodeId}`, null).then((response) => {
        const {data} = response.data;
        //this.setState({pickupdata: data});
      });

      getEntityList(`pickup/overview/table?n=${userNodeId}`, null).then((response) => {
        const {data} = response.data;
        this.setState({picktabledata: data});
      });
    }

  }

  // Call when select Node from Dropdown
  componentWillReceiveProps() {
    if (sessionStorage.getItem('userNodeId') !== null) {

      let userNodeId = JSON.parse(sessionStorage.getItem('userNodeId'));

      getEntityList(`pickup/overview/services?n=${userNodeId}`, null).then((response) => {
        const {data} = response.data;
        this.setState({pickupdata: data});
      });

      getEntityList(`pickup/overview/table?n=${userNodeId}`, null).then((response) => {
        const {data} = response.data;
        this.setState({picktabledata: data});
      });
    }
  }

  handleSort = (event, property) => {
    const orderBy = property;

    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    const picktabledata =
      order === 'desc'
        ? this.state.picktabledata.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.picktabledata.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({picktabledata, order, orderBy});
  };


  handleChangePage = (event, page) => {
    this.setState({page});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: event.target.value});
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({selected: this.state.picktabledata.map((n) => n.id)});
      return;
    }
    this.setState({selected: []});
  };

  render() {

    const {classes, match, location} = this.props;
    const {picktabledata, pickupdata, irregularitydata, order, orderBy, selected, rowsPerPage, page, ready, lat, lng} = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, picktabledata.length - page * rowsPerPage);
    const breadCrumbs = makeBreadcrumbs(location);

    var connoteSum = 0;
    var bagSum = 0;
    var weight_kgSum = 0;

    if (picktabledata.length >0) {
        for (let i = 0; i < picktabledata.length; i++) {
            if (picktabledata[i].connote_inventory) {
              connoteSum += parseInt(picktabledata[i].connote_inventory.connote_qty);
            }
            if (picktabledata[i]['bag_inventory']) {
              bagSum += parseInt(picktabledata[i]['bag_inventory'].bag_qty);
            }
            if (picktabledata[i].connote_inventory) {
              weight_kgSum += parseInt(picktabledata[i].connote_inventory.actual_weight);
            }

        }
    }

    let pickupexcelldata = [];
    var connote;
    var bagnum;
    var weight_kg;
    if (picktabledata.length > 0) {
      picktabledata.map((pickupexcellvalue, index) => {

        if (pickupexcellvalue.connote_inventory) {
          connote = parseInt(pickupexcellvalue.connote_inventory.connote_qty);
        } else {
          connote = 0;
        }

        if (pickupexcellvalue.bag_inventory) {
          bagnum = parseInt(pickupexcellvalue.bag_inventory.bag_qty);
        } else {
          bagnum = 0;
        }

        if (pickupexcellvalue.connote_inventory) {
          weight_kg = parseInt(pickupexcellvalue.connote_inventory.actual_weight);
        } else {
          weight_kg = 0;
        }

        pickupexcelldata.push([pickupexcellvalue.node_id, pickupexcellvalue.agent_name, pickupexcellvalue.node_address, pickupexcellvalue.connote, pickupexcellvalue.bagnum, pickupexcellvalue.weight_kg]);
      });
    }

    return (
      <div>

        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Pick Up /
              <span className={classes.transactionBreadcrumbs}> Overview</span>
            </div>
            <br />
            <p className={classes.titleWrapper}>Overview</p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid container>
            <Grid container spacing={16}>
              <Grid md={9} item xs={9} className={classes.join_widgets}>
                <Paper className={classes.formWrapper}>
                  <div style={bodyTitle}>
                    <Typography className={classes.bodyTitleText} type="headline"><strong>Pick Up Overview</strong></Typography>
                    <ExcelExportBtn
                      columnList={columnscell}
                      data={pickupexcelldata}
                      filename="pickup_list.xlsx"
                      orgName="JNT"
                      title="pickup list"
                    />
                  </div>
                  
                  <br/>
                  <div className={classes.tableWrapper}>
                    {picktabledata.length === 0 && <UserLinearProgress />}
                    <Table className={classes.table}>
                      <EnhancedInboundTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onSort={this.handleSort}
                        rowCount={picktabledata.length}
                      />
                      <TableBody>
                        {picktabledata
                          .sort(
                            (a, b) =>
                              a.node_id < b.node_id ? -1 : 1,
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
                                key={n.node_id}
                              >
                                <TableCell>{n.agent_name}</TableCell>
                                <TableCell>{n.node_address}</TableCell>                              
                                <TableCell>
                                  {n.connote_inventory != null ? n.connote_inventory.connote_qty : 0}
                                </TableCell>
                                <TableCell>
                                  {n.bag_inventory !=null ? n.bag_inventory.bag_qty : 0}
                                </TableCell>
                                <TableCell>
                                  {n.connote_inventory != null ? n.connote_inventory.actual_weight : 0}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow>
                            <TableCell><strong>SUM</strong></TableCell>
                            <TableCell></TableCell>
                            <TableCell><strong>{connoteSum}</strong></TableCell>
                            <TableCell><strong>{bagSum}</strong></TableCell>
                            <TableCell><strong>{weight_kgSum}</strong></TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            count={picktabledata.length}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={
                              picktabledata.length < 25 ? [5, 10] : [5, 10, 25]
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
              <Grid md={3} item xs={3} className={classes.join_widgets}>
                <Paper className={classes.formWrapper}>
                  <div style={bodyTitle}>
                    <Typography className={classes.bodyTitleText} type="headline"><strong>Services</strong></Typography>
                  </div>
                  <div style={leftgrahside}>
                    {pickupdata &&
                      <PieChart width={250} height={260}>
                          <Pie
                            data={pickupdata}
                            dataKey="value"
                            cx={140}
                            cy={120}
                            startAngle={90}
                            endAngle={-270}
                            innerRadius={40}
                            outerRadius={70}
                            label={renderLabelContent}
                            paddingAngle={0}
                            isAnimationActive={this.state.animation}
                          >
                            {
                              pickupdata.map((entry, index) => (
                                <Cell key={`slice-${index}`} fill={entry.colorf}/>
                              ))
                            }
                          </Pie>
                          <Tooltip />
                        </PieChart>
                    }
                  </div>
                  <div style={leftserviceside}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography type="subheading">Connotes</Typography>
                        <Typography style={servicesparam} type="title"><strong>{connoteSum}</strong></Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography type="subheading">Bags</Typography>
                        <Typography style={servicesparam} type="title"><strong>{bagSum}</strong></Typography>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div className={classes.root}>
          <Grid container>
            <Grid md={12} item xs={12}>
              <Paper className={classes.formWrapper}>
                <div style={bodyTitle}>
                  <Typography className={classes.bodyTitleText} type="headline"><strong>Nearest Agent</strong></Typography>
                </div>
                {ready && (
                  <MapWithAMarker
                    lat={lat}
                    lng={lng}
                    data={picktabledata}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCo6jr7MpgztNao-k74aTZcrOIIASChoqA&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{height: `100%`}} />}
                    containerElement={<div style={{height: `400px`}} />}
                    mapElement={<div style={{height: `100%`}} />}
                  />
                )}
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
  'margin-bottom': 40
};

const bagStyle = {
  fontSize: 40,
  color: '#323990',
  display: 'inline-block',
  'margin-right': 15
};

const connoteStylewrap = {
  display: 'block'
};

const connoteStyle = {
  fontSize: 40,
  color: '#323990',
  display: 'inline-block',
  'margin-right': 15
};

const leftgrahside = {
  textAlign: 'center'
};
const leftserviceside = {
  textAlign: 'center',
  marginTop: 30
};

const laggicon = {
  display: 'inline-block',
  backgroundColor: '#d8d8d8',
  width: 20,
  height: 20,
  textAlign: 'center',
  'border-radius': '100%',
  'vertical-align': 'middle'
};

const laggiconsize = {
  fontSize: 15,
  'vertical-align': 'middle'
};

const servicesparam = {
  fontSize: 30,
};

const bodyTitle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px 24px 24px 24px',
};
const bodyTitleText = {
  fontSize: '1.2rem',
}

PickUpOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PickUpOverview);
