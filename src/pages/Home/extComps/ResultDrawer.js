import React, {Component} from 'react';
import _ from 'lodash';
import withStyles from 'material-ui/styles/withStyles';
import {
  Drawer,
  Divider,
  FormControl,
  FormControlLabel,
  Select,
  MenuItem,
  IconButton,
} from 'material-ui';
import Grow from 'material-ui/transitions/Grow';
import GridList, {GridListTile} from 'material-ui/GridList';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import classNames from 'classnames';
import Chip from 'material-ui/Chip/Chip';
import SearchDrawer from './searchDrawer';
import PackageResult from './resultDrawerComps/packageResult';
import WeightResult from './resultDrawerComps/weightResult';
import TotalResult from './resultDrawerComps/totalResult';
import {getTotalInsurancePrice} from './resultDrawerComps/totalResult';
import GrandTotalResult from './resultDrawerComps/grandTotalResult';
import SurchargeResult from './resultDrawerComps/surchargeResult';
import ServiceResultChip from './resultDrawerComps/serviceResult';
import BaseTariff from './resultDrawerComps/baseTariff';
import {Biaya} from '../../../tariff_engine';
import axios from 'axios';
import {BASE_API} from '../../../api';

const Styles = {
  drawerPaper: {
    height: '100%',
    top: 0,
    width: 300,
    zIndex: 0,
    overflow: 'hidden',
    border: 'none',
    paddingTop: 80,
  },
  gridTile: {
    margin: '10px 0px -8px 15px',
    width: '30%',
  },
  weightGridTile: {
    margin: '10px 15px 12px 15px',
  },
  resultLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.46)',
    margin: '0px 0px 5px 0px',
    width: 120,
  },
  divider: {
    backgroundColor: '#95989a',
    marginTop: 10,
  },
  nextDivider: {
    backgroundColor: '#95989a',
    margin: 12,
    width: 240,
  },
  formControl: {
    /*minWidth: 120,
    maxWidth: 200,
    left: 53,*/
    width: '100%',
    bottom: 3,
  },
  menuItem: {
    minWidth: 258,
    maxWidth: 500,
    minHeight: 40,
    maxHeight: 50,
  },
  resultSearchBtn: {
    top: 10,
    float: 'right',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  label: {
    marginTop: 8,
    marginLeft: -27,
  },
  chips: {
    backgroundColor: '#303f9f',
    color: '#fafafa',
  },
  tariffSummary: {
    marginLeft: 13,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.46)',
  },
  subtotal: {
    marginLeft: 13,
    marginTop: 5,
    fontSize: 18,
    fontWeight: 600,
  },
  kodeNWeight: {
    marginLeft: 13,
  },
};
const resultDrawerLabel = [
  'Package',
  'Actual Weight',
  'Volume Weight',
  'Chargeable Weight',
  'price&weight',
];

