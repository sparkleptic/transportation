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
  rightTextField: {
    float: 'right',
    marginRight: theme.spacing.unit,
    width: 500,
  },
  label: {
    float: 'right',
    width: 500,
    color: 'rgba(0, 0, 0, 0.54)',
    marginRight: theme.spacing.unit,
  },
  hours: {
    marginRight: theme.spacing.unit,
  },
  minutes: {
    marginLeft: theme.spacing.unit * 3 - 1,
  },
  menu: {
    top: 50,
    width: 200,
  },
  prefferedWrapper: {
    width: '22%',
  },
  prefferedTitle: {
    marginTop: theme.spacing.unit * 4,
  },
  prefferedBtn: {
    marginTop: '-10%',
    marginLeft: theme.spacing.unit * 2,
    float: 'right',
  },
});

class BaseTabForm extends Component {
  constructor() {
    super();
    this.state = {
      originFieldvalue: '',
      vehicleTypeFieldvalue: '',
      destinationFieldvalue: '',
      etaHoursFieldvalue: '',
      etaMinutesFieldvalue: '',
      prefferedVehiclevalue: '',
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
    const {
      originFieldvalue,
      vehicleTypeFieldvalue,
      destinationFieldvalue,
      etaHoursFieldvalue,
      etaMinutesFieldvalue,
      prefferedVehiclevalue,
      dialogCout,
    } = this.state;
    const originData = ['CGKXXX', 'BDGXXX', 'SBYXXX'];
    const vehicleTypeData = ['Truck', 'Airplane', 'etc'];
    const destinationData = ['PDGXXX', 'BGRXXX', 'MLGXXX'];

    return (
      <div>
        <Paper className={classes.root}>
          <Typography type="headline">New Links</Typography>

          <TextField
            id="origin-field"
            select
            label="Origin"
            required
            className={classes.textField}
            value={originFieldvalue}
            onChange={this.handleChange('originFieldvalue')}
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
            id="vehicle-type-field"
            select
            label="Vehicle Type"
            required
            className={classes.rightTextField}
            value={vehicleTypeFieldvalue}
            onChange={this.handleChange('vehicleTypeFieldvalue')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            {vehicleTypeData.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <TextField
            id="destination-field"
            select
            label="Destination"
            required
            className={classes.textField}
            value={destinationFieldvalue}
            onChange={this.handleChange('destinationFieldvalue')}
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
          <div className={classes.rightTextField}>
            <InputLabel>ETA *</InputLabel>
            <br />
            <Input
              className={classes.hours}
              inputProps={{
                'aria-label': 'Description',
              }}
              endAdornment={<InputAdornment>Hours</InputAdornment>}
            />
            <Input
              className={classes.minutes}
              inputProps={{
                'aria-label': 'Description',
              }}
              endAdornment={<InputAdornment>Minutes</InputAdornment>}
            />
          </div>
          <div className={classes.prefferedWrapper}>
            <Typography type="title" className={classes.prefferedTitle}>
              Preffered Vehicle
            </Typography>{' '}
            <Button className={classes.prefferedBtn}>+&nbsp;&nbsp;Add</Button>
          </div>

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
