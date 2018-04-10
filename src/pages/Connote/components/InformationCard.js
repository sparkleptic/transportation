// @flow
/* eslint-enable no-unused-vars, no-console */

import React, {Component} from 'react';
import {Paper, Typography} from 'material-ui';
import {View, Image, StyleSheet, Text} from 'react-native';
import styles from './styles';
import Label, {LabelPrice, LabelPriceTotal} from './core-ui/Label';
import Separator from './core-ui/Separator';
import type {ConnoteSearchData} from '../../../data/connoteSearch/ConnoteSearch-type';
import {formatWithRupiah} from '../../../helpers/formatNumber';

type FromCardProps = {
  data: ConnoteSearchData | null,
};

function InformationCard(props: FromCardProps) {
  let dataFinal: Object = {};
  if (props.data) {
    let {data} = props;
    dataFinal = data;
  }
  let {
    description,
    insuredValue,
    amountInsurance,
    amountPackingFee,
    amountSurcharge,
    serviceCode,
    remarks,
    actualWeight,
    chargeableWeight,
    koliQty,
    totalPrice,
  } = dataFinal;
  return (
    <Paper style={StyleSheet.flatten([styles.paper, styles.paperInformation])}>
      <Typography style={StyleSheet.flatten(styles.title)} variant="title">
        Information
      </Typography>
      <View style={{flexDirection: 'row'}}>
        <Label data={description}>Deskripsi Barang</Label>
        <Label data={insuredValue ? formatWithRupiah(insuredValue) : null}>
          Insured Value
        </Label>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Label data={serviceCode}>Service</Label>
        <Label data={remarks}>Remarks</Label>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Label data={actualWeight ? fmtKg(chargeableWeight) : null}>
            Actual Weight
          </Label>
          <Label data={chargeableWeight ? fmtKg(chargeableWeight) : null}>
            Charged Weight
          </Label>
          <Label data={koliQty ? fmtPcs(koliQty) : null}>Jumlah</Label>
        </View>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <LabelPrice
            data={amountPackingFee ? formatWithRupiah(amountPackingFee) : null}
          >
            Packing Kayu
          </LabelPrice>
          <LabelPrice
            data={amountInsurance ? formatWithRupiah(amountInsurance) : null}
          >
            Insurance
          </LabelPrice>

          <LabelPrice
            data={amountSurcharge ? formatWithRupiah(amountSurcharge) : null}
          >
            Subtotal
          </LabelPrice>
          <Separator />
          <LabelPriceTotal data={totalPrice}>Total (2)</LabelPriceTotal>
        </View>
      </View>
    </Paper>
  );
}

function fmtKg(value: string | number) {
  return `${value} kg`;
}

function fmtPcs(value: string | number) {
  return `${value} pcs`;
}

export default InformationCard;
