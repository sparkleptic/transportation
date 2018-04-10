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
      {id: 'id', numeric: false, disablePadding: true, label: 'Id'},
      {id: 'connote', numeric: false, disablePadding: true, label: 'Connote'},
      {id: 'receiver', numeric: false, disablePadding: false, label: 'Receiver'},
      {id: 'address', numeric: false, disablePadding: false, label: 'Address'},
      {id: 'phone', numeric: false, disablePadding: false, label: 'Phone'},
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
