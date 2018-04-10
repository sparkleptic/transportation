// @flow

export type NotificationState = {
  list: Array<Notification>,
};

export type NotificationAction =
  | {
      type: 'SHOW_NOTIFICATION_REQUESTED',
      notification: Notification,
    }
  | {
      type: 'HIDE_NOTIFICATION_REQUESTED',
      notificationID: number,
    };
