import React from 'react';
import {Grid, FormControl, Input, InputLabel} from 'material-ui';


const KodePostTo = (props) => {
  const {classes, kodePos, kodeTo} = props;
  return (
    <Grid
      container
      spacing={0}
    >
      <Grid item md={6}>
        <FormControl fullWidth={true} margin="normal">
          <InputLabel FormLabelClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput">
            Kode Pos
          </InputLabel>
          <Input type="text" readOnly disabled value={kodePos} id="focusedInput" inputProps={{readOnly: true, disabled: true}} />
        </FormControl>
      </Grid>
      <Grid item md={6}>
        <FormControl fullWidth={true} margin="normal">
          <InputLabel FormLabelClasses={{focused: classes.inputLabelFocused}} htmlFor="focusedInput">
            Kode Tujuan
          </InputLabel>
          <Input type="text" readOnly disabled value={kodeTo} id="focusedInput" inputProps={{readOnly: true, disabled: true}} />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default KodePostTo;
