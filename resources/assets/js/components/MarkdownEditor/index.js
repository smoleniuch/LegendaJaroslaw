import React, { Component } from "react";
import ReactMde, { ReactMdeCommands , DraftUtil } from "react-mde";
import {EditorState} from "draft-js";
import * as Showdown from "showdown";
import _isEqual from 'lodash/isEqual'

import "react-mde/lib/styles/css/react-mde-all.css";

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mdeState:{markdown:'', html:'', draftEditorState:EditorState.createEmpty()}
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      ghCodeBlocks:false,
      disableForced4SpacesIndentedSublists:false,
      emoji:true,

    });
    this.generateMarkdownPreview = this.generateMarkdownPreview.bind(this)
    this.setMarkdown = this.setMarkdown.bind(this)
  }
  render() {

    return (
      <div>
        <ReactMde
          textAreaProps={{
            id: "ta1",
            name: "ta1"
          }}
          editorState={this.state.mdeState}
          onChange={this.handleValueChange}
          generateMarkdownPreview={markdown =>
            Promise.resolve(this.converter.makeHtml(markdown))
          }
          commands={ReactMdeCommands.getDefaultCommands()}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState){
    
    if(!_isEqual(prevState.mdeState.markdown, this.state.mdeState.markdown)){
      this.props.onChange(this.state.mdeState.markdown)
    }

  }

  generateMarkdownPreview(markdown){
    return this.converter.makeHtml(markdown)
  }

  setMarkdown(markdown){

    this.setState( prevState => {
      
      const { mdeState } = this.state;
      DraftUtil.buildNewMdeState(
        mdeState,
        this.generateMarkdownPreview,
        markdown
      ).then(mdeState => {
        this.setState({ mdeState });

      });

    })

  }

  handleValueChange(mdeState) {

    this.setState({mdeState})

  }
}

MarkdownEditor.defaultProps = {
  onChange: () => {},
};

export default MarkdownEditor;
