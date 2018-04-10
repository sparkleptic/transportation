import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto'
import './index.css';
import App from './App';
import UserStore from './store';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {indigo, blue, grey, red} from 'material-ui/colors';
import CssBaseline from 'material-ui/CssBaseline';
import 'react-block-ui/style.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactMaterialUiNotifications from './components/ReactMaterialUiNotifications';

import Notification from './components/Notification';
import {setPageIsDirty} from './actions/navigationAction';

injectTapEventPlugin();
const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorLeft: {
        backgroundColor: red[600],
      },
    },
    MuiButton: {
      root: {
        fontWeight: 600,
      },
      raisedPrimary: {
        backgroundColor: '#323990',
      },
    },
  },
  palette: {
    primary: {
      ...indigo,
      900: '#323990',
    },
    secondary: {
      ...blue,
      400: '#4dd0e1',
    },
    default: {
      ...grey,
      50: '#ffffff',
    },
  },
  
});

import {history} from './store';

history.listen((location, action) => {
  UserStore.dispatch(setPageIsDirty(false));
});

const Root = (
  <BrowserRouter>
    <Provider store={UserStore}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ReactMaterialUiNotifications
          desktop={true}
          transitionName={{
            leave: 'dummy',
            leaveActive: 'fadeOut',
            appear: 'dummy',
            appearActive: 'zoomInUp',
          }}
          transitionAppear={true}
          transitionLeave={true}
        />
        <App />
        <Notification />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(Root, document.querySelector('#root'));
