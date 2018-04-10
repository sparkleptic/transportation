import React, {Component} from 'react';
import {weightIcon} from '../../../../CusIcons/CustomIcons';
import withStyles from 'material-ui/styles/withStyles';
import BlptBtn from './blptBtn';
import Pcs from './fields/left/pcs';
import DskripsiBrg from './fields/left/dskripsiBrg';
import Service from './fields/left/service';

const leftSide = [
  {
    name: 'deskripsiBrg',
    label: 'Deskripsi Barang',
    value: '',
  },
  {
    name: 'service',
    label: 'Service *',
    value: '',
  },
  {
    name: 'blpt',
  },
  {
    name: 'pcs',
    label: 'Jumlah *',
    value: 1,
  },
];

const Styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3 - 2,
    width: 350,
  },
  inputLabelFocused: {
    color: 'rgb(50, 57, 144)',
  },
  inputLabel: {
    marginLeft: theme.spacing.unit * 3,
  },
  inputInkbarFocused: {
    '&:after': {
      backgroundColor: 'rgb(50, 57, 144)',
    },
  },
  uniqueInputFill: {
    fill: 'rgb(50, 57, 144)',
  },
  remarksBtn: {
    marginTop: 25,
  },
  remarksImgEnabled: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginBottom: 5,
  },
  remarksLabel: {
    fontSize: 13,
  },
  remarksImgDisabled: {
    width: 24,
    height: 24,
    opacity: 0.2,
    marginRight: 5,
    marginBottom: 5,
  },
  RBgroup: {
    margin: '12px 0px 7px 10px',
  },
  stRB: {
    display: 'inline-block',
    width: 100,
  },
  nextRB: {
    display: 'inline-block',
    width: 100,
    marginLeft: 12,
  },
  radioLabel: {
    color: 'rgba(0, 0, 0, 0.46)',
    fontSize: 15,
    marginLeft: 15,
  },
  radioSpacing: {
    marginLeft: 50,
  },
  gridListBlpt: {
    flexGrow: 1,
    maxWidth: '100%',
    flexBasis: 0,
    paddingLeft: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3 - 2,
  },
  blpt: {
    width: 70,
  },
  dialogWrapper: {
    margin: '23px 30px 23px 30px',
    maxWidth: 411,
  },
  aturDialogWrapper: {
    margin: '23px 30px 23px 30px',
    maxWidth: 950,
    minWidth: 453,
  },
  table: {
    width: 700,
  },
  tableCell: {
    padding: '4px 10px',
  },
});

const serviceType = ['REG', 'OKE', 'YES'];
class leftSideGrid extends Component {
  componentWillReceiveProps(nextProps) {
    leftSide[0].value = nextProps.privateData.deskripsiBrg || '';
    leftSide[1].value = nextProps.privateData.service || '';
    leftSide[3].value = nextProps.privateData.pcs || '';
  }
  render() {
    const {
      readOnly,
      handleChange,
      handleBlur,
      classes,
      koli,
      serviceData,
      almtPenerimaReducer,
      dataPcs,
      focusField,
    } = this.props;
    const remarksLabel = 'ATUR BERAT';
    return (
      <div>
        <DskripsiBrg {...this.props} text={leftSide[0]} autoFocus={focusField === 'deskripsiInput'} />
        <Service
          {...this.props}
          handleChange={handleChange}
          serviceData={serviceData}
          serviceType={serviceType}
          text={leftSide[1]}
        />
        <BlptBtn
          gridListBlpt={classes.gridListBlpt}
          koli={koli[0]}
          blpt={classes.blpt}
          handleChange={handleChange}
          inputLabelFocused={classes.inputLabelFocused}
          inputInkbarFocused={classes.inputInkbarFocused}
          idx={0}
          readOnly={readOnly}
        />
        <Pcs
          text={leftSide[3]}
          {...this.props}
          koli={koli}
          weightIcon={weightIcon}
          remarksLabel={remarksLabel}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    );
  }
}
export default withStyles(Styles)(leftSideGrid);
