import React, {Component}                   from 'react';
import ReactDOM                             from 'react-dom';
import moment                               from 'moment';
import TimePicker                           from 'react-times';
import 'react-times/css/material/default.css'
import {Paper}                              from 'material-ui';
import withStyles                           from 'material-ui/styles/withStyles';
import Button                                       from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
}                                            from 'material-ui/Dialog';
// import {styles}                             from '../../css';

const Styles = (theme) => ({
  root: {
    width: 800,
    // height:500,
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
  },
  Timepicker: {
    width: 500,
    height:400,
  },
});

const WAIT_INTERVAL = 1000;

class Addtime extends React.Component {
  constructor(props) {
    super(props);
    const { defaultTime, meridiem, focused, showTimezone, timezone } = props;
    let hour = '';
    let minute = '';
    
    // this.state = {search: '', data: []};
     this.state = {
      hour: moment().format('HH'),
      minute: moment().format('mm'),
      meridiem,
      focused,
      timezone,
      showTimezone,
    };
    this.timer = null;
    this.onFocusChange        = this.onFocusChange.bind(this);
    this.onHourChange         = this.onHourChange.bind(this);
    this.onMeridiemChange     = this.onMeridiemChange.bind(this);
    this.onMinuteChange       = this.onMinuteChange.bind(this);
    this.onTimeChange         = this.onTimeChange.bind(this);
    this.handleFocusedChange  = this.handleFocusedChange.bind(this);
    this.handleSelectTime     = this.handleSelectTime.bind(this);
    // this.handlecancel     = this.handlecancel.bind(this);
  }

  onHourChange(hour) {
    this.setState({ hour });
  }

  onMinuteChange(minute) {
    this.setState({ minute });
  }

  onTimeChange(time) {
    const [hour, minute] = time.split(':');
    this.setState({ hour, minute });
  }

  onMeridiemChange(meridiem) {
    this.setState({ meridiem });
  }

  onFocusChange(focused) {
    this.setState({ focused });
  }

  handleSelectTime() {
    this.props.handleSelectTime(this.state);
  }

  handleFocusedChange() {
    const { focused } = this.state;
    this.setState({ focused: !focused });
  }
  
  handleClose() {
    this.setState({time:null});
    this.props.onCancel();
  };

  componentWillMount() {}


  render() {
    const {openDialog, handleOpenDialog , history, classes} = this.props;
    const {
      hour,
      minute,
      focused,
      meridiem,
      timezone,
      showTimezone,
    } = this.state;

    return (
      <Dialog
        open={openDialog}
        onClose={ this.handleSelectTime }
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Schedule Time
        </DialogTitle>
        <DialogContent>
        <div className={classes.Timepicker}>
        <TimePicker
            {...this.props}
            focused={focused}
            meridiem={meridiem}
            timezone={timezone}
            trigger={this.trigger}
            onFocusChange={this.onFocusChange}
            onHourChange={this.onHourChange}
            onMeridiemChange={this.onMeridiemChange}
            onMinuteChange={this.onMinuteChange}
            onTimeChange={this.onTimeChange}
            showTimezone={showTimezone}
            time= { hour && minute ? `${hour}:${minute}` : null}            
            timeMode="24"
            theme="material"
         />
        </div>
        </DialogContent>
        <DialogActions>
          <Button
            style={{marginRight: 17}}
            variant="raised"
            onClick={ this.handleSelectTime }
            color="primary"
          >
            Schedule
          </Button>
          <Button
            style={{marginRight: 17}}
            variant="raised"
            onClick={ this.handleClose.bind(this) }   
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default withStyles(Styles)(Addtime);