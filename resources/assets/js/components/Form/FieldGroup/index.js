import React, { Component } from 'react';
import {  FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import { Field } from 'redux-form'
import ClassNames from 'classnames'
import _findKey from 'lodash/findKey'
import _pick from 'lodash/pick'
import _get from 'lodash/get'
import './style.scss'

class FieldGroup extends Component {
  constructor(props) {
    super(props);

  }
  render() {

    var {

      id,
      label,
      help,
      ...props

    } = this.props

    return (


      <FormGroup
        controlId={id}
        validationState={this.validationState}>

        <ControlLabel>{label} </ControlLabel><div className='field-group-error'>{this.error}</div>

        <FormControl {...this.formControlProps} />

        {help && <HelpBlock>{help}</HelpBlock>}

      </FormGroup>


    );
  }

  get shouldDisplayError(){

    return _get(this.props, 'meta.touched') && _get(this.props,'meta.invalid')

  }

  get error(){

    return this.shouldDisplayError? _get(this.props,'meta.error') : null

  }

  get fieldProps(){

    return _pick(this.props, [



    ])

  }

  get formControlProps(){

    var props =  _pick(this.props, [

      'type',
      'componentClass',

    ])

    var events = {...this.props.input}

    return Object.assign({}, props, events)
  }

  get validationState(){

    var states = {

      error:this.shouldDisplayError,

    }

    return _findKey(states, (v) => v) || null

  }

}

export default FieldGroup;
