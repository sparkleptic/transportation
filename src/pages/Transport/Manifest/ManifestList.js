// @flow

import React from 'react';
import {Link} from 'react-router-dom';
import {View} from 'react-native';
import {Typography, Tabs, Tab, Grid, Paper, Button} from 'material-ui';
import AddIcon from 'material-ui-icons/Add';

import ManifestList from './ManifestTable/ManifestList';

export default class TransportManifestList extends React.Component<Props, State> {
  state = {};

  render() {
    const {match} = this.props;
    const {url} = match;
    return (
      <View style={{flex: 1, paddingHorizontal: 60}}>
        <View style={{marginVertical: 40}}>
          <Grid container spacing={24} justify={'space-between'}>
            <Grid item sm={3}>
              <span style={{color: "#323990", margin: 0, "fontSizee": 14}}> Transport /</span>
              <span style={{color: "black", margin: 0, "fontSize": 14}}> Menifest</span>
              <br/>
              <Typography variant="title"> Manifest</Typography>
            </Grid>
            <Grid item sm={3} style={{textAlign: 'right'}}>
              <Button
                style={{float: 'right', width: '8.5%'}}
                component={Link}
                to={`${url}/create`}
                variant="raised"
                color="primary"
              >
              <AddIcon />&nbsp;New
            </Button>
              {/*<Button variant="raised" color="primary" style={{color: 'white'}} onClick={() => {}}><AddIcon />NEW</Button>*/}
            </Grid>
          </Grid>
        </View>

        <Paper>
          <View style={{paddingHorizontal: 20, paddingTop: 30}}>
            <ManifestList />
          </View>
        </Paper>
      </View>
    );
  }
}
