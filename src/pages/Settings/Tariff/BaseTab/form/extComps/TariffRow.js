import React, {Component} from 'react';
import {TableCell, TableRow, FormControl} from 'material-ui';
import Input, {InputAdornment} from 'material-ui/Input';
import Button from 'material-ui/Button/Button';

class TariffRow extends Component {
  constructor(props) {
    super();
    this.state = {
      minWeight: props.min,
      maxWeight: props.max,
      rp: props.rp,
      unit: props.unit,
    };
  }
  handleAddRow = () => {
    this.props.handleAddRow();
  };
  handleChange = (name) => (event) => {
    this.setState(
      {
        [name]: event.target.value,
      },
      () => {
        this.props.handleUpdate(this.props.rowIndex, {
          min: this.state.minWeight,
          max: this.state.maxWeight,
          rp: this.state.rp,
          unit: this.state.unit,
        });
      },
    );
  };
  render() {
    const {minWeight, maxWeight, rp, unit} = this.state;
    return (
      <TableRow>
        <TableCell>
          <FormControl>
            <Input
              id="minWeight"
              type="number"
              value={minWeight}
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            />
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl>
            <Input
              id="maxWeight"
              type="number"
              value={maxWeight}
              onChange={this.handleChange('maxWeight')}
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            />
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl>
            <Input
              id="rp"
              type="number"
              value={rp}
              onChange={this.handleChange('rp')}
              endAdornment={<InputAdornment position="end">Rp</InputAdornment>}
            />
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl>
            <Input
              id="unit"
              type="number"
              value={unit}
              onChange={this.handleChange('unit')}
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            />
          </FormControl>
        </TableCell>
        {this.props.canAddNew ? (
          <TableCell>
            <Button onClick={this.handleAddRow}>+&nbsp;Add</Button>
          </TableCell>
        ) : null}
      </TableRow>
    );
  }
}
export default TariffRow;
