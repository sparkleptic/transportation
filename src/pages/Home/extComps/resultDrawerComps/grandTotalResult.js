import React from 'react';
import {GridList, GridListTile} from 'material-ui';

let grandTotal = 0;

export const getGrandTotal = (e) => {
  grandTotal = e;
};

const GrandTotalResult = (props) => {
  const {allReducer, classes, otherInfoReducer} = props;
  let allTotal = 0;
  allReducer.map((p) => {
    allTotal = allTotal + parseInt(p.package.Total, 10);
    return p;
  });
  allTotal = props.readOnly ? allTotal : allTotal + grandTotal;
  return (
    <GridList cols={2} cellHeight="auto">
      <GridListTile cols={2}>
        <GridList cols={2} cellHeight="auto">
          <GridListTile>
            <label className={classes.subtotal}>Grand Total</label>
          </GridListTile>
          <GridListTile>
            <label
              className={classes.subtotal}
              style={{float: 'right', marginRight: 10}}
            >
              {allTotal > 0 ? (
                <span style={{color: '#000'}}>Rp {allTotal.toFixed(2)}</span>
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
export default GrandTotalResult;
