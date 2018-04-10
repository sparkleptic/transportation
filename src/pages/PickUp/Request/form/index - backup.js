// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Paper, TextField, MenuItem, Button, GridList, GridListTile} from 'material-ui';
import {reduxForm, Field, reset} from 'redux-form';
import NamaPengirim from './fields/namaPengirim';
import BlockUI from 'react-block-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import FormControl from 'material-ui/Form/FormControl';
import {FormControlLabel} from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Radio, {RadioGroup} from 'material-ui/Radio';
//import {FormControlLabel} from 'material-ui/Form';
import ReferenceDropDown from '../../../../components/refrencedropdown';
import type {RootState, Dispatch} from '../storeTypes';
// import TarifTable from './extComps/tarifTable'
//import Radio, {RadioGroup} from 'material-ui/Radio';
import SearchCustomer from './SearchCustomer';
import SearchUsers from './SearchUsers';
import IconButton from 'material-ui/IconButton/IconButton';
import {Search, Person} from 'material-ui-icons';
import {styles} from '../../../css';
import ConfirmationDialog from '../../../../components/confirmationDialog';
import ToolTipMarker from '../../../../components/ToolTipMarker';
import ReactMaterialUiNotifications from '../../../../components/ReactMaterialUiNotifications';
//import ReferenceDropDown from '../../../../components/refrencedropdown';
import axios from 'axios';
import {getEntityList, getEntity, postEntity, putEntity} from '../../../../actions/entity';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';

const radiostyles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => {
    const {lat, lng, data, isEditing} = props;
    let searchBoxRef;
    return (
      <GoogleMap defaultZoom={15} defaultCenter={{lat: lat, lng: lng}} center={{lat: lat, lng: lng}} onClick={(e) => props.onClick(e)}>
        <SearchBox
          ref={(ref) => {searchBoxRef = ref;}}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={() => props.onPlacesChanged(searchBoxRef)}
        >
          <div className='google-searchbox-container'>
            <span>
              <i className='material-icons'>menu</i>
            </span>
            <input
              className='google-search-input'
              placeholder='Search Google Maps'
              type='text'
            />
            <span>
              <i className='material-icons'>search</i>
            </span>
            <span>
              <i className='material-icons'>directions</i>
            </span>  
          </div>
        </SearchBox>
        <ToolTipMarker
          draggable={true}
          onDragEnd={(e) => {
            props.onUpdateMarker(e.latLng)
          }}
          position={{lat: lat, lng: lng}}
        >
          {
            isEditing && 
            <InfoWindow>
              <div>
                <div><strong>Name:</strong> {data.name}</div>
                <div><strong>Address:</strong> {data.address}</div>
                <div><strong>Status:</strong> {data.status}</div>
              </div>
            </InfoWindow>
          }
        </ToolTipMarker>
      </GoogleMap>
    );
  }),
);

let source = null;

type Props = {
  nodeDetail: object,
  getNodeById: (id: number) => void,
  getEmployeesCourier: () => void,
};


class PickRequestForm extends Component {
  constructor() {
    super();
    this.state = {
      openSearchDialog: false,
      dataPengirim: [],
      namaPengirim: {
        name: 'namaPengirim',
        label: 'Name',
        value: '',
      },
      kodePos: {
        name: 'kodePos',
        label: 'Kode Pos *',
        value: '',
      },
      openCustomerSearchDialog: false,
      openUserSearchDialog: false,
      courierFieldvalue: '',
      status: 'OPEN',
      confirm: false,
      node_id: '',
      node_name: '',
      usertype: 'agent',
      req_phone: '',
      req_name: '',
      req_address: '',
      req_lat: -6.318540,
      req_lon: 106.899117,
      req_date: moment()
        .add(1, 'hours')
        .format('YYYY-MM-DD HH:mm:ss'),
      req_remarks: '',
      username: '',
      req_courier: '',
      amount_payment: '',
      city_name: '',
      req_courier_employee_id: '',
      readOnly: true,
      req_city_id: '',
      ready: false,
      selectedCustomerType: 'agent',
    };
    this.handleChangepop = this.handleChangepop.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
  }
  fireOriginAction(key, value) {
    const {setInputOrigin} = this.props;
    return new Promise((resolve, reject) =>
      resolve(setInputOrigin(key, value)),
    );
  }
  handleChangepop(e) {
    let value = e.target.value;
    if (e.target.name === 'tlpPengirim') {
      value = value.replace(/[^0-9]/, '');
    }
    if (e.target.name === 'almtPengirim') {
      let matches = value.match(/\b\d{5}\b/g);
      matches && new Promise((resolve, reject) => {
        resolve(this.fireOriginAction('kodePos', matches[0]));
      });
    }
    if (e.target.name !== 'kodePos') {
      return new Promise((resolve, reject) => {
        resolve(this.fireOriginAction(e.target.name, value));
      });
    }
    return false;
  }

