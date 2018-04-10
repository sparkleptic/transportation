import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Paper} from 'material-ui';
import SwipeableViews from 'react-swipeable-views';
import Tabs, {Tab} from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import entities from './entities';
import Permission from './Permission/create';
import {styles} from '../../css';

const config = {
  tabs: [
    {title: 'User', label: 'User List', name: 'users'},
    {title: 'Roles', label: 'Roles List', name: 'usergroups'},
    {title: 'Permissions', label: 'Permissions List', name: 'permission'},
  ],
};

class TabSelector extends React.Component {
  state = {value: 0, role_id: ''};

  handleChange = (event, value) => {
    this.setState({value});
  };
  handleChangeIndex = (index) => {
    this.setState({value: index});
  };
  onSelectItem = (id) => {
    this.setState({role_id: id});
  };
  render() {
    const {classes, theme, location, match, history} = this.props;
    const {value, role_id} = this.state;
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
              <span className={classes.transactionBreadcrumbs}> Users</span>
            </div>
            <br />
            <p className={classes.titleWrapper}>Users</p>
          </div>
        </div>
        <Grid className={classes.root}>
          <Grid xs={12} item>
            <Grid container>
              <Grid xs={value === 2 ? 4 : 12} item>
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
                    index={value}
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
                    {value === 2 && (
                      <Component
                        onSelectItem={this.onSelectItem}
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
              {value === 2 && (
                <Permission role_id={role_id} classes={classes} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

TabSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withStyles(styles, {withTheme: true})(TabSelector);
