import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'material-ui';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';

class EnhancedTableHead extends Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {order, orderBy, columnData} = this.props;
    return (
      <TableHead>
        <TableRow>
          {columnData.map((column, index) => {
            return (
              <TableCell
                key={column.id}
                padding="none"
                sortDirection={orderBy === column.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          })}
          <TableCell numeric={true}>
            Status
          </TableCell>
          <TableCell>Action</TableCell>
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
