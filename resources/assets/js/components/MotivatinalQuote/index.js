import React from 'react';
import classNames from 'classnames'
import './style.scss'

const MotivationalQuote = ({containerClassName, text, author}) => (
  <div className={classNames('motivational-quote-container',containerClassName)}>

    <div className="text">"{text}"</div>

    <div className="author">{author}</div>

  </div>
);

export default MotivationalQuote;
