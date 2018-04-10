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

class EnhancedDeliveryTableHead extends Component {
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
      {id: 'node', numeric: false, disablePadding: true, label: 'Node'},
      {id: 'agent_name', numeric: false, disablePadding: true, label: 'Agent'},
      {id: 'address', numeric: false, disablePadding: false, label: 'Address'},
      {id: 'driver', numeric: false, disablePadding: false, label: 'Driver'},
      {id: 'connote', numeric: false, disablePadding: true, label: 'Connote'},
      {id: 'bag', numeric: false, disablePadding: false, label: 'Bag'},
      {id: 'weight_kg', numeric: false, disablePadding: false, label: 'Weight (Kg)'},
      {id: 'status', numeric: false, disablePadding: false, label: 'Status'}
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

EnhancedDeliveryTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default EnhancedDeliveryTableHead;
