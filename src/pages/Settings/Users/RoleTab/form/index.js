import React, {Component} from 'react';
import {Paper, TextField, MenuItem, Button} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import FormControl from 'material-ui/Form/FormControl';
import ConfirmationDialog from './extComps/confirmationDialog';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 25,
  }),
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  menu: {
    top: 50,
    width: 200,
  },
});

class BaseTabForm extends Component {
  constructor() {
    super();
    this.state = {
      roles: '',
      dialogCout: false,
    };
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleAddSubmit = () => {
    return this.setState({dialogCout: !this.state.dialogCout});
  };
  render() {
    const {handleAddSubmit} = this;
    const {classes} = this.props;
    const {roles, dialogCout} = this.state;
    return (
      <div>
        <Paper className={classes.root}>
          <Typography type="headline">New Roles</Typography>

          <TextField
            label="Roles"
            required
            className={classes.textField}
            value={roles}
          />
          <br />
          <ConfirmationDialog
            dialogCout={dialogCout}
            handleAddSubmit={handleAddSubmit}
          />
          <div style={{marginLeft: '83%', marginTop: '2%'}}>
            <Button style={{marginRight: 12}}>Cancel</Button>
            <Button variant="raised" color="primary" onClick={handleAddSubmit}>
              Add
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(BaseTabForm);
