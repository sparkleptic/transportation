// @flow

import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Typography, List, ListItem, ListItemText} from 'material-ui';

import themeColors from '../../../constants/colors';
import getInitialName from '../../../helpers/getInitialName';

import type {User} from '../../../data/user/User-type';
import type {Dispatch} from '../../../storeTypes';
import { Link } from 'react-router-dom'



type Props = {
  user: User,
  isOpen: boolean,
  onLogoutClick: () => void,
};


/*
  TODO: user position
*/

export function ProfileDropdown(props: Props) {
  let {user, isOpen, onLogoutClick} = props;
  if (!isOpen) {
    return null;
  }


    let h3Tag = {
      overFlow: 'hidden',
      maxWidth: '200px',
      // marginRight: 24
  }
  return (
    <View style={styles.root}>
      <View style={styles.avatarContainer}>
        <Avatar style={{...StyleSheet.flatten(styles.avatar)}}>
          {getInitialName(user.name)}
        </Avatar>
        <View style={{paddingLeft: 10, overflow: 'hidden', maxWidth: '200px',}}>
          <Typography
            variant="subheading"
            style={{...StyleSheet.flatten([styles.avatarText, styles.name, ])}}

          >
            {user.name}
          </Typography>
          <Typography
            variant="body2"
            style={{...StyleSheet.flatten(styles.avatarText)}}

          >
            Operational Manager at JNE
          </Typography>
        </View>
      </View>
      <View>
        <List component="nav">
          <ListItem button>
            <Link style={{textDecoration: 'none'}} to={{ pathname: '/myprofile' }} ><ListItemText primary="My Profile" /></Link>


          </ListItem>
          <ListItem button onClick={onLogoutClick}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 300,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    zIndex: 2,
  },
  avatarContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: themeColors.red,
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  avatarText: {
    color: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
  },
});

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onLogoutClick: () => {
      dispatch({
        type: 'SIGN_OUT_REQUESTED',
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(ProfileDropdown);
