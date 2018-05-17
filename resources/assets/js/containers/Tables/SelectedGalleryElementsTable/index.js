import React, { Component } from 'react';
import {connect} from 'react-redux'

import Table from 'Components/Table'
import Icon from "Components/Icon";
import {toggleGallerySelection} from 'Actions/galleryActions'

const mapStateToProps = state => {
    return {
      mainAlbumId: state.gallery.mainAlbumId,
      albums: state.gallery.albums,
      photos: state.gallery.photos,
      selectedAlbumIds: Object.keys(state.gallery.selectedAlbumIds).map(
        id => +id
      ),
      selectedPhotoIds: Object.keys(state.gallery.selectedPhotoIds).map(id => +id)
    };
  };

class SelectedGalleryElementsTable extends Component {
    render() {
        return (
            <div>
                <Table
            data={this.getTableData()}
            defaultPageSize={5}
            columns={[
              {
                Header: "Wybrane Elementy",
                columns: [
                  { Header: "Nazwa", accessor: "name" },
                  { Header: "Scieżka", accessor: "path" },
                  {
                    Header: "Typ",
                    id: "type",
                    accessor: d => (d.type === "photo" ? "Zdjęcie" : "Album")
                  },
                  {
                    Header: "",
                    width: 50,
                    Cell: rowInfo => {
                      var toggleData = {};
                      if (rowInfo.original.type === "album") {
                        toggleData.albumIds = [rowInfo.original.id];
                      }
                      if (rowInfo.original.type === "photo") {
                        toggleData.photoIds = [rowInfo.original.id];
                      }
                      return (
                        <Icon
                          size={22}
                          role="button"
                          name="ion-android-delete"
                          onClick={_ =>
                            this.props.toggleGallerySelection(toggleData)
                          }
                        />
                      );
                    }
                  }
                ]
              }
            ]}
          />
            </div>
        );
    }

    getTableData = () => {
        var photos = this.props.selectedPhotoIds.map(id => {
          
          var photo = this.props.photos[id];
          var parentAlbum = this.props.albums[photo.gallery_album_id]

          var path = parentAlbum.ancestors_album_ids.map( albumId => this.props.albums[albumId].name).concat(parentAlbum.name).join('/')
          return {
            id,
            name: photo.name,
            type: "photo",
            path,
          };
        });
    
        var albums = this.props.selectedAlbumIds.map(id => {
          var album = this.props.albums[id];
          var path = album.ancestors_album_ids.map( albumId => this.props.albums[albumId].name).concat(album.name).join('/')
          return {
            id,
            name: album.name,
            type: "album",
            path,
          };
        });
    
        return albums.concat(photos);
      };
}

export default connect(mapStateToProps, {toggleGallerySelection})(SelectedGalleryElementsTable);