import React, { Component } from 'react';
import {connect} from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import { compose } from 'recompose'

import importAll from 'Utilities/import_all'
import { withReduxModalManager } from 'Components/ReduxModal'
import ModalSwitch from './ModalSwitch'

const Modals = importAll(require.context('./Modals',true,/index\.js/))

class ModalContainer extends Component {

  constructor(props) {
    super(props);

  }

  render() {


    return (
      <div>
        <ModalSwitch />
      </div>
    );
  }


}

export default ModalContainer;
