import React, { Component } from 'react';
import Card from 'Components/Card'
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
      <Card onClick={this.openAlbum} className="album-card">
        <Card.Header>
          <div className='folder-name' title={album.name}>{album.name}</div>
        </Card.Header>
        <Card.Body>
          <img src={album.description_picture_url} />
        </Card.Body>

      </Card>
    );
  }

  openAlbum(){

    this.props.history.push(`${this.props.album.id}`)

  }

}

export default withRouter(AlbumCard);
