import React, { Component } from 'react';
import { Modal } from 'Components/Modal'
import PropTypes from 'prop-types'
import withReduxModalManager from './with_redux_modal_manager'

class ReduxModal extends Component {
  constructor(props) {
    super(props);

    this.hide = this.hide.bind(this)
  }
  render() {

    var { children, name, hideModal, ...props } = this.props
    console.log(this.props.isModalActive(name))
    return (
      <Modal {...props} onHide={this.hide} show={this.props.isModalActive(name)}>
        {children}
      </Modal>
    );
  }

  hide(){

    this.props.hideModal(this.props.name)

    this.props.onHide();
  }
}

ReduxModal.defaultProps = {

  // closeButton:true,
  // title:'',
  // hide:()=>{}
  onHide:() => {}

}

ReduxModal.propTypes = {

  // name:PropTypes.required,

}

ReduxModal = withReduxModalManager()(ReduxModal)

export {

  ReduxModal,
  withReduxModalManager,

}

export default ReduxModal
