import React, {Component} from 'react';
import {FormControl} from 'material-ui';
import {Input, InputAdornment, InputLabel} from 'material-ui/Input';

const rightSide = [
  {
    name: 'insuredVal',
    label: 'Insured Value',
    value: '',
  },
  {
    name: 'remarks',
    label: 'Remarks',
    value: '',
  },
];

class RightSide extends Component {
  componentWillReceiveProps(nextProps) {
    rightSide[0].value = nextProps.privateData.insuredVal || '';
    rightSide[1].value = nextProps.privateData.remarks || '';
  }
  render() {
    const {classes, handleChange} = this.props;
    return rightSide.map((text, index) => (
      <FormControl key={index}>
        <InputLabel
          key={index}
          FormLabelClasses={{focused: classes.inputLabelFocused}}
          htmlFor="focusedInput"
          className={classes.inputLabel}
        >
          {text.label}
        </InputLabel>
        <Input
          key={index}
          classes={{inkbar: classes.inputInkbarFocused}}
          id="focusedInput"
          onChange={handleChange}
          className={classes.textField}
          name={text.name}
          value={text.value}
          startAdornment={
            text.name === 'insuredVal' && (
              <InputAdornment position="start">Rp.</InputAdornment>
            )
          }
        />
      </FormControl>
    ));
  }
}
export default RightSide;
