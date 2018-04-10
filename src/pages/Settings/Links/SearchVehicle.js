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
import Checkbox from 'material-ui/Checkbox';
import {Paper} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';

import {getEntityList} from '../../../actions/entity';

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
class SearchVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: '', selected: [], data: []};
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
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({selected: this.state.data.map((n, index) => index)});
      return;
    }
    this.setState({selected: []});
  };
  handleClick = (event, id) => {
    const {selected} = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({selected: newSelected});
  };

  handleSelect = (event) => {
    const rows = [];
    this.state.selected.map((n) => rows.push(this.state.data[n]));
    this.props.handleSelect(rows);
  };
  search = (key) => {
    return getEntityList(`vehicle?s=${this.state.search}`, null).then(
      (response) => {
        const {data} = response.data;
        return this.setState({data, selected: []});
      },
    );
  };
  isSelected = (id) => this.state.selected.indexOf(id) !== -1;
  render() {
    const {openDialog, handleOpenDialog, classes} = this.props;
    const {selected, search, data, numSelected} = this.state;
    const {order, orderBy} = this.props;
    const rowCount = data.length;
    return (
      <Dialog
        open={openDialog}
        onClose={() => handleOpenDialog('openSearchDialog')}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Search Type, Registration Number
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Truck"
            fullWidth
            value={search}
            onChange={this.handleChange('search')}
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{marginRight: 17}}
            variant="raised"
            onClick={() => handleOpenDialog('openSearchDialog')}
            color="primary"
          >
            Search
          </Button>
        </DialogActions>
        <DialogContent>
          <Table className={classes.table} style={{maxHeight: 250}}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={selected.length === rowCount}
                    onChange={this.handleSelectAllClick}
                  />
                </TableCell>

                <TableCell>ID</TableCell>
                <TableCell>Vehicle Type</TableCell>
                <TableCell>Registration Number</TableCell>
                <TableCell>Max Weight</TableCell>
                <TableCell>Max Volume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ? data.map((n, index) => {
                    const isSelected = this.isSelected(index);
                    return (
                      <TableRow
                        onClick={(event) => this.handleClick(event, index)}
                        key={index}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{n.type.type_name}</TableCell>
                        <TableCell>{n.police_no}</TableCell>
                        <TableCell>{n.max_weight}</TableCell>
                        <TableCell>{n.max_volume}</TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            style={{marginRight: 17}}
            variant="raised"
            onClick={this.handleSelect}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default withStyles(Styles)(SearchVehicle);
