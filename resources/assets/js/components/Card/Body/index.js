import React from 'react';

const CardBody = ({children, ...props}) => (
  <div className="card-body" {...props}>

    {children}

  </div>
);

export default CardBody;
