import React from 'react';
import {Button, Chip,TextField} from 'material-ui';
import {Add} from 'material-ui-icons';
import {Route, Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';


import {styles} from '../../css';

import List from './components/List'
import Status from './components/Status'

class PackingKayu extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      masukkan_kode_connote:''
    };
  }

  componentDidMount(){

  }



  render() {
    // console.log('-----arun')
    // console.log( this.props )
    const {classes, match, location} = this.props;
    const {url} = match;

let data = [{
      id:'1',
      awb: 'arun',
      kgbefore: '1',
      kgafter: '2',
      status: 'on process'
    },{
      'id':'2',
      awb: 'arun',
      kgbefore: '3',
      kgafter: '3',
      status: 'done'
    }]


    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Transport /
              <span className={classes.transactionBreadcrumbs}> Packing Kayu</span>
            </div>
            <br />
            <p className={classes.titleWrapper}>Packing Kayu</p>
            <br/>
            <TextField
              autoFocus={true}
              label="Masukkan Kode Connote"
              placeholder="Masukkan Kode Connote"
              value={this.state.masukkan_kode_connote}
              onChange={(e) => { this.setState({ masukkan_kode_connote: e.target.value})}}
              matchrgin="normal"
              type="text"
            />
          </div>
        </div>
        <div className={classes.root}>
          <Grid container className={classes.rootGrid} >
            <Grid item xs={9}>
              <Paper className={classes.formWrapper}>
                <List
                  data={data}
                />
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper className={classes.formWrapper}>
                <Status
                  countOnProcess={5}
                  countOnCount={10}
                />
              </Paper>
            </Grid>
          </Grid>

          </div>


      </div>
    )
  }
}

export default withStyles(styles)(PackingKayu);