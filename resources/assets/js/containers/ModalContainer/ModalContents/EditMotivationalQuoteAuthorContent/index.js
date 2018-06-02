import React from "react";
import { connect } from "react-redux";
import _get from "lodash/get";
import PropTypes from "prop-types";

import { Form, FieldGroup } from "Components/Form";
import { Content, Body } from "Components/Modal";
import LoadingButton from "Components/LoadingButton";
import { updateMotivationalQuoteAuthor } from "Actions/motivationalQuotesActions";
import AuthorAvatar from "Components/MotivationalQuote/AuthorAvatar";
import DropzoneFiles from "Components/DropzoneFiles";

const mapDispatchToProps = {
  updateMotivationalQuoteAuthor
};

class EditMotivationalQuoteAuthorContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authorName: this.props.author.name,
      selectedFiles: [],
      selectedAvatarUrl: null,
    };
  }

  render() {
    var { mode } = this.props;
    var author = this.state.selectedAvatarUrl != null? {...this.props.author, avatar_path_url:this.state.selectedAvatarUrl}:this.props.author
    return (
      <Content title={"Edytuj Autora"}>
        <Body>
          <Form>
            <FieldGroup
              value={this.state.authorName}
              input={{ onChange: this.onNameChange }}
              name="name"
              label="Nazwa"
              componentClass="input"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              <DropzoneFiles
                onDrop={this.onDrop}
                multiple={false}
                accept="image/*"
                style={{ height: "100px", width: "100px" }}
                title="Wybierz Avatar"
              />
              <AuthorAvatar displayName={false} name={_get(author, 'name')} avatarUrl={_get(author, 'avatar_path_url')} />
            </div>
          </Form>

          <div className="text-right" style={{ marginTop: "10px" }}>
            <LoadingButton
              label={"Edytuj"}
              loadingLabel={"Edytuje..."}
              isLoading={this.props.activeRequest}
              bsStyle="primary"
              onClick={this.updateAuthor}
            />
          </div>
        </Body>
      </Content>
    );
  }

  onDrop = selectedFiles => {
    this.setState({ selectedFiles });

    if(FileReader){
      var reader = new FileReader()

      reader.onload = e => {
        this.setState({
          selectedAvatarUrl:e.target.result
        })
      }

      reader.readAsDataURL(selectedFiles[0])
    }

  };
  onNameChange = e => this.setState({ authorName: e.target.value });

  updateAuthor = () => {
    var file = this.state.selectedFiles[0];
    var formData = new FormData();
    formData.append("name", this.state.authorName);
    if (file) {
      
      formData.append("avatarFile", file);
    }

    return this.props.dispatchByModal(
      updateMotivationalQuoteAuthor(this.props.author.id, formData)
    );
  };
}

EditMotivationalQuoteAuthorContent;

export { EditMotivationalQuoteAuthorContent };
