import React from 'react';
import PropTypes from 'prop-types';
import {Input, Button} from 'material-ui';
import {Add} from 'material-ui-icons';
import {withStyles} from 'material-ui/styles';
import _ from 'lodash';
import axios from 'axios';

import MainComp from './extComps/MainComp';
import EmptyDialogHandler from './extComps/Dialogs/emptyDialog';
import SummaryDialogHandler from './extComps/Dialogs/summary';
import {getDataFromReact, Biaya} from '../../tariff_engine';
import {getEntityList, postJsonEntity, postEntity} from '../../actions/entity';
import WarningDialog from '../../components/warningDialog';
import {userStoreConnector} from '../../store/redux-connect';
const styles = (theme) => ({
  root: {
    // textAlign: 'center',
    // paddingTop: theme.spacing.unit * 10,
  },
  pageTitle: {
    marginLeft: 60,
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
  addMoreRaisedBtn: {
    backgroundColor: '#1fbcd3',
    color: '#fafafa',
    marginTop: 44,
    marginBottom: 44,
    float: 'right',
    marginRight: 27,
    width: 138,
    height: 41,
  },
  finishRaisedBtn: {
    backgroundColor: '#1fbcd3',
    color: '#fafafa',
    marginTop: 44,
    marginBottom: 40,
    float: 'right',
    marginRight: 390,
    width: 138,
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

class ResetPassword extends React.Component {
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
      _VCW: 0,
      _CW: 0,
      _AW: 0,
      transactionId: null,
      autozip: false,
    };
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
  computeVCW = () => {
    const {allReducer} = this.props.additionalStore;
    return this.setState({
      _VCW: allReducer.reduce((all, item) => {
        const parsedPanjang = item.package.OtherInfoData.koli.panjang,
          parsedLebar = item.package.OtherInfoData.koli.lebar,
          parsedTinggi = item.package.OtherInfoData.koli.tinggi;
        return (
          all +
          (parsedPanjang * parsedLebar * parsedTinggi / 6000).toPrecision(2)
        );
      }, 0),
      // .map(data => (data.package.OtherInfoData.panjang * data.package.OtherInfoData.lebar * data.package.OtherInfoData.tinggi / 6000).toPrecision(4)) }
    });
  };
  computeCW = () => {
    const {allReducer} = this.props.additionalStore;
    const {_VCW} = this.state;
    // var vcwPrecised = _VCW
    // let resVCW = _VCW + 1
    //console.log('ini VCW', _VCW)
    return this.setState({
      _CW:
        _VCW >= parseFloat('' + Number(_VCW).toPrecision(1) + '.301')
          ? parseFloat(Number(_VCW).toPrecision(1) + 1)
          : parseFloat(Number(_VCW).toPrecision(1)),
    });
  };
  computeAW = () => {
    const {allReducer} = this.props.additionalStore;
    const {_CW} = this.state;
    //console.log('ini CW', _CW)
    return this.setState({
      _AW: allReducer.reduce((all, item) => {
        const parsedBerat = parseInt(item.package.OtherInfoData.koli.berat, 10);
        return all + Math.max(parsedBerat, _CW);
      }, 0),
    });
  };
  handleResDrawerComputation = () => {
    return new Promise((resolve, reject) => resolve(this.computeVCW()))
      .then(() => this.computeCW())
      .then(() => this.computeAW())
      .then(() => console.log(this.state._AW, this.state._CW, this.state._VCW));
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
  handleSubmitAllForms = () => {
    const {
      concatAllData,
      resetForm,
      fetchAlmtPenerima,
      additionalStore,
    } = this.props;
    const {otherInfoReducer, originReducer, destReducer} = additionalStore;
    const session = JSON.parse(sessionStorage.getItem('userData'));

    const {transactionId} = this.state;
    const {
      deskripsiBrg,
      pcs,
      service,
      koli,
      remarks,
      insuredVal,
    } = otherInfoReducer;
    const excludeAdtSurchargeOI = {deskripsiBrg, koli, pcs, service};

    const wrappedObj = Object.assign(
      {},
      {
        package: {
          transaction_id: transactionId,
          OriginData: originReducer,
          DestinationData: destReducer,
          OtherInfoData: {
            deskripsiBrg,
            pcs,
            service,
            koli,
            remarks,
            insuredVal,
          },
          actual_weight: this.aw,
          chargeable_weight: this.cw,
          userId: session.data.user_id,
          price: sessionStorage.getItem('baseTariff'),
          surcharge: sessionStorage.getItem('surcharge'),
          nodeId: sessionStorage.getItem('userNodeId'),
        },
      },
    );
    /**
     * Cheking for empty values
     */
    if (_.includes(originReducer, null)) {
      return this.setState({
        emptyValDialog: true,
        errortext: 'Required fields missing on Origin Card',
      });
    } else if (_.includes(destReducer, null)) {
      return this.setState({
        emptyValDialog: true,
        errortext: 'Required fields missing on Destination Card',
      });
    } else if (_.includes({deskripsiBrg, koli, pcs, service}, null)) {
      return this.setState({
        emptyValDialog: true,
        errortext: 'Required fields missing on Other info Card',
      });
    } else {
      postJsonEntity('connote', wrappedObj)
        .then((response) => {
          const {transaction_id} = response.data.data;
          let curr_connote_code = response.data.data.connote_code;
          //window.open('/label.html', 'barcode', 'toolbar=0,status=0,width=548,height=325');
          window.open(
            'http://coreapi.skyware.systems/connote/' +
              curr_connote_code +
              '/label',
            'barcode',
            'toolbar=0,status=0,width=548,height=325',
          );
          return this.setState({transactionId: transaction_id}, () => {
            let totalPrice =
              parseInt(sessionStorage.getItem('baseTariff'), 10) +
              parseInt(sessionStorage.getItem('surcharge'), 10);
            if (otherInfoReducer.adtSurcharge.includes('insurance')) {
              totalPrice = totalPrice + 5000 + Math.floor((otherInfoReducer.insuredVal * 0.002) * 1000) / 1000;
            }
            fetchAlmtPenerima([], null);
            concatAllData(
              originReducer,
              destReducer,
              otherInfoReducer,
              totalPrice,
            );
            resetForm();
          });
        })
        .then(() => this.dropDownPkgItems())
        .then(() => this.handleResDrawerComputation());
    }
  };
  fireDestinationAction(key, value) {
    const {setInputDestination} = this.props.additionalStore;
    return new Promise((resolve, reject) =>
      resolve(setInputDestination(key, value)),
    );
  }
  handlePackageChange = (e, index) => {
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
        this.handleModal('openSummaryDialog');
        transactionComplete();
      });
    });
  };

  doneTyping(almt) {
    const {fetchAlmtPenerima} = this.props;
    var CancelToken = axios.CancelToken;
    source = CancelToken.source();
    getEntityList('geolocation/search', {s: almt}, source.token).then((response) => {
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
    fetchAlmtPenerima({city_name: null, tariff_code: null, zip_code: null});
    setInputOtherInfo('serviceData', []);
    if (source != null) {
      source.cancel('Operation canceled by the user.');
    } else {}
    this.doneTyping(almt);
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
    return new Promise((resolve, reject) => {
        resolve(resetForm());
    });
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
    } = this;
    const {
      classes,
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
    } = this.props;
    let store = {
      fetchAlmtPenerima,
      throwKodePosToForDestination,
      setInputDestination,
      setInputOtherInfo,
      setInputOrigin,
      setReadOnlyPackage,
      transactionComplete,
      removeSurchargeItem,
    };
    const {
      packageItem,
      packageValue,
      _VCW,
      _CW,
      _AW,
      selectionCout,
      openSearchDrawer,
      emptyValDialog,
      openSummaryDialog,
      methodData,
      searchResultAlmt,
      errortext,
      error,
    } = this.state;
    const {almtPenerimaReducer, allReducer, originReducer} = additionalStore;
    const readOnly = packageValue || false;
    // const dataForTarifEngine = almtPenerimaReducer.length > 0 && almtPenerimaReducer.reduce((all, item, i) => {
    //   all = item
    //   return all
    // }, {})
    // const getTariffCodeOnly = almtPenerimaReducer.reduce((all, item, i) => {
    //   all = item.tariff_code
    //   return all
    // }, {})
    // let koliBeratReduced = almtPenerimaReducer.length > 0 && privateData.otherInfoReducer.koli.reduce((all, item) => {
    //   all = item
    //   return all
    // }, {})
    // console.log(koliBeratReduced, getTariffCodeOnly)
    // TODO: Why was the following block here?
    // {
    //   almtPenerimaReducer.length > 0 && Biaya >= 0;
    // }
    return (
      <div className={classes.root}>
        <div className={classes.pageTitle}><br/>
          <div className={classes.breadCrumbs}>
            My Profile /{' '}
            <span className={classes.transactionBreadcrumbs}>
              {' '}
              Change Password{' '}
            </span>
          </div>
          <br />
          <p className={classes.titleWrapper}> Change Password {
            allReducer.length > 0 && originReducer.customer_code === 'JLC001' && <span className={classes.jlcCustomer}>JLC:JLC-001</span>
          }</p>
          {/* <Input
            placeholder="Masukkan kode booking"
            name="kodeBooking"
            className={classes.kodeBooking}
            classes={{inkbar: classes.inputInkbarFocused}}
          /> */}
        </div>
        <MainComp
          store={store}
          readOnly={readOnly}
          privateData={additionalStore}
          handleSearch={handleSearch} handleFocusSearch={handleFocusSearch} handleBlurSearch={handleBlurSearch}
          searchResultAlmt={searchResultAlmt}
          almtPenerimaReducer={almtPenerimaReducer}
          BASE_API={BASE_API}
          kodePosFunc={throwKodePosToForDestination}
        />
        {/* <Button
          variant="raised"
          color="primary"
          className={classes.finishRaisedBtn}
          onClick={() => this.handleModal('openSummaryDialog')}
        >
          Finish
        </Button> */}
        {/* {readOnly ? (
          <Button
            variant="raised"
            color="accent"
            className={classes.addMoreRaisedBtn}
            onClick={this.handleContinue}
          >
            Continue Editing
          </Button>
        ) : (
          <Button
            variant="raised"
            color="accent"
            className={classes.addMoreRaisedBtn}
            onClick={this.handleSubmitAllForms}
          >
            <Add />&nbsp;Add More
          </Button>
        )} */}
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
            handleSelect={handleSelect}
            methodData={methodData}
            openSummaryDialog={openSummaryDialog}
            handleOpenDialog={handleModal}
            summaryData={additionalStore}
          />
        ) : null}

        {/* <ResultDrawer
          store={store}
          openSearchDrawer={openSearchDrawer}
          handleDrawer={handleDrawer}
          handleSearchDrawer={handleSearchDrawer}
          selectionCout={selectionCout}
          privateData={additionalStore}
          handlePackageChange={handlePackageChange}
          packageValue={packageValue}
          packageItem={packageItem}
          _VCW={_VCW}
          _CW={_CW}
          _AW={_AW}
          setWeight={setWeight}
          searchResultAlmt={searchResultAlmt}
          fetchAlmtPenerima={fetchAlmtPenerima}
          readOnly={readOnly}
        /> */}
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default userStoreConnector(withStyles(styles)(ResetPassword));
