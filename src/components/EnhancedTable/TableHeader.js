import React from 'react';
import { withStyles } from 'material-ui/styles';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import Checkbox from 'material-ui/Checkbox';

const styles = (theme) => ({

})

class TableHeader extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, columns } = this.props;


    return (
      <TableHead>
        <TableRow>
          {columns.map((col, index) => {
            const { props={}, headProps={} } = col
            return (
              <TableCell
                {...{
                  ...props,
                  ...headProps,
                }}
                key={index}
                sortDirection={orderBy === col.id ? order : false}
              >
                <Tooltip
                  title={props.sortable ? 'Sort' : ''}
                  placement={props.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={order}
                    onClick={this.createSortHandler(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(styles)(TableHeader);
