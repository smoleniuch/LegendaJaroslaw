import React, { Component } from 'react';

import LogoImageUrl from 'Images/legenda-boxing-text.png';
import './style.scss'

class Logo extends Component {

  render() {
    return(
    <div className='logo-container'>

      <img  className="azs-legenda-logo" src={`/${LogoImageUrl}`} />

    </div>
  )}

}


export default Logo;
