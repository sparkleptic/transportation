import React, {Component} from 'react';
import {Paper, TextField, MenuItem, Button} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import ConfirmationDialog from './extComps/confirmationDialog';
import UserLinearProgress from '../../../UserLinearprogress';
import axios from 'axios';

const BASE_API = 'http://coreapi.skyware.systems/api/';
const styles = (theme) => ({
  divRoot: {
    bottom: 25,
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 25,
  }),
  nameTextField: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  dateFrom: {
    marginLeft: `${theme.spacing.unit + 11}%`,
  },
  dateTo: {
    marginLeft: '8.4%',
  },
  conditionFrom: {
    marginTop: theme.spacing.unit,
    marginLeft: '18.2%',
    width: 500,
  },
  menu: {
    top: 50,
    width: 200,
  },
});

class SpecialTabForm extends Component {
  constructor() {
    super();
    this.state = {
      nameFieldvalue: '',
      appliedvalue: '',
      conditionvalue: '',
      conditionFromValue: '',
      otherConditionValue: '',
      otherConditionFromValue: '',
      conditionIterateCout: [],
      dialogCout: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleIterConditionField = this.handleIterConditionField.bind(this);
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // getData = () => {
  //     axios.get(`${BASE_API}constant`).then(response => {
  //         const {data} = response.data
  //        return
  //     })
  // }
  componentDidMount() {
    // this.getData()
  }
  conditionFieldData = ['From Country', 'From Province', 'From District'];
  conditionFromFieldData = ['Jawa Barat', 'Jawa Timur', 'Jawa Tengah'];
  handleIterConditionField = () => {
    const {classes} = this.props;
    const {
      conditionIterateCout,
      otherConditionValue,
      otherConditionFromValue,
    } = this.state;
    return this.setState({
      conditionIterateCout: (conditionIterateCout || []).concat(
        <div key={Math.random().toPrecision(2)}>
          <TextField
            id="condition-field"
            select
            value={otherConditionValue}
            label="Condition"
            required
            className={classes.nameTextField}
            onChange={this.handleChange('otherConditionValue')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="dense"
          >
            {this.conditionFieldData.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {otherConditionValue.length > 0 && (
            <TextField
              id="otherconditionfrom-field"
              select
              value={otherConditionFromValue}
              label={otherConditionValue}
              required
              className={classes.conditionFrom}
              onChange={this.handleChange('otherConditionFromValue')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="dense"
            >
              {this.conditionFromFieldData.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        </div>,
      ),
    });
  };
  handleAddSubmit = () => {
    return this.setState({dialogCout: !this.state.dialogCout});
  };
  render() {
    const {handleAddSubmit} = this;
    const {
      nameFieldvalue,
      conditionIterateCout,
      appliedvalue,
      conditionvalue,
      conditionFromValue,
      dialogCout,
    } = this.state;
    const appliedFieldData = ['Flat Rate', 'Discount %', 'Discount Rp'];
    const {classes} = this.props;

    return (
      <div className={classes.divRoot}>
        <Paper className={classes.root}>
          <Typography type="headline">New Special Tariff</Typography>
          <TextField
            value={nameFieldvalue}
            label="Name"
            className={classes.nameTextField}
            required
          />
          <TextField label="Date From" className={classes.dateFrom} required />
          <TextField label="Date To" className={classes.dateTo} required />
          <Typography
            type="title"
            style={{marginTop: '3%', marginBottom: '2%'}}
          >
            Setting
          </Typography>
          <TextField
            id="condition-field"
            select
            value={conditionvalue}
            label="Condition"
            required
            className={classes.nameTextField}
            onChange={this.handleChange('conditionvalue')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="dense"
          >
            {this.conditionFieldData.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {conditionvalue.length > 0 && (
            <TextField
              id="conditionfrom-field"
              select
              value={conditionFromValue}
              label={conditionvalue}
              required
              className={classes.conditionFrom}
              onChange={this.handleChange('conditionFromValue')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="dense"
            >
              {this.conditionFromFieldData.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
          {conditionIterateCout}
          <br />
          <br />
          <Button onClick={this.handleIterConditionField}>+ Add Setting</Button>

          <Typography type="title" style={{marginTop: '3%'}}>
            Applied Tariff
          </Typography>
          <TextField
            id="appliedtariff-field"
            select
            label="Applied Tariff"
            required
            className={classes.nameTextField}
            value={appliedvalue}
            onChange={this.handleChange('appliedvalue')}
            margin="dense"
          >
            {appliedFieldData.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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

export default withStyles(styles)(SpecialTabForm);
