import React from 'react';


import { Button as BootstrapButton } from 'react-bootstrap'

import './style.scss'



const Button = ({children, ...props}) => (
  <BootstrapButton {...props}>
    {children}
  </BootstrapButton>
);

export default Button;
