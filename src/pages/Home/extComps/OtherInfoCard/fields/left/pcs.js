 import React from 'react';
import _ from 'lodash';
import {
  Chip,
  FormControl,
  InputLabel,
  Input,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  GridList,
  GridListTile,
} from 'material-ui';
import {Add, Print} from 'material-ui-icons';
import Table, {
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import InputAdornment from 'material-ui/Input/InputAdornment';

import ReactPaginate from 'react-paginate';
import SurchargeCheckboxes from '../../SurchargeCheckboxes';

class PcsField extends React.Component {
  state = {
    arrPcs: [],
    arrPcs2: [],
    rangePage: 10,
    pageCount: 0,
    page: 0,
    isOpen: false,
    aturBtnDialog: false,
    localkoli: [],
    openDialog: false,
    surcharges: [],
    currentKoli: null
  };

  handlePageClick = (e) => {
    const page = isNaN(e.selected) ? 0 : e.selected;
    this.setState({page});
  };
  handleModal = (key) => {
    let {page, pageCount, rangePage, localkoli} = this.state;
    page = 0;
    pageCount = Math.ceil(this.props.koli.length / rangePage);
    //localkoli = _.cloneDeep(this.props.koli);
    this.setState({[key]: !this.state[key], page, pageCount, localkoli});
  };
  handleChg = (n, e) => {
    this.props.handleChange(e, n.id);
    /*let {localkoli} = this.state;
    localkoli[n.id][e.currentTarget.name] = e.currentTarget.value;
    this.setState({localkoli});*/
  };
  handleRequestDelete = async (index) => {
    const {removeSurchargeItem} = this.props;
    await removeSurchargeItem(index);
    await this.HandleChips();
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
    return this.setState({openDialog: true, surcharges: temp_surcharges, currentKoli: koli});
  } 
  handleRequestDeleteSurcharge = (koli, name) => {
    this.props.handleChangeSurcharges(koli, name, '', false);
  }
  handleChangeSurcharges = (e) => {
    this.props.handleChangeSurcharges(this.state.currentKoli, e.target.name, e.target.value, e.target.checked);
  }
  handleRequestPrintKoli = (koli) => {
    this.props.handleRequestPrintKoli(koli);
  }
  componentWillReceiveProps = (nextprops) => {
    if (this.state.currentKoli) {
      this.setState({currentKoli: nextprops.koli[this.state.currentKoli.id]});
    }
  }
  render() {
    const {
      readOnly,
      classes,
      handleModal,
      handleChange,
      handleBlur,
      aturBtnCounter,
      text,
      remarksLabel,
      actionsModal,
      dataPcs,
      weightIcon,
      aturBtnDialog,
      handleSubmit, koli,
    } = this.props;

    const {handleChangeSurcharges, onRequestSurchargeModal, handleCloseSurchargeModal, handleRequestDeleteSurcharge} = this;
    const {rangePage, page, pageCount, localkoli, openDialog, surcharges, currentKoli} = this.state;
    let {adtSurcharge, pk } = this.props.privateData;

    return (
      <GridList cols={2}>
        <GridListTile>
          <br />
          <FormControl>
            {/*pcsField*/}
            <InputLabel
              FormLabelClasses={{focused: classes.inputLabelFocused}}
              htmlFor="focusedInput"
              className={classes.inputLabel}
            >
              {text.label}
            </InputLabel>
            <Input readOnly={readOnly} disabled={readOnly}
              /*classes={{inkbar: classes.inputInkbarFocused}}*/
              id="focusedInput"
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              maxLength="1000"
              className={classes.textField}
              name={text.name}
              value={text.value}
              inputProps={{
                readOnly: readOnly,
                disabled: readOnly,
              }}
            />
          </FormControl>
        </GridListTile>
        <GridListTile>
          <Button
            classes={{root: classes.remarksBtn, label: classes.remarksLabel}}
            disabled={aturBtnCounter || readOnly}
            onClick={() => this.handleModal('aturBtnDialog')}
            dense="true"
          >
            <img
              src={weightIcon}
              alt="weight"
              className={
                !aturBtnCounter
                  ? classes.remarksImgEnabled
                  : classes.remarksImgDisabled
              }
            />
            {remarksLabel}
          </Button>
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
                          item.packingKayu && <div className={classes.chipWrapper}>
                              <Chip onDelete={() => this.handleRequestDeleteSurcharge(item, 'packingKayu')} className={classes.chip} label={'Packing Kayu'} />
                            </div>
                        }
                        {
                          item.surcharge && <div className={classes.chipWrapper}>
                              <Chip onDelete={() => this.handleRequestDeleteSurcharge(item, 'surcharge')} className={classes.chip} label={item.surcharge} />
                            </div>
                        }
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <Button
                            classes={{root: classes.additionalSurchargeBtn, label: classes.additionalSurchargeLabel}}
                            onClick={() => onRequestSurchargeModal(item)} dense="true" disabled={readOnly}
                          >
                            <Add />
                          </Button>
                          <Button
                            classes={{root: classes.additionalSurchargeBtn, label: classes.additionalSurchargeLabel}}
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

          {
            currentKoli &&
          
          <Dialog
              open={openDialog}
              onClose={handleCloseSurchargeModal}
              aria-labelledby="service-title"
              aria-describedby="service-content"
              classes={{paperWidthSm: classes.dialogWrapper}}
            >
              <DialogTitle id="service-title">Additional Services</DialogTitle>
              <DialogContent id="service-content">
                <SurchargeCheckboxes
                  surcharges={this.state.surcharges}
                  handleChange={this.handleChangeSurcharges}
                  adtReducer={adtSurcharge}
                  koli={currentKoli}
                  pk={pk}
                />
              </DialogContent>
              <DialogActions>{this.actionsModal}</DialogActions>
            </Dialog>
          }
        </GridListTile>
      </GridList>
    );
  }
}
export default PcsField;
