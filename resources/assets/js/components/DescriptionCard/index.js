import React, { Component } from 'react';
import classNames from 'classnames'
import './style.scss'
class DescriptionCard extends Component {

  render() {

    var { size, children, title } = this.props

    return (
      <div className={classNames('description-card',size)}>

        <div className="title">{title}</div>

        <div className='body'>

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
