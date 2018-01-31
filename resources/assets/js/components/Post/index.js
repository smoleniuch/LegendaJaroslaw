import React from 'react';
import classNames from 'classnames'

import { Panel } from 'react-bootstrap'
import Header from './Header'
import Content from './Content'

import './style.scss'

const Post = ({title, content}) => {

  return (

    <Panel bsStyle="primary" className={classNames('post')}>

  <Panel.Heading>
      <Panel.Title>
        {title}
      </Panel.Title>
    </Panel.Heading>

      <Panel.Body>

        <Content>{content}</Content>

      </Panel.Body>


    </Panel>

  )

}


export default Post
