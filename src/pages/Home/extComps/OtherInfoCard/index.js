import React, {Component} from 'react';
import {weightIcon} from '../../../../CusIcons/CustomIcons';
import {
  Paper,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  FormControl,
  Input,
  InputLabel,
  GridList,
  GridListTile,
} from 'material-ui';
import {
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import LeftSideGrid from './LeftSideGrid';
import SurchargeCheckboxes from './SurchargeCheckboxes';
import {Add, Print} from 'material-ui-icons';
import Table, {
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import DialogContent from 'material-ui/Dialog/DialogContent';
import InputAdornment from 'material-ui/Input/InputAdornment';
import {getEntityList} from '../../../../actions/entity';
import {reduxForm, Field} from 'redux-form';
import BlptBtn from './blptBtn';
import ReactPaginate from 'react-paginate';

const Styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3 - 2,
    width: 350,
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
  uniqueInputFill: {
    fill: 'rgb(50, 57, 144)',
  },
  remarksBtn: {
    marginTop: 25,
  },
  remarksImgEnabled: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginBottom: 5,
  },
  remarksLabel: {
    fontSize: 13,
  },
  remarksImgDisabled: {
    width: 24,
    height: 24,
    opacity: 0.2,
    marginRight: 5,
    marginBottom: 5,
  },
  RBgroup: {
    margin: '12px 0px 7px 10px',
  },
  stRB: {
    display: 'inline-block',
    width: 100,
  },
  nextRB: {
    display: 'inline-block',
    width: 100,
    marginLeft: 12,
  },
  radioLabel: {
    color: 'rgba(0, 0, 0, 0.46)',
    fontSize: 15,
    marginLeft: 15,
  },
  radioSpacing: {
    marginLeft: 50,
  },
  gridListBlpt: {
    flexGrow: 1,
    maxWidth: '100%',
    flexBasis: 0,
    paddingLeft: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3 - 2,
  },
  blpt: {
    width: 70,
  },
  dialogWrapper: {
    margin: '23px 30px 23px 30px',
    maxWidth: 411,
  },
  aturDialogWrapper: {
    margin: '23px 30px 23px 30px',
    maxWidth: 950,
    minWidth: 453,
  },
  table: {
    width: 700,
  },
  tableCell: {
    padding: '4px 10px',
  },
  title: {
    fontWeight: 'bold',
    color: '#424242',
    letterSpacing: 0.7,
    padding: '23px 0px 0px 24px',
  },
  formControl: {
    marginTop: 10,
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
    height: '100%',
    borderRadius: 2,
    maxWidth: 850,
    marginTop: 47,
    paddingBottom: 47,
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
  radioGroup: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  tableButton: {
    padding: 0,
  }
});
const leftSide = [
  {name: 'deskripsiBrg', label: 'Deskripsi Barang', value: ''},
  {name: 'service', label: 'Service *', value: ''},
  {name: 'blpt'},
  {name: 'pcs', label: 'Jumlah *', value: 1,},
];

