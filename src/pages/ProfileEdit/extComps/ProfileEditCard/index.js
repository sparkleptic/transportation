import React, {Component} from 'react';
import {Paper, Typography, withStyles, Button} from 'material-ui';
import {GridList, TextField, GridListTile} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import {Person} from 'material-ui-icons';
import {reduxForm, Field, reset} from 'redux-form';
import {getEntityList} from '../../../../actions/entity';
import moment from 'moment';
import fetchJSON from '../../../../helpers/fetchJSON';
import axios from 'axios';

// fields
import NameProfile from './fields/nameProfile';
import EmailProfile from './fields/emailProfile';
import PhoneProfile from './fields/phoneProfile';
import DobProfile from './fields/dobProfile';



const Styles = (theme) => ({
  paper: {
    height: 400,
    width: '100%',
    padding: 10,
    // marginRight: 24
  },
  icon: {
    position: 'absolute',
    right: 7,
    top: 37,
    width: 24,
    height: 24,
    color: 'rgba(149, 152, 154, 0.46)',
    cursor: 'pointer',
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3 - 2,
    width: 350,
  },
  title: {
    fontWeight: 'bold',
    color: '#424242',
    letterSpacing: 0.7,
    padding: '23px 0px 0px 24px',
  },
  alamatTextField: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3,
    width: 350,
  },
  inputLabelFocused: {
    color: 'rgb(50, 57, 144)',
  },
  inputInkbarFocused: {
    '&:after': {
      backgroundColor: 'rgb(50, 57, 144)',
    },
  },
  searchbutton: {
    float: 'right',
  },
  subButton: {
    // backgroundColor: 'white',
    float: 'right',

    // opacity: 0,
    color: 'black',
  },
  dateField: {
    marginLeft: "25px",
    width: "350px",
    marginTop: "20px",
  },
});

