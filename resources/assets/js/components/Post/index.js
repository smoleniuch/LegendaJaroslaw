import React from 'react';
import classNames from 'classnames'

import { Panel } from 'react-bootstrap'
import Header from './Header'
import Content from './Content'
import MenuBar from './MenuBar'
import Authorization from 'Containers/Helpers/Authorization'
import MarkdownConverter from 'Utilities/MarkdownConverter'
import './style.scss'

const Post = ({post}) => {

  return (

    <Panel className={classNames('post')}>

  <Panel.Heading>
      <Panel.Title>
        {post.title}
      </Panel.Title>

      <Authorization allowedRoles="coach">
      <MenuBar post={post}/>
      </Authorization>
    </Panel.Heading>

      <Panel.Body>

        <Content html={(new MarkdownConverter()).makeHtml(post.content)} />
        
        <div className="date text-right">{post.created_at}</div>
      </Panel.Body>


    </Panel>

  )

}


export default Post
