import React from 'react'
import { connect } from 'react-redux'
import { hideModal } from 'Actions/modal_actions'
import wrapComponentName from 'Utilities/wrap_component_name'

const mapDispatchToProps = (dispatch) => {

  return {

    hide:(name, deleteIt) => dispatch(hideModal(name,deleteIt))

  }

}

function reduxModal(ModalComponent, options = {}){

  class ReduxModal extends React.Component {

    constructor(props) {
      super(props);

      this.hide = this.hide.bind(this)
    }

    render(){

      var { hide, ...props } = this.props

      return (

        <ModalComponent onHide={this.hide} hide={this.hide} {...props} />

      )

    }

    hide(deleteIt = true){

      this.props.hide(options.name)

    }

  }

  wrapComponentName(ReduxModal,'reduxModal')

  return connect(null, mapDispatchToProps)(ReduxModal)



}

function testReduxModal(options = {}){

  const creator = (ModalComponent) => {

    class ReduxModal extends React.Component {

      constructor(props) {
        super(props);

        this.hide = this.hide.bind(this)
      }

      render(){

        var { hide, ...props } = this.props

        return (

          <ModalComponent onHide={this.hide} hide={this.hide} {...props} />

        )

      }

      hide(deleteIt = true){

        this.props.hide(options.name)

      }

    }

    wrapComponentName(ReduxModal,'reduxModal')

    return connect(null, mapDispatchToProps)(ReduxModal)

  }


  return creator


}

export {

  testReduxModal,

}

export default testReduxModal
