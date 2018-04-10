import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Checkbox, Tooltip} from 'material-ui';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

class EnhancedIregularityTableHead extends Component {
  createSortHandler = (property) => (event) => {
    this.props.onSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;
    const columnData = [
      /*{ id: 'date', numeric: false, disablePadding: false, label: 'Date' },
            { id: 'time', numeric: false, disablePadding: false, label: 'Time' },*/
      {id: 'smu', numeric: false, disablePadding: true, label: 'SMU #'},
      {id: 'etd', numeric: false, disablePadding: false, label: 'ETD'},
      {id: 'eta', numeric: false, disablePadding: false, label: 'ETA'},
      {id: 'delay_day', numeric: false, disablePadding: false, label: 'Delay (day)'},
    ];

    return (
      <TableHead>
        <TableRow>
          {columnData.map((column, key) => {
            return (
              <TableCell
                key={key}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedIregularityTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  // onSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default EnhancedIregularityTableHead;
