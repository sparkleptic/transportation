// @flow

import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Typography} from 'material-ui';

import maleProfilePicture from '../../../assets/icons/globalSearch/male_employee_hd.png';
import femaleProfilePicture from '../../../assets/icons/globalSearch/female_employee.png';

import type {Employee} from '../../../data/employee/Employee-type';

type Props = {
  info: Employee,
};

export default function PersonalInfo(props: Props) {
  let {info} = props;

  let gender = '';
  let profilePicture;
  switch (info.gender.toUpperCase()) {
    case 'M': {
      gender = 'Male';
      profilePicture = maleProfilePicture;
      break;
    }
    case 'F': {
      gender = 'Female';
      profilePicture = femaleProfilePicture;
      break;
    }
    default: {
      profilePicture = maleProfilePicture;
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        <Image source={profilePicture} style={styles.profilePicture} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <Typography
            variant="display1"
            style={StyleSheet.flatten(styles.title)}
          >
            {`${info.firstName} ${info.lastName || ''}`}
          </Typography>
          <Typography
            variant="subheading"
            style={StyleSheet.flatten(styles.field)}
          >
            {info.position.statusName}
          </Typography>
        </View>
        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Gender
          </Typography>
          <Typography variant="subheading">{gender}</Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Date of Birth
          </Typography>
          <Typography variant="subheading">{info.birthDate || ''}</Typography>
        </View>

        <View style={styles.section}>
          <Typography variant="body1" style={StyleSheet.flatten(styles.field)}>
            Node
          </Typography>
          <Typography variant="subheading">
            {info.nodeLocation.nodeCode}
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  section: {
    marginBottom: 10,
  },
  field: {
    color: 'grey',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
