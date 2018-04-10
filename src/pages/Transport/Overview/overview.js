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
import {makeBreadcrumbs} from '../../reusableFunc';
import {BarChart} from 'react-easy-chart';

import { PieChart, Pie, ResponsiveContainer, Sector, Label, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceDot,
  XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList } from 'recharts';

import {styles} from '../../css';

const connotedata = [
  { name: 'KP', value: 5700, colorf: '#6cb26f' },
  { name: 'Corporate', value: 8523, colorf: '#fddf6d' },
  { name: 'Agent', value: 2731, colorf: '#f17676' },
];

const renderLabelContent = (props) => {
  const { value, percent, x, y, midAngle, name } = props;

  return (
    <g transform={`translate(${x}, ${y})`} textAnchor={ (midAngle < -90 || midAngle >= 90) ? 'end' : 'start'}>
      <text x={0} y={0}>{`${name}`}</text>
      {/*<text x={10} y={20}>{`${value}`}</text>*/}
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
        <Typography type="title">Incoming connote source</Typography>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

class TransportOverview extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.mouseOutHandler = this.mouseOutHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);

    this.state = {
      showToolTip: false,
      componentWidth: 300,
      selected: [],
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

    this.defaultData = [
      {
        x: '',
        y: ''
      },
      {
        x: 'MES',
        y: 2200,
        color: '#f17676'
      },
      {
        x: 'CGK',
        y: 3500,
        color: '#6cb26f'
      },
      {
        x: 'BDO',
        y: 2900,
        color: '#fddf6d'
      },
      {
        x: 'SBY',
        y: 1800,
        color: '#68b7bf'
      }
    ];

    this.defaultLineData = [{
      x: 'MES',
      y: 2000
    },
    {
      x: 'CGK',
      y: 1100
    },
    {
      x: 'BDO',
      y: 1101
    },
    {
      x: 'SBY',
      y: 2000
    }];

  }

  mouseOverHandler(d, e) {
    this.setState({
      showToolTip: true,
      top: e.y,
      left: e.x,
      value: d.value,
      key: d.data.key});
    {this.createTooltip()}
  }

  mouseMoveHandler(e) {
    if (this.state.showToolTip) {
      this.setState({top: e.y, left: e.x});
    }
  }

  mouseOutHandler() {
    this.setState({showToolTip: false});
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

  componentDidMount() {
    setTimeout(location.reload.bind(location), 30000);
  }

  render() {
    const {classes, match, location} = this.props;
    const {selected} = this.state;
    const breadCrumbs = makeBreadcrumbs(location);

    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Transport /
              <span className={classes.transactionBreadcrumbs}> Overview</span>
            </div>
            <br />
            <p className={classes.titleWrapper}>Overview</p>
          </div>
        </div>
        
        <div className={classes.root}>

          <Grid container spacing={24}>

            <Grid md={8} item xs={8}>
              <Paper className={classes.formWrapper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                
                <div>
                  <div style={leftgrahside}>
                    <PieChart width={500} height={250}>
                      <Pie
                        data={connotedata}
                        dataKey="value"
                        cx={200}
                        cy={120}
                        startAngle={90}
                        endAngle={-270}
                        innerRadius={70}
                        outerRadius={110}
                        label={renderLabelContent}
                        paddingAngle={0}
                        isAnimationActive={this.state.animation}
                      >
                        {
                          connotedata.map((entry, index) => (
                            <Cell key={`slice-${index}`} fill={entry.colorf}/>
                          ))
                        }
                      </Pie>
                    </PieChart>
                  </div>

                  <div style={rightdetailside}>
                    <ul style={listcss}>
                      <li style={listone}><span style={firstbox}></span> Agent <span style={firstboxc}>2731</span><span>17%</span></li>
                      <li style={listtwo}><span style={secbox}></span> KP <span style={secboxc}>5700</span><span>33%</span></li>
                      <li style={listthree}><span style={thirdbox}></span> Corporate <span style={thirdboxc}>8523</span><span>50%</span></li>
                    </ul>
                  </div>
                </div>

              </Paper>
            </Grid>
                
            <Grid md={4} item xs={4}>
              <Paper className={classes.formWrapper}>
                <Typography type="title"><strong>Received</strong></Typography>
                <br/>
                <div style={bagStylewrap}><Typography style={bagStyle} variant="headline"><strong>2300</strong></Typography><span>Bags</span></div>
                <div style={connoteStylewrap}><Typography style={connoteStyle} variant="headline" gutterBottom><strong>24000</strong></Typography><span>Connotes</span></div>
              </Paper>
            </Grid>

          </Grid>

        </div>

        <div className={classes.root}>

          <Grid container spacing={24}>

            <Grid md={8} item xs={8}>
              <Paper className={classes.formWrapper}>
                <EnhancedTableToolbar numSelected={selected.length} />
                  <div style={{display: 'inline-block'}}>
                  <BarChart
                    axes
                    margin={{top: 50, right: 100, bottom: 50, left: 100}}
                    barWidth={20}
                    colorBars
                    grid
                    width={500}
                    height={300}
                    xTickNumber={5}
                    yTickNumber={5}
                    yDomainRange={[0, 4000]}
                    data={this.defaultData}
                  />
                  </div>
              </Paper>
            </Grid>

            <Grid md={4} item xs={4}>
              <Paper className={classes.formWrapper}>
                <Typography type="title"><strong>Sorting</strong></Typography>
                <br/>
                <Typography variant="headline" gutterBottom>12,350</Typography>
                <span>/ 24,000</span>
                <br/>
                <p style={divStyle}><strong>51.4%</strong></p>
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
  display: 'inline-block',
  width: 450
};

const rightdetailside = {
  display: 'inline-block',
  width: 250,
  position: 'relative',
  top: -130
};

const listcss = {
  listStyleType: 'none'
};

const firstbox = {
  width: 15,
  height: 15,
  backgroundColor: '#ed5454',
  display: 'inline-block'
};

const secbox = {
  width: 15,
  height: 15,
  backgroundColor: '#479f4b',
  display: 'inline-block'
};

const thirdbox = {
  width: 15,
  height: 15,
  backgroundColor: '#fcd748',
  display: 'inline-block'
};

const firstboxc = {
  width: 60,
  display: 'inline-block',
  'marginLeft': 42
};

const secboxc = {
  width: 60,
  display: 'inline-block',
  marginLeft: 65
};

const thirdboxc = {
  width: 60,
  display: 'inline-block',
  marginLeft: 15
};

const listone = {
  marginBottom: 15
};

const listtwo = {
  marginBottom: 15
};

const listthree = {
  marginBottom: 15
};

TransportOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransportOverview);
