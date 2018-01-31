import React, { Component } from 'react';
import {Modal as BootstrapModal} from 'react-bootstrap'
import PropTypes from 'prop-types'
import _pick from 'lodash/pick'
import Content from './Content'
import LoadingBar from 'Components/LoadingBar'
import Icon from 'Components/Icon'

import './style.scss'

class Modal extends Component {
  constructor(props) {
    super(props);

    // this.headerProps = this.headerProps.bind(this)
    // this.modalProps = this.modalProps.bind(this)
  }
  render() {

    return (
      <BootstrapModal {...this.modalProps}>
        <Icon onClick={this.props.onHide} className="close-icon" name="ion-close-round" />

      {this.props.displayDefaultHeader?(<BootstrapModal.Header {...this.headerProps} closeButton={false}>
          <BootstrapModal.Title>{this.headerProps.title}</BootstrapModal.Title>

        </BootstrapModal.Header>):null}

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
  hide:()=>{},
  onHide:()=>{},
  displayDefaultHeader:true,
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


}

export default Modal;
