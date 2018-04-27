import React from 'react';
import showdown from 'showdown'
const converter = new showdown.Converter();

const Content = ({html}) => (
  <div className='post-content' dangerouslySetInnerHTML={{__html:html}} />
);

export default Content;
