import React from 'react'
import {Route} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'

import Logo from 'Components/Logo'
import MainNavBar from 'Containers/MainNavBar'
import NewsDashboard from 'Containers/NewsDashboard'
import TrainingsDashboard from 'Containers/TrainingsDashboard'
import './style.scss'
export default function({children}){



  return (
    <div className="app-layout">
          <MainNavBar />
          <Route path="/aktualnośći" component={NewsDashboard} />
          <Route path="/treningi" component={TrainingsDashboard} />
    </div>
  )

}
