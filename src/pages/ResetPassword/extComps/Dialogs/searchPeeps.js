import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import {Paper} from 'material-ui';
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

let index = 0;
function createData(ID, name, address, phone) {
  index += 1;
  return {index, ID, name, address, phone};
}

// const data = [
//     createData('JLC-123456', 'Muhammad Alif', 'Jalan Raya Dramaga Komp. Dramaga Cantik K-32, Bogor, 16680', '085612345678'),
//     createData('COR-123456', 'Bank Muhammad', 'Jalan Raya Dramaga Komp. Dramaga Cantik K-32, Bogor, 16680', '02123456879'),
//     createData('JLC-123451', 'Wildan Muhammad', 'Jalan Raya Dramaga Komp. Dramaga Cantik K-32, Bogor, 16680', '08563482910'),
// ];

const ClickableRow = (props) => {
  return (
    <TableRow hover={true} tabIndex={props.index} classes={{root: props.classes.tableRow}} onClick={() => props.handleRowClick({value: props.n})} onKeyPress={(e) => e.key === 'Enter' && props.handleRowClick({value: props.n})}>
      {/*<TableCell>{props.n.customer_id}</TableCell>*/}
      <TableCell>{props.n.customer_name}</TableCell>
      <TableCell>{props.n.address}</TableCell>
      <TableCell>{props.n.cust_phone}</TableCell>
      <TableCell>{props.n.customer_code}</TableCell>
    </TableRow>
  );
};

const SearchPeeps = (props) => {
  const {
    openDialog,
    handleOpenDialog,
    classes,
    dataPengirim,
    handleChangeText,
    handleRowClick,
  } = props;
  return (
    <Dialog
      open={openDialog}
      onClose={() => handleOpenDialog('openSearchDialog')}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Search JLC/Corp ID or Phone Number
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="JLC/Corp ID or Phone Number"
          fullWidth
          onKeyUp={handleChangeText}
        />
      </DialogContent>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/*<TableCell>ID</TableCell>*/}
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>JLC / Corp ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataPengirim.map((n, index) => {
              return (
                <ClickableRow index={0}
                  classes={classes}
                  n={n}
                  key={n.customer_id}
                  handleRowClick={handleRowClick}
                />
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </Dialog>
  );
};
export default withStyles(Styles)(SearchPeeps);
