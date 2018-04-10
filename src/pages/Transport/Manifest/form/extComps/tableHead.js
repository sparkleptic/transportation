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
      {id: 'id', numeric: false, disablePadding: true, label: 'No'},
      {id: 'bag_num', numeric: false, disablePadding: false, label: 'Bag'},
      {id: 'bag_weight', numeric: false, disablePadding: false, label: 'Weight (Kg)'},
      {id: 'toatl_connote', numeric: false, disablePadding: false, label: 'Total Connote'},
      {id: 'destination', numeric: false, disablePadding: false, label: 'Destination'},
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
};
export default EnhancedInboundTableHead;
