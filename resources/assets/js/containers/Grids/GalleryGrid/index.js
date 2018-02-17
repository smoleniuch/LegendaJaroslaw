import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _pick from 'lodash/pick'

import DashboardGrid from 'Components/DashboardGrid';
import Card from 'Components/Card'



const mapStateToProps = (state, props) => {

  var currentGalleryAlbum = state.gallery.albums[props.match.params.currentGalleryId] || {}

  var currentGalleryAlbumAlbums = _pick(state.gallery.albums,currentGalleryAlbum.album_ids,[])
  var currentGalleryAlbumPhotos = _pick(state.gallery.photos,currentGalleryAlbum.photo_ids,[])
  var currentGalleryAlbumAncesstorAlbums = _pick(state.gallery.albums,currentGalleryAlbum.ancestors_album_ids,[])

  return {

    albums:Object.values(currentGalleryAlbumAlbums),
    photos:Object.values(currentGalleryAlbumPhotos),
    ancestorAlbums:Object.values(currentGalleryAlbumAncesstorAlbums),

  }

}

class GalleryGrid extends Component {
  constructor(props) {
    super(props);

    this.openAlbum = this.openAlbum.bind(this)
    this.drawAlbumCard = this.drawAlbumCard.bind(this)
    this.drawPhotoCard = this.drawPhotoCard.bind(this)
  }
  render() {


    return (
      <DashboardGrid>
        {this.props.ancestorAlbums.map((v)=><div key={v.id}>{v.name}</div>)}
        {this.props.albums.map(this.drawAlbumCard)}
        {this.props.photos.map(this.drawPhotoCard)}
      </DashboardGrid>
    );
  }

  openAlbum(albumId){

    this.props.history.replace(`${albumId}`)

  }

  drawPhotoCard(photo){

    return (
      <Card onClick={this.openGalleryInspectorModal}  key={photo.id}>
        <Card.Body>

          <img style={{maxWidth:'100%',maxHeight:'100%'}} src={photo.url} />

        </Card.Body>

      </Card>
    )

  }



  drawAlbumCard(album){

    return (
      <Card onClick={this.openAlbum} key={album.id} eventKey={album.id}>
        <Card.Header>Album: {album.name}</Card.Header>
        <Card.Body>

          <img style={{maxWidth:'100%',maxHeight:'100%'}} src={album.description_picture_url} />

        </Card.Body>

      </Card>
    )

  }

}

export default withRouter(connect(mapStateToProps)(GalleryGrid));
