import React from 'react';
import {Route, Link} from 'react-router-dom';
import classNames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles/index';
import {styles} from '../../../css';
import Tooltip from 'material-ui/Tooltip';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid/Grid';
import IconButton from 'material-ui/IconButton';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import EnhancedInboundTableHead from '../extComps/tableHead';

import {makeBreadcrumbs} from '../../../reusableFunc';
import UserLinearProgress from '../../../UserLinearprogress';

class PrealertEdit extends React.Component {
  
  renderToolbar() {
    return(
      <Toolbar>
        <div>
          <Typography type="subheading"><strong>List of Bags</strong></Typography>
        </div>
          <FormGroup row spacing={24}>
            <FormControlLabel
              control={
                <Checkbox
                />
              }
              label="Auto Un-Bagged"
            />
          </FormGroup>
      </Toolbar>
    );
  }
  
  render() {
    const {classes, match, location} = this.props;
    const data = [];
    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Inbound / Pre-alert Inbound /
              <span className={classes.transactionBreadcrumbs}> Manifest { this.props.id !== 'scan' ? `#${this.props.id}` : ''}</span>
            </div>
            <br />
            <p className={classes.titleWrapper}>Manifest {this.props.id !== 'scan' ? `#${this.props.id}` : ''}</p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={8}>
              <Paper className={classes.formWrapper}>
                {this.renderToolbar()}
                {/*<EnhancedTableToolbar numSelected={selected.length} handleSearch={(e) => this.handleSearch(e)} value={this.state.searchValue}  handleChange={(e) => this.handleChange(e)} match={match}/>*/}
                <div className={classes.tableWrapper}>
                  {/*<UserLinearProgress />*/}
                  <Table className={classes.table}>
                    {/*<EnhancedInboundTableHead*/}
                      {/*numSelected={selected.length}*/}
                      {/*order={order}*/}
                      {/*orderBy={orderBy}*/}
                      {/*onSelectAllClick={this.handleSelectAllClick}*/}
                      {/*onSort={this.handleSort}*/}
                      {/*rowCount={filterData.length}*/}
                    {/*/>*/}
                    <TableBody>
                      {
                        _.map(_.get(data, 'data', []), (n, key) => {
                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={key}
                            >
                              <TableCell padding="none">{_.get(n, 'manifest_type.manifest_type_name', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'from.node_name', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'manifest_id', 0)}</TableCell>
                              <TableCell padding="none">{_.get(n, 'bag_count', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'weight_kg', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'police_no', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'driver_name', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'eta', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'etd', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'landed', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'arrived', '')}</TableCell>
                            </TableRow>
                          );
                        })
                      }
                    </TableBody>
                  </Table>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.formWrapper}>
                <Toolbar>
                  <Typography type="subheading"><strong>Manifest Information</strong></Typography>
                </Toolbar>
                {/*<EnhancedTableToolbar numSelected={selected.length} handleSearch={(e) => this.handleSearch(e)} value={this.state.searchValue}  handleChange={(e) => this.handleChange(e)} match={match}/>*/}
                <div className={classes.tableWrapper}>
                  {/*<UserLinearProgress />*/}
                  <Table className={classes.table}>
                    {/*<EnhancedInboundTableHead*/}
                    {/*numSelected={selected.length}*/}
                    {/*order={order}*/}
                    {/*orderBy={orderBy}*/}
                    {/*onSelectAllClick={this.handleSelectAllClick}*/}
                    {/*onSort={this.handleSort}*/}
                    {/*rowCount={filterData.length}*/}
                    {/*/>*/}
                    <TableBody>
                      {
                        _.map(_.get(data, 'data', []), (n, key) => {
                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={key}
                            >
                              <TableCell padding="none">{_.get(n, 'manifest_type.manifest_type_name', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'from.node_name', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'manifest_id', 0)}</TableCell>
                              <TableCell padding="none">{_.get(n, 'bag_count', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'weight_kg', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'police_no', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'driver_name', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'eta', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'etd', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'landed', '')}</TableCell>
                              <TableCell padding="none">{_.get(n, 'arrived', '')}</TableCell>
                            </TableRow>
                          );
                        })
                      }
                    </TableBody>
                  </Table>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default (withStyles(styles)(PrealertEdit));