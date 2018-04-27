import React, { Component } from 'react';

import Page from 'Components/Page'
import Dashboard from 'Containers/Dashboards/TrainingsManagementDashboard'

class ManagmentPanelPage extends Component {

  render() {
    return (
      <Page>
        <Page.Content>

          <Dashboard />

        </Page.Content>
      </Page>
    );
  }

}

export default ManagmentPanelPage;
