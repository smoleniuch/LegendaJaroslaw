import React from 'react';
import classNames from 'classnames'
import './style.scss'

const Content = ({children, className, ...props}) => {

  return (

    <div className={classNames('page-content',className)} {...props}>

      {children}

    </div>

  )

}


export default Content
