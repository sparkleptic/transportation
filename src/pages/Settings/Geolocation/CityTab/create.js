import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {TextField, MenuItem} from 'material-ui';
import {getEntity, getEntityList} from '../../../../actions/entity';
class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province_id: '',
      city_name: '',
      provinceData: [],
      time_zone_id: '',
      timezoneData: [],
      edit: false,
      inited: false,
    };
  }
  componentDidMount() {
    getEntity('provinces', {l: -1})
      .then((response) => {
        const {data} = response.data;
        return {provinceData: data};
      })
      .then((formdata) => {
        getEntity('timezones', {l: -1}).then((response) => {
          const {data} = response.data;
          formdata.timezoneData = data;
          formdata.time_zone_id =
            this.props.edit && this.props.formdata.timezone
              ? this.props.formdata.timezone.time_zone_id
              : '';
          formdata.province_id = this.props.edit
            ? this.props.formdata.province.province_id
            : '';
          this.setState(
            {
              ...this.props.formdata,
              ...formdata,
            },
            () => {
              this.props.edit &&
                this.props.onUpdateForm(
                  'province_id',
                  this.props.formdata.province.province_id,
                );
              this.props.edit &&
                this.props.onUpdateForm(
                  'time_zone_id',
                  this.props.formdata.timezone.time_zone_id,
                );
            },
          );
        });
      });
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  handleUpdate = (name) => (value) => {
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {classes} = this.props;
    const {
      province_id,
      city_name,
      provinceData,
      time_zone_id,
      timezoneData,
    } = this.state;
    const {handleChange, handleUpdate} = this;
    return (
      <Grid container>
        <Grid item xs={6} sm={6}>
          <TextField
            id="province_id"
            select
            required
            label="Province"
            className={classes.textField}
            value={province_id}
            onChange={this.handleChange('province_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            {provinceData
              ? provinceData.map((option, index) => (
                  <MenuItem key={index} value={option.province_id}>
                    {option.province_name}
                  </MenuItem>
                ))
              : null}
          </TextField>{' '}
          <br />
          <TextField
            id="time_zone_id"
            select
            required
            label="Timezone"
            className={classes.textField}
            value={time_zone_id}
            onChange={this.handleChange('time_zone_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
          >
            {timezoneData
              ? timezoneData.map((option, index) => (
                  <MenuItem key={index} value={option.time_zone_id}>
                    {option.time_zone_name} - {option.time_zone_offset}
                  </MenuItem>
                ))
              : null}
          </TextField>
          {/*<ReferenceDropDown className={classes.textField}
                        remoteCall={ getEntityList }
                        entity={'provinces'}
                        valueKey={'province_id'}
                        labelKey={'province_name'}
                        searchkey={'s'}
                        placeholder={'Select Province'}
                        onUpdate={handleUpdate('province_id')}
                    />*/}
          <TextField
            value={city_name}
            label="City Name"
            required
            className={classes.textField}
            onChange={handleChange('city_name')}
          />
          <br />
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
