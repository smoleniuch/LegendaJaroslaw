import React from 'react'
import { connect } from 'react-redux'
import { hideModal, displayModal } from 'Actions/modal_actions'
import wrapComponentName from 'Utilities/wrap_component_name'

const mapDispatchToProps = (dispatch) => {

  return {

    hideModal:(name, deleteIt) => dispatch(hideModal(name,deleteIt)),
    displayModal:(name, deleteIt) => dispatch(displayModal(name,deleteIt))

  }

}

const mapStateToProps = (state) => {

  return {

    isModalActive:(name) => state.modal.modals[name].show

  }

}

function withReduxModalManager(settings = {}){

  settings = {
    wrapComponentName:true,
    bindNameToActions:false,
    ...settings
  }

  const creator = (Component) => {

    class ReduxModal extends React.Component {

      constructor(props) {
        super(props);

        this.isModalActive = this.isModalActive.bind(this)
        this.displayModal = this.displayModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.bindNameToActions = this.bindNameToActions.bind(this)

        if(settings.bindNameToActions !== false){this.bindNameToActions()}
      }

      render(){
        var {
          isModalActive,
          displayModal,
          hideModal
        } = this

        return (

          <Component {...{...this.props, isModalActive,displayModal,hideModal}}  />

        )

      }

      isModalActive(name){
        return this.props.isModalActive(name)
      }

      displayModal(name){
        this.props.displayModal(name)
      }
      hideModal(name,deleteIt){

        this.props.hideModal(name,deleteIt)
      }

      bindNameToActions(){

        var methodsToBind = ['isModalActive','displayModal','hideModal']

        for(var method of methodsToBind){

          this[method] = this[method].bind(this,settings.bindNameToActions)

        }

      }

    }

    settings.wrapComponentName?wrapComponentName(ReduxModal,'withReduxModalManager'):null

    return connect(mapStateToProps, mapDispatchToProps)(ReduxModal)

  }


  return creator

}

export default withReduxModalManager
