import React, { Component } from 'react';
import {Modal as BootstrapModal} from 'react-bootstrap'
import PropTypes from 'prop-types'
import _pick from 'lodash/pick'
import Content from './Content'
import LoadingBar from 'Components/LoadingBar'
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
        <div className="loading-bar-container">
          <LoadingBar scope='modal'/>
        </div>
        {this.props.children}
      </BootstrapModal>
    );
  }

  get headerProps(){

    return _pick(this.props,['title','closeButton'])

  }

  get modalProps(){

    return _pick(this.props,['show','onHide','bsSize'])

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
  Content,
  reduxModal

}

export default Modal;
