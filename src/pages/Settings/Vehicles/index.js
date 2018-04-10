import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Paper} from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import entities from './entities';
import {styles} from '../../css';

const config = {
  tabs: [
    {title: 'Vehicle', label: 'Vehicle Master List', name: 'vehicle'},
    {title: 'Type', label: 'Vehicle Type List', name: 'vehicletype'},
  ],
};
class TabSelector extends React.Component {
  state = {value: 0};

  handleChange = (event, value) => {
    this.setState({value});
  };
  handleChangeIndex = (index) => {
    this.setState({value: index});
  };

  render() {
    const {classes, theme, location, match, history} = this.props;
    const {value} = this.state;
    const {label} = config.tabs[value];

    const entity = config.tabs[value];
    const componentData = entities[entity.name];
    const Component = componentData.listForm;
    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Settings /
              <span className={classes.transactionBreadcrumbs}> Vehicles</span>
            </div>
            <br />
            <p className={classes.titleWrapper}>Vehicles</p>
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

export default withStyles(styles, {withTheme: true})(TabSelector);
