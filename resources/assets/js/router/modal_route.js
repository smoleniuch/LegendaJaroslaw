import React from 'react';
import { Route, matchPath, withRouter } from 'react-router-dom'
import _get from 'lodash/get'

const ModalRoute = ({location, match, history, defaultUnderModalPath, ...restProps }) => {

  var underModalLocation = _get(location, 'state.underModalLocation',{})

  if(
    matchPath(location.pathname, {path:restProps.path}) &&
    defaultUnderModalPath &&
    underModalLocation.pathname === undefined &&
    underModalLocation.pathname !== defaultUnderModalPath){

    history.replace(location.pathname,{

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

export default withRouter(ModalRoute);
