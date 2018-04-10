import React, {Component} from 'react';
import moment from 'moment';
import {Paper, TextField, MenuItem, Button} from 'material-ui';
import Radio, {RadioGroup} from 'material-ui/Radio';
import Grid from 'material-ui/Grid';
import {FormControlLabel} from 'material-ui/Form';
import ReferenceDropDown from '../../../../components/refrencedropdown';
import {getEntityList, getEntity} from '../../../../actions/entity';

class CreateVehicle extends Component {
  constructor() {
    super();
    this.state = {
      vehicle_status: 'In Use',
      vehicle_name: '',
      police_no: '',
      owned_by: '',
      max_volume: '',
      max_weight: '',
      vehicle_type_id: '',
      node_id: '',
      node_name: '',
      vehicleTypeData: [],
      exp_date: moment().format('YYYY-MM-DD'),
      own_date: moment().format('YYYY-MM-DD'),
      edit: false,
      inited: false,
    };
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  componentDidMount = () => {
    getEntityList('vehicletype', null).then((response) => {
      const {data} = response.data;
      this.setState({vehicleTypeData: data});
    });
    this.props.edit &&
      this.setState(
        {
          inited: true,
          ...this.props.formdata,
          vehicle_type_id:
          this.props.formdata.type &&
          this.props.formdata.type.vehicle_type_id,
          exp_date: this.props.formdata.expiry_date === null ? this.state.exp_date : moment(this.props.formdata.expiry_date).format('YYYY-MM-DD'),
          own_date: this.props.formdata.own_date === null ? this.state.own_date : moment(this.props.formdata.own_date).format('YYYY-MM-DD'),
        },
        () => {
          console.log(this.state)
          this.updateFormParams();
        },
      );
    if (!this.props.edit) {
      this.updateFormParams();
    }
  };
  updateFormParams = () => {
    this.props.onUpdateForm('exp_date', this.state.exp_date);
    this.props.onUpdateForm('own_date', this.state.own_date);
    this.props.onUpdateForm('vehicle_status', this.state.vehicle_status);
    this.props.onUpdateForm('vehicle_type_id', this.state.vehicle_type_id);
  };

  handleUpdate = (name) => (value) => {
    this.setState({[name]: value, node_name: ''});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {handleUpdate, handleChange} = this;
    const {classes} = this.props;
    const {
      node_name,
      node_id,
      vehicle_name,
      owned_by,
      vehicle_status,
      police_no,
      max_volume,
      exp_date,
      own_date,
      max_weight,
      vehicle_type_id,
      vehicleTypeData,
    } = this.state;
    return (
      <Grid container>
        <Grid item xs={6} sm={6}>
          <TextField
            id="vehicle_status"
            select
            required
            label="Status"
            className={classes.textField}
            value={vehicle_status}
            onChange={this.handleChange('vehicle_status')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            <MenuItem key={0} value="In Use">
              In Use
            </MenuItem>
            <MenuItem key={1} value="Not In Use">
              Not In Use
            </MenuItem>
          </TextField>

          <TextField
            id="vehicle-type-field"
            select
            label="Vehicle Type"
            required
            className={classes.textField}
            value={vehicle_type_id}
            onChange={this.handleChange('vehicle_type_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
          >
            {vehicleTypeData.map((option, index) => (
              <MenuItem key={index} value={option.vehicle_type_id}>
                {option.type_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Vehicle Name"
            value={vehicle_name}
            required
            className={classes.textField}
            onChange={handleChange('vehicle_name')}
          />
          <br />
          <TextField
            value={police_no}
            label="Registration No:"
            required
            className={classes.textField}
            onChange={handleChange('police_no')}
          />
          <br />
          <Grid container>
            <Grid item xs={6} sm={2}>
              <RadioGroup
                name="owned_by"
                aria-label="own By"
                value={owned_by}
                onChange={this.handleChange('owned_by')}
              >
                <FormControlLabel value="JNE" control={<Radio />} label="JNE" />
                <FormControlLabel
                  value="External"
                  control={<Radio />}
                  label="External"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={6} sm={6}>
              {owned_by === 'JNE' && (
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
                  placeholder={'Node'}
                  onUpdate={handleUpdate('node_id')}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="own_date"
            label="Own Date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={own_date}
            onChange={this.handleChange('own_date')}
          />
          <TextField
            id="exp_date"
            label="Exp Date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={exp_date}
            onChange={this.handleChange('exp_date')}
          />
          <TextField
            value={max_weight}
            label="Max Weight"
            required
            className={classes.textField}
            onChange={handleChange('max_weight')}
          />
          <br />
          <TextField
            value={max_volume}
            label="Max Volume"
            required
            className={classes.textField}
            onChange={handleChange('max_volume')}
          />
          <br />
        </Grid>
      </Grid>
    );
  }
}
export default CreateVehicle;
