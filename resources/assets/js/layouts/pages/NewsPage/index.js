import React, { Component } from 'react';


import NewsDashboard from 'Containers/Dashboards/NewsDashboard'
import SidePanel from 'Containers/SidePanels/NewsSidePanel'
import Page from 'Components/Page'
import './style.scss'

class NewsPage extends Component {

  render() {
    return (
      <Page className="news-page">
        <Page.Content>

          {/* <SidePanel /> */}
          <NewsDashboard />

        </Page.Content>
      </Page>
    );
  }

}

export default NewsPage;
