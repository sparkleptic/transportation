import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import {
  TableCell,
  TableBody,
  TableRow,
} from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
});

class TableBodyComp extends React.Component {

  render() {
    const { classes, columns, data, page, rowsPerPage } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <TableBody>
        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
          return (
            <TableRow
              hover
              onClick={event => this.handleClickRow(event, item, index)}
              tabIndex={-1}
              key={index}
            >
              {columns.map((col, index) => (
                <TableCell
                  {...{
                    ...(col.props || {}),
                    ...(col.bodyProps || {}),
                  }}
                  key={index}
                >
                  {typeof col.data === 'function' ? col.data.call(this, item, index) : item[col.id]}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{height: 49 * emptyRows}}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }

  handleClickRow = (...args) => {
    this.props.onClickRow(...args)
  };
};

export default withStyles(styles)(TableBodyComp);
