import React from 'react';
import {Grid, FormControl, Input, InputLabel} from 'material-ui';

const Tlpdankodepos = (props) => {
  const {classes, item, handleChange} = props;
  return (
    <FormControl fullWidth={true} margin="normal">
      <InputLabel
        FormLabelClasses={{focused: classes.inputLabelFocused}}
        htmlFor="focusedInput"
        className={classes.inputLabel}
      >
        {item.label}
      </InputLabel>
      <Input readOnly={props.readOnly} disabled={props.readOnly}
        type="text"
        name={item.name}
        value={item.value}
        onChange={handleChange}
        /*classes={{inkbar: classes.inputInkbarFocused}}*/
        id="focusedInput"
        maxLength={15}
        inputProps={{
          maxLength: 15,
          readOnly: Boolean(props.readOnly),
          disabled: Boolean(props.readOnly),
        }}
      />
    </FormControl>
  );
};
export default Tlpdankodepos;
