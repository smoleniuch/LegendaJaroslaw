import React, { Component } from 'react';
import { connect } from 'react-redux'
import _debounce from 'lodash/debounce'

import SidePanel from 'Components/SidePanel'
import Icon from 'Components/Icon'
import Panel from 'Components/Panel'
import MotivationalQuote from 'Components/MotivatinalQuote'

import SearchBar from 'Components/SearchBar'
import SidePanelNavigator from 'Components/SidePanelNavigator'
import { updatePostsFilter } from 'Actions/post_actions'

import './style.scss'

const mapStateToProps = (state) => {

  return {

    posts:state.post.posts,
    motivationalQuote:state.motivationalQuote.quoteOfTheDay

  }

}

const mapDispatchToProps = (dispatch) => {

  return {

    updatePostsFilter:_debounce((v) => dispatch(updatePostsFilter(v)), 200)

  }

}

class NewsSidePanel extends Component {

  render() {

    var {posts} = this.props

    return (
      <SidePanel className='news-side-panel'>

        <Panel>
          <Panel.Heading>Najbliższy Planowany Trening</Panel.Heading>
          <Panel.Body>Odbędzie się <Icon name="ion-checkmark-circled"/></Panel.Body>
        </Panel>

          <SearchBar onChange={this.props.updatePostsFilter}/>

          <MotivationalQuote
            author={this.props.motivationalQuote.author}
            text={this.props.motivationalQuote.text}/>
            {/*
          <SidePanelNavigator data={posts} />
          */}

      </SidePanel>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSidePanel);
