import React, { Component } from 'react';
import Page from 'Components/Page';
import { Route, Switch, Redirect } from 'react-router-dom';
import GalleryDashboard from 'Containers/Dashboards/GalleryDashboard'

class GalleryPage extends Component {

  render() {
    return (
      <Page>
        <Page.Content>
          <GalleryDashboard />
        </Page.Content>
      </Page>
    );
  }

}

export default GalleryPage;
