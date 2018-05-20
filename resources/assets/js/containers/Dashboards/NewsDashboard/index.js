import React, { Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import moment from 'moment'
import _sortBy from 'lodash/sortBy'

import Dashboard from 'Components/Dashboard'
import Post from 'Components/Post'
import existsInString from 'Utilities/exists_in_string'
import Icon from 'Components/Icon'
import RoundButton from 'Components/RoundButton'
import Authorization from 'Containers/Helpers/Authorization'
import {displayModal} from 'Actions/modalActions'
import './style.scss'

const mapStateToProps = (state) => {

  return {

    posts:Object.values(state.post.posts).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)),
    filter:state.post.filter

  }

}

const mapDispatchToProps = dispatch => {

  return {
    displayAddNewPostModal:_ => dispatch(displayModal('AddNewPostContent'))
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
      <div>
      {posts.map((post)=>{

        return this.shouldDisplayPost(post)?<Post key={post.id} post={post} />:null

      })}
      </div>

      <Authorization allowedRoles='coach'>
        <RoundButton  onClick={this.props.displayAddNewPostModal}size={60} className='add-new-post-button' rounded bsStyle="primary">
        <Icon size={40} name="ion-android-add" />
        </RoundButton>
        </Authorization>

      </Dashboard>

    );
  }

  shouldDisplayPost(post){

    return existsInString(this.props.filter, post.title) || existsInString(this.props.filter, post.content)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDashboard);
