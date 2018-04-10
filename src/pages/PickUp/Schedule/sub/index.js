import React, {Component}                   from 'react';
import moment                               from 'moment';
import {Link}                               from 'react-router-dom';
import {Paper, TextField, MenuItem,
        Button,Input,InputLabel,
        InputAdornment,withStyles,
        Typography,FormControl,
        Grid,IconButton,Chip,Icon
        }                                   from 'material-ui';
import SearchCustomer                       from './SearchCustomer';
import SearchUsers                          from './SearchUsers';
// import IconButton from 'material-ui/IconButton/IconButton';
import {Search}                             from 'material-ui-icons';
import {styles}                             from '../../../css';
import ConfirmationDialog                   from '../../../../components/confirmationDialog';
import ReactMaterialUiNotifications         from '../../../../components/ReactMaterialUiNotifications';
import {getEntity, postEntity, putEntity}   from '../../../../actions/entity';

import _                                    from 'lodash'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
}                                           from 'react-google-maps';

//Local Components
import Days                                 from '../Components/Days';
import Addtime                              from '../Components/TimePicker';

require('../style.css');
// var jsonData = require('../Data/data.json');

const MapWithAMarker = withScriptjs(
  withGoogleMap((props) => {
    const {lat, lng} = props;
    return (
      <GoogleMap defaultZoom={8} defaultCenter={{lat: lat, lng: lng}}>
        <Marker
          draggable={true}
          onDragEnd={(e) =>
            props.onUpdateMarker(e.latLng.lat(), e.latLng.lng())
          }
          position={{lat: lat, lng: lng}}
        />
      </GoogleMap>
          );
        }),
      );

// export Days

