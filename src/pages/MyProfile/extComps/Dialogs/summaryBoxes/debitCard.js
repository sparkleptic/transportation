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
    width: 258,
    height: 483,
    marginLeft: 5,
    marginTop: -7,
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
        <p className={classes.paymentCard}>Debit Card</p>
        <GridList cols={2} cellHeight="auto" classes={{root: classes.listRoot}}>
          <GridListTile cols={2}>
            <p className={classes.amountNchange}> Magentic Number </p>
          </GridListTile>
          <GridListTile cols={2}>
            <TextField
              name="magentic_num"
              className={classes.cardLabel}
              onChange={summaryHandler}
            />
            {/* <p className={classes.cardLabel}>1234 - 5678 - 1234 - 5678</p> */}
            {/* <Divider className={classes.divider} /> */}
          </GridListTile>
          <GridListTile cols={2}>
            <FormControl
              className={classes.formControl}
              classes={{root: classes.rootFormControl}}
            >
              <InputLabel htmlFor="bank-group">Bank</InputLabel>
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
            </FormControl>
          </GridListTile>
          <GridListTile cols={2}>
            <p className={classes.amountNchange}>Name</p>

            <TextField name="name" className={classes.amountNchange} />
          </GridListTile>
          <GridListTile cols={2}>
            <p className={classes.amountNchange}>EDC TRX Number</p>
            <TextField name="edc-trx" className={classes.cardLabel} />
          </GridListTile>
        </GridList>
      </Paper>
    );
  }
}

export default Debit_CreditCard;
