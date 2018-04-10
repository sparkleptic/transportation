// @flow
/* eslint-enable no-unused-vars, no-console */

import React, {Component} from 'react';
import {Paper, Typography} from 'material-ui';
import {View, Image, StyleSheet, Text} from 'react-native';
import styles from './styles';
import Label, {LabelTitle} from './core-ui/Label';

type ToData = {
  toName: string,
  toPhone: string,
  toStreetAddress: string,
  toZipCode: string,
  toTariffCode: string,
};

type ToCardProps = {
  data: Object,
};

function ToCard(props: ToCardProps) {
  const {
    data: {toName, toPhone, toStreetAddress, toZipCode, toTariffCode, toTlc},
  } = props;

  return (
    <Paper style={StyleSheet.flatten(styles.paper)}>
      <LabelTitle data={toTlc}>To</LabelTitle>
      <Label data={toName}>Name</Label>
      <Label data={toPhone}>Phone</Label>
      <Label data={toStreetAddress}>Alamat Penerima</Label>
      <View style={{flexDirection: 'row'}}>
        <Label data={toZipCode}>Kode Pos</Label>
        <Label data={toTariffCode}>Kode Asal</Label>
      </View>
    </Paper>
  );
}

export default ToCard;
