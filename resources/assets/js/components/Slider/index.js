import ReactSlider from 'react-slick'
import React, { Component } from 'react';
import classNames from 'classnames';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'

class Slider extends Component {
  constructor(props) {
    super(props);

    this.withDefaultProps = this.withDefaultProps.bind(this)
  }
  render() {

    var { children, className, ...props } = this.props

    return (
      <ReactSlider className={classNames('slider-component',className)} {...this.withDefaultProps(props)}>
        {children}
      </ReactSlider>
    );
  }

  withDefaultProps(props){

    return {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      ...props
    }

  }

}

export default Slider;
