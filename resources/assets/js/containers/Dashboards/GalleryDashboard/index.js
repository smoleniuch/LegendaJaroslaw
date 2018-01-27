import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, matchPath } from 'react-router-dom'
import _pick from 'lodash/pick'
import _get from 'lodash/get'

import Dashboard from 'Components/Dashboard'
import DashboardGrid from 'Components/DashboardGrid';
import GridCard from 'Components/GridCard'
import Breadcrumb from 'Components/Breadcrumb'
import withRouterHelpers from 'Containers/ModalContainer/with_router_helpers'
import { compose } from 'recompose'

const mapStateToProps = (state, props) => {

  var galleryId = _get(props.matchCurrentPath({path:'/galeria/albumy/:currentAlbumId'}),'params.currentAlbumId')
  console.log(props.matchCurrentPath({path:'/galeria/albumy/:currentAlbumId'}))
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

    this.openAlbum = this.openAlbum.bind(this)
    this.drawAlbumCard = this.drawAlbumCard.bind(this)
    this.drawPhotoCard = this.drawPhotoCard.bind(this)
    this.getBreadcrumbNavigationItems = this.getBreadcrumbNavigationItems.bind(this)
    this.openGalleryInspectorModal = this.openGalleryInspectorModal.bind(this)

  }
  render() {


    return (
    <Dashboard className="gallery-dashboard">
      <Breadcrumb onClick={this.openAlbum} items={this.getBreadcrumbNavigationItems()}/>
      <DashboardGrid>
        {this.props.ancestorAlbums.map((v)=><div key={v.id}>{v.name}</div>)}
        {this.props.albums.map(this.drawAlbumCard)}
        {this.props.photos.map(this.drawPhotoCard)}
      </DashboardGrid>
    </Dashboard>
    );
  }

  openAlbum(albumId){

    this.props.history.replace(`/galeria/albumy/${albumId}`)

  }

  openGalleryInspectorModal(photoId){

    this.props.history.push(this.props.location.pathname + `/zdjecia/${photoId}`,{modal:true,preModalLocation:this.props.location.pathname})

  }

  getBreadcrumbNavigationItems(){

    return [...this.props.ancestorAlbums,this.props.currentGalleryAlbum].map((album)=>({
      label:album.name,
      eventKey:album.id,
      active:this.props.currentGalleryAlbum.id === album.id
    }))

  }

  drawPhotoCard(photo){

    return (
      <GridCard onClick={this.openGalleryInspectorModal} eventKey={photo.id}  key={photo.id}>
        <GridCard.Body>

          <img style={{maxWidth:'100%',maxHeight:'100%'}} src={photo.url} />

        </GridCard.Body>

      </GridCard>
    )

  }

  drawAlbumCard(album){

    return (
      <GridCard onClick={this.openAlbum} key={album.id} eventKey={album.id}>
        <GridCard.Header>Album: {album.name}</GridCard.Header>
        <GridCard.Body>

          <img style={{maxWidth:'100%',maxHeight:'100%'}} src={album.description_picture_url} />

        </GridCard.Body>

      </GridCard>
    )

  }

}

const enhance = compose(

  withRouter,
  withRouterHelpers,
  connect(mapStateToProps)
)

export default enhance(GalleryDashboard);
