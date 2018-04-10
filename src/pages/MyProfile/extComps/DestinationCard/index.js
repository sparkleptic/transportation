import React, {Component} from 'react';
import {Paper, Typography} from 'material-ui';
import {GridList, GridListTile} from 'material-ui';

import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import {Person, Business} from 'material-ui-icons';

import withStyles from 'material-ui/styles/withStyles';
import SearchPeople from '../Dialogs/searchPeeps';
import {reduxForm, Field} from 'redux-form';
import TlpPenerima from './fields/tlpPenerima';
import TriK from './fields/triK';
import NamaPenerima from './fields/namaPenerima';
import AlmtPenerima from './fields/almtPenerima';
import KodePosTo from './fields/kodePosTo';
import axios from 'axios';
import {getEntityList} from '../../../../actions/entity';
// import fetchJSON from '../../helpers/fetchJSON';


const Styles = (theme) => ({
  paper: {
    height: "auto",
    width: 550,
    marginLeft: 10,
    paddingBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    color: '#424242',
    letterSpacing: 0.7,
    padding: '23px 0px 0px 24px',
  },

  icon: {
    position: 'absolute',
    right: 0,
    top: 37,
    width: 24,
    height: 24,
    color: 'rgba(149, 152, 154, 0.46)',
    cursor: 'pointer',
  },
  genName: {
    fontWeight: 200,
    color: '#424242',
    letterSpacing: 0.7,
    padding: '23px 0px 0px 24px',
    fontSize: 16,
  },
  complabel: {
    display: "inline-block"
  },
  genRoles:{
    fontWeight: 200,
    color: '#424242',
    letterSpacing: 0.7,
    padding: '23px 0px 0px 24px',
    fontSize: 16,
    paddingTop: 40,
  },
  h1: {
    fontWeight: 'bold',
    color: '#424242',
    letterSpacing: 0.7,
    padding: '23px 0px 0px 24px',
    fontSize: 20,
  },
  compIcon: {
    position: 'relative',
    top: 5,
    paddingLeft: 20,
    paddingRight: 20,
    // paddingTop: 30,
  },
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3 - 2,
    width: 350,
  },
  autogenerateCode: {
    margin: `5px 0px 2px ${theme.spacing.unit * 3}px`,
    width: '100%',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.46)',
  },
  alamatTextField: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3,
    width: 350,
  },
  label: {
    color: 'rgba(0, 0, 0, 0.46)',
    width: 1280,
    height: 1133,
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
class DestinationCard extends Component {
  constructor() {
    super();
    this.state = {
      openSearchDialog: false,
      almtRes: '',
      dataPengirim: [],
      name: {
        name: 'namaPenerima',
        label: 'Nama Penerima *',
        value: '',
      },
      alamat: {
        name: 'almtPengirim',
        label: 'Alamat Pengirim *',
        value: '',
      },
      telp: {
        name: 'tlpPenerima',
        label: 'Telepon Penerima *',
        value: '',
      },
      triK: {
        name: 'triK',
        label: 'Kelurahan / Kecamatan / Kota / Kode Pos *',
        value: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));

    // const self = this;
    // if (sessionStorage.getItem('userData') !== null) {
    //   const session = JSON.parse(sessionStorage.getItem('userData'));
    //   const userId = session.data.user_id;
    //   fetchJSON
    //     .get(`/users/${userId}`)
    //     .then((response) => {
    //       console.log('user', response);
    //       const node = response.data.data;
    //       sessionStorage.setItem(
    //         'userNode',
    //         JSON.stringify(response.data.data),
    //       );
    //       sessionStorage.setItem(
    //         'userNodeId',
    //         response.data.data.node[0].node.node_id,
    //       );
    //       node.node.map((item, index) => {
    //         self.handleCallNode(item.node.node_id, index);
    //       });
    //       //self.handleCallNode(response.data.data.node[0].node.node_id)
    //     })
    //     .catch((error) => {
    //       console.log('>>>', error);
    //     });
    // }

  }
  _handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 113:
        this.handleOpenDialog();
        event.preventDefault();
        break;
      case 27:
      case 112:
        return this.setState({openSearchDialog: false});
      default:
        break;
    }
  }
  handleOpenDialog = (key) => {
    this.loadDataPengirim();
    return this.setState({openSearchDialog: !this.state.openSearchDialog});
  };
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

  handleRowClick = (e) => {
    const self = this;
    const {customer_id, customer_name, cust_phone, address} = e.value;
    self.fireDestinationAction('customer_id', customer_id);
    self.fireDestinationAction('namaPenerima', customer_name);
    self.fireDestinationAction('tlpPenerima', cust_phone);
    self.fireDestinationAction('almtPenerima', address);
    self.setState({openSearchDialog: !self.state.openSearchDialog});
  };

  fireDestinationAction(key, value) {
    const {setInputDestination} = this.props;
    return new Promise((resolve, reject) =>
      resolve(setInputDestination(key, value)),
    );
  }

  handleChange = (e) => {
    const {handleSearch, almtPenerimaReducer} = this.props;
    if (e.target.name === 'triK') {
      let tmp_str = e.target.value.split(',').join('');
      //console.log(tmp_str)
      return new Promise((resolve, reject) => {
        //this.setState({ almtRes: tmp_str })
        resolve(this.fireDestinationAction('triK', tmp_str));
      }).then(() => handleSearch(tmp_str));
    } else {
      let value = e.target.value;
      if (e.target.name === 'tlpPenerima') {
        value = value.replace(/[^0-9]/, '');
      }
      return this.fireDestinationAction(e.target.name, value);
    }
  };

  // handleKeyPress = (e) => {
  //     if (e.key === '') {
  //     } else {
  //     }
  // }
  handleFocus = (e) => {
    this.props.handleFocusSearch();
  }
  handleChangeUpdate = (name, value) => {
    let textField, field;
    switch (name) {
      case 'namaPenerima':
        field = 'name';
        break;
      case 'tlpPenerima':
        field = 'telp';
        break;
      case 'almtPenerima':
        field = 'alamat';
        break;
      case 'triK':
        field = 'triK';
        break;
      default:
        break;
    }
    textField = this.state[field];
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
      if (a === 'triK' && nextprops.almtPenerimaReducer.city_name) {
        const {zip_code, tariff_code, city_name, subdistrict_name, district_name, province_name} = nextprops.almtPenerimaReducer;
        const concatedItem = '' + subdistrict_name + ' ' + district_name + ' ' + city_name;
        data[a].value = concatedItem;
      }
      return data && Object.assign(fields, data);
    });
    this.setState({...fields});
  };
  render() {
    const {
      handleOpenDialog,
      handleChange,
      handleRowClick,
      handleChangeText,
    } = this;
    const {openSearchDialog, dataPengirim, textField} = this.state;
    const {classes, almtPenerimaReducer, kodePosFunc, handleFocusSearch, handleBlurSearch} = this.props;
    let anchorEl = false;
    const {zip_code, tariff_code, city_name, subdistrict_name, district_name, province_name} = this.props.almtPenerimaReducer;
    return (
      <Paper className={classes.paper}>
        <GridList cols={1} cellHeight="auto">
          <GridListTile cols={1}>
            <Typography type="headline" className={classes.h1}>
              Other Informations
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography type="headline" className={classes.genName}>
              Work Location
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography type="headline" className={classes.complabel}>
              <Business className={classes.compIcon} />  JNE, Tomang II
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography type="headline" className={classes.complabel}>
              <Business  className={classes.compIcon} />  Agen, Depok
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography type="headline" className={classes.genRoles}>
              Roles
            </Typography>
          </GridListTile>
          <GridListTile cols={1}>
            <Typography type="headline" >
              <Person className={classes.compIcon} /> Operations Manager
            </Typography>
          </GridListTile>
        </GridList>

      </Paper>
    );
  }
}
export default withStyles(Styles)(
  reduxForm({
    form: 'Destination',
  })(DestinationCard),
);
