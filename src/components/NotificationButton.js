// @flow

import React from 'react';
import {IconButton, Icon} from 'material-ui';
import {withStyles} from 'material-ui/styles';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  onClick: () => void,
  badge?: number,
  badgeContainerStyle?: StyleSheetType,
  badgeTextStyle?: StyleSheetType,
  iconStyle?: StyleSheetType,
  classes: Object,
};

export function NotificationButton(props: Props) {
  let {
    badge,
    onClick,
    badgeContainerStyle,
    badgeTextStyle,
    iconStyle,
    classes,
  } = props;
  return (
    <View style={styles.root}>
      <IconButton onClick={onClick}>
        <Icon
          className={classes.icon}
          style={{...StyleSheet.flatten([styles.notifIcon, iconStyle])}}
        >
          notifications
        </Icon>
      </IconButton>
      <View
        style={[
          styles.badgeContainer,
          badgeContainerStyle,
          !badge && styles.noNotifBadgeContainer,
        ]}
      >
        <Text
          style={[
            styles.bagdeText,
            badgeTextStyle,
            !badge && styles.noNotifBagdeText,
          ]}
        >
          {badge}
        </Text>
      </View>
    </View>
  );
}

const themeStyles = (theme) => ({
  icon: {
    color: theme.palette.primary[900],
  },
});

export default withStyles(themeStyles)(NotificationButton);

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  notifIcon: {
    fontSize: 30,
  },
  bagdeText: {
    color: 'white',
  },
  noNotifBadgeContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  noNotifBagdeText: {
    color: 'white',
  },
});
