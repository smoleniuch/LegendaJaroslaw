import React, { Component } from "react";
import {
  Nav,
  NavItem as BootstrapNavItem,
  Navbar,
  NavDropdown,
  MenuItem
} from "react-bootstrap";
import classNames from "classnames";
import { LinkContainer } from "react-router-bootstrap";
import { withRouter } from "react-router";
import "./style.scss";
import Logo from "Components/Logo";
import Authorization from "Containers/Helpers/Authorization";
import Icon from "Components/Icon";
import { displayModal } from "Actions/modal_actions.js";
import { logOut } from "Actions/user_actions";
import { connect } from "react-redux";

const NavItem = ({ title, active, className, ...props }) => {
  var isActive = props.className && props.className.includes("active");

  return (
    <BootstrapNavItem
      className={classNames(className, "custom-nav-item")}
      {...props}
    >
      <Icon size={22} className={classNames("active-icon",{active})} name="boxing-glove" />
      {title}
    </BootstrapNavItem>
  );
};

const LinkedNavItem = ({ to, title, ...props }) => {
  var isActive = props.className && props.className.includes("active");

  return (
    <LinkContainer to={to}>
      <NavItem {...{ title, ...props }} />
    </LinkContainer>
  );
};

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
          title: "Edytor Najbliższego Treningu"
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
                <LinkedNavItem to="/aktualnosci" title="Aktualnośći" />
                <LinkedNavItem to="/kalendarz" title="Kalendarz" />
                <LinkedNavItem to="/galeria/albumy/1" title="Galeria" />
                <LinkedNavItem to="/o-nas" title="O Nas" />

                <Authorization allowedRoles={["coach"]}>
                  <NavDropdown
                    eventKey={3}
                    title={<NavItem active={location.pathname.includes('panel-zarzadzania')} title="Panel Zarządzania"/>}
                    id="basic-nav-dropdown"
                  >
                    <MenuItem header>Panele</MenuItem>
                    <LinkedNavItem
                      to="/panel-zarzadzania/treningi"
                      title="Treningi"
                    />
                    <LinkedNavItem
                      to="/panel-zarzadzania/motywujace-cytaty"
                      title="Motywujące Cytaty"
                    />

                    <MenuItem divider />
                    <MenuItem header>Szybkie Akcje</MenuItem>
                    <NavItem
                      title="Edytuj Najbliższy Trening"
                      onSelect={this.props.openEditNextWorkoutModal}
                    />
                  </NavDropdown>
                </Authorization>
              </Nav>
              <Nav pullRight>
                <Authorization onlyGuest>
                  <LinkedNavItem
                    to={{
                      pathname: "/autoryzacja",
                      state: { underModalLocation: location }
                    }}
                    title="Zaloguj się"
                  />
                </Authorization>

                <Authorization onlyLoggedIn>
                  <NavItem onSelect={this.props.logOut} title="Wyloguj się" />
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
