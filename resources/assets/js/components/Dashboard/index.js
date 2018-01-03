import React, { Component } from 'react';
import classNames from 'classnames'

import './style.scss'

class Dashboard extends Component {

  render() {

    var {className, children} = this.props

    return (
      <div className={classNames('dashboard',className)}>

        {children}

      </div>
    );
  }

}

export default Dashboard;
