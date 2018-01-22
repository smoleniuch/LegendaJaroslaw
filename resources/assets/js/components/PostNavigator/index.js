import React from 'react';
import { ListGroup, ListGroupItem } from ''
const PostNavigator = ({ posts }) => (
  <div className="post-navigator">

    <ListGroup>

      {posts.map((post) => (

        <ListGroupItem header="Heading 1">{post.title}</ListGroupItem>

      ))}

    </ListGroup>

  </div>
);

export default PostNavigator;
