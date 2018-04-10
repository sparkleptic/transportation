import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Paper} from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import Grid from 'material-ui/Grid';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import entities from './entities';
import {styles} from '../../css';

const config = {
  tabs: [
    {title: 'Base Tariff', label: 'Base Tariff List', name: 'tarif'},
    {
      title: 'Special Tariff',
      label: 'Special Tariff List',
      name: 'special_tariff',
    },
    {title: 'Surcharge', label: 'Surcharge List', name: 'surcharges'},
  ],
};

class TabSelector extends React.Component {
  state = {value: 0, searchPayload: {}};
  
  handleChange = (event, value) => {
    this.setState({value});
    this.props.updateGenericListPayload({})
  };

  handleChangeIndex = (index) => {
    this.setState({value: index});
    this.props.updateGenericListPayload({})
  };

  onListPayloadChanges = (searchPayload) => {
    this.props.updateGenericListPayload(searchPayload)
    console.log(searchPayload)
  }

  componentDidMount () {
    const {
      payload
    } = this.props.genericListTable
    
    if(payload && payload.entity) {
      const entityIndex = config.tabs.findIndex(tab => tab.name == payload.entity)
      
      this.setState({
        value: entityIndex
      })

    }
  }

  render() {
    const {classes, theme, location, match, history} = this.props;
    const {value} = this.state;
    const {label} = config.tabs[value];
    const entity = config.tabs[value];
    const componentData = entities[entity.name];
    const Component = componentData.listForm;

    const {
      payload
    } = this.props.genericListTable

    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Settings /
              <span className={classes.transactionBreadcrumbs}> Tariff</span>
            </div>
            <br />
            <p className={classes.titleWrapper}>Tariff</p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid md={12} item>
            <Paper className={classes.formWrapper}>
              <Typography type="headline">{label}</Typography>
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                style={{marginLeft: 15}}
              >
                {config.tabs.map((item) => (
                  <Tab label={item.title} key={item.title} />
                ))}
              </Tabs>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}
              >
                {value === 0 && (
                  <Component
                    entity={entity.name}
                    componentData={componentData}
                    history={history}
                    location={location}
                    match={match}
                  />
                )}
                {value === 1 && (
                  <Component
                    entity={entity.name}
                    componentData={componentData}
                    history={history}
                    location={location}
                    match={match}
                    onListPayloadChanges={this.onListPayloadChanges}
                    searchPayload={payload}
                  />
                )}
                {value === 2 && (
                  <Component
                    entity={entity.name}
                    componentData={componentData}
                    history={history}
                    location={location}
                    match={match}
                  />
                )}
              </SwipeableViews>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}

TabSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    genericListTable: state.genericListTable,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateGenericListPayload: (payload) => {
      dispatch({
        type: 'SET_PAYLOAD',
        payload
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(TabSelector));
