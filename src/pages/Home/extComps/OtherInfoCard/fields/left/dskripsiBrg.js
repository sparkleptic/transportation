import React, { Component } from 'react';
import {FormControl, InputLabel, Input} from 'material-ui';

class DskripsiBrg extends Component {
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
    const {classes, text, handleChange, readOnly} = this.props;
    const {focusUsernameInputField} = this;
    return (
      <FormControl>
        {' '}
        {/*dskrpsiBrg*/}
        <InputLabel
          FormLabelClasses={{focused: classes.inputLabelFocused}}
          htmlFor="focusedInput"
          className={classes.inputLabel}
        >
          {text.label}
        </InputLabel>
        <Input readOnly={readOnly} disabled={readOnly}
          inputRef={focusUsernameInputField}
          /*classes={{inkbar: classes.inputInkbarFocused}}*/
          id="deskripsiInput"
          onChange={handleChange}
          className={classes.textField}
          name={text.name}
          value={text.value}
          inputProps={{
            readOnly: readOnly,
            disabled: readOnly,
          }}
        />
      </FormControl>
    );
  }
};

export default DskripsiBrg;
