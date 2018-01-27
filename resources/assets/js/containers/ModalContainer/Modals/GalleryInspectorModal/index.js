import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'recompose'
import ReactImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

import {Modal, Content,  reduxModal} from 'Components/Modal';
import withRouterHelpers from 'Containers/ModalContainer/with_router_helpers.js';
import { withRouter } from 'react-router'
const mapStateToProps = (state, props) => {

  var currentPhotoId = props.getCurrentUrlParams('/galeria/albumy/:albumId/zdjecia/:photoId')['photoId']

  return {

    currentPhoto:state.gallery.photos[currentPhotoId]

  }

}



class GalleryInspectorModal extends Component {

  constructor(props) {
    super(props);

    this.onHide = this.onHide.bind(this)
  }

  render() {

    var images = [

      {original:'https://lorempixel.com/1024/768/?25174'},
      {original:'https://lorempixel.com/1024/768/?25178'},

    ]

    return (
      <Modal onHide={this.onHide} show={true}>
        <div style={{height:'500px',width:'100%'}}>
        <ReactImageGallery
          showThumbnails={false}
          onTouchEnd={(e)=>console.log(e)}
          onScreenChange={(e)=>console.log(e)}
          onSlide={(e)=>console.log(e)}
          items={images}/>
        </div>
      </Modal>
    );
  }

  componentDidMount(){



  }

  onHide(){

    this.props.displayPreModalRoute('/galeria/albumy/1')

  }
}

const enhance = compose(

  withRouterHelpers,
  withRouter,
  connect(mapStateToProps)

)

GalleryInspectorModal = enhance(GalleryInspectorModal)

export {
  GalleryInspectorModal
}
