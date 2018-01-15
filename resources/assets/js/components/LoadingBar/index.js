import ReactLoadingBar from 'react-redux-loading-bar'
import React from 'react'
import './style.scss'
import { colors } from 'InlineStyles'
const LoadingBar = ({style, ...props}) => {

  var defaultStyle = {

    backgroundColor:colors['$color-primary-0'],
    willChange:null,
    zIndex:2,
    
  }
  style = Object.assign(defaultStyle, style)

  return <ReactLoadingBar style={style} {...props}/>

}

export default LoadingBar
