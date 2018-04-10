import React, {Component} from 'react';
import {TextField, MenuItem} from 'material-ui';
import Grid from 'material-ui/Grid';

class CreateVehicleType extends Component {
  constructor() {
    super();
    this.state = {
      mode_id: 1,
      type_name: '',
      edit: false,
      inited: false,
    };
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  componentDidMount = (props) => {
    this.props.edit &&
      this.setState(
        {
          inited: true,
          ...props.formdata,
          mode_id: props.formdata.mode && props.formdata.mode.mode_id,
        },
        () => {
          this.props.onUpdateForm('mode_id', this.state.mode_id);
        },
      );
  };
  handleUpdate = (name) => (value) => {
    this.setState({[name]: value, node_name: ''});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {handleChange} = this;
    const {classes} = this.props;
    let {mode_id, type_name} = this.state;
    mode_id = mode_id || 1;
    return (
      <Grid container>
        <Grid item xs={6} sm={6}>
          <TextField
            id="mode_id"
            select
            required
            label="Mode"
            className={classes.textField}
            value={mode_id}
            onChange={this.handleChange('mode_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            <MenuItem value={1}>Land</MenuItem>
            <MenuItem value={2}>SEA</MenuItem>
            <MenuItem value={3}>AIR</MenuItem>
          </TextField>
          <TextField
            label="Vehicle Type Name"
            value={type_name}
            required
            className={classes.textField}
            onChange={handleChange('type_name')}
          />
          <br />
        </Grid>
      </Grid>
    );
  }
}
export default CreateVehicleType;
