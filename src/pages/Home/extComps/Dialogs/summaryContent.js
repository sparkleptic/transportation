import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import {GridList, GridListTile} from 'material-ui';
import Chip from 'material-ui/Chip/Chip';
import Divider from 'material-ui/Divider/Divider';
import TextField from 'material-ui/TextField/TextField';
import FormControl from 'material-ui/Form/FormControl';
import InputLabel from 'material-ui/Input/InputLabel';
import Input from 'material-ui/Input/Input';
import Select from 'material-ui/Select/Select';
import MenuItem from 'material-ui/Menu/MenuItem';
import Paper from 'material-ui/Paper/Paper';
import CashCard from './summaryBoxes/cashCard';
import CorporateCard from './summaryBoxes/corporateCard';
import Debit_CreditCard from './summaryBoxes/debitCard';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

const Styles = (theme) => ({
  summaryGrid: {
    marginLeft: 8.5,
    marginTop: 24,
    fontSize: 12,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.46)',
  },
  tile: {
    width: 554,
  },
  totalTile: {
    marginLeft: 320,
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: 600,
    marginLeft: 12,
    marginTop: 6,
  },
  paymentLabel: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 5,
    marginRight: 13,
  },
  regChips: {
    backgroundColor: '#323990',
    color: '#fafafa',
  },
  yesChips: {
    backgroundColor: '#e62e28',
    color: '#fafafa',
  },
  ecoChips: {
    backgroundColor: '#fdd835',
    color: '#fafafa',
  },
  selectionItem: {
    width: 180,
  },
  cardTitle: {
    width: 258,
    height: 382,
    marginLeft: 5,
    marginTop: -7,
  },
  listRoot: {
    display: 'flex',
    padding: 0,
    flexWrap: 'wrap',
    overflowY: 'hidden',
    overflowX: 'hidden',
    listStyle: 'none',
  },
  paymentCard: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 12,
    paddingTop: 21,
    marginLeft: 22,
  },
  paymentMethLabel: {
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 0,
  },
  rootFormControl: {
    float: 'right',
    marginRight: 13,
  },
  card: {
    float: 'right',
    marginTop: 24,
    fontSize: 12,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.46)',
  },
  amountNchange: {
    /*float: 'right',
    marginRight: 12,
    fontSize: 12,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.46)',
    marginBottom: 0,*/
  },
  divider: {
    border: 'solid 1.5px rgba(0, 0, 0, 0.23)',
    width: 214,
    marginRight: 13,
    float: 'right',
    marginBottom: 26,
  },
  cardLabel: {
    /*float: 'right',
    marginRight: 13,
    color: '#ACAEAF',
    textAlign: 'right',*/
  },
  listItem: {
    border: '1px solid',
  },
  listItemSelected: {
    border: '1px solid',
    backgroundColor: '#F1F4F5',
  },
});
const selectionItem = [
  'Cash',
  'Debit Card',
  'Credit Card',
  'Corporate Credit',
  'Cash Tunda',
];
const SummaryContent = (props) => {
  const {data, classes, methodData, handleSelect, activeNode, onChangePaymentType} = props;
  const {allReducer} = data;
  let yes = allReducer.filter((p) => p.package.OtherInfoData.service === 'YES');
  let reg = allReducer.filter((p) => p.package.OtherInfoData.service === 'REG');
  let eco = allReducer.filter((p) => p.package.OtherInfoData.service === 'ECO');
  let koli = 0,
    allTotal = 0;
  allReducer.map((p) => {
    koli = koli + parseInt(p.package.OtherInfoData.pcs, 10);
    allTotal = allTotal + parseInt(p.package.Total, 10);
    return p;
  });
  return (
    <GridList classes={{root: classes.listRoot}} cols={5} cellHeight="auto">
      <GridListTile cols={5}>
        <GridList cols={5} cellHeight="auto" classes={{root: classes.listRoot}}>
          <GridListTile>
            <label className={classes.summaryGrid}>Jumlah Connote</label>
            <p className={classes.resultLabel}>{allReducer.length}</p>
          </GridListTile>
          <GridListTile>
            <label className={classes.summaryGrid}>Jumlah Koli</label>
            <p className={classes.resultLabel}>{koli}</p>
          </GridListTile>
          <GridListTile>
            <label className={classes.summaryGrid}>Total</label>
            <p className={classes.resultLabel}>Rp {allTotal}</p>
          </GridListTile>
        </GridList>
      </GridListTile>
      <GridListTile cols={5}>
        <p className={classes.paymentMethLabel}>Payment Method</p>
      </GridListTile>
      <GridListTile cols={5}>
        <GridList cols={5} cellHeight="auto" style={{margin: 0}} classes={{root: classes.listRoot}}>
          <GridListTile cols={2.5} style={{padding: 0}}>
            <List style={{paddingTop: 0, paddingBottom: 0}} >
            {
              selectionItem.map((item, index) => {
                if ((item !== 'Corporate Credit') || (item === 'Corporate Credit' && activeNode.allowCorporateTrx === '1'))
                return <ListItem tabIndex={index + 1} onKeyPress={(e) => e.key === 'Enter' && onChangePaymentType(item)}
                  onClick={() => onChangePaymentType(item)} value={item}
                  className={methodData === item ? classes.listItemSelected : classes.listItem} key={index} button><ListItemText primary={item} /></ListItem>;
              })
            }
            </List>
          </GridListTile>
          <GridListTile cols={2.5} style={{padding: 0}}>
          {
            methodData === 'Cash' ? <CashCard allTotal={allTotal} methodData={methodData} classes={classes} />
            :
            methodData === 'Corporate Credit' ? <CorporateCard allTotal={allTotal} methodData={methodData} classes={classes} /> 
            :
            methodData === 'Debit Card' ? <Debit_CreditCard allTotal={allTotal} methodData={methodData} classes={classes} />
            :
            methodData === 'Credit Card' ? <Debit_CreditCard allTotal={allTotal} methodData={methodData} classes={classes} />
            :
            methodData === 'Cash Tunda' ? <CashCard allTotal={allTotal} methodData={methodData} classes={classes} /> 
            :
            ''
          }
          </GridListTile>
        </GridList>
      </GridListTile>
    </GridList>
  );
};

export default withStyles(Styles)(SummaryContent);
