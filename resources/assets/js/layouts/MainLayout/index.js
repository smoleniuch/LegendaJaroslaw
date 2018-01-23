import React from 'react'
import {Route} from 'react-router-dom'
import {Grid, Row, Col} from 'react-bootstrap'

import Logo from 'Components/Logo'
import MainNavBar from 'Containers/MainNavBar'
import './style.scss'
export default function({children}){



  return (
    <div className="app-layout">
          <MainNavBar />
          {children}
    </div>
  )

}
