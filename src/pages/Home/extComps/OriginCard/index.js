import React, {Component} from 'react';
import {Paper, Typography, withStyles} from 'material-ui';
import Grid from 'material-ui/Grid';
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

const Styles = (theme) => ({
  paper: {
    height: '100%',
    padding: 20
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
    const {setOriginData} = this.props;
    this.setState({openSearchDialog: !this.state.openSearchDialog});
    return new Promise((resolve, reject) =>
      resolve(setOriginData(e.value)),
    );
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
      return;
    }
    getEntityList(`customer/code/${e.target.value}`, {}, source.token).then((response) => {
      source = null;
      self.setState({
        dataPengirim: response.data.data,
      });
    }).catch((error) => {
      /*console.log(error);*/
    });
  };
  loadDataPengirim = () => {
    /*const self = this;
    getEntityList('customer/code/', {code: 'jlc001'}).then((response) => {
      source = null;
      self.setState({
        dataPengirim: response.data.data,
      });
    }).catch((error) => {
      console.log(error);
    });*/
  };
  componentDidMount() {
    document.addEventListener('keydown', this._handleKeyDown.bind(this));
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
    if (this.props.allReducer.length === 0) {
      this.loadDataPengirim();
      return this.setState({openSearchDialog: !this.state.openSearchDialog});
    }
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
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={6}>
            <Typography variant="headline">
              Origin
            </Typography>
          </Grid>
          <Grid item xs={6} style={{textAlign: 'right'}}>
            <IconButton tabIndex={'-1'} onClick={this.handleOpenDialog}>
              <Person />
            </IconButton>
          </Grid>
        </Grid>
        <Field
          name="namaPengirim"
          component={NamaPengirim}
          handleChange={handleChange}
          {...this.props}
          item={namaPengirim}
          key={1}
          handleRowClick={handleRowClick}
          handleOpenDialog={handleOpenDialog}
          openSearchDialog={openSearchDialog}
          dataPengirim={dataPengirim}
          handleChangeText={handleChangeText}
        />
        <Field
          name="tlpKodeposField"
          component={TlpDanKodepos}
          handleChange={handleChange}
          {...this.props}
          item={tlpPengirim}
          key={2}
        />
        <Field
          name="almtField"
          component={AlmtField}
          item={almtPengirim}
          handleChange={handleChange}
          {...this.props}
          key={3}
        />
        <Field
          name="tlpKodeposField"
          component={kodepos}
          handleChange={handleChange}
          item={kodePos}
          {...this.props}
          key={4}
        />
      </Paper>
    );
  }
}
export default withStyles(Styles)(
  reduxForm({
    form: 'Origin',
  })(OriginCard),
);
