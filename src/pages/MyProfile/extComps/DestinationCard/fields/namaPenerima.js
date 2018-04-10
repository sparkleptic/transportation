import React from 'react';
import {Grid, FormControl, Input, InputLabel, IconButton} from 'material-ui';

const NamaPenerima = (props) => {
  const {classes, handleChange, handleOpenDialog, item} = props;
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
            onChange={handleChange}
            value={item.value}
            classes={{inkbar: classes.inputInkbarFocused}}
            id="focusedInput"
            inputProps={{
              readOnly: props.readOnly,
              disabled: props.readOnly,
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};
export default NamaPenerima;
