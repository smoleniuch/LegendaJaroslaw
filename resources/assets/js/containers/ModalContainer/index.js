import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import { compose } from 'recompose'

import importAll from 'Utilities/import_all'
import { withReduxModalManager } from 'Components/ReduxModal'
import ModalSwitch from './ModalSwitch'

const Modals = importAll(require.context('./Modals',true,/index\.js/))

const mapStateToProps = (state) => {

  return {

    modals:Object.values(state.modal.modals),
    router:state.router
  }

}

class ModalContainer extends Component {

  constructor(props) {
    super(props);

    this.onRouteChange = this.onRouteChange.bind(this)
    this.props.history.listen(this.onRouteChange)
  }

  render() {


    return (
      <div>

        {this.props.modals.map((modal,i) => {
          var {name, ...props} = modal
          if(!Modals[name]){throw new Error(`Unsupported Modal Constructor - ${name}`)}

          var Modal = Modals[name]

          return <Modal key={name} />

        })}

        <ModalSwitch />
      </div>
    );
  }

  onRouteChange(a,b){


  }

}

export default compose(
  connect(mapStateToProps),
  withRouter,
  withReduxModalManager()
)(ModalContainer);
