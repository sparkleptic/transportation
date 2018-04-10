import React, {Component} from 'react';
import {FormControl, FormLabel, Grid} from 'material-ui';
import InputLabel from 'material-ui/Input/InputLabel';
import Input from 'material-ui/Input/Input';
import InputAdornment from 'material-ui/Input/InputAdornment';

class BlptBtn extends Component {
  handleChg = (n, e) => {
    this.props.handleChange(e, n);
  };

  render() {
    const {
      gridListBlpt,
      blpt,
      koli,
      inputLabelFocused,
      inputInkbarFocused,
      num,
      idx,
      key,
      readOnly,
    } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <FormControl fullWidth={true} margin="normal">
            <FormLabel classes={{focused: inputLabelFocused}}>
              <strong style={{marginRight: 0}}>
                {num >= 0 && `${num + 1}.`}
              </strong>{' '}
              Berat *
            </FormLabel>
            <Input readOnly={readOnly} disabled={readOnly}
              onChange={this.handleChg.bind(this, idx)}
              type="number"
              name="berat"
              inputProps={{
                readOnly: readOnly,
                disabled: readOnly,
              }}
              step="0.00001"
              value={koli.berat}
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              /*classes={{inkbar: inputInkbarFocused}}*/
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth={true} margin="normal">
            <FormLabel classes={{focused: inputLabelFocused}}>
              Lebar *
            </FormLabel>
            <Input readOnly={readOnly} disabled={readOnly}
              onChange={this.handleChg.bind(this, idx)}
              type="number"
              name="lebar"
              inputProps={{
                readOnly: readOnly,
                disabled: readOnly,
              }}
              value={koli.lebar}
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              /*classes={{inkbar: inputInkbarFocused}}*/
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth={true} margin="normal">
            <FormLabel classes={{focused: inputLabelFocused}}>
              Panjang *
            </FormLabel>
            <Input readOnly={readOnly} disabled={readOnly}
              onChange={this.handleChg.bind(this, idx)}
              type="number"
              name="panjang"
              inputProps={{
                readOnly: readOnly,
                disabled: readOnly,
              }}
              value={koli.panjang}
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
             /* classes={{inkbar: inputInkbarFocused}}*/
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth={true} margin="normal">
            <FormLabel classes={{focused: inputLabelFocused}}>
              Tinggi *
            </FormLabel>
            <Input readOnly={readOnly} disabled={readOnly}
              onChange={this.handleChg.bind(this, idx)}
              type="number"
              name="tinggi"
              inputProps={{
                readOnly: readOnly,
                disabled: readOnly,
              }}
              value={koli.tinggi}
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              /*classes={{inkbar: inputInkbarFocused}}*/
            />
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}
export default BlptBtn;
