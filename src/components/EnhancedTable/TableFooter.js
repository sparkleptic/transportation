import React from 'react';
import { withStyles } from 'material-ui/styles';
import {
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import Checkbox from 'material-ui/Checkbox';

const styles = (theme) => ({

})

class TableFoot extends React.Component {

  render() {
    const { col, count, rowsPerPage, page, onChangePage, onChangeRowsPerPage } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={col}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

export default withStyles(styles)(TableFoot);
