import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import './style.scss'

const SidePanelNavigator = ({ data }) => (
  <div className="side-panel-navigator">


    <ListGroup>

      {data.map((data) => (

        <ListGroupItem>{data.title}</ListGroupItem>

      ))}

    </ListGroup>

  </div>
);

export default SidePanelNavigator;