const rightSide = [
  {name: 'insuredVal', label: 'Insured Value', value: 0,},
  {name: 'remarks', label: 'Remarks', value: '',},
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
      temp_surcharges:[],
      currentKoli: null,
      input: null,
      pageCount: 0,
      page: 0,
      rangePage: 10,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleModal = (key) => this.setState({[key]: !this.state[key]});
  
  HandleChips = () => {
    const {classes} = this.props;
    const {adtSurcharge, koli} = this.props.privateData;
    let surcharges = [];
    /**
     * Overweight
    */
    const overWeight = koli.filter((koliitem) => koliitem.surcharge === 'Overweight');
    if (overWeight.length) {
      surcharges.push({label: 'Overweight', type: 'Overweight', total: overWeight.length, delete: false});
    }
    /**
     * packingKayu
    */
    const packingKayu = koli.filter((koliitem) => koliitem.packingKayu === true);
    if (packingKayu.length) {
      surcharges.push({label: 'Packing Kayu', type: 'packingKayu', total: packingKayu.length, delete: koli.length === 1});
    }
    /**
     * Other Surcharges
    */
    this.props.surcharges.map((surcharge) => {
      const kolisurcharge = koli.filter((koliitem) => surcharge.surcharge_name === koliitem.surcharge);
      if (kolisurcharge.length) {
        surcharges.push({label: surcharge.surcharge_name, type: 'surcharge', total: kolisurcharge.length, delete: koli.length === 1});
      }
    });
    return surcharges.map((item, index) => (
      <div className={classes.chipWrapper} key={index}>
      {
        item.delete ?
          <Chip onDelete={() => this.handleRequestDeleteSurcharge(this.props.privateData.koli[0], item.type, '', false)}
            className={classes.chip} label={koli.length === 1 ? item.label : item.label + '(' + item.total + ')'}
          />
        :
          <Chip className={classes.chip} label={koli.length === 1 ? item.label : item.label + '(' + item.total + ')'} />
      }
      </div>
    ));
  };
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
        ///
        return this.fireOIaction(e.target.name, {
          val: e.target.value,
          index: sd,
        });
      case 'pk':
        /////
        return this.fireOIaction(e.target.name, e.target.value);
      case 'lebar':
        //
        return this.fireOIaction(e.target.name, {
          val: e.target.value,
          index: sd,
        });
      case 'panjang':
        //
        return this.fireOIaction(e.target.name, {
          val: e.target.value,
          index: sd,
        });
      case 'tinggi':
        //
        return this.fireOIaction(e.target.name, {
          val: e.target.value,
          index: sd,
        });
      case 'packingKayu':
      case 'pkType':
      case 'surcharge':
        return this.handleChangeSurcharges(this.props.privateData.koli[0], e.target.name, e.target.value, e.target.checked);
        /*
        if (e.target.value === 'Packing Kayu') {
          this.fireOIaction('pk', '');
        }
        return this.fireOIaction(e.target.name, [e.target.value]);
        */
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

  
  handleRequestPrintKoli = (koli) => {
    return this.props.handleRequestPrintKoli(koli);
  }
  focusUsernameInputField = (input) => {
    if (input) {
      this.setState({input});
    }
  };
  componentWillReceiveProps(nextProps) {
    rightSide[0].value = parseFloat(nextProps.privateData.insuredVal) || 0;
    rightSide[1].value = nextProps.privateData.remarks || '';

    leftSide[0].value = nextProps.privateData.deskripsiBrg || '';
    leftSide[1].value = nextProps.privateData.service || '';
    leftSide[3].value = nextProps.privateData.pcs || '';
    
    if (nextProps.privateData.focusField === 'deskripsiInput' && this.state.input) {
      setTimeout(() => {this.state.input.focus();}, 100);
    }

    if (this.state.currentKoli) {
      this.setState({currentKoli: nextProps.privateData.koli[this.state.currentKoli.id]});
    }
  }
  handleChg = (n, e) => {
    this.handleChange(e, n.id);
    /*let {localkoli} = this.state;
    localkoli[n.id][e.currentTarget.name] = e.currentTarget.value;
    this.setState({localkoli});*/
  };
  handleCloseSurchargeModal = (event) => {
    return this.setState({openDialog: false, surcharges: [], currentKoli: null});
  }
  onRequestSurchargeModal = (koli) => {
    let {surcharges} = this.props;
    let temp_surcharges = [];
    if (koli.overWeight) {
      temp_surcharges = [{surcharge_name: 'Overweight'}].concat(surcharges);
    } else {
      temp_surcharges = [].concat(surcharges);
    }
    return this.setState({openDialog: true, temp_surcharges: temp_surcharges, currentKoli: koli});
  } 
  handleRequestDeleteSurcharge = (koli, name) => {
    this.props.updateKoliSurcharge(koli, name, '', false);
  }
  handleChangeSurcharges = (e) => {
    this.props.updateKoliSurcharge(this.state.currentKoli, e.target.name, e.target.value, e.target.checked);
  }
  handleRequestPrintKoli = (koli) => {
    this.props.handleRequestPrintKoli(koli);
  }

  render() {
    const {HandleChips, RightSideGrid, handleChangeSurcharges, handleRequestPrintKoli, handleChange, handleBlur,
      focusUsernameInputField, onRequestSurchargeModal,
    } = this;
    const {openDialog, aturBtnCounter, aturBtnDialog, page, pageCount,
      currentKoli,
      rangePage,
    } = this.state;
    const {
      removeSurchargeItem,
      classes,
      almtPenerimaReducer,
      BASE_API,
      privateData,
      readOnly,
      surcharges,
    } = this.props;
    let {adtSurcharge, pcs, service, pk, koli, overWeight, focusField, serviceData} = this.props.privateData;
    return (
      <Paper className={classes.otherPaper}>
        <Typography className={classes.title} type="headline">
          Other Information
        </Typography>
        <GridList cols={2} cellHeight="auto">
          <GridListTile cols={1}>
            <FormControl className={classes.formControl}>
              <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput" className={classes.inputLabel}>
                {leftSide[0].label}
              </InputLabel>
              <Input readOnly={readOnly} disabled={readOnly} inputRef={focusUsernameInputField}
                onChange={handleChange} className={classes.textField} name={leftSide[0].name}
                value={leftSide[0].value} inputProps={{readOnly: readOnly, disabled: readOnly}}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormLabel className={classes.inputLabel}>{leftSide[1].label}</FormLabel>
              <RadioGroup aria-label={leftSide[1].name} name={leftSide[1].name} onChange={this.handleChange}
                value={service} style={{display: 'inline-block'}} className={classes.radioGroup}
              >
              {
                serviceData && serviceData.map((item, index) =>
                  <FormControlLabel key={index} value={item.service_code} label={item.service_code}
                    control={
                      <Radio inputProps={{readOnly: readOnly, disabled: readOnly}} className={classes.uniqueInputFill} checked={service === item.service_code} />
                    }
                  />
              )}
              </RadioGroup>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput" className={classes.inputLabel}
                value={rightSide[0].value}
              >
                {rightSide[0].label}
              </InputLabel>
              <Input onChange={handleChange} className={classes.textField} name={rightSide[0].name} value={rightSide[0].value}
                startAdornment={<InputAdornment position="start">Rp.</InputAdornment>}
                inputProps={{readOnly: this.props.readOnly, disabled: this.props.readOnly}}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput" className={classes.inputLabel}
                value={rightSide[1].value}
              >
                {rightSide[1].label}
              </InputLabel>
              <Input onChange={handleChange} className={classes.textField} name={rightSide[1].name} value={rightSide[1].value}
                inputProps={{readOnly: readOnly, disabled: readOnly}}
              />
            </FormControl>
          </GridListTile>
          <GridListTile cols={1}>
            <GridList cols={2}>
              <GridListTile style={{height: 'auto'}}>
                <FormControl className={classes.formControl}>
                  <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput"className={classes.inputLabel}>
                    {leftSide[3].label}
                  </InputLabel>
                  <Input readOnly={readOnly} disabled={readOnly} onChange={handleChange} onBlur={handleBlur} defaultValue={1} 
                    type="number" maxLength="1000" className={classes.textField} name={leftSide[3].name} value={leftSide[3].value}
                    inputProps={{readOnly: readOnly, disabled: readOnly}}
                  />
                </FormControl>
              </GridListTile>
              <GridListTile style={{height: 'auto'}}>
                <Button classes={{root: classes.remarksBtn, label: classes.remarksLabel}} disabled={aturBtnCounter || readOnly} 
                  onClick={() => this.handleModal('aturBtnDialog')} dense="true"
                >
                  <img src={weightIcon} alt="weight" className={!aturBtnCounter ? classes.remarksImgEnabled : classes.remarksImgDisabled} />
                  ATUR BERAT
                </Button>
              </GridListTile>
            </GridList>
            <BlptBtn gridListBlpt={classes.gridListBlpt} koli={koli[0]} blpt={classes.blpt} handleChange={handleChange}
              inputLabelFocused={classes.inputLabelFocused} inputInkbarFocused={classes.inputInkbarFocused} idx={0} 
              readOnly={readOnly || koli.length > 1}
            />
            <GridList cols={1}>
              <GridListTile style={{height: 'auto'}}>
                <Button classes={{root: classes.additionalSurchargeBtn, label: classes.additionalSurchargeLabel}} 
                  onClick={() => onRequestSurchargeModal(koli[0])} dense="true" disabled={readOnly || koli.length > 1}
                >
                  <Add /> Additional Surcharge <br />
                </Button>
              </GridListTile>
              <GridListTile style={{height: 'auto'}}>
                <HandleChips />
              </GridListTile>
            </GridList>
          </GridListTile>
        </GridList>
        <Dialog
          open={this.state.aturBtnDialog}
          aria-labelledby="aturBtn-title"
          aria-describedby="aturBtn-content"
          classes={{paperWidthSm: classes.aturDialogWrapper}}
        >
          <DialogContent id="aturBtn-content">
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell}>No.</TableCell>
                  <TableCell className={classes.tableCell}>Berat</TableCell>
                  <TableCell className={classes.tableCell}>Lebar</TableCell>
                  <TableCell className={classes.tableCell}>Panjang</TableCell>
                  <TableCell className={classes.tableCell}>Tinggi</TableCell>
                  <TableCell className={classes.tableCell}>Surcharges</TableCell>
                  <TableCell className={classes.tableCell}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                koli.slice(page * rangePage, page * rangePage + rangePage)
                .map((item, index) =>
                  <TableRow key={index}>
                    <TableCell className={classes.tableCell}>{ page * rangePage + index + 1}</TableCell>
                    <TableCell className={classes.tableCell}>
                      <Input className={classes.blpt} onChange={this.handleChg.bind(this, item)}
                        type="number" name="berat" inputProps={{readOnly: readOnly || item.completed, disabled: readOnly || item.completed}}
                        step="0.00001" value={item.berat} endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Input className={classes.blpt} onChange={this.handleChg.bind(this, item)}
                        type="number" name="lebar" inputProps={{readOnly: readOnly || item.completed, disabled: readOnly || item.completed}}
                        value={item.lebar} endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Input className={classes.blpt} onChange={this.handleChg.bind(this, item)}
                        type="number" name="panjang" inputProps={{readOnly: readOnly || item.completed, disabled: readOnly || item.completed}}
                        value={item.panjang} endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Input className={classes.blpt} onChange={this.handleChg.bind(this, item)}
                        type="number" name="tinggi" inputProps={{readOnly: readOnly || item.completed, disabled: readOnly || item.completed}}
                        value={item.tinggi} endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                      />
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                    {
                      item.packingKayu &&
                        <div className={classes.chipWrapper}>
                          <Chip onDelete={() => this.handleRequestDeleteSurcharge(item, 'packingKayu')} className={classes.chip} label={'Packing Kayu'} />
                        </div>
                    }
                    {
                      item.surcharge && item.surcharge === 'Overweight' &&
                        <div className={classes.chipWrapper}><Chip className={classes.chip} label={item.surcharge} /></div>
                    }
                    {
                      item.surcharge && item.surcharge !== 'Overweight' && <div className={classes.chipWrapper}>
                          <Chip onDelete={() => this.handleRequestDeleteSurcharge(item, 'surcharge')} className={classes.chip} label={item.surcharge} />
                        </div>
                    }
                    </TableCell>
                    <TableCell padding='none' className={classes.tableCell}>
                      <Button
                        classes={{label: classes.additionalSurchargeLabel, root: classes.tableButton}}
                        onClick={() => onRequestSurchargeModal(item)} dense="true" disabled={readOnly}
                      >
                        <Add /> Surcharge
                      </Button>
                      <Button
                        classes={{ label: classes.additionalSurchargeLabel, root: classes.tableButton}}
                        onClick={() => this.handleRequestPrintKoli(item)} dense="true" disabled={readOnly}
                      >
                        <Print />
                      </Button>
                    </TableCell>
                  </TableRow>,
              )}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button variant="raised" className={classes.addMoreRaisedBtn}
            onClick={() => {
              /*handleSaveKoli(localkoli);*/
              this.handleModal('aturBtnDialog');
            }}
          >Save</Button>
          <Button variant="raised" className={classes.addMoreRaisedBtn}
            onClick={() => {
              this.handleModal('aturBtnDialog');
            }}
          >Cancel</Button>
          <div id="react-paginate">
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={<a href="">...</a>}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={10}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        </DialogActions>
      </Dialog>
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
              surcharges={this.state.temp_surcharges}
              handleChange={this.handleChangeSurcharges}
              adtReducer={adtSurcharge}
              koli={currentKoli}
              pk={pk}
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
