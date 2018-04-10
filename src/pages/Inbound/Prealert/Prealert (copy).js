// @flow

import React from 'react';
import {View} from 'react-native';
import {Typography, Tabs, Tab, Grid, Paper, Button} from 'material-ui';
import AddIcon from 'material-ui-icons/Add';

import PrealertList from './PrealertTable/Prealert';

export default class InboundPrealertList extends React.Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={{flex: 1, paddingHorizontal: 60}}>
        <View style={{marginVertical: 40}}>
          <Grid container spacing={24} justify={'space-between'}>
            <Grid item sm={3}>
              <Typography variant="title">Manifest List</Typography>
            </Grid>
          </Grid>
        </View>
        <Paper>
          <View style={{paddingHorizontal: 20, paddingTop: 30}}>
            <PrealertList />
          </View>
        </Paper>
      </View>
    );
  }
}
