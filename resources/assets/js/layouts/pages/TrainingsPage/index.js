import React, { Component } from 'react';

import TrainingsDashboard from 'Containers/Dashboards/TrainingsDashboard'
import Page from 'Components/Page'
import './style.scss'

class TrainingsPage extends Component {

  render() {
    return (
      <Page className='trainings-page'>
        <Page.Content>
          <TrainingsDashboard />
        </Page.Content>
      </Page>
    );
  }

}

export default TrainingsPage;
