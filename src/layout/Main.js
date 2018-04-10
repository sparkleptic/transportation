import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {View, ActivityIndicator} from 'react-native';
import {ConnectedRouter} from 'react-router-redux';
import {Redirect} from 'react-router';
import LayoutWrapper from './LayoutWrapper';
import {routes} from './routes';


// import AuthChecker from '../components/AuthChecker';

import LoginForm from '../pages/LoginForm';
import NewTransactions from '../pages/Home';


import {history} from '../store';

const Main = (props) => {
  let {auth, ...otherProps} = props;
  let content;
  if (!auth.token && auth.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          height: '100vh',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  } else if (!auth.token && !auth.isLoading) {
    content = (
      <Route
        render={({location}) => {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {from: location},
              }}
            />
          );
        }}
      />
    );
  } else {
    content = routes.map((page, i) => (
      <LayoutWrapper
        key={page.pathName}
        exact={page.exact ? true : false}
        path={page.pathName}
        layout={page.headerComponent}
        component={page.Component}
      />
    ));
  }
  return (
    <ConnectedRouter history={history}>
{/*<<<<<<< HEAD*/}
      {/*<View>
        <Route render={ ({location}) => { return <AuthChecker location={location} />;}} />
        {routes.map((page, i) => (
          <LayoutWrapper
            key={page.pathName}
            exact={page.exact ? true : false}
            path={page.pathName}
            layout={page.headerComponent}
            component={page.Component}
          />
        ))}
      </View>*/}
{/*=======*/}
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        {content}
        <Redirect from="*" to="/error/404" />
      </Switch>
{/*>>>>>>> origin/kodefox_dev*/}
    </ConnectedRouter>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Main);
