import React from 'react';
import {Grid, FormControl, Input, InputLabel} from 'material-ui';

const Tlpdankodepos = (props) => {
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
            type="text"
            name={item.name}
            value={item.value}
            onChange={handleChange}
            classes={{inkbar: classes.inputInkbarFocused}}
            id="focusedInput"
            inputProps={{
              readOnly: Boolean(props.readOnly),
              disabled: Boolean(props.readOnly),
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default Tlpdankodepos;
