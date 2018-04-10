import React, {Component} from 'react';
import Grid from 'material-ui/Grid';
import moment from 'moment';
import {TextField, MenuItem, Button} from 'material-ui';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {getEntity} from '../../../../actions/entity';
import Typography from 'material-ui/Typography/Typography';
import {isEmpty} from 'lodash';
import FormControl from 'material-ui/Form/FormControl';
import TarifTable from './form/extComps/tarifTable';
class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originFieldvalue: '',
      destinationFieldvalue: '',
      serviceFieldvalue: '',
      dialogCout: false,
      DDdata: {},
      req_date: moment()
        .add(1, 'hours')
        .format('YYYY-MM-DDTHH:mm'),
      originChoice: '',
      destChoice: '',
      choiceData: [
        {
          valuekey: 'id',
          labelkey: 'country_name',
          entity: 'countries',
          label: 'Country',
          value: 0,
        },
        {
          valuekey: 'province_id',
          labelkey: 'province_name',
          entity: 'provinces',
          label: 'Province',
          value: 1,
        },
        {
          valuekey: 'city_id',
          labelkey: 'city_name',
          entity: 'cities',
          label: 'City',
          value: 2,
        },
        {
          valuekey: 'district_id',
          labelkey: 'district_name',
          entity: 'district',
          label: 'District',
          value: 3,
        },
        {
          valuekey: 'subdistrict_id',
          labelkey: 'subdistrict_name',
          entity: 'subdistrict',
          label: 'SubDistrict',
          value: 4,
        },
        {
          valuekey: '',
          labelkey: '',
          entity: 'tariffcode',
          label: 'Tariff Code',
          value: 5,
        },
      ],
      originData: [],
      destData: [],
    };
  }
  componentDidMount() {
    getEntity('provinces', null).then((response) => {
      const {data} = response.data;
      this.setState({
        provinceData: data,
      });
    });
  }
  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});
    this.props.onUpdateForm(name, value);

    name === 'originChoice' &&
      getEntity(this.state.choiceData[value].entity, null).then((response) => {
        const {data} = response.data;
        this.setState({
          originData: data,
        });
      });

    name === 'destChoice' &&
      getEntity(this.state.choiceData[value].entity, null).then((response) => {
        const {data} = response.data;
        this.setState({
          destData: data,
        });
      });
  };
  render() {
    const {handleAddSubmit} = this;
    const {
      req_date,
      destData,
      originData,
      choiceData,
      originFieldvalue,
      destinationFieldvalue,
      serviceFieldvalue,
      originChoice,
      destChoice,
      DDdata,
      dialogCout,
    } = this.state;
    const originFieldData = ['CGK10000', 'CGK10000', 'Select All'];
    const destinationFieldData = ['BDO10000', 'BDO10000', 'Select All'];
    const serviceFieldData = ['REG', 'OKE', 'YES'];
    const {classes} = this.props;
    const {handleChange} = this;

    return (
      <div>
        <Grid container>
          <Grid item xs={6} sm={6}>
            <Grid container>
              <Grid item xs={6} sm={6}>
                <TextField
                  select
                  required
                  value={originChoice}
                  className={classes.textField}
                  id="originChoice"
                  label="Origin Choice"
                  onChange={this.handleChange('originChoice')}
                >
                  {choiceData.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  select
                  required
                  value={originFieldvalue}
                  className={classes.textField}
                  id="originFieldvalue"
                  label="Origin Selection"
                  onChange={this.handleChange('originFieldvalue')}
                >
                  {originData.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option[choiceData[originChoice].valuekey]}
                    >
                      {option[choiceData[originChoice].labelkey]}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Grid container>
              <Grid item xs={6} sm={6}>
                <TextField
                  select
                  required
                  value={destChoice}
                  className={classes.textField}
                  id="destChoice"
                  label="Destination Choice"
                  onChange={this.handleChange('destChoice')}
                >
                  {choiceData.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6} sm={6}>
                <TextField
                  select
                  required
                  value={destinationFieldvalue}
                  className={classes.textField}
                  id="destinationFieldvalue"
                  label="Destination Selection"
                  onChange={this.handleChange('destinationFieldvalue')}
                >
                  {destData.map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option[choiceData[destChoice].valuekey]}
                    >
                      {option[choiceData[destChoice].labelkey]}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div>
          <TextField
            id="datetime-local"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={req_date}
            onChange={this.handleChange('req_date')}
          />
          <TextField
            id="service-field"
            select
            label="Service"
            required
            className={classes.serviceTextField}
            value={serviceFieldvalue}
            onChange={handleChange('serviceFieldvalue')}
            margin="dense"
          >
            <MenuItem key="1" value="1">
              1
            </MenuItem>
          </TextField>
          <FormControl style={{marginLeft: 130}}>
            <InputLabel htmlFor="amount">Min Weight *</InputLabel>
            <Input
              id="adornment-minWeight"
              type="number"
              // value={this.state.amount}
              // onChange={this.handleChange('amount')}
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            />
          </FormControl>
          <FormControl className={classes.maxWeight}>
            <InputLabel htmlFor="amount">Max Weight *</InputLabel>
            <Input
              id="adornment-maxWeight"
              type="number"
              // value={this.state.amount}
              // onChange={this.handleChange('amount')}
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            />
          </FormControl>
        </div>
        <div>
          <Typography
            type="title"
            style={{marginTop: '3%', marginBottom: '3%'}}
          >
            Tariff
          </Typography>
          <TarifTable />
        </div>
      </div>
    );
  }
}

export default CreateForm;
