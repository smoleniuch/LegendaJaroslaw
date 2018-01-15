import React from 'react';
import classNames from 'classnames'
import './style.scss'

const Content = ({children, borderRight}) => (
  <div className={classNames('modal-content-block',{'border-right':borderRight})}>

  {children}

  </div>
);

export default Content;
