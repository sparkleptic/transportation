import React from 'react';
import {Prompt} from 'react-router';
import PropTypes from 'prop-types';
import {Input, Button, Grid} from 'material-ui';
import {Add} from 'material-ui-icons';
import {withStyles} from 'material-ui/styles';
import _ from 'lodash';
import axios from 'axios';

import ResultDrawer from './extComps/ResultDrawer';
import MainComp from './extComps/MainComp';
import EmptyDialogHandler from './extComps/Dialogs/emptyDialog';
import SummaryDialogHandler from './extComps/Dialogs/summary';
import {getDataFromReact, Biaya} from '../../tariff_engine';
import {getEntityList, postJsonEntity, postEntity} from '../../actions/entity';
import WarningDialog from '../../components/warningDialog';
import {userStoreConnector} from '../../store/redux-connect';
import EnhancedToolbar from '../../components/EnhancedToolbar'

import { styles as baseStyles } from '../../pages/css'
const styles = (theme) => ({
  root: {
    ...baseStyles(theme).root,
    paddingRight: 300
  },
  pageTitle: {
    marginLeft: 120,
  },
  secondaryDrawerPaper: {
    position: 'relative',
    height: '100%',
    width: 240,
  },
  jlc: {
    width: window.innerWidth >= 1024 ? 179.7 : '36%',
    marginRight: window.innerWidth >= 1024 ? 13 : 12,
    fontSize: 15,
    marginBottom: 15,
  },
  kodeBooking: {
    width: window.innerWidth >= 1024 ? 179.7 : '49%',
    marginLeft: window.innerWidth >= 1024 ? 13 : 12,
    fontSize: window.innerWidth >= 1024 ? 15 : 15,
    marginBottom: 15,
  },
  breadCrumbs: {
    float: 'left',
    color: '#323990',
    fontSize: 14,
  },
  transactionBreadcrumbs: {
    color: 'black',
    margin: 0,
    fontSize: 14,
  },
  titleWrapper: {
    fontSize: window.innerWidth >= 1024 ? 26 : 15,
    fontWeight: 'bold',
    marginTop: window.innerWidth >= 1024 ? 0 : 10,
    marginBottom: 0,
  },
  inputInkbarFocused: {
    '&:after': {
      backgroundColor: 'rgb(50, 57, 144)',
    },
  },
  raisedBtn: {
    color: '#fafafa',
    width: 138,
    height: 41,
    margin: '40px 20px',
    backgroundColor: '#1fbcd3',
  },
  printRaisedBtn: {
    color: '#fafafa',
    width: 138,
    height: 41,
    marginTop: 44,
    marginLeft: 465,
    marginBottom: 44,
    backgroundColor: '#1fbcd3',
  },
  finishRaisedBtn: {
    backgroundColor: '#1fbcd3',
    color: '#fafafa',
    marginTop: 40,
    marginBottom: 40,
    /*float: 'right',*/
    marginLeft: 20,
    width: 138,
    height: 41,
  },
  continueRaisedBtn: {
    backgroundColor: '#1fbcd3',
    color: '#fafafa',
    marginTop: 40,
    marginBottom: 40,
    /*float: 'right',*/
    marginLeft: 20,
    width: 188,
    height: 41,
  },
  jlcCustomer: {
    color: '#0000FF',
    fontWeight: 'bold',
  },
});
const BASE_API = 'http://coreapi.skyware.systems/api/';
let source = null;
let typingTimer; //timer identifier
let doneTypingInterval = 5000;
// const BASE_API = 'http://192.168.8.111/core_laravel/public/api/'
// const BASE_API = 'http://coreapi.jne.co.id/api/'

