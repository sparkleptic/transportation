// @flow

import React from 'react';
import {TableFooter, TableRow, TablePagination} from 'material-ui/Table';

type Props = {
  rowsPerPage: number,
  activePage: number, // NOTE: start from 0
  dataLength: number,
  onChangePage: (nextPage: number) => void,
  onChangeRowsPerPage: (newRowsPerPage: number) => void,
};

export const DEFAULT_ROWS_PER_PAGE = 5;

export default function TableFooterComponent(props: Props) {
  let {
    rowsPerPage,
    dataLength,
    activePage,
    onChangePage,
    onChangeRowsPerPage,
  } = props;
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          count={dataLength || 0}
          rowsPerPage={rowsPerPage}
          page={activePage}
          backIconButtonProps={{
            'aria-label': 'Previous',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next',
          }}
          onChangePage={(event, page) => {
            onChangePage(page);
          }}
          onChangeRowsPerPage={(event) => {
            onChangeRowsPerPage(event.target.value);
          }}
        />
      </TableRow>
    </TableFooter>
  );
}
