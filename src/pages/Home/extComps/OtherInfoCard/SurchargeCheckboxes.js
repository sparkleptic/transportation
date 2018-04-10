import React from 'react';
import {Checkbox, FormControlLabel, Grid} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import Radio, {RadioGroup} from 'material-ui/Radio';
import List, { ListItem} from 'material-ui/List';
import {RadioButtonChecked, RadioButtonUnchecked} from 'material-ui-icons';
const Styles = (theme) => ({
  uniqueInputFill: {
    color: 'rgb(50, 57, 144)',
  },
  additionalSurchargeTile: {
    margin: 3,
  },
  root: {
    flexGrow: 1,
  },
  listItem: {
    padding: '0px 24px'
  }
});

const surchargeCheckboxes = (props) => {
  const {
    handleChange,
    adtReducer,
    removeSurchargeItem,
    classes,
    pk,
    surcharges,
    overWeight,
    koli,
  } = props;
  return (
    <List className={classes.root}>
      <ListItem className={classes.listItem}>
        <FormControlLabel
          control={
            <Checkbox
              name="packingKayu"
              checked={koli.packingKayu}
              onChange={handleChange}
              classes={{checked: classes.uniqueInputFill}}
              style={{clear: 'both'}}
            />
          }

          label={'Packing Kayu'}
        />
      </ListItem>
      {
        koli.packingKayu && ['1', '2', '3'].map((pktype) =>
        <ListItem className={classes.listItem} key={pktype}>
          <Radio checked={koli.pkType === pktype} onChange={handleChange} value={pktype} name="pkType" />
          <label>PK{pktype}</label>
        </ListItem>
      )}
      {surcharges.map((box, index) => (
        <ListItem className={classes.listItem} key={index}>
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                name="surcharge"
                checked={koli.surcharge === box.surcharge_name}
                checkedIcon={<RadioButtonChecked />}
                icon={<RadioButtonUnchecked />}
                onChange={handleChange}
                value={box.surcharge_name}
                classes={{checked: classes.uniqueInputFill}}
              />
            }
            label={box.surcharge_name}
          />
        </ListItem>
        ))}
      </List>
  );
};
export default withStyles(Styles)(surchargeCheckboxes);
