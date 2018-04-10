import {connect} from 'react-redux';
import {userAction, userSettingsAction, headerAction} from './actions';
import {withRouter} from 'react-router-dom';

const connectorTmplt = (actions) =>
  connect(actions.mapStateToProps, actions.mapDispatchToProps);

export const userStoreConnector = (component) =>
  connectorTmplt(userAction)(component);

export const userSettingConnector = (component) =>
  connectorTmplt(userSettingsAction)(component);

export const headerConnector = (component) =>
  connectorTmplt(headerAction)(component);
