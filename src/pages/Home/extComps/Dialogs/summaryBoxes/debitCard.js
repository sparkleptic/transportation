import React, {Component} from 'react';
import {
  Paper,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Divider,
  TextField,
  GridList,
  GridListTile,
} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
const Styles = {
  paper: {
    height: 250,
    backgroundColor: '#F1F4F5',
    boxShadow: 'none',
    borderRadius: 0,
    border: '1px solid #95989A',
    padding:'10px 20px',
  },
};
class Debit_CreditCard extends Component {
  constructor() {
    super();
    this.state = {
      BankGroupee: '',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect = (e) => {
    return this.setState({BankGroupee: e.target.value});
  };
  render() {
    const {methodData, classes, summaryHandler} = this.props;
    const {BankGroupee} = this.state;
    const BankGroup = ['ANZ', 'BCA', 'BRI', 'BNI', 'Mandiri'];
    return (
      <Paper style={Styles.paper}>
        <GridList cols={2} cellHeight="auto" classes={{root: classes.listRoot}}>
          <GridListTile cols={1}>
            <p> Magentic Number </p>
          </GridListTile>
          <GridListTile cols={1}>
            <TextField name="magentic_num" onChange={summaryHandler} />
          </GridListTile>
        </GridList>
        <GridList cols={2} cellHeight="auto" classes={{root: classes.listRoot}}>
          <GridListTile cols={1}>
            <p>Bank</p>
          </GridListTile>
          <GridListTile cols={1}>
            <Select
              value={BankGroupee}
              onChange={this.handleSelect}
              input={<Input name="bank" id="bank-group" />}
              classes={{root: classes.selectionItem}}
            >
              {BankGroup.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </GridListTile>
        </GridList>
        <GridList cols={2} cellHeight="auto" classes={{root: classes.listRoot}}>
          <GridListTile cols={1}>
            <p>Name</p>
          </GridListTile>
          <GridListTile cols={1}>
            <TextField name="name" />
          </GridListTile>
        </GridList>
        <GridList cols={2} cellHeight="auto" classes={{root: classes.listRoot}}>
          <GridListTile cols={1}>
            <p>EDC TRX Number</p>
          </GridListTile>
          <GridListTile cols={1}>
            <TextField name="edc-trx" />
          </GridListTile>
        </GridList>
      </Paper>
    );
  }
}

export default Debit_CreditCard;
