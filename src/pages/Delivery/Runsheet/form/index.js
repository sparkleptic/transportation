import React, {Component} from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {Paper, TextField, MenuItem, Button, Chip} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import FormControl from 'material-ui/Form/FormControl';
import Grid from 'material-ui/Grid';
import SearchCustomer from './SearchCustomer';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton/IconButton';
import EnhancedInboundTableHead from './extComps/tableHead';
import {Search} from 'material-ui-icons';
import {styles} from '../../../css';
import ConfirmationDialog from '../../../../components/confirmationDialog';
import ReactMaterialUiNotifications from '../../../../components/ReactMaterialUiNotifications';
import {getEntity, postEntity, putEntity} from '../../../../actions/entity';
import UserLinearProgress from '../UserLinearprogress';

class DeliveryOrderForm extends Component {
  constructor() {
    super();
    this.state = {
      openCustomerSearchDialog: false,
      openUserSearchDialog: false,
      courierFieldvalue: '',
      driver: '',
      confirm: false,
      req_connotenum: '',
      req_date: moment()
        .add(1, 'hours')
        .format('YYYY-MM-DDTHH:mm'),
      req_remarks: '',
      username: '',
      selected: [],
      req_courier_employee_id: '',
      ready: false,
      "data":[
        {
           "connote":"CGK1234567",
           "receiver":"Rizian Nawfal",
           "address":"Jalan Meruya llir No. 88",
           "phone": "082-323-7668"
        },
        {
           "connote":"CGK1234567",
           "receiver":"Alif Syafri",
           "address":"Jalan Lapangan Bola No. 12",
           "phone": "737-295-8267"
        },
        {
           "connote":"CGK1234567",
           "receiver":"Padma Nabhan",
           "address":"Jalan Cipete Raya No. 10",
           "phone": "815-625-7982"
        }
      ]
    };
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.edit !== true && this.setState({ready: true});
    this.props.edit &&
      getEntity(`delivery/${id}`, null).then((response) => {
        const {data} = response.data;
        this.setState({
          ...data,
          ready: true,
          req_date: moment(data.req_date).format('YYYY-MM-DDTHH:mm'),
          username: data.req_courier.first_name + ' ' + (data.req_courier.last_name || ''),
          req_courier_employee_id: data.req_courier.employee_id,
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
    putEntity(`delivery/${id}`, {
      req_connotenum: this.state.req_connotenum,
      req_phone: this.state.req_phone,
      req_address: this.state.req_address,
      req_date: this.state.req_date,
      req_remarks: this.state.req_remarks,
      req_courier_employee_id: this.state.req_courier_employee_id,
      driver: this.state.driver,
    }).then((response) => this.entitySubmitSuccess());
  };
  saveEntity = () => {
    postEntity('delivery', {
      req_connotenum: this.state.req_connotenum,
      req_phone: this.state.req_phone,
      req_address: this.state.req_address,
      req_date: this.state.req_date,
      remark: this.state.req_remarks,
      req_courier_employee_id: this.state.req_courier_employee_id,
      driver: this.state.driver,
    }).then((response) => this.entitySubmitSuccess());
  };
  entitySubmitSuccess = () => {
    this.showNotification('delivery');
    this.props.history.push(`/delivery/runsheet`);
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
      req_connotenum: data.customer_name,
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
    const {classes, edit, history, match, location} = this.props;
    const {
      ready,
      username,
      req_phone,
      req_connotenum,
      req_address,
      req_date,
      req_remarks,
      driver,
      confirm,
      openCustomerSearchDialog,
      openUserSearchDialog,
    } = this.state;

    const {data, selected} = this.state;
    const {url} = match;
    const driverlist = ['Yusuf', 'Ali', 'Tusman', 'Aehmed'];

    let countid = 1;

    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Delivery /
              <span className={classes.transactionBreadcrumbs}> Delivery Order /</span>
              <span className={classes.transactionBreadcrumbs}>
                {' '}
                {edit ? `Edit Delivery Order` : `New Delivery Order`}
              </span>
            </div>
            <br />
            <p className={classes.titleWrapper}>
              {edit ? `Edit Delivery Order` : `New Delivery Order`}
            </p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid container>

            <Grid item xs={9} sm={9}>
              <Paper className={classes.formWrapper}>
                <Typography type="headline" style={{fontSize: 18, color: "#424242"}}>
                  {' '}
                  {edit ? `Edit Connote` : `List of Connotes`}
                </Typography>
                    <div>
                      <FormControl className={classes.textField}>
                        <InputLabel htmlFor="req_connotenum">Masukkan kode bag/ connote</InputLabel>
                        <Input
                          id="req_connotenum"
                          type="text"
                          value={req_connotenum}
                          onChange={this.handleChange('req_connotenum')}
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
                      <div className={classes.tableWrapper}>
                        {data.length === 0 && <UserLinearProgress />}
                        <Table className={classes.table}>
                          <EnhancedInboundTableHead
                            numSelected={selected.length}
                            onSelectAllClick={this.handleSelectAllClick}
                            onSort={this.handleSort}
                            rowCount={data.length}
                          />
                          <TableBody>
                            {data
                              .sort(
                                (a, b) =>
                                  a.node < b.node ? -1 : 1,
                              )
                              .map((n, index) => {
                                return (
                                  <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={index+1}
                                  >
                                    <TableCell padding="none">{index+1}</TableCell>
                                    <TableCell padding="none">{n.connote}</TableCell>
                                    <TableCell>{n.receiver}</TableCell>
                                    <TableCell>{n.address}</TableCell>
                                    <TableCell>{n.phone}</TableCell>
                                    <TableCell>
                                      <Button
                                        variant="flat"
                                        dense="true"
                                        color="secondary"
                                        component={Link}
                                        to={`${match.url}`}
                                        style={removebt}
                                      >
                                        Remove
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                {openCustomerSearchDialog && (
                  <SearchCustomer
                    handleSelect={handleSelect}
                    openDialog={openCustomerSearchDialog}
                    handleOpenDialog={handleCustomerSearchDialog}
                  />
                )}

                <ConfirmationDialog
                  yeslabel={edit ? 'Save' : 'Add'}
                  title={edit ? `Edit delivery order` : `New delivery order`}
                  description={
                    edit
                      ? `Are you sure you want to save this delivery order?`
                      : `Are you sure you want to add this delivery order?`
                  }
                  open={confirm}
                  handleAction={handleAction}
                />              
              </Paper>
            </Grid>

            <Grid item xs={3} sm={3}>
              <Paper className={classes.formWrapper}>
                <Typography type="headline" style={{fontSize: 18, color: "#424242"}}>
                  Delivery Information
                </Typography>
                <p>
                  Connote: <strong style={{color: "#333333"}}>105</strong>
                </p>
                <p>
                  Weight (Kg): <strong style={{color: "#333333"}}>80</strong>
                </p>
                <hr/>
                <Typography type="headline" style={{fontSize: 18, color: "#424242", "margin-top": 20}}>
                  Assign driver
                </Typography>
                <TextField
                  id="driver-field"
                  select
                  label="Driver"
                  className={classes.textField}
                  value={driver}
                  onChange={this.handleChange('driver')}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                >
                  {driverlist.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Paper>
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
              <Button variant="raised" color="primary" onClick={handleAddSubmit}>
                {edit ? `Save` : `Add`}
              </Button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const removebt = {
  color: '#e62e28'
}

export default withStyles(styles)(DeliveryOrderForm);