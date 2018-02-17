import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import moment from 'moment'
import _sortBy from 'lodash/sortBy'

import Dashboard from 'Components/Dashboard'
import Post from 'Components/Post'
import existsInString from 'Utilities/exists_in_string'

const mapStateToProps = (state) => {

  return {

    posts:state.post.posts,
    filter:state.post.filter

  }

}

class NewsDashboard extends Component {
  constructor(props) {
    super(props);

    this.shouldDisplayPost = this.shouldDisplayPost.bind(this)
  }
  render() {

    var {posts} = this.props

    return (
      <Dashboard className="news-dashboard">

      {posts.map((post)=>{

        return this.shouldDisplayPost(post)?<Post key={post.id} {...post} />:null

      })}

      </Dashboard>
    );
  }

  shouldDisplayPost(post){

    return existsInString(this.props.filter, post.title) || existsInString(this.props.filter, post.content)

  }
}

export default connect(mapStateToProps)(NewsDashboard);
