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
  addPost,
} from "Actions/postActions";

const mapDispatchToProps = {
    addPost,
}

class AddNewPostContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post:this.props.post
    }
  }

  render() {
    return (
      <Content title="Dodaj Post">
        <Body>
          <PostEditor onChange={this.onPostChange}/>


          <div className="text-right" style={{ marginTop: "10px" }}>
            <LoadingButton
              label="Dodaj"
              loadingLabel="Dodaje..."
              isLoading={this.props.activeRequest}
              bsStyle="primary"
              onClick={this.addPost}
            />
          </div>
        </Body>
      </Content>
    );
  }

  onPostChange = (post) => this.setState({post:{...this.props.post, ...post}})

  addPost = () => {

    return this.props.dispatchByModal(
      addPost(this.state.post)
    );
  };
}

AddNewPostContent = connect(null, mapDispatchToProps)(AddNewPostContent);

export { AddNewPostContent };
