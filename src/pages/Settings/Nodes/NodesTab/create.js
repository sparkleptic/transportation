import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {TextField, MenuItem} from 'material-ui';
import {getEntityList, getEntity} from '../../../../actions/entity';
import ReferenceDropDown from '../../../../components//refrencedropdown';
var _ = require('lodash');

class Create extends Component {
  constructor() {
    super();
    this.state = {
      nodetypeData: [],
      provinceData: [],
      cityData: [],
      districtData: [],
      subDistrictData: [],
      timezoneData: [],
      timezone: '',
      province_id: '',
      city_id: '',
      district_id: '',
      subdistrict_id: '',
      time_zone_id: '',
      node_type_id: '',
      node_code: '',
      status: 'Active',
      node_name: '',
      phone: '',
      remark: '',
      zip_code: '',
      first_name: '',
      employee_id: '',
      dataNodes: [],
      edit: false,
      userData: '',
      inited: false,
    };
  }
  componentDidMount() {
    const {
      phone,
      province_id,
      city_id,
      district_id,
      subdistrict_id,
      zip_code,
      remark,
      status,
    } = this.props.formdata;
    this.setState(
      {
        ...this.props.formdata,
        phone: phone || '',
        province_id: province_id || '',
        city_id: city_id || '',
        district_id: district_id || '',
        subdistrict_id: subdistrict_id || '',
        zip_code: zip_code || '',
        remark: remark || '',
        status: _.upperFirst(status) || '',
        employee_id:
          this.props.formdata.pic && this.props.formdata.pic.employee_id,
        first_name:
          this.props.formdata.pic && this.props.formdata.pic.first_name,
      },
      () => {
        getEntity('nodetype', {l: -1})
          .then((response) => {
            const {data} = response.data;
            return {nodetypeData: data};
          })
          .then((formdata) => {
            getEntityList('provinces', {l: -1}).then((response) => {
              const {data} = response.data;
              this.setState({...formdata, provinceData: data});
            });
          });
        this.state.province_id &&
          getEntity('cities', {
            cprovinceity: this.state.province_id,
            l: -1,
          }).then((response) => {
            const {data} = response.data;
            this.setState({
              cityData: data,
              timezone: data.find((o) => o.city_id === this.state.city_id)
                .timezone.time_zone_name,
            });
            this.state.city_id &&
              getEntity('district', {city: this.state.city_id, l: -1}).then(
                (response) => {
                  const {data} = response.data;
                  this.setState({districtData: data});
                  this.state.district_id &&
                    getEntity('subdistrict', {
                      district: this.state.district_id,
                      l: -1,
                    }).then((response) => {
                      const {data} = response.data;
                      this.setState({subDistrictData: data});
                    });
                },
              );
          });
      },
    );
  }
  getDependentData = (a, b, c, params) => {
    const obj = {
      cityData: this.state.cityData,
      districtData: this.state.districtData,
      subDistrictData: this.state.subDistrictData,
    };
    a.map((n) => (obj[n] = []));
    getEntity(b, params).then((response) => {
      const {data} = response.data;
      obj[c] = data;
      this.setState({
        ...obj,
        //timezone: b==='district' && this.state.cityData.find(o => o.city_id === this.state.city_id).timezone.time_zone_name
      });
    });
  };
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);

    name === 'province_id' &&
      this.getDependentData(
        ['cityData', 'districtData', 'subDistrictData'],
        'cities',
        'cityData',
        {province: value, l: -1},
      );
    name === 'city_id' &&
      this.getDependentData(
        ['districtData', 'subDistrictData'],
        'district',
        'districtData',
        {city: value, l: -1},
      );
    name === 'district_id' &&
      this.getDependentData(
        ['subDistrictData'],
        'subdistrict',
        'subDistrictData',
        {district: value, l: -1},
      );

    /**
     * Grab Timezone from cities data
     */
    name === 'city_id' &&
      this.setState({
        timezone: this.state.cityData.find((o) => o.city_id === value).timezone
          .time_zone_name,
      });
  };
  handleUpdate = (name) => (value) => {
    this.setState({[name]: value, first_name: ''});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {handleChange, handleUpdate} = this;
    const {classes} = this.props;
    const {
      node_type_id,
      node_code,
      node_name,
      phone,
      address,
      province_id,
      city_id,
      district_id,
      subdistrict_id,
      zip_code,
      timezone,
      remark,
      status,
      first_name,
      employee_id,
      provinceData,
      cityData,
      districtData,
      subDistrictData,
      nodetypeData,
    } = this.state;
    return (
      <Grid container>
        <Grid item xs={6} sm={6}>
          <TextField
            id="node_type_id"
            select
            label="Type"
            required
            className={classes.textField}
            value={node_type_id}
            onChange={handleChange('node_type_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            {nodetypeData
              ? nodetypeData.map((option, index) => (
                  <MenuItem
                    key={option.node_type_id}
                    value={option.node_type_id}
                  >
                    {option.node_description}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <br />
          <TextField
            onChange={this.handleChange('node_code')}
            value={node_code}
            label="Code"
            required
            className={classes.textField}
          />
          <br />
          <TextField
            onChange={this.handleChange('node_name')}
            value={node_name}
            label="Name"
            required
            className={classes.textField}
          />
          <br />
          <TextField
            onChange={this.handleChange('phone')}
            value={phone}
            label="Phone"
            required
            className={classes.textField}
          />
          <br />
          <TextField
            onChange={this.handleChange('address')}
            value={address}
            label="Address"
            required
            className={classes.textField}
          />
          <TextField
            id="province_id"
            select
            label="Province"
            required
            className={classes.textField}
            value={province_id}
            onChange={this.handleChange('province_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
          >
            {provinceData
              ? provinceData.map((option, index) => (
                  <MenuItem key={option.province_id} value={option.province_id}>
                    {option.province_name}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <TextField
            id="city_id"
            select
            label="City"
            required
            className={classes.textField}
            value={city_id}
            onChange={this.handleChange('city_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
          >
            {cityData
              ? cityData.map((option, index) => (
                  <MenuItem key={index} value={option.city_id}>
                    {option.city_name}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <TextField
            id="district_id"
            select
            label="District"
            required
            className={classes.textField}
            value={district_id}
            onChange={this.handleChange('district_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
          >
            {districtData
              ? districtData.map((option, index) => (
                  <MenuItem key={index} value={option.district_id}>
                    {option.district_name}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <TextField
            id="subdistrict_id"
            select
            label="Sub-District"
            required
            className={classes.textField}
            value={subdistrict_id}
            onChange={this.handleChange('subdistrict_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
          >
            {subDistrictData
              ? subDistrictData.map((option, index) => (
                  <MenuItem key={index} value={option.subdistrict_id}>
                    {option.subdistrict_name}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <TextField
            onChange={this.handleChange('zip_code')}
            value={zip_code}
            label="Zip Code"
            required
            className={classes.textField}
          />
          <br />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="timezone"
            value={timezone}
            label="Timezone"
            required
            className={classes.textField}
            inputProps={{
              readOnly: true,
              disabled: true,
            }}
          />
          <br />
          <TextField
            onChange={this.handleChange('remark')}
            value={remark}
            label="Remarks"
            required
            className={classes.textField}
          />
          <br />
          <TextField
            id="status"
            select
            required
            label="Status"
            className={classes.textField}
            value={status}
            onChange={this.handleChange('status')}
            SelectProps={{MenuProps: {className: classes.menu}}}
          >
            <MenuItem key={0} value="Active">
              Active
            </MenuItem>
            <MenuItem key={1} value="Inactive">
              Inactive
            </MenuItem>
          </TextField>
          <br />

          <ReferenceDropDown
            className={classes.textField}
            value={employee_id && parseInt(employee_id, 10)}
            selectedValue={
              first_name && {first_name: first_name, employee_id: employee_id}
            }
            remoteCall={getEntityList}
            entity={'employee?pstatus=4'}
            valueKey={'employee_id'}
            labelKey={'first_name'}
            searchkey={'s'}
            placeholder={'Pic'}
            onUpdate={handleUpdate('employee_id')}
          />
          <br />
        </Grid>
      </Grid>
    );
  }
}

export default Create;
