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

class EnhancedTableHead extends Component {
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
      {id: 'booking', numeric: false, disablePadding: true, label: 'Booking'},
      {id: 'type', numeric: false, disablePadding: false, label: 'Type'},
      {id: 'airline', numeric: false, disablePadding: false, label: 'Airline'},
      {id: 'koli', numeric: false, disablePadding: false, label: 'Koli'},
      {id: 'wieght', numeric: false, disablePadding: false, label: 'Weight (kg)'},
      {id: 'vihicle', numeric: true, disablePadding: false, label: 'Vihicle'},
      {id: 'destination', numeric: false, disablePadding: true, label: 'Destination'},
      {id: 'datetime', numeric: false, disablePadding: true, label: 'Datetime'},
      {id: 'status', numeric: false, disablePadding: true, label: 'Booking Status'},
      {id: 'editButton', numeric: true, disablePadding: true},
    ];

    return (
      <TableHead>
        <TableRow>
          {columnData.map((column) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                {column.label}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default EnhancedTableHead;
