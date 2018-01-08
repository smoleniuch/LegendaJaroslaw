import React, {Component} from 'react';
import {Nav, NavItem, Navbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import './style.scss'
import Logo from 'Components/Logo'
import { displayModal } from 'Actions/modal_actions.js'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {

  return {

      displayAuthModal:() => dispatch(displayModal('AuthModal'))

  }

}

class MainNavBar extends Component {

  render() {
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
              <LinkContainer to='/aktualnośći'><NavItem>Aktualnośći</NavItem></LinkContainer>
              <LinkContainer to='/treningi'><NavItem>Treningi</NavItem></LinkContainer>
              <LinkContainer to='/galeria'><NavItem>Galeria</NavItem></LinkContainer>
              <LinkContainer to='/kontakt'><NavItem>Kontakt</NavItem></LinkContainer>




            </Nav>
            <Nav pullRight>
              <NavItem onSelect={this.props.displayAuthModal}>Zaloguj się</NavItem>
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

export default connect(null, mapDispatchToProps)(MainNavBar);
