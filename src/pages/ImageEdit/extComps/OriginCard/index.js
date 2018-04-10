import React, {Component} from 'react';
import {Paper, Typography, withStyles, Button} from 'material-ui';
import {GridList, GridListTile} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import {Person} from 'material-ui-icons';
import {reduxForm, Field, reset} from 'redux-form';
import NamaPengirim from './fields/namaPengirim';
import axios from 'axios';
import {getEntityList} from '../../../../actions/entity';

const Styles = (theme) => ({
  paper: {
    height: 190,
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
  }
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
        label: 'Upload Image',
        value: '',
      },
      // tlpPengirim: {
      //   name: 'tlpPengirim',
      //   label: 'Email',
      //   value: 'indra@jne.co.id',
      // },
      // namaPengirim2: {
      //   name: 'namaPengirim2',
      //   label: 'Phone Number',
      //   value: '857-149-1877',
      // },
      // tlpPengirim2: {
      //   name: 'tlpPengirim2',
      //   label: 'Date of Birth',
      //   value: '01/01/1992',
      // },
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
      namaPengirim2,
      tlpPengirim2,
      almtPengirim,
      kodePos,
    } = this.state;
    const {classes} = this.props;
    // console.log('originProps', this.props)
    return (
      <Paper className={classes.paper}>
        <GridList cols={2} cellHeight="auto">
          <GridListTile cols={1}>
            <Typography type="headline" className={classes.title}>
              Upload Image
            </Typography>
          </GridListTile>
          {/* <GridListTile cols={1}>
            <IconButton tabIndex={'-1'} className={classes.searchbutton} onClick={this.handleOpenDialog}>
              <Person />
            </IconButton>
          </GridListTile> */}
        </GridList>

        <Field
          name="Name"
          placeholder="Indra Prastha"
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
    form: 'Origin',
  })(OriginCard),
);
