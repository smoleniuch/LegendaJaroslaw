import React, { Component } from 'react';
import classNames from 'classnames'
import './style.scss'
class DescriptionCard extends Component {

  render() {

    var { size, children, title, className } = this.props

    return (
      <div className={classNames('description-card',size, className)}>

        <div className="card-title">{title}</div>

        <div className='card-body'>

        {children}

        </div>

      </div>
    );
  }

}

DescriptionCard.defaultProps = {

  size:'medium',
  title:'',

}

export default DescriptionCard;
