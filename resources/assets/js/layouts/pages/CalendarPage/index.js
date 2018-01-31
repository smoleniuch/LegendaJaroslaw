import React, { Component } from 'react';

import CalendarDashboard from 'Containers/Dashboards/CalendarDashboard'
import Page from 'Components/Page'
import './style.scss'

class CalendarPage extends Component {

  render() {
    return (
      <Page className='trainings-page'>
        <Page.Content>
          <CalendarDashboard />
        </Page.Content>
      </Page>
    );
  }

}

export default CalendarPage;
