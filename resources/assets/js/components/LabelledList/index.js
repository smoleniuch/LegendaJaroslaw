import React from 'react';
import './style.scss'
const LabelledList = ({items}) => (
  <div className="labelled-list">

    {items.map((item,i) => {

      return (
        <div key={i} className="labelled-list-item">
          <div className="item-label">{item.label}</div>
          <div className="item-value">{item.value}</div>
        </div>
      )

    })}

  </div>
);

LabelledList.defaultProps = {

  items:[]

}

export default LabelledList;
