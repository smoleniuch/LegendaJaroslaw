import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import { compose } from 'recompose'
import importAll from 'Utilities/import_all'
import { withReduxModalManager } from 'Components/ReduxModal'
import { hideModal } from 'Actions/modal_actions'
import ModalSwitch from './ModalSwitch'
import Modal from 'Components/Modal'

const Modals = importAll(require.context('./Modals',true,/index\.js/))
const ModalContents = importAll(require.context('./ModalContents',true,/index\.js/))

const mapStateToProps = (state) => {

  return {

    modals:Object.values(state.modal.modals),
    activeRequest:state.activeRequest.modal !== undefined,
  }

}

const mapDispatchToProps = dispatch => ({
  dispatch,
  hideModal:(content)=>dispatch(hideModal(content))
})

class ModalContainer extends Component {

  constructor(props) {
    super(props);

  }

  render() {


    return (
      <div>
        <ModalSwitch />

        {this.props.modals.map((modal, i) => {
          var { content, show,  ...props } = modal
          var ContentConstructor = ModalContents[content]
          return (
            <Modal key={i} onHide={this.props.hideModal.bind(null,content)} show={show} >
              <ContentConstructor activeRequest={this.props.activeRequest} dispatchByModal={this.dispatchByModal} hideModal={this.props.hideModal.bind(null,content)} {...props}/>
            </Modal>
          )

        })}

      </div>
    );
  }

  /**
   * This applies modal scope by default to each action.
   * This will help showing loading state when some requests fire up.
   */
  dispatchByModal = (action) => {

    action = {...action, payload:{scope:'modal', ...action.payload}}

    return this.props.dispatch(action)
  }




}

export default connect(mapStateToProps,mapDispatchToProps)(ModalContainer);
