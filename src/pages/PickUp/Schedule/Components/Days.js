import React      from  'react';
import {Button}   from  'material-ui';
import PropTypes  from  'prop-types';
import _          from  'lodash';

import TimeChip   from  './TimeChip';
import Addtime    from  '../Components/TimePicker';



class Days extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      time: this.props.setTime,
      currentDay: this.props.id,
      openAddtimeDialog: false
    };
  }

  componentWillReceiveProps() {
    let initialTime = this.getTime(); //Will set the initial timings. 
    this.setState({ time: initialTime })
  }

  componentWillMount() {
    let initialTime = this.getTime(); //Will set the initial timings. 
    this.setState({ time: initialTime })
  }

  // shouldComponentUpdate(nextProps) {
  //   //return (nextProps.day === this.props.day)? false: true;
  // }

  showDialog() {
    this.setState({ openAddtimeDialog: true })
  }

  closeDialog() {
    this.setState({ openAddtimeDialog: false })
  }

  getTime() {
    return this.props.setTime(this.props.id);
  }

  handleSelectTime =(time) => {
    //console.log('Days Handle Select called');
    
    let timeArr = this.state.time,
        scheduleTime = time['hour']+':'+time['minute'];

    //Push Time in array
    let isTimeExist = _.indexOf(timeArr, scheduleTime);
    
    if(isTimeExist === -1) {
      timeArr.push(scheduleTime);
      
      //Pass time array to parent
      this.props.handleSelectTime(timeArr,this.props.id);

      this.setState({ openAddtimeDialog: false, time: timeArr });
    } else {
      this.setState({ openAddtimeDialog: false });
    }
      
  };
  

  handleChipDelete(data) {
    //console.log("data",data);

    var timeArr = this.state.time;
    //console.log("timeArr",timeArr);

    let deleteIndex = _.indexOf(timeArr, data)
    
    if(deleteIndex !== -1 ) {
      timeArr.splice(deleteIndex, 1)

      //Call Parent to update state
      this.props.handleSelectTime(timeArr,this.props.id);

      this.setState({timeArr:timeArr});
    }

  }

  render(){

    let weekDays = [
      { day:'SUNDAY',   'label':'Minggu'},
      { day:'MONDAY',   'label':'Senin'},
      { day:'TUESDAY',  'label':'Selasa'},
      { day:'WEDNESDAY','label':'Rabu'},
      { day:'THURSDAY', 'label':'Khamis'},
      { day:'FRIDAY',   'label':'Jumat'},
      { day:'SATURDAY', 'label':'Sabtu'},
    ];

    const day = _.find(weekDays, { day: this.props.id });

    const classes = this.props.className;
    //console.log('My time',this.state.time);
    let showChips =  this.state.time.map( (value, index) => 
         <TimeChip 
            key={this.props.id+'_'+index} 
            day={this.props.id} 
            uniq={this.props.id+'_'+index}
            id={index}
            value={value} 
            onDelete={ this.handleChipDelete.bind(this) } />
    )
    return(
      <div>
        { day.label }
        <br/>
        { showChips }
        <br/>
        <Button onClick={ this.showDialog.bind(this) } className={ classes.button + ' addtime_btn' }>+Add Time</Button>
        <Addtime 
          handleSelectTime={ this.handleSelectTime } 
          openDialog={ this.state.openAddtimeDialog }
          onCancel={ this.closeDialog.bind(this,this.props.time) } />
      </div>
    )
  }
}

Days.propTypes = {
  time: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired
}

export default Days;