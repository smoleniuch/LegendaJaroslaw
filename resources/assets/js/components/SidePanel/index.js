import React, { Component } from 'react';
import classNames from 'classnames'

import './style.scss'

const Content = ({children}) => <div className="content">{children}</div>

class SidePanel extends Component {

  render() {

    var { className, children } = this.props

    return (
      <div  className={classNames('side-panel',className)}>

        {children}

      </div>
    );
  }

}

SidePanel.Content = Content

export default SidePanel;
