// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Paper, TextField, Typography, Grid, Button} from 'material-ui';
import axios from 'axios';

import {jneLogo} from '../../CusIcons/CustomIcons';
import UserLinearprogress from '../UserLinearprogress';

import type {RootState, Dispatch} from '../../storeTypes';

type Props = {
  location: {state: {from: {pathname: string}}},
  history: {push: (params: any) => void},
  onLogin: (username: string, password: string, onSuccess: () => void) => void,
};

type State = {
  username: string,
  password: string,
  email: string,
  progressCout: boolean,
  forgetPassCout: boolean,
};

class LoginForm extends Component<Props, State> {
  state = {
    username: 'user_1',
    password: 'password',
    email: '',
    progressCout: false,
    forgetPassCout: false,
  };

  render() {
    let {username, password, email, progressCout, forgetPassCout} = this.state;
    return (
      <Grid xs={12} item>
        <Paper style={styles.paper}>
          {progressCout && <UserLinearprogress />}
          <div style={{padding: '50px 35px 20px 35px'}}>
            <img src={jneLogo} alt="logo" />
            <Typography type="headline">
              {forgetPassCout ? 'Forgot Password' : 'Sign In'}
            </Typography>
            <TextField
              style={styles.textField}
              onChange={this._handleChange}
              label={forgetPassCout ? 'Email' : 'Username'}
              name={forgetPassCout ? 'email' : 'username'}
              value={forgetPassCout ? email : username}
            />
            <br />
            <br />
            {!forgetPassCout && (
              <TextField
                type="password"
                value={password}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    // Do code here
                    ev.preventDefault();
                    this._handleSignIn();
                  }
                }}
                onChange={this._handleChange}
                style={styles.textField}
                label="Password"
                name="password"
              />
            )}
            {!forgetPassCout ? (
              <p
                style={{cursor: 'pointer', color: '#2A9FD8'}}
                onClick={this._changeCard}
              >
                Forget Password?
              </p>
            ) : (
              <p
                style={{cursor: 'pointer', color: '#2A9FD8'}}
                onClick={this._changeCard}
              >
                Get back to login?
              </p>
            )}
            <Button
              variant="raised"
              color="primary"
              style={{float: 'right'}}
              onClick={!forgetPassCout ? this._handleSignIn : null}
            >
              {forgetPassCout ? 'Send' : 'Sign in'}
            </Button>
          </div>
        </Paper>
      </Grid>
    );
  }

  _handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  _handleSignIn = () => {
    let {username, password} = this.state;
    let {history, location} = this.props;
    let {from} = location.state || {from: {pathname: '/'}};
    this.props.onLogin(username, password, () => {
      history.push(from);
    });
    this.setState({progressCout: true});
  };

  _changeCard = () => {
    this.setState({forgetPassCout: !this.state.forgetPassCout});
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onLogin: (username: string, password: string, onSuccess: () => void) => {
      dispatch({
        type: 'LOGIN_REQUESTED',
        username,
        password,
        onSuccess,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(LoginForm);

const styles = {
  paper: {
    margin: '8.9% 33%',
    width: 440,
    height: 440,
  },
  textField: {
    width: 372,
    marginBottom: 10,
  },
};
