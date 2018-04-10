// @flow

import React from 'react';
import {connect} from 'react-redux';
import {View, ActivityIndicator} from 'react-native';
import {Redirect} from 'react-router';

import type {AuthState} from '../data/auth/Auth-type';
import type {RootState} from '../storeTypes';

type Props = {
  location: {pathname: string},
  auth: AuthState,
};

export function AuthChecker(props: Props) {
  let {auth, location} = props;

  if (!auth.token && location.pathname !== '/login') {
    if (auth.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
  return null;
}

function mapStateToProps(state: RootState) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AuthChecker);
