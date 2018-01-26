import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import classNames from 'classnames'

import './style.scss'
class DashboardGrid extends Component {
  constructor(props) {
    super(props);

    this.withDefaultOptions = this.withDefaultOptions.bind(this)
  }
  render() {

    var { children, menuBar , className, options, ...props } = this.props

    return (
      <div>
        <Masonry className={classNames('dashboard-grid',className)} options={this.withDefaultOptions(options)} {...props}>
          {children}
        </Masonry>
      </div>
    );
  }

  withDefaultOptions(options = {}){

    return {

      gutter:10,
      resize:true,
      transitionDuration: 200,
      itemSelector: '.grid-card',
      columnWidth: 200,
      ...options
    }

  }

}

export default DashboardGrid;
