import React from 'react';
import {Breadcrumb as BootstrapBreadcrumb} from 'react-bootstrap'
import './style.scss'
const Breadcrumb = ({items, onClick, ...props}) => {

  var customOnClick = (e) => {

    var eventKey = e.target.getAttribute('data-event-key')

    onClick(eventKey, e)

  }

  return (

    <BootstrapBreadcrumb {...props}>
      {items.map((item,i)=>{

        return (

          <BootstrapBreadcrumb.Item key={i} onClick={customOnClick} data-event-key={item.eventKey} active={item.active} >{item.label}</BootstrapBreadcrumb.Item>

        )

      })}
    </BootstrapBreadcrumb>

  )

};

export default Breadcrumb;
