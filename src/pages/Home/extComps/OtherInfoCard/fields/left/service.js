import React, {Component} from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from 'material-ui';
import axios from 'axios';
class ServiceField extends Component {
  constructor() {
    super();
    //<<<<<<< HEAD
    /*this.state = { }
    }
    handleChg = e => {
        this.props.handleChange( e )*/
    //=======
    this.state = {
      serviceData: null,
    };
    this.handleServicesData = this.handleServicesData.bind(this);
  }
  // componentWillReceiveProps(np){
  //
  //     let st = []
  //     if (typeof np.serviceType !== 'undefined') {
  //         if (np.serviceData.includes('REG')) {
  //           document.getElementById('#radio-1').click();
  //         }
  //     }
  // }
  handleServicesData = () => {
    const {almtPenerimaReducer, BASE_API} = this.props;
    const {serviceData} = this.state;
    const originCode = sessionStorage.getItem('originCode');

    if (almtPenerimaReducer.length > 0 && !serviceData) {
      const tarifCode = almtPenerimaReducer.reduce((all, item) => {
        all = item.tariff_code;
        return all;
      }, {});
      axios
        .get(`${BASE_API}service?origin=${originCode}&destination=${tarifCode}`)
        .then((response) => {
          const {data} = response.data;
          this.setState({serviceData: data});
          setTimeout(() => {
            document.getElementById('radio-0').click();
          }, 200);
        });
    } else {
      this.setState({serviceData: null});
    }
  };
  handleChg = (e) => {
    this.props.handleChange(e, this.state.serviceData);

    const {almtPenerimaReducer, BASE_API} = this.props;
    //
    // const tarifCode = almtPenerimaReducer.reduce((all, item) => {
    //         all = item.tariff_code
    //         return all
    //     }, {})
    // axios.get(`${BASE_API}service?origin=BDO10000&destination=${tarifCode}`)
    //         .then(response => {

    //         })
  };
  render() {
    const {classes, text, handleChange, service, readOnly} = this.props;
    let {serviceData} = this.props.privateData;
    return (
      <FormControl className={classes.RBgroup}>
        <FormLabel className={classes.radioLabel}>{text.label}</FormLabel>
        <div style={{display: 'inline-block', marginLeft: '14px'}}>
          {serviceData &&
            serviceData.map((item, index) => {
              return (
                <RadioGroup
                  key={index}
                  aria-label={text.name}
                  name={text.name}
                  onChange={this.handleChg}
                  value={item.service_id}
                  style={{display: 'inline-block'}}
                >
                  <FormControlLabel
                    value={item.service_code}
                    label={item.service_code}
                    id={`radio-${index}`}
                    control={
                      <Radio
                        inputProps={{
                          readOnly: readOnly,
                          disabled: readOnly,
                        }}
                        className={classes.uniqueInputFill}
                        //control={<Radio className={classes.uniqueInputFill}

                        checked={service === item.service_code}
                      />
                    }
                    key={index}
                  />
                </RadioGroup>
              );
            })}
        </div>
        {/*
                    !serviceData && <RadioGroup
                        aria-label={text.name}
                        name={text.name}
                        onChange={handleChange}
                        value={service}
                        style={{ display: 'inline-block', marginLeft: '14px' }}
                    >
                        <FormControlLabel value={serviceType[0]} label={serviceType[0]} control={<Radio className={classes.uniqueInputFill} checked={service === serviceType[0]} />} />
                        <FormControlLabel className={classes.radioSpacing} value={serviceType[1]} label={serviceType[1]} control={<Radio className={classes.uniqueInputFill} checked={service === serviceType[1]} />} />
                        <FormControlLabel className={classes.radioSpacing} value={serviceType[2]} label={serviceType[2]} control={<Radio className={classes.uniqueInputFill} checked={service === serviceType[2]} />} />
                    </RadioGroup>
                */}
      </FormControl>
    );
  }
}

export default ServiceField;