class PickScheduleForm extends Component {
  constructor() {
    super();
    this.state = {
      openCustomerSearchDialog: false,
      openUserSearchDialog: false,
      courierFieldvalue: '',
      status: 'OPEN',
      confirm: false,
      sche_phone: '',
      sche_name: '',
      sche_address: '',
      sche_lat: -34.397,
      sche_lon: 150.644,
      time:[],
      remarks: '',
      username: '',
      sche_courier_employee_id: '',
      ready: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeMarker = (name) => (lat, lng) => { this.setState({sche_lat: lat, sche_lon: lng}); };

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.edit !== true && this.setState({ready: true});
    this.props.edit &&
      getEntity(`pickup_schedule/${id}`, null).then((response) => {
        const {data} = response.data;
        // console.log("data.courier.employee_id",data.courier.employee_id)
        
        this.setState({
          ...data,
          ready: true,
          time: this.formatTime(data.time),
          sche_lat: parseFloat(data.sche_lat),
          sche_lon: parseFloat(data.sche_lon),
          username: data.courier.first_name + ' ' + (data.courier.last_name || ''),
          sche_courier_employee_id: data.courier.employee_id,
        });


        //console.log("time",this.state.time);
        console.log("api_time",data.time);
        console.log("employee_id",data.courier.employee_id);
      });
  }
  
  //API Changes : Requested
  formatTime(responseTimeArr) {

    for(var i=0;i<responseTimeArr.length;i++) {
      if( _.isArray(responseTimeArr[i].schedule_time) ) {
        _.forEach(responseTimeArr[i].schedule_time, function(item, index) {
            let time = responseTimeArr[i].schedule_time.substring(3,8);
            responseTimeArr[i].schedule_time[index] = time;
        });
      } else {
        let time = responseTimeArr[i].schedule_time.substring(3,8);
        responseTimeArr[i].schedule_time = [time];
      }
    }
    return responseTimeArr;
  }

  handleAddSubmit = () => {
    return this.setState({confirm: !this.state.confirm});
  };


  handleAction = (action) => {
    this.setState({confirm: false});
    action === 'yes' && !this.props.edit && this.saveEntity();
    action === 'yes' && this.props.edit && this.updateEntity();
  };

  updateEntity = () => {
    const {id} = this.props.match.params;
    console.log("time",this.state.time)
    putEntity(`pickup_schedule/${id}`, {
      sche_name: this.state.sche_name,
      sche_phone: this.state.sche_phone,
      sche_address: this.state.sche_address,
      sche_remarks: this.state.sche_remarks,
      sche_lat: this.state.sche_lat,
      sche_lon: this.state.sche_lon,      
      sche_courier_employee_id: this.state.sche_courier_employee_id,
      time: this.state.time,
    }).then((response) => this.entitySubmitSuccess());
  };
  saveEntity = () => {
    postEntity('pickup_schedule', {
      sche_name: this.state.sche_name,
      sche_phone: this.state.sche_phone,
      sche_address: this.state.sche_address,
      sche_remarks: this.state.sche_remarks,
      sche_lat: this.state.sche_lat,
      sche_lon: this.state.sche_lon,
      sche_courier_employee_id: this.state.sche_courier_employee_id,
      time: this.state.time,
    }).then((response) => this.entitySubmitSuccess());
  };
  entitySubmitSuccess = () => {
    this.showNotification('pickup_schedule');
    this.props.history.push(`/pickup/schedule`);
  };
  showNotification = (entity) => {
    ReactMaterialUiNotifications.showNotification({
      text: this.props.edit
        ? `Edit ${entity} success`
        : `Add ${entity} success`,
    });
  };
  /**
   * Added By Sameer 01/02/2018
   * To search customer dilogue
   */
  handleCustomerSearchDialog = (key) => {
    return this.setState({
      openCustomerSearchDialog: !this.state.openCustomerSearchDialog,
    });
  };
  handleUserSearchDialog = (key) => {
    return this.setState({
      openUserSearchDialog: !this.state.openUserSearchDialog,
    });
  };

  /** timePicker  **/

  handleSelectTime =(timeArr,day) => {
    
    let currentTime = this.state.time;
        //scheduleTime = time['hour']+':'+time['minute'];
    
    //console.log('Current Day : ',day);
    if(day === '') return;

    let isDayFound = _.find(currentTime, { schedule_day: day })

    if(typeof isDayFound === 'undefined' ) {
      currentTime.push(Object.assign({
        id:this.state.pickup_schedule_id,
        pickup_schedule_id: this.state.pickup_schedule_id,
        schedule_day: day, 
        schedule_time: [timeArr] 
      }));
    } else {
      currentTime.map( (o, i) => {
        if( o.day == day) { 
          currentTime[i].schedule_time = timeArr; 
        }
      })
    }

   this.setState({ time: currentTime  });
  };
  
  getTimeForDay(day) {
    //console.log("day::",day.toUpperCase());
    //console.log("time::",this.state.time)
    let isDayFound = _.find(this.state.time, { schedule_day: day });
    // console.log("currentTime:",isDayFound);
    return (typeof isDayFound === 'undefined')? [] : isDayFound.schedule_time;
  } 

  handleSelect = (data) => {
    this.state.openCustomerSearchDialog && this.setCustomerData(data);
    this.state.openUserSearchDialog && this.setUserData(data);
    return this.setState({
      openCustomerSearchDialog: false,
      openUserSearchDialog: false,
    });
  };
  setCustomerData = (data) => {
    this.setState({
      sche_phone: data.sche_phone,
      sche_name: data.sche_name,
      sche_address: data.sche_address,
    });
  };
  setUserData = (data) => {
    this.setState({
      username: data.courier.first_name + ' ' + (data.courier.last_name || ''),
      sche_courier_employee_id: data.id,
    });
  };

  
  render() {
    const {
      handleAddSubmit,
      handleCustomerSearchDialog,
      handleUserSearchDialog,
      handleSelect,
      handleAction,
    } = this;
    const {classes, edit, history, match} = this.props;
    const {
      ready,
      sche_lat,
      sche_lon,
      sche_phone,
      sche_name,
      sche_address,
      sche_remarks,
      status,
      courier,
      confirm,
      openCustomerSearchDialog,
      openUserSearchDialog,
    } = this.state;

    let weekDays = [
      { day:'SUNDAY',   'label':'Minggu'},
      { day:'MONDAY',   'label':'Senin'},
      { day:'TUESDAY',  'label':'Selasa'},
      { day:'WEDNESDAY','label':'Rabu'},
      { day:'THURSDAY', 'label':'Khamis'},
      { day:'FRIDAY',   'label':'Jumat'},
      { day:'SATURDAY', 'label':'Sabtu'},
    ];

    return (
      <div>
        <div className={classes.headerWrapper}>
          <div className={classes.pageTitle}>
            <div className={classes.breadCrumbs}>
              Pickup /
              <span className={classes.transactionBreadcrumbs}> Schedule /</span>
              <span className={classes.transactionBreadcrumbs}>
                {' '}
                {edit ? `Edit Schedule` : `New Schedule`}
              </span>
            </div>
            <br />
            <p className={classes.titleWrapper}>
              {edit ? `Edit Schedule` : `New Schedule`}
            </p>
          </div>
        </div>
        <div className={classes.root}>
          <Grid xs={12} md={12} item>
            <Paper className={classes.formWrapper}>
              <Typography className={classes.typography} type="headline">{' '} {edit ? `Edit Schedule `+sche_name : `New Request`}</Typography>
              <Grid container>
                <Grid item xs={6} sm={6}>
                  <div>
                    <FormControl className={classes.textField}>
                      <InputLabel htmlFor="name">Name*</InputLabel>
                      <Input
                        id="sche_name"
                        type="text"
                        value={sche_name}
                        onChange={this.handleChange('sche_name')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={this.handleCustomerSearchDialog}
                            >
                           <Search />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <br />
                    <TextField
                      onChange={this.handleChange('sche_phone')}
                      id="sche_phone"
                      label="Phone"
                      value={sche_phone}
                      required
                      className={classes.textField}
                    />
                    <br />
                    <TextField
                      onChange={this.handleChange('sche_address')}
                      id="sche_address"
                      value={sche_address}
                      label="Address"
                      required
                      className={classes.textField}
                    />
                    <br />
                    <TextField
                      onChange={this.handleChange('sche_remarks')}
                      id="sche_remarks"
                      value={sche_remarks}
                      label="Remarks"
                      required
                      className={classes.textField}
                    />
                    <br />
                    <TextField
                      onChange={this.handleChange('courier')}
                      id="courier"
                      value={this.state.username}
                      label="Courier"
                      required
                      className={classes.textField}
                    />
                    <br/>

                  </div>
                </Grid>
                <Grid item xs={6} sm={6}>
                  {ready && (
                    <MapWithAMarker
                      onUpdateMarker={this.handleChangeMarker('marker')}
                      lat={sche_lat}
                      lng={sche_lon}
                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCo6jr7MpgztNao-k74aTZcrOIIASChoqA&v=3.exp&libraries=geometry,drawing,places"
                      loadingElement={<div style={{height: `100%`}} />}
                      containerElement={<div style={{height: `425px`}} />}
                      mapElement={<div style={{height: `100%`}} />}
                    />
                  )}
                </Grid>
              </Grid>
              <br/>
              <p style={{fontWeight: 'bold'}}> {'Set Schedule:'}</p>
              <br/>
              <div className={classes.root}>
                <Grid  container spacing={24}>
                  { 
                    _.map(weekDays,(x) => x.day).map( (o,i) => {
                      return(
                          <Grid className='sevencolumns' key={o} item xs={2} md={2}>
                            <Days 
                              key={o} id={o}
                              label={ weekDays[i].label }
                              className={this.props.classes}
                              handleSelectTime={ (time,day) => this.handleSelectTime(time,day) }
                              setTime={ this.getTimeForDay.bind(this) }
                            />
                          </Grid>
                      );
                    })
                  }
                </Grid>  
              </div>
              <div>
                <div>
                <p style={{fontWeight: 'bold'}}> {'Schedule Time:'}</p>
                <br/>
                { this.state.time.map( (o,i)=> {
                      let day = _.find(weekDays,{ day: o.schedule_day })
                      if(o.schedule_time.length > 0 )
                        return <div key={i}>{ day.label } | {o.schedule_time.join(',')}</div>
                  })   
                }
                </div>
                <div style={{ marginLeft: '83%', marginTop: '2%' }}>
                  <Button
                    style={{marginRight: 12}}
                    onClick={() => history.goBack()}
                    component={Link}
                    to={`${match.url}`}
                  >
                    Cancel
                  </Button>
                  <Button  
                  variant="raised"
                  color="primary" 
                  onClick={handleAddSubmit}>
                    {edit ? `EDIT` : `ADD`}
                  </Button>
                </div>
              </div>
              
              {openCustomerSearchDialog && (
                <SearchCustomer
                  handleSelect={handleSelect}
                  openDialog={openCustomerSearchDialog}
                  handleOpenDialog={handleCustomerSearchDialog}
                />
              )}
              {openUserSearchDialog && (
                <SearchUsers
                  handleSelect={handleSelect}
                  openDialog={openUserSearchDialog}
                  handleOpenDialog={handleUserSearchDialog}
                />
              )}

              <ConfirmationDialog
                yeslabel={edit ? 'EDIT' : 'ADD'}
                title={edit ? `Edit pickup Schedule` : `New pickup Schedule`}
                description={
                  edit
                    ? `Are you sure you want to save this pickup?`
                    : `Are you sure you want to add this pickup?`
                }
                open={confirm}
                handleAction={handleAction}
              />
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PickScheduleForm);