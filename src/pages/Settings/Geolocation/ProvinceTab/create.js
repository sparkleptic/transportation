import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import {TextField, MenuItem} from 'material-ui';
import {getEntity} from '../../../../actions/entity';

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province_name: '',
      country_code: 'IDN',
      country_id: 151,
      countryData: [],
      edit: false,
      inited: false,
    };
  }
  componentWillReceiveProps = (nextProps) => {
    /*this.props.edit && !this.state.inited && this.setState({inited:true,
            ...nextProps.formdata,country_code:nextProps.formdata.country.country_code},
            ()=>{
            this.props.onUpdateForm( "country_code", nextProps.formdata.country.country_code )
        })*/
  };
  componentDidMount() {
    getEntity('countries', {l: -1}).then((response) => {
      const {data} = response.data;
      let formdata = {countryData: data};
      formdata.country_id = this.props.edit
        ? this.props.formdata.country.id
        : 151;
      this.setState({...this.props.formdata, ...formdata}, () => {
        this.props.onUpdateForm('country_id', formdata.country_id);
      });
    });
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);
  };
  render() {
    const {classes} = this.props;
    const {province_name, country_id, countryData} = this.state;
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
            value={country_id}
            onChange={handleChange('country_id')}
            SelectProps={{MenuProps: {className: classes.menu}}}
            margin="normal"
          >
            {countryData
              ? countryData.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.country_name}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <br />
          <TextField
            value={province_name}
            label="Province Name"
            required
            className={classes.textField}
            onChange={handleChange('province_name')}
          />
          <br />
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
