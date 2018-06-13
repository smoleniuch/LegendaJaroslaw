import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import moment from "moment";
import _sortBy from "lodash/sortBy";
import _throttle from 'lodash/throttle';

import Dashboard from "Components/Dashboard";
import Post from "Components/Post";
import existsInString from "Utilities/exists_in_string";
import Icon from "Components/Icon";
import RoundButton from "Components/RoundButton";
import Authorization from "Containers/Helpers/Authorization";
import SidePanel from 'Containers/SidePanels/NewsSidePanel'
import LoadingIndicator from 'Components/LoadingIndicator'
import { fetchPosts } from 'Actions/postActions'
import { displayModal } from "Actions/modalActions";
import "./style.scss";

import LatestImagesCarousel from './components/LatestImagesCarousel'

const mapStateToProps = state => {
  return {
    latestImages:Object.values(state.gallery.photos).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)).slice(0,40),
    posts: Object.values(state.post.posts).sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    ),
    isFetching:state.post.isFetching,
    lastPostChunk:state.post.lastPostChunk,
    filter: state.post.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    displayAddNewPostModal: _ => dispatch(displayModal("AddNewPostContent")),
    fetchPosts: chunk => dispatch(fetchPosts(chunk)),
  };
};

class NewsDashboard extends Component {
  constructor(props) {
    super(props);

    this.shouldDisplayPost = this.shouldDisplayPost.bind(this);
    this.fetchPosts = _throttle(this.props.fetchPosts, 3000)
  }
  render() {
    var { posts, latestImages } = this.props;

    

    return (
      <Dashboard className="news-dashboard">
        <LatestImagesCarousel images={latestImages} />
        <div className="data-content">
        <SidePanel />
        <Dashboard.Content onScroll={this.onContentScroll}>

          {posts.map(post => {
            return this.shouldDisplayPost(post) ? (
              <Post key={post.id} post={post} />
            ) : null;
          })}
            
            <LoadingIndicator active={this.props.isFetching}  width={50} height={50}/>
          </Dashboard.Content>
          </div>
        <Authorization allowedRoles="coach">
          <RoundButton
            onClick={this.props.displayAddNewPostModal}
            size={60}
            className="add-new-post-button"
            rounded
            bsStyle="primary"
          >
            <Icon size={40} name="ion-android-add" />
          </RoundButton>
        </Authorization>
      </Dashboard>
    );
  }

  onContentScroll = e => {

      const bottom = e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 200;
      
      if(bottom && !this.props.isFetching){
        this.fetchPosts(this.props.lastPostChunk + 1)
      }


  }

  shouldDisplayPost(post) {
    return (
      existsInString(this.props.filter, post.title) ||
      existsInString(this.props.filter, post.content)
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsDashboard);
