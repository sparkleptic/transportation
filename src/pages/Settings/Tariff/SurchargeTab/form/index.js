import React, {Component} from 'react';
import {Paper, TextField, MenuItem, Button} from 'material-ui';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';
import ConfirmationDialog from './extComps/confirmationDialog';

const styles = (theme) => ({
  divRoot: {
    bottom: 25,
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 25,
  }),
  nameTextField: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  formulaField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  statusField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
    float: 'right',
  },
  dateFrom: {
    marginLeft: `${theme.spacing.unit + 11}%`,
  },
  dateTo: {
    marginLeft: '8.4%',
  },
  conditionFrom: {
    marginTop: theme.spacing.unit,
    marginLeft: '18.2%',
    width: 500,
  },
  menu: {
    top: 50,
    width: 200,
  },
});

class SurchargeTabForm extends Component {
  constructor() {
    super();
    this.state = {
      statusFieldValue: '',
      dialogCout: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
  }
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  conditionFieldData = ['From Country', 'From Province', 'From District'];
  conditionFromFieldData = ['Jawa Barat', 'Jawa Timur', 'Jawa Tengah'];

  handleAddSubmit = () => {
    return this.setState({dialogCout: !this.state.dialogCout});
  };
  render() {
    const {handleAddSubmit} = this;
    const {classes} = this.props;
    const {statusFieldValue, dialogCout} = this.state;
    const statusData = ['Active', 'Pending'];
    return (
      <div className={classes.divRoot}>
        <Paper className={classes.root}>
          <Typography type="headline">New Surcharge</Typography>
          <TextField label="Name" required className={classes.nameTextField} />
          <TextField
            id="status-field"
            select
            label="Status"
            required
            className={classes.statusField}
            value={statusFieldValue}
            onChange={this.handleChange('statusFieldValue')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select one of the options"
            margin="normal"
          >
            {statusData.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Typography
            type="title"
            style={{marginTop: '3%', marginBottom: '3%'}}
          >
            Formula
          </Typography>
          <TextField label="Formula" className={classes.formulaField} />
          <ConfirmationDialog
            dialogCout={dialogCout}
            handleAddSubmit={handleAddSubmit}
          />
          <div style={{marginLeft: '83%', marginTop: '2%'}}>
            <Button style={{marginRight: 12}}>Cancel</Button>
            <Button variant="raised" color="primary" onClick={handleAddSubmit}>
              Add
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(SurchargeTabForm);
