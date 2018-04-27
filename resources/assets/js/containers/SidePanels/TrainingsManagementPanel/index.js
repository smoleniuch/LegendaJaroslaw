import React, { Component } from 'react';
import { connect } from 'react-redux'

import SidePanel from 'Components/SidePanel'
import Icon from 'Components/Icon'
import Panel from 'Components/Panel'


const mapDispatchToProps = (dispatch) => {

  return {

    updatePostsFilter:_debounce((v) => dispatch(updatePostsFilter(v)), 200)

  }

}

class TrainingsManagementPanel extends Component {

  render() {

    var {posts} = this.props

    return (
      <SidePanel className='news-side-panel'>



      </SidePanel>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TrainingsManagementPanel);
