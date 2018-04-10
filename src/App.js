import React from 'react';
import {withRouter} from 'react-router-dom';

import {userStoreConnector} from './store/redux-connect';
import Main from './layout/Main';

class App extends React.Component {
  componentDidCatch(error, info) {
    this.props.history.push('/error/500');
  }
  render() {
    return <Main UserStore={this.props} />;
  }
}
export default withRouter(userStoreConnector(App));
