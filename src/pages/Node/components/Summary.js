// @flow

import React from 'react';
import {View} from 'react-native';
import {Typography} from 'material-ui';

import type {SummaryItem} from '../../../data/node/Node-type';

type Props = {
  data: Array<SummaryItem>,
  totalAtFirst?: boolean,
};

export default function Summary(props: Props) {
  let {data, totalAtFirst} = props;
  let sortedData = [...data];
  if (totalAtFirst) {
    let totalIndex = data.findIndex(
      (item) => item.key.toLowerCase() === 'total',
    );
    if (totalIndex > -1 && totalIndex !== 0) {
      let removed = sortedData.splice(totalIndex, 1);
      sortedData = [removed[0], ...sortedData];
    }
  }
  return (
    <View style={{flexDirection: 'row', paddingVertical: 15}}>
      {sortedData.map(({key, value}) => {
        return (
          <View key={key} style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <Typography
              variant="subheading"
              style={{marginRight: 5}}
            >{`${key}:`}</Typography>
            <Typography variant="subheading" style={{fontWeight: 'bold'}}>
              {value}
            </Typography>
          </View>
        );
      })}
    </View>
  );
}
