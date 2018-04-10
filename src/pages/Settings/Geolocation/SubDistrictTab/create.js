import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {TextField, MenuItem} from 'material-ui';
import {getEntity, getEntityList} from '../../../../actions/entity';
import ReferenceDropDown from '../../../../components//refrencedropdown';

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      district_id: '',
      city_id: '',
      city_name: '',
      subdistrict_name: '',
      districtData: [],
      inited: false,
    };
  }
  componentDidMount() {
    let formdata = this.props.formdata;
    formdata.district_id = this.props.edit
      ? this.props.formdata.district.district_id
      : '';
    formdata.city_id = this.props.edit
      ? this.props.formdata.district.city.city_id
      : '';
    formdata.city_name = this.props.edit
      ? this.props.formdata.district.city.city_name
      : '';

    this.props.edit &&
      this.props.formdata.district.city &&
      getEntity('district', {
        city: this.props.formdata.district.city.city_id,
        l: -1,
      }).then((response) => {
        const {data} = response.data;
        this.props.onUpdateForm(
          'district_id',
          this.props.formdata.district.district_id,
        );
        this.props.onUpdateForm(
          'city_id',
          this.props.formdata.district.city.city_id,
        );
        this.props.onUpdateForm(
          'city_name',
          this.props.formdata.district.city.city_name,
        );
        this.setState({districtData: data, ...formdata});
      });
    this.props.edit === false && this.setState({...formdata});
  }

  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  handleUpdate = (name) => (value) => {
    this.setState(
      {[name]: value, city_name: '', districtData: [], district_id: ''},
      () => {
        getEntity('district', {city: value, l: -1}).then((response) => {
          const {data} = response.data;
          this.setState({
            districtData: data,
          });
        });
        this.props.onUpdateForm(name, value);
      },
    );
  };
  render() {
    const {classes} = this.props;
    const {
      city_name,
      city_id,
      district_id,
      subdistrict_name,
      districtData,
    } = this.state;
    const {handleChange, handleUpdate} = this;
    return (
      <Grid container>
        <Grid item xs={6} sm={6}>
          <ReferenceDropDown
            className={classes.textField}
            value={city_id && parseInt(city_id, 10)}
            selectedValue={
              city_name && {city_name: city_name, city_id: city_id}
            }
            remoteCall={getEntityList}
            entity={'cities'}
            valueKey={'city_id'}
            labelKey={'city_name'}
            searchkey={'s'}
            placeholder={'City'}
            onUpdate={handleUpdate('city_id')}
          />
          <TextField
            id="district_id"
            select
            required
            label="District"
            className={classes.textField}
            value={district_id}
            onChange={handleChange('district_id')}
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
          <br />
          <TextField
            value={subdistrict_name}
            label="SubDistrict Name"
            required
            className={classes.textField}
            onChange={handleChange('subdistrict_name')}
          />
          <br />
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