  handleChangeText = (e) => {
    const self = this;
    if (source != null) {
      source.cancel('Operation canceled by the user.');
    }
    var CancelToken = axios.CancelToken;
    source = CancelToken.source();
    if (e.target.value === '') {
      this.loadDataPengirim();
    }
    getEntityList('customer', {s: `${e.target.value}`}, source.token).then((response) => {
      source = null;
      self.setState({
        dataPengirim: response.data.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  handleRowClick = (e) => {
    const self = this;
    const {customer_id, customer_name, cust_phone, address, zip_code, customer_code} = e.value;

    self.fireOriginAction('namaPengirim', customer_name);
    self.fireOriginAction('kodePos', zip_code);
    self.setState({openSearchDialog: !self.state.openSearchDialog});
  };


  componentWillMount() {
    this.props.getEmployeesCourier();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.nodeDetail !== nextProps.nodeDetail) {
      this.setAgentData(nextProps.nodeDetail);
    }
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeMarker = (name) => (latLng) => {
    if (!this.geoCoder) {
      this.geoCoder = new google.maps.Geocoder();
    }
    this.geoCoder.geocode({ latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
        this.setState({ 
          req_address: results[0].formatted_address,
        });
      }
    });
    this.setState({
      req_lat: latLng.lat(), 
      req_lon: latLng.lng(),
    });
  };
  handlePlacesChanged = (name) => (searchBox) => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        this.setState({ 
          req_address: places[0].formatted_address,
          req_lat: places[0].geometry.location.lat(),
          req_lon: places[0].geometry.location.lng(),
        });
      }
    }
  };
  handleMapClick = (name) => (event) => {
    /*if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        this.setState({ 
          req_address: places[0].formatted_address,
          req_lat: places[0].geometry.location.lat(),
          req_lon: places[0].geometry.location.lng(),
        });
      }
    }*/
    console.log('map is clicked');
    console.log(event);
  };
  loadDataPengirim = () => {
    const self = this;
    getEntityList('customer').then((response) => {
      source = null;
      self.setState({
        dataPengirim: response.data.data,
      });
    }).catch((error) => {
      console.log(error);
    });

  };
  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
    const {id} = this.props.match.params;
    if (this.props.edit !== true) {
      const selectedNodeId = sessionStorage.getItem('userNodeId');
      this.props.getNodeById(selectedNodeId);
      this.setState({ready: true});
    } else {
      getEntity(`pickup/${id}`, null).then((response) => {
        const {data} = response.data;
        this.setState({
          ...data,
          ready: true,
          req_date: moment(data.req_date).format('YYYY-MM-DD HH:mm:ss'),
          req_city_id: data.req_city_id,
          req_lat: parseFloat(data.req_lat),
          req_lon: parseFloat(data.req_lon),
          req_address: data.req_address,
          req_name: data.req_name,
          req_courier: data.req_courier,
          amount_payment: data.amount_payment,
          city_name: data.city_name,
          // username: data.req_courier.first_name + ' ' + (data.req_courier.last_name || ''),
          // req_courier_employee_id: data.req_courier.employee_id,
        });
      });
    }
  }

