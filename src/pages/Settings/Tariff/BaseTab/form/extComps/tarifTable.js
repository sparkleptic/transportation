import React, {Component} from 'react';
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  FormControl,
} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import Button from 'material-ui/Button/Button';

import TariffRow from './TariffRow';

class TarifTable extends Component {
  constructor() {
    super();
    this.state = {
      TableCellArr: [{min: 0, max: 99999, rp: undefined, unit: undefined}],
    };
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate = (index, item) => {
    const {TableCellArr} = this.state;
    TableCellArr[index] = item;
    return this.setState({TableCellArr});
  };
  handleAddRow = () => {
    const {TableCellArr} = this.state;
    const item = {
      min: TableCellArr[TableCellArr.length - 1].max,
      max: 99999,
      rp: undefined,
      unit: undefined,
    };
    return this.setState({TableCellArr: (TableCellArr || []).concat(item)});
  };
  render() {
    const {TableCellArr} = this.state;
    return (
      <Table style={{minWidth: 700}}>
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Rp</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {TableCellArr.map((item, index) => {
            return (
              <TariffRow
                canAddNew={index === TableCellArr.length - 1}
                rowIndex={index}
                key={'Tariff' + index}
                min={item.min}
                max={item.max}
                handleUpdate={this.handleUpdate}
                handleAddRow={this.handleAddRow}
              />
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
export default TarifTable;
