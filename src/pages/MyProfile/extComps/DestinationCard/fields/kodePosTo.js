import React from 'react';
import {Grid, FormControl, Input, InputLabel} from 'material-ui';


const KodePostTo = (props) => {
  const {classes, kodePos, kodeTo} = props;
  return (
    <Grid
      container
      spacing={0}
      className={classes.textField}
    >
      <Grid item md={6}>
        <FormControl style={{marginRight: 10}}>
          <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput" className={classes.inputLabel}>
            Kode Pos
          </InputLabel>
          <Input type="text" readOnly disabled value={kodePos} id="focusedInput" inputProps={{readOnly: true, disabled: true}} />
        </FormControl>
      </Grid>
      <Grid item md={6}>
        <FormControl>
          <InputLabel FormControlClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput" className={classes.inputLabel}>
            Kode Tujuan
          </InputLabel>
          <Input type="text" readOnly disabled value={kodeTo} id="focusedInput" inputProps={{readOnly: true, disabled: true}} />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default KodePostTo;
