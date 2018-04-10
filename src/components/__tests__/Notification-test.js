// @flow

import React from 'react';
import {Snackbar} from 'material-ui';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {NotificationComponent as Notification} from '../Notification';

Enzyme.configure({adapter: new Adapter()});

describe('Notification Componnet', () => {
  it('should render notification component as many as it list', () => {
    let props = {
      notifications: [
        {
          id: 1,
          text: 'first notif',
        },
        {
          id: 2,
          text: 'second notif',
        },

        {
          id: 3,
          text: 'third notif',
        },

        {
          id: 4,
          text: 'fourth notif',
        },
      ],
      onClose: jest.fn(),
    };
    let rendered = shallow(<Notification {...props} />);
    expect(rendered.find(Snackbar).length).toBe(props.notifications.length);
  });

  it('should remove the notification if it is exceed the max', () => {
    let onClose = jest.fn();
    let props = {
      notifications: [
        {
          id: 1,
          text: 'first notif',
        },
        {
          id: 2,
          text: 'second notif',
        },

        {
          id: 3,
          text: 'third notif',
        },

        {
          id: 4,
          text: 'fourth notif',
        },
      ],
      onClose,
      maxNotifications: 2,
    };
    let rendered = shallow(<Notification {...props} />);

    expect(rendered.find(Snackbar).length).toBe(2);
    expect(
      rendered
        .find(Snackbar)
        .at(0)
        .props().message,
    ).toBe(props.notifications[0].text);
    expect(
      rendered
        .find(Snackbar)
        .at(1)
        .props().message,
    ).toBe(props.notifications[1].text);

    expect(onClose).toHaveBeenCalledTimes(2);
    expect(onClose.mock.calls[0][0]).toEqual(props.notifications[2].id);
    expect(onClose.mock.calls[1][0]).toEqual(props.notifications[3].id);
  });
});
