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

class EnhancedInboundTableHead extends Component {
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
      {id: 'agent', numeric: false, disablePadding: false, label: 'Agent'},
      {id: 'address', numeric: false, disablePadding: false, label: 'Address'},
      {id: 'connote', numeric: false, disablePadding: false, label: '#Connote'},
      {id: 'bag', numeric: false, disablePadding: false, label: '#Bag'},
      {id: 'weight', numeric: false, disablePadding: false, label: 'Weight (Kg)'}
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

EnhancedInboundTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default EnhancedInboundTableHead;
