import React, {Component} from 'react';
import {Paper, TextField, MenuItem, Button} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {uniqWith, isEqual, isEmpty} from 'lodash';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import FormControl from 'material-ui/Form/FormControl';
import TarifTable from './extComps/tarifTable';
import ConfirmationDialog from './extComps/confirmationDialog';
import UserLinearProgress from '../../../UserLinearprogress';
import axios from 'axios';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 25,
  }),
  originTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  destinationTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
    float: 'right',
  },
  serviceTextField: {
    marginLeft: theme.spacing.unit * 17,
    marginRight: theme.spacing.unit,
    top: theme.spacing.unit + 3,
    width: 200,
    // float: 'right'
  },
  maxWeight: {
    marginLeft: theme.spacing.unit * 17,
    // float: 'right',
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
      originFieldvalue: '',
      destinationFieldvalue: '',
      serviceFieldvalue: '',
      dialogCout: false,
      DDdata: {},
    };
  }

  getDDdata = () => {
    let originDestDD, serviceDD;

    axios
      .get(`${BASE_API}geolocation`)
      .then((response) => {
        const {data} = response.data;
        const datas = data.map((item) => item.tariff_code);
        return (originDestDD = uniqWith(datas, isEqual));
      })
      .then((response) => {
        axios
          .get(`${BASE_API}service`)
          .then((response) => {
            const {data} = response.data;
            return (serviceDD = data.map((item) => item.service_code));
          })
          .then(() => {
            return this.setState({
              DDdata: {
                originDestDD,
                serviceDD,
              },
            });
          });
      });
  };
  componentDidMount() {
    this.getDDdata();
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
    const {
      originFieldvalue,
      destinationFieldvalue,
      serviceFieldvalue,
      DDdata,
      dialogCout,
    } = this.state;
    const originFieldData = ['CGK10000', 'CGK10000', 'Select All'];
    const destinationFieldData = ['BDO10000', 'BDO10000', 'Select All'];
    const serviceFieldData = ['REG', 'OKE', 'YES'];
    const {classes} = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Typography type="headline">New Base Tariff</Typography>
          {isEmpty(DDdata) ? (
            <UserLinearProgress />
          ) : (
            <div>
              <TextField
                id="origin-field"
                select
                label="Origin"
                required
                className={classes.originTextField}
                value={originFieldvalue}
                onChange={this.handleChange('originFieldvalue')}
                helperText="Please select your code"
                margin="normal"
              >
                {!isEmpty(DDdata) &&
                  DDdata.originDestDD.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
              <TextField
                id="destination-field"
                select
                label="Destination"
                className={classes.destinationTextField}
                value={destinationFieldvalue}
                onChange={this.handleChange('destinationFieldvalue')}
                helperText="Please select your code"
                margin="normal"
              >
                {!isEmpty(DDdata) &&
                  DDdata.originDestDD.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
              <br />
              <div>
                <TextField
                  label="Date"
                  required
                  margin="dense"
                  style={{marginLeft: 10}}
                />
                <TextField
                  id="service-field"
                  select
                  label="Service"
                  required
                  className={classes.serviceTextField}
                  value={serviceFieldvalue}
                  onChange={this.handleChange('serviceFieldvalue')}
                  margin="dense"
                >
                  {!isEmpty(DDdata) &&
                    DDdata.serviceDD.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField>
                <FormControl style={{marginLeft: 130}}>
                  <InputLabel htmlFor="amount">Min Weight *</InputLabel>
                  <Input
                    id="adornment-minWeight"
                    type="number"
                    // value={this.state.amount}
                    // onChange={this.handleChange('amount')}
                    endAdornment={
                      <InputAdornment position="end">Kg</InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl className={classes.maxWeight}>
                  <InputLabel htmlFor="amount">Max Weight *</InputLabel>
                  <Input
                    id="adornment-maxWeight"
                    type="number"
                    // value={this.state.amount}
                    // onChange={this.handleChange('amount')}
                    endAdornment={
                      <InputAdornment position="end">Kg</InputAdornment>
                    }
                  />
                </FormControl>
                {/* <TextField
                                label="Min Weight *"
                                margin="dense"
                                style={{ marginLeft: '17.8%' }}
                            /> */}
                {/* <TextField
                                label="Max Weight *"
                                margin="dense"
                                className={classes.maxWeight}
                            /> */}
              </div>
              <div>
                <Typography
                  type="title"
                  style={{marginTop: '3%', marginBottom: '3%'}}
                >
                  Tariff
                </Typography>
                <TarifTable />
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
              </div>
            </div>
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(BaseTabForm);
