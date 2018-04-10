import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {TextField, MenuItem} from 'material-ui';
import {getEntity} from '../../../../actions/entity';

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country_code: 'IDN',
      province_id: '',
      city_id: '',
      district_id: '',
      subdistrict_id: '',
      zip_code: '',
      countryData: [],
      provinceData: [],
      cityData: [],
      districtData: [],
      subDistrictData: [],
      inited: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    /* this.props.edit && !this.state.inited && this.setState({inited:true},()=>{
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
                                this.setState({...nextProps.formdata,...formdata});
                            })
                        })
                    })
                })
            })
        })*/
  };

  componentDidMount() {
    getEntity('countries', {l: -1}).then((response) => {
      const {data} = response.data;
      this.setState({
        countryData: data,
      });
      !this.props.edit &&
        getEntity('provinces', {country: this.state.country_code, l: -1}).then(
          (response) => {
            const {data} = response.data;
            this.setState({
              provinceData: data,
            });
          },
        );
      this.props.edit &&
        this.setState({inited: true}, () => {
          getEntity('provinces', {
            l: -1,
            country: this.props.formdata.country_code,
          })
            .then((response) => {
              const {data} = response.data;
              return {provinceData: data};
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
                            this.setState({
                              ...this.props.formdata,
                              ...formdata,
                            });
                          });
                        });
                    });
                });
            });
        });
    });
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
      });
    });
  };
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
    name === 'country_code' &&
      this.getDependentData(
        ['provinceData', 'cityData', 'districtData', 'subDistrictData'],
        'provinces',
        'provinceData',
        {country: value, l: -1},
      );
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
      countryData,
      provinceData,
      cityData,
      districtData,
      subDistrictData,
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
          </TextField>
          <br />
          <TextField
            id="province_id"
            select
            required
            label="Province"
            className={classes.textField}
            value={province_id}
            onChange={handleChange('province_id')}
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
          </TextField>
          <br />
          <TextField
            id="city_id"
            select
            required
            label="City"
            className={classes.textField}
            value={city_id}
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
            value={district_id}
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
            value={subdistrict_id}
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
            value={zip_code}
            label="Zipcode"
            required
            className={classes.textField}
            onChange={handleChange('zip_code')}
          />
          <br />
          <br />
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
