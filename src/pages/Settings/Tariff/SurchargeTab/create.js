import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {TextField, MenuItem} from 'material-ui';
import {getEntity} from '../../../../actions/entity';
class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surcharge_type: '',
      surcharge_name: '',
      description: '',
      formula: '',
      status: '',
      inited: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.props.edit &&
      !this.state.inited &&
      this.setState(
        {
          inited: true,
          ...nextProps.formdata,
        },
        () => {},
      );
  };
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {classes} = this.props;
    const {handleChange} = this;
    const {
      surcharge_type,
      surcharge_name,
      description,
      formula,
      status,
    } = this.state;
    return (
      <Grid container>
        <Grid item xs={6} sm={6}>
          <TextField
            id="surcharge_type"
            select
            required
            label="Surcharge Type"
            className={classes.textField}
            value={surcharge_type}
            onChange={this.handleChange('surcharge_type')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            <MenuItem key={0} value="1">
              surcharge_type1
            </MenuItem>
            <MenuItem key={1} value="2">
              surcharge_type2
            </MenuItem>
          </TextField>

          <TextField
            value={surcharge_name}
            label="Name"
            required
            className={classes.textField}
            onChange={handleChange('surcharge_name')}
          />
          <br />

          <TextField
            value={description}
            label="Description"
            required
            className={classes.textField}
            onChange={handleChange('description')}
          />
          <br />

          <TextField
            value={formula}
            label="Formula"
            required
            className={classes.textField}
            onChange={handleChange('formula')}
          />
          <br />

          <TextField
            id="status"
            select
            required
            label="Status"
            className={classes.textField}
            value={status}
            onChange={this.handleChange('status')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            <MenuItem key={0} value="Active">
              Active
            </MenuItem>
            <MenuItem key={1} value="Inactive">
              Inactive
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
