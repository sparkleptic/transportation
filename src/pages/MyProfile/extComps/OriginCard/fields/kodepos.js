import React from 'react';
import {Grid, FormControl, Input, InputLabel} from 'material-ui';

const kodepos = (props) => {
  const {classes, item, handleChange} = props;
  return (
    <Grid container spacing={0}>
      <Grid item>
        <FormControl className={classes.textField}>
          <InputLabel
            FormControlClasses={{focused: classes.inputLabelFocused}}
            htmlFor="focusedInput"
            className={classes.inputLabel}
          >
            {item.label}
          </InputLabel>
          <Input
            type="text" readOnly disabled
            name={item.name}
            value={item.value}
            onChange={handleChange}
            id="focusedInput"
            inputProps={{
              readOnly: true,
              disabled: true,
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default kodepos;
