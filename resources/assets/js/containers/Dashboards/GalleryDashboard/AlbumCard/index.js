import React, { Component } from "react";
import _sampleSize from "lodash/sampleSize";
import Card from "Components/Card";
import { withRouter } from "react-router";
import Image from 'react-image-resizer';
import "./style.scss";

class AlbumCard extends Component {
  constructor(props) {
    super(props);

    this.openAlbum = this.openAlbum.bind(this);
  }

  render() {
    var { album, ...props } = this.props;

    var descriptionImagesUrls = this.props.descriptionImages.sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0,4)

    return (
      <Card onClick={this.openAlbum} className="album-card" {...props}>
        <Card.Header>
          <div className="folder-name" title={album.name}>
            {album.name}
          </div>
        </Card.Header>
        <Card.Body>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              height: "100%"
            }}
          >
            {descriptionImagesUrls.map(image => (
              <div
                style={{
                  flexGrow: 1,
                  padding:'5px',
                  width: "50%",
                  height: "50%"
                }}
              >
                <Image width={80} height={80}  src={image.thumbnail} />
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    );
  }

  openAlbum() {
    this.props.history.push(`${this.props.album.id}`);
  }
}

AlbumCard.defaultProps = {
  descriptionImages: []
};

export default withRouter(AlbumCard);
