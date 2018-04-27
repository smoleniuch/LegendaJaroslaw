import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch, Redirect, matchPath} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'
import _get from 'lodash/get'
const history = createHistory()

import ModalContainer from 'Containers/ModalContainer'
import Notifications from 'Containers/Notifications'
import MainLayout from 'Layouts/MainLayout'
import NewsPage from 'Pages/NewsPage'
import CalendarPage from 'Pages/CalendarPage'
import GalleryPage from 'Pages/GalleryPage'
import ManagementPanelPage from 'Pages/ManagementPanelPage'

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      location:history.location

    }
    this.onRouteChange = this.onRouteChange.bind(this)
    history.listen(this.onRouteChange)
  }
  render() {
   var location = _get(this.state,'location.state.underModalLocation',this.state.location)

    return (

      <ConnectedRouter history={history}>
        <div>

          <MainLayout>

                <Switch location={location}>
                <Route path='/aktualnosci' component={NewsPage}/>
                <Route path='/galeria/albumy/:albumId' component={GalleryPage}/>
                <Route path='/kalendarz' component={CalendarPage}/>
                <Route path='/panel-zarzadzania' component={ManagementPanelPage}/>
                </Switch>

                <ModalContainer />

                <Notifications />
          </MainLayout>

        </div>
      </ConnectedRouter>

    )
  }

  onRouteChange(location){

    this.setState({location})

  }

}

export default Router;


export {

  history,
  Router

}
