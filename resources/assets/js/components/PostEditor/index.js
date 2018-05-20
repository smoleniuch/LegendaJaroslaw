import React, { Component } from "react";
import _isEqual from "lodash/isEqual";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import _get from 'lodash/get'

import MarkdownEditor from "Components/MarkdownEditor";
import { FieldGroup } from "Components/Form";





class PostEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title:_get(this.props.defaultPost,'title', ''),
      content:_get(this.props.defaultPost,'content', ''),
    }
  }

  render() {
    var title = _get(this.props,'post.title', '')
    var content = _get(this.props,'post.content', '')

    return (
      <div className="post-editor">
        <FormGroup>
          <ControlLabel>Tytuł</ControlLabel>
          <FormControl value={this.state.title} onChange={this.updateTitle} />
        </FormGroup>
        <ControlLabel>Treść</ControlLabel>
        <MarkdownEditor defaultMarkdown={_get(this.props.defaultPost,'content', '')} ref={c => this.editor = c} onChange={this.updatecontent} />
      </div>
    );
  }

  componentDidUpdate(prevProps,prevState){
    if(!_isEqual(prevState,this.state)){
      this.props.onChange(this.state)
    }
  }

  update(data){
    if(data.title !== undefined){
      this.setState({title:data.title})
    }
    if(data.content !== undefined){
      this.editor.setMarkdown(data.content)
    }
  }

  updateTitle = e => {
    let title = e.target.value

       this.setState({ ...this.props.post, title })

  }
  updatecontent = content => this.setState({ ...this.props.post, content });


}

PostEditor.defaultProps = {
  onChange: () => {},
};

export default PostEditor;
