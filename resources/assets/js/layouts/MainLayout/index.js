import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import Logo from 'Components/Logo'
import MainNavBar from 'Components/MainNavBar'

export default function({children}){



  return (

    <Grid>
      <Row>
        <Logo />
        <MainNavBar navItems={[

          {label:'Aktualnośći'},
          {label:'Treningi'},
          {label:'Galeria'},
          {label:'Kontakt'},

        ]}/>
      </Row>

      <Row>

      </Row>

    </Grid>

  )

}
