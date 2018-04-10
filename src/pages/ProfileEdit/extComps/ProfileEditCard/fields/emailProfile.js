import React from 'react';
import {Grid, FormControl, IconButton} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';

const EmailProfile = (props) => {
  const {
    classes,
    item,
    handleOpenDialog,
    handleChange,
    openSearchDialog,
    dataProfile,
    handleChangeText,
    handleRowClick,
  } = props;

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
            // classes={{inkbar: classes.inputInkbarFocused}}
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
export default EmailProfile;
