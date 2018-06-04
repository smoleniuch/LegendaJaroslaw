import React from 'react';
import { Route, matchPath, withRouter } from 'react-router-dom'
import { replace } from 'Router'
import _get from 'lodash/get'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  location:state.router.location
})

const ModalRoute = ({location, replace, defaultUnderModalPath, ...restProps }) => {

  var underModalLocation = _get(location, 'state.underModalLocation',{})

  if(
    matchPath(location.pathname, {path:restProps.path}) &&
    defaultUnderModalPath &&
    underModalLocation.pathname === undefined &&
    underModalLocation.pathname !== defaultUnderModalPath){

    replace(location.pathname,{

      underModalLocation:{
        pathname:defaultUnderModalPath
      }

    })

    return null
  }
  else {

    return (

      <Route {...restProps} />

    )

  }



};

ModalRoute.defaultProps = {

  defaultUnderModalPath:false

}

export default connect(mapStateToProps, {replace})(ModalRoute);
