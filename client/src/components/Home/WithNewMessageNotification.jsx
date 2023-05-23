import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tinycon from 'tinycon';

import { beep } from '@/utils/notifications';

const mapStateToProps = state => {
  return {
    activities: state.activities.items,
    unreadMessageCount: state.app.unreadMessageCount,
    windowIsFocused: state.app.windowIsFocused,
    soundIsEnabled: state.app.soundIsEnabled,
    room: state.room,
  };
};


const WithNewMessageNotification = WrappedComponent => {
  return connect(
    mapStateToProps,
  )(
    class WithNotificationHOC extends Component {
      state = { lastMessage: null, unreadMessageCount: 0 };

      static getDerivedStateFromProps(nextProps, prevState) {
        const {
          room: { id: roomId },
          activities,
          soundIsEnabled,
          unreadMessageCount,
          windowIsFocused,
        } = nextProps;

        if (activities.length === 0) {
          return null;
        }

        const lastMessage = activities[activities.length - 1];
        const { username, type, text, fileName, locked, newUsername, currentUsername, action } = lastMessage;

        if (lastMessage !== prevState.lastMessage && !windowIsFocused) {
          if (soundIsEnabled) beep.play();
        }

        if (unreadMessageCount !== prevState.unreadMessageCount) {
          Tinycon.setBubble(unreadMessageCount);
        }

        return { lastMessage, unreadMessageCount };
      }


      render() {
        // Filter props
        const {
          room,
          activities,
          motificationIsAllowed,
          soundIsEnabled,
          unreadMessageCount,
          windowIsFocused,
          ...rest
        } = this.props;
        return <WrappedComponent {...rest} />;
      }
    },
  );
};

export default WithNewMessageNotification;
