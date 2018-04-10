// @flow

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Typography} from 'material-ui';
import styles from '../styles';

type LabelProps = {
  children: string,
  data: ?string,
};

function Label(props: LabelProps) {
  let {children, data, ...otherProps} = props;
  return (
    <View style={styles.label}>
      <Typography style={{marginBottom: 3}} variant="caption">
        {children}
      </Typography>
      <Typography variant="body3">{data ? data : 'N/A'}</Typography>
    </View>
  );
}

function LabelAfterTitle(props: LabelProps) {
  let {children, data} = props;
  return (
    <View style={[styles.label, styles.labelAfterTitle]}>
      <Typography variant="body3">{data ? data : 'N/A'}</Typography>
    </View>
  );
}

export function LabelTitle(props: LabelProps) {
  let {children, data} = props;
  return (
    <View style={styles.labelTitle}>
      <Typography style={StyleSheet.flatten(styles.title)} variant="title">
        {children}
      </Typography>
      <LabelAfterTitle data={data}>Service</LabelAfterTitle>
    </View>
  );
}

export function LabelPrice(props: LabelProps) {
  let {children, data} = props;
  return (
    <View style={styles.labelPrice}>
      <Typography
        style={StyleSheet.flatten(styles.priceCount)}
        variant="caption"
      >
        {children}
      </Typography>
      <Typography
        style={StyleSheet.flatten(styles.priceCount)}
        variant="caption"
      >
        {data ? data : 'N/A'}
      </Typography>
    </View>
  );
}

export function LabelPriceTotal(props: LabelProps) {
  let {children, data} = props;
  return (
    <View style={styles.labelPrice}>
      <Typography
        style={StyleSheet.flatten(styles.priceCount)}
        variant="Subheading"
      >
        {children}
      </Typography>
      <Typography
        style={StyleSheet.flatten(styles.priceCount)}
        variant="Subheading"
      >
        {data ? data : 'N/A'}
      </Typography>
    </View>
  );
}

export default Label;
