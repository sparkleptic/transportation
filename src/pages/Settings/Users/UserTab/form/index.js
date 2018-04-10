import React, {Component} from 'react';
import {Paper, TextField, MenuItem, Button} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import FormControl from 'material-ui/Form/FormControl';
import ConfirmationDialog from './extComps/confirmationDialog';
import {uniq} from 'lodash';
import axios from 'axios';

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

const BASE_API = 'http://coreapi.skyware.systems/api/';
class BaseTabForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      node: '',
      roles: '',
      dialogCout: false,
      errorCout: false,
      errorDetails: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleAddSubmit = () => {
    const {dialogCout, errorCout, username, email, node, roles} = this.state;
    if (!dialogCout) {
      return this.setState({dialogCout: true});
    } else {
      const readyToPost = {
        username,
        email,
        node,
        roles,
      };
      if (!errorCout) {
        axios
          .post(`${BASE_API}users`, readyToPost)
          .then((response) => {
            this.userForm.reset();
            return this.setState({
              dialogCout: !dialogCout,
              node: '',
              roles: '',
            });
          })
          .catch((error) => {
            this.setState({
              errorCout: !errorCout,
              errorDetails: error.response.data.status.detail,
              node: '',
              roles: '',
            });
            this.userForm.reset();
            return;
          });
      } else {
        this.setState({dialogCout: !dialogCout});
      }
    }
  };
  render() {
    const {handleAddSubmit, handleChange} = this;
    const {classes, dataRole} = this.props;
    const {roles, node, dialogCout, errorCout, errorDetails} = this.state;
    const nodeData = ['DPK-001', 'BDG-001', 'SBY012'];
    const distinctValue = uniq(dataRole);
    return (
      <div>
        <Paper className={classes.root}>
          <Typography type="headline">New User</Typography>
          <form ref={(el) => (this.userForm = el)}>
            <TextField
              label="Username"
              required
              className={classes.textField}
              onChange={handleChange('username')}
            />
            <br />
            <TextField
              label="Email"
              type="email"
              required
              className={classes.textField}
              onChange={handleChange('email')}
            />{' '}
            <br />
            <TextField
              id="node-field"
              select
              label="Node"
              required
              className={classes.textField}
              value={node}
              onChange={this.handleChange('node')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select one of the nodes"
              margin="normal"
            >
              {nodeData.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <TextField
              id="roles-field"
              select
              label="Roles"
              required
              className={classes.textField}
              value={roles}
              onChange={this.handleChange('roles')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select one of the roles"
              margin="normal"
            >
              {distinctValue.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <ConfirmationDialog
              dialogCout={dialogCout}
              error={errorCout}
              errorDetails={errorDetails}
              handleAddSubmit={handleAddSubmit}
            />
            <div style={{marginLeft: '83%', marginTop: '2%'}}>
              <Button style={{marginRight: 12}}>Cancel</Button>
              <Button variant="raised" color="primary" onClick={handleAddSubmit}>
                Add
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(BaseTabForm);
