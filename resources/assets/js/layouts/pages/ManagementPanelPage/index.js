import React, { Component } from 'react';

import Page from 'Components/Page'
import Dashboard from 'Components/Dashboard'

class ManagmentPanelPage extends Component {

  render() {
    return (
      <Page className="news-page">
        <Page.Content>

          <Dashboard>
            im managment
          </Dashboard>

        </Page.Content>
      </Page>
    );
  }

}

export default ManagmentPanelPage;
