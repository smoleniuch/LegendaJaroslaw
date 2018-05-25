import React, { Component } from 'react';

import Page from 'Components/Page'
import {Route} from 'Router'
import TrainingsManagementDashboard from 'Containers/Dashboards/TrainingsManagementDashboard'
import MotivationalQuotesManagementDashboard from 'Containers/Dashboards/MotivationalQuotesManagementDashboard'

class ManagementPanelPage extends Component {

  render() {

      var {match} = this.props

    return (
      <Page>
        <Page.Content>

          <Route path={`${match.url}/treningi`} component={TrainingsManagementDashboard}/>
          <Route path={`${match.url}/motywujace-cytaty`} component={MotivationalQuotesManagementDashboard}/>

        </Page.Content>
      </Page>
    );
  }

}

export default ManagementPanelPage;
