import React from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Table, { TableCell, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import { LinearProgress } from 'material-ui/Progress';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';

import FilterListIcon from 'material-ui-icons/FilterList';

import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'

const styles = theme => ({
  root: {
    width: '100%',
  },
  cardContent: {
    overflowX: 'auto',
    paddingLeft: 0,
    paddingRight: 0
  },
});

class Comp extends React.Component {

  render() {
    const { classes, className, title, columns=[], data=[], search, loading, order, orderBy, rowsPerPage, page, total } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Card className={classNames(classes.root, className)}>
        <CardHeader title={title}>
          <FormControl>
            <InputLabel>Search</InputLabel>
            <Input
              value={search}
              onChange={this.handleChangeSearch}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={this.handleClickSearch}>
                    <FilterListIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </CardHeader>
        <CardContent className={classes.cardContent}>
          {loading && <LinearProgress variant="query" />}
          <Table>
            <TableHeader
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              columns={columns}
            />
            <TableBody
              columns={columns}
              data={data}
              page={page}
              rowsPerPage={rowsPerPage}
              onClickRow={this.handleClickRow}
            />
            <TableFooter
              col={columns.length}
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Table>
        </CardContent>
      </Card>
    );
  }

  handleRequestSort = (event, newOrderBy) => {
    const { orderBy, order, onRequestSort=()=>{} } = this.props;

    const newOrder = orderBy === newOrderBy && order === 'desc' ? 'asc' : 'desc';
    const result = onRequestSort({
      order: newOrder,
      orderBy: newOrderBy
    });
  };

  handleClickRow = (event, item, index) => {
    const { onClickRow=()=>{} } = this.props;

    onClickRow(item, index);
  };

  handleChangeSearch = (event) => {
    const { onChangeSearch=()=>{} } = this.props;

    onChangeSearch({
      search: event.target.value
    });
  };

  handleClickSearch = (event) => {
    const { onClickSearch=()=>{} } = this.props;

    onClickSearch();
  }

  handleChangePage = (event, page) => {
    const { onChangePage=()=>{} } = this.props;

    const result = onChangePage({
      page
    });
  };

  handleChangeRowsPerPage = event => {
    const { onChangeRowsPerPage=()=>{} } = this.props;
    const result = onChangeRowsPerPage({
      rowsPerPage: event.target.value
    });
  };
}

export default withStyles(styles)(Comp);