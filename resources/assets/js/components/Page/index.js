import React, { Component } from 'react';
import classNames from 'classnames'
import './style.scss'

import Content from './Content'

class Page extends Component {

  render() {

    var { className, children, ...props } = this.props

    return (
      <div className={classNames('page', className)} {...props}>

        {children}

      </div>
    );
  }

}

Page.Content = Content

export default Page;
