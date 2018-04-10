import React, {Component} from 'react';
import {Paper, Typography, withStyles} from 'material-ui';
import {View, Text, StyleSheet} from 'react-native';
import {GridList, GridListTile} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import {Person} from 'material-ui-icons';
import {reduxForm, Field, reset} from 'redux-form';
import NamaPengirim from './fields/namaPengirim';
import AlmtField from './fields/almt';
import TlpDanKodepos from './fields/t&k';
import kodepos from './fields/kodepos';
import axios from 'axios';
import {getEntityList} from '../../../../actions/entity';
import Avatar from 'material-ui/Avatar';
import fetchJSON from '../../../../helpers/fetchJSON';
import getInitialName from '../../../../helpers/getInitialName';
import themeColors from '../../../../constants/colors';

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: themeColors.red,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  avatarText: {
    color: 'white',
  },
  avatar: {
    width: 100,
    height: 100,
    margin: "auto auto",
  },
});
const Styles = (theme) => ({

  paper: {
    height: 'auto',
    width: 550,
    // marginRight: 24
    paddingBottom:40,
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
  h1: {
    fontWeight: 'bold',
    color: '#424242',
    letterSpacing: 0.7,
    padding: '23px 0px 0px 24px',
    fontSize: 24,
  },
  genName: {
    fontWeight: 'bold',
    color: '#424242',
    letterSpacing: 0.7,
    padding: '23px 0px 0px 24px',
    fontSize: 24,
  },
  genAvatar:{
    width: '70%',
    height: 'auto',
    margin: "auto auto",
    marginTop: 20,
  },
  chgAvatar: {
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#424242',
    letterSpacing: 0.7,
    padding: '23px 0px 0px 24px',
  },
  title1: {
    fontWeight: 'bold',
    color: '#424242',
    letterSpacing: 0.7,
    padding: '20px 0px 0px 0px',
  },
  genRole: {
    fontWeight: 100,
    color: '#424242',
    letterSpacing: 0.7,
    padding: '0px 0px 0px 24px',
    fontSize: 16,
    marginTop: 0,
  },
  genEmailLabel: {
    fontWeight: 100,
    color: '#424242',
    letterSpacing: 0.7,
    padding: '10px 0px 0px 24px',
    fontSize: 14,
    marginTop: 0,
  },
  genEmailField: {
    fontWeight: 100,
    color: '#424242',
    letterSpacing: 0.7,
    padding: '0px 0px 0px 24px',
    fontSize: 16,
    marginTop: 0,
  },

  genPhoneLabel: {
    fontWeight: 100,
    color: '#424242',
    letterSpacing: 0.7,
    padding: '10px 0px 0px 24px',
    fontSize: 14,
    marginTop: 0,
  },
  genPhoneField: {
    fontWeight: 100,
    color: '#424242',
    letterSpacing: 0.7,
    padding: '0px 0px 0px 24px',
    fontSize: 16,
    marginTop: 0,
  },
  genDOBLabel: {
    fontWeight: 100,
    color: '#424242',
    letterSpacing: 0.7,
    padding: '10px 0px 0px 24px',
    fontSize: 14,
    marginTop: 0,
  },
  genDOBField: {
    fontWeight: 100,
    color: '#424242',
    letterSpacing: 0.7,
    padding: '0px 0px 0px 24px',
    fontSize: 16,
    marginTop: 0,
  },
  genLink: {
    textDecoration: 'none',
  },
  genlinkprofile: {
    textDecoration: 'none',
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
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
});

let source = null;
class OriginCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSearchDialog: false,
      dataPengirim: [],
      namaPengirim: {
        name: 'namaPengirim',
        label: 'Nama Pengirim *',
        value: '',
      },
      kodePos: {
        name: 'kodePos',
        label: 'Kode Pos *',
        value: '',
      },
      almtPengirim: {
        name: 'almtPengirim',
        label: 'Alamat Pengirim *',
        value: '',
      },
      tlpPengirim: {
        name: 'tlpPengirim',
        label: 'Telepon Pengirim *',
        value: '',
      },
      request: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
  }
  fireOriginAction(key, value) {
    const {setInputOrigin} = this.props;
    return new Promise((resolve, reject) =>
      resolve(setInputOrigin(key, value)),
    );
  }
  handleRowClick = (e) => {
    const self = this;
    const {customer_id, customer_name, cust_phone, address, zip_code, customer_code} = e.value;
    self.fireOriginAction('customer_id', customer_id);
    self.fireOriginAction('namaPengirim', customer_name);
    self.fireOriginAction('tlpPengirim', cust_phone);
    self.fireOriginAction('almtPengirim', address);
    self.fireOriginAction('customer_code', customer_code);
    self.fireOriginAction('kodePos', zip_code);
    self.setState({openSearchDialog: !self.state.openSearchDialog});
  };

  handleChange(e) {
    let value = e.target.value;
    if (e.target.name === 'tlpPengirim') {
      value = value.replace(/[^0-9]/, '');
    }
    if (e.target.name === 'almtPengirim') {
      let matches = value.match(/\b\d{5}\b/g);
      matches && new Promise((resolve, reject) => {
        resolve(this.fireOriginAction('kodePos', matches[0]));
      });
    }
    if (e.target.name !== 'kodePos') {
      return new Promise((resolve, reject) => {
        resolve(this.fireOriginAction(e.target.name, value));
      });
    }
    return false;
  }
  handleChangeText = (e) => {
    const self = this;
    if (source != null) {
      source.cancel('Operation canceled by the user.');
    }
    var CancelToken = axios.CancelToken;
    source = CancelToken.source();
    if (e.target.value === '') {
      this.loadDataPengirim();
    }
    getEntityList('customer', {s: `${e.target.value}`}, source.token).then((response) => {
      source = null;
      self.setState({
        dataPengirim: response.data.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  };
  loadDataPengirim = () => {
    const self = this;
    getEntityList('customer').then((response) => {
      source = null;
      self.setState({
        dataPengirim: response.data.data,
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
          console.log('user 22', response);



          var phonecheck = response.data.data.phone

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
            namaPengirim: {
              value: response.data.data.name,
            },
            tlpPengirim: {
              value: response.data.data.email,
            },
            kodePos: {
              value: formatPhoneNumber(phonecheck),
            },
            // tlpPengirim2: {
            //   value: '01/01/1992',
            // },

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
    this.loadDataPengirim();
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
    let fields = {};
    Object.keys(nextprops.privateData).map((a) => {
      const data = this.handleChangeUpdate(a, nextprops.privateData[a]);
      return data && Object.assign(fields, data);
    });
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
      dataPengirim,
      namaPengirim,
      tlpPengirim,
      almtPengirim,
      kodePos,
    } = this.state;
    const {classes} = this.props;
    // console.log('originProps', this.props)
    return (
      <Paper className={classes.paper}>
        <GridList cols={3} cellHeight="auto">
          <GridListTile cols={3}>
            <Typography type="headline" className={classes.h1}>
              General Information
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <GridList cols={1} cellHeight="auto">
              <GridListTile   className={classes.chgAvatar} cols={1}>

                  {/* <Avatar
                    src="https://image.spreadshirtmedia.com/image-server/v1/mp/designs/1008295428,width=178,height=178/100-percent-pure-super-admin.png"
                    className={classes.genAvatar}
                  /> */}
                  <Avatar style={{...StyleSheet.flatten(styles.avatar)}}>
                    {getInitialName(this.state.namaPengirim.value)}
                  </Avatar>

                <Typography type="headline" className={classes.title1}>
                <a  className={classes.genlinkprofile} href="/myprofile/editimage">Change picture</a>
                </Typography>
              </GridListTile>
            </GridList>
          </GridListTile>
          <GridListTile cols={2}>

            <GridList cols={2} cellHeight="auto">

              <GridListTile cols={2}>
                <Typography type="headline" className={classes.genName}>
                  {this.state.namaPengirim.value}
                </Typography>
              </GridListTile>

              <GridListTile cols={2}>
                <Typography type="headline" className={classes.genRole}>
                  Superadmin
                </Typography>
              </GridListTile>
              <GridListTile cols={2}>
                <Typography type="headline" className={classes.genEmailLabel}>
                  Email Address
                </Typography>
              </GridListTile>
              <GridListTile cols={2}>
                <Typography type="headline" className={classes.genEmailField}>
                  {this.state.tlpPengirim.value}
                </Typography>
              </GridListTile>
              <GridListTile cols={2}>
                <Typography type="headline" className={classes.genPhoneLabel}>
                  Phone Number
                </Typography>
              </GridListTile>
              <GridListTile cols={2}>
                <Typography type="headline" className={classes.genPhoneField}>
                  {this.state.kodePos.value}
                </Typography>
              </GridListTile>
              <GridListTile cols={2}>
                <Typography type="headline" className={classes.genDOBLabel}>
                  Date of Birth
                </Typography>
              </GridListTile>
              <GridListTile cols={2}>
                <Typography type="headline" className={classes.genDOBField}>
                  01/01/1992
                </Typography>
              </GridListTile>
              <GridListTile cols={1}>
                <Typography type="headline" className={classes.title}>
                  <a className={classes.genLink} href="/myprofile/edit">EDIT PROFILE</a>
                </Typography>
              </GridListTile>
              <GridListTile cols={1}>
                <Typography type="headline" className={classes.title}>
                    <a className={classes.genLink} href="/myprofile/resetpassword">CHANGE PASSWORD</a>
                </Typography>
              </GridListTile>
            </GridList>

          </GridListTile>
        </GridList>
      </Paper>
    );
  }
}
export default withStyles(Styles)(
  reduxForm({
    form: 'Origin',
  })(OriginCard),
);
