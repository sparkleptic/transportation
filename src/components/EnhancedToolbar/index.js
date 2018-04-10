import React from 'react';
import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    width: '100%',
  },
  flexDisplay: {
    display: 'flex',
  },
  flex: {
    flex: 1,
  },
  bread: {
    fontSize: 14,
    color: '#323990',
  },
  slash: {
    margin: 5,
    color: 'grey',
  },
  tail: {
    fontSize: 14,
  },
  title: {
    fontSize: 25,
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.7)',
  }
});

class Comp extends React.Component {

  render() {
    const { classes, navs=[], title, children } = this.props;

    return (
      <Toolbar>
        <div className={classes.flex}>
          <div className={classes.flexDisplay}>
            {navs.slice(0, navs.length - 1).map((nav, index) => (
              <Typography key={index} variant="caption" className={classes.bread}>
                {`${nav}`}
                <span className={classes.slash}>/</span>
              </Typography>
            ))}
            <Typography variant="caption" className={classes.tail}>
              {navs[navs.length - 1]}
            </Typography>
          </div>
          <Typography variant="title" className={classes.title}>
            {title || navs[navs.length -1]}
          </Typography>
        </div>
        {children}
      </Toolbar>
    );
  }
}

export default withStyles(styles)(Comp);