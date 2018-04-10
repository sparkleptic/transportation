import React from 'react';
import {Paper, Divider, TextField, GridList, GridListTile} from 'material-ui';

const Styles = {
  cardTitle: {
    width: 258,
    height: 250,
    marginTop: 18,
    backgroundColor: '#F1F4F5',
    boxShadow: 'none',
    borderRadius: 0,
    border: '1px solid #95989A',
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
    const {classes} = this.props;
    const {amount, change} = this.state;
    return (
      <Paper style={Styles.cardTitle}>
        <p className={classes.paymentCard}>Cash</p>
        <GridList cols={2} cellHeight="auto" classes={{root: classes.listRoot}}>
          <GridListTile cols={2}>
            <p className={classes.amountNchange}> Amount *</p>
          </GridListTile>
          <GridListTile cols={2}>
            <TextField
              type="number"
              onBlur={handleUpdate}
              onChange={handleChange}
              value={amount}
              name="amount"
              className={classes.cardLabel}
            />
          </GridListTile>
          <GridListTile cols={2}>
            <p className={classes.amountNchange}> Change </p>
          </GridListTile>
          <GridListTile cols={2}>
            {/*Rp. {change}*/}
            <TextField
              type="number"
              value={change}
              name="change"
              className={classes.cardLabel}
            />
          </GridListTile>
        </GridList>
      </Paper>
    );
  }
}

export default CashCard;
