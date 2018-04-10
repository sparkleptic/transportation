// @flow

import notificationReducer from '../notificationReducer';

describe('notificationReducer', () => {
  it('should remove requested notification', () => {
    let initialState = {
      list: [
        {
          id: 1,
          text: 'notif 1',
        },
        {
          id: 2,
          text: 'notif 2',
        },
        {
          id: 3,
          text: 'notif 3',
        },
      ],
    };
    let newState = notificationReducer(initialState, {
      type: 'HIDE_NOTIFICATION_REQUESTED',
      notificationID: 2,
    });

    expect(newState).toEqual({
      list: [
        {
          id: 1,
          text: 'notif 1',
        },
        {
          id: 3,
          text: 'notif 3',
        },
      ],
    });
  });

  it('should removed the oldest item if there are two or more duplicate id', () => {
    let initialState = {
      list: [
        {
          id: 3,
          text: 'notif 1',
        },
        {
          id: 2,
          text: 'notif 2',
        },
        {
          id: 3,
          text: 'notif 3',
        },
      ],
    };
    let newState = notificationReducer(initialState, {
      type: 'HIDE_NOTIFICATION_REQUESTED',
      notificationID: 3,
    });

    expect(newState).toEqual({
      list: [
        {
          id: 3,
          text: 'notif 1',
        },
        {
          id: 2,
          text: 'notif 2',
        },
      ],
    });
  });
});
