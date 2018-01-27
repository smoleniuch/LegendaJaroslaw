import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch, Redirect, matchPath} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'
const history = createHistory()
import _get from 'lodash/get'

import ModalContainer from 'Containers/ModalContainer'
import MainLayout from 'Layouts/MainLayout'
import NewsPage from 'Pages/NewsPage'
import TrainingsPage from 'Pages/TrainingsPage'
import GalleryPage from 'Pages/GalleryPage'


class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      prevLocation:null,
      currentLocation:history.location

    }

    this.onLocationChange = this.onLocationChange.bind(this)
    this.renderWithModalSupport = this.renderWithModalSupport.bind(this)
    this.matchPath = this.matchPath.bind(this)

    history.listen(this.onLocationChange)
  }
  render() {

    return (

      <ConnectedRouter history={history}>
        <div>

          <MainLayout>

              <Route render={this.renderWithModalSupport}/>

            <ModalContainer />

          </MainLayout>

        </div>
      </ConnectedRouter>

    )
  }

  onLocationChange(location){

    this.setState((prevState) => (

      {
        currentLocation:location,
        prevLocation:prevState.currentLocation
      }

    ))

  }

  renderWithModalSupport({location, match}){
    console.log(this.matchPath({path:'/galeria/albumy/:currentGalleryId'}))
    if( this.matchPath({path:'/galeria/albumy/:currentGalleryId'})){ return <GalleryPage /> }
    if( this.matchPath({path:'/aktualnośći'}) || this.state.prevLocation === null){ return <NewsPage /> }
    if( this.matchPath({path:'/treningi'})){ return <TrainingsPage /> }
    else {return <Redirect path='/' to='/aktualnośći' />}
    return null
  }

  matchPath(path){

    return !!(matchPath(history.location.pathname, path) || matchPath(_get(history,'location.state.preModalLocation'),path))

  }

}

export default Router;


export {

  history,
  Router

}
