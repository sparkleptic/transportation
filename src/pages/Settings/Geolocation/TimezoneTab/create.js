import React, {Component} from 'react';

import Grid from 'material-ui/Grid';
import {TextField, MenuItem} from 'material-ui';
class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province: '',
      city: '',
      district: '',
      subdistrict: '',
      zipcode: '',
    };
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });

    this.props.onUpdateForm(name, event.target.value);
  };
  render() {
    const {classes} = this.props;
    const {province, city, district, subdistrict, zipcode} = this.state;
    return (
      <Grid container>
        <Grid item xs={6} sm={6}>
          <TextField
            id="province"
            select
            required
            label="Province"
            className={classes.textField}
            value={province}
            onChange={this.handleChange('province')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            <MenuItem key={0} value={0}>
              Done
            </MenuItem>
            <MenuItem key={1} value={1}>
              Pending
            </MenuItem>
          </TextField>
          <br />

          <TextField
            id="city"
            select
            required
            label="City"
            className={classes.textField}
            value={city}
            onChange={this.handleChange('city')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            <MenuItem key={0} value={0}>
              Done
            </MenuItem>
            <MenuItem key={1} value={1}>
              Pending
            </MenuItem>
          </TextField>
          <br />
          <TextField
            id="district"
            select
            required
            label="District"
            className={classes.textField}
            value={district}
            onChange={this.handleChange('district')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            <MenuItem key={0} value={0}>
              Done
            </MenuItem>
            <MenuItem key={1} value={1}>
              Pending
            </MenuItem>
          </TextField>
          <br />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="subdistrict"
            select
            required
            label="SubDistrict"
            className={classes.textField}
            value={subdistrict}
            onChange={this.handleChange('subdistrict')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            <MenuItem key={0} value={0}>
              Done
            </MenuItem>
            <MenuItem key={1} value={1}>
              Pending
            </MenuItem>
          </TextField>
          <br />
          <TextField
            id="zipcode"
            select
            required
            label="Zipcode"
            className={classes.textField}
            value={zipcode}
            onChange={this.handleChange('zipcode')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            <MenuItem key={0} value={0}>
              Done
            </MenuItem>
            <MenuItem key={1} value={1}>
              Pending
            </MenuItem>
          </TextField>
          <br />
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
