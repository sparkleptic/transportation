// @flow

import React from 'react';
import {View, Image} from 'react-native';
import {Typography, Button} from 'material-ui';
import {Route} from 'react-router';

import logo from '../../assets/images/logo.png';
import {errorMessage, type ErrorMessage} from './constants';
import themeColors from '../../constants/colors';

type Props = {
  errorCode: string,
};

export default function ErrorPage(props: Props) {
  let {errorCode} = props;
  let message: ErrorMessage = errorMessage[errorCode] || errorMessage[`500`];
  return (
    <Route>
      {({history}) => {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: '100%',
              minHeight: '100vh',
            }}
          >
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
              <Image source={logo} style={{width: 150, height: 150}} />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: 20,
                backgroundColor: themeColors.red,
              }}
            >
              <Typography
                variant="display2"
                style={{color: 'white', fontWeight: 'bold'}}
              >
                {`${errorCode}: ${message.title}`}
              </Typography>
              <Typography variant="title" style={{color: 'white'}}>
                {message.description}
              </Typography>
              {message.showBackButton && (
                <View style={{marginTop: 10, width: 200}}>
                  <Button
                    variant="raised"
                    onClick={() => {
                      history.goBack();
                    }}
                    color="primary"
                  >
                    Back to previous page
                  </Button>
                </View>
              )}
            </View>
          </View>
        );
      }}
    </Route>
  );
}
