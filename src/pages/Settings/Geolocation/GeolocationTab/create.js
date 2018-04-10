import React, {Component} from 'react';

import Grid from 'material-ui/Grid';
import {TextField, MenuItem} from 'material-ui';
import {getEntity} from '../../../../actions/entity';
class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_code: 151,
      province_id: '',
      city_id: '',
      district_id: '',
      subdistrict_id: '',
      zip_code: '',
      tariff_code: '',
      timezone: '',
      countryData: [],
      provinceData: [],
      cityData: [],
      districtData: [],
      subDistrictData: [],
      zipcodeData: [],
      edit: false,
      inited: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    /*this.props.edit && !this.state.inited && this.setState({inited:true},()=>{
            getEntity('provinces', {l:-1,country:nextProps.formdata.country_code})
            .then(response => {
                const { data } = response.data
                return { provinceData:data };
            })
            .then(formdata => {
                getEntity('cities', {l:-1,province:nextProps.formdata.province_id})
                .then(response => {
                    const { data } = response.data
                    formdata.cityData = data
                    return formdata
                })
                .then(formdata => {
                    getEntity('district', {l:-1,city:nextProps.formdata.city_id})
                    .then(response => {
                        const { data } = response.data
                        formdata.districtData = data
                        return formdata
                    })
                    .then(formdata => {
                        getEntity('subdistrict', {l:-1,district:nextProps.formdata.district_id})
                        .then(response => {
                            const { data } = response.data
                            formdata.subDistrictData = data
                            return formdata
                        })
                        .then(formdata => {
                            getEntity('zipcodes', {l:-1,subdistrict:nextProps.formdata.subdistrict_id})
                            .then(response => {
                                const { data } = response.data
                                formdata.zipcodeData = data
                                this.setState({...nextProps.formdata,...formdata, timezone:nextProps.formdata.timezone.time_zone_offset});
                                this.props.onUpdateForm( "timezone", nextProps.formdata.timezone.time_zone_offset );
                            })
                        })
                    })
                })
            })
        })*/
  };
  componentDidMount() {
    getEntity('countries', {l: -1})
      .then((response) => {
        const {data} = response.data;
        return {countryData: data};
      })
      .then((formdata) => {
        this.props.edit === false &&
          getEntity('provinces', {
            l: -1,
            country_id: this.state.country_code,
          }).then((response) => {
            const {data} = response.data;
            formdata.provinceData = data;
            return this.setState({...formdata}, () => {
              this.props.onUpdateForm('country_code', 'IDN');
            });
          });
        this.props.edit &&
          getEntity('provinces', {
            l: -1,
            country: this.props.formdata.country_code,
          })
            .then((response) => {
              const {data} = response.data;
              formdata.provinceData = data;
              return formdata;
            })
            .then((formdata) => {
              getEntity('cities', {
                l: -1,
                province: this.props.formdata.province_id,
              })
                .then((response) => {
                  const {data} = response.data;
                  formdata.cityData = data;
                  return formdata;
                })
                .then((formdata) => {
                  getEntity('district', {
                    l: -1,
                    city: this.props.formdata.city_id,
                  })
                    .then((response) => {
                      const {data} = response.data;
                      formdata.districtData = data;
                      return formdata;
                    })
                    .then((formdata) => {
                      getEntity('subdistrict', {
                        l: -1,
                        district: this.props.formdata.district_id,
                      })
                        .then((response) => {
                          const {data} = response.data;
                          formdata.subDistrictData = data;
                          return formdata;
                        })
                        .then((formdata) => {
                          getEntity('zipcodes', {
                            l: -1,
                            subdistrict: this.props.formdata.subdistrict_id,
                          }).then((response) => {
                            const {data} = response.data;
                            formdata.zipcodeData = data;
                            this.setState(
                              {
                                ...this.props.formdata,
                                ...formdata,
                                timezone: this.props.formdata.timezone
                                  .time_zone_offset,
                              },
                              () => {
                                this.props.onUpdateForm(
                                  'country_code',
                                  this.props.formdata.country_code,
                                );
                              },
                            );
                          });
                        });
                    });
                });
            });
      });
  }
  getDependentData = (a, b, c, d) => {
    const obj = {
      cityData: this.state.cityData,
      districtData: this.state.districtData,
      subDistrictData: this.state.subDistrictData,
      provinceData: this.state.provinceData,
      zipcodeData: this.state.zipcodeData,
    };
    a.map((n) => (obj[n] = []));
    return getEntity(b, d).then((response) => {
      const {data} = response.data;
      obj[c] = data;
      return this.setState({
        ...obj,
      });
    });
  };
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({
      [name]: value,
    });
    this.props.onUpdateForm(name, value);
    name === 'country_code' &&
      this.getDependentData(
        [
          'provinceData',
          'cityData',
          'districtData',
          'subDistrictData',
          'zipcodeData',
        ],
        'provinces',
        'provinceData',
        {l: -1, country: value},
      );
    name === 'province_id' &&
      this.getDependentData(
        ['cityData', 'districtData', 'subDistrictData', 'zipcodeData'],
        'cities',
        'cityData',
        {l: -1, province: value},
      );
    name === 'city_id' &&
      this.getDependentData(
        ['districtData', 'subDistrictData', 'zipcodeData'],
        'district',
        'districtData',
        {l: -1, city: value},
      );
    name === 'district_id' &&
      this.getDependentData(
        ['subDistrictData', 'zipcodeData'],
        'subdistrict',
        'subDistrictData',
        {l: -1, district: value},
      );
    name === 'subdistrict_id' &&
      this.getDependentData(['zipcodeData'], 'zipcodes', 'zipcodeData', {
        l: -1,
        subdistrict: value,
      });
  };
  render() {
    const {classes} = this.props;
    const {
      country_code,
      province_id,
      city_id,
      district_id,
      subdistrict_id,
      zip_code,
      tariff_code,
      timezone,
      countryData,
      provinceData,
      cityData,
      districtData,
      subDistrictData,
      zipcodeData,
    } = this.state;
    const {handleChange} = this;

    return (
      <Grid container>
        <Grid item xs={6} sm={6}>
          <TextField
            id="country_code"
            select
            required
            label="Country"
            className={classes.textField}
            value={country_code}
            onChange={handleChange('country_code')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            {countryData
              ? countryData.map((option, index) => (
                  <MenuItem key={index} value={option.country_code}>
                    {option.country_name}
                  </MenuItem>
                ))
              : null}
          </TextField>{' '}
          <br />
          <TextField
            id="province_id"
            select
            required
            label="Province"
            className={classes.textField}
            value={parseInt(province_id, 10)}
            onChange={handleChange('province_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            {provinceData
              ? provinceData.map((option, index) => (
                  <MenuItem
                    key={option.province_name}
                    value={option.province_id}
                  >
                    {option.province_name}
                  </MenuItem>
                ))
              : null}
          </TextField>{' '}
          <br />
          <TextField
            id="city_id"
            select
            required
            label="City"
            className={classes.textField}
            value={parseInt(city_id, 10)}
            onChange={handleChange('city_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            {cityData
              ? cityData.map((option, index) => (
                  <MenuItem key={index} value={option.city_id}>
                    {option.city_name}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <br />
          <TextField
            id="district_id"
            select
            required
            label="District"
            className={classes.textField}
            value={parseInt(district_id, 10)}
            onChange={handleChange('district_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            {districtData
              ? districtData.map((option, index) => (
                  <MenuItem key={index} value={option.district_id}>
                    {option.district_name}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <br />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="subdistrict_id"
            select
            required
            label="SubDistrict"
            className={classes.textField}
            value={parseInt(subdistrict_id, 10)}
            onChange={handleChange('subdistrict_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            {subDistrictData
              ? subDistrictData.map((option, index) => (
                  <MenuItem key={index} value={option.subdistrict_id}>
                    {option.subdistrict_name}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <br />
          <TextField
            id="zip_code"
            select
            required
            label="Zip Code"
            className={classes.textField}
            value={zip_code}
            onChange={this.handleChange('zip_code')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            {zipcodeData
              ? zipcodeData.map((option, index) => (
                  <MenuItem key={index} value={option.zip_code}>
                    {option.zip_code}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <br />
          <TextField
            value={tariff_code}
            label="Tariff Code"
            required
            className={classes.textField}
            onChange={handleChange('tariff_code')}
          />
          <br />
          <br />
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
