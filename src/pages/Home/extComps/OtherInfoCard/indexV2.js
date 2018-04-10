import React, {Component} from 'react';
import Grid, {Paper,
  Typography, Button, Chip, Dialog, DialogTitle, DialogActions, FormControl, Input, InputLabel, GridList, GridListTile} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import {
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from 'material-ui';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import LeftSideGrid from './LeftSideGrid';
import SurchargeCheckboxes from './SurchargeCheckboxes';
import {Add} from 'material-ui-icons';
import DialogContent from 'material-ui/Dialog/DialogContent';
import InputAdornment from 'material-ui/Input/InputAdornment';
import axios from 'axios';
import {BASE_API} from '../../../../api';
import {reduxForm, Field} from 'redux-form';

const Styles = (theme) => ({
  title: {
    fontWeight: 'bold',
    color: '#424242',
    letterSpacing: 0.7,
    padding: '23px 0px 0px 24px',
  },
  chipWrapper: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    flexDirection: 'reverse',
  },
  chip: {
    margin: '7px 4px 4px 4px',
  },
  otherPaper: {
    /*height: 420,*/
    borderRadius: 2,
    maxWidth: 850,
    marginTop: 47,
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    width: 375,
  },
  inputLabelFocused: {
    color: 'rgb(50, 57, 144)',
  },
  inputLabel: {
    marginLeft: theme.spacing.unit * 3,
  },
  inputInkbarFocused: {
    '&:after': {
      backgroundColor: 'rgb(50, 57, 144)',
    },
  },
  rightSideTextField: {
    marginLeft: theme.spacing.unit + 5,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3 - 1,
    width: 385,
  },
  additionalSurchargeLabel: {
    fontSize: 13,
  },
  additionalSurchargeBtn: {
    marginTop: theme.spacing.unit + 9,
  },
  dialogWrapper: {
    margin: '23px 30px 23px 30px',
    maxWidth: 370,
  },
  table: {
    width: 800,
    margin: '0px 25px',
    maxHeight: 300,
    overflowY: 'scroll',
  },
  tableCell: {
    padding: '5px 10px',
  },
  koliTextField: {
    width: 60,
  },
  radioGroup: {
    paddingLeft: 24,
    paddingRight: 24,
  }
});

