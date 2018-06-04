import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, matchPath } from "react-router-dom";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _shuffle from 'lodash/shuffle'
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import ToggleButtonGroup from "react-bootstrap/lib/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import MenuItem from "react-bootstrap/lib/MenuItem";

import Icon from "Components/Icon";
import Dashboard from "Components/Dashboard";
import DashboardGrid from "Components/DashboardGrid";
import Breadcrumb from "Components/Breadcrumb";
import AlbumCard from "./AlbumCard";
import PhotoCard from "./PhotoCard";
import withRouterHelpers from "Containers/ModalContainer/with_router_helpers";
import Authorization from "Containers/Helpers/Authorization";
import Button from "Components/Button";
import { compose } from "recompose";
import { modalConfirmation, displayModal } from "Actions/modalActions";
import { deletePhotos, deleteAlbums, moveGalleryElements, toggleGallerySelection, clearGallerySelection } from "Actions/galleryActions";
import { infoNotification } from "Actions/notificationSystemActions";
import "./style.scss";

const mapStateToProps = (state, props) => {
  var galleryId = _get(props.match, "params.albumId");

  var currentGalleryAlbum = state.gallery.albums[galleryId] || {};

  var currentGalleryAlbumAlbums = _pick(
    state.gallery.albums,
    currentGalleryAlbum.album_ids,
    []
  );
  var currentGalleryAlbumPhotos = _pick(
    state.gallery.photos,
    currentGalleryAlbum.photo_ids,
    []
  );
  var currentGalleryAlbumAncesstorAlbums = _pick(
    state.gallery.albums,
    currentGalleryAlbum.ancestors_album_ids,
    []
  );

  return {
    selectedAlbumIds:state.gallery.selectedAlbumIds,
    selectedPhotoIds:state.gallery.selectedPhotoIds,
    albums: state.gallery.albums,
    currentGalleryAlbumAlbums,
    photos: state.gallery.photos,
    currentGalleryAlbum: currentGalleryAlbum,
    currentGalleryAlbumPhotos,
  };
};

const mapDispatchToProps = {
  modalConfirmation,
  deletePhotos,
  deleteAlbums,
  toggleGallerySelection,
  moveGalleryElements,
  displayModal,
  clearGallerySelection
};

class GalleryDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorMode: false,
    };

    this.getBreadcrumbNavigationItems = this.getBreadcrumbNavigationItems.bind(
      this
    );
    this.openAlbum = this.openAlbum.bind(this);
    this.onAlbumSelectionToggle = this.onAlbumSelectionToggle.bind(this);
    this.onPhotoSelectionToggle = this.onPhotoSelectionToggle.bind(this);
    this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
    this.onAddAlbumClick = this.onAddAlbumClick.bind(this);
    this.onAddPhotoClick = this.onAddPhotoClick.bind(this);
  }
  render() {
    var { editorMode } = this.state;
    var albums = Object.values(this.props.currentGalleryAlbumAlbums);
    var currentGalleryAlbumPhotos = Object.values(this.props.currentGalleryAlbumPhotos);
    return (
      <Dashboard className="gallery-dashboard">
        <div>
          <Breadcrumb
            className="navigation-bar"
            onClick={this.openAlbum}
            items={this.getBreadcrumbNavigationItems()}
          />
          <Authorization allowedRoles='coach' >
          <div className="editor-bar">
            <ToggleButtonGroup
              values={[this.state.editorMode ? 1 : null]}
              type="checkbox"
            >
              <ToggleButton
                value={1}
                onChange={_ =>
                  this.setState(prevState => ({
                    editorMode: !prevState.editorMode
                  }))
                }
              >
                Zaznacz
              </ToggleButton>

              <DropdownButton
                title={<Icon name="ion-navicon-round" />}
                id="bg-nested-dropdown"
                noCaret
              >
                              <MenuItem header>Dodaj</MenuItem>
                <MenuItem onSelect={this.onAddAlbumClick} eventKey="1">
                  Album
                </MenuItem>
                <MenuItem onSelect={this.onAddPhotoClick} eventKey="2">
                  Zdjęcia
                </MenuItem>
                <MenuItem header>Zaznaczone</MenuItem>
                <MenuItem onSelect={this.onDeleteButtonClick} eventKey="3">
                  Usuń
                </MenuItem>
                <MenuItem onSelect={this.onMoveElementsClick} eventKey="4">Przenieś</MenuItem>
              </DropdownButton>
            </ToggleButtonGroup>
          </div>
        </Authorization>
          
        </div>
        <DashboardGrid
          imagesLoadedOptions={{
            updateOnEachImageLoad: true
          }}
        >
          {albums.map(album => (
            <AlbumCard
              descriptionImages={this.getAlbumDescriptionImages(album)}
              selectable={this.state.editorMode}
              selected={this.props.selectedAlbumIds[album.id] === true}
              onCheckToggle={this.onAlbumSelectionToggle}
              key={album.id}
              eventKey={album.id}
              album={album}
            />
          ))}
          {currentGalleryAlbumPhotos.map(photo => (
            <PhotoCard
              selectable={this.state.editorMode}
              selected={this.props.selectedPhotoIds[photo.id] === true}
              onCheckToggle={this.onPhotoSelectionToggle}
              eventKey={photo.id}
              selectable={this.state.editorMode}
              key={photo.id}
              photo={photo}
            />
          ))}
        </DashboardGrid>
      </Dashboard>
    );
  }

  getBreadcrumbNavigationItems() {
    var ancestorAlbums = [];
    var currentAlbum = this.props.currentGalleryAlbum;
    do {
      var parentAlbum = this.props.albums[currentAlbum.parent_id];
      parentAlbum ? ancestorAlbums.unshift(parentAlbum) : null;
      currentAlbum = parentAlbum;
    } while (parentAlbum);

    return [...ancestorAlbums, this.props.currentGalleryAlbum].map(album => ({
      label: album.name,
      eventKey: album.id,
      active: this.props.currentGalleryAlbum.id === album.id
    }));
  }
  
  onAlbumSelectionToggle(id) {

    this.props.toggleGallerySelection({albumIds:[id]})
  }

  onPhotoSelectionToggle(id) {

    this.props.toggleGallerySelection({photoIds:[id]})
    
  }

  onDeleteButtonClick() {
    // var afterConfirmPromiseGenerator = () => {
    //   var photoIds = Object.keys(this.props.selectedPhotoIds).map(id => +id);
    //   var albumIds = Object.keys(this.props.selectedAlbumIds).map(id => +id);

    //   return Promise.all([
    //     this.props.deletePhotos(photoIds),
    //     this.props.deleteAlbums(albumIds)
    //   ]).then(this.props.clearGallerySelection);
    // };

    // this.props.modalConfirmation({
    //   question: "Trwale usuniesz wybrane elementy, kontynuowac?",
    //   afterConfirmPromiseGenerator
    // });
    
    this.props.displayModal('DeleteGalleryElementsContent')
  }



  getAlbumDescriptionImages = (album) => {

    return album.photo_ids.map( photoId => this.props.photos[photoId]).concat(album.album_ids.reduce((p,c)=>p.concat(this.getAlbumDescriptionImages(this.props.albums[c])),[]))

  }

  onAddAlbumClick() {
    this.props.displayModal("AddNewAlbumContent", {
      currentAlbum: this.props.currentGalleryAlbum
    });
  }

  onAddPhotoClick() {
    this.props.displayModal("AddNewPhotosContent", {
      currentAlbum: this.props.currentGalleryAlbum
    });
  }

  onMoveElementsClick = () => {

    this.props.displayModal('MoveGalleryObjectsContent',{...this.selectedElements})

  };

  openAlbum(albumId) {
    this.props.history.push(albumId);
  }
}

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(GalleryDashboard);
