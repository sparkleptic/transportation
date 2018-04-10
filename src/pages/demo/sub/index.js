import React, {Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Paper, TextField, MenuItem, Button} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import FormControl from 'material-ui/Form/FormControl';
import Grid from 'material-ui/Grid';
// import TarifTable from './extComps/tarifTable'
// import ConfirmationDialog from './extComps/confirmationDialog'
import SearchCustomer from './SearchCustomer';
import SearchUsers from './SearchUsers';
import IconButton from 'material-ui/IconButton/IconButton';
import {Search} from 'material-ui-icons';
import {styles} from '../../css';
import ConfirmationDialog from '../../../components/confirmationDialog';
import ReactMaterialUiNotifications from '../../../components/ReactMaterialUiNotifications';
import {getEntity, postEntity, putEntity} from '../../../actions/entity';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => {
    const {lat, lng} = props;
    return (
      <GoogleMap defaultZoom={8} defaultCenter={{lat: lat, lng: lng}}>
        <Marker
          draggable={true}
          onDragEnd={(e) =>
            props.onUpdateMarker(e.latLng.lat(), e.latLng.lng())
          }
          position={{lat: lat, lng: lng}}
        />
      </GoogleMap>
    );
  }),
);

class PickRequestForm extends Component {
  constructor() {
    super();
    this.state = {
      openCustomerSearchDialog: false,
      openUserSearchDialog: false,
      courierFieldvalue: '',
      status: 'OPEN',
      confirm: false,
      req_phone: '',
      req_name: '',
      req_address: '',
      req_lat: -34.397,
      req_lon: 150.644,
      req_date: moment()
        .add(1, 'hours')
        .format('YYYY-MM-DDTHH:mm'),
      req_remarks: '',
      username: '',
      req_courier_employee_id: '',
      ready: false,
    };
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleChangeMarker = (name) => (lat, lng) => {
    this.setState({req_lat: lat, req_lon: lng});
  };
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.edit !== true && this.setState({ready: true});
    this.props.edit &&
      getEntity(`pickup/${id}`, null).then((response) => {
        const {data} = response.data;
        this.setState({
          ...data,
          ready: true,
          req_date: moment(data.req_date).format('YYYY-MM-DDTHH:mm'),
          req_lat: parseFloat(data.req_lat),
          req_lon: parseFloat(data.req_lon),
          // username: data.req_courier.first_name + ' ' + (data.req_courier.last_name || ''),
          // req_courier_employee_id: data.req_courier.employee_id,
        });
      });
  }
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
      req_remarks: this.state.req_remarks,
      req_courier_employee_id: this.state.req_courier_employee_id,
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
      remark: this.state.req_remarks,
      req_courier_employee_id: this.state.req_courier_employee_id,
      req_lat: this.state.req_lat,
      req_lon: this.state.req_lon,
      status: this.state.status,
    }).then((response) => this.entitySubmitSuccess());
  };
  entitySubmitSuccess = () => {
    this.showNotification('pickup');
    this.props.history.push(`/demo/tableindex`);
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
    this.state.openUserSearchDialog && this.setUserData(data);
    return this.setState({
      openCustomerSearchDialog: false,
      openUserSearchDialog: false,
    });
  };
  setCustomerData = (data) => {
    this.setState({
      req_phone: data.cust_phone,
      req_name: data.customer_name,
      req_address: data.address,
    });
  };
  setUserData = (data) => {
    this.setState({
      username: data.first_name + ' ' + data.last_name,
      req_courier_employee_id: data.id,
    });
  };
  render() {
    const {
      handleAddSubmit,
      handleCustomerSearchDialog,
      handleUserSearchDialog,
      handleSelect,
      handleAction,
    } = this;
    const {classes, edit, history, match} = this.props;
    const {
      ready,
      req_lat,
      req_lon,
      username,
      req_phone,
      req_name,
      req_address,
      req_date,
      req_remarks,
      status,
      confirm,
      openCustomerSearchDialog,
      openUserSearchDialog,
    } = this.state;
    const statusData = ['OPEN', 'ASSIGNED', 'OTW', 'PICKED', 'HANDOVER'];
    console.log('ready', ready);
    return (
      <div>
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
              <Typography type="headline">
                {' '}
                {edit ? `Edit Request` : `New Request`}
              </Typography>
              <Grid container>
                <Grid item xs={6} sm={6}>
                  <div>
                    <FormControl className={classes.textField}>
                      <InputLabel htmlFor="req_name">Name*</InputLabel>
                      <Input
                        id="req_name"
                        type="text"
                        value={req_name}
                        onChange={this.handleChange('req_name')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={this.handleCustomerSearchDialog}
                            >
                              <Search />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <br />
                    <TextField
                      onChange={this.handleChange('req_phone')}
                      id="req_phone"
                      label="Phone"
                      value={req_phone}
                      required
                      className={classes.textField}
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
                    <TextField
                      id="datetime-local"
                      label="Date and Time"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={req_date}
                      onChange={this.handleChange('req_date')}
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
                    <FormControl className={classes.textField}>
                      <InputLabel htmlFor="request-users">Courier*</InputLabel>
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={this.handleChange('username')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={this.handleUserSearchDialog}>
                              <Search />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
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
                      lat={req_lat}
                      lng={req_lon}
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
                  <Button raised color="primary" onClick={handleAddSubmit}>
                    {edit ? `Save` : `Add`}
                  </Button>
                </div>
              </div>
              {openCustomerSearchDialog && (
                <SearchCustomer
                  handleSelect={handleSelect}
                  openDialog={openCustomerSearchDialog}
                  handleOpenDialog={handleCustomerSearchDialog}
                />
              )}
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
      </div>
    );
  }
}

export default withStyles(styles)(PickRequestForm);
