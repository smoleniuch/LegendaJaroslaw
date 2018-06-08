import React, { Component } from 'react';
import { connect } from 'react-redux'
import _debounce from 'lodash/debounce'
import classNames from 'classnames';

import SidePanel from 'Components/SidePanel'
import Icon from 'Components/Icon'
import Panel from 'Components/Panel'
import MotivationalQuote from 'Components/MotivationalQuote'

import SearchBar from 'Components/SearchBar'
import SidePanelNavigator from 'Components/SidePanelNavigator'
import { updatePostsFilter } from 'Actions/post_actions'

import './style.scss'

const mapStateToProps = (state) => {

  return {

    posts:state.post.posts,
    motivationalQuote:state.motivationalQuote.quoteOfTheDay,
    nextWorkout:state.workout.workouts[state.workout.nextWorkoutId]
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

        <Panel bsStyle="primary">
          <Panel.Heading>Najbliższy Planowany Trening</Panel.Heading>


            <Panel.Body>
              {this.props.nextWorkout?(
                !this.props.nextWorkout.canceled?<div >Odbędzie się <Icon className="valid" name="ion-checkmark-circled"/> </div>:<div>Nie odbędzie się <Icon className="invalid" name="ion-close-round"/> </div>
              ):'Brak danych'}
             </Panel.Body>


        </Panel>

          <SearchBar onChange={this.props.updatePostsFilter}/>
          {this.props.motivationalQuote?(
            <MotivationalQuote
              quote={this.props.motivationalQuote}/>
          ):''}

            {/*
          <SidePanelNavigator data={posts} />
          */}

      </SidePanel>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSidePanel);
