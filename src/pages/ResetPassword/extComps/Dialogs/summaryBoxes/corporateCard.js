import React from 'react';
import {Paper, Divider, TextField, GridList, GridListTile} from 'material-ui';

const Styles = {
  paper: {
    width: 258,
    height: 250,
    marginTop: 18,
    backgroundColor: '#F1F4F5',
    boxShadow: 'none',
    borderRadius: 0,
    border: '1px solid #95989A',
  },
  listRoot: {
    display: 'flex',
    padding: 0,
    flexWrap: 'wrap',
    overflowY: 'hidden',
    overflowX: 'hidden',
    listStyle: 'none',
  },
};
const CorporateCard = (props) => {
  const {methodData, classes, summaryHandler} = props;
  return (
    // onChange={summaryHandler}
    <Paper style={Styles.paper} elevation={4}>
      <p className={classes.paymentCard}>Corporate Credit</p>
      <GridList cols={2} cellHeight="auto" classes={{root: classes.listRoot}}>
        <GridListTile cols={2}>
          <p className={classes.amountNchange}> Corporate ID </p>
        </GridListTile>
        <GridListTile cols={2}>
          {/* <p className={classes.cardLabel}>COXXXX</p> */}
          <TextField name="corporate_id" className={classes.cardLabel} />
        </GridListTile>
      </GridList>
    </Paper>
  );
};

export default CorporateCard;
