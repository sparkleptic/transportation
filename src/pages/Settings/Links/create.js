import React, {Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Paper, TextField, MenuItem, Button} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import FormControl from 'material-ui/Form/FormControl';
import ConfirmationDialog from '../../../components/confirmationDialog';
import ReactMaterialUiNotifications from '../../../components/ReactMaterialUiNotifications';
import {getEntity, postEntity, putEntity} from '../../../actions/entity';
import SearchVehicle from './SearchVehicle';
import {styles} from '../../css';

class BaseTabForm extends Component {
  constructor() {
    super();
    this.state = {
      origin: '',
      vehicle_type_id: '',
      destination: '',
      eta: '',
      openSearchDialog: false,
      estimate_cost: '',
      vehicleData: [],
      confirm: false,
    };
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.edit &&
      getEntity(`link/${id}`, null).then((response) => {
        const {data} = response.data;
        this.setState({
          ...data,
          vehicle_type_id:
            data.vehicle_type && data.vehicle_type.vehicle_type_id,
        });
      });
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSelect = (data) => {
    this.state.openSearchDialog && this.setVehicleData(data);
    return this.setState({openSearchDialog: false});
  };
  setVehicleData = (data) => {
    const vehicleData = this.state.vehicleData.concat(data);
    this.setState({vehicleData});
  };
  handleSearchDialog = (key) => {
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
    putEntity(`link/${id}`, {
      origin: this.state.origin,
      destination: this.state.destination,
      vehicle_type_id: this.state.vehicle_type_id,
      estimate_cost: this.state.estimate_cost,
      eta: this.state.eta,
    }).then((response) => this.entitySubmitSuccess());
  };
  saveEntity = () => {
    postEntity('link', {
      origin: this.state.origin,
      destination: this.state.destination,
      vehicle_type_id: this.state.vehicle_type_id,
      estimate_cost: this.state.estimate_cost,
      eta: this.state.eta,
    }).then((response) => this.entitySubmitSuccess());
  };
  entitySubmitSuccess = () => {
    this.showNotification('link');
    this.props.history.push(`/settings/links`);
  };
  showNotification = (entity) => {
    ReactMaterialUiNotifications.showNotification({
      text: this.props.edit
        ? `Edit ${entity} success`
        : `Add ${entity} success`,
    });
  };

  render() {
    const {
      handleAddSubmit,
      handleAction,
      handleSearchDialog,
      handleSelect,
    } = this;
    const {classes, edit, history, match} = this.props;
    const {
      openSearchDialog,
      origin,
      vehicle_type_id,
      destination,
      eta,
      confirm,
      vehicleData,
      estimate_cost,
    } = this.state;
    const originData = ['CGKXXX', 'BDGXXX', 'SBYXXX'];
    const vehicleTypeData = [
      {id: 1, label: 'Truck'},
      {id: 2, label: 'Airplane'},
      {id: 3, label: 'etc'},
    ];
    const destinationData = ['PDGXXX', 'BGRXXX', 'MLGXXX'];

    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Settings /
              <span className={classes.transactionBreadcrumbs}> Links /</span>
              <span className={classes.transactionBreadcrumbs}>
                {' '}
                {edit ? `Edit Link` : `New Link`}
              </span>
            </div>
            <br />
            <p className={classes.titleWrapper}>
              {edit ? `Edit Link` : `New Link`}
            </p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid md={12} item>
            <Paper className={classes.formWrapper}>
              <Typography type="headline">
                {' '}
                {edit ? `Edit Link` : `New Link`}
              </Typography>
              <Grid container>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="origin-field"
                    select
                    label="Origin"
                    required
                    className={classes.textField}
                    value={origin}
                    onChange={this.handleChange('origin')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                  >
                    {originData.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    id="destination-field"
                    select
                    label="Destination"
                    required
                    className={classes.textField}
                    value={destination}
                    onChange={this.handleChange('destination')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                  >
                    {destinationData.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br />
                  <div className={classes.prefferedWrapper}>
                    <Typography type="title" className={classes.prefferedTitle}>
                      Preffered Vehicle
                    </Typography>
                    <Button
                      onClick={this.handleSearchDialog}
                      className={classes.prefferedBtn}
                    >
                      +&nbsp;&nbsp;Add
                    </Button>
                  </div>
                  <div className={classes.prefferedWrapper}>
                    {vehicleData ? (
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Registration Number</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {vehicleData
                            ? vehicleData.map((n, index) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell>{n.type.type_name}</TableCell>
                                    <TableCell>{n.police_no}</TableCell>
                                  </TableRow>
                                );
                              })
                            : null}
                        </TableBody>
                      </Table>
                    ) : null}
                  </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="vehicle-type-field"
                    select
                    label="Vehicle Type"
                    required
                    className={classes.textField}
                    value={vehicle_type_id}
                    onChange={this.handleChange('vehicle_type_id')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    margin="normal"
                  >
                    {vehicleTypeData.map((option, index) => (
                      <MenuItem key={index} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br />
                  <TextField
                    onChange={this.handleChange('eta')}
                    id="eta"
                    label="ETA"
                    value={eta}
                    required
                    className={classes.textField}
                  />
                  <br />
                  <br />
                  <TextField
                    onChange={this.handleChange('estimate_cost')}
                    id="estimate_cost"
                    label="Estimate Cost"
                    value={estimate_cost}
                    required
                    className={classes.textField}
                  />
                  <br />
                </Grid>
              </Grid>
              {openSearchDialog && (
                <SearchVehicle
                  handleSelect={handleSelect}
                  openDialog={openSearchDialog}
                  handleOpenDialog={handleSearchDialog}
                />
              )}

              <ConfirmationDialog
                yeslabel={edit ? 'Save' : 'Add'}
                title={edit ? `Edit Link` : `New Link`}
                description={
                  edit
                    ? `Are you sure you want to save this link?`
                    : `Are you sure you want to add this link?`
                }
                open={confirm}
                handleAction={handleAction}
              />
              <div style={{marginLeft: '83%', marginTop: '2%'}}>
                <Button
                  style={{marginRight: 12}}
                  onClick={() => history.goBack()}
                  component={Link}
                  to={`${match.url}`}
                >
                  Cancel
                </Button>
                <Button variant="raised" color="primary" onClick={handleAddSubmit}>
                  {edit ? `Save` : `Add`}
                </Button>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BaseTabForm);
