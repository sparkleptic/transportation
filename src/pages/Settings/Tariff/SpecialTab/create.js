import React, {Component} from 'react';
import moment from 'moment';
import Grid from 'material-ui/Grid';
import {TextField, MenuItem, Button} from 'material-ui';
import {getEntity} from '../../../../actions/entity';
import Typography from 'material-ui/Typography/Typography';
import { getAppliedTariffAndValue, appliedTariffData, getConditionData } from '../utils';
import ReferenceDropDown from '../../../../components/refrencedropdown';

class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      special_tariff_name: '',
      effective_date_from: moment().format('YYYY-MM-DDTHH:mm'),
      effective_date_to: moment().format('YYYY-MM-DDTHH:mm'),
      settingsData: [],
      inited: false,
      tariffValue: 0,
      appliedTariff: '',
      status:"Inactive"
    };
  }
  componentWillReceiveProps = (nextProps) => {

    if (this.props.edit && !this.state.inited && nextProps.existingTariff) {
      this.setState({
        inited: true,
        ...nextProps.existingTariff,
        effective_date_from: moment(nextProps.existingTariff.effective_date_from).format('YYYY-MM-DDTHH:mm'),
        effective_date_to: moment(nextProps.existingTariff.effective_date_to).format('YYYY-MM-DDTHH:mm'),
        ...getAppliedTariffAndValue(nextProps.existingTariff.formula)
      })

      if(nextProps.existingTariff.condition) {

        const conditions = nextProps.existingTariff.condition;

        // fetch all tariff condition before anything

        if(conditions.length) {

          console.log(conditions, this.state.conditionsFromApi)

          // getConditionData(conditions)
          //   .then(
          //     settingsData => {
          //       this.setState({
          //         settingsData
          //       })
          //       this.normaliseData({...this.state, settingsData})
          //       console.log(settingsData)
          //     }
          //   )

          // getEntity('special_tariff_condition').then(response => {
          //   this.setState({
          //     conditionsFromApi: response.data
          //   }, () => {

          //     let conditionsFromApi = response.data
              
          //     let conditionPromiseArr = conditions.map(
          //       condition => {
          //         const selectedCondition = conditionsFromApi.find(
          //           conditionWithData => conditionWithData.value == condition.condition
          //         )
          //         return resolveConditionOptions(selectedCondition)
          //       }
          //     )
  
          //     Promise.all(conditionPromiseArr)
          //     .then(resolvedConditions => {
  
          //       const settingsData = [...resolvedConditions.map(
          //         (condition, index) => ({
          //           ...condition,
          //           selected: conditions[index].condition,
          //           selectedValue: isNaN(conditions[index].value_condition) ? 
          //             conditions[index].value_condition :
          //             parseInt(conditions[index].value_condition)
          //         })
          //       )]
  
          //       this.setState({
          //         settingsData
          //       })
  
          //       this.normaliseData({...this.state, settingsData})
          //     })
          //   })
          // })
        }
        
      }
      
    }

    // this.props.edit &&
    //   !this.state.inited &&
    //   this.setState(
    //     {
    //       inited: true,
    //       ...nextProps.formdata,
    //       effective_date_from: moment(
    //         nextProps.formdata.effective_date_from,
    //       ).format('YYYY-MM-DD'),
    //       effective_date_to: moment(
    //         nextProps.formdata.effective_date_to,
    //       ).format('YYYY-MM-DD'),
    //     },
    //     () => {},
    //   );
  };
  componentDidMount() {

    getEntity('special_tariff_condition').then(response => this.setState({
      conditionsFromApi: response.data.data
    }))

    getEntity('provinces', null).then((response) => {
      const {data} = response.data;
      this.setState({
        provinceData: data,
      });
    });
  }

  handleTariffChange = (event) => {

    this.setState({
      appliedTariff: event.target.value
    })

    this.normaliseData({...this.state, appliedTariff: event.target.value})
  }

  handleTariffValueChange = (event) => {
    this.setState({
      tariffValue: event.target.value
    })

    this.normaliseData({...this.state, ...{
      tariffValue: event.target.value
    }})
  }

  normaliseData (data) {
    
    let normalisedData = {};

    normalisedData['name'] = data['special_tariff_name'];
    normalisedData['dateTo'] = data['effective_date_to'];
    normalisedData['dateFrom'] = data['effective_date_from'];

    const {
      settingsData,
      appliedTariff,
      tariffValue,
      formula,
      status
    } = data;

    const settings = settingsData.map(setting => ({
      condition: setting.selected,
      value: setting.selectedValue
    }))

    normalisedData['settings'] = settings;
    normalisedData['appliedTariff'] = appliedTariff
    normalisedData['value'] = tariffValue

    normalisedData = {
      ...normalisedData,
      status
    }

    this.props.onUpdateFullForm(normalisedData);

  }

  handleChange = (name) => (event) => {
    const {value} = event.target;
    this.setState({[name]: value});

    this.normaliseData({...this.state, ...{[name]: value}})

    // this.props.onUpdateForm(name, value);
  };

  getSettingCondition = () => {
    const conditionData = [...this.state.conditionsFromApi];
    return {data: conditionData, selected: 0};
  };

  createNewSetting = () => {
    let settingsData = this.state.settingsData;
    settingsData = settingsData.concat([this.getSettingCondition()]);
    this.setState({settingsData});
    this.normaliseData({...this.state, settingsData})
  };

  handleChangeSubCondition = (id, value) => {
    let settingsData = this.state.settingsData;
    settingsData[id].selectedValue = value;

    this.setState({settingsData});

    this.normaliseData({...this.state, settingsData})
  }

  handleChangeCondition = (id, value) => {
    let settingsData = this.state.settingsData;
    settingsData[id].selected = value;

    const selectedCondition = this.state.conditionsFromApi.find(condition => condition.special_tariff_condition_id == value)

    if(selectedCondition) {
      if(selectedCondition.url) {
        settingsData[id].url = selectedCondition.url;
        settingsData[id].selectedValue = 0;
      } else {
        settingsData[id].url = undefined;
        settingsData[id].selectedValue = undefined;
      }
  
      settingsData[id].text = selectedCondition.text;
      settingsData[id].value = selectedCondition.value;
      this.setState({settingsData});
      this.normaliseData({...this.state, settingsData})
    }

  };

  render() {
    const {classes, viewOnly} = this.props;
    const {handleChange, handleChangeCondition, createNewSetting} = this;
    const {
      special_tariff_name,
      effective_date_from,
      effective_date_to,
      settingsData,
      appliedTariff,
      tariffValue
    } = this.state;

    const tariffValueTitle = appliedTariffData.find(tariff => tariff.value == appliedTariff) || {};

    return (
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Grid container>
            <Grid item xs={6} sm={6}>
              <TextField
              disabled={viewOnly}
              value={special_tariff_name}
              label="Description"
              required
              className={classes.textField}
              onChange={handleChange('special_tariff_name')}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Grid container>
                <Grid item xs={6} sm={6}>
                  <TextField
                      id="datetime-local"
                      label="Date from"
                      type="datetime-local"
                      className={classes.textField}
                      disabled={viewOnly}
                      InputLabelProps={{
                      shrink: true,
                    }}
                      value={effective_date_from}
                      onChange={this.handleChange('effective_date_from')}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="datetime-local"
                    label="Date to"
                    type="datetime-local"
                    className={classes.textField}
                    disabled={viewOnly}
                    InputLabelProps={{
                    shrink: true,
                  }}
                    value={effective_date_to}
                    onChange={this.handleChange('effective_date_to')}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div>
            <Typography
              type="title"
              style={{marginTop: '3%', marginBottom: '3%'}}
            >
              Setting
            </Typography>
          </div>
          <Grid container>
            {settingsData &&
              settingsData.map((condition, index) => {
                const {
                  optionsList,
                  url
                } = condition;

                return (
                  <Grid item xs={12} sm={12} key={index}>
                    <Grid container>
                      <Grid item xs={6} sm={6}>
                        <div>
                          <ReferenceDropDown
                            className={classes.textField}
                            value={condition.selected}
                            remoteCall={getEntity}
                            entity={'special_tariff_condition'}
                            valueKey={'special_tariff_condition_id'}
                            labelKey={'condition_name'}
                            searchkey={'s'}
                            placeholder={'Condition'}
                            onUpdate={(value) => this.handleChangeCondition(index, value)}
                            disabled={viewOnly}
                            labelstyle={{}}
                            required
                            selectOptions={
                              {
                                onBlurResetsInput: true
                              }
                            }
                          />
                          {/* <TextField
                            disabled={viewOnly}
                            select
                            required
                            value={condition.selected}
                            className={classes.textField}
                            id="condition{index}"
                            label="Condition"
                            onChange={(event) => this.handleChangeCondition(index, event)}
                          >
                            {this.state.conditionsFromApi.map((option, index) => (
                              <MenuItem key={index} value={option.value}>
                                {option.text}
                              </MenuItem>
                            ))}
                          </TextField> */}
                        </div>
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        { condition.selected  ?
                            url ?
                            <ReferenceDropDown
                              className={classes.textField}
                              value={condition.selectedValue}
                              remoteCall={getEntity}
                              entity={url}
                              valueKey={condition.value}
                              labelKey={condition.text}
                              searchkey={'s'}
                              placeholder={condition.text}
                              onUpdate={(value) => this.handleChangeSubCondition(index, value)}
                              disabled={viewOnly}
                              labelstyle={{}}
                              required
                              selectOptions={
                                {
                                  onBlurResetsInput: true
                                }
                              }
                            />
                            // <TextField
                            //   select
                            //   disabled={viewOnly}
                            //   required
                            //   value={condition.selectedValue}
                            //   className={classes.textField}
                            //   id="condition{index}"
                            //   label={condition.text}
                            //   onChange={(event) => this.handleChangeSubCondition(index, event)}
                            // >
                            //   {optionsList.map((option, index) => (
                            //     <MenuItem key={index} value={option[api.dropdown_text]}>
                            //       {option[api.dropdown_value]}
                            //     </MenuItem>
                            //   ))}
                            // </TextField>
                           :
                          <TextField
                            disabled={viewOnly}
                            className={classes.textField}
                            value={condition.selectedValue}
                            label={condition.text}
                            onChange={(event) => this.handleChangeSubCondition(index, event.target.value)}
                          ></TextField>
                        : null}
                      </Grid>
                    </Grid>
                  </Grid> 
                )
              }
            )}
          </Grid>
          <Button disabled={viewOnly} onClick={createNewSetting}>+&nbsp;&nbsp;ADD SETTING</Button>
          <div>
            <Typography
              type="title"
              style={{marginTop: '3%', marginBottom: '3%'}}
            >
              Applied Tariff
            </Typography>
          </div>
          <Grid container>
            <Grid item xs={6} sm={6}>
              <TextField
                disabled={viewOnly}
                select
                required
                value={appliedTariff}
                className={classes.textField}
                id="appliedTariff"
                label="Applied Tariff"
                onChange={this.handleTariffChange}
              >
                {appliedTariffData.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              { appliedTariff ? <div>
                <TextField
                  disabled={viewOnly}
                  className={classes.textField}
                  value={tariffValue}
                  onChange={this.handleTariffValueChange}
                  label={tariffValueTitle.tariff && tariffValueTitle.tariff.label}
                ></TextField>
              </div> : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default CreateForm;
