import React from 'react';
import {GridList, GridListTile} from 'material-ui';
import {chargeableWeightBase} from './baseTariff';

class WeightResult extends React.Component {
  render() {
    const {
      resultDrawerLabel,
      classes,
      allReducer,
      /*_AW,
      _CW,
      clonedVCW,*/
      otherInfoReducer,
      isPackageKayu,
      setWeight,
    } = this.props;
    let chargeableWeightArr = [];
    let actualWeightArr = [];
    let volumeWeightArr = [];

    otherInfoReducer.koli.map((item) => {
      const panjang = parseInt(item.panjang, 10);
      const pk = otherInfoReducer.pk;
      const tinggi = parseInt(item.tinggi, 10);
      const lebar = parseInt(item.lebar, 10);
      let volumeWeight = (panjang * tinggi * lebar / 6000).toFixed(3);
      let actualWeight = item.berat;
      let actualCw = 0;
      let chargeableWeight =
        actualWeight > volumeWeight ? actualWeight : volumeWeight;
      if (isPackageKayu) {
        if (actualWeight < 39) {
          if (actualWeight >= 0.1 && actualWeight <= 0.5) {
            actualCw = 1;
          } else if (actualWeight >= 0.6 && actualWeight <= 6) {
            actualCw = actualWeight * 200 / 100;
          } else if (actualWeight >= 7 && actualWeight <= 19) {
            actualCw = actualWeight * 150 / 100;
          } else if (actualWeight >= 20 && actualWeight <= 39) {
            actualCw = actualWeight * 130 / 100;
          }
        } else {
          if (lebar * panjang <= 50 * 50) {
            actualCw = parseInt(actualWeight, 10) + 6;
          } else if (lebar * panjang >= 50 * 50 && lebar * panjang <= 60 * 60) {
            actualCw = parseInt(actualWeight, 10) + 8;
          } else if (lebar * panjang >= 60 * 60 && lebar * panjang <= 70 * 70) {
            actualCw = parseInt(actualWeight, 10) + 10;
          } else if (lebar * panjang >= 70 * 70 && lebar * panjang <= 80 * 80) {
            actualCw = parseInt(actualWeight, 10) + 11;
          } else if (lebar * panjang >= 80 * 80 && lebar * panjang <= 90 * 90) {
            actualCw = parseInt(actualWeight, 10) + 12;
          } else if (
            lebar * panjang >= 90 * 90 &&
            lebar * panjang <= 100 * 100
          ) {
            actualCw = parseInt(actualWeight, 10) + 16;
          }
        }

        if (pk === '1') {
          volumeWeight = (
            (panjang + 13) *
            (lebar + 5) *
            (tinggi + 5) /
            6000
          ).toFixed(3);
        } else if (pk === '2') {
          volumeWeight = (
            (panjang + 17) *
            (lebar + 9) *
            (tinggi + 9) /
            6000
          ).toFixed(3);
        } else if (pk === '3') {
          volumeWeight = (
            (panjang + 19) *
            (lebar + 12) *
            (tinggi + 12) /
            6000
          ).toFixed(3);
        }
        actualWeight = item.berat;
        chargeableWeight = actualCw > volumeWeight ? actualCw : volumeWeight;
      } else {
        actualWeight = item.berat;
        chargeableWeight =
          actualWeight > volumeWeight ? actualWeight : volumeWeight;
      }
      let cw = Math.round(
        (chargeableWeight - parseInt(Math.floor(chargeableWeight), 10)) * 1000,
      );
      chargeableWeight =
        cw > 300 ? Math.ceil(chargeableWeight) : Math.floor(chargeableWeight);

      chargeableWeightArr.push(chargeableWeight);
      actualWeightArr.push(actualWeight);
      volumeWeightArr.push(parseFloat(volumeWeight));
    });

    const totalCW = chargeableWeightArr.reduce((acc, val) => {
      return acc + val;
    });
    const totalAW = actualWeightArr.reduce((acc, val) => {
      return acc + val;
    });
    const totalVW = volumeWeightArr.reduce((acc, val) => {
      return Math.ceil((acc + val) * 1000) / 1000;
    });

    setWeight('aw', totalAW);
    setWeight('cw', totalCW);
    chargeableWeightBase(totalCW);

    return (
      <div>
        <GridList cols={2} cellHeight="auto">
          <GridListTile cols={2}>
            <GridList cols={2} cellHeight="auto">
              <GridListTile cols={1.2} >
                <label className={classes.tariffSummary}>Actual Weight</label>
              </GridListTile>
              <GridListTile cols={0.8}>
                <label className={classes.tariffSummary} style={{float: 'right', marginRight: 10}}>
                  {totalAW + ' Kg'}
                </label>
              </GridListTile>
            </GridList>
          </GridListTile>
          <GridListTile cols={2}>
            <GridList cols={2} cellHeight="auto">
              <GridListTile cols={1.2}>
                <label className={classes.tariffSummary}>Volume Weight</label>
              </GridListTile>
              <GridListTile cols={0.8}>
                <label className={classes.tariffSummary} style={{float: 'right', marginRight: 10}}>
                  {totalVW + ' Kg'}
                </label>
              </GridListTile>
            </GridList>
          </GridListTile>
          <GridListTile cols={2}>
            <GridList cols={2} cellHeight="auto">
              <GridListTile cols={1.2}>
                <label className={classes.tariffSummary}>Chargeable Weight</label>
              </GridListTile>
              <GridListTile cols={0.8}>
                <label className={classes.tariffSummary} style={{float: 'right', marginRight: 10}}>
                  {totalCW + ' Kg'}
                </label>
              </GridListTile>
            </GridList>
          </GridListTile>
        </GridList>
      </div>
    );
  }
}
export default WeightResult;
