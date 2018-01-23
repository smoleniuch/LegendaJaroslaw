import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux'
const history = createHistory()

import ModalContainer from 'Containers/ModalContainer'
import MainLayout from 'Layouts/MainLayout'
import NewsPage from 'Pages/NewsPage'
import TrainingsPage from 'Pages/TrainingsPage'

const Router = () => {

  return (

    <ConnectedRouter history={history}>
      <div>

        <MainLayout>
          <Switch>
            <Route path="/aktualnośći" component={NewsPage} />
            <Route path="/treningi" component={TrainingsPage} />
            <Redirect to='/aktualnośći' />
          </Switch>

          <ModalContainer />

        </MainLayout>

      </div>
    </ConnectedRouter>

  )

}

export {

  history,
  Router

}