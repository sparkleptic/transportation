// @flow

import React from 'react';
import {View, Text, Image} from 'react-native';
import {Typography} from 'material-ui';

export default function Placeholder() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          padding: 30,
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Bag Number: BAGXXXX</Text>
        <Text>Generate & Print</Text>
      </View>
      <Image
        source={require('../../../../assets/images/bagging-placeholder.png')}
        style={{
          width: 300,
          height: 300,
        }}
      />
      <View style={{marginVertical: 20}}>
        <Typography variant="title" align="center">
          Scan barcode untuk melakukan bagging
        </Typography>
      </View>
    </View>
  );
}
