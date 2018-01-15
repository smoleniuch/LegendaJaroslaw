import React, { Component } from 'react';
import {connect} from 'react-redux'
import importAll from 'Utilities/import_all'

const Modals = importAll(require.context('./Modals',true,/index\.js/))

const mapStateToProps = (state) => {

  return {

    modals:Object.values(state.modal.modals)

  }

}

class ModalContainer extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>

        {this.props.modals.map((modal,i) => {
          var {name, ...props} = modal
          if(!Modals[name]){throw new Error(`Unsupported Modal Constructor - ${name}`)}

          var Modal = Modals[name]

          return <Modal key={name} {...props}/>

        })}

      </div>
    );
  }

}

export default connect(mapStateToProps)(ModalContainer);
