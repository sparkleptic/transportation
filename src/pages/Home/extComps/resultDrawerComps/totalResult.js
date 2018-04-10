import React from 'react';
import {GridList, GridListTile} from 'material-ui';
import {getGrandTotal} from './grandTotalResult';

let totalBasePrice = 0;
let totalSurchargePrice = 0;
let totalInsurancePrice = 0;
export const getTotalBasePrice = (e) => {
  totalBasePrice = e;
};

export const getTotalSurchargePrice = (e) => {
  totalSurchargePrice = e;
};

export const getTotalInsurancePrice = (e) => {
  totalInsurancePrice = e;
};

const TotalResult = (props) => {
  const {allReducer, classes, otherInfoReducer} = props;
  const total = totalBasePrice + totalSurchargePrice + totalInsurancePrice;
  getGrandTotal(total);
  return (
    <GridList cols={2} cellHeight="auto">
      <GridListTile cols={2}>
        <GridList cols={2} cellHeight="auto">
          <GridListTile>
            <label className={classes.tariffSummary}>Total Biaya</label>
          </GridListTile>
          <GridListTile>
            <label
              className={classes.tariffSummary}
              style={{float: 'right', marginRight: 10}}
            >
              {total > 0 ? (
                <span style={{color: '#000'}}>Rp {total.toFixed(2)}</span>
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
export default TotalResult;
