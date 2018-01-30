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
          <div className='folder-name' title={album.name}>{album.name}</div>
        </GridCard.Header>
        <GridCard.Body>
          <img src={album.description_picture_url} />
        </GridCard.Body>

      </GridCard>
    );
  }

  openAlbum(){

    this.props.history.push(`${this.props.album.id}`)

  }

}

export default withRouter(AlbumCard);