  _handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 112:
        this.handleOpenDialog();
        event.preventDefault();
        break;
      case 27:
      case 113:
        return this.setState({openSearchDialog: false});
      default:
        break;
    }
  }
  handleOpenDialog = () => {
    // Make a request for a user with a given ID
    this.loadDataPengirim();
    return this.setState({openSearchDialog: !this.state.openSearchDialog});
  };

  handleAddSubmit = () => {
    return this.setState({confirm: !this.state.confirm});
  };
  handleAction = (action) => {
    this.setState({confirm: false});
    action === 'yes' && !this.props.edit && this.saveEntity();
    action === 'yes' && this.props.edit && this.updateEntity();
  };
  updateEntity = () => {
    const {id} = this.props.match.params;
    putEntity(`pickup/${id}`, {
      req_name: this.state.req_name,
      req_phone: this.state.req_phone,
      req_address: this.state.req_address,
      req_date: this.state.req_date,
      amount_payment: this.state.amount_payment,
      city_name: this.state.city_name,
      req_city_id: this.state.req_city_id,
      req_remarks: this.state.req_remarks,
      req_courier: this.state.req_courier,
      req_lat: this.state.req_lat,
      req_lon: this.state.req_lon,
      status: this.state.status,
    }).then((response) => this.entitySubmitSuccess());
  };
  saveEntity = () => {
    postEntity('pickup', {
      req_name: this.state.req_name,
      req_phone: this.state.req_phone,
      req_address: this.state.req_address,
      req_date: this.state.req_date,
      amount_payment: this.state.amount_payment,
      city_name: this.state.city_name,
      req_city_id: this.state.req_city_id,
      remark: this.state.req_remarks,
      req_courier: this.state.req_courier,
      req_lat: this.state.req_lat,
      req_lon: this.state.req_lon,
      status: this.state.status,
    }).then((response) => this.entitySubmitSuccess());
  };
  entitySubmitSuccess = () => {
    this.showNotification('pickup');
    this.props.history.push(`/pickup/request`);
  };
  showNotification = (entity) => {
    ReactMaterialUiNotifications.showNotification({
      text: this.props.edit
        ? `Edit ${entity} success`
        : `Add ${entity} success`,
    });
  };
  /**
   * Added By Sameer 01/02/2018
   * To search customer dilogue
   */
  handleCustomerSearchDialog = (key) => {
    return this.setState({
      openCustomerSearchDialog: !this.state.openCustomerSearchDialog,
    });
  };
  handleUserSearchDialog = (key) => {
    return this.setState({
      openUserSearchDialog: !this.state.openUserSearchDialog,
    });
  };
  handleSelect = (data) => {
    this.state.openCustomerSearchDialog && this.setCustomerData(data);
    return this.setState({
      openCustomerSearchDialog: false,
      openUserSearchDialog: false,
    });
  };
  setAgentData = (data) => {
    this.setState({
      req_phone: data.phone || '',
      req_name: data.agentName || '',
      req_address: data.nodeAddress || '',
    });
  }
  setCustomerData = (data) => {
    this.setState({
      req_phone: data.cust_phone,
      req_name: data.customer_name,
      req_address: data.address,
    });
  };
  selectCustomerType = (event) => {
    const selectedNodeId = sessionStorage.getItem('userNodeId');
    if (event.target.value === 'agent' && selectedNodeId) {
      this.props.getNodeById(selectedNodeId);
    } else {
      this.setState({
        req_phone: '',
        req_name: '',
        req_address: '',
      });
    }
    this.setState({
      req_courier: data.req_courier,
      username: data.first_name + ' ' + data.last_name,
      req_courier_employee_id: data.id,
      selectedCustomerType: event.target.value,
    });
  };
  handleUpdate = (name) => (value) => {
    // console.log("rahulvalue");
    // console.log(value);

    getEntity(`nodes/${value}`, null).then((response) => {
      const {data} = response.data;
      this.setState({
        ...data,
        req_address: data.node_address,
        req_name: data.agent_name,
        req_phone: data.phone,
        // username: data.req_courier.first_name + ' ' + (data.req_courier.last_name || ''),
        // req_courier_employee_id: data.req_courier.employee_id,
      });
    });

    this.setState({[name]: value, node_name: ''});
  };

  render() {
    const {
      handleOpenDialog,
      handleUpdate,
      handleAddSubmit,
      handleCustomerSearchDialog,
      handleUserSearchDialog,
      handleSelect,
      handleAction,
      handleRowClick,
      handleChangeText,
      handleChangepop,
    } = this;
    const {
      classes,
      edit,
      history,
      match,
      employees,
      isLoading,
    } = this.props;
    const {
      data,
      ready,
      node_id,
      node_name,
      req_lat,
      req_lon,
      username,
      usertype,
      req_phone,
      req_name,
      amount_payment,
      city_name,
      req_courier,
      req_address,
      req_city_id,
      req_date,
      req_courier_employee_id,
      req_remarks,
      status,
      confirm,
      dataPengirim,
      namaPengirim,
      openCustomerSearchDialog,
      openUserSearchDialog,
      openSearchDialog,
      readOnly,
      selectedCustomerType,
    } = this.state;
    const statusData = ['OPEN', 'ASSIGNED', 'OTW', 'PICKED', 'HANDOVER'];

    return (
      <BlockUI tag="div" blocking={isLoading}>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Pickup /
              <span className={classes.transactionBreadcrumbs}> Request /</span>
              <span className={classes.transactionBreadcrumbs}>
                {' '}
                {edit ? `Edit Request` : `New Request`}
              </span>
            </div>
            <br />
            <p className={classes.titleWrapper}>
              {edit ? `Edit Request` : `New Request`}
            </p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid md={12} item>
            <Paper className={classes.formWrapper}>

              <Grid container>
                <Grid md={4} item>
                  <Typography type="headline" className={classes.title}>
                  {' '}
                  {edit ? `Edit Request` : `New Request`}
                  </Typography>
                </Grid>
                <Grid md={3} item>
                  <IconButton tabIndex={'-1'} className={classes.searchbutton} onClick={this.handleOpenDialog}>
                    <Person />
                  </IconButton>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6} sm={6}>
                  <div>
                    <RadioGroup
                      className={classes.radioGroup}
                      name="customer_type"
                      aria-label="customer type"
                      value={selectedCustomerType}
                      onChange={this.selectCustomerType}
                    >
                      <FormControlLabel
                        value="agent"
                        control={<Radio />}
                        label="Agent"
                      />
                      <FormControlLabel
                        value="customer"
                        control={<Radio />}
                        label="Customer / Corporate"
                      />
                    </RadioGroup>
                    <FormControl className={classes.textField}>
                      <RadioGroup
                        name="usertype"
                        aria-label="User Type"
                        value={usertype}
                        onChange={this.handleChange('usertype')}
                      >
                        <FormControlLabel checked={this.state.usertype == "agent"} value="agent" control={<Radio />} label="Agent" />
                        <FormControlLabel value="customer"control={<Radio />} label="Customer"/>
                        <FormControlLabel value="corporate" control={<Radio />} label="Corporate" />
                      </RadioGroup>
                    </FormControl>

                    {/*<FormControl className={classes.textField}>
                      <ReferenceDropDown
                        className={classes.textField}
                        value={node_id && parseInt(node_id, 10)}
                        selectedValue={
                          node_name && {node_name: node_name, node_id: node_id}
                        }
                        remoteCall={getEntityList}
                        entity={'nodes'}
                        valueKey={'node_id'}
                        labelKey={'node_name'}
                        searchkey={'s'}
                        placeholder={'Destination'}
                        onUpdate={handleUpdate('node_id')}
                      />
                    </FormControl>*/}
                    <br />
                    <FormControl style={{width: '100%'}}>
                      <Field
                        name="namaPengirim"
                        component={NamaPengirim}
                        handleChange={handleChangepop}
                        {...this.props}
                        item={namaPengirim}
                        key={1}
                        handleRowClick={handleRowClick}
                        handleOpenDialog={handleOpenDialog}
                        openSearchDialog={openSearchDialog}
                        dataPengirim={dataPengirim}
                        handleChangeText={handleChangeText}
                      />
                    </FormControl>
                    <br />
                    {/*<FormControl className={classes.textField}>
                      <TextField
                        inputProps={{
                          readOnly: Boolean(readOnly),
                          disabled: Boolean(readOnly),
                        }}
                        onChange={this.handleChange('req_name')}
                        id="req_name"
                        label="Name"
                        type="text"
                        value={req_name}
                        required
                        className={classes.textField}
                      />
                    </FormControl>
                    <br />*/}
                    <TextField
                      onChange={this.handleChange('req_phone')}
                      id="req_phone"
                      label="Phone"
                      type="number"
                      value={req_phone}
                      required
                      className={classes.textField}
                      onInput={(e)=>{ 
                          e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,15)
                      }}
                      min={0}
                    />
                    <br />
                    <TextField
                      onChange={this.handleChange('req_address')}
                      id="req_address"
                      value={req_address}
                      label="Address"
                      required
                      className={classes.textField}
                    />
                    <br />
                    <ReferenceDropDown
                      className={classes.textField}
                      value={req_city_id}
                      selectedValue={req_city_id}
                      remoteCall={getEntityList}
                      entity={'cities'}
                      valueKey={'city_id'}
                      labelKey={'city_name'}
                      searchkey={'s'}
                      placeholder={'City'}
                      onUpdate={this.handleUpdate('req_city_id')}
                    />
                    <br />
                    <TextField
                      onChange={this.handleChange('city_name')}
                      id="city_id"
                      label="City"
                      value={city_name}
                      required
                      className={classes.textField}
                    />
                    <br />
                    <TextField
                      id="datetime-local"
                      label="Date and Time"
                      type="datetime"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={req_date}
                      onChange={this.handleChange('req_date')}
                    />
                    <br />
                    <TextField
                      onChange={this.handleChange('amount_payment')}
                      id="amount_payment"
                      label="Cash"
                      value={amount_payment}
                      required
                      className={classes.textField}
                    />
                    <br />
                    <TextField
                      onChange={this.handleChange('req_remarks')}
                      id="req_remarks"
                      value={req_remarks}
                      label="Remarks"
                      required
                      className={classes.textField}
                    />
                    <br />
{/*<<<<<<< HEAD*/}
                    {/*<FormControl className={classes.textField}>
                      <InputLabel htmlFor="request-users">Courier</InputLabel>
                      <Input
                        id="req_courier"
                        type="text"
                        value={req_courier}
                        onChange={this.handleChange('req_courier')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={this.handleUserSearchDialog}>
                              <Search />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>*/}
{/*=======*/}
                    <TextField
                      id="courier-field"
                      select
                      label="Courier*"
                      className={classes.textField}
                      value={req_courier_employee_id}
                      onChange={this.handleChange('req_courier_employee_id')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                    >
                      {
                        employees
                        ? employees.map((employee) => (
                            <MenuItem key={employee.employeeID} value={employee.employeeID}>
                              {`${employee.firstName} ${employee.lastName}`}
                            </MenuItem>
                          ))
                        : <MenuItem />
                      }
                    </TextField>
{/*>>>>>>> origin/dev_mayur*/}
                    <br />
                    <TextField
                      id="status-field"
                      select
                      label="Status"
                      className={classes.textField}
                      value={status}
                      onChange={this.handleChange('status')}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                    >
                      {statusData.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                  {ready && (
                    <MapWithAMarker
                      onUpdateMarker={this.handleChangeMarker('marker')}
                      onPlacesChanged={this.handlePlacesChanged('marker')}
                      onClick={this.handleMapClick('marker')}
                      lat={req_lat}
                      lng={req_lon}
                      isEditing={edit}
                      data={{name: req_name, address: req_address, status: status}}
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCo6jr7MpgztNao-k74aTZcrOIIASChoqA&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{height: `100%`}} />}
                      containerElement={<div style={{height: `400px`}} />}
                      mapElement={<div style={{height: `100%`}} />}
                    />
                  )}
                </Grid>
              </Grid>
              <div>
                <div style={{marginLeft: '83%', marginTop: '2%'}}>
                  <Button
                    style={{marginRight: 12}}
                    onClick={() => history.goBack()}
                    component={Link}
                    to={`${match.url}`}
                  >
                    Cancel
                  </Button>
                  <Button raised="true" color="primary" onClick={handleAddSubmit}>
                    {edit ? `Save` : `Add`}
                  </Button>
                </div>
              </div>
              {openUserSearchDialog && (
                <SearchUsers
                  handleSelect={handleSelect}
                  openDialog={openUserSearchDialog}
                  handleOpenDialog={handleUserSearchDialog}
                />
              )}

              <ConfirmationDialog
                yeslabel={edit ? 'Save' : 'Add'}
                title={edit ? `Edit pickup` : `New pickup`}
                description={
                  edit
                    ? `Are you sure you want to save this pickup?`
                    : `Are you sure you want to add this pickup?`
                }
                open={confirm}
                handleAction={handleAction}
              />
            </Paper>
          </Grid>
        </div>
      </BlockUI>
    );
  }
}

/*<<<<<<< HEAD*/
// export default withStyles(styles)(PickRequestForm);
/*export default withStyles(styles)(
  reduxForm({
    form: 'Origin',
  })(PickRequestForm),
);*/
/*=======*/
const mapStateToProps = (state: RootState) => ({
  nodeDetail: state.node.globalSearch && state.node.globalSearch.detailInfo,
  employees: state.employee.employees,
  isLoading: state.employee.isLoading
    || state.node.isLoading
    || (state.node.globalSearch && state.node.globalSearch.isLoading),
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getNodeById: (nodeID: number) => {
      dispatch({
        type: 'GET_NODE_DETAIL_REQUESTED',
        nodeID,
      });
    },
    getEmployeesCourier: () => {
      dispatch({
        type: 'GET_EMPLOYEES_COURIER_REQUESTED',
      });
    },
  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PickRequestForm));
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(reduxForm({ form: 'Origin'})(PickRequestForm)));
/*>>>>>>> origin/dev_mayur*/
