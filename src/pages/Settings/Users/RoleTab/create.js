import React, {Component} from 'react';
import {TextField} from 'material-ui';
import Grid from 'material-ui/Grid';

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {role_name: '', ...this.props.formdata};
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {classes} = this.props;
    const {role_name} = this.state;
    return (
      <Grid md={12} item>
        <TextField
          value={role_name}
          label="Roles"
          required
          className={classes.textField}
          onChange={this.handleChange('role_name')}
        />
        <br />
      </Grid>
    );
  }
}

export default CreateForm;
