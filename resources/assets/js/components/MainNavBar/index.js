import React, { Component } from 'react';
import {Nav, NavItem, Navbar} from 'react-bootstrap'
import './style.scss'
class MainNavBar extends Component {

  render() {
    return (

      <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#">Legenda Jarosław</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>

      {this.props.navItems.map((navItem, i)=>{

        var {label} = navItem;

        return (
          <NavItem key={i}>{label}</NavItem>
        )

      })}

    </Nav>
  </Navbar.Collapse>
</Navbar>

    );
  }

}

MainNavBar.defaultProps = {

  navItems:[],

}

export default MainNavBar;
