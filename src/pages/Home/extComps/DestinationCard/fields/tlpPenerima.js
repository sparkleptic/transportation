import React, {Component} from 'react';
import {Grid, FormControl, InputLabel, Input} from 'material-ui';

class TlpPenerima extends Component {
  render() {
    const {classes, item, handleChange, readOnly} = this.props;
    return (
      <FormControl fullWidth={true} margin="normal">
        <InputLabel
          FormLabelClasses={{focused: classes.inputLabelFocused}}
          htmlFor="focusedInput"
        >
          {item.label}
        </InputLabel>
        <Input readOnly={readOnly} disabled={readOnly}
          type="text"
          name={item.name}
          value={item.value}
          onChange={handleChange}
          /*classes={{inkbar: classes.inputInkbarFocused}}*/
          id="focusedInput"
          maxLength={15}
          inputProps={{
            maxLength: 15,
            readOnly: readOnly,
            disabled: readOnly,
          }}
        />
      </FormControl>
    )
  }
};
export default TlpPenerima;
