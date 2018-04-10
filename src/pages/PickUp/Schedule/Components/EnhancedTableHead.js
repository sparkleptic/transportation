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
  
  createSortHandler = (property) => (event) => this.props.onRequestSort(event, property);

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    const columnData = [
      {id: 'day', numeric: false, disablePadding: false, label: 'Day'},
      {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
      {id: 'courier', numeric: false, disablePadding: false, label: 'Courier'},
      {id: 'status', numeric: false, disablePadding: false, label: 'Status'},
      {id: 'editButton', numeric: false, disablePadding: false, label: 'Actions'},
    ];

    return (
      <TableHead>
        <TableRow>
          { columnData.map((column) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              > {column.label}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected:      PropTypes.number.isRequired,
  rowCount:         PropTypes.number.isRequired,

  onRequestSort:    PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  
  order:            PropTypes.string.isRequired,
  orderBy:          PropTypes.string.isRequired,
};
export default EnhancedTableHead;
