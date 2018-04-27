import React, { Component } from "react";
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router";
import "./style.scss";
import Logo from "Components/Logo";
import { displayModal } from "Actions/modal_actions.js";
import { logOut } from "Actions/user_actions";
import Authorization from "Containers/Helpers/Authorization";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOut() {
      dispatch(logOut());
    },
    openEditNextWorkoutModal() {
      dispatch(
        displayModal("EditWorkoutContent", state => ({
          workoutId: state.workout.nextWorkoutId,
          title:'Edytor Najbliższego Treningu'
        }))
      );
    }
  };
};

class MainNavBar extends Component {
  render() {
    var { location } = this.props;

    return (
      <div className="main-navbar-container">
        <Navbar
          className="main-navbar"
          staticTop
          collapseOnSelect
          fixedTop
          fluid
        >
          <div>
            <Navbar.Header>
              <Navbar.Brand>
                <Logo />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse className="options">
              <Nav>
                <LinkContainer to="/aktualnosci">
                  <NavItem>Aktualnośći</NavItem>
                </LinkContainer>
                <LinkContainer to="/kalendarz">
                  <NavItem>Kalendarz</NavItem>
                </LinkContainer>
                <LinkContainer to="/galeria/albumy/1">
                  <NavItem>Galeria</NavItem>
                </LinkContainer>
                <LinkContainer to="/kontakt">
                  <NavItem>O Nas</NavItem>
                </LinkContainer>

                <Authorization allowedRoles={["couch"]}>
                  <NavDropdown
                    eventKey={3}
                    title="Panel Zarządzania"
                    id="basic-nav-dropdown"
                  >
                    <LinkContainer to="/panel-zarzadzania/treningi">
                      <NavItem>Treningi</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/panel-zarzadzania/Galeria">
                      <NavItem>Galeria</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/panel-zarzadzania/kalendarz">
                      <MenuItem>Kalendarz</MenuItem>
                    </LinkContainer>
                    <MenuItem divider />
                    <MenuItem header>Szybkie Akcje</MenuItem>

                    <MenuItem onSelect={this.props.openEditNextWorkoutModal}>
                      Edytuj Najbliższy Trening
                    </MenuItem>

                  </NavDropdown>
                </Authorization>
              </Nav>
              <Nav pullRight>
                <Authorization onlyGuest>
                  <LinkContainer
                    to={{
                      pathname: "/autoryzacja",
                      state: { underModalLocation: location }
                    }}
                  >
                    <NavItem>Zaloguj się</NavItem>
                  </LinkContainer>
                </Authorization>

                <Authorization onlyLoggedIn>
                  <NavItem onSelect={this.props.logOut}>Wyloguj się</NavItem>
                </Authorization>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}

MainNavBar.defaultProps = {
  navItems: []
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(withRouter(MainNavBar));
