import React, { Component } from 'react';
import {Grid, withStyles, Hidden} from 'material-ui';
import OriginCard from './OriginCard';
import DestinationCard from './DestinationCard';
import OtherCard from './OtherInfoCard';
const Styles = (theme) => ({
});

let form = null;

class MainHomeComp extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.privateData.otherInfoReducer.focusField === 'deskripsiInput') {
      form && form.scrollIntoView({behavior: 'smooth'});
    }
    
  }
  render() {
    const {
      classes,
      handleSearch,
      almtPenerimaReducer,
      BASE_API,
      almtPenerimaChecker,
      kodePosFunc,
      readOnly,
      handleFocusSearch,
      handleBlurSearch,
      handleRequestPrintKoli,
      surcharges,
    } = this.props;
    const {
      setOriginData,
      setDestinationData,
      setInputDestination,
      setInputOrigin,
      setInputOtherInfo,
      removeSurchargeItem,
      setFocusToNextInput,
      updateKoliSurcharge,
    } = this.props.store;
    const {
      originReducer,
      destReducer,
      otherInfoReducer,
      allReducer,
    } = this.props.privateData;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <OriginCard
            setInputOrigin={setInputOrigin}
            setOriginData={setOriginData}
            setFocusToNextInput={setFocusToNextInput}
            privateData={originReducer}
            allReducer={allReducer}
            readOnly={ allReducer.length || readOnly}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DestinationCard
            setInputDestination={setInputDestination}
            setDestinationData={setDestinationData}
            privateData={destReducer}
            handleSearch={handleSearch}
            handleFocusSearch={handleFocusSearch}
            handleBlurSearch={handleBlurSearch}
            almtPenerimaReducer={almtPenerimaReducer}
            almtPenerimaChecker={almtPenerimaChecker}
            setFocusToNextInput={setFocusToNextInput}
            kodePosFunc={kodePosFunc}
            allReducer={allReducer}
            readOnly={readOnly}
          />
        </Grid>
        <Grid item xs={12}>
          <OtherCard
            setInputOtherInfo={setInputOtherInfo}
            readOnly={readOnly}
            privateData={otherInfoReducer}
            removeSurchargeItem={removeSurchargeItem}
            almtPenerimaReducer={almtPenerimaReducer}
            BASE_API={BASE_API}
            allReducer={allReducer}
            updateKoliSurcharge={updateKoliSurcharge}
            handleRequestPrintKoli={handleRequestPrintKoli}
            surcharges={surcharges}
          />
        </Grid>
      </Grid>
    );
  }
};
export default withStyles(Styles)(MainHomeComp);
