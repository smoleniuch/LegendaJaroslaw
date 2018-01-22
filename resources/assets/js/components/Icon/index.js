import React from 'react';
import icons from './icons'
const Icon = ({name, ...props}) => {

  if(icons[name] === undefined){throw new Error(`Unsupported icon name ("${name}")`)}

  var IconConstructor = icons[name]

  return(

      <IconConstructor {...props}/>

  )


}

export default Icon;
