import React, { Component } from 'react';

import './style.scss'
import logoImage from 'Images/cropped-logo.png'

class Logo extends Component {

  render() {
    return (
      <div className="logo-container">

        <img src={logoImage} />

      </div>
    );
  }

}

export default Logo;
