import React, { Component } from 'react';

import Page from 'Components/Page'
// import PrivateRoute from 'Router/PrivateRoute'
import TrainingsManagementDashboard from 'Containers/Dashboards/TrainingsManagementDashboard'
import MotivationalQuotesManagementDashboard from 'Containers/Dashboards/MotivationalQuotesManagementDashboard'

class TrainingsManagementPage extends Component {

  render() {
    return (
      <Page>
        <Page.Content>

          <TrainingsManagementDashboard />

        </Page.Content>
      </Page>
    );
  }

}

export default TrainingsManagementPage;
