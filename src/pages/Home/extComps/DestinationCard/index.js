import React, {Component} from 'react';
import {Paper, Typography} from 'material-ui';
import Grid from 'material-ui/Grid';

import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import {Person} from 'material-ui-icons';

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

const Styles = (theme) => ({
  paper: {
    height: '100%',
    padding: 20
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
  inputField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: 5,
    width: 350,
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
        label: 'Alamat Penerima *',
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
  }
  _handleKeyDown = (event) => {
    if (this.props.readOnly) return;
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
      return;
    }
    getEntityList(`customer/code/${e.target.value}`, {}, source.token).then((response) => {
      source = null;
      self.setState({
        dataPengirim: response.data.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  };
  loadDataPengirim = () => {
    /*const self = this;
    getEntityList('customer', {code: 'jlc001'}).then((response) => {
      source = null;
      self.setState({
        dataPengirim: response.data.data,
      });
    }).catch((error) => {
      console.log(error);
    });*/
  };

  handleRowClick = (e) => {
    const {setDestinationData} = this.props;
    this.setState({openSearchDialog: !this.state.openSearchDialog});
    return new Promise((resolve, reject) =>
      resolve(setDestinationData(e.value)),
    );
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
    const {setFocusToNextInput} = this.props;
    return new Promise((resolve, reject) =>
      resolve(setFocusToNextInput('')),
    );
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
    const {focusField} = this.props.privateData;
    const {openSearchDialog, dataPengirim, textField, nextFocus} = this.state;
    const {classes, almtPenerimaReducer, kodePosFunc, handleFocusSearch, handleBlurSearch} = this.props;
    let anchorEl = false;
    const {zip_code, tariff_code, city_name, subdistrict_name, district_name, province_name} = this.props.almtPenerimaReducer;
    return (
      <Paper className={classes.paper}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={6}>
            <Typography variant="headline">
              Destination
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign: 'right'}}>
            <IconButton tabIndex={'-1'} onClick={this.handleOpenDialog}>
              <Person />
            </IconButton>
          </Grid>
        </Grid>
        <Field
          name="namaPenerima"
          component={NamaPenerima}
          {...this.props}
          item={this.state.name}
          handleOpenDialog={this.handleOpenDialog}
          handleChange={this.handleChange}
          autoFocus={focusField === 'namaPenerima'}
        />
        <Field
          name="tlpPenerima"
          component={TlpPenerima}
          handleChange={this.handleChange}
          {...this.props}
          item={this.state.telp}
        />
        <Field
          name="almtPenerima"
          component={AlmtPenerima}
          item={this.state.alamat}
          almtPenerimaReducer={this.props.almtPenerimaReducer}
          handleChange={this.handleChange}
          {...this.props}
        />
        <Field
          autoFocus={focusField === 'triK'}
          name="triK"
          component={TriK}
          item={this.state.triK}
          handleChange={this.handleChange}
          handleFocusSearch={handleFocusSearch}
          handleBlurSearch={handleBlurSearch}
          {...this.props} />
        <KodePosTo kodePos={zip_code || ''} kodeTo={tariff_code || ''} {...this.props} />
        {openSearchDialog && (
          <SearchPeople
            openDialog={openSearchDialog}
            handleChangeText={handleChangeText}
            handleRowClick={handleRowClick}
            handleOpenDialog={handleOpenDialog}
            dataPengirim={dataPengirim}
          />
        )}
      </Paper>
    );
  }
}
export default withStyles(Styles)(
  reduxForm({
    form: 'Destination',
  })(DestinationCard),
);
