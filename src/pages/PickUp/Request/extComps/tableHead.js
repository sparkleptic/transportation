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
    this.props.onRequestSort(event, property);
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
      {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
      {id: 'address', numeric: false, disablePadding: false, label: 'Address'},
      {id: 'phone', numeric: false, disablePadding: false, label: 'Phone'},
      {id: 'courier', numeric: false, disablePadding: false, label: 'Courier'},
      {
        id: 'pickUpTime',
        numeric: false,
        disablePadding: true,
        label: 'Pick Up Time',
      },
      /*{id: 'cash', numeric: true, disablePadding: false, label: 'Cash'},*/
      {id: 'status', numeric: false, disablePadding: true, label: 'Status'},
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default EnhancedTableHead;
