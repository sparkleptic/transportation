import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {TextField, MenuItem} from 'material-ui';
import {getEntityList, getEntity} from '../../../../actions/entity';
import ReferenceDropDown from '../../../../components//refrencedropdown';

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_id: '',
      district_name: '',
      city_name: '',
      cityData: [],
      edit: false,
      inited: false,
    };
  }
  componentDidMount() {
    let formdata = this.props.formdata;
    formdata.city_id = this.props.edit ? this.props.formdata.city.city_id : '';
    formdata.city_name = this.props.edit
      ? this.props.formdata.city.city_name
      : '';
    this.setState({...formdata}, () => {
      this.props.edit && this.props.onUpdateForm('city_id', formdata.city_id);
    });
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  handleUpdate = (name) => (value) => {
    this.setState({[name]: value, city_name: ''});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {classes} = this.props;
    const {district_name, city_id, city_name} = this.state;
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
            value={district_name}
            label="District Name"
            required
            className={classes.textField}
            onChange={handleChange('district_name')}
          />
          <br />
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
