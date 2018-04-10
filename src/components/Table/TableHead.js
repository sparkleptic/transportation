// @flow

import React, {Component} from 'react';
import {Checkbox, Tooltip} from 'material-ui';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

type Column = {
  id: string,
  label: string,
  numeric?: boolean,
  padding?: 'default' | 'checkbox' | 'dense' | 'none',
  sortable?: boolean,
  otherColumnProps?: {[key: string]: any},
};

type SortType = 'asc' | 'desc';

type Props = {
  columnList: Array<Column>,
  onSortClick?: (sortType: SortType, columnID: string) => void,
};

type State = {
  activeOrder?: {
    columnID: string,
    sortType: SortType,
  },
};

const DEFAULT_SORT = 'asc';

class TableHeadComponent extends Component<Props, State> {
  state = {};
  render() {
    let {columnList, onSortClick} = this.props;
    let {activeOrder} = this.state;

    return (
      <TableHead>
        <TableRow>
          {columnList.map((column, index) => {
            let cellProps = column.otherColumnProps || {};
            let isNumeric = !!column.numeric;
            let style = {fontSize: 'inherit'};
            if (cellProps.style) {
              style = {
                ...style,
                ...cellProps.style,
              };
            }
            return (
              <TableCell
                key={index}
                padding={column.padding || (isNumeric ? 'none' : 'dense')}
                sortDirection={
                  activeOrder && activeOrder.columnID === column.id
                    ? activeOrder.sortType
                    : false
                }
                style={style}
                {...cellProps}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={
                      (activeOrder && activeOrder.columnID === column.id) ||
                      false
                    }
                    direction={activeOrder && activeOrder.sortType}
                    onClick={() => {
                      let sortType = DEFAULT_SORT;
                      if (activeOrder && activeOrder.columnID === column.id) {
                        sortType =
                          activeOrder.sortType === 'asc' ? 'desc' : 'asc';
                      }

                      onSortClick && onSortClick(sortType, column.id);

                      this.setState({
                        activeOrder: {
                          columnID: column.id,
                          sortType: sortType,
                        },
                      });
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default TableHeadComponent;
