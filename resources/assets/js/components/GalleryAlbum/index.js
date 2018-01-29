import React, { Component } from 'react';
import './style.scss'

class GalleryAlbum extends Component {

  render() {

    var { name } = this.props

    return (
      <div className="gallery-album-container">

        <div className="gallery-album-content">
          <div className="gallery-album-name">{name}</div>


        </div>

      </div>
    );
  }

}

export default GalleryAlbum;
