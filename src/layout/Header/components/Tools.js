// @flow

import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
} from 'react-native';
import {Icon, IconButton, Avatar, Dialog, Modal} from 'material-ui';
import {DialogContent} from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles';
import {push} from 'react-router-redux';
import Slide from 'material-ui/transitions/Slide';

import ProfileDropdown from './ProfileDropdown';
import GlobalSearchTextField from './GlobalSearchTextField';
import NotificationButton from '../../../components/NotificationButton';
import getInitialName from '../../../helpers/getInitialName';

import type {
  GlobalSearchSuggestionItem,
  GlobalSearchState,
} from '../../../data/globalSearch/GlobalSearch-type';
import type {User} from '../../../data/user/User-type';
import type {RootState, Dispatch} from '../../../storeTypes';

type Props = {
  user: User,
  classes: Object,
  globalSearch: GlobalSearchState,
  requestGlobalSearchSuggestions: (searchText: string) => void,
  onGlobalSearchItemSelected: (suggestion: GlobalSearchSuggestionItem) => void,
  resetGlobalSearchSuggestions: () => void,
};

type State = {
  isProfileDropdownOpened: boolean,
  isGlobalSearchOpened: boolean,
  openOverlay: boolean,
};

const initialState = {
  isProfileDropdownOpened: false,
  isGlobalSearchOpened: false,
  openOverlay: false,
};

export class Tools extends React.Component<Props, State> {
  state = initialState;
  render() {
    let {
      user,
      classes,
      globalSearch,
      requestGlobalSearchSuggestions,
      onGlobalSearchItemSelected,
      resetGlobalSearchSuggestions,
    } = this.props;
    let {
      isProfileDropdownOpened,
      openOverlay,
      isGlobalSearchOpened,
    } = this.state;
    return (
      <View style={styles.root}>
        <IconButton onClick={() => this.setState({isGlobalSearchOpened: true})}>
          <Icon className={classes.icon} style={{fontSize: 30}}>
            search
          </Icon>
        </IconButton>

        {/*<NotificationButton badge={1} />*/}

        <TouchableOpacity
          onPress={() => {
            this.setState({
              isProfileDropdownOpened: !isProfileDropdownOpened,
              openOverlay: !openOverlay,
            });
          }}
          style={{marginLeft: 15}}
        >
          <Avatar>{getInitialName(user.name || '')}</Avatar>
        </TouchableOpacity>

        <ProfileDropdown user={user} isOpen={isProfileDropdownOpened} />

        {openOverlay ? (
          <TouchableWithoutFeedback onPress={() => this.setState(initialState)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        ) : null}

        <Dialog
          fullScreen
          open={isGlobalSearchOpened}
          onClose={() => {
            this.setState({isGlobalSearchOpened: false});
          }}
          transition={Transition}
        >
          <GlobalSearchTextField
            suggestions={globalSearch.suggestionList}
            onRequestSuggestions={requestGlobalSearchSuggestions}
            onClose={() => {
              this.setState({isGlobalSearchOpened: false});
              resetGlobalSearchSuggestions();
            }}
            onMenuSelected={onGlobalSearchItemSelected}
            isFetchingSuggestions={globalSearch.isLoading}
            resetSuggestion={resetGlobalSearchSuggestions}
          />
        </Dialog>
      </View>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    globalSearch: state.globalSearch,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    requestGlobalSearchSuggestions: (searchText: string) => {
      dispatch({
        type: 'GLOBAL_SEARCH_SUGGESTION_REQUESTED',
        searchText,
      });
    },
    onGlobalSearchItemSelected: (suggestion: GlobalSearchSuggestionItem) => {
      dispatch(push(suggestion.route));
    },
    resetGlobalSearchSuggestions: () => {
      dispatch({
        type: 'GLOBAL_SEARCH_RESET_SUGGESTION_REQUESTED',
      });
    },
  };
}

function Transition(props: Object) {
  return <Slide direction="up" {...props} />;
}

const themeStyles = (theme) => ({
  icon: {
    color: theme.palette.primary[900],
  },
});

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    cursor: 'default',
    zIndex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(themeStyles)(Tools),
);
