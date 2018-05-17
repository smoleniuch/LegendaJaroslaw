import React, { Component } from 'react';
import classNames from 'classnames'

import Icon from 'Components/Icon'
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
        {this.props.selected  && (<div className="selection-tick-container"><Icon size={30} name="ion-checkmark-round"/></div>)}
        {children}

      </div>
    );
  }

  onClick(e){

    if(this.props.selectable){
      this.props.onCheckToggle(this.props.eventKey)
    }
    else {

      this.props.onClick(this.props.eventKey, e)
      
    }


  }

}

GridCard.Header = Header;
GridCard.Body = Body;
GridCard.Footer = Footer;

GridCard.defaultProps = {
    selected:false,
    selectable:false,
    onSelected:()=>{},
}

export default GridCard;
