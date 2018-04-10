import React, { Component } from 'react';
import {Grid, FormControl, InputLabel, Input} from 'material-ui';

class TriK extends Component {
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
    const {classes, item, handleChange, handleFocusSearch, handleBlurSearch, showFocus, readOnly} = this.props;
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
          value={item.value}
          onChange={handleChange}
          onFocus={handleFocusSearch}
          onBlur={handleBlurSearch}
          /*classes={{inkbar: classes.inputInkbarFocused}}*/
          id="focusedInput"
          inputProps={{
            readOnly: readOnly,
            disabled: readOnly,
            style: {padding: '20px 0px'},
          }}
        />
      </FormControl>
    );
  }
};
export default TriK;
