import React from 'react';
import {Route, Link} from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import ToolTip from 'material-ui/Tooltip';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid/Grid';
import _ from 'lodash';
import {makeBreadcrumbs} from '../../reusableFunc';
import {
  PieChart, Pie, ResponsiveContainer, Sector, Label,
  BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine,
  ReferenceDot, XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList,
} from 'recharts';
import {getEntity} from '../../../actions/entity';
import {styles} from '../../css';

const userdata = [
  {name: 'Intracity', OKE: 2000, YES: 2013, REG: 4500, time: 1},
  {name: 'Domestic', OKE: 3300, YES: 2000, REG: 6500, time: 2},
];



const graphColors = [
  '#EC5555',
  '#FCD64A',
  '#499E4C',
  '#2695F3',
  '#FFB64E',
];


const renderLabelContent = (props) => {
  const {value, percent, x, y, midAngle, name} = props;

  return (
    <g transform={`translate(${x}, ${y})`} textAnchor={(midAngle < -90 || midAngle >= 90) ? 'end' : 'start'}>
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

let EnhancedTableToolbar = (props) => {
  const {numSelected, classes} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        <Typography type="title">Sales</Typography>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class SalesOverview extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

    this.state = {
      showToolTip: false,
      componentWidth: 300,
      selected: [],
      sales_overview: {},
    };
    this.styles = {
      '.pie-chart-lines': {
        stroke: 'rgba(0, 0, 0, 1)',
        strokeWidth: 1,
      },
      '.pie-chart-text': {
        fontSize: '10px',
        fill: 'white',
      },
    };

    this.defaultData = [
      {
        x: '',
        y: '',
      },
      {
        x: 'MES',
        y: 2200,
        color: '#f17676',
      },
      {
        x: 'CGK',
        y: 3500,
        color: '#6cb26f',
      },
      {
        x: 'BDO',
        y: 2900,
        color: '#fddf6d',
      },
      {
        x: 'SBY',
        y: 1800,
        color: '#68b7bf',
      },
    ];

  }

  componentDidMount() {

    setTimeout(location.reload.bind(location), 30000);

    let userNodeId = null;
    if (sessionStorage.getItem('userNodeId') !== null) {
      userNodeId = JSON.parse(sessionStorage.getItem('userNodeId'));
    }
    getEntity('sales/overview', {
      n: userNodeId,
    }).then(({data}) => {
      this.setState({
        sales_overview: data.data,
      });
    });
  }
  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: e.y,
      left: e.x,
      value: d.value,
      key: d.data.key});
    this.createTooltip();
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: e.y, left: e.x});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
  }

  populateGraph() {
    if (!('connote_by_services' in this.state.sales_overview)) {
      return {data01: [], total01: 0, data02: [], total02: 0, outbounddata: []};
    }

    // Data 01
    const data01 = this.state.sales_overview.connote_by_services.map((v, i) => {
      return {
        name: v.service_code || 'UNKNOWN',
        colorf: graphColors[i % graphColors.length],
        value: v.value,
      };
    });
    let total01 = _.remove(data01, (d) => {
      return d.name === 'Total';
    });
    total01 = total01.length ? total01[0] : {value: 0};

    // Data 01

    const data02 = this.state.sales_overview.top_destination.map((v, i) => {
      return {
        name: v.city_destination.city_name || 'UNKNOWN',
        colorf: graphColors[i % graphColors.length],
        value: v.value,
      };
    });
    let total02 = _.sumBy(data02, 'value');


  const obIntracity = {};
  this.state.sales_overview.sales_destination.intracity.forEach((v, i) => {
    obIntracity[v.service_code] = v.value;
  });
  const obDomestic = {};
  this.state.sales_overview.sales_destination.domestik.forEach((v, i) => {
    obDomestic[v.service_code] = v.value;
  });
  const outbounddata = [
    {name: 'Intracity', ...obIntracity},
    {name: 'Domestic', ...obDomestic},
  ];
  return {data01, total01, data02, total02, outbounddata};
  }
  createTooltip() {
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
          The value of {this.state.key} is {this.state.value}
        </ToolTip>
      );
    }
    return false;
  }

  render() {
    const {classes, match, location} = this.props;
    const {selected, sales_overview} = this.state;
    const breadCrumbs = makeBreadcrumbs(location);
    let totalSales = 0;
    let packets = 0;
    if (sales_overview && 'sales_per_node' in sales_overview) {
      totalSales = new Intl.NumberFormat('en-IN').format(sales_overview.sales_per_node.amount_price);
    }
    if (sales_overview && 'total_connote_per_node' in sales_overview) {
      packets = sales_overview.total_connote_per_node;
    }
    const {data01, total01, data02, total02, outbounddata} = this.populateGraph();
    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Sales /
              <span className={classes.transactionBreadcrumbs}> Overview</span>
            </div>
            <br />
            <p className={classes.titleWrapper}>Overview</p>
          </div>
        </div>
        <div className={classes.root}>

          <Grid container spacing={24}>

            <Grid md={4} item xs={4}>
              <Paper className={classes.formWrapper}>
                <Typography type="title"><strong>Sales</strong></Typography>
                <br />
                <div style={rpStylewrap}><span>Rp</span><br /><Typography style={rpStyle} variant="headline"><strong>{totalSales}</strong></Typography></div>
                <div style={paketStylewrap}><span>Paket</span><br /><Typography style={paketStyle} variant="headline" gutterBottom><strong>{packets}</strong></Typography></div>
              </Paper>
            </Grid>

            <Grid md={4} item xs={4}>
              <Paper className={classes.formWrapper}>
              <Typography type="title"><strong>Sales By Services</strong></Typography>
                  <div style={leftgrahside}>
                    <PieChart width={400} height={220}>
                      <Pie
                        data={data01}
                        dataKey="value"
                        cx={200}
                        cy={120}
                        activeIndex={0}
                        startAngle={0}
                        endAngle={-360}
                        innerRadius={50}
                        outerRadius={90}
                        label={renderLabelContent}
                        paddingAngle={0}
                        isAnimationActive={this.state.animation}
                      >
                        {
                          data01.map((entry, index) => (
                            <Cell key={`slice-${index}`} fill={entry.colorf} />
                          ))
                        }
                        <Label width={50} position="center">{total01.value}</Label>
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>
              </Paper>
            </Grid>

            <Grid md={4} item xs={4}>
              <Paper className={classes.formWrapper}>
              <Typography type="title"><strong>Sales By Type</strong></Typography>
                  <div style={leftgrahside}>
                    <BarChart width={400} height={225} data={userdata} margin={{top: 50, right: 20, bottom: 0, left: 20}}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend style={{bottom: 'auto', top: 0, 'margin-top': 10}} layout="horizontal" />
                      <CartesianGrid horizontal={true} />
                      <CartesianGrid vertical={true} />
                      <Bar dataKey="OKE" fill="#499E4C" />
                      <Bar dataKey="YES" fill="#EC5555" />
                      <Bar dataKey="REG" fill="#FCD64A" />
                    </BarChart>
                  </div>
              </Paper>
            </Grid>

          </Grid>

        </div>

        <div className={classes.root}>

          <Grid container spacing={24}>

            <Grid md={6} item xs={6}>
              <Paper className={classes.formWrapper}>
                <Typography type="title"><strong>Outbound By Services</strong></Typography>
                  <div style={leftgrahside}>
                    <BarChart width={600} height={280} data={outbounddata} margin={{top: 50, right: 20, bottom: 0, left: 20}}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend style={{bottom: 'auto', top: 0, 'margin-top': 10}} layout="horizontal" />
                      <CartesianGrid horizontal={true} />
                      <CartesianGrid vertical={true} />
                      <Bar dataKey="OKE" fill="#499E4C" />
                      <Bar dataKey="YES" fill="#EC5555" />
                      <Bar dataKey="REG" fill="#FCD64A" />
                    </BarChart>
                  </div>
              </Paper>
            </Grid>

            <Grid md={6} item xs={6}>
              <Paper className={classes.formWrapper}>
                <Typography type="title"><strong>Domestic</strong></Typography>
                <br/>
                <div style={leftgrahside}>
                  <PieChart width={600} height={260}>
                    <Pie
                      data={data02}
                      dataKey="value"
                      cx={300}
                      cy={130}
                      startAngle={90}
                      endAngle={-270}
                      innerRadius={50}
                      outerRadius={90}
                      label={renderLabelContent}
                      paddingAngle={0}
                      isAnimationActive={this.state.animation}
                    >
                      {
                        data02.map((entry, index) => (
                          <Cell key={`slice-${index}`} fill={entry.colorf} />
                        ))
                      }
                      <Label width={50} position="center">{total02}</Label>
                    </Pie>
                    <Tooltip/>
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
  color: '#323990',
};

const rpStylewrap = {
  display: 'block',
  marginBottom: 40,
  textAlign: 'right',
};

const rpStyle = {
  fontSize: 40,
  color: '#323990',
  display: 'inline-block',
};

const paketStylewrap = {
  display: 'block',
  textAlign: 'right',
};

const paketStyle = {
  fontSize: 40,
  color: '#323990',
  display: 'inline-block',
};

const leftgrahside = {
  textAlign: 'center',
};

SalesOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SalesOverview);
