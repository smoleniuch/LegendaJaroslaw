import React from 'react'
import classNames from 'classnames'
import { FormControl } from 'react-bootstrap'
import './style.scss'

 const ErrorMessage = ({ show, children, className }) => {

  return (

      <div className={classNames('form-error-message-container',className,{active:show})}>
        {children}
      </div>

  )

}

export default ErrorMessage
