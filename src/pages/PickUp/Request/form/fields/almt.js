import React from 'react';
import {FormControl, InputLabel, Input} from 'material-ui';

const AlmtField = (props) => {
  const {classes, item, handleChange} = props;
  return (
    <FormControl className={classes.textField}>
      {/*almtField*/}
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
        classes={{inkbar: classes.inputInkbarFocused}}
        id="focusedInput"
        value={item.value}
        rows={4}
        rowsMax={4}
        multiline
        inputProps={{
          readOnly: props.readOnly,
          disabled: props.readOnly,
        }}
      />
    </FormControl>
  );
};
export default AlmtField;
