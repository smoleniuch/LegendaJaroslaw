import React from 'react';
import classNames from 'classnames'

import { Button as BootstrapButton } from 'react-bootstrap'

import './style.scss'



const Button = ({children,className,rounded, ...props}) => (
  <BootstrapButton className={classNames(className,{rounded})} {...props}>
    {children}
  </BootstrapButton>
);

Button.defaultProps = {
  rounded:false,
}

export default Button;
