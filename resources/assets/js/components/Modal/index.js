import React, { Component } from 'react';
import {Modal as BootstrapModal} from 'react-bootstrap'
import PropTypes from 'prop-types'
import _pick from 'lodash/pick'

import reduxModal from './redux_modal'

class Modal extends Component {
  constructor(props) {
    super(props);

    // this.headerProps = this.headerProps.bind(this)
    // this.modalProps = this.modalProps.bind(this)
  }
  render() {

    return (
      <BootstrapModal {...this.modalProps}>
        <BootstrapModal.Header {...this.headerProps}>
          <BootstrapModal.Title>{this.headerProps.title}</BootstrapModal.Title>
        </BootstrapModal.Header>
        {this.props.children}
      </BootstrapModal>
    );
  }

  get headerProps(){

    return _pick(this.props,['title','closeButton'])

  }

  get modalProps(){

    return _pick(this.props,['show','onHide'])

  }

}

Modal.defaultProps = {

  closeButton:true,
  title:'',
  hide:()=>{}

}

Modal.propTypes = {

  title:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  hide:PropTypes.func,

}

export {

  Modal,
  reduxModal

}

export default Modal;
