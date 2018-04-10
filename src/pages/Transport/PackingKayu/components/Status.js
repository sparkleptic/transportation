import React from 'react';
import {Button, Chip, Typography} from 'material-ui';
import {Add} from 'material-ui-icons';
import {Route, Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import {styles} from '../../../css';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';

class Status extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>

        <Grid container className={classes.rootGrid} >
          <Grid item xs={12}>
            <Typography variant="title">Packing Kayu Status</Typography>
          </Grid>
        </Grid>

        <Grid container className={classes.rootGrid} style={{marginTop:'20px'}} >
          <Grid item xs={7}>
            <Chip label="ON PROCESS" className={classes.chip} avatar={<Avatar className={classes.packingkayuStatusCount}>{this.props.countOnProcess}</Avatar>} />
          </Grid>

          <Grid item xs={5}>
            <Chip label="DONE" className={classes.chip} avatar={<Avatar className={classes.packingkayuStatusCount}>{this.props.countOnCount}</Avatar>}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Status);