let source = null;
class ProfileEditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSearchDialog: false,
      dataProfile: [],
      nameProfile: {
        name: 'nameProfile',
        label: 'Name',
        value: '',
      },
      emailProfile: {
        name: 'emailProfile',
        label: 'Email',
        value: '',
      },
      phoneProfile: {
        name: 'phoneProfile',
        label: 'Phone Number',
        value: '',
      },
      dobProfile: {
        name: 'dobProfile',
        label: 'Date of Birth',
        value: moment().format('YYYY-MM-DDTHH:mm'),
        type: 'datetime-local',
      },
      req_date: moment().format('YYYY-MM-DDTHH:mm'),
      request: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
  }
  fireOriginAction(key, value) {
    let{setInputOrigin} = this.props;
    return new Promise((resolve, reject) =>
      resolve(setInputOrigin(key, value)),
    );
  }
  handleRowClick = (e) => {
    let self = this;
    let {user_id, user_name, user_phone, user_email, user_dob} = e.value;
    self.fireOriginAction('user_id', user_id);
    self.fireOriginAction('nameProfile', user_name);
    self.fireOriginAction('phoneProfile', user_phone);
    self.fireOriginAction('emailProfile', user_email);
    self.fireOriginAction('dobProfile', user_dob);
    self.setState({openSearchDialog: !self.state.openSearchDialog});
    return new Promise((resolve, reject) =>
      resolve(setFocusToNextInput('nameProfile')),
    );
  };

  handleChange(e) {
    let value = e.target.value;
    if (e.target.name === 'nameProfile') {
      return new Promise((resolve, reject) => {
        resolve(this.fireOriginAction(e.target.name, value));
      });
    }
    if (e.target.name === 'emailProfile') {
      return new Promise((resolve, reject) => {
        resolve(this.fireOriginAction(e.target.name, value));
      });
    }
    if (e.target.name === 'phoneProfile') {
      return new Promise((resolve, reject) => {
        resolve(this.fireOriginAction(e.target.name, value));
      });
    }
    if (e.target.name === 'dobProfile') {
      console.log('dateValueInput:', value)
      return new Promise((resolve, reject) => {
        resolve(this.fireOriginAction(e.target.name, value));
      });
    }
    // return false;
  }
  handleChangeText = (e) => {
    const self = this;
    if (source != null) {
      source.cancel('Operation canceled by the user.');
    }
    var CancelToken = axios.CancelToken;
    source = CancelToken.source();
    if (e.target.value === '') {
      this.loadDataProfile();
    }
    getEntityList('customer', {s: `${e.target.value}`}, source.token).then((response) => {
      source = null;
      self.setState({
        dataProfile: response.data.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  };
  loadDataProfile = () => {
    const self = this;
    getEntityList('customer').then((response) => {
      source = null;
      self.setState({
        dataProfile: response.data.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  };
  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
    const self = this;
    if (sessionStorage.getItem('userData') !== null) {
      const session = JSON.parse(sessionStorage.getItem('userData'));
      const userId = session.data.user_id;
      fetchJSON
        .get(`/users/${userId}`)
        .then((response) => {
          // console.log('user 22', response);

          function formatPhoneNumber(s) {
            if(s.length > 10){
              var s2 = (""+s).replace(/\D/g, '');
              var m = s2.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
              return (!m) ? null : "+" + m[1] + " (" + m[2] + ") " + m[3] + "-" + m[4];
            } else {
              var s2 = (""+s).replace(/\D/g, '');
              var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
              return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
            }
          }

          self.setState({
            nameProfile: {
              value: response.data.data.name,
              name: 'nameProfile',
              label: 'Name',

            },
            emailProfile: {
              value: response.data.data.email,
              name: 'emailProfile',
              label: 'Email',
            },
            phoneProfile: {
              value: formatPhoneNumber(response.data.data.phone),
              name: 'phoneProfile',
              label: 'Phone Number',
            },
            dobProfile: {
              value: self.state.req_date,
              name: 'dobProfile',
              label: 'Date of Birth',
              type: 'datetime-local',
            },

          });

          const node = response.data.data;
          sessionStorage.setItem(
            'userNode',
            JSON.stringify(response.data.data),
          );
          sessionStorage.setItem(
            'userNodeId',
            response.data.data.node[0].node.node_id,
          );
          node.node.map((item, index) => {
            self.handleCallNode(item.node.node_id, index);
          });
          //self.handleCallNode(response.data.data.node[0].node.node_id)
        })
        .catch((error) => {
          console.log('>>>', error);
        });
    }
  }
  _handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 112:
        this.handleOpenDialog();
        event.preventDefault();
        break;
      case 27:
      case 113:
        return this.setState({openSearchDialog: false});
      default:
        break;
    }
  }
  handleOpenDialog = () => {
    // Make a request for a user with a given ID
    this.loadDataProfile();
    return this.setState({openSearchDialog: !this.state.openSearchDialog});
  };
  handleChangeUpdate = (name, value) => {
    let textField, field;
    textField = this.state[name];
    if (textField) {
      textField.value = value || '';
      return {[field]: textField};
    }
    return false;
  };
  componentWillReceiveProps = (nextprops) => {
    // console.log("nextprops: =", this.props);
    let fields = {};
    Object.keys(nextprops.privateData).map((a) => {
      const data = this.handleChangeUpdate(a, nextprops.privateData[a]);
      // console.log("data nextprops: =", data);
      return data && Object.assign(fields, data);
    });
    // console.log("fields      ", fields );
    this.setState({...fields});
  };

  render() {
    // console.log('originprops', this.props)
    const {
      handleOpenDialog,
      handleChange,
      resetAllForm,
      handleChangeText,
      handleRowClick,
    } = this;
    const {
      openSearchDialog,
      dataProfile,
      nameProfile,
      emailProfile,
      phoneProfile,
      dobProfile,
    } = this.state;
    const {classes} = this.props;
    console.log('originProps', this.props)
    return (
      <Paper className={classes.paper}>
        <GridList cols={2} cellHeight="auto">
          <GridListTile cols={1}>
            <Typography type="headline" className={classes.title}>
              Edit Your Profile
            </Typography>
          </GridListTile>
          {/* <GridListTile cols={1}>
            <IconButton tabIndex={'-1'} className={classes.searchbutton} onClick={this.handleOpenDialog}>
              <Person />
            </IconButton>
          </GridListTile> */}
        </GridList>
        <Field
          name="nameProfile"
          component={NameProfile}
          handleChange={handleChange}
          {...this.props}
          item={nameProfile}
          key={1}
          handleRowClick={handleRowClick}
          handleOpenDialog={handleOpenDialog}
          openSearchDialog={openSearchDialog}
          dataProfile={dataProfile}
          handleChangeText={handleChangeText}
        />
        <Field
          name="emailProfile"
          component={EmailProfile}
          handleChange={handleChange}
          {...this.props}
          item={emailProfile}
          key={2}
          handleRowClick={handleRowClick}
          handleOpenDialog={handleOpenDialog}
          openSearchDialog={openSearchDialog}
          dataProfile={dataProfile}
          handleChangeText={handleChangeText}
        />
        <Field
          name="phoneProfile"
          component={PhoneProfile}
          handleChange={handleChange}
          {...this.props}
          item={phoneProfile}
          key={3}
          handleRowClick={handleRowClick}
          handleOpenDialog={handleOpenDialog}
          openSearchDialog={openSearchDialog}
          dataProfile={dataProfile}
          handleChangeText={handleChangeText}
        />
        <Field
          name="dobProfile"
          component={DobProfile}
          handleChange={handleChange}
          {...this.props}
          item={dobProfile}
          key={4}
          handleRowClick={handleRowClick}
          handleOpenDialog={handleOpenDialog}
          openSearchDialog={openSearchDialog}
          dataProfile={dataProfile}
          handleChangeText={handleChangeText}
        />
        {/* <TextField
          id="datetime-local"
          label="Date of Birth"
          type="datetime-local"
          className={classes.dateField}
          InputLabelProps={{
            shrink: true,
          }}
          // onChange={this.handleChange('req_date')}
        /> */}
        <br/>
        <Button
          variant="raised"
          color="primary"
          className={classes.searchbutton}
          // onClick={() => this.handleModal('openSummaryDialog')}
        >
          Save
        </Button>
        <Button
          variant="raised"
          // color="primary"
          className={classes.subButton}
          // onClick={() => this.handleModal('openSummaryDialog')}

        >
          Cancel
        </Button>
      </Paper>
    );
  }
}
export default withStyles(Styles)(
  reduxForm({
    form: 'ProfileEditCard',
  })(ProfileEditCard),
);
