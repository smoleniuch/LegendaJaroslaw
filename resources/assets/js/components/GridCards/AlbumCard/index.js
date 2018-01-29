import React, { Component } from 'react';
import GridCard from 'Components/GridCard'
import { withRouter } from 'react-router'
import './style.scss'

class AlbumCard extends Component {

  constructor(props) {
    super(props);

    this.openAlbum = this.openAlbum.bind(this)
  }

  render() {

    var { album } = this.props;

    return (
      <GridCard onClick={this.openAlbum} className="album-card">
        <GridCard.Header>
          Album
        </GridCard.Header>
        <GridCard.Body>
          <img src={album.description_picture_url} />
        </GridCard.Body>
        <GridCard.Footer>{album.name}</GridCard.Footer>
      </GridCard>
    );
  }

}

AlbumCard.defaultProps = {

  onClick:() => {}

}

export default AlbumCard;
