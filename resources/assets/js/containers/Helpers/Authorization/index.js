import React, { Component } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get'

const mapStateToProps = (state) => {

  return {

    user:state.user

  }

}
/**
 * This class renders its children based on user state.
 * @type {class}
 */
class Authorization extends React.Component {
  constructor(props) {
    super(props);

    this.passAuthorizationTests = this.passAuthorizationTests.bind(this)
    this.passUserRoles = this.passUserRoles.bind(this)
    this.passLoginStatus = this.passLoginStatus.bind(this)
  }
  render() {
    // return this.props.children
    if(this.passAuthorizationTests()){

      return this.props.children

    }

    return ''


  }

  passAuthorizationTests(){

    return this.passUserRoles() && this.passLoginStatus();

  }

  passLoginStatus(){

    var isLoggedIn = _get(this.props,'user.isLoggedIn',false)
    if(this.props.onlyGuest){

      return isLoggedIn === false

    }

    if(this.props.onlyLoggedIn){

      return isLoggedIn === true

    }

    return true;
  }

  /**
   * Checks if user has specific roles (allowedRoles prop)
   * @return {boolean}
   */
  passUserRoles(){

    var { user, children, allowedRoles } = this.props
    var userRoles = _get(user,'roles',[])

    return [].concat(allowedRoles).every((allowedRole)=>userRoles.includes(allowedRole))

  }

}

Authorization.defaultProps = {

  allowedRoles:[],
  onlyLoggedIn:false,
  onlyGuest:false,

}

export default connect(mapStateToProps)(Authorization)
