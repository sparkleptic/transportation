// @flow

import React from 'react';
import {View, Text} from 'react-native';
import Summary from './Summary';

import type {InventoryState} from '../../../data/node/Inventory-type';

type Props = {
  data: InventoryState,
};

export default function InventoryDetail(props: Props) {
  return (
    <View style={{height: 50}}>
      <Summary data={props.data.summaryList} />
    </View>
  );
}
