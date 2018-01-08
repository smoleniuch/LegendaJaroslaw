import React, { Component } from 'react';
import {Modal, reduxModal} from 'Components/Modal';



class AuthModal extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <Modal title='Panel Logowania' {...this.props}>

        Im Auth Modal

      </Modal>
    );
  }

  componentDidMount(){

    // setTimeout(this.props.hide,1000)

  }

}

AuthModal = reduxModal(AuthModal, {name:'AuthModal'})
export {
  AuthModal
}
