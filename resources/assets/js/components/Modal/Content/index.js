import React, { Component } from 'react';
import {ModalHeader, ModalTitle} from 'react-bootstrap'
import LoadingBar from 'Components/LoadingBar'

class Content extends Component {

  render() {
    return (
      <div>

      {this.props.displayDefaultHeader?(
        <ModalHeader closeButton={false}>

          <ModalTitle>{this.props.title}</ModalTitle>

        </ModalHeader>):''}

        <div className="loading-bar-container">
          <LoadingBar scope='modal'/>
        </div>
        {this.props.children}
      </div>
    );
  }

}

Content.defaultProps = {

  title:'',
  displayDefaultHeader:true,

}

export default Content;
