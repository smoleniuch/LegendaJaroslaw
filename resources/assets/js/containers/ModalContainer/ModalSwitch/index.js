import React, { Component } from 'react';
import { Route } from 'react-router'
import { AuthModal } from '../Modals/AuthModal'
import { GalleryInspectorModal } from '../Modals/GalleryInspectorModal'

class ModalSwitch extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {

    return (
      <div>
        <Route path='/autoryzacja' component={AuthModal} />
        <Route path='/galeria/albumy/:galleryAlbumId/zdjecia/:photoId' component={GalleryInspectorModal} />
      </div>
    )
  }

}


export default ModalSwitch
