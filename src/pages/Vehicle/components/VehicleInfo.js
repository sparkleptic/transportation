// @flow

import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Typography} from 'material-ui';

import vehicleLogo from '../../../assets/icons/globalSearch/vehicle.png';

import type {Vehicle} from '../../../data/vehicle/Vehicle-type';

type Props = {
  info: Vehicle,
};

// TODO: show Last Driver data?

export default function VehicleInfo(props: Props) {
  let {info} = props;
  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image source={vehicleLogo} style={styles.vehiclePicture} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <Typography
            variant="display1"
            style={StyleSheet.flatten(styles.title)}
          >
            {info.vehicleName}
          </Typography>
          <Typography
            variant="subheading"
            style={StyleSheet.flatten(styles.field)}
          >
            {info.policeNo}
          </Typography>
        </View>
        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Type
          </Typography>
          <Typography variant="subheading">
            {(info.type && info.type.typeName) || 'N/A'}
          </Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Node
          </Typography>
          <Typography variant="subheading">
            {(info.node && info.node.tariffCode) || 'N/A'}
          </Typography>
        </View>

        {/* <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Last Driver
          </Typography>
          <Typography variant="subheading">{'Padma Nabhan'}</Typography>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  section: {
    marginBottom: 10,
  },
  field: {
    color: 'grey',
  },
  vehiclePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
