import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ReactNotifications from 'react-notification-system-redux';

class Notifications extends React.Component {

  render() {
    const {notifications} = this.props;

    return (
      <ReactNotifications
        notifications={notifications}

      />
    );
  }
}

Notifications.contextTypes = {
  store: PropTypes.object
};

Notifications.propTypes = {
  notifications: PropTypes.array
};

export default connect(
  state => ({ notifications: state.notifications })
)(Notifications);