import React, { Component } from 'react';
import Card from 'Components/Card'
import { withRouter } from 'react-router'
import './style.scss'

class PhotoCard extends Component {

  constructor(props) {
    super(props);

    this.openGalleryInspectorModal = this.openGalleryInspectorModal.bind(this)
  }

  render() {

    var { photo } = this.props;

    return (
      <Card className="photo-card" onClick={this.openGalleryInspectorModal} eventKey={photo.id}  key={photo.id}>
        <Card.Body>

          <img style={{maxWidth:'100%',maxHeight:'100%'}} src={photo.original} />

        </Card.Body>

      </Card>
    );
  }

  openGalleryInspectorModal(photoId){

    this.props.history.push(this.props.location.pathname + `/zdjecia/${photoId}`,{underModalLocation:this.props.location})

  }

}

export default withRouter(PhotoCard);
