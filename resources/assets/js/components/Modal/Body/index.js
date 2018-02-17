import React from 'react';
import classNames from 'classnames'
import './style.scss'

const Body = ({children, borderRight}) => (
  <div className={classNames('modal-body-block',{'border-right':borderRight})}>

  {children}

  </div>
);

export default Body;
