import React from "react";
import _get from 'lodash/get'
import { connect } from "react-redux";
import { Route ,replace, go } from "Router";
import {compose} from "recompose";

import {infoNotification} from 'Actions/notificationSystemActions'


const mapStateToProps = state => ({
  user: state.user,
  location: state.router.location,
  prevLocation: state.router.prevLocation,
});

const PrivateRoute = ({ allowedUserRoles,infoNotification,prevLocation, user, replace, go, ...props }) => {
  var userRoles = _get(user,'roles', [])
  var passUserRolesTest = allowedUserRoles.some( role => userRoles.includes(role) )

  if (!user.isLoggedIn) {
    replace('/autoryzacja')
  } else if (!passUserRolesTest){

    setTimeout(() => infoNotification({message:'Zostałeś przekierowany z docelowej ścieżki z powodu braku dostępu.'}))
    var redirectTo = prevLocation?replace(prevLocation.pathname):'/aktualnosci'

    replace(redirectTo)
  }

  return <Route {...props} />;
};

PrivateRoute.defaultProps = {
  allowedUserRoles:[],
}

const enhance = compose(connect(mapStateToProps, {infoNotification,replace,go}));
export default enhance(PrivateRoute);