// let clonedBaseTariff = _.clone(Biaya)
class ResultDrawer extends Component {
  constructor() {
    super();
    this.state = {
      baseTariff: Biaya,
      isPackageKayu: false,
      insurance: false,
      surcharges: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    const {otherInfoReducer} = nextProps.privateData;
    const adtSurcharge = otherInfoReducer.adtSurcharge;
    if (adtSurcharge.includes('Packing Kayu')) {
      this.setState({
        isPackageKayu: true, insurance: adtSurcharge.includes('insurance') || false,
      });
    } else {
      this.setState({
        isPackageKayu: false, insurance: adtSurcharge.includes('insurance') || false,
      });
    }
    let insurance = 0;
    if (otherInfoReducer.insuredVal) {
      insurance = 5000 + insurance + Math.floor((otherInfoReducer.insuredVal * 0.002) * 1000) / 1000;
    }
    getTotalInsurancePrice(insurance);
  }

  render() {
    const {
      privateData,
      packageValue,
      packageItem,
      /*_VCW,
      _CW,
      _AW,*/
      classes,
      handlePackageChange,
      selectionCout,
      openSearchDrawer,
      handleDrawer,
      searchResultAlmt,
      fetchAlmtPenerima,
      readOnly,
      setWeight,
      surcharges,
    } = this.props;
    const {
      originReducer,
      destReducer,
      otherInfoReducer,
      allReducer,
    } = privateData;
    //   console.log('all', allReducer)
    //let clonedVCW = _.clone(_VCW);

    return (
      <div>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="right"
        >
          <GridList cols={2} cellHeight="auto">
            <GridListTile cols={2}>
              <PackageResult
                allReducer={allReducer}
                resultDrawerLabel={resultDrawerLabel}
                classes={classes}
                packageValue={packageValue}
                handlePackageChange={handlePackageChange}
                packageItem={packageItem}
                handleDrawer={handleDrawer}
              />
              <Divider style={{marginTop: Styles.divider.marginTop}} />
            </GridListTile>
            <GridListTile cols={2}>
              <WeightResult
                setWeight={setWeight}
                resultDrawerLabel={resultDrawerLabel}
                classes={classes}
                allReducer={allReducer}
                otherInfoReducer={otherInfoReducer}
                /*_AW={_AW}
                _CW={_CW}
                clonedVCW={clonedVCW}*/
                isPackageKayu={this.state.isPackageKayu}
              />
              <Divider style={{marginTop: Styles.divider.marginTop}} />
            </GridListTile>
            <GridListTile cols={2}>
              <BaseTariff
                classes={classes}
                allReducer={allReducer}
                baseTariff={Biaya}
                otherInfoReducer={otherInfoReducer}
              />
            </GridListTile>
            <GridListTile cols={2}>
              <SurchargeResult
                classes={classes}
                allReducer={allReducer}
                baseTariff={Biaya}
                otherInfoReducer={otherInfoReducer}
                surcharges={surcharges}
              />
            </GridListTile>
            <GridListTile cols={2}>
              <GridList cols={2} cellHeight="auto">
                <GridListTile>
                  <label className={classes.tariffSummary}>
                    {'Asuransi'}
                  </label>
                </GridListTile>
                  <GridListTile>
                    <label
                      className={classes.tariffSummary}
                      style={{float: 'right', marginRight: 10}}
                    >
                      Rp {otherInfoReducer.insuredVal ? (Math.floor((otherInfoReducer.insuredVal * 0.002) * 1000) / 1000).toFixed(2) : 0}
                    </label>
                </GridListTile>
              </GridList>
            </GridListTile>
            <GridListTile cols={2}>
              <GridList cols={2} cellHeight="auto">
                <GridListTile>
                    <label
                      className={classes.tariffSummary}
                    >
                      Adm. Asuransi
                    </label>
                  </GridListTile>
                  <GridListTile>
                    <label
                      className={classes.tariffSummary}
                      style={{float: 'right', marginRight: 10}}
                    >
                      Rp {otherInfoReducer.insuredVal ? '5000.00' : 0}
                    </label>
                </GridListTile>
              </GridList>
            </GridListTile>

            <GridListTile cols={2}>
              <TotalResult
                classes={classes}
                allReducer={allReducer}
                baseTariff={Biaya}
                otherInfoReducer={otherInfoReducer}
              />
              <Divider style={{marginTop: Styles.divider.marginTop}} />
            </GridListTile>
            <GridListTile cols={2}>
              <GrandTotalResult
                readOnly={readOnly}
                classes={classes}
                allReducer={allReducer}
                baseTariff={Biaya}
                otherInfoReducer={otherInfoReducer}
              />
            </GridListTile>
          </GridList>
        </Drawer>
        {openSearchDrawer ? (
          <SearchDrawer
            open={openSearchDrawer}
            handleDrawer={handleDrawer}
            destReducer={destReducer}
            fetchAlmtPenerima={fetchAlmtPenerima}
            data={searchResultAlmt !== null && searchResultAlmt}
          />
        ) : null}
      </div>
    );
  }
}
export default withStyles(Styles)(ResultDrawer);
