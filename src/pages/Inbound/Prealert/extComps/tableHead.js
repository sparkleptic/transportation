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
      {id: 'type', numeric: false, disablePadding: true, label: 'Type'},
      {id: 'from', numeric: false, disablePadding: true, label: 'From'},
      {id: 'menifest_no.', numeric: false, disablePadding: true, label: 'Menifest No.'},
      {id: 'menifest', numeric: false, disablePadding: true, label: '# Menifest'},
      {id: 'bag', numeric: false, disablePadding: true, label: 'Bag'},
      {id: 'weight_kg', numeric: false, disablePadding: true, label: 'Weight (Kg)'},
      {id: 'vehcile_no', numeric: false, disablePadding: true, label: 'Vehcile No'},
      {id: 'driver', numeric: false, disablePadding: true, label: 'Driver'},
      {id: 'eta', numeric: false, disablePadding: true, label: 'ETA'},
      {id: 'etd', numeric: false, disablePadding: true, label: 'ETD'},
      {id: 'landed', numeric: false, disablePadding: true, label: 'Landed'},
      {id: 'arrived', numeric: false, disablePadding: true, label: 'Arrived'},
      {id: 'arrived', numeric: false, disablePadding: true, label: ''},
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

EnhancedInboundTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default EnhancedInboundTableHead;
