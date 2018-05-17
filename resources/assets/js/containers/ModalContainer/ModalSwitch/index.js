import React, { Component } from 'react';
import { Route } from 'react-router'
import { AuthModal } from '../Modals/AuthModal'
import { GalleryInspectorModal } from '../Modals/GalleryInspectorModal'
import ModalRoute from 'Router/modal_route'


/**
 * This components renders modal based on url, it is handfull if you want to let user link each other specific part of the website
 */
class ModalSwitch extends React.Component {

  constructor(props) {
    super(props);

  }


  render() {

    return (
      <div>
        <ModalRoute path='/autoryzacja' defaultUnderModalPath={'/aktualnosci'} component={AuthModal} />
        <Route path='/galeria/albumy/:albumId/zdjecia/:photoId' component={GalleryInspectorModal} />
      </div>
    )
  }

}


export default ModalSwitch
