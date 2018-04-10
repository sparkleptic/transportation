// @flow

import React from 'react';
import {TextField} from 'material-ui';
import NumberFormat from 'react-number-format';

type Props = {
  value: number,
  onTextChange: (value: number) => void,
};

export default function FormattedNumberTextField(props: Props) {
  let {value, onTextChange, ...otherProps} = props;
  return (
    <NumberFormat
      customInput={TextField}
      value={value}
      onValueChange={({floatValue: value}) => {
        if (!isNaN(value)) {
          onTextChange(value);
        }
      }}
      thousandSeparator="."
      decimalSeparator=","
      {...otherProps}
    />
  );
}
