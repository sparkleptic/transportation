import React from 'react';
import {Paper, Divider, TextField, GridList, GridListTile, Input} from 'material-ui';

const Styles = {
  cardTitle: {
    height: 250,
    backgroundColor: '#F1F4F5',
    boxShadow: 'none',
    borderRadius: 0,
    border: '1px solid #95989A',
    padding:'10px 20px',
  },
};
class CashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {amount: props.allTotal, change: 0};
  }

  handleChange = (event) => {
    this.setState({amount: event.target.value});
  };
  handleUpdate = (event) => {
    let amount =
      this.state.amount < this.props.allTotal
        ? this.props.allTotal
        : this.state.amount;
    this.setState({amount: amount, change: amount - this.props.allTotal});
  };
  render() {
    const {handleChange, handleUpdate} = this;
    const {classes, allTotal} = this.props;
    const {amount, change} = this.state;
    return (
      <Paper style={Styles.cardTitle}>
        <GridList cols={2} cellHeight="auto" classes={{root: classes.listRoot}}>
          <GridListTile cols={1}>
            <p>Total Amount</p>
          </GridListTile>
          <GridListTile cols={1}>
            <Input value={allTotal} inputProps={{readOnly: true, disabled: true}} />
          </GridListTile>
        </GridList>
        <GridList cols={2} cellHeight="auto" classes={{root: classes.listRoot}}>
          <GridListTile cols={1}>
            <p>Payment</p>
          </GridListTile>
          <GridListTile cols={1}>
            <TextField type="number"
              onBlur={handleUpdate}
              onChange={handleChange}
              value={amount}
              name="amount"
            />
          </GridListTile>
        </GridList>
        <GridList cols={2} cellHeight="auto" classes={{root: classes.listRoot}}>
          <GridListTile cols={1}>
            <p> Change </p>
          </GridListTile>
          <GridListTile cols={1}>
            <Input value={change} inputProps={{readOnly: true, disabled: true}} />
          </GridListTile>
        </GridList>
      </Paper>
    );
  }
}

export default CashCard;
