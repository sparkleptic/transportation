// @flow

import React from 'react';
import {TableBody, TableRow, TableCell, Typography} from 'material-ui';
import {ScrollView, ActivityIndicator, StyleSheet} from 'react-native';

type Props = {
  data: Array<any>,
  columnLength?: number,
  noDataPlaceholderText?: string,
  style?: Object,
  isLoading?: boolean,
  render: (datum: any, index: number) => ReactNode,
};

const NO_DATA_PLACEHOLDER_TEXT = 'No Data Available';

export default function TableBodyComponent(props: Props) {
  let {
    data,
    render,
    noDataPlaceholderText,
    columnLength,
    style,
    isLoading,
    ...otherProps
  } = props;

  let tableContent;

  if (isLoading) {
    tableContent = (
      <TableRow>
        <TableCell colSpan={columnLength || 1} style={styles.placeholder}>
          <ActivityIndicator size="large" animating />
        </TableCell>
      </TableRow>
    );
  } else if (data.length === 0) {
    tableContent = (
      <TableRow>
        <TableCell colSpan={columnLength || 1} style={styles.placeholder}>
          <Typography variant="subheading" style={{textAlign: 'center'}}>
            {noDataPlaceholderText || NO_DATA_PLACEHOLDER_TEXT}
          </Typography>
        </TableCell>
      </TableRow>
    );
  } else {
    tableContent = data.map((datum, index) => {
      return render(datum, index);
    });
  }

  return (
    <TableBody style={{overflow: 'scroll', ...style}} {...otherProps}>
      {tableContent}
    </TableBody>
  );
}

const styles = {
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    paddingTop: 20,
    paddingBottom: 20,
  },
};
