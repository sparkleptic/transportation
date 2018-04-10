import React, { Component } from 'react';
import {Grid, FormControl, Input, InputLabel, IconButton} from 'material-ui';

class NamaPenerima extends Component {
  state={
    input: null
  }
  focusUsernameInputField = (input) => {
    if (input) {
      this.setState({input});
    }
  };
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.autoFocus && this.state.input) {
      setTimeout(() => {this.state.input.focus();}, 100);
    }
  }
  render() {
    const {classes, handleChange, handleOpenDialog, item, autoFocus, readOnly} = this.props;
    const {focusUsernameInputField} = this;
    return (
      <FormControl fullWidth={true} margin="normal">
        <InputLabel
          FormLabelClasses={{focused: classes.inputLabelFocused}}
          htmlFor="focusedInput"
        >
          {item.label}
        </InputLabel>
        <Input readOnly={readOnly} disabled={readOnly}
          inputRef={focusUsernameInputField}
          type="text"
          name={item.name}
          onChange={handleChange}
          value={item.value}
          /*classes={{inkbar: classes.inputInkbarFocused}}*/
          id="focusedInput"
          inputProps={{
            readOnly: readOnly,
            disabled: readOnly,
          }}
        />
      </FormControl>
    );
  }
}
export default NamaPenerima;
