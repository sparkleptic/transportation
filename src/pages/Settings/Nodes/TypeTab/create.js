import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {TextField} from 'material-ui';

class Create extends Component {
  constructor() {
    super();
    this.state = {node_description: ''};
  }
  componentDidMount() {
    this.setState({...this.props.formdata});
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {handleChange} = this;
    const {classes} = this.props;
    const {node_description} = this.state;
    return (
      <Grid md={12} item>
        <TextField
          value={node_description}
          label="Description"
          required
          className={classes.textField}
          onChange={handleChange('node_description')}
        />
        <br />
      </Grid>
    );
  }
}
export default Create;
