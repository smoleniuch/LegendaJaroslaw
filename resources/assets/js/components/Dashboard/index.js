import React, { Component } from 'react';
import classNames from 'classnames'

import './style.scss'

const Content = ({children, ...props}) => {

  return <div className="content" {...props}>{children}</div>

}

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

Dashboard.Content = Content

export default Dashboard;
