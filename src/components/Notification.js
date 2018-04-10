// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Paper,
  Divider,
  IconButton,
  Avatar,
  Button,
  Snackbar,
} from 'material-ui';
import List, {ListItem} from 'material-ui/List';

// icons
import CloseIcon from 'material-ui-icons/Close';
import {Close} from 'material-ui-icons';

import type {RootState, Dispatch} from '../storeTypes';

const DEFAULT_MAX_NOTIFICATIONS = 5;
const DEFAULT_POSITION = {
  vertical: 'top',
  horizontal: 'right',
};

type Props = {
  notifications: Array<Notification>,
  position?: {
    vertical: string,
    horizontal: string,
  },
  maxNotifications?: number,
  onClose: (id: number) => void,
};

export function NotificationComponent(props: Props) {
  let {notifications, maxNotifications, position, onClose} = props;
  let max = maxNotifications || DEFAULT_MAX_NOTIFICATIONS;
  let showingNotifications = [...notifications].slice(0, max);
  let hiddenNotifications = [...notifications]
    .slice(max, notifications.length)
    .map((notif) => {
      onClose(notif.id);
    });

  return (
    <div>
      {showingNotifications.map((notif) => {
        return (
          <Snackbar
            key={notif.id}
            anchorOrigin={position || DEFAULT_POSITION}
            open={true}
            autoHideDuration={2000}
            onClose={() => {
              onClose(notif.id);
            }}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
              style: {
                marginTop: 70,
              },
            }}
            message={notif.text}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => {
                  onClose(notif.id);
                }}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        );
      })}
    </div>
  );
}

function mapStateToProps(state: RootState) {
  return {
    notifications: state.notification.list,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onClose: (notificationID: number) => {
      dispatch({
        type: 'HIDE_NOTIFICATION_REQUESTED',
        notificationID,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  NotificationComponent,
);
