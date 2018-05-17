import React from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";

import { Content, Body } from "Components/Modal";
import LoadingButton from "Components/LoadingButton";
import Table from "Components/Table";
import Icon from "Components/Icon";
import SimpleList from "Components/SimpleList";

import { uploadPhotos } from "Actions/galleryActions";
import { errorNotification } from "Actions/notificationSystemActions";

const mapDispatchToProps = {
  uploadPhotos,
  errorNotification
};

class AddNewPhotosContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    };
  }

  render() {
    return (
      <Content title="Dodaj Zdjęcia">
        <Body>
          <Dropzone
            style={{
              height: "200px",
              borderWidth: "2px",
              borderColor: "rgb(102, 102, 102)",
              borderStyle: "dashed",
              borderRadius: "5px",
              display: "flex"
            }}
            disabled={this.props.activeRequest}
            accept="image/*"
            onDrop={this.onDrop}
            onDropRejected={this.informAboutRejectedFiles}
          >
            <p style={{margin:'auto'}}>Dodaj Pliki</p>
          </Dropzone>
          <br />
          <Table
            defaultPageSize={5}
            data={this.state.files}
            columns={[
              { Header: "Nazwa", accessor: "name" },
              { Header: "Opis" },
              {
                Header: "",
                width: 50,
                Cell: rowInfo => {
                  return (
                    <Icon
                      size={22}
                      role="button"
                      name="ion-android-delete"
                      onClick={_ => this.removeFile(rowInfo.original)}
                    />
                  );
                }
              }
            ]}
          />

          <div className="text-right" style={{ marginTop: "10px" }}>
            <LoadingButton
              label="Dodaj"
              loadingLabel="Dodaje..."
              isLoading={this.props.activeRequest}
              bsStyle="primary"
              onClick={this.uploadPhotos}
            />
          </div>
        </Body>
      </Content>
    );
  }

  onDrop = files => {
    this.setState({ files });
  };

  removeFile = file => {
    this.setState(prevState => ({
      files: prevState.files.filter(currentFile => currentFile != file)
    }));
  };

  informAboutRejectedFiles = files => {
    this.props.errorNotification({
      message: (
        <div>
          <p>
            Tylko pliki graficzne są akceptowane.Nastepujace pliki zostały
            zignorowane:
            <SimpleList data={files.map(file => file.name)} />
          </p>
        </div>
      )
    });
  };

  uploadPhotos = () => {
    var photos = [];
    var imageFiles = {};

    for (var key in this.state.files) {
      var file = this.state.files[key];
      var imageFileId = `photo_${key}`;

      photos.push({
        name: file.name,
        description: "none",
        imageFileId
      });

      imageFiles[imageFileId] = file;
    }

    this.props
      .dispatchByModal(
        uploadPhotos(photos, imageFiles, this.props.currentAlbum.id)
      )
      .then(_ => this.setState({ files: [] }));
  };
}

AddNewPhotosContent = connect(null, mapDispatchToProps)(AddNewPhotosContent);

export { AddNewPhotosContent };
