import React from 'react';
import classNames from 'classnames'

import AuthorAvatar from './AuthorAvatar'
import './style.scss'

const MotivationalQuote = ({containerClassName, quote:{author:{name, avatar_path_url}, text}}) => (
  <div className={classNames('motivational-quote-container',containerClassName)}>

    <div className="text">"{text}"</div>

    <AuthorAvatar name={name} avatarUrl={avatar_path_url}/>

  </div>
);

export default MotivationalQuote;
