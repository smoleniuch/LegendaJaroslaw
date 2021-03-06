import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { matchPath } from 'react-router'

import { hideModal, displayModal } from 'Actions/modal_actions'
import wrapComponentName from 'Utilities/wrap_component_name'
import _get from 'lodash/get'

const mapStateToProps = (state) => {

  return {

    reduxLocation:state.router.location

  }

}

const mapDispatchToProps = (dispatch) => {

  return {

    push:(args) => dispatch(push(args))

  }

}

function withRouterHelpers(Component){

    class RouterHelper extends React.Component {

      constructor(props) {
        super(props);

        this.displayUnderModalLocation = this.displayUnderModalLocation.bind(this)
        this.matchCurrentPath = this.matchCurrentPath.bind(this)
        this.getCurrentUrlParams = this.getCurrentUrlParams.bind(this)
      }

      render(){

        var { reduxLocation, push, ...props } = this.props

        return (

          <Component
            displayUnderModalLocation={this.displayUnderModalLocation}
            matchCurrentPath={this.matchCurrentPath}
            getCurrentUrlParams={this.getCurrentUrlParams}
            {...props}/>

        )

      }

      /**
       * Redirect to previous premodal location if it exists
       * If not,redirect to alternative url
       * It is helpfull when we want to hide modal that is displayed based on url.
       * @param  {String} [alternative='/'] [description]
       * @return {[type]}                   [description]
       */
      displayUnderModalLocation(alternative = '/'){

        var underModalLocation = _get(this.props.reduxLocation, 'state.underModalLocation');

        if(underModalLocation){

          // this.props.push(underModalLocation)

        }
        this.props.push(underModalLocation || alternative)

      }

      matchCurrentPath(description){

        var currentLocationPathname = this.props.reduxLocation.pathname
        var underModalLocationPathName = _get(this.props.reduxLocation, 'state.underModalLocation');

        // if current url doesnt match path, check if its under modal path
        return matchPath(currentLocationPathname,description) || matchPath(underModalLocationPathName,description)

      }

      getCurrentUrlParams(pathDescription){

        return _get(matchPath(this.props.reduxLocation.pathname,pathDescription),`params`,{})

      }

    }

    wrapComponentName(RouterHelper,'withRouterHelper')

    return connect(mapStateToProps,mapDispatchToProps)(RouterHelper)


}

export default withRouterHelpers
