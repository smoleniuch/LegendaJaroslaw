import React from "react";
import Button from "react-bootstrap/lib/Button";
import { connect } from "react-redux";
import _merge from 'lodash/merge';
import _difference from 'lodash/difference';
import _get from 'lodash/get';

import { Content, Body } from "Components/Modal";
import Tree, { renderers } from "Components/TreeView";
import Icon from "Components/Icon";
import Table from "Components/Table";
import SimpleList from "Components/SimpleList";
import SelectedGalleryElementsTable from 'Containers/Tables/SelectedGalleryElementsTable'
import LoadingButton from "Components/LoadingButton";
import {
  moveGalleryElements,
  toggleGallerySelection,
  clearGallerySelection,
} from "Actions/galleryActions";
import { errorNotification } from "Actions/notificationSystemActions";
const { Expandable } = renderers;

const NodeNameRenderer = ({
  selectedAlbumId,
  handleSelection,
  node: {
    name,
    id,
    state: { disabled, unaccpetedAlbumIds }
  },
  children
}) => (
  <span>
    <span
      className="hover-switch"
      onClick={() => handleSelection(id, { disabled, unaccpetedAlbumIds })}
    >
      {name}{" "}
      {selectedAlbumId === id ? (
        <Icon size={15} name="ion-checkmark-circled" />
      ) : (
        ""
      )}{" "}
      {selectedAlbumId !== id && (
        <span className="hover-switch--on">
          <Icon
            size={15}
            name={!disabled ? "ion-checkmark-circled" : "ion-close-circled"}
          />
        </span>
      )}
    </span>
    {children}
  </span>
);

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

class MoveGalleryObjectsContent extends React.Component {
  constructor(props) {
    super(props);
    this.generateTreeNodesFromAlbums = this.generateTreeNodesFromAlbums.bind(this)
    this.state = {
      nodes:[this.generateTreeNodesFromAlbums()],
      destinationAlbumId: null,
      availableRenderers: [Expandable],
      selectedRenderers: [Expandable, NodeNameRenderer]
    };

  }

  render() {
    return (
      <Content title="Przenieś Elementy">
        <Body>
          <SelectedGalleryElementsTable />
          <h4>Przenieś Do</h4>
          <div style={{ height: 200 }}>
            <Tree nodes={this.state.nodes} onChange={this.handleChange}>
              {p =>
                this.createNodeRenderer(this.state.selectedRenderers, {
                  ...p,
                  selectedAlbumId: this.state.destinationAlbumId,
                  handleSelection: this.handleAlbumSelection
                })
              }
            </Tree>
          </div>

          <div className="text-right" style={{ marginTop: "10px" }}>
            <LoadingButton
              label="Przenieś"
              loadingLabel="Przenoszę..."
              isLoading={this.props.activeRequest}
              bsStyle="primary"
              onClick={this.moveGalleryElements}
            />
          </div>
        </Body>
      </Content>
    );
  }

  componentDidUpdate(prevProps, prevState){

    if(_difference(prevProps.selectedAlbumIds,this.props.selectedAlbumIds).length > 0 ){
      this.setState({
        nodes:_merge(prevState.nodes,[this.generateTreeNodesFromAlbums()])
      })
    }

  }

  createNodeRenderer = (nodeDisplay, props) => {
    const [nextNode, ...remainingNodes] = nodeDisplay;

    if (remainingNodes.length === 0) {
      return this.renderNodeDisplay(nextNode, props);
    }

    return this.renderNodeDisplay(
      nextNode,
      props,
      this.createNodeRenderer(remainingNodes, props)
    );
  };

  renderNodeDisplay = (display, props, children = []) =>
    React.createElement(display, props, children);

  handleChange = nodes => {
    this.setState({
      nodes
    });
  };

  handleAlbumSelection = (
    destinationAlbumId,
    { disabled, unaccpetedAlbumIds }
  ) => {
    if (disabled) {
      var data = unaccpetedAlbumIds.map(id => this.props.albums[id].name);

      this.props.errorNotification({
        message: (
          <div>
            Nie można przenieść nastepujących albumów
            <SimpleList type="unordered" data={data} />
          </div>
        )
      });
    } else {
      this.setState({
        destinationAlbumId
      });
    }
  };

  generateTreeNodesFromAlbums = (albumId = this.props.mainAlbumId) => {

    var album = this.props.albums[albumId];
    var children = album.album_ids.map(this.generateTreeNodesFromAlbums);
    var unaccpetedAlbumIds = this.props.selectedAlbumIds.filter(selectedId =>
      album.ancestors_album_ids.includes(selectedId) || selectedId === albumId
    );
    var disabled = unaccpetedAlbumIds.length > 0;
    return {
      id: album.id,
      name: album.name,
      state: { disabled, unaccpetedAlbumIds },
      children: children.length > 0 ? children : undefined
    };
  };

  moveGalleryElements = () => {
    var { selectedPhotoIds: photoIds, selectedAlbumIds: albumIds } = this.props;

    return this.props.dispatchByModal(
      moveGalleryElements({
        photoIds,
        albumIds,
        destinationAlbumId: this.state.destinationAlbumId
      })
    ).then(this.props.clearGallerySelection);
  };
}

MoveGalleryObjectsContent = connect(mapStateToProps, {
  errorNotification,
  toggleGallerySelection,
  clearGallerySelection
})(MoveGalleryObjectsContent);

export { MoveGalleryObjectsContent };
