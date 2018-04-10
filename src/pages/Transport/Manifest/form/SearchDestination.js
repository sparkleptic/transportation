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

import {getEntityList} from '../../../../actions/entity';

const Styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
  },
  table: {
    minWidth: 200,
  },
});

const WAIT_INTERVAL = 1000;
class SearchDestination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: '', data: []};
    this.timer = null;
  }
  componentWillMount() {
    this.timer = null;
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.search(), WAIT_INTERVAL);
  };
  handleSelect = (row) => (event) => {
    this.props.handleSelect(row);
  };
  search = (key) => {
    return getEntityList(`bag/${this.state.search}`, null).then(
      (response) => {
        const {data} = response.data;
        return this.setState({data});
      },
    );
  };
  render() {
    const {openDialog, handleOpenDialog, classes} = this.props;
    const {search, data} = this.state;

    return (
      <Dialog
        open={openDialog}
        onClose={() => handleOpenDialog('openSearchDialog')}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Search bag number
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Search bag Number"
            fullWidth
            value={search}
            onChange={this.handleChange('search')}
          />
        </DialogContent>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Bag</TableCell>
                <TableCell>Weight(Kg)</TableCell>
                <TableCell>Total Connote</TableCell>
                <TableCell>Destination</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ? 
                <TableRow onClick={this.handleSelect(data)}>
                  <TableCell>1</TableCell>
                  <TableCell padding="none">{data.bag_no}</TableCell>
                  <TableCell padding="none">{data.weight}</TableCell>
                  <TableCell padding="none">{data.connote_qty}</TableCell>
                  <TableCell numeric>{data.destination}</TableCell>
                </TableRow>
                : null}
            </TableBody>
          </Table>
        </Paper>
      </Dialog>
    );
  }
}
export default withStyles(Styles)(SearchDestination);
