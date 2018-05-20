import React from 'react';
import classNames from 'classnames'
import icons from './icons'
import './style.scss'

const Icon = ({name,className,primary, ...props}) => {

  if(icons[name] === undefined){throw new Error(`Unsupported icon name ("${name}")`)}

  var IconConstructor = icons[name]

  return(

      <IconConstructor className={classNames('icon', className, {primary})} {...props}/>

  )


}

Icon.defaultProps = {
  primary:false,
}

export default Icon;
