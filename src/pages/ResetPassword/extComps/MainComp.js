import React from 'react';
import {Grid, withStyles, Hidden} from 'material-ui';
import OriginCard from './OriginCard';
const Styles = (theme) => ({
  rootGrid: {
    flexGrow: 1,
  },
  root: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
  paper: {
    width: "100%",
    display:" inline",
  },
  cards:{
    display:" inline",
  }
});
const MainHomeComp = (props) => {
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
  } = props;
  const {
    setInputDestination,
    setInputOrigin,
    setInputOtherInfo,
    removeSurchargeItem,
  } = props.store;
  const {
    originReducer,
    destReducer,
    otherInfoReducer,
    allReducer,
  } = props.privateData;
  return (
    <div className={classes.root}>
      <Grid container className={classes.rootGrid} spacing={0}>
        <Grid item  xs={12}>
          <Grid container spacing={24} className={classes.cards}>
            <Grid  item>
              <OriginCard
                setInputOrigin={setInputOrigin}
                privateData={originReducer}
                allReducer={allReducer}
                readOnly={readOnly}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*Mobile*/}
      <Hidden smUp>
        <Grid
          container
          className={classes.rootGrid}
          spacing={16}
          justify="center"
        >
          <Grid item md={4}>
            <Grid container spacing={0}>
              <Grid item>
                <OriginCard
                  setInputOrigin={setInputOrigin}
                  privateData={originReducer}
                  readOnly={readOnly}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </div>
  );
};
export default withStyles(Styles)(MainHomeComp);
