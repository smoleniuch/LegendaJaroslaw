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

    var { photo, ...props } = this.props;

    return (
      <Card className="photo-card" onClick={this.openGalleryInspectorModal} {...props}>
        <Card.Body style={{width:'100%',height:'auto'}}>

          <img style={{width:'100%',height:'auto'}} src={photo.original} />
        {/* <div className="text-center">{photo.name}</div> */}
          
        </Card.Body>
      </Card>
    );
  }

  openGalleryInspectorModal(photoId){

    this.props.history.push(this.props.location.pathname + `/zdjecia/${photoId}`,{underModalLocation:this.props.location})

  }

}

export default withRouter(PhotoCard);
