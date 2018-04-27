import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel'

import './style.scss'

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active:false
    };
  }
  render() {
    var { title, children } = this.props
    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title toggle>{title}</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          {children}
        </Panel.Body>
      </Panel>
    );
  }

}

export default Bar;
