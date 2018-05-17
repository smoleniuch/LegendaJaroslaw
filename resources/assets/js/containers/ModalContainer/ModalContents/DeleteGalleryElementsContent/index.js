import React from "react";
import Button from "react-bootstrap/lib/Button";
import { connect } from "react-redux";
import _merge from 'lodash/merge';
import _difference from 'lodash/difference';
import _get from 'lodash/get';

import { Content, Body } from "Components/Modal";
import SelectedGalleryElementsTable from 'Containers/Tables/SelectedGalleryElementsTable'
import LoadingButton from "Components/LoadingButton";
import {
  deleteGalleryElements,
  clearGallerySelection,
} from "Actions/galleryActions";


const mapStateToProps = state => {
  return {
    selectedAlbumIds: Object.keys(state.gallery.selectedAlbumIds).map(
      id => +id
    ),
    selectedPhotoIds: Object.keys(state.gallery.selectedPhotoIds).map(id => +id)
  };
};

class DeleteGalleryElementsContent extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Content title="Usuń Elementy">
        <Body>
          <SelectedGalleryElementsTable />


          <div className="text-right" style={{ marginTop: "10px" }}>
            <LoadingButton
              label="Usuń"
              loadingLabel="Usuwam..."
              isLoading={this.props.activeRequest}
              bsStyle="primary"
              onClick={this.moveGalleryElements}
            />
          </div>
        </Body>
      </Content>
    );
  }

  moveGalleryElements = () => {
    var { selectedPhotoIds: photoIds, selectedAlbumIds: albumIds } = this.props;

    return this.props.dispatchByModal(
      deleteGalleryElements({
        photoIds,
        albumIds,
      })
    );
  };
}

DeleteGalleryElementsContent = connect(mapStateToProps, {
  clearGallerySelection,deleteGalleryElements
})(DeleteGalleryElementsContent);

export { DeleteGalleryElementsContent };
