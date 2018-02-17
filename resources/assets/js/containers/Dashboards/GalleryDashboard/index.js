import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, matchPath } from 'react-router-dom'
import _pick from 'lodash/pick'
import _get from 'lodash/get'

import Dashboard from 'Components/Dashboard'
import DashboardGrid from 'Components/DashboardGrid';
import Breadcrumb from 'Components/Breadcrumb'
import AlbumCard from './AlbumCard'
import PhotoCard from './PhotoCard'
import withRouterHelpers from 'Containers/ModalContainer/with_router_helpers'
import { compose } from 'recompose'

const mapStateToProps = (state, props) => {

  var galleryId = _get(props.match,'params.albumId')

  var currentGalleryAlbum = state.gallery.albums[galleryId] || {}

  var currentGalleryAlbumAlbums = _pick(state.gallery.albums,currentGalleryAlbum.album_ids,[])
  var currentGalleryAlbumPhotos = _pick(state.gallery.photos,currentGalleryAlbum.photo_ids,[])
  var currentGalleryAlbumAncesstorAlbums = _pick(state.gallery.albums,currentGalleryAlbum.ancestors_album_ids,[])

  return {

    albums:Object.values(currentGalleryAlbumAlbums),
    photos:Object.values(currentGalleryAlbumPhotos),
    ancestorAlbums:Object.values(currentGalleryAlbumAncesstorAlbums),
    currentGalleryAlbum:currentGalleryAlbum,

  }

}

class GalleryDashboard extends Component {
  constructor(props) {
    super(props);

    this.getBreadcrumbNavigationItems = this.getBreadcrumbNavigationItems.bind(this)
    this.openAlbum = this.openAlbum.bind(this)
  }
  render() {


    return (
    <Dashboard className="gallery-dashboard">
      <Breadcrumb onClick={this.openAlbum} items={this.getBreadcrumbNavigationItems()}/>
      <DashboardGrid>
        {this.props.albums.map((album) => <AlbumCard album={album}/>)}
        {this.props.photos.map((photo) => <PhotoCard photo={photo}/>)}
      </DashboardGrid>
    </Dashboard>
    );
  }

  getBreadcrumbNavigationItems(){

    return [...this.props.ancestorAlbums,this.props.currentGalleryAlbum].map((album)=>({
      label:album.name,
      eventKey:album.id,
      active:this.props.currentGalleryAlbum.id === album.id
    }))

  }

  openAlbum(albumId){

    this.props.history.push(albumId)

  }

}

const enhance = compose(

  withRouter,
  connect(mapStateToProps)
)

export default enhance(GalleryDashboard);
