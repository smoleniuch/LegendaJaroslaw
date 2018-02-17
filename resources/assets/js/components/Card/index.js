import React, { Component } from 'react';
import classNames from 'classnames'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'

import './style.scss'

class GridCard extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this)
  }

  render() {

    var { children, className, onClick } = this.props

    return (
      <div className={classNames("grid-card",className)} onClick={this.onClick}>

        {children}

      </div>
    );
  }

  onClick(e){

    this.props.onClick(this.props.eventKey, e)

  }

}

GridCard.Header = Header;
GridCard.Body = Body;
GridCard.Footer = Footer;

export default GridCard;
