import React, { Component } from 'react';
import { connect } from 'react-redux'
import { compose } from 'recompose'
import ReactImageGallery from 'react-image-gallery'
import _pick from 'lodash/pick'
import _get from 'lodash/get'
import "react-image-gallery/styles/css/image-gallery.css"

import {Modal, Content,  reduxModal} from 'Components/Modal';
import withRouterHelpers from 'Containers/ModalContainer/with_router_helpers.js';
import { withRouter } from 'react-router'
import './style.scss'

const mapStateToProps = (state, props) => {

  var currentPhotoId = +props.match.params.photoId
  var currentAlbumId = +props.match.params.albumId
  var currentAlbumPhotoIds = _get(state.gallery.albums,`${currentAlbumId}.photo_ids`,[])


  return {

    currentPhoto:state.gallery.photos[currentPhotoId],
    startIndex:currentAlbumPhotoIds.findIndex(id => id === currentPhotoId),
    currentAlbumPhotos:Object.values(_pick(state.gallery.photos,currentAlbumPhotoIds))
  }

}



class GalleryInspectorModal extends Component {

  constructor(props) {
    super(props);

    this.onHide = this.onHide.bind(this)
    this.updateCurrentUrl = this.updateCurrentUrl.bind(this)
  }

  render() {

    var startIndex = this.props.startIndex

    return (
      <Modal displayDefaultHeader={false} onHide={this.onHide} show={true}>
        <div style={{height:'500px',width:'100%'}}>
        <ReactImageGallery
          style={{height:'500px',width:'100%'}}
          startIndex={startIndex}
          showThumbnails={false}
          onSlide={this.updateCurrentUrl}
          items={this.props.currentAlbumPhotos}/>
        </div>
      </Modal>
    );
  }

  updateCurrentUrl(i){

    this.props.history.replace(`${this.props.currentAlbumPhotos[i].id}`)

  }

  onHide(){

    this.props.history.push(`/galeria/albumy/${this.props.match.params.albumId}`)

  }
}

const enhance = compose(


  connect(mapStateToProps),
  withRouter,
)

GalleryInspectorModal = enhance(GalleryInspectorModal)

export {
  GalleryInspectorModal
}
