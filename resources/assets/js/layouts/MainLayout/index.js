import React from 'react'
import {Route} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'

import Logo from 'Components/Logo'
import MainNavBar from 'Components/MainNavBar'
import NewsDashboard from 'Containers/NewsDashboard'
import TrainingsDashboard from 'Containers/TrainingsDashboard'

export default function({children}){



  return (
    <React.Fragment>
          <MainNavBar />
          <Route path="/aktualnośći" component={NewsDashboard} />
          <Route path="/treningi" component={TrainingsDashboard} />
    </React.Fragment>
  )

}
