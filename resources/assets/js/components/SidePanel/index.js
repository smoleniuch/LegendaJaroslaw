import React, { Component } from 'react';
import classNames from 'classnames'

import './style.scss'

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

export default SidePanel;