const rightSide = [
  {
    name: 'insuredVal',
    label: 'Insured Value',
    value: 0,
  },
  {
    name: 'remarks',
    label: 'Remarks',
    value: '',
  },
];
const leftSide = [
  {
    name: 'deskripsiBrg',
    label: 'Deskripsi Barang',
    value: '',
  },
  {
    name: 'service',
    label: 'Service *',
    value: '',
  },
  {
    name: 'blpt',
  },
  {
    name: 'pcs',
    label: 'Jumlah *',
    value: 1,
  },
];
class OtherInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      aturBtnCounter: true,
      aturBtnDialog: false,
      searchDrawer: false,
      Chips: [],
      serviceCout: '',
      serviceData: null,
      classes: props.classes,
      surcharges: [],
      input: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
  }

  handleModal = (key) => this.setState({[key]: !this.state[key]});
  RightSideGrid = () => {
    const {classes} = this.state;
    return rightSide.map((text, index) => (
      <FormControl key={index}>
        <InputLabel
          FormLabelClasses={{focused: classes.inputLabelFocused}}
          htmlFor="focusedInput"
          className={classes.inputLabel}
          value={text.value}
        >
          {text.label}
        </InputLabel>
        <Input
          /*classes={{inkbar: classes.inputInkbarFocused}}*/
          id="focusedInput"
          type={'text'}
          onChange={this.handleChange}
          className={classes.textField}
          name={text.name}
          value={text.value}
          startAdornment={
            text.name === 'insuredVal' && (
              <InputAdornment position="start">Rp.</InputAdornment>
            )
          }
          inputProps={{
            readOnly: this.props.readOnly,
            disabled: this.props.readOnly,
          }}
        />
      </FormControl>
    ));
  };
  HandleChips = () => {
    const {classes} = this.props;
    const {adtSurcharge} = this.props.privateData;
    return adtSurcharge
      ? adtSurcharge.map((item, index) => (
          <div className={classes.chipWrapper} key={index}>
            <Chip
              onDelete={() => this.handleRequestDelete(item)}
              className={classes.chip}
              label={item}
            />
          </div>
        ))
      : null;
  };
  handleRequestDelete = async (index) => {
    const {removeSurchargeItem} = this.props;
    await removeSurchargeItem(index);
    await this.HandleChips();
  };
  componentDidMount() {
    const self = this;
    // this.fireOIaction('berat', 1);
    // this.fireOIaction('tinggi', 10);
    // this.fireOIaction('lebar', 10);
    // this.fireOIaction('panjang', 10);
    // this.fireOIaction('pcs', 1);
    axios
      .get(`${BASE_API}surcharges`)
      .then((response) => {
        self.setState({
          surcharges: response.data.data,
        });
        //console.log('srr', response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  fireOIaction = async (key, value) => {
    const {setInputOtherInfo} = this.props;
    if (key === 'adtSurcharge') {
      await setInputOtherInfo(key, value);
    } else {
      await setInputOtherInfo(key, value);
      value = '';
      await value;
    }
  };
  handleSubmit = async (key) => {
    (await key) === 'openDialog' ? this.HandleChips() : '';
    await this.setState({[key]: false});
  };
  handleBlur = (e) => {
    let value = e.target.value;
    value = (value === '' || value === '0') ? 1 : value;
    this.fireOIaction('changepcs', value);
    this.fireOIaction('pcs', value);
    this.setState({aturBtnCounter: value > 1 ? false : true});
  }
  handleChange = (e, sd) => {
    switch (e.target.name) {
      case 'berat':
      case 'lebar':
      case 'panjang':
      case 'tinggi':
        return this.fireOIaction(e.target.name, {val: e.target.value, index: sd});
      case 'pk':
        return this.fireOIaction(e.target.name, e.target.value);
      case 'adtSurcharge':
        if (e.target.value === 'Packing Kayu') { this.fireOIaction('pk', ''); }
        return this.fireOIaction(e.target.name, [e.target.value]);
      case 'service':
        this.setState({serviceCout: e.target.value});
        this.fireOIaction('serviceData', this.props.privateData.serviceData);
        return this.fireOIaction(e.target.name, e.target.value);
      // case 'berat':
      //     return this.fireOIaction(e.target.name, e.target.value)
      case 'pcs':
        if (e.target.value < 1000 && e.target.value > 0) {
          this.setState({aturBtnCounter: e.target.value > 1 ? false : true});
          this.fireOIaction('changepcs', e.target.value || 1);
          return this.fireOIaction(e.target.name, e.target.value);
        } else {
          //this.fireOIaction('changepcs', e.target.value || '');
          return this.fireOIaction(e.target.name, e.target.value || '');
        }
      case 'insuredVal':
        let val = e.target.value;
        val = parseFloat(val) || 0;
        return this.fireOIaction(e.target.name, val);
    }
    return this.fireOIaction(e.target.name, e.target.value);
  };

  actionsModal = (
    <Button
      variant="raised"
      color="primary"
      onClick={() => this.handleSubmit('openDialog')}
      name="adtSurcharge"
    >
      Submit
    </Button>
  );

  componentWillReceiveProps(nextProps) {
    rightSide[0].value = parseFloat(nextProps.privateData.insuredVal) || 0;
    rightSide[1].value = nextProps.privateData.remarks || '';
    leftSide[0].value = nextProps.privateData.deskripsiBrg || '';
    leftSide[1].value = nextProps.privateData.service || '';
    leftSide[3].value = nextProps.privateData.pcs || '';

    if (this.props.privateData.focusField === 'deskripsiInput' && this.state.input) {
      setTimeout(() => {
        this.state.input.focus();
      }, 100);
    }
  }

  render() {
    const {HandleChips, RightSideGrid, focusUsernameInputField, handleChange} = this;
    const {openDialog, aturBtnCounter, aturBtnDialog} = this.state;
    const {
      removeSurchargeItem,
      classes,
      almtPenerimaReducer,
      BASE_API,
      privateData,
      readOnly,
    } = this.props;
    let {adtSurcharge, pcs, service, pk, koli, overWeight, focusField, serviceData} = this.props.privateData;

    return (
      <Paper className={classes.otherPaper}>
        <Typography className={classes.title} type="headline">
          Other Information
        </Typography>
        <GridList cols={2} cellHeight="auto">
          <GridListTile>
            <FormControl>
              <InputLabel FormLabelClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput" className={classes.inputLabel}>
                {leftSide[0].label}
              </InputLabel>
              <Input inputRef={focusUsernameInputField} onChange={handleChange} className={classes.textField} name={leftSide[0].name}
                value={leftSide[0].value} inputProps={{readOnly: this.props.readOnly, disabled: this.props.readOnly}}
              />
            </FormControl>
          </GridListTile>
          <GridListTile>
            <FormControl>
              <InputLabel FormLabelClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput" className={classes.inputLabel}
                value={rightSide[0].value}
              >
                {rightSide[0].label}
              </InputLabel>
              <Input onChange={handleChange} className={classes.textField} name={rightSide[0].name} value={rightSide[0].value}
                startAdornment={<InputAdornment position="start">Rp.</InputAdornment>}
                inputProps={{readOnly: this.props.readOnly, disabled: this.props.readOnly}}
              />
            </FormControl>
          </GridListTile>
        </GridList>
        <GridList cols={2} cellHeight="auto">
          <GridListTile>
            <FormControl className={classes.RBgroup}>
              <FormLabel className={classes.inputLabel}>{leftSide[1].label}</FormLabel>
              <RadioGroup aria-label={leftSide[1].name} name={leftSide[1].name} onChange={this.handleChange}
                value={service} style={{display: 'inline-block'}} className={classes.radioGroup}
              >
              {
                serviceData && serviceData.map((item, index) =>
                  <FormControlLabel key={index} value={item.service_code} label={item.service_code}
                    control={
                      <Radio inputProps={{readOnly: readOnly,disabled: readOnly}} className={classes.uniqueInputFill} checked={service === item.service_code} />
                    }
                  />
              )}
              </RadioGroup>
            </FormControl>
          </GridListTile>
          <GridListTile>
            <FormControl>
              <InputLabel FormLabelClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput" className={classes.inputLabel}
                value={rightSide[1].value}
              >
                {rightSide[1].label}
              </InputLabel>
              <Input onChange={handleChange} className={classes.textField} name={rightSide[1].name} value={rightSide[1].value}
                inputProps={{readOnly: readOnly, disabled: readOnly}}
              />
            </FormControl>
          </GridListTile>
        </GridList>
        <GridList cols={1} cellHeight="auto">
          <GridListTile>
            <FormControl>
              <InputLabel FormLabelClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput" className={classes.inputLabel}
                value={leftSide[3].value}
              >
                {leftSide[3].label}
              </InputLabel>
              <Input onChange={handleChange} type="number" maxLength="1000"
                className={classes.textField} name={leftSide[3].name} value={leftSide[3].value}
                inputProps={{readOnly: readOnly, disabled: readOnly}}
              />
            </FormControl>
          </GridListTile>
        </GridList>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Berat (kg)</TableCell>
              <TableCell className={classes.tableCell}>Lebar (cm)</TableCell>
              <TableCell className={classes.tableCell}>Panjang (cm)</TableCell>
              <TableCell className={classes.tableCell}>Tinggi (cm)</TableCell>
              <TableCell className={classes.tableCell}>Surcharges</TableCell>
              <TableCell className={classes.tableCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            koli && koli.map((item, key) =>
            <TableRow key={key}>
              <TableCell className={classes.tableCell}>
                <Input onChange={(event) => handleChange(event, key)} type="number" name="berat"
                  inputProps={{readOnly: readOnly, disabled: readOnly}} className={classes.koliTextField}
                  value={item.berat} endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Input onChange={(event) => handleChange(event, key)} type="number" name="lebar"
                  inputProps={{readOnly: readOnly, disabled: readOnly}} className={classes.koliTextField}
                  value={item.lebar} endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Input onChange={(event) => handleChange(event, key)} type="number" name="panjang"
                  inputProps={{readOnly: readOnly,disabled: readOnly}} className={classes.koliTextField}
                  value={item.panjang} endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Input onChange={(event) => handleChange(event, key)} type="number" name="tinggi"
                  inputProps={{readOnly: readOnly,disabled: readOnly}} className={classes.koliTextField}
                  value={item.tinggi} endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <HandleChips />
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Button classes={{root: classes.additionalSurchargeBtn, label: classes.additionalSurchargeLabel}}
                  onClick={() => this.handleModal('openDialog')} dense="true" disabled={readOnly}
                >
                  <Add />Additional Surcharge
                </Button>
              </TableCell>
            </TableRow>
            )
          }
          </TableBody>
        </Table>
        <Dialog
          open={openDialog}
          onClose={() => this.handleSubmit('openDialog')}
          aria-labelledby="service-title"
          aria-describedby="service-content"
          classes={{paperWidthSm: classes.dialogWrapper}}
        >
          <DialogTitle id="service-title">Additional Services</DialogTitle>
          <DialogContent id="service-content">
            <SurchargeCheckboxes
              surchargesArr={this.state.surcharges}
              handleChange={this.handleChange}
              adtReducer={adtSurcharge}
              overWeight={overWeight}
              pk={pk}
              removeSurchargeItem={removeSurchargeItem}
            />
          </DialogContent>
          <DialogActions>{this.actionsModal}</DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

export default withStyles(Styles)(
  reduxForm({
    form: 'OtherInfo',
  })(OtherInfo),
);
