/**
 *  material design spec compliant notifications for react and material-ui users
 */
import React, {cloneElement, Component} from 'react';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';

import Paper from 'material-ui/Paper';
import List, {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';

import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';
// icons
import {Close} from 'material-ui-icons';

// this will store the notifications and their count to track them and also maxNotifications for use in internal functions
let notifications = [],
  count = 0,
  maxNotifications;
const styles = (theme) => ({
  close: {
    top: theme.spacing.unit * 4,
  },
});
export default class ReactMaterialUiNotifications extends Component {
  static muiPropTypes = {
    /**
     * Desktop device or touch device
     */
    desktop: PropTypes.bool,
    /**
     * maximum number of notifications to display
     */
    maxNotifications: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * root component's style
     */
    rootStyle: PropTypes.object,
  };

  /**
   * default props
   */
  static defaultProps = {
    maxNotifications: Infinity,
    rootStyle: {
      bottom: 20,
      right: 25,
    },
  };

  /*static contextTypes = {
        muiTheme: PropTypes.object.isRequired
    }*/

  /**
   * copy some values to global for use in internal functions
   */
  componentWillMount() {
    notifications = [];
    maxNotifications = this.props.maxNotifications;
  }

  // add notification method
  static showNotification = (notification) => {
    let tempNotifications = notifications;
    // push a new notification to notifications
    notification.open = true;
    notification.count = count;
    tempNotifications.push(notification);
    // filter and keep only the open ones
    tempNotifications = tempNotifications.filter(
      ReactMaterialUiNotifications.filterOpen,
    );
    // shuffle notifications and set actual notifications to the temp ones to update render
    notifications = ReactMaterialUiNotifications.shuffleNotifications(
      tempNotifications,
    );
    // update counter
    count++;
  };

  /**
   * filter out and only keep the open notifications
   * @method
   * @param  {object} notification [a notification object]
   */
  static filterOpen = (notification) => notification.open;

  /**
   * perform operations like capping on the operations before doing them
   */
  static shuffleNotifications = (tempNotifications) => {
    if (tempNotifications.length > maxNotifications) {
      for (let i in tempNotifications) {
        if (
          typeof tempNotifications[i] === 'object' &&
          (!tempNotifications[i].hasOwnProperty('priority') ||
            !tempNotifications[i].priority)
        ) {
          tempNotifications.splice(i, 1);
          if (tempNotifications.length === maxNotifications) {
            break;
          }
        }
      }
    }
    /**
     * sort the priority notifications to the top
     */
    tempNotifications.sort((a, b) => {
      const priorityA = a.priority,
        priorityB = b.priority;
      if (!priorityA && priorityB) {
        return 1;
      } else if (priorityA && !priorityB) {
        return -1;
      }
      // other cases they are considered same
      return 0;
    });
    return tempNotifications;
  };

  // merge local styles and overriding styles and return it
  getStyle = () => {
    const style = {
      position: 'fixed',
      zIndex: 1,
      minWidth: 325,
    };

    return Object.assign(style, this.props.rootStyle);
  };

  /**
   * get the props we want to forward to the notification
   */
  getProps = (props) => {
    let {children, rootStyle, maxNotifications, ...pProps} = this.props;
    return Object.assign(props, pProps);
  };

  removeNotification(index) {
    notifications.splice(index, 1);
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        {notifications.map((props, index) => {
          return (
            <Notification
              removeNotification={() => {
                this.removeNotification(index);
              }}
              open={true}
              key={props.count}
              {...this.getProps(props)}
            />
          );
        })}
      </div>
    );
  }
}

class Notification extends Component {
  onCloseNotification = () => {
    this.props.removeNotification();
  };
  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={true}
          autoHideDuration={6000}
          onClose={this.onCloseNotification}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.text}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.onCloseNotification}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
