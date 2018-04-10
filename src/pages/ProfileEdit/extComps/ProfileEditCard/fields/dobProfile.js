import React from 'react';
import {Grid, FormControl,Paper, Input, InputLabel, TextField} from 'material-ui';

const DobProfile = (props) => {
  const {classes, item, handleChange, req_date} = props;
  return (
    <Grid container spacing={0}>
      <Grid item>
        <FormControl className={classes.textField}>
          {console.log('value date:' , item)}

          <InputLabel
            // FormControlClasses={{focused: classes.inputLabelFocused}}
            htmlFor="focusedInput"
            className={classes.inputLabel}
          >
            {item.label}
          </InputLabel>

          <Input

            type="datetime-local"
            name={item.DobProfile}
            value={item.value}
            onChange={handleChange}
            id="datetime-local"
            // inputProps={{
            //   readOnly: true,
            //   disabled: true,
            // }}
            // onChange={this.handleChange('req_date')}

          />
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default DobProfile;
