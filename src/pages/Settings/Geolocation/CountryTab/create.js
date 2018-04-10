import React, {Component} from 'react';

import Grid from 'material-ui/Grid';
import {TextField} from 'material-ui';
class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_code: '',
      country_name: '',
      edit: false,
      inited: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.props.edit &&
      !this.state.inited &&
      this.setState({inited: true, ...nextProps.formdata});
  };
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {classes} = this.props;
    const {country_code, country_name} = this.state;
    const {handleChange} = this;
    return (
      <Grid container>
        <Grid item xs={6} sm={6}>
          <TextField
            value={country_code}
            label="Code"
            required
            className={classes.textField}
            onChange={handleChange('country_code')}
          />
          <br />
          <TextField
            value={country_name}
            label="Name"
            required
            className={classes.textField}
            onChange={handleChange('country_name')}
          />
          <br />
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
