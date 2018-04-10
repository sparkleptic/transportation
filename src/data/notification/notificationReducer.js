// @flow

import type {NotificationState, NotificationAction} from './Notification-type';

const initialState = {
  list: [],
};

export default function notificationReducer(
  state: NotificationState = initialState,
  action: NotificationAction,
) {
  switch (action.type) {
    case 'SHOW_NOTIFICATION_REQUESTED': {
      return {
        ...state,
        list: [action.notification, ...state.list],
      };
    }
    case 'HIDE_NOTIFICATION_REQUESTED': {
      let {notificationID} = action;
      let {list} = state;
      let reversedList = list.reverse();
      let removeIndex = reversedList.findIndex(
        (notif) => notif.id === notificationID,
      );
      let newNotifications = [...reversedList];
      if (removeIndex > -1) {
        newNotifications.splice(removeIndex, 1);
      }
      return {
        ...state,
        list: [...newNotifications].reverse(),
      };
    }
    case 'SIGN_OUT_SUCCEED': {
      return initialState;
    }
    default:
      return state;
  }
}
