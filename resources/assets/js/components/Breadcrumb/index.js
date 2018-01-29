import React from 'react';
import {Breadcrumb as BootstrapBreadcrumb} from 'react-bootstrap'

const Breadcrumb = ({items, onClick}) => {

  var customOnClick = (e) => {

    var eventKey = e.target.getAttribute('data-event-key')

    onClick(eventKey, e)

  }

  return (

    <BootstrapBreadcrumb>
      {items.map((item)=>{

        return (

          <BootstrapBreadcrumb.Item onClick={customOnClick} data-event-key={item.eventKey} active={item.active}>{item.label}</BootstrapBreadcrumb.Item>

        )

      })}
    </BootstrapBreadcrumb>

  )

};

export default Breadcrumb;
