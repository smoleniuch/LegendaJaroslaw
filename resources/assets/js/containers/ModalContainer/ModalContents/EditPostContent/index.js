import React from "react";
import Button from "react-bootstrap/lib/Button";
import { connect } from "react-redux";
import _merge from 'lodash/merge';
import _difference from 'lodash/difference';
import _get from 'lodash/get';

import { Content, Body } from "Components/Modal";
import PostEditor from 'Components/PostEditor';
import LoadingButton from "Components/LoadingButton";
import {
  updatePost,
} from "Actions/postActions";

const mapDispatchToProps = {
    updatePost,
}

class EditPostContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post:this.props.post
    }
  }

  render() {
    return (
      <Content title="Edycja Postu">
        <Body>
          <PostEditor defaultPost={this.props.post} onChange={this.onPostChange}/>


          <div className="text-right" style={{ marginTop: "10px" }}>
            <LoadingButton
              label="Edytuj"
              loadingLabel="Edytuje..."
              isLoading={this.props.activeRequest}
              bsStyle="primary"
              onClick={this.updatePost}
            />
          </div>
        </Body>
      </Content>
    );
  }

  onPostChange = (post) => this.setState({post:{...this.props.post, ...post}})

  updatePost = () => {

    return this.props.dispatchByModal(
      updatePost(this.state.post)
    );
  };
}

EditPostContent = connect(null, mapDispatchToProps)(EditPostContent);

export { EditPostContent };
