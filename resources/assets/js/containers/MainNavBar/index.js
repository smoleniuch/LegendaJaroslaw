import React, {Component} from 'react';
import {Nav, NavItem, Navbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { withRouter } from 'react-router'
import './style.scss'
import Logo from 'Components/Logo'
import { displayModal } from 'Actions/modal_actions.js'
import { logOut } from 'Actions/user_actions'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {

  return {

    user:state.user

  }

}

const mapDispatchToProps = (dispatch) => {

  return {

      logOut:() => dispatch(logOut())
  }

}

class MainNavBar extends Component {

  render() {

    var { location } = this.props

    return (<div className="main-navbar-container">

      <Navbar className="main-navbar" staticTop collapseOnSelect fixedTop fluid>
        <div>
          <Navbar.Header>

            <Navbar.Brand>
              <Logo/>

            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse className="options">
            <Nav>
              <LinkContainer to='/aktualnosci'><NavItem>Aktualnośći</NavItem></LinkContainer>
              <LinkContainer to='/kalendarz'><NavItem>Kalendarz</NavItem></LinkContainer>
              <LinkContainer to='/galeria/albumy/1'><NavItem>Galeria</NavItem></LinkContainer>
              <LinkContainer to='/kontakt'><NavItem>O Nas</NavItem></LinkContainer>
            </Nav>
            <Nav pullRight>

              {!this.props.user.isLoggedIn?

                <LinkContainer to={{pathname:'/autoryzacja',state:{underModalLocation:location}}} ><NavItem>Zaloguj się</NavItem></LinkContainer>:

                <NavItem onSelect={this.props.logOut}>Wyloguj się</NavItem>

              }



            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>);
  }


}

MainNavBar.defaultProps = {

  navItems: []

}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(withRouter(MainNavBar));
