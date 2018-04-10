import React, {Component} from 'react';
import {Button, Chip, TextField, MenuItem} from 'material-ui';
import {Add} from 'material-ui-icons';
import {getEntityList, getEntity} from '../../../../actions/entity';
import Grid from 'material-ui/Grid';
import ReferenceDropDown from '../../../../components//refrencedropdown';
import SearchNodes from '../../../../components/Dialog/SearchNodes';
import axios from 'axios';

let token = null;


class CreateForm extends Component {
  constructor() {
    super();
    this.state = {
      openDialog: false,
      searchData: [],
      username: '',
      email: '',
      password: '',
      phone: '',
      node_code: '',
      node_name: '',
      role_id: '',
      confirm: false,
      dataRoles: [],
      nodes: [],
      edit: false,
      userData: '',
      inited: false,
    };
  }
  componentDidMount() {
    getEntityList('usergroups', {l: -1}).then((response) => {
      const {data} = response.data;
      this.setState({dataRoles: data});
    });
    this.props.edit && this.setState(
        {
          ...this.props.formdata,
          role_id: this.props.formdata.usergroup ? this.props.formdata.usergroup.role.role_id : '',
        },
        () => {
          this.props.onUpdateForm('node_id', this.state.nodes);
          this.props.onUpdateForm('role_id', this.state.role_id);
          this.props.onUpdateForm('password', this.state.password);
        },
      );
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  handleUpdate = (name) => (value) => {
    this.setState({[name]: value, node_name: ''});
    this.props.onUpdateForm(name, value);
  };
  handleRowClick = (props) => {
    let {nodes} = this.state;
    nodes = nodes.filter((node) => node.node_id !== props.node_id);
    nodes.push(props);
    this.props.onUpdateForm('node_id', nodes.map((node) => node.node_id));
    this.setState({nodes});
  }
  onSearchTextUpdated = (event) => {
    if (token != null) {
      token.cancel('Operation canceled by the user.');
    }
    var cancelToken = axios.CancelToken;
    token = cancelToken.source();
    getEntityList('nodes', {s: event.target.value}).then((response) => {
      const {data} = response.data;
      this.setState({searchData: data});
    });
  }
  handleModal = (key) => this.setState({[key]: !this.state[key]});
  render() {
    const {handleChange, handleUpdate, onSearchTextUpdated, handleRowClick, handleModal} = this;
    const {classes} = this.props;
    const {
      openDialog,
      node_name,
      role_id,
      node_code,
      nodes,
      dataRoles,
      username,
      email,
      password,
      phone,
      searchData,
    } = this.state;
    return (
      <Grid md={12} item>
        <TextField
          value={username}
          label="Username"
          required
          className={classes.textField}
          onChange={handleChange('username')}
        />
        <br />
        <TextField
          value={email}
          label="Email"
          type="email"
          required
          className={classes.textField}
          onChange={handleChange('email')}
        />
        <br />
        <TextField
          value={password}
          label="Password"
          type="password"
          required
          className={classes.textField}
          onChange={handleChange('password')}
        />
        <br />
        <TextField
          value={phone}
          label="Phone Number"
          type="phone"
          required
          className={classes.textField}
          onChange={handleChange('phone')}
        />
        <br />
        <div className={classes.textField}>
        {
          nodes && nodes.map((node, index) =>
            <div className={classes.chipWrapper} key={index}>
              <Chip label={node.node_name} className={classes.chip} />
            </div>)
        }
        </div>
        <Button onClick={() => handleModal('openDialog')} > <Add />User Nodes</Button>
        <br />
        <TextField
          id="role_id"
          select
          label="Roles"
          required
          className={classes.textField}
          value={role_id}
          onChange={this.handleChange('role_id')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
        >
          {dataRoles
            ? dataRoles.map((option, index) => (
                <MenuItem key={index} value={option.role_id}>
                  {option.role_name}
                </MenuItem>
              ))
            : null}
        </TextField>

        <SearchNodes data={searchData} handleRowClick={handleRowClick} handleChangeText={onSearchTextUpdated} close={handleModal} open={openDialog} />
        
      </Grid>
    );
  }
}

export default CreateForm;
