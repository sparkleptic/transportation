import React from 'react';
import {GridList, GridListTile} from 'material-ui';
import _ from 'lodash';
import {getTotalSurchargePrice} from './totalResult';
var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();

let basePriceBase = 0;

export const getBasePrice = (e) => {
  basePriceBase = e;
};

const SurchargeResult = (props) => {
  const {allReducer, classes, otherInfoReducer, surcharges} = props;
  let scharge = {price: 0, name: ''};
  let sgArr = {};
  const adtSurcharge = otherInfoReducer.adtSurcharge;
  otherInfoReducer.koli.map((koliItem, index) => {
    if (koliItem.surcharge !== '' && koliItem.surcharge !== 'Overweight') {
      const formula = surcharges.filter((surcharge) => surcharge.surcharge_name === koliItem.surcharge);
      if (formula) {
        const newF = formula[0].formula.replace('%BASE_TARIFF', 'baseTariff');
        parser.setVariable('baseTariff', basePriceBase);
        const result = parser.parse(newF);
        sgArr[koliItem.surcharge] ? sgArr[koliItem.surcharge].push(result.result) : sgArr[koliItem.surcharge] = [koliItem.surcharge];
        scharge.price = scharge.price + result.result;
      }
    }
  });
  /*if (sgArr.length > 0) {
    scharge = _.maxBy(sgArr, 'price');
  }*/

  let cmp = null;
  if (Object.keys(sgArr).length) {
    cmp = (
      <div className={classes.tariffSummary}> Biaya Lain-lain
        {
          Object.keys(sgArr).map((item) => <div style={{color: '#deb887'}} key={item}>--{`${item}( ${sgArr[item].length} )`}</div>)
        }
      </div>
    );
  } else {
    cmp = <label className={classes.tariffSummary}>No Surcharge</label>;
  }
  getTotalSurchargePrice(scharge.price);
  sessionStorage.setItem('surcharge', scharge.price);
  return (
    <GridList cols={2} cellHeight="auto">
      <GridListTile cols={2}>
        <GridList cols={2} cellHeight="auto">
          <GridListTile>{cmp}</GridListTile>
          <GridListTile>
            <label
              className={classes.tariffSummary}
              style={{float: 'right', marginRight: 10}}
            >
              {scharge.price > 0 ? (
                <span style={{color: '#000'}}>Rp {scharge.price.toFixed(2)}</span>
              ) : (
                `Rp ` + 0
              )}
            </label>
          </GridListTile>
        </GridList>
      </GridListTile>
    </GridList>
  );
};
export default SurchargeResult;
