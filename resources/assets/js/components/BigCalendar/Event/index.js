import React, { Component } from 'react';
import classNames from 'classnames';
import './style.scss';

const Event = ({event, title}) => {

  return (
    <div className="calendar-event">
      <div className={classNames('title',{canceled:event.canceled})}>
        {title}
      </div>
      <span className='cancel-word'>{event.canceled?' odwołany':null}</span>
    </div>
  )

}

export default Event;
