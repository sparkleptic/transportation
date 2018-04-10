import React, {Component} from 'react';
import {Button, Chip, TextField, MenuItem, Dialog, DialogTitle, DialogActions, Paper} from 'material-ui';
import DialogContent from 'material-ui/Dialog/DialogContent';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import withStyles from 'material-ui/styles/withStyles';
const Styles = (theme) => ({
  root: {
    width: 600,
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
    height: '80vh',
  },
  table: {
    minWidth: 200,
  },
  selected: {
    color: '#FF0000',
  },
  tableRow: {
    '&:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0.07)',
    },
  }
});

const SearchNodes = (props) =>
  <Dialog
    open={props.open}
    onClose={() => props.close('openDialog')}
    aria-labelledby="service-title"
    aria-describedby="service-content"
    classes={{paperWidthSm: props.classes.dialogWrapper}}
  >
    <DialogTitle id="service-title">Search Nodes</DialogTitle>
    <DialogContent id="service-content">
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label=" "
        fullWidth
        onKeyUp={props.handleChangeText}
      />
    </DialogContent>
    <Paper className={props.classes.root}>
      <Table className={props.classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Agent Name</TableCell>
            <TableCell>Node Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          props.data && props.data.map((n, index) =>
            <TableRow key={index} hover={true} tabIndex={index} classes={{root: props.classes.tableRow}} onClick={() => props.handleRowClick(n)} onKeyPress={(e) => e.key === 'Enter' && props.handleRowClick(n)}>
              {/*<TableCell>{props.n.customer_id}</TableCell>*/}
              <TableCell>{n.agent_name}</TableCell>
              <TableCell>{n.node_name}</TableCell>
            </TableRow>)
        }
        </TableBody>
      </Table>
    </Paper>
  </Dialog>;
export default withStyles(Styles)(SearchNodes);
