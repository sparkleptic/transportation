// @flow
/* eslint-enable no-unused-vars, no-console */

import React, {Component} from 'react';
import {Paper, Typography} from 'material-ui';
import {View, Image, StyleSheet, Text} from 'react-native';
import styles from './styles';
import Label, {LabelTitle} from './core-ui/Label';

type FromData = {
  fromName: string,
  fromPhone: string,
  fromStreetAddress: string,
  fromZipCode: string,
  fromTariffCode: string,
};

type FromCardProps = {
  data: Object,
};

function FromCard(props: FromCardProps) {
  const {
    data: {
      fromName,
      fromPhone,
      fromStreetAddress,
      fromZipCode,
      fromTariffCode,
      fromTlc,
    },
  } = props;

  return (
    <Paper style={StyleSheet.flatten(styles.paper)}>
      <LabelTitle data={fromTlc}>From</LabelTitle>
      <Label data={fromName}>Name</Label>
      <Label data={fromPhone}>Phone</Label>
      <Label data={fromStreetAddress}>Alamat Pengirim</Label>
      <View style={{flexDirection: 'row'}}>
        <Label data={fromZipCode}>Kode Pos</Label>
        <Label data={fromTariffCode}>Kode Asal</Label>
      </View>
    </Paper>
  );
}

export default FromCard;
