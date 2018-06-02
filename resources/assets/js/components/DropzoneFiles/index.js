import React, { Component } from "react";
import Dropzone from "react-dropzone";
import classNames from "classnames";

import "./style.scss";

class DropzoneFiles extends Component {
  constructor(props) {
      super(props);
      
  }
  
  render() {
    var { children, style, className, title, ...props } = this.props;

    return (
      <Dropzone
        style={{
            height: "200px",
            borderWidth: "2px",
            borderColor: "rgb(102, 102, 102)",
            borderStyle: "dashed",
            borderRadius: "5px",
            display: "flex",
            ...style
        }}
        className={classNames(className, "dropzone-files")}
        {...props}
      >
        {title ? <div className="title">{title}</div> : ""}

        {children}
      </Dropzone>
    );
  }
}

DropzoneFiles.defaultProps = {
    style:{},
}

export default DropzoneFiles;
