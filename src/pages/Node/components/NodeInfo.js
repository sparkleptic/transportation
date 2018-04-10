// @flow

import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Typography} from 'material-ui';

import nodeLogo from '../../../assets/icons/globalSearch/node_hd.png';

import type {GlobalSearchNode} from '../../../data/node/Node-type';

type Props = {
  info: GlobalSearchNode,
};

export default function NodeInfo(props: Props) {
  let {info} = props;
  let name = info.pic ? info.pic.firstName : '';
  if (info.pic && info.pic.lastName) {
    name.concat(` ${info.pic.lastName}`);
  }
  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image source={nodeLogo} style={styles.nodePicture} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <Typography
            variant="display1"
            style={StyleSheet.flatten(styles.title)}
          >
            {info.nodeName}
          </Typography>
          <Typography
            variant="subheading"
            style={StyleSheet.flatten(styles.field)}
          >
            {info.tariffCode}
          </Typography>
        </View>
        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Address
          </Typography>
          <Typography variant="subheading">{info.nodeAddress}</Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Phone
          </Typography>
          <Typography variant="subheading">{info.phone}</Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            PIC
          </Typography>
          <Typography variant="subheading">{name}</Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Type
          </Typography>
          <Typography variant="subheading">{`Warehouse`}</Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Parent Node
          </Typography>
          <Typography variant="subheading">{`CGK1234xxx`}</Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Working Hours
          </Typography>
          <Typography variant="subheading">
            {`Mon-Fri 08:00 - 17.00`}
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
  nodePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