class Index extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      packageValue: null,
      selectionCout: false,
      openSearchDrawer: false,
      openSummaryDialog: false,
      emptyValDialog: false,
      methodData: 'Cash',
      packageItem: [],
      searchResultAlmt: null,
      allData: [],
      /*_VCW: 0,
      _CW: 0,
      _AW: 0,*/
      transactionId: null,
      connote_code: null,
      autozip: false,
      transactionCompleted: null,
      surcharges: [],
      methodData: 'Cash'

      
    };
    this.waiting = false;
    // TODO: Why was this line here?
    // this.aw, this.cw;
    this.handleModal = this.handleModal.bind(this);
    this.handleSubmitAllForms = this.handleSubmitAllForms.bind(this);
    this.handleDrawer = this.handleDrawer.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  dropDownPkgItems = () => {
    const {additionalStore} = this.props;
    const {allReducer} = additionalStore;
    return this.setState({
      packageItem: allReducer.map((data, index) => (
        <div key={index}>
          <p style={{fontSize: 16}}>
            To:<strong>{data.package.DestinationData.namaPenerima}</strong> |
            CGKXXXX
          </p>

          <p>
            {data.package.OtherInfoData.service} | Rp.{' '}
            {data.package.OtherInfoData.insuredVal}
          </p>
        </div>
      )),
    });
  };
  
  handleEmptyValue = (...obj) => {
    const concatedObj = Object.assign({}, ...obj);
    return _.includes(concatedObj, null);
  };
  handleModal = (key) => {
    return this.setState({[key]: !this.state[key]});
  };
  setWeight = (key, value) => {
    this[key] = value;
  };
  finishTransaction = (event) => {
    /**
     * Lets check if we have all info filled in to create a new connot
    */
    if (this.isValidConnot().valid && !this.waiting) {
      this.waiting = true;
      this.createConnote('connote')
        .then((response) => this.onConnotCreationComplete(response))
        .then(() => this.dropDownPkgItems())
        .then(() => this.setState({openSummaryDialog: true}));
    } else {
      this.setState({openSummaryDialog: true});
    }
  }
  isValidConnot = () => {
    const {otherInfoReducer, originReducer, destReducer} = this.props.additionalStore;
    /**Remove fields not part of the connot */
    const or = {...originReducer};
    delete or.focusField; delete or.customer_code; delete or.customer_id;
    /**Remove destination fields not part of connot */
    const dr = {...destReducer};
    delete dr.focusField;
    /**get info card value needed for connot */
    const {deskripsiBrg, pcs, service, koli} = otherInfoReducer;
    /**Now validation */
    if (_.includes(or, null)) {
      return {card: 'origin', valid: false};
    } else if (_.includes(dr, null)) {
      return {card: 'destination', valid: false};
    } else if (_.includes({deskripsiBrg, koli, pcs, service}, null)) {
      return {card: 'otherinfo', valid: false};
    }
    return {valid: true};
  }
  createConnote = (endpoint) => {
    const {otherInfoReducer, originReducer, destReducer} = this.props.additionalStore;
    const {deskripsiBrg, pcs, service, koli, remarks, insuredVal} = otherInfoReducer;
    const {transactionId} = this.state;
    const session = JSON.parse(sessionStorage.getItem('userData'));
    const wrappedObj = {
      package: {
        transaction_id: transactionId,
        OriginData: originReducer,
        DestinationData: destReducer,
        OtherInfoData: {deskripsiBrg, pcs, service, koli, remarks, insuredVal},
        actual_weight: this.aw,
        chargeable_weight: this.cw,
        userId: session.data.user_id,
        price: sessionStorage.getItem('baseTariff'),
        surcharge: sessionStorage.getItem('surcharge'),
        nodeId: sessionStorage.getItem('userNodeId'),
      },
    };
    if (endpoint === 'connote/koli') {
      wrappedObj.package.connote_code = this.state.connote_code;
    }
    return postJsonEntity(endpoint, wrappedObj);
  }
  onConnotCreationComplete = (response) => {
    const {otherInfoReducer, originReducer, destReducer} = this.props.additionalStore;
    const {fetchAlmtPenerima, resetForm, concatAllData} = this.props;
    const {transaction_id, connote_code} = response.data.data;
    this.openConnotPrint(connote_code);
    return this.setState({transactionId: transaction_id, connote_code}, () => {
      let totalPrice =
        parseInt(sessionStorage.getItem('baseTariff'), 10) +
        parseInt(sessionStorage.getItem('surcharge'), 10);
      if (otherInfoReducer.adtSurcharge.includes('insurance')) {
        totalPrice = totalPrice + 5000 + Math.floor((otherInfoReducer.insuredVal * 0.002) * 1000) / 1000;
      }
      fetchAlmtPenerima([], null);
      concatAllData(originReducer, destReducer, otherInfoReducer, totalPrice, connote_code);
      resetForm(true);
      this.waiting = false;
    });
  }
  printConnote = (event) => {
    this.openConnotPrint(this.state.packageValue.package.ConnoteCode);
  }
  openConnotPrint = (connotid) => {
    window.open(
      'http://coreapi.skyware.systems/connote/' + connotid + '/label', 
      'barcode',
      'toolbar=0,status=0,width=548,height=325',
    );
  }
  handleSubmitAllForms = () => {
   if (!this.waiting) {
      const valid = this.isValidConnot();
      if (!valid.valid) {
        if (valid.card === 'origin') {
          return this.setState({emptyValDialog: true, errortext: 'Required fields missing on Origin Card'});
        } else if (valid.card === 'destination') {
          return this.setState({emptyValDialog: true, errortext: 'Required fields missing on Destination Card'});
        } else if (valid.card === 'otherinfo') {
          return this.setState({ emptyValDialog: true, errortext: 'Required fields missing on Other info Card'});
        }
      } else if (valid.valid) {
        this.waiting = true;
        this.createConnote('connote')
          .then((response) => this.onConnotCreationComplete(response))
          .then(() => this.dropDownPkgItems());
      }
    }
  };
  handleRequestPrintKoli = () => {
    if (!this.waiting) {
      const valid = this.isValidConnot();
      if (!valid.valid) {
        if (valid.card === 'origin') {
          return this.setState({emptyValDialog: true, errortext: 'Required fields missing on Origin Card'});
        } else if (valid.card === 'destination') {
          return this.setState({emptyValDialog: true, errortext: 'Required fields missing on Destination Card'});
        } else if (valid.card === 'otherinfo') {
          return this.setState({ emptyValDialog: true, errortext: 'Required fields missing on Other info Card'});
        }
      } else if (valid.valid) {
        this.waiting = true;
        const request = this.state.connote_code ? this.createConnote(`${this.state.connote_code}/koli`) : this.createConnote('connote');
        request.then((response) => {
          if (!this.state.connote_code) {
            const {transaction_id} = response.data.data;
            const {connote_code} = response.data.data;
            return this.setState({transactionId: transaction_id, connote_code }, () => {
              this.createConnote(`connote/koli`).then((response) => {
                this.onKoliCreationComplete(response);
              });
            });
          } else {
            this.onKoliCreationComplete(response);
          }
        });
      }
    }
  }
  onKoliCreationComplete = (response) => {
    console.log('onKoliCreationComplete', response);
  }
  fireDestinationAction(key, value) {
    const {setInputDestination} = this.props.additionalStore;
    return new Promise((resolve, reject) =>
      resolve(setInputDestination(key, value)),
    );
  }
  handlePackageChange = (e, index) => {
    if (this.props.additionalStore.allReducer.length) {
      const {selectionCout} = this.state;
      const {setReadOnlyPackage} = this.props;
      const packageValue = e.target.value;
      /**setup private values */
      return this.setState(
        {selectionCout: !selectionCout, packageValue: packageValue},
        () => {
          setReadOnlyPackage(packageValue);
        },
      );
    }
  };
  handleContinue = () => {
    const {fetchAlmtPenerima, resetForm} = this.props;
    return this.setState({packageValue: null}, () => {
      fetchAlmtPenerima([], null);
      return new Promise((resolve, reject) => {
        resolve(resetForm());
      });
    });
  };
  handleDrawer = (key) => {
    const {additionalStore} = this.props;
    return this.setState({[key]: !this.state[key]});
  };

  handleSelect = (e) => {
    this.setState({methodData: e.target.value});
  };
  handleSubmit = () => {
    const {transactionComplete} = this.props;
    const {allReducer} = this.props.additionalStore;
    let tarif = 0;
    // console.log(allReducer);
    allReducer.map((data) => {
      tarif = tarif + parseInt(data.package.Total, 10);
      return data;
    });
    postEntity('transaction', {
      transaction_id: this.state.transactionId,
      total_payment: tarif,
      payment_method_id: this.state.methodData,
    }).then((response) => {
      this.setState({packageValue: null}, () => {
        transactionComplete();
        this.setState({openSummaryDialog: false, transactionCompleted: true}, () => {
          this.props.history.push(`/transaction/complete/${this.state.transactionId}`);
        });
      });
    });
  };

  doneTyping(almt, zip) {
    const {fetchAlmtPenerima} = this.props;
    var CancelToken = axios.CancelToken;
    source = CancelToken.source();
    getEntityList(zip ? 'geolocation/searchzipcodes' : 'geolocation/search', {s: almt}, source.token).then((response) => {
      const {data} = response.data;
      if (almt.length === 5) {
        const idx = data.filter((item) => {
          return item.zip_code === almt;
        });
        if (idx.length > 0) {
          source = null;
          fetchAlmtPenerima(idx[0]);
          return this.setState({openSearchDrawer: false});
        }
      }
      if (data.length === 1) {
        source = null;
        fetchAlmtPenerima(data[0]);
        return this.setState({openSearchDrawer: false});
      }
      source = null;
      return data
        ? this.setState({searchResultAlmt: data, openSearchDrawer: true})
        : 'Data Not Found';
    }).catch((thrown) => {
      if (axios.isCancel(thrown)) {
        //console.log('Request canceled', thrown.message);
      } else {
        // handle error
      }
    });
  }
  handleBlurSearch = (e) => {
    return this.setState({openSearchDrawer: false});
  }
  handleFocusSearch = (e) => {
    return this.setState({openSearchDrawer: true});
  }
  handleSearch = async (almt) => {
    const self = this;
    const {fetchAlmtPenerima, setInputOtherInfo, additionalStore} = this.props;
    const {almtPenerimaReducer} = additionalStore;
    //fetchAlmtPenerima({city_name: null, tariff_code: null, zip_code: null});
    //setInputOtherInfo('serviceData', []);
    if (source != null) {
      source.cancel('Operation canceled by the user.');
    } else {}
    if (almt.length > 4) {
      if (almt.length === 5 && almt.match(/\b\d{5}\b/g)) {
        this.doneTyping(almt, true);
      } else {
        this.doneTyping(almt);
      }
    }
    /*clearTimeout(typingTimer);
    if (almt.length > 0) {
      typingTimer = setTimeout(() => {
        self.doneTyping(almt);
      }, 10);
    }*/
  };

  componentWillReceiveProps(nextProps) {
    const {additionalStore} = nextProps;
    const {almtPenerimaReducer} = additionalStore;
    const dataForTarifEngine = almtPenerimaReducer;
    const getTariffCodeOnly = almtPenerimaReducer.tariff_code;
    getDataFromReact(
      nextProps.additionalStore.otherInfoReducer.koli.berat,
      getTariffCodeOnly,
    );
  }

  componentDidMount = () => {
    const {fetchAlmtPenerima, resetForm} = this.props;
    resetForm();
    getEntityList('surcharges')
    .then((response) => {
      this.setState({surcharges: response.data.data});
    }).catch((error) => {
      console.log(error);
    });
  }
  onChangePaymentType = (item) => {
    this.setState({methodData: item});
  }
  render() {
    const {
      handlePackageChange,
      handleSearchDrawer,
      handleModal,
      handleDrawer,
      handleSelect,
      handleSubmit,
      handleSearch,
      setWeight,
      handleFocusSearch,
      handleBlurSearch,
      handleRequestPrintKoli,
    } = this;
    const {
      classes,
      setOriginData,
      setDestinationData,
      fetchAlmtPenerima,
      throwKodePosToForDestination,
      setInputDestination,
      additionalStore,
      match,
      setInputOtherInfo,
      setInputOrigin,
      setReadOnlyPackage,
      transactionComplete,
      removeSurchargeItem,
      setFocusToNextInput,
      updateKoliSurcharge,
      activeNode,
    } = this.props;

    let store = {
      setOriginData,
      setDestinationData,
      fetchAlmtPenerima,
      throwKodePosToForDestination,
      setInputDestination,
      setInputOtherInfo,
      setInputOrigin,
      setReadOnlyPackage,
      transactionComplete,
      removeSurchargeItem,
      setFocusToNextInput,
      updateKoliSurcharge,
    };
    const {
      packageItem,
      packageValue,
      /*_VCW,
      _CW,
      _AW,*/
      selectionCout,
      openSearchDrawer,
      emptyValDialog,
      openSummaryDialog,
      methodData,
      searchResultAlmt,
      errortext,
      error,
      transactionCompleted,
      surcharges,
    } = this.state;
    const {almtPenerimaReducer, allReducer, originReducer} = additionalStore;
    const readOnly = packageValue || false;
    return (
      <div className={classes.root}>
        <EnhancedToolbar
          navs={['Point Of Sales', 'New Transactions']}
          title={(
            <div>
              <div>New Transactions</div>
              <Input
                placeholder="Masukkan kode booking"
                name="kodeBooking"
                className={classes.kodeBooking}
                /*classes={{inkbar: classes.inputInkbarFocused}}*/
              />
            </div>
          )}
        />
        <MainComp
          store={store}
          readOnly={readOnly}
          privateData={additionalStore}
          handleSearch={handleSearch} handleFocusSearch={handleFocusSearch} handleBlurSearch={handleBlurSearch}
          handleRequestPrintKoli={handleRequestPrintKoli}
          searchResultAlmt={searchResultAlmt}
          almtPenerimaReducer={almtPenerimaReducer}
          BASE_API={BASE_API}
          surcharges={surcharges}
          kodePosFunc={throwKodePosToForDestination}
        />
        <Grid container justify="flex-end">
          {readOnly ? (
            <Grid item>
              <Button variant="raised" color="secondary" className={classes.raisedBtn} onClick={this.printConnote}>Print</Button>
              <Button variant="raised" color="secondary" className={classes.raisedBtn}onClick={this.handleContinue}>Continue Editing</Button>
              <Button variant="raised" color="primary" className={classes.raisedBtn} onClick={this.finishTransaction}>Finish</Button>
            </Grid>
          ) : (
            <Grid item>
              <Button variant="raised" color="secondary" className={classes.raisedBtn} onClick={this.handleSubmitAllForms}><Add />&nbsp;Add More</Button>
              <Button variant="raised" color="primary" className={classes.raisedBtn} onClick={this.finishTransaction}>Finish</Button>
            </Grid>
          )}
        </Grid>
        {/*Dialogs*/}
        {emptyValDialog && (
          <WarningDialog
            text={errortext}
            open={emptyValDialog}
            handleModal={() => handleModal('emptyValDialog')}
          />
        )}
        {openSummaryDialog ? (
          <SummaryDialogHandler
            handleSubmit={handleSubmit}
            onChangePaymentType={this.onChangePaymentType}
            handleSelect={handleSelect}
            activeNode={activeNode}
            methodData={methodData}
            openSummaryDialog={openSummaryDialog}
            handleOpenDialog={handleModal}
            summaryData={additionalStore}
          />
        ) : null}

        <ResultDrawer
          store={store}
          openSearchDrawer={openSearchDrawer}
          handleDrawer={handleDrawer}
          handleSearchDrawer={handleSearchDrawer}
          selectionCout={selectionCout}
          privateData={additionalStore}
          handlePackageChange={handlePackageChange}
          packageValue={packageValue}
          packageItem={packageItem}
          surcharges={surcharges}
          /*_VCW={_VCW}
          _CW={_CW}
          _AW={_AW}*/
          setWeight={setWeight}
          searchResultAlmt={searchResultAlmt}
          fetchAlmtPenerima={fetchAlmtPenerima}
          readOnly={readOnly}
        />
        <Prompt
          when={(this.props.additionalStore.navigation.pageIsDirty === true && !transactionCompleted)}
          message="You have unsaved changes, are you sure you want to leave?"
        />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default userStoreConnector(withStyles(styles)(Index));
